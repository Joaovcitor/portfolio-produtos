import { useState } from 'react';
import { KanbanSquare, BookOpen, Search, Plus, Bell, Settings, FileText, CheckCircle2, MessageSquare, Paperclip, Send } from 'lucide-react';
import { ordianTasks, ordianKnowledge, ordianTaskDetails } from '../../../mocks/ordian';
import './ordian.css';

export function OrdianApp({ view = 0 }: { view?: number }) {
  const openTasks = ordianTasks.filter(t => t.status === 'Abertas');
  const inProgress = ordianTasks.filter(t => t.status === 'Em andamento');
  const resolved = ordianTasks.filter(t => t.status === 'Resolvidas');

  return (
    <div className="ordianApp">
      <div className="shell">
        <aside>
          <div className="brand">
            <KanbanSquare size={24} />
            <span>Ordian</span>
          </div>
          <nav>
            <a href="javascript:void(0)" className={view === 0 || view === 1 ? 'active' : ''}>
              <KanbanSquare size={18} /> Fluxo de Trabalho
            </a>
            <a href="javascript:void(0)" className={view === 2 ? 'active' : ''}>
              <BookOpen size={18} /> Base de Conhecimento
            </a>
            <a href="javascript:void(0)"><FileText size={18} /> Relatórios</a>
            <a href="javascript:void(0)"><Settings size={18} /> Configurações</a>
          </nav>
        </aside>

        <main className="workspace">
          <header>
            <div className="header-search">
              <Search size={16} />
              <input placeholder="Buscar demandas ou artigos..." />
            </div>
            <div className="user-profile">
              <Bell size={18} style={{ color: 'var(--muted)', marginRight: '16px' }} />
              <span>Clara Santos</span>
              <div className="avatar">CS</div>
            </div>
          </header>

          <div className="content">
            {view === 0 && (
              <>
                <div className="page-header">
                  <div>
                    <h1>Demandas</h1>
                    <p>Gerencie o fluxo de solicitações da unidade.</p>
                  </div>
                  <button className="button-primary">
                    <Plus size={16} /> Nova Demanda
                  </button>
                </div>

                <div className="board">
                  <div className="column">
                    <div className="col-header">
                      <span>Abertas</span>
                      <span className="col-count">{openTasks.length}</span>
                    </div>
                    {openTasks.map(task => (
                      <div className="task-card" key={task.id}>
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
                      <div className="task-card active-card" key={task.id} style={{ borderColor: 'var(--primary)' }}>
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
                      <div className="task-card" key={task.id} style={{ opacity: 0.7 }}>
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
            )}

            {view === 1 && (
              <div className="ticket-detail-view" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="page-header" style={{ marginBottom: '20px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
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

            {view === 2 && (
              <>
                <div className="page-header">
                  <div>
                    <h1>Base de Conhecimento</h1>
                    <p>Manuais, guias e procedimentos operacionais.</p>
                  </div>
                  <button className="button-primary" style={{ background: 'var(--surface-elevated)', color: 'var(--text)' }}>
                    <Plus size={16} /> Novo Artigo
                  </button>
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
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
