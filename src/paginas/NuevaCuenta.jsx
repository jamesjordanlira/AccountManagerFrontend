import FormularioCuenta from "../components/FormularioCuenta";

const NuevaCuenta = () => {
  return (
    <>
      <h1 className="text-4xl text-center font-black">Crear Cuenta</h1>
      <div className="mt-10 flex justify-center">
        <FormularioCuenta />
      </div>
    </>
  )
}

export default NuevaCuenta