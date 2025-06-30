import { useState } from "react";
import api from "../api/api";
import { useCarrinho } from "../context/CarrinhoContext";

type ProdutoCarrinho = {
    id: string;
    nome: string;
    preco: number;
    imagemUrl?: string;
    quantidade: number;
};

export default function Checkout() {
    const { itens: carrinho, limpar } = useCarrinho();

    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [cep, setCep] = useState("");

    const total = carrinho.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0
    );

    const finalizarCompra = async () => {
        try {
            const pedido = {
                itens: carrinho.map((item) => ({
                    produtoId: item.id,
                    quantidade: item.quantidade,
                    precoUnitario: item.preco,
                })),
                endereco: { rua, numero, bairro, cidade, estado, cep },
            };

            const response = await api.post("/pedidos", pedido);
            const pagamento = await api.post("/pagamento", { pedidoId: response.data.id });

            window.location.href = pagamento.data.init_point;
            limpar();
        } catch (error) {
            console.error(error);
            alert("Erro ao finalizar compra.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6">

                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
                    Checkout
                </h1>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                        Endereço de Entrega
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Rua"
                            value={rua}
                            onChange={(e) => setRua(e.target.value)}
                            required
                        />
                        <input
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Número"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            required
                        />
                        <input
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Bairro"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            required
                        />
                        <input
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Cidade"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            required
                        />
                        <input
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Estado"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            required
                        />
                        <input
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="CEP"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                        Resumo do Pedido
                    </h2>

                    {carrinho.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 py-2"
                        >
                            <span className="text-gray-800 dark:text-gray-100">
                                {item.nome} (x{item.quantidade})
                            </span>
                            <span className="font-medium text-gray-800 dark:text-gray-100">
                                R$ {(item.preco * item.quantidade).toFixed(2)}
                            </span>
                        </div>
                    ))}

                    <div className="flex justify-between items-center pt-4 text-xl font-bold text-gray-800 dark:text-gray-100">
                        <span>Total:</span>
                        <span>R$ {total.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={finalizarCompra}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                >
                    Finalizar Compra
                </button>
            </div>
        </div>
    );
}
