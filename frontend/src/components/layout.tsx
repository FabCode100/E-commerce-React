import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext"; // supondo que você tenha
import { useNavigate } from "react-router-dom";

export default function Layout() {
    const { logout } = useAuth();
    const { tema, alternarTema } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`min-h-screen ${tema === "dark" ? "dark bg-gray-900" : "bg-gray-100"}`}>
            <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
                <button
                    onClick={() => navigate("/")}
                    className="text-lg font-bold text-gray-700 dark:text-gray-200"
                >
                    Minha Loja
                </button>

                <div className="space-x-4 flex items-center">
                    <button
                        onClick={alternarTema}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        {tema === "dark" ? "Modo Claro" : "Modo Escuro"}
                    </button>

                    <button
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        Encerrar Sessão
                    </button>
                </div>
            </header>

            <main className="p-4 max-w-7xl mx-auto">
                <Outlet />
            </main>
        </div>
    );
}
