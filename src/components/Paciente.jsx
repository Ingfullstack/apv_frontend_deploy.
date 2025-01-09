import React from "react";
import usePacientes from '../hooks/usePacientes';

const Paciente = ({ paciente }) => {

    const { setEdicion, eliminarPaciente } = usePacientes();

  const { nombre, propietario, email, fecha, sintomas, _id } = paciente;

  const formatearFecha = ( fecha ) => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long'}).format(nuevaFecha);
  }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-indigo-700 mb-2">
        Normbre: {""}
        <span className="font-normal normal-case text-black">{nombre}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 mb-2">
        Propietario: {""}
        <span className="font-normal normal-case text-black">{propietario}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 mb-2">
        Email: {""}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 mb-2">
        Fecha de Alta: {""}
        <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 mb-2">
        Sintomas: {""}
        <span className="font-normal normal-case text-black">{sintomas}</span>
      </p>

      <div className="flex flex-col gap-2 md:flex-row md:justify-between mt-5">
        <button onClick={ () => setEdicion(paciente)} type="button" className="bg-indigo-600 py-2 px-10 rounded-lg text-white font-bold uppercase hover:bg-indigo-700 transition-all cursor-pointer">Editar</button>
        <button onClick={ () => eliminarPaciente( _id )} type="button" className="bg-red-600 py-2 px-10 rounded-lg text-white font-bold uppercase hover:bg-red-700 transition-all cursor-pointer">Eliminar</button>
      </div>
    </div>
  );
};

export default Paciente;
