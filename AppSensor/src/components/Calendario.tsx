type Props = {
  onClose: () => void;
};

export default function Calendar({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-lg relative">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Calendario de Riego
        </h2>

        <p className="text-gray-500 text-sm mb-6 text-center">
          Aquí podrás configurar y visualizar tus horarios de riego.
        </p>

        {/* Botón para cerrar */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
