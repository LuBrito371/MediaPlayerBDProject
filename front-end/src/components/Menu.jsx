import { NavLink } from "react-router-dom";

export default function Menu() {
  const getLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">♫</div>
        <div>
          <h2 className="brand-title">MediaPlayer</h2>
          <p className="brand-subtitle">Streaming Musical</p>
        </div>
      </div>

      <div>
        <div className="nav-section-label">Biblioteca</div>
        <nav className="nav-menu">
          <NavLink to="/musicas" className={getLinkClass}>
            <span>🎵</span> Músicas
          </NavLink>
          <NavLink to="/playlists" className={getLinkClass}>
            <span>🎼</span> Playlists
          </NavLink>
          <NavLink to="/albuns" className={getLinkClass}>
            <span>💿</span> Álbuns
          </NavLink>
          <NavLink to="/artistas" className={getLinkClass}>
            <span>🎤</span> Artistas
          </NavLink>
        </nav>
      </div>

      <div>
        <div className="nav-section-label">Gestão & Dados</div>
        <nav className="nav-menu">
          <NavLink to="/usuarios" className={getLinkClass}>
            <span>👥</span> Usuários
          </NavLink>
          <NavLink to="/relatorios" className={getLinkClass}>
            <span>📊</span> Relatórios & Views
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
