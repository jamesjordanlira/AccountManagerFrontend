import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect( () => {
    const comprobarToken = async () => {
      try {
         await clienteAxios(`/usuarios/olvide-password/${token}`)
        //  Si llega hasta aqui el token ya se valido en el backend y es correcto, si no caera en el cathch
          setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.length < 6 ){
      setAlerta({
        msg: 'El Password debe ser de minimo 6 caracteres',
        error: true
      })
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password })
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;

  console.log(msg);

  return (
    <>
    
    <h1 className="mt-5 md:mt-10 text-sky-600 font-black text-5xl capitalize">Reestablece tu Password y 
      administra tus {''}
        <span className="text-slate-700">Cuentas.</span>
      </h1>
      { msg && <Alerta alerta={alerta}/> }
      { tokenValido && (
          <form 
          className="my-10 bg-white shadow rounded-lg p-5 md:w-1/2 mx-auto"
          onSubmit={handleSubmit}
        >
          
          <div className="my5">
            <label 
              className="uppercase text-gray-500 block text-xl font-bold"
              htmlFor="password"
            >Nuevo Password</label>
            <input 
              id="password"
              type="password"
              placeholder="Ingresa tu nievo Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={ e => setPassword(e.target.value)}
            />
          </div>
  
          <input 
            type="submit"
            value='Guardar nuevo password'
            className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors my-5" 
          />
  
        </form>
      )}

      { passwordModificado && (
        <Link
            className='block text-center my-2 text-slate-500 uppercase text-sm'
            to='/'
          ><span className='text-indigo-600 font-bold'>Inicia Sesión</span></Link>

          )}
    
      
    </>
  )
}

export default NuevoPassword