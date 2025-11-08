"use client"

import { getFirebaseAuth, getFirebaseDb } from "./firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

export async function signInWithEmail(email: string, password: string) {
  try {
    const auth = getFirebaseAuth()

    const result = await signInWithEmailAndPassword(auth, email, password)
    return { user: result.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.code || error.message }
  }
}

export async function signUpWithEmail(email: string, password: string, name: string) {
  try {
    const auth = getFirebaseAuth()
    const db = getFirebaseDb()

    const result = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(result.user, { displayName: name })

    await setDoc(doc(db, "users", result.user.uid), {
      name,
      email,
      createdAt: serverTimestamp(),
    })

    return { user: result.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.code || error.message }
  }
}

export async function signOutUser() {
  try {
    const auth = getFirebaseAuth()

    await signOut(auth)
    return { error: null }
  } catch (error: any) {
    return { error: error.code || error.message }
  }
}

export function getErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered"
    case "auth/invalid-email":
      return "Invalid email address"
    case "auth/weak-password":
      return "Password should be at least 6 characters"
    case "auth/user-not-found":
      return "No account found with this email"
    case "auth/wrong-password":
      return "Incorrect password"
    case "auth/invalid-credential":
      return "Invalid email or password"
    default:
      return "An error occurred. Please try again."
  }
}
