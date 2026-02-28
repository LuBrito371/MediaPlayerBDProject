import { useEffect, useState } from "react";
import api from "../services/api";

export default function Musicas() {
  const [musicas, setMusicas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [idAlbum, setIdAlbum] = useState("");

  useEffect(() => {
    listar();
  }, []);

  function listar() {
    api.get("/musicas").then(res => setMusicas(res.data));
  }

  function salvar() {
    api.post("/musicas", {
      titulo,
      album: { id: idAlbum }
    }).then(() => {
      setTitulo("");
      setIdAlbum("");
      listar();
    });
  }

  function excluir(idMusica) {
    api.delete(`/musicas/${idMusica}`).then(listar);
  }

  return (
    <div>
      <h1>Músicas</h1>

      <input
        placeholder="Título da música"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />

      <input
        placeholder="ID do álbum"
        value={idAlbum}
        onChange={e => setIdAlbum(e.target.value)}
      />

      <button onClick={salvar}>Salvar</button>

      <table border="1" width="100%" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {musicas.map(m => (
            <tr key={m.idMusica}>
              <td>{m.idMusica}</td>
              <td>{m.titulo}</td>
              <td>
                <button onClick={() => excluir(m.idMusica)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}