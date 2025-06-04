    'use client'

    import { useState } from "react"

    export default function Registro() {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [tipoMensaje, setTipoMensaje] = useState<"success" | "error" | "">("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!nombre || !email || !password) {
        setMensaje("Por favor completa todos los campos.")
        setTipoMensaje("error")
        return
        }

        const usuariosRaw = localStorage.getItem("usuarios")
        const usuarios = usuariosRaw ? JSON.parse(usuariosRaw) : []

        const yaExiste = usuarios.find((u: any) => u.email === email)
        if (yaExiste) {
        setMensaje("❌ Ya existe un usuario con ese correo.")
        setTipoMensaje("error")
        return
        }

        const nuevoUsuario = {
        name: nombre,
        email,
        password,
        role: "user",
        }

        usuarios.push(nuevoUsuario)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))

        // Opcional: guardar usuario y token directamentea
        localStorage.setItem("user", JSON.stringify(nuevoUsuario))
        localStorage.setItem("token", nuevoUsuario.email)

        setMensaje("✅ Usuario registrado correctamente. Redirigiendo a home...")
        setTipoMensaje("success")
        window.dispatchEvent(new Event('auth-change'))

        setTimeout(() => {
        window.location.href = "/home"
        }, 2000)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 className="text-4xl font-bold mb-6 text-center">Registro</h1>

            {mensaje && (
            <div
                className={`mb-4 p-3 rounded ${
                tipoMensaje === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
            >
                {mensaje}
            </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700"
                >
                Nombre
                </label>
                <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                />
            </div>
            <div>
                <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
                >
                Email
                </label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                />
            </div>
            <div>
                <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
                >
                Contraseña
                </label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                />
            </div>
            <button
                type="submit"
                className="w-full py-3 px-4 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transform hover:scale-105 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Registrarse
            </button>
            </form>
        </div>
        </div>
    )
    }
