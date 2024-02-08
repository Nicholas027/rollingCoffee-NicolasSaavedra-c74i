import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import banner from "../../assets/pexels-amar-preciado-13591748.jpg";

const Inicio = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then((response) => response.json())
      .then((data) =>
       setProductos(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  return (
    <>
      <img src={banner} alt="Banner" className="bannerHome w-100" />
      <Container className="mainContainer">
        <section>
          <h2 className="display-3 mt-4">Nuestros productos</h2>
          <hr />
          <article className="m-4">
            <Row className="justify-content-around">
              {productos.map((producto) => (
                <CardProducto
                  key={producto.id}
                  nombreProducto={producto.nombreProducto}
                  precio={producto.precio}
                  categoria={producto.categoria}
                  descripcionBreve={producto["descripcion-breve"]}
                  descripcionAmplia={producto["descripcion-amplia"]}
                  imagen={producto.imagen}
                  disponible={producto.disponible}
                  id={producto.id}
                />
              ))}
            </Row>
          </article>
        </section>
      </Container>
    </>
  );
};

export default Inicio;
