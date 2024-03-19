const URI_Producto = import.meta.env.VITE_API_PRODUCTO;

console.log(URI_Producto);

// POST
export const crearProductoAPI = async (productoNuevo) => {
  try {
    const respuesta = await fetch(URI_Producto, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoNuevo),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

//GET

export const leerProductosAPI = async () => {
  try {
    const respuesta = await fetch(URI_Producto);
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

//DELETE
export const borrarProductoAPI = async (id) => {
  try {
    const respuesta = await fetch(`${URI_Producto}/${id}`, {
      method: "DELETE",
    });
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};
//GET de un producto
export const obtenerProductoAPI = async (id) => {
  try {
    const respuesta = await fetch(`${URI_Producto}/${id}`);
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

//PUT
export const modificarProductoAPI = async (producto, id) => {
  try {
    const respuesta = await fetch(`${URI_Producto}/${id}`,{
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(producto)
    })
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

const userAdmin={
  email: "admin@rollingcoffee.com",
  password: "123Aa1233"
}

export const iniciarSesion = (usuario)=>{
 if(usuario.email === userAdmin.email && usuario.password === userAdmin.password){
  //loguear al usuario
  sessionStorage.setItem('loginRollingCoffee', JSON.stringify(userAdmin.email));
  return true;
 }else{
  return false;
 }
}
