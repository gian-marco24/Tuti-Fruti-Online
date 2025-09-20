import { useState } from "react";
import { Link } from "react-router-dom";

type Lobby = {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  status: "waiting" | "playing";
};

const sampleLobbies: Lobby[] = [
  { id: "1", name: "Sala Pro", players: 2, maxPlayers: 4, status: "waiting" },
  { id: "2", name: "Diversión Total", players: 4, maxPlayers: 4, status: "playing" },
  { id: "3", name: "Amigos", players: 1, maxPlayers: 6, status: "waiting" },
  { id: "4", name: "Competitiva", players: 3, maxPlayers: 5, status: "playing" },
];

export default function LobbiesPage() {
  const [lobbies] = useState<Lobby[]>(sampleLobbies);

  return (
    <div className="min-h-screen bg-bg-light p-6">
      {/* Encabezado */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-primary">Salas disponibles</h1>
        <div className="max-md:space-y-2 md:space-x-4 flex max-md:flex-col mt-2">
          <Link to="/create-room" className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-xl text-white w-fit">
            Crear Sala
          </Link>
          <input
            type="text"
            placeholder="Buscar sala..."
            className="rounded-xl border border-textOffFocus px-4 py-2 text-sm focus:border-details focus:outline-none"
          />
        </div>
      </div>

      {/* Grid de salas */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lobbies.map((lobby) => (
          <div
            key={lobby.id}
            className="rounded-2xl bg-white shadow-md border border-primary/10 p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-primary">{lobby.name}</h2>
              <p className="text-sm text-textOffFocus mt-1">
                Jugadores: {lobby.players}/{lobby.maxPlayers}
              </p>
              <p
                className={`mt-2 text-sm font-medium ${lobby.status === "waiting"
                    ? "text-btnPrimaryColor"
                    : "text-details"
                  }`}
              >
                {lobby.status === "waiting" ? "Esperando jugadores" : "En curso"}
              </p>
            </div>

            <button
              className={`mt-4 w-full rounded-xl px-4 py-2 font-medium text-white transition ${lobby.players >= lobby.maxPlayers
                  ? "bg-primary-light cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark cursor-pointer"
                }`}
              disabled={lobby.players >= lobby.maxPlayers}
            >
              {lobby.players >= lobby.maxPlayers ? "Sala llena" : "Unirse"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
