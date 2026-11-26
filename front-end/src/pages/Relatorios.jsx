import { useEffect, useState } from "react";
import api from "../services/api";

export default function Relatorios() {
  const [usuarios, setUsuarios] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [auditoria, setAuditoria] = useState([]);

  function carregarRelatorios() {
    api.get("/relatorios/usuarios-dia").then(r => setUsuarios(r.data)).catch(() => {});
    api.get("/relatorios/playlists").then(r => setPlaylists(r.data)).catch(() => {});
    api.get("/relatorios/ranking-artistas").then(r => setRanking(r.data)).catch(() => {});
    api.get("/relatorios/auditoria-usuarios").then(r => setAuditoria(r.data)).catch(() => {});
  }

  useEffect(() => {
    carregarRelatorios();
  }, []);

  const totalReproducoes = ranking.reduce(
    (acc, item) => acc + (Number(item.total_reproducoes) || 0),
    0
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">📊 Relatórios Analíticos & Auditoria</h1>
          <p className="page-subtitle">
            Métricas consolidadas com JOIN + GROUP BY + SUM e histórico do Trigger de Auditoria
          </p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={carregarRelatorios}>
          🔄 Atualizar dados
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Artistas no Ranking</div>
          <div className="stat-value">{ranking.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total de Reproduções</div>
          <div className="stat-value">{totalReproducoes}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Playlists Analisadas</div>
          <div className="stat-value">{playlists.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Eventos de Auditoria (Trigger)</div>
          <div className="stat-value">{auditoria.length}</div>
        </div>
      </div>

      <div className="panel-card">
        <div className="panel-title">
          <span>🏆 Ranking Global de Artistas</span>
        </div>
        <Tabela
          dados={ranking}
          colunas={[
            { chave: "artista", rotulo: "Artista" },
            { chave: "total_reproducoes", rotulo: "Total de Reproduções" },
            { chave: "usuarios_unicos", rotulo: "Ouvintes Únicos" }
          ]}
        />
      </div>

      <div className="panel-card">
        <div className="panel-title">
          <span>🎼 Desempenho das Playlists</span>
        </div>
        <Tabela
          dados={playlists}
          colunas={[
            { chave: "nome_playlist", rotulo: "Playlist" },
            { chave: "dono_playlist", rotulo: "Criador" },
            { chave: "total_musicas", rotulo: "Total de Faixas" },
            { chave: "duracao_total_minutos", rotulo: "Duração Total (min)" }
          ]}
        />
      </div>

      <div className="panel-card">
        <div className="panel-title">
          <span>📅 Execução Diária por Usuário</span>
        </div>
        <Tabela
          dados={usuarios}
          colunas={[
            { chave: "usuario", rotulo: "Usuário" },
            { chave: "dia", rotulo: "Dia" },
            { chave: "total_reproducoes", rotulo: "Reproduções" },
            { chave: "musicas_distintas", rotulo: "Músicas Distintas" },
            { chave: "total_minutos", rotulo: "Tempo Escutado (min)" }
          ]}
        />
      </div>

      <div className="panel-card">
        <div className="panel-title">
          <span>🛡️ Auditoria de Alterações em Usuários (Trigger `trg_auditoria_usuario_update`)</span>
        </div>
        {auditoria.length === 0 ? (
          <p className="page-subtitle">
            Nenhuma alteração auditada ainda. Edite o nome ou e-mail de um usuário na aba{" "}
            <strong>Usuários</strong> para disparar o gatilho do PostgreSQL!
          </p>
        ) : (
          <Tabela
            dados={auditoria}
            colunas={[
              { chave: "id_usuario", rotulo: "ID Usuário" },
              { chave: "nome_anterior", rotulo: "Nome Anterior" },
              { chave: "nome_novo", rotulo: "Nome Novo" },
              { chave: "email_anterior", rotulo: "E-mail Anterior" },
              { chave: "email_novo", rotulo: "E-mail Novo" },
              { chave: "data_alteracao", rotulo: "Data/Hora" }
            ]}
          />
        )}
      </div>
    </div>
  );
}

function Tabela({ dados, colunas }) {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {colunas.map(c => (
              <th key={c.chave}>{c.rotulo}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.map((d, i) => (
            <tr key={i}>
              {colunas.map(c => (
                <td key={c.chave}>{String(d[c.chave] ?? "—")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
