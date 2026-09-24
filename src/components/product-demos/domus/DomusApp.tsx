import { useState, useMemo } from 'react';
import { LayoutGrid, Users, MapPin, Search, CalendarDays, Check, FileText, Settings, KeySquare, Plus, ChevronRight } from 'lucide-react';
import { domusVisits, domusFamilies, domusPeople, domusMetrics, domusResources, domusProfessionals } from '../../../mocks/domus';
import './domus.css';

export function DomusApp({ view = 0 }: { view?: number | 'explore' }) {
  const [collapsed, setCollapsed] = useState(false);
  const [internalPage, setInternalPage] = useState('visitas');
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState<any>(null);

  const page = view === 'explore'
    ? internalPage
    : view === 0 ? 'visitas'
    : view === 1 ? 'familias'
    : view === 2 ? 'atendimento'
    : 'dashboard';

  const nav = (target: string) => {
    if (view === 'explore') setInternalPage(target);
  };

  const renderVisits = () => {
    const q = query.toLowerCase();
    const filtered = domusVisits.filter(v => v.name.toLowerCase().includes(q) || v.neighborhood.toLowerCase().includes(q));

    return (
      <div className="dashboard-grid">
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="section-title">
            <h2>Agenda de Visitas</h2>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid #cdbda7', padding: '6px 12px', borderRadius: '4px' }}>
              <Search size={14} color="#887a6a" />
              <input 
                placeholder="Buscar assistido ou bairro..." 
                value={query} 
                onChange={e => setQuery(e.target.value)}
                style={{ border: 0, background: 'transparent', outline: 'none', width: '200px', color: 'inherit' }}
              />
            </label>
          </div>
          <div className="visit-stack">
            {filtered.map(v => (
              <a href="javascript:void(0)" key={v.id} onClick={() => setModal({ type: 'visit_detail', data: v })}>
                <div className="visit-time">
                  <strong>{v.time}</strong>
                  <span>{v.date}</span>
                </div>
                <div className="visit-info">
                  <strong>{v.name}</strong>
                  <span>{v.type} • {v.neighborhood}</span>
                </div>
                <div className="visit-status">
                  <span className={`badge ${v.status === 'Concluída' ? 'success' : v.status === 'Em andamento' ? 'warning' : 'neutral'}`}>
                    {v.status === 'Concluída' && <Check size={14} />}
                    {v.status}
                  </span>
                </div>
                <ChevronRight size={18} color="#cdbda7" />
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderFamilies = () => {
    return (
      <div className="card">
        <div className="section-title">
          <h2>Núcleos Familiares</h2>
          <button className="primary" onClick={() => setModal({ type: 'form_family' })}>
            <Plus size={16} /> Novo Cadastro
          </button>
        </div>
        <div className="families-grid">
          {domusFamilies.map(f => (
            <div className="family-card" key={f.id} onClick={() => setModal({ type: 'family_detail', data: f })}>
              <h3>{f.referenceName}</h3>
              <p><MapPin size={14} /> {f.neighborhood}</p>
              <div className="members">
                {f.members.map(m => (
                  <span key={m.name}>{m.name} <small>({m.relationship})</small></span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPeople = () => {
    return (
      <div className="card">
        <div className="section-title">
          <h2>Assistidos</h2>
          <button className="primary" onClick={() => setModal({ type: 'form_person' })}>
            <Plus size={16} /> Novo Assistido
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Território</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {domusPeople.map(p => (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td>{p.cpf}</td>
                <td>{p.neighborhoodName}</td>
                <td><button onClick={() => setModal({ type: 'person_detail', data: p })}>Abrir Ficha</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderProfessionals = () => {
    return (
      <div className="card">
        <div className="section-title">
          <h2>Profissionais e Acessos</h2>
          <button className="primary" onClick={() => setModal({ type: 'form_professional' })}>
            <Plus size={16} /> Novo Profissional
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Função</th>
              <th>Unidade de Lotação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {domusProfessionals.map(p => (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td>{p.role}</td>
                <td>{p.unit}</td>
                <td><button onClick={() => setModal({ type: 'form_professional', data: p })}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderResources = () => {
    return (
      <div className="dashboard-grid">
        <div className="card">
          <h2>Unidades de Atendimento</h2>
          <ul className="simple-list">
            {domusResources.unidades.map(u => <li key={u.id}>{u.name} <button>Editar</button></li>)}
          </ul>
        </div>
        <div className="card">
          <h2>Localizações (Zonas)</h2>
          <ul className="simple-list">
            {domusResources.localizacoes.map(l => <li key={l.id}>{l.name} <button>Editar</button></li>)}
          </ul>
        </div>
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h2>Bairros e Territórios</h2>
          <ul className="simple-list">
            {domusResources.bairros.map(b => <li key={b.id}>{b.name} <button>Editar</button></li>)}
          </ul>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="dashboard-grid">
      <div className="metrics-row" style={{ gridColumn: '1 / -1', display: 'flex', gap: '20px' }}>
        <div className="metric-box"><span>Visitas hoje</span><strong>{domusMetrics.totalVisits}</strong></div>
        <div className="metric-box"><span>Concluídas</span><strong>{domusMetrics.completed}</strong></div>
        <div className="metric-box"><span>Em andamento</span><strong>{domusMetrics.inProgress}</strong></div>
        <div className="metric-box"><span>Agendadas</span><strong>{domusMetrics.scheduled}</strong></div>
      </div>
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h2>Resumo Geral</h2>
        <p>Visão gerencial do território em desenvolvimento. Esta área concentrará os mapas de calor e a distribuição geográfica dos atendimentos.</p>
      </div>
    </div>
  );

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
            <a href="javascript:void(0)" className={page === 'dashboard' ? 'active' : ''} onClick={() => nav('dashboard')}><LayoutGrid /><span>Dashboard</span></a>
            <a href="javascript:void(0)" className={page === 'visitas' || page === 'atendimento' ? 'active' : ''} onClick={() => nav('visitas')}><CalendarDays /><span>Agenda</span></a>
            <a href="javascript:void(0)" className={page === 'familias' ? 'active' : ''} onClick={() => nav('familias')}><Users /><span>Famílias</span></a>
            <a href="javascript:void(0)" className={page === 'pessoas' ? 'active' : ''} onClick={() => nav('pessoas')}><FileText /><span>Assistidos</span></a>
            
            <div className="nav-divider" style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #e0d5c1' }} />
            <a href="javascript:void(0)" className={page === 'profissionais' ? 'active' : ''} onClick={() => nav('profissionais')}><KeySquare /><span>Profissionais</span></a>
            <a href="javascript:void(0)" className={page === 'recursos' ? 'active' : ''} onClick={() => nav('recursos')}><Settings /><span>Configurações</span></a>
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
                <h1>
                  {page === 'visitas' ? 'Agenda: Território' 
                  : page === 'familias' ? 'Acompanhamento Familiar' 
                  : page === 'pessoas' ? 'Assistidos'
                  : page === 'profissionais' ? 'Equipe e Acessos'
                  : page === 'recursos' ? 'Recursos Territoriais'
                  : page === 'dashboard' ? 'Painel Gerencial'
                  : 'Atendimento em Campo'}
                </h1>
                <p>
                  {page === 'visitas' ? 'Acompanhamento das visitas domiciliares programadas.' 
                  : page === 'familias' ? 'Contexto e histórico de núcleos familiares.' 
                  : page === 'pessoas' ? 'Fichas individuais dos assistidos.'
                  : page === 'recursos' ? 'Gerencie unidades, bairros e tipos de atendimento.'
                  : page === 'dashboard' ? 'Métricas da sua unidade de atuação.'
                  : 'Administração da equipe de visitadores e acessos.'}
                </p>
              </div>
            </div>

            {page === 'visitas' && renderVisits()}
            {page === 'atendimento' && renderVisits()}
            {page === 'familias' && renderFamilies()}
            {page === 'pessoas' && renderPeople()}
            {page === 'profissionais' && renderProfessionals()}
            {page === 'recursos' && renderResources()}
            {page === 'dashboard' && renderDashboard()}

          </div>
        </main>
      </div>

      {modal && (
        <div className="domus-modal-overlay">
          <div className="domus-modal">
            <div className="modal-header">
              <h2>
                {modal.type === 'visit_detail' ? 'Detalhes da Visita' 
                : modal.type === 'family_detail' ? 'Detalhes do Núcleo Familiar'
                : modal.type === 'person_detail' ? 'Ficha do Assistido'
                : modal.type.startsWith('form') ? 'Formulário de Cadastro'
                : 'Ação'}
              </h2>
              <button className="close-btn" onClick={() => setModal(null)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ color: '#887a6a', marginBottom: '20px' }}>[ORIGEM: BACKEND] Demonstração de modal conectado aos endpoints oficiais.</p>
              
              {modal.type === 'visit_detail' && (
                <div className="detail-view">
                  <div className="detail-row"><span>Família/Pessoa</span><strong>{modal.data.name}</strong></div>
                  <div className="detail-row"><span>Tipo de Visita</span><strong>{modal.data.type}</strong></div>
                  <div className="detail-row"><span>Endereço</span><strong>{modal.data.address} - {modal.data.neighborhood}</strong></div>
                  <div className="detail-row"><span>Status</span><strong>{modal.data.status}</strong></div>
                  {modal.data.report && (
                    <div className="detail-row full-width">
                      <span>Relato do Atendimento</span>
                      <p style={{ background: '#f9f6f0', padding: '12px', borderRadius: '4px', marginTop: '8px' }}>{modal.data.report}</p>
                    </div>
                  )}
                  
                  <div className="modal-actions">
                    {modal.data.status === 'Agendada' && <button className="primary">Assumir Visita</button>}
                    {modal.data.status === 'Em andamento' && <button className="primary">Concluir Atendimento</button>}
                    {modal.data.status !== 'Concluída' && <button style={{ color: '#c45132' }}>Recusar (Justificar)</button>}
                  </div>
                </div>
              )}

              {modal.type === 'person_detail' && (
                <div className="detail-view">
                  <div className="detail-row"><span>Nome Completo</span><strong>{modal.data.name}</strong></div>
                  <div className="detail-row"><span>CPF</span><strong>{modal.data.cpf}</strong></div>
                  <div className="detail-row"><span>NIS</span><strong>{modal.data.nis}</strong></div>
                  <div className="detail-row"><span>Telefone</span><strong>{modal.data.phone}</strong></div>
                  <div className="detail-row"><span>Renda Mensal</span><strong>{modal.data.income}</strong></div>
                  <div className="detail-row"><span>Endereço</span><strong>{modal.data.address}, {modal.data.houseNumber} - {modal.data.neighborhoodName}</strong></div>
                  <div className="detail-row"><span>Núcleo Familiar</span><strong>{modal.data.familyCode}</strong></div>
                  <div className="detail-row"><span>Total de Visitas Recebidas</span><strong>{modal.data.quantityVisits}</strong></div>
                </div>
              )}

              {modal.type === 'family_detail' && (
                <div className="detail-view">
                  <div className="detail-row"><span>Referência Familiar</span><strong>{modal.data.referenceName}</strong></div>
                  <div className="detail-row"><span>Bairro</span><strong>{modal.data.neighborhood}</strong></div>
                  <div className="detail-row full-width">
                    <span>Integrantes Vinculados</span>
                    <table className="data-table" style={{ marginTop: '8px' }}>
                      <thead><tr><th>Nome</th><th>Grau de Parentesco</th></tr></thead>
                      <tbody>
                        {modal.data.members.map((m: any) => (
                          <tr key={m.name}><td>{m.name}</td><td>{m.relationship}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {modal.type.startsWith('form') && (
                <form className="domus-form" onSubmit={e => { e.preventDefault(); setModal(null); }}>
                  <label>Nome ou Título<input required /></label>
                  <label>Observações / Dados adicionais<input /></label>
                  <div className="modal-actions">
                    <button type="button" onClick={() => setModal(null)}>Cancelar</button>
                    <button type="submit" className="primary">Salvar Cadastro</button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
