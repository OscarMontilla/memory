'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  
  useEffect(() => {
    const user = localStorage.getItem('user')
    const publicRoutes = ['/', '/login', '/registro', '/home', '/acerca', '/juego','/partidas']

    if (!user && !publicRoutes.includes(pathname)) {
      router.push('/login')
    }
  }, [pathname, router])

  return <>{children}</>
}
