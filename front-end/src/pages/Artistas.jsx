import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../services/api";

export default function Artistas() {
  const [artistas, setArtistas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");

  function listar() {
    api.get("/artistas").then(res => setArtistas(res.data)).catch(() => {});
  }

  useEffect(() => {
    listar();
  }, []);

  function limparFormulario() {
    setEditId(null);
    setNome("");
    setErro("");
  }

  function salvar(e) {
    e.preventDefault();
    setErro("");
    if (!nome.trim()) {
      setErro("Informe o nome do artista ou banda.");
      return;
    }

    const request = editId
      ? api.put(`/artistas/${editId}`, { nome })
      : api.post("/artistas", { nome });

    request
      .then(() => {
        limparFormulario();
        listar();
      })
      .catch(err => setErro(getErrorMessage(err)));
  }

  function iniciarEdicao(a) {
    setEditId(a.idArtista);
    setNome(a.nome);
    setErro("");
  }

  function excluir(idArtista) {
    api.delete(`/artistas/${idArtista}`)
      .then(listar)
      .catch(err => setErro(getErrorMessage(err)));
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">🎤 Artistas</h1>
          <p className="page-subtitle">
            Bandas e intérpretes do catálogo musical
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
          <span>{editId ? `Editar Artista #${editId}` : "Novo Artista"}</span>
          {editId && (
            <button type="button" className="btn btn-sm btn-secondary" onClick={limparFormulario}>
              Cancelar edição
            </button>
          )}
        </div>
        <form className="form-row" onSubmit={salvar}>
          <input
            className="input"
            placeholder="Nome do artista ou banda"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            {editId ? "Atualizar" : "+ Cadastrar Artista"}
          </button>
        </form>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 80 }}>ID</th>
              <th>Artista</th>
              <th style={{ width: 170 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {artistas.map(a => (
              <tr key={a.idArtista}>
                <td>#{a.idArtista}</td>
                <td>
                  <div className="entity-cell">
                    <div className="avatar-circle">
                      {a.nome ? a.nome.charAt(0).toUpperCase() : "♪"}
                    </div>
                    <span className="entity-primary">{a.nome}</span>
                  </div>
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
                      onClick={() => excluir(a.idArtista)}
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
