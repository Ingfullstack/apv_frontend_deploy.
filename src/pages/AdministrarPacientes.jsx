import { useState } from "react"
import Formulario from "../components/Formulario"
import ListadoPaciente from "../components/ListadoPaciente"

const AdministrarPacientes = () => {

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  return (
    <>
      <div className="flex flex-col md:flex-row mx-5">
          <button onClick={ () => setMostrarFormulario(!mostrarFormulario)} type="button" className="bg-indigo-600 text-white font-bold uppercase mx-10 py-2 rounded-md mb-5 md:hidden">{ mostrarFormulario? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>

          <div className={`${ mostrarFormulario ?  'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
              <Formulario/>
          </div>
          <div className="md:w-1/2 lg:w-3/5">
            <ListadoPaciente/>
          </div>
      </div>
    </>
  )
}

export default AdministrarPacientes