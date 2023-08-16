import { useState, useEffect, createContext} from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const AutContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    const navigate = useNavigate();

    useEffect( () => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            // validar que el token exista
            if(!token){
                setCargando(false);
                return;
            }

            // Configuracion de autenticacion(bearer, token, headers)
            const config = {
                // configuramos los headers
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data.usuario);
                navigate('/cuentas'); //redirecciona y hace que te  mantengas en la sesion
            } catch (error) {
                setAuth({})
            }

            setCargando(false);
        }
        autenticarUsuario();
    }, []);

    // ponemos disponibles los datos 
    return(
        <AutContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AutContext.Provider>
    )
}

export {
    AuthProvider
}

export default AutContext

