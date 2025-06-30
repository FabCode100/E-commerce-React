import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

type Produto = {
    nome: string;
};

type ItemPedido = {
    id: string;
    produto: Produto;
    quantidade: number;
    precoUnit: number;
};

type Endereco = {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
};

type Pedido = {
    id: string;
    itens: ItemPedido[];
    total: number;
    status: string;
    criadoEm: string;
    endereco: Endereco;
};

export default function Pedidos() {
    const { token, carregando } = useAuth();
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [dadosCarregados, setDadosCarregados] = useState(false);

    useEffect(() => {
        if (carregando || !token || dadosCarregados) return;

        const fetchPedidos = async () => {
            try {
                setLoading(true);
                const res = await api.get("/pedidos", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPedidos(res.data);
                setErro(null);
            } catch (error) {
                console.error(error);
                setErro("Erro ao carregar pedidos.");
            } finally {
                setLoading(false);
                setDadosCarregados(true);
            }
        };

        fetchPedidos();
    }, [carregando, token, dadosCarregados]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex justify-center">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
                    Meus Pedidos
                </h1>

                {loading && (
                    <p className="text-center text-gray-600 dark:text-gray-300">Carregando pedidos...</p>
                )}

                {erro && (
                    <p className="text-center text-red-600 dark:text-red-400">{erro}</p>
                )}

                {!loading && !erro && pedidos.length === 0 && (
                    <p className="text-center text-gray-600 dark:text-gray-300">
                        Você ainda não possui pedidos.
                    </p>
                )}

                {!loading && !erro && pedidos.length > 0 && (
                    <ul className="space-y-6">
                        {pedidos.map((pedido) => {
                            const dataFormatada = new Date(pedido.criadoEm).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            });

                            return (
                                <li
                                    key={pedido.id}
                                    className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 space-y-4"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-gray-100">
                                                Pedido #{pedido.id}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Data: {dataFormatada}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-300 capitalize">
                                                Status: {pedido.status}
                                            </p>
                                        </div>
                                        <div className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                                            Total: R$ {pedido.total.toFixed(2)}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Itens:</h3>
                                        <ul className="space-y-2">
                                            {pedido.itens.map((item) => (
                                                <li key={item.id} className="flex justify-between">
                                                    <span className="text-gray-700 dark:text-gray-200">
                                                        {item.produto.nome} (x{item.quantidade})
                                                    </span>
                                                    <span className="text-gray-700 dark:text-gray-200">
                                                        R$ {(item.precoUnit * item.quantidade).toFixed(2)}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-1">
                                            Endereço de Entrega:
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            {pedido.endereco.rua}, {pedido.endereco.numero} - {pedido.endereco.bairro}, {pedido.endereco.cidade} - {pedido.endereco.estado}, CEP: {pedido.endereco.cep}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}
