import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { clienteAxios } from "../config/axios";
import Alerta from "../components/Alerta";

function NuevoPassword() {
  const params = useParams();
  const { token } = params;
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/veterinarios/olvide-password/${token}`);
        setAlerta({
          msg: "Coloca tu Nuevo Password",
          error: false,
        });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };

    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El Password debe de ser minimo de 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        `/veterinarios/olvide-password/${token}`,
        { password }
      );
      console.log(data);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">
          Recupera tu Acceso y no Pierdas{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-10 md:mt-0 bg-white shadow-lg p-5 rounded-lg">
        {alerta.msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  className="block uppercase font-bold text-gray-600 text-xl"
                  htmlFor="password"
                >
                  Nuevo Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nuevo Password"
                  className="border w-full p-2 rounded-md mt-2 bg-gray-50"
                />
              </div>

              <input
                type="submit"
                value="Guardar Nuevo Password"
                className="bg-indigo-600 w-full p-2 rounded-md text-white uppercase font-bold md:w-auto md: px-10 cursor-pointer hover:bg-indigo-700 transition-all"
              />
            </form>
          </>
        )}

        {passwordModificado && (
          <nav className="flex flex-col md:flex-row md:justify-between text-sm text-gray-600 items-center mt-5 space-y-2">
            <Link to={"/"}>Inicia Sesión</Link>
          </nav>
        )}
      </div>
    </>
  );
}

export default NuevoPassword;
