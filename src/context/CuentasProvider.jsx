import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/clienteAxios';
// aqui el useNAvigate es para redireccionar automaticamente al registrar una cuenta nueva o asi para lo que queramos.
import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const CuentasContext = createContext();

const CuentasProvider = ({children}) => {

    const [cuentas, setCuentas] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [cuenta, setCuenta] = useState({});

    const [cargando, setCargando] = useState(false);
   

    
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        const ObtenerCuentas = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                  }
                }

                const { data } = await clienteAxios('/cuentas', config)
                setCuentas(data);
                
            } catch (error) {
                console.log(error);
            }
        }
        ObtenerCuentas();
    }, [auth]);

        const mostrarAlerta = alerta => {
            setAlerta(alerta);
        setTimeout(() => {
            setAlerta({});
        },3000)
    }


        const submitCuenta = async (cuenta) => {
             // si existe el id  entonces editando vendera como null que es el que creamos en el state de formulario proyecto es con el que identificamos si estamos creando o editando, si viene como null estamos creando y si viene el id de la bd estamos editando
             if(cuenta.id){
                await editarCuenta(cuenta);
             }else{
                await nuevaCuenta(cuenta);
             }
        }

        // 
        const nuevaCuenta = async (cuenta) => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.post('/cuentas', cuenta, config)
                // Para no tener que recargar para ver las nuevas cuentas que se crean}
                setCuentas([...cuentas, data]);
                setAlerta({
                    msg: 'Cuenta creada Correctamente',
                    error: false
                })           

                // usamos navigate
                setTimeout(() => {
                    setAlerta({})
                    navigate('/cuentas');
                }, 2000)
                                

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }

        const obtenerCuenta = async (id) => {
            setCargando(true);
            try {
                const token = localStorage.getItem('token');
                if(!token)return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios(`/cuentas/${id}`, config)
                setCuenta(data);
            } catch (error) {
                console.log(error);
            }finally{
                setCargando(false);
            }
        }

        const eliminarCuenta = async (id) => {
            try {
                const token = localStorage.getItem('token');
                if(!token)return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.delete(`/cuentas/${id}`, config)
                // sincronizar el state para que no tengamos que recargar para que se noten los cambios
                const cuentasActualizadas = cuentas.filter(cuentaState => cuentaState._id !== id);
                setCuentas(cuentasActualizadas);
                setAlerta({
                    msg: data.msg,
                    error: false
                })
                setTimeout(() => {
                    setAlerta({})
                    navigate('/cuentas');
                }, 3000)

            } catch (error) {
                console.log(error);
            }
        }

        const editarCuenta = async (cuenta) => {
            try {
                const token = localStorage.getItem('token');
                if(!token)return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.put(`/cuentas/${cuenta.id}`, cuenta, config)
                // Sincronizar el state
                const cuentasActualizadas = cuentas.map(cuentaState => cuentaState._id === data._id ? data : cuentaState);
                setCuentas(cuentasActualizadas);
                // Mostrar alerta
                setAlerta({
                    msg: 'Cuenta actualizada Correctamente',
                    error: false
                })
                // usamos el navigate 
                setTimeout( () => {
                    setAlerta({})
                    navigate('/cuentas');
                }, 3000);
            } catch (error) {
                console.log(error);
            }
        }

    return (
        <CuentasContext.Provider
            value={{
                cuentas,
                mostrarAlerta,
                alerta,
                submitCuenta,
                obtenerCuenta,
                cuenta,
                cargando,
                eliminarCuenta,
                
            }}
        >
            {children}
        </CuentasContext.Provider>
    )
}

export{
    CuentasProvider
}

export default CuentasContext