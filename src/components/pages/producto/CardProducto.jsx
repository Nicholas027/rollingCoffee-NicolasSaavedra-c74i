import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const CardProducto = ({ producto }) => {
  return (
    <Col md={4} lg={3}>
      <Card className="m-1">
        <Card.Img variant="top" src={producto.imagen} />
        <Card.Body>
          <Card.Title className="txt-verdecito">
            {producto.nombreProducto}
          </Card.Title>
          <Card.Text>
            {producto.descripcion_breve}
            <br />
            <b>${producto.precio}</b>
          </Card.Text>
          <hr />
          <div className="d-flex justify-content-end">
            <Link
              className="btn btn-success"
              to={"/detalleProducto/" + producto._id}
            >
              Ver mas
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardProducto;
