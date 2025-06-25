//rafce
import { useEffect } from 'react'
import App from '../App'

const Productos = () => {

    useEffect(() => {
        document.title = 'Educación IT - Productos'
    }, [])

  return (
    <App />

  )
}

export default Productos