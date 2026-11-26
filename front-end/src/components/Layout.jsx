import { useEffect, useState } from "react";
import Menu from "./Menu";
import api, { formatDuration, subscribePlayer } from "../services/api";

export default function Layout({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [activeUserId, setActiveUserId] = useState("");
  const [catalogo, setCatalogo] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playStatus, setPlayStatus] = useState("");

  useEffect(() => {
    api.get("/usuarios")
      .then(res => {
        setUsuarios(res.data);
        if (res.data.length > 0) {
          setActiveUserId(String(res.data[0].idUsuario));
        }
      })
      .catch(() => {});

    api.get("/musicas")
      .then(res => {
        setCatalogo(res.data);
        if (res.data.length > 0) {
          setCurrentTrack(res.data[0]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    return subscribePlayer(musica => {
      setCurrentTrack(musica);
      setProgress(0);
      setIsPlaying(true);

      if (activeUserId && musica?.idMusica) {
        api.post(`/historico/${activeUserId}/reproduzir/${musica.idMusica}`)
          .then(() => {
            setPlayStatus("Reprodução registrada no histórico");
            setTimeout(() => setPlayStatus(""), 3000);
          })
          .catch(() => {});
      }
    });
  }, [activeUserId]);

  useEffect(() => {
    if (!isPlaying || !currentTrack) return;
    const total = Number(currentTrack.duracao) || 180;
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev + 1 >= total) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, currentTrack]);

  function skipTrack(direction) {
    if (!catalogo.length || !currentTrack) return;
    const idx = catalogo.findIndex(m => m.idMusica === currentTrack.idMusica);
    const nextIdx = (idx + direction + catalogo.length) % catalogo.length;
    setCurrentTrack(catalogo[nextIdx]);
    setProgress(0);
    setIsPlaying(true);
  }

  const totalDuration = Number(currentTrack?.duracao) || 0;
  const progressPercent = totalDuration > 0
    ? Math.min(100, (progress / totalDuration) * 100)
    : 0;

  return (
    <div className="app-shell">
      <Menu />

      <div className="main-area">
        <header className="topbar">
          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            {playStatus ? (
              <span className="badge badge-accent">🎧 {playStatus}</span>
            ) : (
              <span>PostgreSQL 15 • Spring Boot • React</span>
            )}
          </div>

          <div className="listener-pill">
            <span>🎧 Ouvinte ativo:</span>
            <select
              value={activeUserId}
              onChange={e => setActiveUserId(e.target.value)}
            >
              {usuarios.map(u => (
                <option key={u.idUsuario} value={u.idUsuario}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>
        </header>

        <main className="content-container">
          {children}
        </main>
      </div>

      <footer className="player-bar">
        <div className="player-track-info">
          <div className="player-disc">
            {isPlaying ? "💿" : "🎵"}
          </div>
          <div className="player-track-text">
            <div className="player-track-title">
              {currentTrack ? currentTrack.titulo : "Selecione uma música"}
            </div>
            <div className="player-track-artist">
              {currentTrack
                ? `${currentTrack.album?.artista?.nome || "Artista"} • ${currentTrack.album?.titulo || "Álbum"}`
                : "Clique em ▶ em qualquer faixa do catálogo"}
            </div>
          </div>
        </div>

        <div className="player-controls-center">
          <div className="player-buttons">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => skipTrack(-1)}
              title="Faixa anterior"
            >
              ⏮
            </button>
            <button
              type="button"
              className="player-main-toggle"
              onClick={() => currentTrack && setIsPlaying(p => !p)}
              title={isPlaying ? "Pausar" : "Reproduzir"}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => skipTrack(1)}
              title="Próxima faixa"
            >
              ⏭
            </button>
          </div>

          <div className="player-progress-row">
            <span>{formatDuration(progress)}</span>
            <div
              className="player-progress-track"
              onClick={e => {
                if (!totalDuration) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                setProgress(Math.floor(ratio * totalDuration));
              }}
            >
              <div
                className="player-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span>{formatDuration(totalDuration)}</span>
          </div>
        </div>

        <div className="player-right">
          {currentTrack?.album?.genero && (
            <span className="badge badge-accent">{currentTrack.album.genero}</span>
          )}
          <span>🔊 {isPlaying ? "Tocando agora" : "Pausado"}</span>
        </div>
      </footer>
    </div>
  );
}
