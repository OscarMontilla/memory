'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center overflow-y-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 top-9">
        <Image
          src="/imagenes-de-pokemon-fw1l53kqy2o4e5p1.jpg"
          alt="Pokemon Background"
          fill
          className="object-cover brightness-50"
          priority
          unoptimized
          sizes="100vw"
          quality={100}
        />
      </div>

      {/* Contenido principal */}
      <div className="z-10 text-center"> {/* Cambiado mt-20 a mt-32 para más espacio */}
        <h1 className="text-7xl font-bold text-white mb-12 drop-shadow-lg">
          ¡Pon a prueba tu memoria!
        </h1>
        
        <Link 
          href="/juego" 
          className="inline-block bg-yellow-400 text-blue-900 font-bold py-4 px-12 rounded-full text-2xl hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          JUGAR
        </Link>
      </div>
    </div>
  )
}