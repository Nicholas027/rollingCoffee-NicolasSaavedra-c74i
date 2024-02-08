import { Button, Card, Col, Modal } from "react-bootstrap";
import { useState } from "react";

const CardProducto = ({
  nombreProducto,
  precio,
  categoria,
  descripcionBreve,
  descripcionAmplia,
  imagen,
  disponible,
  id,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <Col md={4} lg={3}>
      <Card className="m-1">
        <Card.Img variant="top" src={imagen} alt={nombreProducto} className="img-fluid w-100 imgCard"/>
        <Card.Body>
          <Card.Title className="txt-verdecito">{nombreProducto}</Card.Title>
          <Card.Text>
            {descripcionBreve} <br />
            <b>Precio: ${precio}</b>
          </Card.Text>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="success" onClick={handleModalOpen}>
              Ver más
            </Button>
          </div>
        </Card.Body>

        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles del Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{descripcionAmplia}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </Col>
  );
};

export default CardProducto;
