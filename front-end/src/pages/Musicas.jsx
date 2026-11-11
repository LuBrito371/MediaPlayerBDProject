import { useEffect, useState } from "react";
import api from "../services/api";

export default function Musicas() {
  const [musicas, setMusicas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [duracao, setDuracao] = useState("");
  const [urlMusica, setUrlMusica] = useState("");
  const [idAlbum, setIdAlbum] = useState("");

  function listar() {
    api.get("/musicas").then(res => setMusicas(res.data));
  }

  useEffect(() => {
    listar();
  }, []);

  function salvar() {
    if (!titulo || !duracao || !urlMusica || !idAlbum) return;
    api.post("/musicas", {
      titulo,
      duracao: Number(duracao),
      urlMusica,
      album: { idAlbum: Number(idAlbum) }
    }).then(() => {
      setTitulo("");
      setDuracao("");
      setUrlMusica("");
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
        placeholder="Duração (segundos)"
        type="number"
        value={duracao}
        onChange={e => setDuracao(e.target.value)}
      />

      <input
        placeholder="URL da música"
        value={urlMusica}
        onChange={e => setUrlMusica(e.target.value)}
      />

      <input
        placeholder="ID do álbum"
        type="number"
        value={idAlbum}
        onChange={e => setIdAlbum(e.target.value)}
      />

      <button onClick={salvar}>Salvar</button>

      <table border="1" width="100%" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Duração (s)</th>
            <th>Álbum</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {musicas.map(m => (
            <tr key={m.idMusica}>
              <td>{m.idMusica}</td>
              <td>{m.titulo}</td>
              <td>{m.duracao}</td>
              <td>{m.album?.titulo}</td>
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
