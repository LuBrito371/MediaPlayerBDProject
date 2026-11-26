import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../services/api";

export default function Albuns() {
  const [albuns, setAlbuns] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [genero, setGenero] = useState("");
  const [idArtista, setIdArtista] = useState("");
  const [erro, setErro] = useState("");

  function carregarDados() {
    api.get("/albuns").then(res => setAlbuns(res.data)).catch(() => {});
    api.get("/artistas").then(res => setArtistas(res.data)).catch(() => {});
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function limparFormulario() {
    setEditId(null);
    setTitulo("");
    setAnoLancamento("");
    setGenero("");
    setIdArtista("");
    setErro("");
  }

  function salvar(e) {
    e.preventDefault();
    setErro("");
    if (!titulo || !anoLancamento || !genero || !idArtista) {
      setErro("Preencha todos os campos do álbum.");
      return;
    }

    const payload = {
      titulo,
      anoLancamento: Number(anoLancamento),
      genero,
      artista: { idArtista: Number(idArtista) }
    };

    const request = editId
      ? api.put(`/albuns/${editId}`, payload)
      : api.post("/albuns", payload);

    request
      .then(() => {
        limparFormulario();
        carregarDados();
      })
      .catch(err => setErro(getErrorMessage(err)));
  }

  function iniciarEdicao(a) {
    setEditId(a.idAlbum);
    setTitulo(a.titulo);
    setAnoLancamento(String(a.anoLancamento));
    setGenero(a.genero);
    setIdArtista(String(a.artista?.idArtista || ""));
    setErro("");
  }

  function excluir(idAlbum) {
    api.delete(`/albuns/${idAlbum}`)
      .then(carregarDados)
      .catch(err => setErro(getErrorMessage(err)));
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">💿 Álbuns</h1>
          <p className="page-subtitle">
            Discografia cadastrada por artista, ano de lançamento e gênero musical
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
          <span>{editId ? `Editar Álbum #${editId}` : "Cadastrar Novo Álbum"}</span>
          {editId && (
            <button type="button" className="btn btn-sm btn-secondary" onClick={limparFormulario}>
              Cancelar edição
            </button>
          )}
        </div>
        <form className="form-row" onSubmit={salvar}>
          <input
            className="input"
            placeholder="Título do álbum"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
          <input
            className="input"
            style={{ maxWidth: 180 }}
            placeholder="Ano (ex: 2024)"
            type="number"
            min="1900"
            max="2100"
            value={anoLancamento}
            onChange={e => setAnoLancamento(e.target.value)}
          />
          <input
            className="input"
            style={{ maxWidth: 200 }}
            placeholder="Gênero (Rock, Pop, MPB...)"
            value={genero}
            onChange={e => setGenero(e.target.value)}
          />
          <select
            className="select"
            value={idArtista}
            onChange={e => setIdArtista(e.target.value)}
          >
            <option value="">Selecione o artista...</option>
            {artistas.map(ar => (
              <option key={ar.idArtista} value={ar.idArtista}>
                {ar.nome}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary">
            {editId ? "Atualizar" : "+ Salvar Álbum"}
          </button>
        </form>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 70 }}>ID</th>
              <th>Álbum</th>
              <th>Artista</th>
              <th>Ano</th>
              <th>Gênero</th>
              <th style={{ width: 170 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {albuns.map(a => (
              <tr key={a.idAlbum}>
                <td>#{a.idAlbum}</td>
                <td>
                  <div className="entity-cell">
                    <div className="avatar-circle">💿</div>
                    <span className="entity-primary">{a.titulo}</span>
                  </div>
                </td>
                <td>{a.artista?.nome || "—"}</td>
                <td>{a.anoLancamento}</td>
                <td>
                  <span className="badge badge-accent">{a.genero}</span>
                </td>
                <td>
                  <div className="action-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => iniciarEdicao(a)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => excluir(a.idAlbum)}
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
