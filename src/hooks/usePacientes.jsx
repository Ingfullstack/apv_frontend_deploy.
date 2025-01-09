import { useContext } from 'react';
import { PacientesProvider, PacientesContext } from '../context/PacientesProvider';

const usePacientes = () => {
  
    return useContext(PacientesContext);
}

export default usePacientes