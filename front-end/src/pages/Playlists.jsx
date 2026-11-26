import { useEffect, useState } from "react";
import api, { formatDuration, getErrorMessage, playTrack } from "../services/api";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [catalogoMusicas, setCatalogoMusicas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [nome, setNome] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [erro, setErro] = useState("");

  const [playlistSelecionada, setPlaylistSelecionada] = useState(null);
  const [faixasPlaylist, setFaixasPlaylist] = useState([]);
  const [musicaParaAdicionar, setMusicaParaAdicionar] = useState("");

  function carregarDados() {
    api.get("/playlists").then(res => setPlaylists(res.data)).catch(() => {});
    api.get("/usuarios").then(res => setUsuarios(res.data)).catch(() => {});
    api.get("/musicas").then(res => setCatalogoMusicas(res.data)).catch(() => {});
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function carregarFaixas(playlist) {
    setPlaylistSelecionada(playlist);
    api.get(`/playlists/${playlist.idPlaylist}/musicas`)
      .then(res => setFaixasPlaylist(res.data))
      .catch(err => setErro(getErrorMessage(err)));
  }

  function limparFormulario() {
    setEditId(null);
    setNome("");
    setIdUsuario("");
    setErro("");
  }

  function salvar(e) {
    e.preventDefault();
    setErro("");
    if (!nome || !idUsuario) {
      setErro("Informe o nome da playlist e selecione o usuário criador.");
      return;
    }

    const payload = {
      nomePlaylist: nome,
      usuario: { idUsuario: Number(idUsuario) }
    };

    const request = editId
      ? api.put(`/playlists/${editId}`, payload)
      : api.post("/playlists", payload);

    request
      .then(() => {
        limparFormulario();
        carregarDados();
      })
      .catch(err => setErro(getErrorMessage(err)));
  }

  function iniciarEdicao(p) {
    setEditId(p.idPlaylist);
    setNome(p.nomePlaylist);
    setIdUsuario(String(p.usuario?.idUsuario || ""));
    setErro("");
  }

  function excluir(idPlaylist) {
    api.delete(`/playlists/${idPlaylist}`)
      .then(() => {
        if (playlistSelecionada?.idPlaylist === idPlaylist) {
          setPlaylistSelecionada(null);
          setFaixasPlaylist([]);
        }
        carregarDados();
      })
      .catch(err => setErro(getErrorMessage(err)));
  }

  function adicionarFaixa(e) {
    e.preventDefault();
    if (!playlistSelecionada || !musicaParaAdicionar) return;
    api.post(`/playlists/${playlistSelecionada.idPlaylist}/musicas/${musicaParaAdicionar}`)
      .then(() => {
        setMusicaParaAdicionar("");
        carregarFaixas(playlistSelecionada);
      })
      .catch(err => setErro(getErrorMessage(err)));
  }

  function removerFaixa(idMusica) {
    if (!playlistSelecionada) return;
    api.delete(`/playlists/${playlistSelecionada.idPlaylist}/musicas/${idMusica}`)
      .then(() => carregarFaixas(playlistSelecionada))
      .catch(err => setErro(getErrorMessage(err)));
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">🎼 Playlists</h1>
          <p className="page-subtitle">
            Crie playlists personalizadas e gerencie suas faixas
          </p>
        </div>
      </div>

      {erro && (
        <div className="alert-banner alert-error">
          <span>{erro}</span>
          <button className="btn btn-sm btn-secondary" onClick={() => setErro("")}>✕</button>
        </div>
      )}

      <div className="panel-card">
        <div className="panel-title">
          <span>{editId ? `Editar Playlist #${editId}` : "Nova Playlist"}</span>
          {editId && (
            <button type="button" className="btn btn-sm btn-secondary" onClick={limparFormulario}>
              Cancelar edição
            </button>
          )}
        </div>
        <form className="form-row" onSubmit={salvar}>
          <input
            className="input"
            placeholder="Nome da playlist"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <select
            className="select"
            value={idUsuario}
            onChange={e => setIdUsuario(e.target.value)}
          >
            <option value="">Selecione o criador...</option>
            {usuarios.map(u => (
              <option key={u.idUsuario} value={u.idUsuario}>
                {u.nome} ({u.email})
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary">
            {editId ? "Atualizar" : "+ Criar Playlist"}
          </button>
        </form>
      </div>

      {playlistSelecionada && (
        <div className="panel-card" style={{ borderColor: "rgba(29, 185, 84, 0.4)" }}>
          <div className="panel-title">
            <span>
              🎧 Faixas de <strong>{playlistSelecionada.nomePlaylist}</strong> ({faixasPlaylist.length} músicas)
            </span>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => setPlaylistSelecionada(null)}
            >
              Fechar
            </button>
          </div>

          <form className="form-row" style={{ marginBottom: 16 }} onSubmit={adicionarFaixa}>
            <select
              className="select"
              value={musicaParaAdicionar}
              onChange={e => setMusicaParaAdicionar(e.target.value)}
            >
              <option value="">Adicionar música à playlist...</option>
              {catalogoMusicas.map(m => (
                <option key={m.idMusica} value={m.idMusica}>
                  {m.titulo} — {m.album?.artista?.nome} ({formatDuration(m.duracao)})
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary">
              + Adicionar Faixa
            </button>
          </form>

          {faixasPlaylist.length === 0 ? (
            <p className="page-subtitle">Nenhuma música adicionada a esta playlist ainda.</p>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>Play</th>
                    <th>Música</th>
                    <th>Artista / Álbum</th>
                    <th>Duração</th>
                    <th>Adicionada em</th>
                    <th style={{ width: 110 }}>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {faixasPlaylist.map(pm => (
                    <tr key={pm.musica?.idMusica}>
                      <td>
                        <button
                          type="button"
                          className="btn btn-play"
                          onClick={() => playTrack(pm.musica)}
                        >
                          ▶
                        </button>
                      </td>
                      <td className="entity-primary">{pm.musica?.titulo}</td>
                      <td>
                        {pm.musica?.album?.artista?.nome} •{" "}
                        <span className="entity-secondary">{pm.musica?.album?.titulo}</span>
                      </td>
                      <td>{formatDuration(pm.musica?.duracao)}</td>
                      <td>{pm.dataAdicao}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => removerFaixa(pm.musica?.idMusica)}
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 70 }}>ID</th>
              <th>Playlist</th>
              <th>Criador</th>
              <th>Data de Criação</th>
              <th style={{ width: 260 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {playlists.map(p => (
              <tr key={p.idPlaylist}>
                <td>#{p.idPlaylist}</td>
                <td>
                  <div className="entity-cell">
                    <div className="avatar-circle">🎼</div>
                    <span className="entity-primary">{p.nomePlaylist}</span>
                  </div>
                </td>
                <td>{p.usuario?.nome || "—"}</td>
                <td>{p.dataCriacao || "—"}</td>
                <td>
                  <div className="action-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => carregarFaixas(p)}
                    >
                      🎵 Faixas
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => iniciarEdicao(p)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => excluir(p.idPlaylist)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
