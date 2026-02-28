import { useEffect, useState } from "react";
import api from "../services/api";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [nome, setNome] = useState("");
  const [idUsuario, setIdUsuario] = useState("");

  useEffect(() => {
    listar();
  }, []);

  function listar() {
    api.get("/playlists").then(res => setPlaylists(res.data));
  }

  function salvar() {
    api.post("/playlists", {
      nome,
      usuario: { id: idUsuario }
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
        value={idUsuario}
        onChange={e => setIdUsuario(e.target.value)}
      />

      <button onClick={salvar}>Salvar</button>

      <table border="1" width="100%" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {playlists.map(p => (
            <tr key={p.idPlaylist}>
              <td>{p.idPlaylist}</td>
              <td>{p.nomePlaylist}</td>
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