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
        setMsgAdicionado(`✔ Produto "${produtoTeste.nome}" adicionado!`);
        setTimeout(() => setMsgAdicionado(""), 3000);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 p-4 flex flex-col items-center">
            
            {msgAdicionado && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce z-50">
                    {msgAdicionado}
                </div>
            )}

            <div className="w-full max-w-3xl flex justify-start mb-4">
                <button
                    onClick={() => navigate("/produtos")}
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition shadow"
                >
                    ← Voltar para Produtos
                </button>
            </div>

            <div className="w-full max-w-3xl bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6">

                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
                    🛒 Carrinho de Compras
                </h1>

                <button
                    onClick={testeAdicionar}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition transform hover:scale-105"
                >
                    + Adicionar Produto Teste
                </button>

                {itens.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
                        Seu carrinho está vazio.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {itens.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center border border-gray-300 dark:border-gray-700 p-4 rounded-xl bg-white dark:bg-gray-700 shadow-sm"
                            >
                                <div>
                                    <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                                        {item.nome}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">Qtd: {item.quantidade}</p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Preço: <span className="font-medium">R$ {item.preco.toFixed(2)}</span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => remover(item.id)}
                                    className="text-red-600 hover:text-red-700 font-semibold transition"
                                >
                                    Remover
                                </button>
                            </div>
                        ))}

                        <div className="flex justify-between items-center pt-4 text-2xl font-bold text-gray-800 dark:text-gray-100 border-t border-gray-300 dark:border-gray-700">
                            <span>Total:</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>

                        <div className="space-y-3 mt-6">
                            <button
                                onClick={limpar}
                                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition transform hover:scale-105"
                            >
                                🗑 Esvaziar Carrinho
                            </button>

                            <button
                                onClick={() => navigate("/checkout")}
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition transform hover:scale-105"
                            >
                                💳 Ir para Pagamento
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
