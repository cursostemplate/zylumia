"use client"

import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getDatabase, type Database } from "firebase/database"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

let app: FirebaseApp | null = null
let authInstance: Auth | null = null
let dbInstance: Database | null = null

export function getFirebaseApp(): FirebaseApp {
  if (typeof window === "undefined") {
    throw new Error("Firebase can only be used on the client side")
  }

  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  }

  return app
}

export function getFirebaseAuth(): Auth {
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth can only be used on the client side")
  }

  if (!authInstance) {
    const firebaseApp = getFirebaseApp()
    authInstance = getAuth(firebaseApp)
  }

  return authInstance
}

export function getFirebaseDb(): Database {
  if (typeof window === "undefined") {
    throw new Error("Firebase Database can only be used on the client side")
  }

  if (!dbInstance) {
    try {
      console.log("[v0] Initializing Realtime Database...")
      const firebaseApp = getFirebaseApp()
      console.log("[v0] Firebase app obtained:", !!firebaseApp)
      dbInstance = getDatabase(firebaseApp)
      console.log("[v0] Realtime Database initialized successfully:", !!dbInstance)
    } catch (error) {
      console.error("[v0] Error initializing Realtime Database:", error)
      throw error
    }
  }

  return dbInstance
}
