import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-xl w-full text-center space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                    Bem-vindo ao E-commerce
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Descubra os melhores produtos com ótimos preços e entrega rápida.
                </p>

                <Link
                    to="/produtos"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                    Ver Produtos
                </Link>
            </div>
        </div>
    );
}
