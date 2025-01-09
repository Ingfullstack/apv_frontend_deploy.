import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";
import { clienteAxios } from "../config/axios";

function ConfirmarCuenta() {
  const [cuentaConfirmar, setCuentaConfirmar] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios.get(
          `/veterinarios/confirmar/${id}`
        );
        setCuentaConfirmar(true);
        setAlerta({
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    setCargando(false);
    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">
          Confirma tu Cuenta y Comienza a Administrar{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-10 md:mt-0 bg-white shadow-lg p-5 rounded-lg">
        {!cargando && <Alerta alerta={alerta} />}
        {cuentaConfirmar && (
          <nav className="flex flex-col md:flex-row md:justify-between text-sm text-gray-600 items-center mt-5 space-y-2">
            <Link
              className="bg-indigo-600 w-full p-2 rounded-md text-white uppercase font-bold md:w-auto md: px-10 cursor-pointer hover:bg-indigo-700 transition-all"
              to={"/"}
            >
              Inisiar Sesión
            </Link>
          </nav>
        )}
      </div>
    </>
  );
}

export default ConfirmarCuenta;
