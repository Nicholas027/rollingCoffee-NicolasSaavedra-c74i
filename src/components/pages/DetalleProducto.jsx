import { Container, Card, Row, Col } from "react-bootstrap";
import { obtenerProductoAPI } from "../../helpers/queries";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetalleProducto = () => {
  const [producto, setProducto] = useState({})
  const {id} = useParams();
  useEffect(()=>{
      cargarDatosProducto();
  },[])

  const cargarDatosProducto = async()=>{
 
    const respuesta = await obtenerProductoAPI(id)
    if(respuesta.status === 200){
      setProducto(await respuesta.json());
    }
  }

  return (
    <Container className="my-3 mainContainer">
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img
              variant="top"
              src={producto.imagen}
              alt={producto.nombreProducto}
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title className="primary-font">{producto.nombreProducto}</Card.Title>
              <hr />
              <Card.Text>
              {producto.descripcion_amplia}
              <br/>
              <br/>
              <span className="primary-font fw-semibold ">Categoria:</span> {producto.categoria}
              <br className='mb-3'/>
              <span className="primary-font fw-semibold ">Precio: ${producto.precio}</span></Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetalleProducto;
