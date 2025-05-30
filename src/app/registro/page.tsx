'use client'

import { useState } from "react";

export default function Registro() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const password_confirmation = password;
        const role = "user";

        async function registerUser() {
            try {
                const url = "https://soothing-magic-production.up.railway.app/api/register";
                const respuesta = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: nombre,
                        email,
                        role,
                        password,
                        password_confirmation
                    }),
                });
                const respuestaJson = await respuesta.json();
                

                // Debug para ver la respuesta completa
                console.log('Respuesta de la API:', respuestaJson);
                
            } catch (error) {
                console.error('Error de conexión:', error);
                alert('❌ Error de conexión con el servidor');
            }
        }
        registerUser();
       
    };

    return (
        <>
        
            <div className="min-h-screen flex items-center justify-center bg-transparent">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-4xl font-bold mb-6 text-center">
                        Registro
                    </h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
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
        </>
    )
}