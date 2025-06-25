// rafce

import { useContext } from "react"
import Formulario from "./components/Formulario"
import Tabla from "./components/Tabla"
import ProductosContext from "./contexts/ProductosContext"

const App = () => {

  const { productoAEditar } = useContext(ProductosContext)

  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">Formulario de {productoAEditar ? 'Edición' : 'Carga'}</h2>
      <Formulario />
      <h2 className="text-2xl font-semibold mb-2">Tabla de productos</h2>
      <Tabla />
    </>
  )
}

export default App