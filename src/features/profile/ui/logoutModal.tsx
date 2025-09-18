interface LogoutModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ onClose, onConfirm }: LogoutModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm border border-border-light">
        <h3 className="text-lg font-semibold text-primary mb-4">
          ¿Estás seguro de cerrar sesión?
        </h3>
        <p className="text-sm text-text-muted mb-6">
          Se cerrará tu sesión actual y deberás volver a iniciar sesión.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 rounded-lg border border-border-light text-text-default hover:bg-border-light transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer px-4 py-2 rounded-lg bg-error text-white font-semibold hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
