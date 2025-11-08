"use client"

import { getFirebaseDb } from "./firebase"
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore"

const COLLECTIONS = {
  SUBSCRIBERS: "subscribers",
  USERS: "users",
  COUPONS: "coupons",
  COUPON_USAGE: "coupon_usage",
}

export async function subscribeEmail(email: string, name?: string, source?: string) {
  try {
    const db = getFirebaseDb()

    const subscriberRef = collection(db, COLLECTIONS.SUBSCRIBERS)
    const q = query(subscriberRef, where("email", "==", email))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      return { success: false, message: "Email already subscribed" }
    }

    await addDoc(subscriberRef, {
      email,
      name: name || "",
      source: source || "website",
      subscribedAt: serverTimestamp(),
      active: true,
    })

    return { success: true, message: "Successfully subscribed!" }
  } catch (error) {
    console.error("Error subscribing email:", error)
    return { success: false, message: "Failed to subscribe. Please try again." }
  }
}

export async function createCoupon(code: string, discount: number, maxUses = 1000) {
  try {
    const db = getFirebaseDb()

    const couponRef = collection(db, COLLECTIONS.COUPONS)

    await addDoc(couponRef, {
      code: code.toUpperCase(),
      discount,
      maxUses,
      currentUses: 0,
      active: true,
      createdAt: serverTimestamp(),
    })

    return { success: true, message: "Coupon created successfully!" }
  } catch (error) {
    console.error("Error creating coupon:", error)
    return { success: false, message: "Failed to create coupon." }
  }
}

export async function validateCoupon(code: string, userEmail?: string) {
  try {
    const db = getFirebaseDb()

    const couponRef = collection(db, COLLECTIONS.COUPONS)
    const q = query(couponRef, where("code", "==", code.toUpperCase()), where("active", "==", true))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return { success: false, message: "Invalid coupon code", discount: 0 }
    }

    const couponDoc = querySnapshot.docs[0]
    const couponData = couponDoc.data()

    if (couponData.currentUses >= couponData.maxUses) {
      return { success: false, message: "Coupon has reached maximum uses", discount: 0 }
    }

    if (userEmail) {
      const usageRef = collection(db, COLLECTIONS.COUPON_USAGE)
      const usageQuery = query(
        usageRef,
        where("couponCode", "==", code.toUpperCase()),
        where("userEmail", "==", userEmail),
      )
      const usageSnapshot = await getDocs(usageQuery)

      if (!usageSnapshot.empty) {
        return { success: false, message: "You have already used this coupon", discount: 0 }
      }
    }

    return {
      success: true,
      message: "Coupon applied successfully!",
      discount: couponData.discount,
      couponId: couponDoc.id,
    }
  } catch (error) {
    console.error("Error validating coupon:", error)
    return { success: false, message: "Error validating coupon", discount: 0 }
  }
}

export async function recordCouponUsage(couponCode: string, userEmail: string, orderTotal: number) {
  try {
    const db = getFirebaseDb()

    const usageRef = collection(db, COLLECTIONS.COUPON_USAGE)

    await addDoc(usageRef, {
      couponCode: couponCode.toUpperCase(),
      userEmail,
      orderTotal,
      usedAt: serverTimestamp(),
    })

    return { success: true }
  } catch (error) {
    console.error("Error recording coupon usage:", error)
    return { success: false }
  }
}

export async function saveUserData(email: string, name: string, password: string) {
  try {
    const db = getFirebaseDb()

    const userRef = collection(db, COLLECTIONS.USERS)

    await addDoc(userRef, {
      email,
      name,
      password,
      createdAt: serverTimestamp(),
    })

    return { success: true, message: "User registered successfully!" }
  } catch (error) {
    console.error("Error saving user data:", error)
    return { success: false, message: "Failed to register user." }
  }
}
