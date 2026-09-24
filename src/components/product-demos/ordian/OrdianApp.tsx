import { useState } from 'react';
import { KanbanSquare, BookOpen, Search, Plus, Bell, Settings, FileText, CheckCircle2, MessageSquare, Paperclip, Send, Clock, Users, Building, Tags, Shield, X, ChevronRight } from 'lucide-react';
import { ordianTasks, ordianKnowledge, ordianTaskDetails, ordianSla, ordianUsers, ordianDepartments, ordianCategories } from '../../../mocks/ordian';
import './ordian.css';

export function OrdianApp({ view = 0 }: { view?: number | 'explore' }) {
  const [internalPage, setInternalPage] = useState('demandas');
  const [modal, setModal] = useState<any>(null);
  const [query, setQuery] = useState('');

  const page = view === 'explore'
    ? internalPage
    : view === 0 ? 'demandas'
    : view === 1 ? 'ticket'
    : view === 2 ? 'conhecimento'
    : 'demandas';

  const nav = (target: string) => {
    if (view === 'explore') setInternalPage(target);
  };

  const renderDemandas = () => {
    const q = query.toLowerCase();
    const filteredTasks = ordianTasks.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    const openTasks = filteredTasks.filter(t => t.status === 'Abertas');
    const inProgress = filteredTasks.filter(t => t.status === 'Em andamento');
    const resolved = filteredTasks.filter(t => t.status === 'Resolvidas');

    return (
      <>
        <div className="page-header">
          <div>
            <h1>Demandas</h1>
            <p>Gerencie o fluxo de solicitações da unidade.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="header-search">
              <Search size={16} />
              <input placeholder="Buscar demandas..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <button className="button-primary" onClick={() => setModal({ type: 'form' })}>
              <Plus size={16} /> Nova Demanda
            </button>
          </div>
        </div>

        <div className="board">
          <div className="column">
            <div className="col-header">
              <span>Abertas</span>
              <span className="col-count">{openTasks.length}</span>
            </div>
            {openTasks.map(task => (
              <div className="task-card" key={task.id} onClick={() => setModal({ type: 'ticket', data: task })}>
                <span className="task-type">{task.type}</span>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="task-meta">
                  <div className="assignee">
                    <span>{task.assignee.charAt(0)}</span> {task.assignee}
                  </div>
                  <span style={{ color: task.priority === 'Alta' ? 'var(--primary)' : 'inherit' }}>{task.priority}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="column">
            <div className="col-header">
              <span>Em andamento</span>
              <span className="col-count">{inProgress.length}</span>
            </div>
            {inProgress.map(task => (
              <div className="task-card active-card" key={task.id} style={{ borderColor: 'var(--primary)' }} onClick={() => setModal({ type: 'ticket', data: task })}>
                <span className="task-type">{task.type}</span>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div style={{ background: 'var(--bg-subtle)', height: '4px', borderRadius: '2px', marginBottom: '12px' }}>
                  <div style={{ background: 'var(--primary)', height: '100%', width: `${task.progress}%`, borderRadius: '2px' }}></div>
                </div>
                <div className="task-meta">
                  <div className="assignee">
                    <span>{task.assignee.charAt(0)}</span> {task.assignee}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {task.messages && <span>💬 {task.messages}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="column">
            <div className="col-header">
              <span>Resolvidas</span>
              <span className="col-count">{resolved.length}</span>
            </div>
            {resolved.map(task => (
              <div className="task-card" key={task.id} style={{ opacity: 0.7 }} onClick={() => setModal({ type: 'ticket', data: task })}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="task-type">{task.type}</span>
                  <CheckCircle2 size={14} color="var(--muted)" />
                </div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="task-meta">
                  <div className="assignee">
                    <span>{task.assignee.charAt(0)}</span> {task.assignee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderConhecimento = () => (
    <>
      <div className="page-header">
        <div>
          <h1>Base de Conhecimento</h1>
          <p>Manuais, guias e procedimentos operacionais.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="header-search">
            <Search size={16} />
            <input placeholder="Buscar artigos..." />
          </div>
          <button className="button-primary" style={{ background: 'var(--surface-elevated)', color: 'var(--text)' }} onClick={() => setModal({ type: 'form' })}>
            <Plus size={16} /> Novo Artigo
          </button>
        </div>
      </div>

      <div className="knowledge-grid">
        {ordianKnowledge.map((kb, i) => (
          <div className="kb-card" key={i} style={i === 2 ? { borderColor: 'var(--primary)', background: 'var(--bg-subtle)' } : {}}>
            <span>{kb.category}</span>
            <h3>{kb.title}</h3>
            <p>{kb.description}</p>
          </div>
        ))}
      </div>
    </>
  );

  const renderSla = () => (
    <div style={{ padding: '20px' }}>
      <div className="page-header">
        <div>
          <h1>Acordos de Nível de Serviço (SLA)</h1>
          <p>Regras de prazos para primeira resposta e resolução.</p>
        </div>
        <button className="button-primary" onClick={() => setModal({ type: 'form' })}><Plus size={16} /> Nova Regra SLA</button>
      </div>
      <div className="table-wrap">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr><th>Departamento</th><th>Categoria</th><th>Prioridade</th><th>Primeira Resposta</th><th>Resolução</th><th>Status</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {ordianSla.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px' }}>{s.department}</td>
                <td style={{ padding: '12px' }}>{s.category}</td>
                <td style={{ padding: '12px' }}>{s.priority}</td>
                <td style={{ padding: '12px' }}>{s.firstResponse}</td>
                <td style={{ padding: '12px' }}>{s.resolution}</td>
                <td style={{ padding: '12px' }}>{s.isActive ? 'Ativo' : 'Inativo'}</td>
                <td style={{ padding: '12px' }}><button onClick={() => setModal({ type: 'form' })}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDepartamentos = () => (
    <div style={{ padding: '20px' }}>
      <div className="page-header">
        <div>
          <h1>Departamentos</h1>
          <p>Estrutura organizacional que atende e solicita demandas.</p>
        </div>
        <button className="button-primary" onClick={() => setModal({ type: 'form' })}><Plus size={16} /> Novo Departamento</button>
      </div>
      <div className="table-wrap">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr><th>Nome</th><th>Código</th><th>Cliente?</th><th>Provedor?</th><th>Status</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {ordianDepartments.map(d => (
              <tr key={d.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px' }}>{d.name}</td>
                <td style={{ padding: '12px' }}>{d.code}</td>
                <td style={{ padding: '12px' }}>{d.isCustomer ? 'Sim' : 'Não'}</td>
                <td style={{ padding: '12px' }}>{d.isProvider ? 'Sim' : 'Não'}</td>
                <td style={{ padding: '12px' }}>{d.isActive ? 'Ativo' : 'Inativo'}</td>
                <td style={{ padding: '12px' }}><button onClick={() => setModal({ type: 'form' })}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCategorias = () => (
    <div style={{ padding: '20px' }}>
      <div className="page-header">
        <div>
          <h1>Categorias</h1>
          <p>Tipificação das solicitações por departamento.</p>
        </div>
        <button className="button-primary" onClick={() => setModal({ type: 'form' })}><Plus size={16} /> Nova Categoria</button>
      </div>
      <div className="table-wrap">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr><th>Nome da Categoria</th><th>Departamento Responsável</th><th>Status</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {ordianCategories.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px' }}>{c.name}</td>
                <td style={{ padding: '12px' }}>{c.department}</td>
                <td style={{ padding: '12px' }}>{c.isActive ? 'Ativo' : 'Inativo'}</td>
                <td style={{ padding: '12px' }}><button onClick={() => setModal({ type: 'form' })}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEquipe = () => (
    <div style={{ padding: '20px' }}>
      <div className="page-header">
        <div>
          <h1>Equipe e Acessos</h1>
          <p>Controle de usuários da plataforma Ordian.</p>
        </div>
        <button className="button-primary" onClick={() => setModal({ type: 'form' })}><Plus size={16} /> Novo Usuário</button>
      </div>
      <div className="table-wrap">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr><th>Nome</th><th>E-mail</th><th>Departamento</th><th>Perfis</th><th>Status</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {ordianUsers.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px' }}>{u.name}</td>
                <td style={{ padding: '12px' }}>{u.email}</td>
                <td style={{ padding: '12px' }}>{u.department}</td>
                <td style={{ padding: '12px' }}>{u.roles.join(', ')}</td>
                <td style={{ padding: '12px' }}>{u.isActive ? 'Ativo' : 'Inativo'}</td>
                <td style={{ padding: '12px' }}><button onClick={() => setModal({ type: 'form' })}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRelatorios = () => (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <FileText size={48} color="var(--muted)" style={{ marginBottom: '20px' }} />
      <h2>Relatórios e Métricas</h2>
      <p style={{ color: 'var(--muted)', maxWidth: '400px', textAlign: 'center', marginTop: '10px' }}>
        Os relatórios gerenciais e a análise de desempenho do SLA estão em desenvolvimento na plataforma.
      </p>
    </div>
  );

  return (
    <div className="ordianApp">
      <div className="shell">
        <aside>
          <div className="brand">
            <KanbanSquare size={24} />
            <span>Ordian</span>
          </div>
          <nav>
            <a href="javascript:void(0)" className={page === 'demandas' || page === 'ticket' ? 'active' : ''} onClick={() => nav('demandas')}>
              <KanbanSquare size={18} /> Fluxo de Trabalho
            </a>
            <a href="javascript:void(0)" className={page === 'conhecimento' ? 'active' : ''} onClick={() => nav('conhecimento')}>
              <BookOpen size={18} /> Base de Conhecimento
            </a>
            
            <div style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid var(--border)', opacity: 0.5 }}></div>
            
            <a href="javascript:void(0)" className={page === 'sla' ? 'active' : ''} onClick={() => nav('sla')}>
              <Clock size={18} /> Acordos de Serviço (SLA)
            </a>
            <a href="javascript:void(0)" className={page === 'departamentos' ? 'active' : ''} onClick={() => nav('departamentos')}>
              <Building size={18} /> Departamentos
            </a>
            <a href="javascript:void(0)" className={page === 'categorias' ? 'active' : ''} onClick={() => nav('categorias')}>
              <Tags size={18} /> Categorias
            </a>
            <a href="javascript:void(0)" className={page === 'equipe' ? 'active' : ''} onClick={() => nav('equipe')}>
              <Shield size={18} /> Segurança e Acesso
            </a>
            <a href="javascript:void(0)" className={page === 'relatorios' ? 'active' : ''} onClick={() => nav('relatorios')}>
              <FileText size={18} /> Relatórios
            </a>
          </nav>
        </aside>

        <main className="workspace">
          {view !== 'explore' && view !== 0 && view !== 1 && view !== 2 ? null : (
            <header>
              <div style={{ flex: 1 }}></div>
              <div className="user-profile">
                <Bell size={18} style={{ color: 'var(--muted)', marginRight: '16px' }} />
                <span>Clara Santos</span>
                <div className="avatar">CS</div>
              </div>
            </header>
          )}

          <div className="content" style={{ padding: page === 'demandas' || page === 'conhecimento' || page === 'ticket' ? '' : '0' }}>
            {page === 'demandas' && renderDemandas()}
            {page === 'conhecimento' && renderConhecimento()}
            {page === 'sla' && renderSla()}
            {page === 'departamentos' && renderDepartamentos()}
            {page === 'categorias' && renderCategorias()}
            {page === 'equipe' && renderEquipe()}
            {page === 'relatorios' && renderRelatorios()}
            
            {page === 'ticket' && (
              <div className="ticket-detail-view" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', height: '100%', padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="page-header" style={{ marginBottom: '20px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <button onClick={() => nav('demandas')} style={{ background: 'transparent', border: '1px solid var(--border)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Voltar</button>
                        <span style={{ fontSize: '12px', background: 'var(--bg-subtle)', padding: '4px 8px', borderRadius: '4px' }}>#{ordianTaskDetails.id}</span>
                        <span className="task-type">{ordianTaskDetails.type}</span>
                      </div>
                      <h1>{ordianTaskDetails.title}</h1>
                      <p>Solicitado por {ordianTaskDetails.requester}</p>
                    </div>
                  </div>
                  
                  <div style={{ flex: 1, background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
                      <h3 style={{ fontSize: '14px', marginBottom: '15px', color: 'var(--muted)' }}>Histórico da solicitação</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {ordianTaskDetails.messages.map((msg, i) => (
                          <div key={i} style={{ display: 'flex', gap: '15px' }}>
                            <div className="avatar" style={{ background: msg.role === 'EQUIPE' ? 'var(--primary)' : 'var(--bg-subtle)', color: msg.role === 'EQUIPE' ? 'white' : 'inherit' }}>{msg.sender.charAt(0)}</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <strong>{msg.sender} <span style={{ fontSize: '10px', fontWeight: 'normal', color: 'var(--muted)', marginLeft: '8px' }}>{msg.role}</span></strong>
                                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{msg.time}</span>
                              </div>
                              <div style={{ background: 'var(--bg-main)', padding: '12px 16px', borderRadius: '0 8px 8px 8px', fontSize: '13px', lineHeight: 1.5 }}>
                                {msg.text}
                                {msg.attachment && (
                                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', width: 'max-content' }}>
                                    <Paperclip size={14} color="var(--primary)" />
                                    <span style={{ fontSize: '12px', fontWeight: 500 }}>{msg.attachment}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: '15px', background: 'var(--bg-main)', display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <button style={{ padding: '10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px' }}><Paperclip size={16} /></button>
                      <input placeholder="Digite sua resposta..." style={{ flex: 1, padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--surface)' }} />
                      <button className="button-primary" style={{ padding: '12px 20px' }}>Enviar <Send size={16} style={{ marginLeft: '8px' }} /></button>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)', padding: '20px', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '14px', marginBottom: '15px' }}>Detalhes</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted)' }}>Status</span> <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{ordianTaskDetails.status}</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted)' }}>Responsável</span> <span>{ordianTaskDetails.assignee}</span></div>
                    </div>
                  </div>

                  <div style={{ background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)', padding: '20px' }}>
                    <h3 style={{ fontSize: '14px', marginBottom: '15px' }}>Progresso</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {ordianTaskDetails.steps.map((step, i) => (
                        <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                          <input type="checkbox" checked={step.completed} readOnly style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
                          <span style={{ opacity: step.completed ? 0.7 : 1, textDecoration: step.completed ? 'line-through' : 'none' }}>{step.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: '#000c', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <section style={{ background: 'var(--surface)', padding: '24px', borderRadius: '8px', maxWidth: '400px', width: '100%', border: '1px solid var(--border)', color: 'var(--text)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>Formulário de Ação</h3>
              <button onClick={() => setModal(null)} style={{ background: 'transparent', border: 0, cursor: 'pointer' }}><X size={18} color="var(--text)" /></button>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>[ORIGEM: BACKEND] Demonstração de modal conectado aos endpoints oficiais do Ordian.</p>
            <form onSubmit={e => { e.preventDefault(); setModal(null); }}>
              <label style={{ display: 'block', marginBottom: '15px' }}>
                Dados de Cadastro
                <input style={{ display: 'block', width: '100%', marginTop: '5px', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} placeholder="Preencha os dados" />
              </label>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setModal(null)} style={{ padding: '8px 16px', background: 'transparent', border: 0, color: 'var(--text)', cursor: 'pointer' }}>Cancelar</button>
                <button className="button-primary" style={{ cursor: 'pointer' }}>Salvar Alterações</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
