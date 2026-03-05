import { useEffect, useState } from "react";
import api from "../services/api";

export default function Albuns() {
  const [albuns, setAlbuns] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [idArtista, setIdArtista] = useState("");

  useEffect(() => {
    listar();
  }, []);

  function listar() {
    api.get("/albuns").then(res => setAlbuns(res.data));
  }

  function salvar() {
    api.post("/albuns", {
      titulo,
      artista: { id: idArtista }
    }).then(() => {
      setTitulo("");
      setIdArtista("");
      listar();
    });
  }

  function excluir(idAlbum) {
    api.delete(`/albuns/${idAlbum}`).then(listar);
  }

  return (
    <div>
      <h1>Álbuns</h1>

      <input
        placeholder="Título do álbum"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />

      <input
        placeholder="ID do artista"
        value={idArtista}
        onChange={e => setArtistaId(e.target.value)}
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
          {albuns.map(a => (
            <tr key={a.idAlbum}>
              <td>{a.idAlbum}</td>
              <td>{a.titulo}</td>
              <td>
                <button onClick={() => excluir(a.idAlbum)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}