import { useEffect, useState } from "react";
import api from "../services/api";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function listar() {
    api.get("/usuarios").then(res => setUsuarios(res.data));
  }

  useEffect(() => {
    listar();
  }, []);

  function salvar() {
    if (!nome || !email || !senha) return;
    api.post("/usuarios", { nome, email, senha }).then(() => {
      setNome("");
      setEmail("");
      setSenha("");
      listar();
    });
  }

  function excluir(idUsuario) {
    api.delete(`/usuarios/${idUsuario}`).then(listar);
  }

  return (
    <div>
      <h1>Usuários</h1>

      <input
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <input
        placeholder="E-mail"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />
      <button onClick={salvar}>Salvar</button>

      <table border="1" width="100%" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.idUsuario}>
              <td>{u.idUsuario}</td>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => excluir(u.idUsuario)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
