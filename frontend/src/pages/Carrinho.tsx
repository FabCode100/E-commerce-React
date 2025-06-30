import { useState } from "react";
import { useCarrinho } from "../context/CarrinhoContext";
import { useNavigate } from "react-router-dom";

export default function Carrinho() {
    const { itens, remover, total, limpar, adicionar } = useCarrinho();
    const [msgAdicionado, setMsgAdicionado] = useState<string>("");
    const navigate = useNavigate();

    const testeAdicionar = () => {
        const produtoTeste = {
            id: "teste",
            nome: "Produto Teste",
            preco: 10.0,
            imagemUrl: undefined,
        };
        adicionar(produtoTeste);
        setMsgAdicionado(`Produto "${produtoTeste.nome}" adicionado ao carrinho!`);
        setTimeout(() => setMsgAdicionado(""), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 flex flex-col items-center">
            {msgAdicionado && (
                <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
                    {msgAdicionado}
                </div>
            )}

            {/* Botão de Voltar */}
            <div className="w-full max-w-3xl flex justify-start mt-4">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                >
                    ← Voltar
                </button>
            </div>

            <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6 mt-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
                    Carrinho de Compras
                </h1>

                <button
                    onClick={testeAdicionar}
                    className="mb-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                >
                    Adicionar Produto Teste
                </button>

                {itens.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        Seu carrinho está vazio.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {itens.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center border border-gray-300 dark:border-gray-700 p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                            >
                                <div>
                                    <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                                        {item.nome}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Qtd: {item.quantidade}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Preço unitário: R$ {item.preco.toFixed(2)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => remover(item.id)}
                                    className="text-red-600 hover:text-red-700 font-medium transition"
                                >
                                    Remover
                                </button>
                            </div>
                        ))}

                        <div className="flex justify-between items-center text-xl font-bold text-gray-800 dark:text-gray-100">
                            <span>Total:</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={limpar}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
                        >
                            Esvaziar Carrinho
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
