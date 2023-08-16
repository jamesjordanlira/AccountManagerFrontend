import  notFound  from '../img/notFound.jpg';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="from-gray-400 to-white  bg-gradient-to-l  min-h-screen w-screen flex flex-col justify-center items-center">
        <h1 className='mb-10 titulo font-bold uppercase text-2xl md:text-4xl'> Page Not Found <span className='text-4xl'>404</span> </h1>
        <figure className=' w-screen md:w-1/2  blur-sm hover:blur-none transition-all cursor-pointer'>
          <img src={notFound} alt="" className='px-10 md:px-5 hover:scale-110'  />
        </figure>
        <nav className=' w-screen lg:flex lg:justify-around items-center my-10'>
              <Link
                className='block text-center my-2 text-slate-500 uppercase text-sm font-bold titulo hover:underline'
                to='/'
              >Ya tienes cuenta? <span className='text-indigo-700'>Inicia Sesión</span></Link>
                <Link
                  className='block text-center my-2 text-slate-500 uppercase text-sm font-bold titulo hover:underline'
                  to='registrar'
                >¿No tienes cuenta? <span className='text-indigo-700'>Registrate</span></Link>
                <Link
                  className='block text-center my-2 text-slate-500 uppercase text-sm font-bold titulo hover:underline'
                  to='olvide-password'
                >Olvide password?</Link>
        </nav>
    </div>
  )
}

export default NotFound