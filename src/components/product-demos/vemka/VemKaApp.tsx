import { useState } from 'react';
import { MonitorPlay, Building2, ClipboardList, Users, PhoneCall, List, History, UserPlus, X, Bell, Ticket } from 'lucide-react';
import { vemkaQueue, vemkaHistory, vemkaServices, vemkaCurrent, vemkaUnits, vemkaCounters, vemkaTeam } from '../../../mocks/vemka';
import './vemka.css';

export function VemKaApp({ view = 0 }: { view?: number | 'explore' }) {
  const [ticket, setTicket] = useState<string | null>(view === 0 ? vemkaCurrent.ticket : null);
  const [internalPage, setInternalPage] = useState('operacao');
  const [modal, setModal] = useState<any>(null);

  if (view === 2) {
    // KIOSK VIEW
    return (
      <div className="vemkaApp">
        <div className="kiosk">
          <div className="brand-mark" style={{ margin: '0 auto 40px', transform: 'scale(1.5)' }}>VK</div>
          <h2>O que você deseja fazer hoje?</h2>
          <p style={{ color: 'var(--muted)' }}>Toque na opção desejada para retirar sua senha.</p>
          <div className="service-choice">
            {vemkaServices.map((service) => (
              <button key={service.id} onClick={() => setTicket(vemkaCurrent.ticket)}>
                <b>{service.name}</b>
                <span>Toque para selecionar</span>
                <small>Tempo estimado: 15 min</small>
              </button>
            ))}
          </div>
          {ticket && (
            <div style={{ position: 'fixed', inset: 0, background: '#000c', display: 'grid', placeItems: 'center', zIndex: 10 }}>
              <div style={{ background: 'var(--surface)', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--primary)' }}>
                <h3>Sua senha é</h3>
                <code style={{ display: 'block', fontSize: '64px', margin: '20px 0', color: 'var(--primary)' }}>{ticket}</code>
                <p>Aguarde o chamado no painel.</p>
                <button className="primary" onClick={() => setTicket(null)} style={{ marginTop: '20px' }}>Concluir</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === 1) {
    // TV PANEL VIEW
    return (
      <div className="vemkaApp" style={{ background: '#111', color: '#fff', height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
          <div className="brand-mark" style={{ color: '#fff', borderColor: '#fff' }}>VK</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>10:45</div>
        </header>
        <div style={{ display: 'flex', flexWrap: 'wrap', flex: 1 }}>
          <div style={{ flex: '1 1 250px', display: 'grid', placeItems: 'center', padding: '20px', borderRight: '1px solid #333' }}>
            <div style={{ textAlign: 'center', animation: 'pulse 2s infinite' }}>
              <h2 style={{ fontSize: 'clamp(24px, 5vw, 32px)', color: 'var(--primary)', marginBottom: '10px' }}>SENHA</h2>
              <div style={{ fontSize: 'clamp(70px, 15vw, 120px)', fontWeight: 'bold', lineHeight: 1 }}>{vemkaCurrent.ticket}</div>
              <div style={{ fontSize: 'clamp(30px, 8vw, 48px)', color: '#ccc', marginTop: '20px' }}>Guichê 02</div>
            </div>
          </div>
          <div style={{ flex: '1 1 250px', background: '#000', padding: '20px' }}>
            <h3 style={{ fontSize: '18px', color: '#666', marginBottom: '20px', textTransform: 'uppercase' }}>Últimas chamadas</h3>
            {vemkaHistory.map(h => (
              <div key={h.ticket} style={{ padding: '15px 0', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                <b style={{ color: '#aaa' }}>{h.ticket}</b>
                <span>{h.counter}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // STATION OR EXPLORE VIEW
  const page = view === 'explore' ? internalPage : 'operacao';

  const nav = (target: string) => {
    if (view === 'explore') setInternalPage(target);
  };

  const renderDashboard = () => (
    <div className="content">
      <div className="station-metrics">
        <article><span>Senhas em espera</span><b>{vemkaQueue.length}</b></article>
        <article><span>Em atendimento</span><b>1</b></article>
        <article><span>Concluídas</span><b>{vemkaHistory.length}</b></article>
      </div>
      <div className="dashboard-grid">
        <div className="station-history" style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ fontSize: '15px', marginBottom: '15px' }}>Histórico Geral</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Senha</th>
                  <th>Cliente</th>
                  <th>Guichê</th>
                  <th>Hora</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {vemkaHistory.map(h => (
                  <tr key={h.ticket}>
                    <td><code>{h.ticket}</code></td>
                    <td>{h.customerName || '—'}</td>
                    <td>{h.counter}</td>
                    <td>{h.time}</td>
                    <td><span className={`badge ${h.status}`}>{h.status === 'Completed' ? 'Concluída' : 'Cancelada'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOperation = () => (
    <div className="content">
      <div className="station">
        <div className="station-metrics">
          <article><span>Aguardando</span><b>{vemkaQueue.length}</b></article>
          <article><span>Em atendimento</span><b>{ticket ? 1 : 0}</b></article>
          <article><span>Concluídas hoje</span><b>42</b></article>
        </div>

        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <div className={`current-ticket ${ticket ? '' : 'idle'}`}>
              {ticket ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase' }}>
                    <span>ATENDIMENTO ATUAL</span>
                    <span>TEMPO: 02:14</span>
                  </div>
                  <code>{ticket}</code>
                  <h3>{vemkaCurrent.type}</h3>
                  <p>{vemkaCurrent.customerName}</p>
                  <div className="current-actions">
                    <button className="primary" onClick={() => setTicket(null)}>Finalizar</button>
                    <button style={{ padding: '10px 14px', background: 'var(--raised)', color: 'var(--text)', borderRadius: '7px', fontWeight: 600 }}>Transferir</button>
                  </div>
                </>
              ) : (
                <>
                  <h3 style={{ color: 'var(--muted)' }}>Guichê Livre</h3>
                  <p>Nenhum atendimento em andamento no momento.</p>
                  <div className="current-actions">
                    <button className="primary" onClick={() => setTicket('A045')}>Chamar Próximo</button>
                  </div>
                </>
              )}
            </div>

            <div className="station-queue">
              <h3 style={{ fontSize: '15px', marginBottom: '15px' }}>Fila de Espera</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Senha</th>
                      <th>Tipo</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vemkaQueue.map((q) => (
                      <tr key={q.ticket}>
                        <td><code>{q.ticket}</code></td>
                        <td>{q.type}</td>
                        <td><span className={`badge ${q.status}`}>{q.status}</span></td>
                        <td><button onClick={() => setTicket(q.ticket)}>Chamar</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="station-history">
            <h3 style={{ fontSize: '15px', marginBottom: '15px' }}>Últimas Chamadas (Seu Histórico)</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Senha</th>
                    <th>Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {vemkaHistory.filter(h => h.counter === 'Guichê 02').map((h) => (
                    <tr key={h.ticket}>
                      <td><code style={{ color: 'var(--muted)' }}>{h.ticket}</code></td>
                      <td>{h.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUnits = () => (
    <div className="content">
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Nome</th><th>Endereço</th><th>Telefone</th><th>Situação</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {vemkaUnits.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td><td>{u.address}</td><td>{u.phone}</td>
                <td><span className={`badge ${u.isActive ? 'Completed' : 'Cancelled'}`}>{u.isActive ? 'Ativa' : 'Inativa'}</span></td>
                <td><button onClick={() => setModal({ type: 'unit' })}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="content">
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Nome</th><th>Unidade</th><th>Prefixo</th><th>Prioridade</th><th>Situação</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {vemkaServices.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td><td>{s.unitName}</td><td><code>{s.prefix}</code></td><td>{s.priority}</td>
                <td><span className={`badge ${s.isActive ? 'Completed' : 'Cancelled'}`}>{s.isActive ? 'Ativo' : 'Inativo'}</span></td>
                <td><button onClick={() => setModal({ type: 'service' })}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCounters = () => (
    <div className="content">
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Número</th><th>Nome</th><th>Unidade</th><th>Situação</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {vemkaCounters.map(c => (
              <tr key={c.id}>
                <td>{c.number}</td><td>{c.name}</td><td>{c.unitName}</td>
                <td><span className={`badge ${c.isActive ? 'Completed' : 'Cancelled'}`}>{c.isActive ? 'Ativo' : 'Inativo'}</span></td>
                <td><button onClick={() => setModal({ type: 'counter' })}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="content">
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Nome</th><th>Perfil</th><th>Unidade</th><th>Serviço</th><th>Guichê</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {vemkaTeam.map(t => (
              <tr key={t.id}>
                <td>{t.name}</td><td>{t.roles.join(', ')}</td><td>{t.unit}</td><td>{t.service}</td><td>{t.counter}</td>
                <td><button onClick={() => setModal({ type: 'team' })}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="vemkaApp">
      <div className="shell">
        <aside>
          <div className="side-head">
            <div className="brand-mark">VK</div>
            <span>VemKa</span>
          </div>
          <nav>
            <a href="javascript:void(0)" className={page === 'dashboard' ? 'active' : ''} onClick={() => nav('dashboard')}><List size={18} /> Visão Geral</a>
            <a href="javascript:void(0)" className={page === 'operacao' ? 'active' : ''} onClick={() => nav('operacao')}><PhoneCall size={18} /> Operação</a>
            <a href="javascript:void(0)" className={page === 'unidades' ? 'active' : ''} onClick={() => nav('unidades')}><Building2 size={18} /> Unidades</a>
            <a href="javascript:void(0)" className={page === 'servicos' ? 'active' : ''} onClick={() => nav('servicos')}><ClipboardList size={18} /> Serviços</a>
            <a href="javascript:void(0)" className={page === 'guiches' ? 'active' : ''} onClick={() => nav('guiches')}><MonitorPlay size={18} /> Guichês</a>
            <a href="javascript:void(0)" className={page === 'equipe' ? 'active' : ''} onClick={() => nav('equipe')}><Users size={18} /> Equipe</a>
            
            <div className="nav-divider" style={{ borderTop: '1px solid var(--border)', margin: '15px 0', opacity: 0.5 }}></div>
            <a href="javascript:void(0)" onClick={() => setInternalPage('painel_demo')}><Bell size={18} /> Ver Painel TV</a>
            <a href="javascript:void(0)" onClick={() => setInternalPage('totem_demo')}><Ticket size={18} /> Ver Autoatendimento</a>
          </nav>
        </aside>
        
        <main className="workspace">
          {internalPage === 'painel_demo' && (
             <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}><VemKaApp view={1} /><button onClick={() => setInternalPage('operacao')} style={{ position: 'absolute', top: 20, right: 20, background: '#fff', padding: '10px 20px', borderRadius: '5px', color: '#000', cursor: 'pointer', border: 0 }}>Voltar ao Sistema</button></div>
          )}
          {internalPage === 'totem_demo' && (
             <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}><VemKaApp view={2} /><button onClick={() => setInternalPage('operacao')} style={{ position: 'absolute', top: 20, right: 20, background: '#fff', padding: '10px 20px', borderRadius: '5px', color: '#000', cursor: 'pointer', border: 0 }}>Voltar ao Sistema</button></div>
          )}

          <header>
            <div>
              <p className="crumb">VEMKA <span style={{ opacity: 0.5 }}>/</span> {page.toUpperCase()}</p>
              <h1>
                {page === 'dashboard' ? 'Atendimentos' 
                : page === 'operacao' ? 'Mesa de Operação' 
                : page === 'unidades' ? 'Unidades de Atendimento' 
                : page === 'servicos' ? 'Tipos de Serviço'
                : page === 'guiches' ? 'Guichês'
                : 'Gestão de Equipe e Acessos'}
              </h1>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Administrador</span>
              <div style={{ fontWeight: '600' }}>Admin Principal</div>
            </div>
          </header>
          
          {page === 'dashboard' && renderDashboard()}
          {page === 'operacao' && renderOperation()}
          {page === 'unidades' && renderUnits()}
          {page === 'servicos' && renderServices()}
          {page === 'guiches' && renderCounters()}
          {page === 'equipe' && renderTeam()}

        </main>
      </div>

      {modal && (
        <div className="modal-backdrop">
          <section className="modal" style={{ background: 'var(--surface)', padding: '24px', borderRadius: '8px', maxWidth: '400px', width: '100%', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>Formulário de Cadastro</h3>
              <button onClick={() => setModal(null)} style={{ background: 'transparent', border: 0, cursor: 'pointer' }}><X size={18} color="var(--text)" /></button>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>[ORIGEM: BACKEND] Demonstração de modal conectado aos endpoints oficiais do VemKa.</p>
            <form onSubmit={e => { e.preventDefault(); setModal(null); }}>
              <label style={{ display: 'block', marginBottom: '15px' }}>
                Nome
                <input style={{ display: 'block', width: '100%', marginTop: '5px', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
              </label>
              <label style={{ display: 'block', marginBottom: '20px' }}>
                Situação
                <select style={{ display: 'block', width: '100%', marginTop: '5px', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
                  <option>Ativo</option>
                  <option>Inativo</option>
                </select>
              </label>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setModal(null)} style={{ padding: '8px 16px', background: 'transparent', border: 0, color: 'var(--text)', cursor: 'pointer' }}>Cancelar</button>
                <button className="primary" style={{ cursor: 'pointer' }}>Salvar Alterações</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
