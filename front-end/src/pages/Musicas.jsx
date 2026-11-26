import { useEffect, useState } from "react";
import api, { formatDuration, getErrorMessage, playTrack } from "../services/api";

export default function Musicas() {
  const [musicas, setMusicas] = useState([]);
  const [albuns, setAlbuns] = useState([]);
  const [busca, setBusca] = useState("");
  const [editId, setEditId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [duracao, setDuracao] = useState("");
  const [urlMusica, setUrlMusica] = useState("");
  const [idAlbum, setIdAlbum] = useState("");
  const [erro, setErro] = useState("");

  function carregarDados() {
    api.get("/musicas").then(res => setMusicas(res.data)).catch(() => {});
    api.get("/albuns").then(res => setAlbuns(res.data)).catch(() => {});
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function limparFormulario() {
    setEditId(null);
    setTitulo("");
    setDuracao("");
    setUrlMusica("");
    setIdAlbum("");
    setErro("");
  }

  function salvar(e) {
    e.preventDefault();
    setErro("");
    if (!titulo || !duracao || !idAlbum) {
      setErro("Preencha o título, a duração e selecione um álbum.");
      return;
    }

    const payload = {
      titulo,
      duracao: Number(duracao),
      urlMusica: urlMusica || `http://musica/${titulo.toLowerCase().replace(/\s+/g, "_")}`,
      album: { idAlbum: Number(idAlbum) }
    };

    const request = editId
      ? api.put(`/musicas/${editId}`, payload)
      : api.post("/musicas", payload);

    request
      .then(() => {
        limparFormulario();
        carregarDados();
      })
      .catch(err => setErro(getErrorMessage(err)));
  }

  function iniciarEdicao(m) {
    setEditId(m.idMusica);
    setTitulo(m.titulo);
    setDuracao(String(m.duracao));
    setUrlMusica(m.urlMusica || "");
    setIdAlbum(String(m.album?.idAlbum || ""));
    setErro("");
  }

  function excluir(idMusica) {
    api.delete(`/musicas/${idMusica}`)
      .then(carregarDados)
      .catch(err => setErro(getErrorMessage(err)));
  }

  const musicasFiltradas = musicas.filter(m => {
    const termo = busca.toLowerCase();
    return (
      m.titulo?.toLowerCase().includes(termo) ||
      m.album?.titulo?.toLowerCase().includes(termo) ||
      m.album?.artista?.nome?.toLowerCase().includes(termo)
    );
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">🎵 Catálogo de Músicas</h1>
          <p className="page-subtitle">
            {musicas.length} faixas disponíveis • Clique em ▶ para reproduzir no player
          </p>
        </div>
        <input
          className="input"
          style={{ maxWidth: 280 }}
          placeholder="🔍 Buscar música, álbum ou artista..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>

      {erro && (
        <div className="alert-banner alert-error">
          <span>{erro}</span>
          <button className="btn btn-sm btn-secondary" onClick={() => setErro("")}>✕</button>
        </div>
      )}

      <div className="panel-card">
        <div className="panel-title">
          <span>{editId ? `Editar Música #${editId}` : "Adicionar Nova Música"}</span>
          {editId && (
            <button type="button" className="btn btn-sm btn-secondary" onClick={limparFormulario}>
              Cancelar edição
            </button>
          )}
        </div>
        <form className="form-row" onSubmit={salvar}>
          <input
            className="input"
            placeholder="Título da faixa"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
          <input
            className="input"
            style={{ maxWidth: 170 }}
            placeholder="Duração (seg)"
            type="number"
            min="1"
            value={duracao}
            onChange={e => setDuracao(e.target.value)}
          />
          <select
            className="select"
            value={idAlbum}
            onChange={e => setIdAlbum(e.target.value)}
          >
            <option value="">Selecione o álbum...</option>
            {albuns.map(al => (
              <option key={al.idAlbum} value={al.idAlbum}>
                {al.titulo} ({al.artista?.nome})
              </option>
            ))}
          </select>
          <input
            className="input"
            placeholder="URL do áudio (opcional)"
            value={urlMusica}
            onChange={e => setUrlMusica(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            {editId ? "Atualizar" : "+ Adicionar"}
          </button>
        </form>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>Play</th>
              <th>Faixa</th>
              <th>Artista</th>
              <th>Álbum</th>
              <th>Duração</th>
              <th style={{ width: 170 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {musicasFiltradas.map(m => (
              <tr key={m.idMusica}>
                <td>
                  <button
                    type="button"
                    className="btn btn-play"
                    onClick={() => playTrack(m)}
                    title={`Reproduzir ${m.titulo}`}
                  >
                    ▶
                  </button>
                </td>
                <td>
                  <div className="entity-primary">{m.titulo}</div>
                  <div className="entity-secondary">{m.urlMusica}</div>
                </td>
                <td>{m.album?.artista?.nome || "—"}</td>
                <td>
                  <span className="badge">{m.album?.titulo || "—"}</span>
                </td>
                <td>{formatDuration(m.duracao)}</td>
                <td>
                  <div className="action-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => iniciarEdicao(m)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => excluir(m.idMusica)}
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
