import { useEffect, useState } from "react";
import api from "../api/api";
import { useCarrinho } from "../context/CarrinhoContext";
import { useNavigate } from "react-router-dom";

type Produto = {
  id: string;
  nome: string;
  preco: number;
  imagemUrl?: string;
};

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { adicionar, itens } = useCarrinho();
  const [msgAdicionado, setMsgAdicionado] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/produtos").then((res) => setProdutos(res.data));
  }, []);

  const handleAdicionar = (produto: Produto) => {
    adicionar(produto);
    setMsgAdicionado(`Produto "${produto.nome}" adicionado ao carrinho!`);
    setTimeout(() => setMsgAdicionado(""), 3000);
  };

  useEffect(() => {
    console.log("Itens do carrinho atualizados:", itens);
  }, [itens]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 relative">
      {msgAdicionado && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {msgAdicionado}
        </div>
      )}

      {/* Botão para ir ao Carrinho */}
      <div className="fixed top-5 left-5 z-50">
        <button
          onClick={() => navigate("/carrinho")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          Ver Carrinho ({itens.length})
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
        Nossos Produtos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {produtos.map((prod) => (
          <div
            key={prod.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition"
          >
            {prod.imagemUrl && (
              <img
                src={prod.imagemUrl}
                alt={prod.nome}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {prod.nome}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                R$ {prod.preco.toFixed(2)}
              </p>

              <button
                onClick={() => handleAdicionar(prod)}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
