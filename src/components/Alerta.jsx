
function Alerta({ alerta }) {
  return (
    <p className={`${ alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r text-center p-2 text-white font-bold uppercase text-sm rounded-md mb-5 mt-5`}>{ alerta.msg }</p>
  )
}

export default Alerta