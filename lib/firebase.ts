"use client"

import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getDatabase, type Database } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyA6UbPxktykBO7Le6oMSwNErJT-7GARGPY",
  authDomain: "banco-de-dados-fba27.firebaseapp.com",
  databaseURL: "https://banco-de-dados-fba27.firebaseio.com",
  projectId: "banco-de-dados-fba27",
  storageBucket: "banco-de-dados-fba27.firebasestorage.app",
  messagingSenderId: "993017209264",
  appId: "1:993017209264:web:9fffd3d8224b4c33b0b675",
  measurementId: "G-JJDMJ1DRXQ",
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
