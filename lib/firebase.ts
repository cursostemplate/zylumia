"use client"

import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA6UbPxktykBO7Le6oMSwNErJT-7GARGPY",
  authDomain: "banco-de-dados-fba27.firebaseapp.com",
  databaseURL: "https://banco-de-dados-fba27-default-rtdb.firebaseio.com",
  projectId: "banco-de-dados-fba27",
  storageBucket: "banco-de-dados-fba27.firebasestorage.app",
  messagingSenderId: "993017209264",
  appId: "1:993017209264:web:9fffd3d8224b4c33b0b675",
  measurementId: "G-JJDMJ1DRXQ",
}

let app: FirebaseApp | null = null
let authInstance: Auth | null = null
let dbInstance: Firestore | null = null

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

export function getFirebaseDb(): Firestore {
  if (typeof window === "undefined") {
    throw new Error("Firebase Firestore can only be used on the client side")
  }

  if (!dbInstance) {
    const firebaseApp = getFirebaseApp()
    dbInstance = getFirestore(firebaseApp)
  }

  return dbInstance
}
