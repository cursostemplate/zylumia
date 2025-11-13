"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"

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
          console.error("[v0] Error parsing saved user:", error)
          localStorage.removeItem("zylumia_user")
        }
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      console.log("[v0] Attempting login via API...")

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      console.log("[v0] Login API response:", data)

      if (!data.success) {
        throw new Error(data.error || "Login failed")
      }

      const user = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      }

      setUser(user)
      localStorage.setItem("zylumia_user", JSON.stringify(user))
      console.log("[v0] Login successful, user saved to state")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      console.log("[v0] Attempting registration via API...")

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()
      console.log("[v0] Registration API response:", data)

      if (!data.success) {
        throw new Error(data.error || "Registration failed")
      }

      const user = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      }

      setUser(user)
      localStorage.setItem("zylumia_user", JSON.stringify(user))
      console.log("[v0] Registration successful, user saved to state")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      console.log("[v0] Logging out user")
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
