import { useState, useEffect } from "react";
import { Container, Modal, Button, Form } from "react-bootstrap";

const Administrador = () => {
  const [productos, setProductos] = useState([]);
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [formulario, setFormulario] = useState({
    nombreProducto: "",
    precio: "",
    imagen: "",
    categoria: "",
    descripcionBreve: "",
    descripcionAmplia: "",
  });
  const [errores, setErrores] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  const handleAgregarModalOpen = () => {
    setFormulario({
      nombreProducto: "",
      precio: "",
      imagen: "",
      categoria: "bebidaCaliente",
      descripcionBreve: "",
      descripcionAmplia: "",
    });
    setErrores({});
    setShowAgregarModal(true);
  };

  const handleAgregarModalClose = () => setShowAgregarModal(false);

  const handleAgregarProducto = () => {
    const nuevosErrores = {};
    if (!formulario.nombreProducto) {
      nuevosErrores.nombreProducto = "Ingrese el nombre del producto";
    }
    if (!formulario.precio) {
      nuevosErrores.precio = "Ingrese el precio del producto";
    }
    if (!formulario.imagen) {
      nuevosErrores.imagen = "Ingrese la URL de la imagen";
    }
    if (!formulario.categoria) {
      nuevosErrores.categoria = "Seleccione una categoria";
    }
    if (!formulario.descripcionBreve) {
      nuevosErrores.descripcionBreve = "Ingrese una descripcion breve";
    }
    if (!formulario.descripcionAmplia) {
      nuevosErrores.descripcionAmplia = "Ingrese una descripcion Amplia";
    }

    if (Object.keys(nuevosErrores).length === 0) {
      setProductos([...productos, formulario]);
      handleAgregarModalClose();
    } else {
      setErrores(nuevosErrores);
    }
  };

  const handleEditarProducto = (id) => {};

  const handleBorrarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  return (
    <Container className="mainContainer mt-3">
      <div className="table-responsive">
        <h2 className="lead">Productos Disponibles:</h2>
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary" onClick={handleAgregarModalOpen}>
          <i className="bi bi-plus-lg"></i>
          </button>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Cod</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Url Img</th>
              <th>Categoria</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombreProducto}</td>
                <td>{producto.precio}</td>
                <td>
                  <div className="middle-item">
                    <img
                      className="img-fluid w-50"
                      src={producto.imagen}
                      alt={producto.nombreProducto}
                    />
                  </div>
                </td>
                <td>{producto.categoria}</td>
                <td>
                  <button
                    className="btn btn-success mb-2"
                    onClick={() => handleEditarProducto(producto.id)}
                  >
                    <i className="bi bi-pen-fill"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleBorrarProducto(producto.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showAgregarModal} onHide={handleAgregarModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombreProducto">
              <Form.Label>Producto*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                isInvalid={!!errores.nombreProducto}
              />
            <Form.Control.Feedback type="invalid">
              {errores.nombreProducto}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="precio">
              <Form.Label>Precio*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el precio"
                isInvalid={!!errores.precio}
              />
            <Form.Control.Feedback type="invalid">
              {errores.precio}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="imagen">
              <Form.Label>Imagen URL*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la URL de la imagen"
                isInvalid={!!errores.imagen}
              />
            <Form.Control.Feedback type="invalid">
              {errores.imagen}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="categoria">
              <Form.Label>Categoría*</Form.Label>
              <Form.Select
                defaultValue="bebidaCaliente"
                isInvalid={!!errores.categoria}
              >
                <option value="bebidaCaliente">Bebida Caliente</option>
                <option value="bebidaFria">Bebida Fría</option>
              </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errores.categoria}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="descripcionBreve">
              <Form.Label>Descripcion breve*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese una descripcion breve"
                isInvalid={!!errores.descripcionBreve}
              />
            <Form.Control.Feedback type="invalid">
              {errores.descripcionBreve}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="descripcionAmplia">
              <Form.Label>Descripcion Amplia*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese una descripcion amplia"
                isInvalid={!!errores.descripcionAmplia}
              />
            <Form.Control.Feedback type="invalid">
              {errores.descripcionAmplia}
            </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleAgregarProducto()}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Administrador;
