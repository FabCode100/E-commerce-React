import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useTheme } from "../context/ThemeContext"; // importe seu contexto de tema

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const { tema, alternarTema } = useTheme(); // use o tema e função para alternar

    const cadastrar = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro(null);
        setCarregando(true);

        try {
            await api.post("/usuarios", { nome, email, senha });
            alert("Cadastro realizado com sucesso!");
            navigate("/login");
        } catch (error) {
            console.error(error);
            setErro("Erro ao cadastrar usuário. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300
          ${tema === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>

            {/* Botão alternar tema */}
            <button
                onClick={alternarTema}
                className="absolute top-5 right-5 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                aria-label="Alternar tema claro e escuro"
            >
                {tema === "dark" ? "Modo Claro" : "Modo Escuro"}
            </button>

            <form
                onSubmit={cadastrar}
                className="w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6"
                aria-label="Formulário de cadastro"
            >
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100">
                    Criar Conta
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
                        htmlFor="nome"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Nome
                    </label>
                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Seu nome completo"
                        autoComplete="name"
                    />
                </div>

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
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="exemplo@email.com"
                        autoComplete="email"
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
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="••••••••"
                        autoComplete="new-password"
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
                    {carregando ? "Cadastrando..." : "Cadastrar"}
                </button>

                <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                    Já tem uma conta?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        Faça login aqui
                    </button>
                </p>
            </form>
        </div>
    );
}
