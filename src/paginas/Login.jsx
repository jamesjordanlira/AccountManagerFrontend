
import lentes from '../img/lentes.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son Obligatorios',
        error: true
      })
      return;
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/login', {email, password})
      setAlerta({});
      // almacenar el token
      localStorage.setItem('token', data.token);
      // guardar valores en el context
      setAuth(data);
      navigate('/cuentas'); //redirecciona y hace que te  mantengas en la sesion
    
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;

  return (
    <>
   
      <div className="bodybg min-h-screen pt-10">
            <h1 className="titulo text-white text-2xl md:text-4xl font-bold pt-5 text-center ">
              Inicia sesión y <span className="text-black">Administra tus Cuentas</span> para que no las olvides o si ya no las recuerdas <span className="text-green-500">Las recuperes</span>
            </h1>
            <figure className=' max-w-md mx-auto mt-3'>
              <img src={lentes} alt="" className=' w-52 mx-auto'/>
            </figure>

            <form 
              className="bg-white mt-5 md:mt-3 w-auto mx-auto md:w-1/2 px-20 py-10 shadow-2xl rounded-lg"
              onSubmit={handleSubmit}
            >

              {msg && <Alerta  alerta={alerta} />}


              <div className="mt-5">
                <label htmlFor="email" className="block uppercase text-gray-500">Email</label>
                <input 
                    id="email"
                    type="email" 
                    placeholder="Email de Registro"
                    className="w-full bg-gray-100 mt-3 p-3 rounded-xl"
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                  />
              </div>

              <div className="mt-5">
                <label htmlFor="password" className="block uppercase text-gray-500">Password</label>
                <input 
                    id="password"
                    type="password" 
                    placeholder="Password de Registro"
                    className="w-full bg-gray-100 mt-3 p-3 rounded-xl"
                    value={password}
                    onChange={ e => setPassword(e.target.value)}
                  />
              </div>

              <input 
                type="submit" 
                value='Iniciar Sesíon'
                className="bg-gray-600 text-white font-bold w-full py-2 uppercase rounded hover:cursor-pointer hover:bg-black transition-colors mt-10 mb-5"
                
              />

            </form>
            <nav className='lg:flex lg:justify-around pb-3'>
              <Link
                className='block text-center my-2 text-slate-500 uppercase text-sm font-bold'
                to='registrar'
              >¿No tienes cuenta? <span className='text-indigo-700'>Registrate</span></Link>
              <Link
                className='block text-center my-2 text-slate-500 uppercase text-sm font-bold'
                to='olvide-password'
              >Olvide password?</Link>
            </nav>
      </div>
     
    </>
  )
}

export default Login