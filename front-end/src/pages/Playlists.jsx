import { useEffect, useState } from "react";
import api from "../services/api";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [nome, setNome] = useState("");
  const [idUsuario, setIdUsuario] = useState("");

  function listar() {
    api.get("/playlists").then(res => setPlaylists(res.data));
  }

  useEffect(() => {
    listar();
  }, []);

  function salvar() {
    if (!nome || !idUsuario) return;
    api.post("/playlists", {
      nomePlaylist: nome,
      usuario: { idUsuario: Number(idUsuario) }
    }).then(() => {
      setNome("");
      setIdUsuario("");
      listar();
    });
  }

  function excluir(idPlaylist) {
    api.delete(`/playlists/${idPlaylist}`).then(listar);
  }

  return (
    <div>
      <h1>Playlists</h1>

      <input
        placeholder="Nome da playlist"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />

      <input
        placeholder="ID do usuário"
        type="number"
        value={idUsuario}
        onChange={e => setIdUsuario(e.target.value)}
      />

      <button onClick={salvar}>Salvar</button>

      <table border="1" width="100%" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {playlists.map(p => (
            <tr key={p.idPlaylist}>
              <td>{p.idPlaylist}</td>
              <td>{p.nomePlaylist}</td>
              <td>{p.usuario?.nome}</td>
              <td>{p.dataCriacao}</td>
              <td>
                <button onClick={() => excluir(p.idPlaylist)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
