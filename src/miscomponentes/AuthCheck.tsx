'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCheck() {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }, [])

  return null
}