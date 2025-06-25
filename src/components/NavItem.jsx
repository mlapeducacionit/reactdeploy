import React from 'react'
import { NavLink } from 'react-router'

const NavItem = ({item}) => {

  const cambiarColor = ({isActive}) => (isActive ? { color: 'gold' } : { color: 'black' } )

  return (
    <NavLink 
        style={cambiarColor} className="text-gray-900 font-medium hover:text-blue-600" to={item.ruta}
    >
            {item.nombre}
    </NavLink>
  )
}

export default NavItem