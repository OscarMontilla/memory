'use client'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export function Header() {
  const [hasToken, setHasToken] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      setHasToken(!!token);
      
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          setUserEmail(parsedUser.email);
        } catch (e) {
          console.error('Error al parsear usuario:', e);
          setUserEmail(null);
        }
      }
    };

    checkAuth();
    window.addEventListener('auth-change', checkAuth);
    
    return () => {
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setHasToken(false);
    setUserEmail(null);
    const event = new Event('auth-change');
    window.dispatchEvent(event);
    router.push('/home');
  };

  return (
    <Menubar className="fixed ">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/home">Home</Link>
        </MenubarTrigger>
      </MenubarMenu>
      
      
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/juego">Juego</Link>
          </MenubarTrigger>
        </MenubarMenu>
      
      
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/acerca">Acerca</Link>
        </MenubarTrigger>
      </MenubarMenu>

      {hasToken ? (
        <MenubarMenu>
          <MenubarTrigger>
            <span>👤 {userEmail}</span>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={handleLogout}>
              Cerrar sesión
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      ) : (
        <>
          <MenubarMenu>
            <MenubarTrigger>
              <Link href="/registro">Registro</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Link href="/login">Login</Link>
            </MenubarTrigger>
          </MenubarMenu>
        </>
      )}
    </Menubar>
  );
}