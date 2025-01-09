import { createContext, useEffect, useState } from "react";
import { clienteAxios } from '../config/axios';
import useAuth from '../hooks/useAuth';


export const PacientesContext = createContext( null );

export const PacientesProvider = ({ children }) => {

    const { auth } = useAuth();
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() => {
      const obtenerPacientes = async () => {

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ token }`
                }
            }

            const { data } = await clienteAxios.get('/pacientes', config)
            setPacientes(data)
        } catch (error) {
            
        }
      }

      obtenerPacientes();
    }, [auth])


    const guardarPaciente = async ( paciente ) => {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        
        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${ paciente.id }`, paciente, config )
                
                const pacienteActualizado = pacientes.map((pacienteState => pacienteState._id === data._id ? data : pacienteState ));
                setPacientes(pacienteActualizado);
            } catch (error) {
                console.log(error.response.data.msg)
            }

            return;
        }else{
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config )
                const {createdAt,updatedAt, __v, ...pacienteAlmacenado } = data;
                setPacientes([pacienteAlmacenado, ...pacientes]);
                
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }

    const setEdicion = ( paciente ) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async ( id ) => {

        try {

            const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.delete(`/pacientes/${ id }`, config )
        
        const pacienteActualizado = pacientes.filter((pacienteState) => pacienteState._id !== id );
        setPacientes(pacienteActualizado);

        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return(
        <PacientesContext.Provider value={{
            guardarPaciente,
            pacientes,
            setEdicion,
            paciente,eliminarPaciente
        }}>
            { children }
        </PacientesContext.Provider>
    )
}


