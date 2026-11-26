import { useEffect, useState } from "react";
import api, { getErrorMessage, playTrack } from "../services/api";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [editId, setEditId] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const [usuarioHistorico, setUsuarioHistorico] = useState(null);
  const [historico, setHistorico] = useState([]);

  function listar() {
    api.get("/usuarios").then(res => setUsuarios(res.data)).catch(() => {});
  }

  useEffect(() => {
    listar();
  }, []);

  function limparFormulario() {
    setEditId(null);
    setNome("");
    setEmail("");
    setSenha("");
    setErro("");
  }

  function salvar(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!nome || !email || (!editId && !senha)) {
      setErro("Preencha nome, e-mail e senha.");
      return;
    }

    const payload = { nome, email, senha };
    const request = editId
      ? api.put(`/usuarios/${editId}`, payload)
      : api.post("/usuarios", payload);

    request
      .then(() => {
        if (editId) {
          setSucesso("Usuário atualizado! Alteração registrada na tabela AUDITORIA_USUARIO via Trigger.");
        }
        limparFormulario();
        listar();
      })
      .catch(err => setErro(getErrorMessage(err)));
  }

  function iniciarEdicao(u) {
    setEditId(u.idUsuario);
    setNome(u.nome);
    setEmail(u.email);
    setSenha("");
    setErro("");
    setSucesso("");
  }

  function verHistorico(u) {
    setUsuarioHistorico(u);
    api.get(`/historico/${u.idUsuario}`)
      .then(res => setHistorico(res.data))
      .catch(err => setErro(getErrorMessage(err)));
  }

  function excluir(idUsuario) {
    api.delete(`/usuarios/${idUsuario}`)
      .then(() => {
        if (usuarioHistorico?.idUsuario === idUsuario) {
          setUsuarioHistorico(null);
          setHistorico([]);
        }
        listar();
      })
      .catch(err => setErro(getErrorMessage(err)));
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">👥 Usuários</h1>
          <p className="page-subtitle">
            Gerencie ouvintes, visualize o histórico individual e teste o gatilho de auditoria (UPDATE)
          </p>
        </div>
      </div>

      {erro && (
        <div className="alert-banner alert-error">
          <span>{erro}</span>
          <button className="btn btn-sm btn-secondary" onClick={() => setErro("")}>✕</button>
        </div>
      )}

      {sucesso && (
        <div className="alert-banner alert-success">
          <span>🛡️ {sucesso}</span>
          <button className="btn btn-sm btn-secondary" onClick={() => setSucesso("")}>✕</button>
        </div>
      )}

      <div className="panel-card">
        <div className="panel-title">
          <span>{editId ? `Editar Usuário #${editId}` : "Cadastrar Novo Usuário"}</span>
          {editId && (
            <button type="button" className="btn btn-sm btn-secondary" onClick={limparFormulario}>
              Cancelar edição
            </button>
          )}
        </div>
        <form className="form-row" onSubmit={salvar}>
          <input
            className="input"
            placeholder="Nome completo"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <input
            className="input"
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="input"
            placeholder={editId ? "Nova senha (opcional)" : "Senha"}
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            {editId ? "Salvar Alterações" : "+ Cadastrar"}
          </button>
        </form>
      </div>

      {usuarioHistorico && (
        <div className="panel-card" style={{ borderColor: "rgba(56, 189, 248, 0.35)" }}>
          <div className="panel-title">
            <span>
              🕒 Histórico de Reprodução de <strong>{usuarioHistorico.nome}</strong> ({historico.length} registros)
            </span>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => setUsuarioHistorico(null)}
            >
              Fechar
            </button>
          </div>

          {historico.length === 0 ? (
            <p className="page-subtitle">Nenhuma reprodução registrada para este usuário.</p>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>Play</th>
                    <th>Música</th>
                    <th>Artista / Álbum</th>
                    <th>Data / Hora da Reprodução</th>
                  </tr>
                </thead>
                <tbody>
                  {historico.map((h, i) => (
                    <tr key={`${h.id?.idMusica}-${h.id?.dataHoraReproducao}-${i}`}>
                      <td>
                        <button
                          type="button"
                          className="btn btn-play"
                          onClick={() => playTrack(h.musica)}
                        >
                          ▶
                        </button>
                      </td>
                      <td className="entity-primary">{h.musica?.titulo}</td>
                      <td>
                        {h.musica?.album?.artista?.nome} •{" "}
                        <span className="entity-secondary">{h.musica?.album?.titulo}</span>
                      </td>
                      <td>{h.id?.dataHoraReproducao?.replace("T", " ")}</td>
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
              <th>Nome</th>
              <th>E-mail</th>
              <th style={{ width: 270 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.idUsuario}>
                <td>#{u.idUsuario}</td>
                <td>
                  <div className="entity-cell">
                    <div className="avatar-circle">
                      {u.nome ? u.nome.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="entity-primary">{u.nome}</span>
                  </div>
                </td>
                <td>{u.email}</td>
                <td>
                  <div className="action-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => verHistorico(u)}
                    >
                      🕒 Histórico
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => iniciarEdicao(u)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => excluir(u.idUsuario)}
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
