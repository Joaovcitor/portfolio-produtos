import { useState } from 'react';
import { Layers, Monitor, PhoneCall, List, History, UserPlus } from 'lucide-react';
import { vemkaQueue, vemkaHistory, vemkaServices, vemkaCurrent } from '../../../mocks/vemka';
import './vemka.css';

export function VemKaApp({ view = 0 }: { view?: number }) {
  const [ticket, setTicket] = useState<string | null>(view === 0 ? vemkaCurrent.ticket : null);

  if (view === 2) {
    // KIOSK VIEW
    return (
      <div className="vemkaApp">
        <div className="kiosk">
          <div className="brand-mark" style={{ margin: '0 auto 40px', transform: 'scale(1.5)' }}>VK</div>
          <h2>O que você deseja fazer hoje?</h2>
          <p style={{ color: 'var(--muted)' }}>Toque na opção desejada para retirar sua senha.</p>
          <div className="service-choice">
            {vemkaServices.map((service, i) => (
              <button key={i} onClick={() => setTicket(vemkaCurrent.ticket)}>
                <b>{service}</b>
                <span>Toque para selecionar</span>
                <small>Tempo estimado: 15 min</small>
              </button>
            ))}
            <button style={{ gridColumn: '1 / -1', background: 'var(--primary-bg)', borderColor: 'var(--primary)' }}>
              <b>Atendimento Prioritário</b>
              <span>Por lei (idosos, gestantes, PCD)</span>
            </button>
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

  // STATION VIEW (view === 0)
  return (
    <div className="vemkaApp">
      <div className="shell">
        <aside>
          <div className="side-head">
            <div className="brand-mark">VK</div>
            <span>VemKa</span>
          </div>
          <nav>
            <a href="javascript:void(0)" className="active"><PhoneCall size={18} /> Atendimento</a>
            <a href="javascript:void(0)"><List size={18} /> Fila Completa</a>
            <a href="javascript:void(0)"><History size={18} /> Histórico</a>
            <a href="javascript:void(0)"><UserPlus size={18} /> Cadastros</a>
          </nav>
        </aside>
        
        <main className="workspace">
          <header>
            <div>
              <p className="crumb">VEMKA / GUICHÊ 02</p>
              <h1>Painel do Operador</h1>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Operador</span>
              <div style={{ fontWeight: '600' }}>Atendente</div>
            </div>
          </header>
          
          <div className="content">
            <div className="station">
              <div className="station-metrics">
                <article>
                  <span>Atendidos hoje</span>
                  <b>42</b>
                </article>
                <article>
                  <span>Tempo médio</span>
                  <b>08:45</b>
                </article>
                <article>
                  <span>Fila de espera</span>
                  <b>{vemkaQueue.length}</b>
                </article>
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
                    <h3 style={{ fontSize: '15px', marginBottom: '15px' }}>Próximos na Fila</h3>
                    <div className="table-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th>Senha</th>
                            <th>Tipo</th>
                            <th>Status</th>
                            <th>Chegada</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vemkaQueue.map((q) => (
                            <tr key={q.ticket}>
                              <td><code>{q.ticket}</code></td>
                              <td>{q.type}</td>
                              <td><span className={`badge ${q.status}`}>{q.status}</span></td>
                              <td>{q.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="station-history">
                  <h3 style={{ fontSize: '15px', marginBottom: '15px' }}>Últimas Chamadas</h3>
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Senha</th>
                          <th>Guichê</th>
                          <th>Hora</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vemkaHistory.map((h) => (
                          <tr key={h.ticket}>
                            <td><code style={{ color: 'var(--muted)' }}>{h.ticket}</code></td>
                            <td>{h.counter}</td>
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
        </main>
      </div>
    </div>
  );
}
