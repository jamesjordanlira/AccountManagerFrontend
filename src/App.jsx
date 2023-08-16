import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AutLayout from './layouts/AutLayout';
import RutaProtegida from './layouts/RutaProtegida';

import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import NuevoPassword from './paginas/NuevoPassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import Cuentas from './paginas/Cuentas';
import NotFound from './paginas/NotFound';

import { AuthProvider } from './context/AuthProvider';
import { CuentasProvider } from './context/CuentasProvider';
import NuevaCuenta from './paginas/NuevaCuenta';
import Cuenta from './paginas/Cuenta';
import EditarCuenta from './paginas/EditarCuenta';

function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <CuentasProvider>
          <Routes>
            <Route path='/' element={ <AutLayout /> }>
              {/* Rutas publicas */}
              <Route index element={ <Login /> } />
              <Route path='registrar' element={ <Registrar /> } />
              <Route path='olvide-password' element={ <OlvidePassword /> } />
              <Route path='olvide-password/:token' element={ <NuevoPassword /> } />
              <Route path='confirmar/:id' element={ <ConfirmarCuenta /> } />
              <Route path="*" element={<NotFound />} />
            </Route>

              {/* Rutas privadas */}
              
            <Route path='/cuentas' element={ <RutaProtegida /> }>
              <Route index element={<Cuentas/>} />
              <Route path='crear-cuenta' element={<NuevaCuenta/>} />
              <Route path=':id' element={<Cuenta/>} />
              <Route path='editar/:id' element={<EditarCuenta/>} />
            </Route>

          </Routes>
        </CuentasProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
