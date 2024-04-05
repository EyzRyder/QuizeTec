import { Outlet, BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Base from "./pages/Base";
import AddQuiz from "./pages/AddQuiz";
import Menu from "./pages/Menu";
import Quiz from "./pages/Quiz";
import Resultados from "./pages/Resultados";
import Register from "./pages/Register";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="base" element={<Base />} />
            <Route path="addQuiz" element={<AddQuiz />} />
            <Route path="quiz" element={<Outlet />}>
              <Route path=":id" element={<Quiz />} />
              <Route path="menu/:id" element={<Menu />} />
              <Route path="resultados/:id" element={<Resultados />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
