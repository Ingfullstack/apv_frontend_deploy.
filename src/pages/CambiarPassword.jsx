import { useState } from "react";
import AdminNav from "../components/AdminNav"
import Alerta from '../components/Alerta';
import  useAuth  from '../hooks/useAuth';

const CambiarPassword = () => {

  const { guardarPassword } = useAuth();
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(password).some( campo => campo === '')) {
      setAlerta({
        msg: 'Todos los campos son obligatorio',
        error: true
      });
      return;
    }

    if (password.pwd_nuevo.length < 6) {
      setAlerta({
        msg: 'El password debe tener minimo 6 caracteres',
        error: true
      });
      return;
    }
    const repuesta = await guardarPassword(password)
    setAlerta(repuesta)
    setPassword({
      pwd_actual: '',
      pwd_nuevo: ''
    })
  }

  const { msg } = alerta;

  return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} 
            <span className="text-indigo-600 font-bold">Password aqui</span>
        </p>

        <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
        { msg && <Alerta alerta={ alerta }/>}
          <form onSubmit={ handleSubmit }>
            <div className="my-3">
              <label
                className="uppercase font-bold text-gray-600"
                htmlFor="pwd_actual"
              >
                Password Actual
              </label>
              <input
                type="password"
                name="pwd_actual"
                id="pwd_actual"
                placeholder="Escribe tu password actual"
                value={ password.pwd_actual }
                onChange={ (e) => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
              />
            </div>

            <div className="my-3">
              <label
                className="uppercase font-bold text-gray-600"
                htmlFor="pwd_nuevo"
              >
                Password Nuevo
              </label>
              <input
                type="password"
                name="pwd_nuevo"
                id="pwd_nuevo"
                placeholder="Escribe tu nuevo password"
                value={ password.pwd_nuevo }
                onChange={ (e) => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
              />
            </div>

            <input
              type="submit"
              value="Guardar Cambios"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default CambiarPassword