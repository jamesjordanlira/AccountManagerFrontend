import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import useCuentas from "../hooks/useCuentas";
import FormularioCuenta from "../components/FormularioCuenta";

const EditarCuenta = () => {

    const params = useParams();
    const { obtenerCuenta, cuenta, cargando } = useCuentas();

    useEffect(() => {
        obtenerCuenta(params.id);
    }, []);

    const { nombre } = cuenta;

    if(cargando) return 'Cargando...'

  return (
    <>
        <div className="mt-10 flex justify-center">
            <FormularioCuenta />
        </div>
    </>
  )
}

export default EditarCuenta