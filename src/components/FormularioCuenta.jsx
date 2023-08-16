import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCuentas from "../hooks/useCuentas";
import Alerta from "./Alerta";

const FormularioCuenta = () => {


    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [email_telefono_redSocial, setEmail_telefono_redSocial] = useState('');
    const [password, setPassword] = useState('');

    const params = useParams();
    const { mostrarAlerta, alerta, submitCuenta, cuenta } = useCuentas();

    useEffect(() => {
        // Si hay algo en la url significa que estamos editando, si no hay nada estamos creando
        if(params.id){
            setId(cuenta._id);
            setNombre(cuenta.nombre);
            setEmail_telefono_redSocial(cuenta.email_telefono_redSocial);
            setPassword(cuenta.password);
        }else{

        }
    }, [params]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if([nombre, email_telefono_redSocial, password].includes('')){
            mostrarAlerta({
                msg: 'Todos los campos son Obligatorios',
                error: true
            });
            return;
        }

        // pasar los datos hacia el provider
        await submitCuenta({id, nombre, email_telefono_redSocial, password})
        // limpiar campos
        setId(null);
        setNombre('');
        setEmail_telefono_redSocial('');
        setPassword('');

    }

    const {msg} = alerta; 

  return (
    <form
        className="bg-white py-10 px-5 w-screen md:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
    >

    {msg && <Alerta alerta={alerta}/>}

      <div className="my-2">
        <label 
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold text-sm"
        >
            Nombre de la Cuenta
        </label>
        <input 
            type="text"
            id="nombre"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre de la Cuenta"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label 
            htmlFor="email_telefono_redSocial"
            className="text-gray-700 uppercase font-bold text-sm"
        >
            Email, Telefono o Red social
        </label>
        <input 
            type="text"
            id="email_telefono_redSocial"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Email, Telefono o Red social asociada a la Cuenta"
            value={email_telefono_redSocial}
            onChange={e => setEmail_telefono_redSocial(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label 
            htmlFor="password"
            className="text-gray-700 uppercase font-bold text-sm"
        >
            Password
        </label>
        <input 
            type="text"
            id="password"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Password de la Cuenta"
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
      </div>

      <input 
        type="submit"
        className="mt-5 bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        value='Guardar Cuenta'
    />

    </form>
  )
}

export default FormularioCuenta