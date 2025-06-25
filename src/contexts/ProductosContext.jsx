import { createContext, useEffect, useState } from 'react';

// ! 1ero paso -> Creación del contexto
const ProductosContext = createContext()

// ! 2do paso -> Armado del Provider
// -> Los hooks de React y la lógica para interactuar (modificar/cambiar) los estados
const ProductosProvider = ({ children }) => {

    const [productos, setProductos] = useState(null)
    const [productoAEditar, setProductoAEditar] = useState(null)
    //console.log(import.meta.env.VITE_API_PRODUCTOS)
    const url = import.meta.env.VITE_API_PRODUCTOS

    useEffect(() => {
        // Cuando app se monte o nazca quiero que se haga la petición asincrónica
        obtenerProductos()
    }, []) // Array de referencias -> dependencias

    const obtenerProductos = async () => {

        try {
          const res = await fetch(url)
          if (!res.ok) {
            throw new Error('No se pudo obtener')
          }
          const data = await res.json()
          setProductos(data)
        } catch (error) {
          console.error(error)
        }
    
    }

     // CREATE
    const agregarProducto = async (nuevoProducto) => {
        console.log(nuevoProducto)
        delete nuevoProducto.id // id: null <- borro la key id
        try {

        // ! 1era una petición asincronica para crear el producto (back)

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(nuevoProducto) // ob js en string 
        }

        const res = await fetch(url, options)

        if (!res.ok) {
            throw new Error('No se pudo guardar el producto')
        }

        const productoGuardado = await res.json()

        // ! 2da Avisarle a react que se agrego un nuevo producto. (usando la función que modifica el estado (setProducts)) (front)
        
        const nuevoArrayProductos = [...productos, productoGuardado]
        console.log(nuevoArrayProductos)
        setProductos(nuevoArrayProductos) // ! REACT detecta que algo cambió y vuelve a renderizar el componente
        } catch (error) {
        console.error(error)
        }
    }

    // UPDATE
    const editarProducto = async (form) => {
        
        try {
        // ! 1ero petición para editar el producto en el backend

        const urlEdicion = url + form.id

        const options = {
            method: 'PUT',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(form)
        }

        const res = await fetch(urlEdicion, options)

        if ( !res.ok ) {
            throw new Error('No se pudo editar el producto')
        }

        const productoActualizado = await res.json()

        // ! 2do avisarle a react que esto sucedio. O sea refresque el estado con el producto con los datos actualizados (La interfaz se vuelva a renderizar leyendo el nuevo estado)

        const nuevoEstadoProductos = productos.map(prod => prod.id === productoActualizado.id ? productoActualizado : prod)
        setProductos(nuevoEstadoProductos) // <-- todos los productos más el producto editado.
        } catch (error) {
        console.error(error) 
        }
    }

    // DELETE                  3
    const eliminarProducto = async (id) => {

    try {
        // ! 1ero hacer una petición asincronica para eliminar el producto del backend
        const urlEliminacion = url + id
        const options = {
        method: 'DELETE'
        }
        const res = await fetch(urlEliminacion, options)
    
        if (!res.ok) {
        throw new Error('No se pudo eliminar el producto')
        }
    
        const productoEliminado = await res.json()
    
        // ! 2do modificar el estado para avisarle a react que vuelva a renderizar el componente
    
        const nuevoArrayProducto = productos.filter(prod => prod.id !== productoEliminado.id)
        setProductos(nuevoArrayProducto)
    } catch (error) {
        console.error(error)
    }
    }

    const data = {
        productos,
        productoAEditar,
        setProductoAEditar,
        agregarProducto,
        editarProducto,
        eliminarProducto
    }

    return <ProductosContext.Provider value={data}>{ children }</ProductosContext.Provider>
}

// ! 3ero paso -> Exportar el contexto y el provider
export { ProductosProvider } // <--- se exporta dentro de un objeto
export default ProductosContext // <--- se exporta como funcionalidad principal del módulo.