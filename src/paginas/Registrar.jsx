import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const Registrar = () => {

  const [name, setName] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
      e.preventDefault();
      if([name, apellidos, password, repetirPassword].includes('')){
        setAlerta({
          msg:'Todos los campos son Obligatorios',
          error: true
        })
        return;
      }

      // Comprobar password
      if(password !== repetirPassword){
        setAlerta({
          msg: 'Las contraseñas no Coinciden',
          error: true
        })
        return;
      }

      // pasa todas las validaciones
      setAlerta({});

      // Creando en la API
      try {
        const { data } = await clienteAxios.post('/usuarios', {name, apellidos, email, password})
        setAlerta({
          msg: data.msg,
          error: false
        })

        // se limpian los inputs
        setName('');
        setApellidos('');
        setEmail('');
        setPassword('');
        setRepetirPassword('');

      } catch (error) {
        // aquí caen los errores que responde del backend
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }

  }

  const { msg } = alerta;

  return (
    <>
      <div className="container flex flex-col justify-center items-center">
          <h1 className="titulo mt-5 text-2xl md:text-4xl md:mt-10 font-sans font-bold md:px-20 text-center"> 
              <span className="text-gray-500">DigitalAccountManager</span> te ayuda a Gestionar tus Cuentas,  
              <span className="text-indigo-600">Registrate</span> y no pierdas tus Accesos.
          </h1>

          <form 
              className="bg-white shadow-lg mt-7 p-10 md:w-1/2 w-full"
              onSubmit={handleSubmit}
          >
                <div className="mt-3">
                    <label htmlFor="nombre" className="block uppercase text-gray-500">Nombre</label>
                    <input 
                        id="nombre"
                        type="text" 
                        placeholder="Tu Nombre"
                        className="w-full bg-gray-100 mt-2 p-3 rounded-xl"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                  </div>

                  <div className="mt-3">
                    <label htmlFor="apellidos" className="block uppercase text-gray-500">Apellidos</label>
                    <input 
                        id="apellidos"
                        type="text" 
                        placeholder="Tus Apellidos"
                        className="w-full bg-gray-100 mt-2 p-3 rounded-xl"
                        value={apellidos}
                        onChange={e => setApellidos(e.target.value)}
                      />
                  </div>

                  <div className="mt-3">
                    <label htmlFor="email" className="block uppercase text-gray-500">Email</label>
                    <input 
                        id="email"
                        type="email" 
                        placeholder="Email de Registro"
                        className="w-full bg-gray-100 mt-2 p-3 rounded-xl"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                  </div>

                  <div className="mt-3">
                    <label htmlFor="password" className="block uppercase text-gray-500">Password</label>
                    <input 
                        id="password"
                        type="password" 
                        placeholder="Password"
                        className="w-full bg-gray-100 mt-2 p-3 rounded-xl"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                  </div>

                  <div className="mt-3">
                    <label htmlFor="repetir-password" className="block uppercase text-gray-500">Repetir Password</label>
                    <input 
                        id="repetir-password"
                        type="password" 
                        placeholder="Repetir Password"
                        className="w-full bg-gray-100 mt-2 p-3 rounded-xl"
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)}
                      />
                  </div>

                    { msg && <Alerta alerta={alerta}/>}


                  <input 
                    type="submit" 
                    value='Registrar'
                    className="bg-indigo-500 text-white font-bold w-full py-2 uppercase rounded hover:cursor-pointer hover:bg-indigo-600 transition-colors mt-10 mb-5"
                  />
          </form>

          <nav className='w-1/2 lg:flex lg:justify-between mb-5'>
              <Link
                className='block text-center my-2 text-slate-500 uppercase text-sm font-bold'
                to='/'
              >Ya tienes cuenta? <span className='text-indigo-700'>Inicia Sesión</span></Link>
              <Link
                className='block text-center my-2 text-slate-500 uppercase text-sm font-bold'
                to='/olvide-password'
              >Olvide password?</Link>
            </nav>
      </div>
    </>
  )
}

export default Registrar