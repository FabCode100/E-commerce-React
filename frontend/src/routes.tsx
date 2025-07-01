import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout"; // caminho do seu Layout
import Home from "./pages/Home";
import Login from "./pages/Login";
import Produtos from "./pages/Produtos";
import Carrinho from "./pages/Carrinho";
import Cadastro from "./pages/Cadastro";
import Checkout from "./pages/Checkout";
import Pedidos from "./pages/Pedidos";

export default function RoutesApp() {
    return (
        <Routes>
            {/* Rotas com layout */}
            <Route element={<Layout/>}>
                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pedidos" element={<Pedidos />} />
                <Route path="/cadastro" element={<Cadastro />} />
                {/* Se quiser, pode deixar cadastro e login fora do layout */}
            </Route>

            {/* Rotas sem layout (login por exemplo) */}
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}
