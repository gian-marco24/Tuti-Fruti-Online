import { useState } from "react";
import LogoutModal from "../ui/logoutModal";
import { useSelector } from "react-redux";
import { type RootState } from "../../../infraestructure/store";
import type { userData } from "../../../infraestructure/schemas/userSchema";
import { useProfile } from "../hooks/useProfile";

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const user = useSelector((state: RootState) => state?.auth.user) as userData
  const [newUsername, setNewUsername] = useState(user.username)

  const { logOut, changeUsername, loading } = useProfile()

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      console.log(fileURL)
    }
  };

  return (
    <div className="min-h-screen pt-12 px-6 bg-bg-ultraDark flex justify-center items-start">
      <div className="w-full max-w-3xl bg-bg-dark rounded-2xl shadow-xl p-8 border border-neutral-dark">
        {/* 📌 Cabecera del perfil */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative">
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt="Foto de perfil"
                className="w-28 h-28 rounded-full border-4 border-primary object-cover"
              />
            ) : (
              <svg  xmlns="http://www.w3.org/2000/svg" width={128} height={128} fill={"#4F46E5"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"></path></svg>
            )}
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
          <div className="flex-1 text-center md:text-left space-x-4">
            <div>
              <h2 className="text-md font-regular text-primary">{user?.email}</h2>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="px-4 py-2 border-2 text-text-light border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <h2 className="text-3xl font-bold text-primary">{user?.username}</h2>
            )}
            <button
              onClick={() => {
                if (isEditing) {
                  if(user.username !== newUsername) changeUsername(newUsername);
                  setIsEditing(false);
                } else {
                  setIsEditing(true);
                }
              }}
              className="cursor-pointer mt-2 px-4 py-2 text-md bg-primary text-white rounded-lg hover:bg-primary-dark transition"
            >
              {isEditing ? "Guardar" : "Editar nombre"}
            </button>
          </div>
        </div>

        {/* 📊 Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {user?.stats &&
            Object.entries(user?.stats)?.map(([key, value]) => (
              <div
                key={key}
                className="bg-surface rounded-xl shadow-md p-6 text-center border border-border-light"
              >
                <p className="text-2xl font-bold text-primary">{value}</p>
                <p className="text-sm text-text-light">
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
            logOut()
            setShowLogout(false);
          }}
          loading={loading}
        />
      )}
    </div>
  );
}
