import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type ItemCarrinho = {
    id: string;
    nome: string;
    preco: number;
    imagemUrl?: string;
    quantidade: number;
};

type CarrinhoContextType = {
    itens: ItemCarrinho[];
    total: number;
    adicionar: (item: Omit<ItemCarrinho, "quantidade">) => void;
    remover: (id: string) => void;
    limpar: () => void;
};

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
    const [itens, setItens] = useState<ItemCarrinho[]>(() => {
        // Usa função de inicialização para pegar do localStorage apenas na criação do estado
        const carrinhoSalvo = localStorage.getItem("carrinho");
        return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
    });

    useEffect(() => {
        localStorage.setItem("carrinho", JSON.stringify(itens));
    }, [itens]);

    const adicionar = (item: Omit<ItemCarrinho, "quantidade">) => {
        setItens((prev) => {
            const existente = prev.find(i => i.id === item.id);
            if (existente) {
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
                );
            }
            return [...prev, { ...item, quantidade: 1 }];
        });
    };

    const remover = (id: string) => {
        setItens(prev => prev.filter(i => i.id !== id));
    };

    const limpar = () => {
        setItens([]);
    };

    const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    return (
        <CarrinhoContext.Provider value={{ itens, total, adicionar, remover, limpar }}>
            {children}
        </CarrinhoContext.Provider>
    );
}

export function useCarrinho() {
    const ctx = useContext(CarrinhoContext);
    if (!ctx) throw new Error("useCarrinho deve ser usado dentro do CarrinhoProvider");
    return ctx;
}
