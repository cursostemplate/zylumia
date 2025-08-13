declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: {
        [key: string]: any
      },
    ) => void
  }
}

export {}
