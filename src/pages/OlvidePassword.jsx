import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { clienteAxios } from "../config/axios";

function OlvidePassword() {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '') {
      setAlerta({
        msg: 'Email es obligatorio',
        error: true
      });
      return;
    }

    try {

      const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email });
      setAlerta({
        msg: data.msg,
        error: false
      })

      setEmail('');
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">
          Recupera tu Acceso y no Pierdas {" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-10 md:mt-0 bg-white shadow-lg p-5 rounded-lg">
        { alerta.msg && <Alerta alerta={ alerta }/>}
        <form onSubmit={ handleSubmit }>
          <div className="mb-3">
            <label
              className="block uppercase font-bold text-gray-600 text-xl"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ e => setEmail(e.target.value )}
              placeholder="Email de Registro"
              className="border w-full p-2 rounded-md mt-2 bg-gray-50"
            />
          </div>

          <input
            type="submit"
            value="Enviar Instrucciones"
            className="bg-indigo-600 w-full p-2 rounded-md text-white uppercase font-bold md:w-auto md: px-10 cursor-pointer hover:bg-indigo-700 transition-all"
          />
        </form>
        <nav className="flex flex-col md:flex-row md:justify-between text-sm text-gray-600 items-center mt-5 space-y-2">
          <Link to={"/"}>¿Ya tienes una cuenta?, Inicia Sesión</Link>
          <Link to={"/registrar"}>¿No tienes una cuenta?, Registrate</Link>
        </nav>
      </div>
    </>
  );
}

export default OlvidePassword;
