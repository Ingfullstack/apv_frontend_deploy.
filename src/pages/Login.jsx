import { Link, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { useState } from "react";
import Alerta from "../components/Alerta";
import { clienteAxios } from '../config/axios';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorio',
        error: true
      });
      return;
    }

    try {

      const { data } = await clienteAxios.post('/veterinarios/login', { email, password });
      localStorage.setItem('token', data.token);
      setAuth(data)
      navigate('/admin')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">
          Inicia Sesion y Administra tus{" "}
          <span className="text-black">Pacientes</span>
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

          <div className="mb-5">
            <label
              className="block uppercase font-bold text-gray-600 text-xl"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={ password }
              onChange={ e => setPassword(e.target.value )}
              placeholder="Password de Registro"
              className="border w-full p-2 rounded-md mt-2 bg-gray-50"
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesion"
            className="bg-indigo-600 w-full p-2 rounded-md text-white uppercase font-bold md:w-auto md: px-10 cursor-pointer hover:bg-indigo-700 transition-all"
          />
        </form>

        <nav className="flex flex-col md:flex-row md:justify-between text-sm text-gray-600 items-center mt-5 space-y-2">
          <Link to={"/registrar"}>¿No tienes una cuenta?, Registrate</Link>
          <Link to={"/olvide-password"}>Olvide mi Password</Link>
        </nav>
      </div>
    </>
  );
}

export default Login;
