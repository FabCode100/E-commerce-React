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
    setMsgAdicionado(`✔️ "${produto.nome}" adicionado ao carrinho!`);
    setTimeout(() => setMsgAdicionado(""), 3000);
  };

  useEffect(() => {
    console.log("Itens do carrinho atualizados:", itens);
  }, [itens]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 relative">
      {/* Mensagem de sucesso */}
      {msgAdicionado && (
        <div className="fixed top-5 right-5 bg-green-600 dark:bg-green-500 text-white px-5 py-3 rounded-xl shadow-xl z-50 font-semibold text-sm select-none animate-fade-in-out">
          {msgAdicionado}
        </div>
      )}

      {/* Botão fixo para carrinho */}
      <button
        onClick={() => navigate("/carrinho")}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-lg font-semibold transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
        aria-label="Ver carrinho"
        title="Ver carrinho"
      >
        🛒 Carrinho
        <span className="bg-white text-blue-600 rounded-full px-3 py-1 text-sm font-bold min-w-[24px] text-center select-none">
          {itens.length}
        </span>
      </button>

      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-gray-100 drop-shadow-sm">
        Nossos Produtos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {produtos.map((prod) => (
          <div
            key={prod.id}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 hover:scale-[1.03] duration-300 flex flex-col"
            role="region"
            aria-label={`Produto: ${prod.nome}`}
          >
            {prod.imagemUrl ? (
              <img
                src={prod.imagemUrl}
                alt={prod.nome}
                className="h-56 w-full object-cover rounded-t-3xl"
                loading="lazy"
              />
            ) : (
              <div className="h-56 w-full bg-gray-200 dark:bg-gray-700 rounded-t-3xl flex items-center justify-center text-gray-400 dark:text-gray-500 italic select-none">
                Sem imagem
              </div>
            )}

            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                {prod.nome}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-4">
                R$ {prod.preco.toFixed(2)}
              </p>

              <button
                onClick={() => handleAdicionar(prod)}
                className="mt-auto bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-3 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-green-400"
                aria-label={`Adicionar ${prod.nome} ao carrinho`}
                title={`Adicionar ${prod.nome} ao carrinho`}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fade-in-out {
          0%, 100% {opacity: 0; transform: translateY(-10px);}
          10%, 90% {opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-out {
          animation: fade-in-out 3s ease forwards;
        }
      `}</style>
    </div>
  );
}
