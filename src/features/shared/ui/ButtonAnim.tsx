interface ButtonAnimProps {
  loading: boolean;
  text: string;
  onClick?: () => void;
  type: 'submit' | 'button';
}

export const ButtonAnim = ({ loading, text, onClick, type }: ButtonAnimProps) => {
  return (
    <div>
      <button
            type={type}
            onClick={onClick}
            disabled={loading}
            className={`w-full px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2
              ${loading ? "bg-primary/70 cursor-not-allowed" : "bg-primary hover:bg-primary-dark text-white cursor-pointer"}
            `}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Cargando...
              </>
            ) : (
              text
            )}
          </button>
    </div>
  )
}
