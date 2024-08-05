import { ReactNode } from "react";
import {
  Outlet,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// Pages
import Home from "@/pages/Home";
import Sobre from "@/pages/Sobre";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Base from "@/pages/Base";
import AddQuiz from "@/pages/AddQuiz";
import Menu from "@/pages/Menu";
import Quiz from "@/pages/Quiz";
import Resultados from "@/pages/Resultados";
import ForgotPassword from "@/pages/ForgotPassword";
import Register from "@/pages/registro/Register";
import RegisterTeacher from "@/pages/registro/RegisterTeacher";
import ResultDetails from "@/pages/ResultDetails";
import MateriasMenu from "@/pages/MateriasMenu";
import Error from "@/pages/Error";

// Lib
import { useUserStore } from "@/lib/store";

//Loader
import { materiaLoader } from "@/loaders/MateriasMenuLoader";
import { quizLoader } from "@/loaders/QuizLoader";
import { menuLoader } from "@/loaders/MenuLoader";
import { resultadosLoader } from "./loaders/ResultadosLoader";
import { resultDetailsLoader } from "./loaders/ResultadosDetailsLoader";
import { editQuizLoader } from "./loaders/EditQuizLoader";

const Routing = () => {
  const { user } = useUserStore();
  const RequireAuth = ({ children }: { children: ReactNode }) => {
    return user ? <>{children}</> : <Navigate to="/login" />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "sobre",
          element: <Sobre />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "esqueceuSenha",
          element: <ForgotPassword />,
        },
        {
          path: "register",
          children: [
            {
              index: true,
              element: <Register />,
            },
            {
              path: "admProfessor",
              element: <RegisterTeacher />,
            },
          ],
        },
        {
          path: "base",
          element: (
            <RequireAuth>
              <Base />
            </RequireAuth>
          ),
        },
        {
          path: "addQuiz",
          loader: editQuizLoader,
          element: (
            <RequireAuth>
              <AddQuiz />
            </RequireAuth>
          ),
        },
        {
          path: "edit/:id",
          loader: editQuizLoader,
          element: (
            <RequireAuth>
              <AddQuiz />
            </RequireAuth>
          ),
        },
        {
          path: "quiz/:materia",
          element: (
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          ),
          children: [
            {
              index: true,
              loader: materiaLoader,
              element: <MateriasMenu />,
            },
            {
              path: ":grade/:title/:id",
              children: [
                {
                  path: "play",
                  element: <Quiz />,
                  loader: quizLoader,
                },
                {
                  path: "menu",
                  loader: menuLoader,
                  element: <Menu />,
                },
                {
                  path: "results",
                  loader: resultadosLoader,
                  element: <Resultados />,
                },
                {
                  path: "answers-details/:userId/:email/:name",
                  loader: resultDetailsLoader,
                  element: <ResultDetails />,
                },
              ],
            },
          ],
        },
        {
          path: "*",
          element: <div>NotFound</div>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routing;

/*
    *
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="login" element={<Login />} />
            <Route path="esqueceuSenha" element={<ForgotPassword />} />
            <Route path="register" element={<Outlet />}>
              <Route index element={<Register />} />
              <Route path="admProfessor" element={<RegisterTeacher />} />
            </Route>
            <Route
              path="base"
              element={
                <RequireAuth>
                  <Base />
                </RequireAuth>
              }
            />
            <Route
              path="addQuiz"
              element={
                <RequireAuth>
                  <AddQuiz />
                </RequireAuth>
              }
            />
            <Route
              path="materia/:materia"
              loader={materiaLoader}
              element={
                <RequireAuth>
                  <MateriasMenu />
                </RequireAuth>
              }
            />
            <Route
              path="quiz"
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route path=":id" element={<Quiz />} />
              <Route path="menu/:id" element={<Menu />} />
              <Route path="resultados/:title/:id" element={<Resultados />} />
              <Route
                path="resultados/:id/:userId"
                element={<ResultDetails />}
              />
            </Route>
            <Route path="*" element={<div>NotFound</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    */
