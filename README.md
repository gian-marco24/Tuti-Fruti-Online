# 🎲 Tuti Fruti Online

Versión online del clásico juego **Tuti Fruti (Stop / Basta)**, desarrollada en **ReactJS + Vite + NodeJS + TypeScript**, con backend en **Node + Express + Mongoose**, bajo **arquitectura hexagonal**.

----------

## 🚀 Tecnologías

### Frontend

- React + TypeScript + Vite

- TailwindCSS

- React Query

- React Hook Form + Zod

- Arquitectura: Screaming Architecture

### Backend

- Node.js + TypeScript

- Express

- MongoDB + Mongoose

- JWT (Access + Refresh Tokens)

- Socket.IO (tiempo real)

- Arquitectura inspirada en **Hexagonal**

----------

## 📂 Estructura del Proyecto


-  ### Frontend

```bash
/src
	/features
		/auth
		/game
		/lobby
		/ranking

```

-  ### Backend

```bash
/src
	/domain  →  Entidades  y  contratos
	/application  →  Casos  de  uso
	/infrastructure
		/db  →  Conexión  y  modelos  Mongoose
		/api  →  Controladores (Express)
		/sockets  →  Lógica  de  Socket.IO
```

----------

## 📱 Vistas del Frontend


1.  **Landing**

- Botón de _Registrarse_

- Botón de _Iniciar sesión_

2.  **Registro (Sign Up)**

- Formulario: nombre de usuario, email, contraseña

3.  **Login (Sign In)**

- Formulario: email, contraseña

4.  **Lobby / Menú Principal**

- Crear sala

- Listado de salas disponibles

- Entrar a sala con código

5.  **Sala de Espera**

- Lista de jugadores

- Botón de iniciar partida (host)

6.  **Juego**

- Letra aleatoria

- Formulario de categorías

- Temporizador y botón _STOP_

7.  **Resultados de Ronda**

- Tabla comparativa de respuestas

- Puntos por respuesta

8.  **Resultados Finales**

- Ranking global
  

----------


## 🌐 Endpoints del Backend (REST + WebSockets)

### 🔹 Autenticación (`/auth`)

-   `POST /auth/register` → Registrar usuario nuevo.
    
-   `POST /auth/login` → Iniciar sesión (retorna Access + Refresh Token).
    
-   `POST /auth/refresh` → Renovar Access Token.
    
-   `POST /auth/logout` → Cerrar sesión y revocar Refresh Token.
    

----------

### 🔹 Usuario (`/user`)

-   `GET /user/me` → Obtener perfil del usuario autenticado.
    
-   `PUT /user/update` → Actualizar perfil (ej. nombre o avatar).
    
-   `GET /user/stats/:id` → Obtener estadísticas del jugador (partidas jugadas, ganadas, puntos totales).
    

----------

### 🔹 Salas (`/rooms`)

-   `POST /rooms/create` → Crear sala nueva.
    
-   `POST /rooms/join/:roomId` → Unirse a sala existente.
    
-   `POST /rooms/leave/:roomId` → Salir de una sala.
    
-   `GET /rooms/list` → Listar salas disponibles.
    
-   `GET /rooms/:roomId` → Obtener detalles de la sala.
    
-   `DELETE /rooms/:roomId` → Cerrar sala (solo host).
    

----------

### 🔹 Juego (`/game`)

-   `POST /game/start/:roomId` → Iniciar partida (solo host).
    
-   `POST /game/answer/:roomId` → Enviar respuestas del jugador para la ronda actual.
    
-   `GET /game/results/:roomId/:roundId` → Obtener resultados de una ronda.
    
-   `GET /game/final/:roomId` → Obtener ranking final de la sala.
    
-   `POST /game/next-round/:roomId` → Pasar a la siguiente ronda (solo host).
    

----------

### 🔹 Ranking Global (`/ranking`)

-   `GET /ranking/global` → Ver ranking general de todos los jugadores.
    
-   `GET /ranking/friends/:userId` → Ver ranking entre amigos (futuro opcional).
    

----------

## ⚡ Eventos de Socket.IO

Los sockets complementan los endpoints REST para tiempo real.

### Conexión

-   `connection` → Cuando un cliente se conecta.
    
-   `disconnect` → Cuando un cliente se desconecta.
    

### Salas

-   `join_room` → Unirse a una sala en tiempo real.
    
-   `leave_room` → Salir de una sala en tiempo real.
    
-   `room_updated` → Notificación a todos los jugadores de cambios en la sala.
    

### Juego

-   `game_started` → Aviso de que la partida comienza.
    
-   `new_round` → Notificación de inicio de nueva ronda con letra aleatoria.
    
-   `answer_submitted` → Confirmación de envío de respuestas.
    
-   `round_results` → Publicación de resultados de ronda en tiempo real.
    
-   `final_results` → Publicación de resultados finales de la partida.

  

----------

## 📌 Funcionalidades

- Registro e inicio de sesión con JWT

- Creación y unión a salas de juego

- Juego en tiempo real con **Socket.IO**

- Validación y puntuación automática de respuestas

- Ranking dinámico al finalizar la partida


----------


## 📦 Instalación

1. Clonar repositorio:

```bash

`git clone https://github.com/gian-marco24/tutifruti-online.git`

```

2. Instalar dependencias:

``` bash

npm  install

```

3. Configurar variables de entorno:


`MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/tutifruti

PORT=4000`


4. Iniciar backend y frontend en paralelo:

```bash

npm  run  dev

```

----------


## 👨‍💻 Autor

Desarrollado por **Gian Marco Esparragoza** – Gian.Marco24