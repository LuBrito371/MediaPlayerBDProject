import { useEffect, useState } from "react";
import api from "../services/api";

export default function Albuns() {
  const [albuns, setAlbuns] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [genero, setGenero] = useState("");
  const [idArtista, setIdArtista] = useState("");

  function listar() {
    api.get("/albuns").then(res => setAlbuns(res.data));
  }

  useEffect(() => {
    listar();
  }, []);

  function salvar() {
    if (!titulo || !anoLancamento || !genero || !idArtista) return;
    api.post("/albuns", {
      titulo,
      anoLancamento: Number(anoLancamento),
      genero,
      artista: { idArtista: Number(idArtista) }
    }).then(() => {
      setTitulo("");
      setAnoLancamento("");
      setGenero("");
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
        placeholder="Ano de lançamento"
        type="number"
        value={anoLancamento}
        onChange={e => setAnoLancamento(e.target.value)}
      />

      <input
        placeholder="Gênero"
        value={genero}
        onChange={e => setGenero(e.target.value)}
      />

      <input
        placeholder="ID do artista"
        type="number"
        value={idArtista}
        onChange={e => setIdArtista(e.target.value)}
      />

      <button onClick={salvar}>Salvar</button>

      <table border="1" width="100%" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Ano</th>
            <th>Gênero</th>
            <th>Artista</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {albuns.map(a => (
            <tr key={a.idAlbum}>
              <td>{a.idAlbum}</td>
              <td>{a.titulo}</td>
              <td>{a.anoLancamento}</td>
              <td>{a.genero}</td>
              <td>{a.artista?.nome}</td>
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
