import { useState, useEffect } from "react";
import { Container, Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Administrador = () => {
  const [productos, setProductos] = useState([]);
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  const handleAgregarModalOpen = () => {
    setShowAgregarModal(true);
  };

  const handleAgregarModalClose = () => setShowAgregarModal(false);

  const onSubmit = (producto) => {
    console.log(producto);
  };

  return (
    <Container className="mainContainer mt-3">
      <div className="table-responsive">
        <h2 className="lead display-3">Productos Disponibles:</h2>
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary" onClick={handleAgregarModalOpen}>
            <i className="bi bi-plus-lg"></i> Agregar
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
          <Modal.Title className="lead">
            <strong>Nuevo Producto</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="nombreProducto">
              <Form.Label>Producto*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                {...register("nombreProducto", {
                  required: "El nombre del producto es obligatorio",
                  minLength: {
                    value: 2,
                    message: "Debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "No debe superar los 30 caracteres",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.nombreProducto?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="precio">
              <Form.Label>Precio*</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el precio"
                {...register("precio", {
                  required: "El precio del producto es obligatorio",
                  min: {
                    value: 100,
                    message: "Debe ingresar un monto de almenos $100",
                  },
                  max: {
                    value: 10000,
                    message: "Debe ingresar como maximo un monto de $10.000",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.precio?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="imagen">
              <Form.Label>Imagen URL*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la URL de la imagen"
                {...register("imagen", {
                  required: "La URL de la imagen es obligatoria",
                  pattern: {
                    value: /(http|https):\/\/.*\/img/,
                    message: "Formato de URL obligatorio",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.imagen?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="categoria">
              <Form.Label>Categoría*</Form.Label>
              <Form.Select
                defaultValue=""
                {...register("categoria", {
                  required: "Seleccione una opción",
                })}
              >
                <option value="" disabled>
                  Seleccione una categoría
                </option>
                <option value="bebidaCaliente">Bebida Caliente</option>
                <option value="bebidaFria">Bebida Fría</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.categoria?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="descripcionBreve">
              <Form.Label>Descripcion breve*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese una descripcion breve"
                {...register("descripcionBreve", {
                  required: "Inserte una descripción breve por favor",
                  minLength: {
                    value: 50,
                    message: "Debe tener al menos 50 caracteres",
                  },
                  maxLength: {
                    value: 150,
                    message: "No debe superar los 20 caracteres",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.descripcionBreve?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="descripcionAmplia">
              <Form.Label>Descripcion Amplia*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese una descripcion amplia"
                {...register("descripcionAmplia", {
                  required: "Inserte una descripción amplia por favor",
                  minLength: {
                    value: 150,
                    message: "Debe tener al menos 150 caracteres",
                  },
                  maxLength: {
                    value: 300,
                    message: "No debe superar los 300 caracteres",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.descripcionAmplia?.message}
              </Form.Text>
            </Form.Group>
            <Button variant="success" type="submit" className="mt-3">
              Agregar nuevo producto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Administrador;
