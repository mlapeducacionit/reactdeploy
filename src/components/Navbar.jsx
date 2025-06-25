import { NavLink } from 'react-router'
import navItems from '../constants/nav-items'
import NavItem from './NavItem'

const Navbar = () => {

  return (
    <nav className='bg-gray-100 border-b border-gray-300'>
        <div className='max-w-7xl mx-auto px-4'>
            <div className='flex items-center justify-between h-12'>
                <a href="">Educación IT</a>
                
                <div className='flex items-center space-x-4'>

                    {
                        navItems.map(item => (
                            <NavItem key={item.id} item={item} />
                        ))
                    }

                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar