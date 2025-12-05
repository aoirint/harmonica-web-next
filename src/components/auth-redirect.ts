"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { hasToken } from "@/lib/auth"

export function useAuthRedirect() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const loggedIn = hasToken()

    if (!loggedIn && pathname !== "/login") {
      router.replace("/login")
      return
    }

    if (loggedIn && pathname === "/login") {
      router.replace("/")
    }
  }, [router, pathname])
}
