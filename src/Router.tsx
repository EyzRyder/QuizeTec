import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Base from "./pages/Base";
import AddQuiz from "./pages/AddQuiz";
import Menu from "./pages/Menu";
import Quiz from "./pages/Quiz";
import Resultados from "./pages/Resultados";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="sobre" element={<Sobre />} />
      <Route path="login" element={<Login />} />
      <Route path="base" element={<Base />} />
      <Route path="addQuiz" element={<AddQuiz />} />
      <Route path="quiz" element={<Outlet />}>
        <Route path=":id/:questionIndex" element={<Quiz />} />
        <Route path="menu/:id" element={<Menu />} />
        <Route path="resultados/:id" element={<Resultados />} />
      </Route>
    </Route>
  )
);
