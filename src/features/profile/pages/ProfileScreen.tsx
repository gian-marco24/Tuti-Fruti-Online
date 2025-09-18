import { useState } from "react";
import LogoutModal from "../ui/logoutModal";
import { useSelector } from "react-redux";
import { type RootState } from "../../../infraestructure/store";
import type { User } from "../../../infraestructure/schemas/userSchema";

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const user = useSelector((state: RootState) => state?.auth.user) as User

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      console.log(fileURL)
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-bg-light flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 border border-border-light">
        {/* 📌 Cabecera del perfil */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative">
            <img
              src={user.avatar}
              alt="Foto de perfil"
              className="w-28 h-28 rounded-full border-4 border-primary object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-dark transition">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              ✏️
            </label>
          </div>

          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <input
                type="text"
                value={user.username}
                onChange={(e) => console.log(e.target.value)}
                className="px-4 py-2 border-2 border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <h2 className="text-2xl font-bold text-primary">{user.username}</h2>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="cursor-pointer mt-2 px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition"
            >
              {isEditing ? "Guardar" : "Editar nombre"}
            </button>
          </div>
        </div>

        {/* 📊 Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {user.stats &&
            Object.entries(user.stats).map(([key, value]) => (
              <div
                key={key}
                className="bg-surface rounded-xl shadow-sm p-6 text-center border border-border-light"
              >
                <p className="text-2xl font-bold text-primary">{value}</p>
                <p className="text-sm text-text-muted">
                  {key === "gamesPlayed"
                    ? "Partidas jugadas"
                    : key === "gamesWon"
                    ? "Partidas ganadas"
                    : key === "totalPoints"
                    ? "Puntos totales"
                    : key}
                </p>
              </div>
            ))}
        </div>

        {/* 🚪 Botón de cerrar sesión */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowLogout(true)}
            className="cursor-pointer px-6 py-2 rounded-lg bg-error text-white font-semibold hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showLogout && (
        <LogoutModal
          onClose={() => setShowLogout(false)}
          onConfirm={() => {
            console.log("Sesión cerrada");
            setShowLogout(false);
          }}
        />
      )}
    </div>
  );
}
