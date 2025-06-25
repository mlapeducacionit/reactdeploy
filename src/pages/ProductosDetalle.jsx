// rafce
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const ProductosDetalle = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const [productoDetail, setProductoDetail] = useState(null)
    const url = import.meta.env.VITE_API_PRODUCTOS

    useEffect(() => {
        obtenerProducto(id)
    }, [id])
    
    const obtenerProducto = async (id) => {

        try {
            const urlUnProducto = url + id

            const res = await fetch(urlUnProducto)

            if (!res.ok) {
                throw new Error('No se pudo obtener producto')
            }

            const producto = await res.json()

            setProductoDetail(producto)

        } catch (error) {
            console.error(error)
            navigate('/productos') 
        }
    }

  return (
    <div>
        <h1>Nombre:  { productoDetail && productoDetail.nombre}</h1>
    </div>
  )
}

export default ProductosDetalle