import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/common/Footer";
import Menu from "./components/common/Menu";
import Administrador from "./components/pages/Administrador";
import Inicio from "./components/pages/Inicio";
import Error404 from "./components/pages/Error404";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.min.css";

function App() {
  return (
    //administrador de rutas
    // www.rollingCoffee.com/
    <BrowserRouter>
      <Menu></Menu>
      <Routes>
        <Route exact path="/" element={<Inicio></Inicio>}></Route>
        <Route exact path="/administrador" element={<Administrador></Administrador>}></Route>
        {/* <Route exact path="/administrador/crear" element={<Administrador></Administrador>}></Route>
        <Route exact path="/administrador/editar" element={<Administrador></Administrador>}></Route> */}
        <Route path="*" element={<Error404></Error404>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
