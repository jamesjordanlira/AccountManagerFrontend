import useCuentas from "../hooks/useCuentas";
import PreviewCuenta from "../components/PreviewCuenta";
const Cuentas = () => {

  const { cuentas } = useCuentas();

  return (
    <>
      <h1 className="text-4xl font-black">Tus Cuentas</h1>
      <div className="bg-white shadow mt-10 rounded-lg">
        {cuentas.length ? 
          cuentas.map(cuenta => (
            <PreviewCuenta 
              key={cuenta._id}
              cuenta={cuenta}
            />
          )) : (
            <p className="text-center text-gray-600 uppercase p-5">No hay Cuentas aún</p>
          )}
      </div>
    </>
  )
}

export default Cuentas