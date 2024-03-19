import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { borrarProductoAPI, leerProductosAPI } from "../../../helpers/queries";
import { Link } from "react-router-dom";
const ItemProducto = ({ producto, setProductos }) => {
  const borrarProducto = () => {
    Swal.fire({
      title: "¿Esta seguro de eliminar el producto?",
      text: "No se puede revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //agregar la logica correspondiente para borrar el producto en la api
        const respuesta = await borrarProductoAPI(producto._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Producto eliminado",
            text: `El producto "${producto.nombreProducto}" fue eliminado correctamente`,
            icon: "success",
          });
          //actualizar la tabla del admin
          const respuestaProductos = await leerProductosAPI();
          if (respuestaProductos.status === 200) {
            const productosRestantes = await respuestaProductos.json();
            setProductos(productosRestantes);
          } else {
            Swal.fire({
              title: "Ocurrio un error",
              text: `No se pudo listar los productos`,
              icon: "error",
            });
          }
        } else {
          Swal.fire({
            title: "Ocurrio un error",
            text: `El producto "${producto.nombreProducto}" no fue eliminado. Intente esta operación en unos minutos`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr>
      <td className="text-center">{producto.id}</td>
      <td>{producto.nombreProducto}</td>
      <td className="text-end">${producto.precio}</td>
      <td className="text-center">
        <img
          src={producto.imagen}
          className="img-thumbnail"
          alt={producto.nombreProducto}
        ></img>
      </td>
      <td>{producto.categoria}</td>
      <td className="text-center">
        <Link
          className="btn btn-warning me-lg-2"
          to={"/administrador/editar/" + producto._id}
        >
          <i className="bi bi-pencil-square"></i>
        </Link>
        <Button variant="danger" onClick={borrarProducto}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
