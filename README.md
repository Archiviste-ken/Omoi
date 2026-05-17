# Omoi

Omoi is a full-stack mood-based music experience. It uses live face-expression detection on the frontend to infer a user's vibe, then fetches a matching track from the backend and plays it in a polished interface.

## Highlights

- Expression-based song selection with MediaPipe Tasks Vision
- Premium dashboard UI with glassmorphism and responsive layouts
- Protected authentication flow with login, register, and session restore
- Music player with seek, speed control, and mood-aware track loading
- MongoDB, Redis, JWT, and ImageKit-powered backend

## Tech Stack

**Frontend**
- React 19
- Vite
- React Router
- Sass
- Axios
- `@mediapipe/tasks-vision`

**Backend**
- Node.js
- Express
- MongoDB + Mongoose
- Redis
- JWT authentication
- Multer
- ImageKit storage
- `node-id3`

## Project Structure

```text
Omoi/
|-- backend/
|   |-- server.js
|   `-- src/
|       |-- config/
|       |-- controllers/
|       |-- middlewares/
|       |-- models/
|       |-- routes/
|       `-- services/
`-- frontend/
    `-- src/
        |-- assets/
        `-- features/
            |-- auth/
            |-- Expression/
            |-- home/
            `-- shared/
```

## Requirements

- Node.js 18+ recommended
- npm
- MongoDB instance
- Redis instance
- ImageKit account and private key

## Environment Variables

Create a `backend/.env` file with the values your backend expects:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

If you use different Redis or ImageKit settings in your environment, update these values accordingly.

## Setup

From the project root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Run Locally

Open two terminals.

**Backend**
```bash
cd backend
npm run dev
```

**Frontend**
```bash
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend runs on `http://localhost:3000`.

## Frontend Scripts

From `frontend/`:

- `npm run dev` - start the Vite dev server
- `npm run build` - create a production build
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint

## Backend Scripts

From `backend/`:

- `npm run dev` - start the server with Nodemon

## How It Works

1. A user registers or logs in.
2. The home screen opens behind protected routing.
3. The camera component detects the user's facial expression.
4. The detected mood is sent to the song API.
5. The backend returns a matching track and poster.
6. The player loads the song with playback controls, seeking, and speed selection.

## Notes

- The frontend is hard-wired to `http://localhost:3000` for API requests.
- The app uses cookie-based auth, so the backend must allow credentials from `http://localhost:5173`.
- If you add deployment targets later, update the API base URL and CORS origin in both the code and this README.

## License

No license has been specified yet.
