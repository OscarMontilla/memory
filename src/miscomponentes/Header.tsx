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
  const [hasUser, setHasUser] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      // Solo con user en localStorage, sin token
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          setUserEmail(parsedUser.email);
          setHasUser(true);
        } catch (e) {
          console.error('Error al parsear usuario:', e);
          setUserEmail(null);
          setHasUser(false);
        }
      } else {
        setUserEmail(null);
        setHasUser(false);
      }
    };

    checkAuth();
    window.addEventListener('auth-change', checkAuth);

    return () => {
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    // Eliminar solo user porque no usamos token en este sistema
    localStorage.removeItem('user');
    setHasUser(false);
    setUserEmail(null);
    window.dispatchEvent(new Event('auth-change'));
    router.push('/home');
  };

  return (
    <Menubar className="fixed">
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
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/partidas">partidas</Link>
        </MenubarTrigger>
      </MenubarMenu>

      {hasUser ? (
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
