'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    const publicRoutes = ['/', '/login', '/registro', '/home'] 

    if (!token && !publicRoutes.includes(pathname)) {
      router.push('/login')
    }
  }, [pathname, router])

  return <>{children}</>
}