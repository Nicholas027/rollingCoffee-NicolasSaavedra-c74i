import { Form, Button, Container, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { iniciarSesion } from "../../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";


const Login = ({setUsuarioLogueado}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const navegacion = useNavigate();

  const onSubmit = (usuario) => {
    console.log(usuario)
    //pedir a la api verificar si existe ese usuario
    if(iniciarSesion(usuario)){
      Swal.fire({
        title: "Bienvenido",
        text: `Ingresaste al sistema rollingCoffee`,
        icon: "success",
      });
      setUsuarioLogueado(usuario.email)
      navegacion('/administrador')
    }else{
      Swal.fire({
        title: "Ocurrio un error",
        text: `campo/s invalido/s`,
        icon: "error",
      });
    }
  };

  return (
    <Container className="mainContainer">
      <Card className="my-5">
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese un email"
                {...register("email", {
                  required: "El email es obligatorio",
                  minLength: {
                    value: 10,
                    message: "El email debe contener al menos 10 caracteres",
                  },
                  maxLength: {
                    value: 250,
                    message: "El email debe contener como máximo 250 caracteres",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Ingrese una dirección de correo electrónico válida",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "El password es obligatorio",
                  minLength: { value: 8, message: "el minimo es de 8 caracteres" },
                  maxLength: {
                    value: 15,
                    message: "el maximo es de 15 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message: "El password debe contener al menos una letra mayúscula, una letra minúscula y un número",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
