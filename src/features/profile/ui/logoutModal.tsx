import { ButtonAnim } from "../../shared/ui/ButtonAnim";

interface LogoutModalProps {
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function LogoutModal({ onClose, onConfirm, loading }: LogoutModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-bg-dark rounded-2xl shadow-lg p-6 w-full max-w-sm border border-neutral-dark">
        <h3 className="text-lg font-semibold text-primary mb-4">
          ¿Estás seguro de cerrar sesión?
        </h3>
        <p className="text-sm text-text-light mb-6">
          Se cerrará tu sesión actual y deberás volver a iniciar sesión.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 rounded-lg border border-border-light text-white hover:bg-primary-light hover:border-primary-light transition"
          >
            Cancelar
          </button>
          <ButtonAnim 
            loading={loading}
            onClick={onConfirm}
            text="Cerrar sesión"
            type="button"
          />
        </div>
      </div>
    </div>
  );
}
