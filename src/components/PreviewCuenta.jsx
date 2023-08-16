import { Link } from "react-router-dom";

const PreviewCuenta = ({cuenta}) => {
    const { nombre, _id } = cuenta;
  return (
    <div className="border-b p-5 flex">
      <p className="flex-1">
        {nombre}
      </p>
      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      >Ver esta Cuenta</Link>
    </div>
  )
}

export default PreviewCuenta