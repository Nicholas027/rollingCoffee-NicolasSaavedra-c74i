import { Container, Table, Button } from "react-bootstrap";
import ItemProducto from "./producto/ItemProducto";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { leerProductosAPI } from "../../helpers/queries";
import Swal from "sweetalert2";

const Administrador = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const respuesta = await leerProductosAPI();
    if (respuesta.status === 200) {
      //guardar el array en el state
      const datos = await respuesta.json();
      setProductos(datos);
    }else{
      Swal.fire({
        title: "Ocurrio un error",
        text: `Intenta esta operación en unos minutos.`,
        icon: "error"
      });
    }
  };

  return (
    <Container className="mainContainer">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 ">Productos disponibles</h1>
        <Link className="btn btn-primary" to="/administrador/crear">
          <i className="bi bi-file-earmark-plus"></i>
        </Link>
      </div>
      <div className="table-responsive">
        <Table responsive striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Cod</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>URL de Imagen</th>
              <th>Categoria</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {
              productos.map((producto)=> <ItemProducto key={producto.id} producto={producto} setProductos={setProductos}></ItemProducto>)
            }
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Administrador;
