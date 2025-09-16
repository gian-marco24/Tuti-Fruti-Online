# 🎲 Tuti Fruti Online

Versión online del clásico juego **Tuti Fruti (Stop / Basta)**, desarrollada en **ReactJS + Vite + NodeJS**.

---

## 🚀 Tecnologías

### Frontend
- React + TypeScript + Vite
- TailwindCSS
- React Query
- React Hook Form + Zod
- Arquitectura: Screaming Architecture

### Backend
- Node.js + TypeScript
- MongoDB + Mongoose
- JWT (Access + Refresh Tokens)
- Socket.IO (tiempo real)
- Arquitectura inspirada en Hexagonal

---

## 📂 Estructura del Proyecto

### Frontend
/src
/features
/auth
/game
/lobby
/ranking

### Backend
/src
/domain
/application
/infrastructure
/db
/api
/sockets

---

## 📌 Funcionalidades
- Registro e inicio de sesión con JWT
- Creación y unión a salas de juego
- Juego en tiempo real con Socket.IO
- Validación y puntuación automática de respuestas
- Ranking dinámico al finalizar la partida

---

## 📦 Instalación

1. Clonar repositorio
```bash
git clone https://github.com/usuario/tutifruti-online.git
```

2.Instalar dependencias
```bash
npm install
```

Configurar variables de entorno:

MONGODB_URI

JWT_SECRET

Iniciar backend y frontend

```bash
npm run dev
```

👨‍💻 Autor
Desarrollado por Gian Marco Esparragoza - Gian.Marco24

---