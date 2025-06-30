import { Routes, Route } from "react-router-dom";
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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pedidos" element={<Pedidos />} />
        </Routes>
    );
}
