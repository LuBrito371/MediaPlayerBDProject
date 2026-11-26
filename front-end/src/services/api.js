import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080"
});

export function formatDuration(totalSeconds) {
  const sec = Number(totalSeconds) || 0;
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function getErrorMessage(err, fallback = "Não foi possível concluir a operação.") {
  return (
    err?.response?.data?.detail ||
    err?.response?.data?.message ||
    err?.message ||
    fallback
  );
}

const playListeners = new Set();

export function playTrack(musica) {
  playListeners.forEach(listener => listener(musica));
}

export function subscribePlayer(listener) {
  playListeners.add(listener);
  return () => playListeners.delete(listener);
}

export default api;
