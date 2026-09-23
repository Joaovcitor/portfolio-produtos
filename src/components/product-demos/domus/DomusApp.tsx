import { useState } from 'react';
import { LayoutGrid, Users, MapPin, Search, CalendarDays, Check, FileText } from 'lucide-react';
import { domusVisits, domusFamilies, domusMetrics } from '../../../mocks/domus';
import './domus.css';

export function DomusApp({ view = 0 }: { view?: number }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="domusApp">
      <div className={`app-shell ${collapsed ? 'collapsed' : ''}`}>
        <aside>
          <div className="brand">
            <div className="mark" onClick={() => setCollapsed(!collapsed)} style={{ cursor: 'pointer' }}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" /></svg>
              <div><b>DOMUS</b><span>Assistência Social</span></div>
            </div>
          </div>
          <nav>
            <a href="javascript:void(0)" className={view === 0 ? 'active' : ''}><CalendarDays /><span>Agenda</span></a>
            <a href="javascript:void(0)" className={view === 1 ? 'active' : ''}><Users /><span>Famílias</span></a>
            <a href="javascript:void(0)" className={view === 2 ? 'active' : ''}><FileText /><span>Atendimentos</span></a>
            <a href="javascript:void(0)"><MapPin /><span>Territórios</span></a>
          </nav>
        </aside>
        
        <main>
          <header>
            <div className="header-context">
              <span>UNIDADE CENTRO</span>
              <strong>Bem-vindo, Rafael Martins</strong>
            </div>
            <div className="profile">
              <div>
                <strong>Rafael Martins</strong>
                <span>Visitador</span>
              </div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#c45132', color: 'white', display: 'grid', placeItems: 'center', fontWeight: 'bold' }}>RM</div>
            </div>
          </header>

          <div className="content">
            <div className="page-heading">
              <div>
                <h1>{view === 0 ? 'Agenda: Território' : view === 1 ? 'Acompanhamento Familiar' : 'Atendimento em Campo'}</h1>
                <p>{view === 0 ? 'Acompanhamento das visitas domiciliares programadas.' : view === 1 ? 'Contexto e histórico do núcleo familiar.' : 'Registro da visita domiciliar.'}</p>
              </div>
            </div>

            {view === 0 && (
              <>
                <div className="dashboard-grid">
                  <div className="card" style={{ gridColumn: '1 / -1' }}>
                    <div className="section-title">
                      <h2>Visitas Programadas</h2>
                      <a href="javascript:void(0)">Ver mapa</a>
                    </div>
                    <div className="visit-stack">
                      {domusVisits.map((v) => (
                        <a href="javascript:void(0)" key={v.id}>
                          <div className="calendar-day">
                            <strong>{v.time.split(':')[0]}</strong>
                            <span>{v.time.split(':')[1]}</span>
                          </div>
                          <div>
                            <strong>{v.name}</strong>
                            <span>{v.type} • {v.neighborhood}</span>
                          </div>
                          <span className={`status ${v.status === 'Concluída' ? 'status-active' : 'status-muted'}`}>{v.status}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {view === 1 && (
              <div className="card">
                <div className="section-title">
                  <h2>Núcleo Oliveira</h2>
                </div>
                <div style={{ marginTop: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 200px' }}>
                    <div style={{ padding: '15px', background: '#fff9f0', border: '1px solid #e8d9c4', borderRadius: '10px' }}>
                      <MapPin size={24} color="#c45132" style={{ marginBottom: '10px' }} />
                      <h3 style={{ margin: '0 0 5px 0' }}>Bairro Jardim</h3>
                      <p style={{ margin: 0, fontSize: '14px' }}>Rua das Araucárias, 45</p>
                    </div>
                  </div>
                  <div style={{ flex: '2 1 300px' }}>
                    <h3 style={{ marginBottom: '15px' }}>Membros da Família</h3>
                    <div className="table-wrap">
                      <table>
                        <tbody>
                          {domusFamilies[0].members.map(m => (
                            <tr key={m.name}>
                              <td><strong>{m.name}</strong><small>{m.relationship}</small></td>
                              <td className="actions-cell"><span className="status status-active">Ativo</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {view === 2 && (
              <div className="card">
                <div className="section-title">
                  <h2>Visita Domiciliar - Família Oliveira</h2>
                  <span className="status status-active">Concluída</span>
                </div>
                <div style={{ marginTop: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 250px', padding: '20px', borderRight: '1px solid #e8d9c4' }}>
                    <h3 style={{ marginBottom: '20px' }}>Linha do Tempo</h3>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f4e6d0', color: '#c45132', display: 'grid', placeItems: 'center' }}><Check size={16} /></div>
                      <div>
                        <strong style={{ display: 'block' }}>Visita agendada</strong>
                        <span style={{ fontSize: '12px', color: '#657187' }}>Equipe Centro</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f4e6d0', color: '#c45132', display: 'grid', placeItems: 'center' }}><Check size={16} /></div>
                      <div>
                        <strong style={{ display: 'block' }}>Atendimento iniciado</strong>
                        <span style={{ fontSize: '12px', color: '#657187' }}>Validação por GPS</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f4e6d0', color: '#c45132', display: 'grid', placeItems: 'center' }}><Check size={16} /></div>
                      <div>
                        <strong style={{ display: 'block' }}>Concluído</strong>
                        <span style={{ fontSize: '12px', color: '#657187' }}>Relato preenchido</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ flex: '1 1 250px', padding: '20px' }}>
                    <div style={{ padding: '20px', background: '#f4e6d0', borderRadius: '10px' }}>
                      <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', textTransform: 'uppercase', color: '#782e39' }}>Relato da Visita</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#172b4d', lineHeight: '1.6' }}>{domusVisits[0].report}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
