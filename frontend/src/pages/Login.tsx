import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(false);

    const fazerLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro(null);
        setCarregando(true);
        try {
            await login(email, senha);
            navigate("/");
        } catch {
            setErro("Credenciais inválidas, tente novamente.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
            <form
                onSubmit={fazerLogin}
                className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6"
                aria-label="Formulário de login"
            >
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100">
                    Entrar
                </h2>

                {erro && (
                    <div
                        role="alert"
                        className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-center font-semibold"
                    >
                        {erro}
                    </div>
                )}

                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="exemplo@email.com"
                        required
                        autoComplete="username"
                    />
                </div>

                <div>
                    <label
                        htmlFor="senha"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Senha
                    </label>
                    <input
                        id="senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="••••••••"
                        required
                        autoComplete="current-password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={carregando}
                    className={`w-full py-3 rounded-lg font-semibold text-white transition ${carregando
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400"
                        }`}
                >
                    {carregando ? "Entrando..." : "Entrar"}
                </button>

                {/* Link para cadastro */}
                <p className="text-center text-gray-600 dark:text-gray-400">
                    Não tem uma conta?{" "}
                    <Link
                        to="/cadastro"
                        className="text-blue-600 hover:text-blue-800 font-semibold transition"
                    >
                        Cadastre-se aqui
                    </Link>
                </p>
            </form>
        </div>
    );
}
