import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const ConfirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setAlerta({
          msg: data.msg,
          error: false
        })

        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    ConfirmarCuenta();
  }, []);

  const { msg } = alerta;
  return (
    <>
      <h1 className=' mt-5 md:mt-10 text-sky-600 font-black mx-10 md:mx-0 text-5xl capitalize'>Confirma tu cuenta y Organiza <span className='text-slate-700'>tus Cuentas</span>
      </h1> 
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        { msg && <Alerta alerta={alerta}/>}

        {cuentaConfirmada && (
          <Link
            className='block text-center my-2 text-slate-500 uppercase text-sm'
            to='/'
          ><span className='text-indigo-600 font-bold'>Iniciar sesión</span></Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta