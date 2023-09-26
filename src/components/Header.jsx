import { Link } from 'react-router-dom';

import useCuentas from '../hooks/useCuentas';
import useAuth from '../hooks/useAuth';

const Header = () => {

    const { cerrarSesionCuentas } = useCuentas();
    const { cerrarSesionAuth } = useAuth();

    const handleCerrarSesion = () => {
        cerrarSesionCuentas();
        cerrarSesionAuth();
        localStorage.removeItem('token');
    }

  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between md:flex-row flex justify-center flex-col space-y-6 w-full">
            <h2 className="text-4xl text-sky-600 font-black text-center hover:text-sky-700 cursor-pointer">
                <Link to={'/cuentas'}>AccountManager</Link> 
            </h2>
            <input 
                type="search" 
                placeholder="Buscar Proyecto"
                className="rounded-lg lg:w-96 block p-2 border"
             />

             <div className='flex items-center gap-4'>
                <Link 
                    to={'/cuentas'}
                    className='font-bold uppercase hover:underline'
                >Cuentas</Link>

                <button 
                    type='button'
                    className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
                    onClick={handleCerrarSesion}
                >Cerrar Sesión</button>
             </div>
        </div>
    </header>
  )
}

export default Header