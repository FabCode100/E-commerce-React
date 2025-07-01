import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
    const [temaEscuro, setTemaEscuro] = useState(() => {
        return localStorage.getItem("tema") === "escuro";
    });

    // Força um re-render no componente ao alternar tema
    const [forcarRender, setForcarRender] = useState(0);

    const alternarTema = () => {
        const novoTema = !temaEscuro;
        setTemaEscuro(novoTema);
        setForcarRender(f => f + 1);  // Faz o componente re-renderizar
    };

    useEffect(() => {
        if (temaEscuro) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("tema", "escuro");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("tema", "claro");
        }
    }, [temaEscuro]);

    return (
        <div
            key={forcarRender}  // Garante recriação do container para atualizar estilos
            className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 relative"
        >
            {/* Botão de alternar tema */}
            <button
                onClick={alternarTema}
                className="fixed top-5 right-5 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow transition"
            >
                {temaEscuro ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
            </button>

            <div className="max-w-xl w-full text-center space-y-8 bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl">

                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">
                    Bem-vindo ao E-commerce
                </h1>

                <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl">
                    Descubra os melhores produtos com ótimos preços e entrega rápida.
                </p>

                <Link
                    to="/produtos"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition transform hover:scale-105 shadow-md"
                >
                    Ver Produtos
                </Link>
            </div>
        </div>
    );
}
