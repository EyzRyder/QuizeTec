import { createBrowserRouter,createRoutesFromElements , Route} from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Layout from './pages/Layout';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
    <Route index element={<Home/>}/>
    <Route path='addQuiz' element={<Home/>}/>
    <Route path='base' element={<Home/>}/>
    <Route path='login' element={<Home/>}/>
      <Route path='sobre' element={<Sobre />}/>
  </Route>
));