import { useContext } from 'react';
import AutContext from '../context/AuthProvider';

const useAuth = () => {
  return useContext(AutContext)
}

export default useAuth