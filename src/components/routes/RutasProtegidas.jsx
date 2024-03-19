import { Navigate } from "react-router-dom";

const RutasProtegidas = ({children}) => {
   //agregar la logica necesaria para chequear que alguien es administrador
   const admin = JSON.parse(sessionStorage.getItem('loginRollingCoffee')) || null;
   //preguntar si no hay nadie logueado
   if(!admin){
    // si no soy admin entonces
    return <Navigate to='/login'></Navigate>
   }else{
    //si soy el admin
    return children;
   }
};

export default RutasProtegidas;