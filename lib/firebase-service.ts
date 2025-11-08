"use client"

import { getFirebaseDb } from "./firebase"
import { ref, push, set, get } from "firebase/database"

const COLLECTIONS = {
  SUBSCRIBERS: "subscribers",
  USERS: "users",
  COUPONS: "coupons",
  COUPON_USAGE: "coupon_usage",
  ORDERS: "orders",
}

export async function subscribeEmail(email: string, name?: string, source?: string) {
  try {
    const db = getFirebaseDb()

    const subscriberRef = ref(db, COLLECTIONS.SUBSCRIBERS)
    const snapshot = await get(subscriberRef)

    if (snapshot.exists()) {
      const subscribers = snapshot.val()
      const existingEmail = Object.values(subscribers).find((sub: any) => sub.email === email)
      if (existingEmail) {
        return { success: false, message: "Email already subscribed" }
      }
    }

    const newSubscriberRef = push(subscriberRef)
    await set(newSubscriberRef, {
      email,
      name: name || "",
      source: source || "website",
      subscribedAt: Date.now(),
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

    const couponRef = ref(db, COLLECTIONS.COUPONS)
    const newCouponRef = push(couponRef)

    await set(newCouponRef, {
      code: code.toUpperCase(),
      discount,
      maxUses,
      currentUses: 0,
      active: true,
      createdAt: Date.now(),
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

    const couponRef = ref(db, COLLECTIONS.COUPONS)
    const snapshot = await get(couponRef)

    if (!snapshot.exists()) {
      return { success: false, message: "Invalid coupon code", discount: 0 }
    }

    const coupons = snapshot.val()
    const couponEntry = Object.entries(coupons).find(
      ([_, coupon]: [string, any]) => coupon.code === code.toUpperCase() && coupon.active === true,
    )

    if (!couponEntry) {
      return { success: false, message: "Invalid coupon code", discount: 0 }
    }

    const [couponId, couponData] = couponEntry as [string, any]

    if (couponData.currentUses >= couponData.maxUses) {
      return { success: false, message: "Coupon has reached maximum uses", discount: 0 }
    }

    if (userEmail) {
      const usageRef = ref(db, COLLECTIONS.COUPON_USAGE)
      const usageSnapshot = await get(usageRef)

      if (usageSnapshot.exists()) {
        const usages = usageSnapshot.val()
        const existingUsage = Object.values(usages).find(
          (usage: any) => usage.couponCode === code.toUpperCase() && usage.userEmail === userEmail,
        )
        if (existingUsage) {
          return { success: false, message: "You have already used this coupon", discount: 0 }
        }
      }
    }

    return {
      success: true,
      message: "Coupon applied successfully!",
      discount: couponData.discount,
      couponId: couponId,
    }
  } catch (error) {
    console.error("Error validating coupon:", error)
    return { success: false, message: "Error validating coupon", discount: 0 }
  }
}

export async function recordCouponUsage(couponCode: string, userEmail: string, orderTotal: number) {
  try {
    const db = getFirebaseDb()

    const usageRef = ref(db, COLLECTIONS.COUPON_USAGE)
    const newUsageRef = push(usageRef)

    await set(newUsageRef, {
      couponCode: couponCode.toUpperCase(),
      userEmail,
      orderTotal,
      usedAt: Date.now(),
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

    const userRef = ref(db, COLLECTIONS.USERS)
    const newUserRef = push(userRef)

    await set(newUserRef, {
      email,
      name,
      password,
      createdAt: Date.now(),
    })

    return { success: true, message: "User registered successfully!" }
  } catch (error) {
    console.error("Error saving user data:", error)
    return { success: false, message: "Failed to register user." }
  }
}

export async function saveOrderData(orderData: {
  email: string
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  phone: string
  country: string
  trackingUpdates: boolean
  saveInfo: boolean
  cartItems: any[]
  subtotal: number
  paypalOrderId?: string
}) {
  try {
    if (typeof window === "undefined") {
      console.error("[v0] Cannot save order data on server side")
      return { success: false, message: "Cannot save data on server." }
    }

    console.log("[v0] Getting Realtime Database instance...")
    const db = getFirebaseDb()
    console.log("[v0] Realtime Database instance obtained:", !!db)

    const orderRef = ref(db, COLLECTIONS.ORDERS)
    const newOrderRef = push(orderRef)
    console.log("[v0] Saving order to Realtime Database...")

    await set(newOrderRef, {
      ...orderData,
      status: "pending",
      createdAt: Date.now(),
    })

    console.log("[v0] Order saved successfully with ID:", newOrderRef.key)
    return { success: true, message: "Order saved successfully!" }
  } catch (error: any) {
    console.error("[v0] Error saving order data:", error)
    console.error("[v0] Error details:", error.message, error.code)
    return { success: false, message: `Failed to save order: ${error.message}` }
  }
}
