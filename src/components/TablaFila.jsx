// rafce

import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import ProductosContext from "../contexts/ProductosContext";

const TablaFila = ({ product }) => { // props = { product }

  const {eliminarProducto, setProductoAEditar} = useContext(ProductosContext)
  
  const navigate = useNavigate()

  const handleEditar = (producto) => {
    //console.log(producto)
    setProductoAEditar(producto)
  }

  const handleEliminar = (id) => {

    Swal.fire({
      title: "¿Estás seguro que queres eliminar el producto?",
      text: "No se puede volver atrás",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si papaaaaa",
      cancelButtonText: "Noooooooooooooooo, está loco vo!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Borrado!",
          text: "Olvidate, lo perdiste!",
          icon: "success"
        });
        eliminarProducto(id)
      }
    });
    
  }

  const handleVer = (id) => {
    console.log(id)
    const url = `/productos/detalle/${id}`
    console.log(url)
    navigate(url)
  } 

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3">{product.nombre}</td>
      <td className="px-4 py-3">{product.categoria}</td>
      <td className="px-4 py-3">{product.precio}</td>
      <td className="px-4 py-3 flex gap-2">
        {/* <Link to={`/productos/detalle/${product.id}`}>Ver</Link> */}
        <button onClick={() => handleVer(product.id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">Ver</button>
        <button onClick={() => handleEditar(product)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm">Editar</button>
        <button 
          onClick={() => handleEliminar(product.id)} 
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
            Eliminar
        </button>
      </td>
    </tr>
  )
}

export default TablaFila