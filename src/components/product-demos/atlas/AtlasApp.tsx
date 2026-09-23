import { useState } from 'react';
import { Menu, Sun, Moon, Plus, ChevronRight, ShieldCheck, Search, CheckCircle2 } from 'lucide-react';
import { atlasPeople, atlasRoles, atlasLocations } from '../../../mocks/atlas';
import './atlas.css';

const Mark = () => (
  <div className="mark">
    ▲ <b>ATLAS</b>
    <small>Gestão que sustenta</small>
  </div>
);

export function AtlasApp({ view = 0 }: { view?: number }) {
  const [dark, setDark] = useState(false);
  const page = view === 0 ? 'pessoas' : view === 1 ? 'profissionais' : 'sistemas';
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<any>(null);

  const filtered = atlasPeople.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.cpf.includes(query));

  return (
    <div className="atlasApp" data-theme={dark ? 'dark' : 'light'}>
      <div className="shell">
        <aside>
          <Mark />
          <button>Visão geral</button>
          <button className={page === 'pessoas' ? 'active' : ''}>Pessoas</button>
          <button className={page === 'profissionais' ? 'active' : ''}>Atuação profissional</button>
          <button>Locais de trabalho</button>
          <button>Usuários</button>
          <button className={page === 'sistemas' ? 'active' : ''}>Sistemas</button>
        </aside>
        <main>
          <nav>
            <button><Menu /></button>
            <span>ATLAS / {page === 'pessoas' ? 'Pessoas' : page === 'profissionais' ? 'Atuação profissional' : 'Sistemas'}</span>
            <button onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</button>
          </nav>
          <section className="page">
            {page === 'pessoas' && (
              <>
                <header>
                  <div>
                    <span>GESTÃO</span>
                    <h1>Pessoas</h1>
                    <p>Informações organizadas para apoiar sua operação.</p>
                  </div>
                  <button className="primary" onClick={() => setEditing({})}>
                    <Plus size={16} /> Novo cadastro
                  </button>
                </header>

                <div className="card">
                  <div className="bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{filtered.length} registros</span>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid #cdbda7', padding: '6px 12px', borderRadius: '4px' }}>
                      <Search size={14} color="#887a6a" />
                      <input 
                        placeholder="Buscar pessoa ou CPF" 
                        value={query} 
                        onChange={e => setQuery(e.target.value)}
                        style={{ border: 0, background: 'transparent', outline: 'none', width: '180px', color: 'inherit' }}
                      />
                    </label>
                  </div>

                  {filtered.length === 0 ? (
                    <div className="empty">
                      <h2>Nada por aqui ainda.</h2>
                      <p>Nenhum resultado encontrado nesta seleção.</p>
                    </div>
                  ) : (
                    <>
                      {filtered.map(person => (
                        <article className="row" key={person.id}>
                          <div><small>Nome</small><b>{person.name}</b></div>
                          <div><small>CPF</small><b>{person.cpf}</b></div>
                          <div><small>Situação</small><b>{person.status}</b></div>
                          <button onClick={() => setEditing(person)}>Editar</button>
                        </article>
                      ))}
                      <footer>
                        <button disabled>Anterior</button>
                        <span>Página 1 de 1</span>
                        <button disabled>Próxima</button>
                      </footer>
                    </>
                  )}
                </div>

                {editing && (
                  <div className="modal">
                    <form onSubmit={e => { e.preventDefault(); setEditing(null); }}>
                      <h2>{editing.id ? 'Atualizar' : 'Nova'} Pessoa</h2>
                      <label>
                        Nome completo
                        <input required value={editing.name || ''} onChange={e => setEditing({...editing, name: e.target.value})} />
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <label>
                          CPF
                          <input required value={editing.cpf || ''} onChange={e => setEditing({...editing, cpf: e.target.value})} />
                        </label>
                        <label>
                          Data de Nascimento
                          <input required value={editing.dateOfBirth || ''} placeholder="DD/MM/AAAA" onChange={e => setEditing({...editing, dateOfBirth: e.target.value})} />
                        </label>
                      </div>
                      <label>
                        Endereço
                        <input required value={editing.address || ''} onChange={e => setEditing({...editing, address: e.target.value})} />
                      </label>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                        <button type="button" onClick={() => setEditing(null)} style={{ background: 'transparent', border: 0, color: '#722f37', padding: '12px 20px' }}>Cancelar</button>
                        <button className="primary">Salvar</button>
                      </div>
                    </form>
                  </div>
                )}
              </>
            )}

            {page === 'profissionais' && (
              <>
                <header>
                  <div>
                    <span>GESTÃO</span>
                    <h1>Atuação profissional</h1>
                    <p>Mapeie onde e como as pessoas atuam na organização.</p>
                  </div>
                </header>
                <div className="card">
                  <div className="bar">Vínculos recentes</div>
                  <article className="row">
                    <div><small>Pessoa</small><b>Ana Beatriz Lima</b></div>
                    <div><small>Função</small><b>Assistente Social</b></div>
                    <div><small>Local</small><b>Unidade Centro</b></div>
                    <div><small>Vínculo</small><b>Estatutário</b></div>
                    <button>Editar</button>
                  </article>
                  <article className="row">
                    <div><small>Pessoa</small><b>Carlos Henrique Sousa</b></div>
                    <div><small>Função</small><b>Coordenador</b></div>
                    <div><small>Local</small><b>Unidade Norte</b></div>
                    <div><small>Vínculo</small><b>Comissionado</b></div>
                    <button>Editar</button>
                  </article>
                </div>
              </>
            )}

            {page === 'sistemas' && (
              <>
                <header>
                  <div>
                    <span>GESTÃO DE ACESSOS</span>
                    <h1>Sistemas Externos</h1>
                    <p>Controle as permissões de acesso ao ecossistema.</p>
                  </div>
                </header>
                <div className="card">
                  <div className="bar" style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                      <small style={{ display: 'block', fontSize: '10px', color: '#887a6a' }}>PESSOA SELECIONADA</small>
                      <b style={{ fontSize: '15px' }}>Ana Beatriz Lima</b>
                    </div>
                  </div>
                  <article className="row" style={{ background: '#f5f0e6' }}>
                    <div style={{ flex: 1 }}>
                      <b style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} color="#608b60" /> Sistema Domus</b>
                      <small style={{ display: 'block', color: '#887a6a', marginTop: '4px' }}>Acompanhamento Domiciliar</small>
                    </div>
                    <div><small>Perfil Autorizado</small><b>Visitador</b></div>
                    <button style={{ color: '#608b60' }}>Ativo</button>
                  </article>
                  <article className="row" style={{ background: '#f5f0e6' }}>
                    <div style={{ flex: 1 }}>
                      <b style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} color="#608b60" /> Sistema Ordian</b>
                      <small style={{ display: 'block', color: '#887a6a', marginTop: '4px' }}>Gestão de Demandas</small>
                    </div>
                    <div><small>Perfil Autorizado</small><b>Solicitante</b></div>
                    <button style={{ color: '#608b60' }}>Ativo</button>
                  </article>
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
