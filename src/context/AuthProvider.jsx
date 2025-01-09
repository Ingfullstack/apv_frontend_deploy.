import { createContext, useEffect, useState } from "react";
import { clienteAxios } from "../config/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    useEffect(() => {
      const autenticarUsuario = async () => {
        const token = localStorage.getItem('token');

        if (!token){
            setCargando(false);
            return;
        }

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${ token }`
            }
        }

        try {

            const { data } = await clienteAxios.get('/veterinarios/perfil', config);
            setAuth(data)
            navigate('/admin');
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setAuth({})
        }
        setCargando(false)
      }
      autenticarUsuario();
    }, [])

    const actualizarPerfil = async ( datos ) => {
        const token = localStorage.getItem('token');

        if (!token){
            setCargando(false);
            return;
        }
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${ token }`
            }
        }

        try {

            const url = `/veterinarios/perfil/${ datos._id}`;
            const { data } = await clienteAxios.put(url, datos, config);
            return{
                msg: 'Almacenado Correctamente'
            }
        } catch (error) {
            return{
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async ( datos ) => {
        const token = localStorage.getItem('token');

        if (!token){
            setCargando(false);
            return;
        }
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${ token }`
            }
        }

        try {

            const url = '/veterinarios/actualizar-password';
            const { data } = await clienteAxios.put( url, datos, config );
            return{
                msg: data.msg,
                error: false
            }
        } catch (error) {
           return{
                msg: error.response.data.msg,
                error: true
           }
        }
    }
    

    return(
        <AuthContext.Provider value={{
            auth,
            setAuth,
            cargando,
            cerrarSesion,
            actualizarPerfil,
            guardarPassword
        }}>
            { children }
        </AuthContext.Provider>
    )
}