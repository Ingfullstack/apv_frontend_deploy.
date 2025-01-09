import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import axios from 'axios';
import { clienteAxios } from "../config/axios";

function Registrar() {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Todo Los campo son obligatorio', error: true });
      return;
    }

    if (password != repetirPassword) {
      setAlerta({ msg: 'Los password no son iguales', error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: 'El password es muy corto agrega minimo 6 caracteres', error: true });
      return;
    }
    
    //Crear el usuario en la api
    try {
      const { data } = await clienteAxios.post('/veterinarios', { nombre, email, password });
      
      setAlerta({
        msg: data.msg,
        error: false
      });

      setNombre(''),
      setEmail(''),
      setPassword(''),
      setRepetirPassword('')

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
          Crea tu Cuenta y Administra tus {""}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-10 md:mt-0 bg-white shadow-lg p-5 rounded-lg">
        { alerta.msg && <Alerta alerta={ alerta }/> }
        <form onSubmit={ handleSubmit }>
          <div className="mb-3">
            <label
              className="block uppercase font-bold text-gray-600 text-xl"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={ nombre }
              onChange={ e => setNombre(e.target.value)}
              placeholder="Nombre de Registro"
              className="border w-full p-2 rounded-md mt-2 bg-gray-50"
            />
          </div>

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
              onChange={ e => setEmail(e.target.value)}
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
              onChange={ e => setPassword(e.target.value)}
              placeholder="Password de Registro"
              className="border w-full p-2 rounded-md mt-2 bg-gray-50"
            />
          </div>

          <div className="mb-5">
            <label
              className="block uppercase font-bold text-gray-600 text-xl"
              htmlFor="repetir-password"
            >
              Repetir Password
            </label>
            <input
              type="password"
              name="repetir-password"
              id="repetir-password"
              value={ repetirPassword }
              onChange={ e => setRepetirPassword(e.target.value)}
              placeholder="Repetir tu Password"
              className="border w-full p-2 rounded-md mt-2 bg-gray-50"
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-600 w-full p-2 rounded-md text-white uppercase font-bold md:w-auto md: px-10 cursor-pointer hover:bg-indigo-700 transition-all"
          />
        </form>

        <nav className="flex flex-col md:flex-row md:justify-between text-sm text-gray-600 items-center mt-5 space-y-2">
          <Link to={"/"}>¿Ya tienes una cuenta?, Inicia Sesión</Link>
          <Link to={"/olvide-password"}>Olvide mi Password</Link>
        </nav>
      </div>
    </>
  );
}

export default Registrar;
