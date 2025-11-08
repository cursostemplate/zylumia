"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import { signInWithEmail, signUpWithEmail, signOutUser, getErrorMessage } from "@/lib/firebase-auth-service"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("zylumia_user")
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error("Error parsing saved user:", error)
          localStorage.removeItem("zylumia_user")
        }
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { user: firebaseUser, error } = await signInWithEmail(email, password)

      if (error) {
        if (error === "auth/user-not-found" || error === "auth/invalid-credential") {
          throw new Error("USER_NOT_FOUND")
        }
        throw new Error(getErrorMessage(error))
      }

      if (firebaseUser && db) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            const user = {
              id: firebaseUser.uid,
              name: userData.name || firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
              email: firebaseUser.email || "",
            }
            setUser(user)
            localStorage.setItem("zylumia_user", JSON.stringify(user))
            setIsLoading(false)
            return
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }

        // Fallback
        const user = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
          email: firebaseUser.email || "",
        }
        setUser(user)
        localStorage.setItem("zylumia_user", JSON.stringify(user))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const { user: firebaseUser, error } = await signUpWithEmail(email, password, name)

      if (error) {
        throw new Error(getErrorMessage(error))
      }

      if (firebaseUser) {
        const user = {
          id: firebaseUser.uid,
          name: name,
          email: firebaseUser.email || email,
        }
        setUser(user)
        localStorage.setItem("zylumia_user", JSON.stringify(user))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      const { error } = await signOutUser()
      if (error) {
        console.error("Error signing out:", error)
      }
      setUser(null)
      localStorage.removeItem("zylumia_user")
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
