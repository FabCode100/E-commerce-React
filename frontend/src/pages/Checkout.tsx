import { useState } from "react";
import api from "../api/api";
import { useCarrinho } from "../context/CarrinhoContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { itens: carrinho, limpar } = useCarrinho();
    const { user, carregando } = useAuth();
    const navigate = useNavigate();

    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [cep, setCep] = useState("");

    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    const finalizarCompra = async () => {
        if (carregando) return alert("Aguarde, carregando usuário...");
        if (!user) return alert("Você precisa estar logado!");

        try {
            const enderecoRes = await api.post("/enderecos", { rua, numero, bairro, cidade, estado, cep });
            const enderecoId = enderecoRes.data.id || enderecoRes.data._id;

            const pedidoRes = await api.post("/pedidos", {
                usuarioId: user.id,
                enderecoId,
                itens: carrinho.map((i) => ({
                    produtoId: i.id,
                    quantidade: i.quantidade,
                    precoUnit: i.preco,
                })),
                total,
                status: "pendente",
                metodoPagamento: "cartao",
            });

            await api.patch(`/pagamentos/${pedidoRes.data.id}`, { metodo: "cartao" });

            alert("✅ Pagamento concluído com sucesso!");
            limpar();
            navigate("/");
        } catch (err) {
            console.error("Erro ao finalizar compra:", err);
            alert("Erro ao finalizar compra.");
        }
    };

    if (carregando)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <span className="text-gray-800 dark:text-gray-100 text-lg">Carregando...</span>
            </div>
        );

    if (!user)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <span className="text-red-600 dark:text-red-400 text-lg">Você precisa estar logado para finalizar a compra.</span>
            </div>
        );

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 p-4 flex flex-col items-center">

            <div className="w-full max-w-2xl flex justify-start mb-4">
                <button
                    onClick={() => navigate("/carrinho")}
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition shadow"
                >
                    ← Voltar para Carrinho
                </button>
            </div>

            <div className="w-full max-w-2xl bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-8">

                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
                    💳 Finalizar Compra
                </h1>

                {/* Endereço */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Endereço de Entrega</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Rua"
                            value={rua}
                            onChange={(e) => setRua(e.target.value)}
                        />
                        <input
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Número"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                        <input
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Bairro"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                        />
                        <input
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Cidade"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                        />
                        <input
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Estado"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        />
                        <input
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="CEP"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                        />
                    </div>
                </div>

                {/* Resumo Pedido */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Resumo do Pedido</h2>

                    {carrinho.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 py-2">
                            <span className="text-gray-800 dark:text-gray-100">{item.nome} (x{item.quantidade})</span>
                            <span className="font-medium text-gray-800 dark:text-gray-100">
                                R$ {(item.preco * item.quantidade).toFixed(2)}
                            </span>
                        </div>
                    ))}

                    <div className="flex justify-between items-center pt-4 text-xl font-bold text-gray-800 dark:text-gray-100 border-t border-gray-300 dark:border-gray-700">
                        <span>Total:</span>
                        <span>R$ {total.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={finalizarCompra}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition transform hover:scale-105"
                >
                    ✅ Finalizar Compra
                </button>
            </div>
        </div>
    );
}
