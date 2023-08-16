
import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';


const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email === '' || email.length < 6) {
      setAlerta({
        msg: 'El Email es Obligatorio',
        error: true
      })
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {email} );
      setAlerta({
        msg: data.msg,
        error: false
      })
    } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
    }
  }

  const { msg } = alerta;

  return (
    <>
       <h1 className=" mt-5 md:mt-10 text-gray-600 font-black text-3xl md:text-5xl capitalize">Recupera tu cuenta y no pierdas tus demas {''}
        <span className="text-sky-700">Cuentas.</span>
      </h1>

       

      <form
        className='my-10 bg-white shadow rounded-lg p-5 md:w-1/2 md:mx-auto'
        onSubmit={handleSubmit}
      >
         { msg && <Alerta  alerta={alerta}/>}
        <div className="my-5">
          <label 
            htmlFor="email"
            className='uppercase text-gray-500 block text-xl font-bold'
          >Email</label>
          <input 
            id='email'
            type="email"
            placeholder='Email de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={email}
            onChange={ e => setEmail(e.target.value)}
          />
        </div>
        <input 
          type="submit" 
          value='Enviar Instrucciones'
          className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5'
        />
      </form>
      <nav className="lg:flex lg:justify-around">
      <Link
        className='block text-center my-2 text-slate-500 uppercase text-sm'
        to='/'
      >¿Ya tienes Cuenta? <span className='text-indigo-600 font-bold'>Inicia Sesión</span></Link>

        <Link
          className='block text-center my-2 text-slate-500 uppercase text-sm'
          to='/registrar'
        >¿No tienes una Cuenta? <span className='text-indigo-600 font-bold'>Regístrate</span></Link>

    </nav>
    </>
  )
}

export default OlvidePassword