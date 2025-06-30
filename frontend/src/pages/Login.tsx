import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const fazerLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, senha);
            navigate("/"); // Redireciona para Home após login
        } catch {
            alert("Credenciais inválidas");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <form onSubmit={fazerLogin} className="w-full max-w-sm space-y-6 p-8 bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
                    Entrar
                </h2>

                <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-300">E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-300">Senha</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
                    Entrar
                </button>
            </form>
        </div>
    );
}
