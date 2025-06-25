//rafce

import { useContext, useEffect, useState } from "react"
import ProductosContext from "../contexts/ProductosContext"

const Formulario = () => { // props = { agregarProducto }

  const { 
    agregarProducto, 
    productoAEditar, 
    setProductoAEditar, 
    editarProducto } = useContext(ProductosContext)

  const formInicial = {
    id: null,
    nombre: '',
    categoria: '',
    precio: ''
  } 

  const [form, setForm] = useState(formInicial)

  useEffect(() => {
    //                          editar          :       crear
    //                           obj            :        null
    productoAEditar ? setForm(productoAEditar)  : setForm(formInicial)
  }, [productoAEditar]) // null -> { } -> null -> { }

  const handleChange = (e) => {
    //console.log(e.target.name)
    //console.log(e.target.value)
    //debugger
    const nuevoForm = {
      ...form,
      [e.target.name]: e.target.value
    }

    setForm(nuevoForm)

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log('--> Enviando el form...', form)

    if (form.id === null) {
      agregarProducto(form)
    } else {
      editarProducto(form)
    }

    handleReset()

  }

  const handleReset = () => {
    setForm(formInicial)
    setProductoAEditar(null)
  }

  return (
    <form onSubmit={handleSubmit} className="border border-green-500 rounded-2xl w-full max-w-md px-6 py-4 mb-10">
      {/* Campo Nombre */}
      <div className="mb-4">
        <label htmlFor="lbl-nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input 
          type="text" 
          id="lbl-nombre" 
          name="nombre"
          placeholder="Escriba su nombre"
          className="w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
          value={form.nombre}
          onChange={handleChange}
        />
      </div>

      {/* Campo Categoría */}
      <div className="mb-4">
        <label htmlFor="lbl-categoria" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
        <input 
          type="text" 
          id="lbl-categoria" 
          name="categoria"
          placeholder="Escriba su categoría"
          className="w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
          value={form.categoria}
          onChange={handleChange}
        />
      </div>

      {/* Campo Precio */}
      <div className="mb-4">
        <label htmlFor="lbl-precio" className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
        <input 
          type="text" 
          id="lbl-precio" 
          name="precio"
          placeholder="Escriba su precio"
          className="w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
          value={form.precio}
          onChange={handleChange}
        />
      </div>


      <div className="flex gap-3 mb-6">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          { productoAEditar ? 'Editar' : 'Crear' } 
        </button>
        <button type="reset" onClick={handleReset} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Limpiar</button>
      </div>
    </form>
  )
}

export default Formulario