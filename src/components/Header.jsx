import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {

  const { cerrarSesion } = useAuth();

  return (
    <header className="bg-indigo-600 py-10">
      <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <h1 className="font-bold text-2xl text-indigo-200 mx-2 text-center">Administrador de Pacientes de {''}
          <span className="text-white font-black">Veterinaria</span>
        </h1>

        <nav className='mx-2 flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0'>
          <Link to="/admin" className='text-white font-bold uppercase text-sm'>Pacientes</Link>
          <Link to="/admin/perfil" className='text-white font-bold uppercase text-sm'>Perfil</Link>
          <button onClick={ cerrarSesion } type='button' className='text-white font-bold uppercase text-sm'>Cerrar Sesion</button>
        </nav>
      
      </div>
    </header>
  )
}

export default Header