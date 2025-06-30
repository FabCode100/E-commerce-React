import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import api from "../api/api";

type User = {
    id: string;
    nome: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (email: string, senha: string) => Promise<void>;
    logout: () => void;
    carregando: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const tokenSalvo = localStorage.getItem("token");
        if (tokenSalvo) {
            api.defaults.headers.common["Authorization"] = `Bearer ${tokenSalvo}`;
            setToken(tokenSalvo);
            buscarPerfil();
        } else {
            setCarregando(false);
        }
    }, []);

    const buscarPerfil = async () => {
        try {
            const res = await api.get<User>("/auth/perfil");
            setUser(res.data);
        } catch {
            logout();
        } finally {
            setCarregando(false);
        }
    };

    const login = async (email: string, senha: string) => {
        try {
            const res = await api.post<{ access_token: string }>("/auth/login", { email, senha });
            const tokenRecebido = res.data.access_token;
            setToken(tokenRecebido);
            localStorage.setItem("token", tokenRecebido);
            api.defaults.headers.common["Authorization"] = `Bearer ${tokenRecebido}`;
            await buscarPerfil();
        } catch (error) {
            throw new Error("Credenciais inválidas");
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, carregando }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth deve ser usado dentro do AuthProvider");
    return ctx;
}
