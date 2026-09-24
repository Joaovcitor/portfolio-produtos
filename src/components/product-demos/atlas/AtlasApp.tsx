import { useState, useMemo } from 'react';
import { Menu, Sun, Moon, Plus, ShieldCheck, Search, ChevronRight } from 'lucide-react';
import {
  atlasPeople,
  atlasProfessionals,
  atlasLocations,
  atlasFunctions,
  atlasBonds,
  atlasUsers,
  atlasSystems
} from '../../../mocks/atlas';
import './atlas.css';

const Mark = () => (
  <div className="mark">
    ▲ <b>ATLAS</b>
    <small>Gestão que sustenta</small>
  </div>
);

export function AtlasApp({ view = 0 }: { view?: number | 'explore' }) {
  const [dark, setDark] = useState(false);
  const [internalPage, setInternalPage] = useState('inicio');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<any>(null);

  const page = view === 'explore' 
    ? internalPage 
    : view === 0 ? 'pessoas' 
    : view === 1 ? 'profissionais' 
    : view === 2 ? 'sistemas' 
    : 'inicio';

  // Navigation Helper
  const nav = (target: string) => {
    if (view === 'explore') setInternalPage(target);
  };

  // State filtering based on current page
  const data = useMemo(() => {
    const q = query.toLowerCase();
    switch (page) {
      case 'pessoas': return atlasPeople.filter(p => p.name.toLowerCase().includes(q) || p.cpf.includes(q));
      case 'profissionais': return atlasProfessionals.filter(p => p.nameEmploy.toLowerCase().includes(q));
      case 'locais': return atlasLocations.filter(p => p.name.toLowerCase().includes(q));
      case 'funcoes': return atlasFunctions.filter(p => p.name.toLowerCase().includes(q));
      case 'vinculos': return atlasBonds.filter(p => p.name.toLowerCase().includes(q));
      case 'usuarios': return atlasUsers.filter(p => p.completeName.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
      case 'sistemas': return atlasSystems.filter(p => p.name.toLowerCase().includes(q));
      default: return [];
    }
  }, [page, query]);

  const renderTableContent = () => {
    if (data.length === 0) {
      return (
        <div className="empty">
          <h2>Nada por aqui ainda.</h2>
          <p>Nenhum resultado encontrado nesta seleção.</p>
        </div>
      );
    }

    return (
      <>
        {data.map((item: any, idx: number) => {
          if (page === 'pessoas') {
            return (
              <article className="row" key={item.id}>
                <div><small>Nome</small><b>{item.name}</b></div>
                <div><small>CPF</small><b>{item.cpf}</b></div>
                <div><small>Situação</small><b>{item.isActive ? 'Ativo' : 'Inativo'}</b></div>
                <button onClick={() => setEditing(item)}>Editar</button>
              </article>
            );
          }
          if (page === 'profissionais') {
            return (
              <article className="row" key={item.id}>
                <div><small>Pessoa</small><b>{item.nameEmploy}</b></div>
                <div><small>Função</small><b>{item.nameFunctionJob}</b></div>
                <div><small>Local</small><b>{item.workplaceName}</b></div>
                <div><small>Vínculo</small><b>{item.bond}</b></div>
                <button onClick={() => setEditing(item)}>Editar</button>
              </article>
            );
          }
          if (page === 'locais') {
            return (
              <article className="row" key={item.id}>
                <div><small>Nome</small><b>{item.name}</b></div>
                <div><small>Criado em</small><b>{item.createdAt}</b></div>
                <button onClick={() => setEditing(item)}>Editar</button>
              </article>
            );
          }
          if (page === 'funcoes') {
            return (
              <article className="row" key={item.id}>
                <div><small>Nome</small><b>{item.name}</b></div>
                <div><small>Descrição</small><b>{item.description}</b></div>
                <button onClick={() => setEditing(item)}>Editar</button>
              </article>
            );
          }
          if (page === 'vinculos') {
            return (
              <article className="row" key={item.id}>
                <div><small>Nome do vínculo</small><b>{item.name}</b></div>
                <button onClick={() => setEditing(item)}>Editar</button>
              </article>
            );
          }
          if (page === 'usuarios') {
            return (
              <article className="row" key={item.id}>
                <div><small>Nome</small><b>{item.completeName}</b></div>
                <div><small>E-mail</small><b>{item.id}</b></div>
                <div><small>Perfis</small><b>{item.roles}</b></div>
              </article>
            );
          }
          if (page === 'sistemas') {
            return (
              <article className="row" key={item.id}>
                <div><small>Nome</small><b>{item.name}</b></div>
                <div><small>Código</small><b>{item.code}</b></div>
                <div><small>Situação</small><b>{item.isActive ? 'Ativo' : 'Inativo'}</b></div>
                <button onClick={() => setEditing(item)}>Editar</button>
              </article>
            );
          }
          return null;
        })}
        <footer>
          <button disabled>Anterior</button>
          <span>Página 1 de 1</span>
          <button disabled>Próxima</button>
        </footer>
      </>
    );
  };

  const getPageTitle = () => {
    switch (page) {
      case 'pessoas': return 'Pessoas';
      case 'profissionais': return 'Atuação profissional';
      case 'locais': return 'Locais de trabalho';
      case 'funcoes': return 'Funções';
      case 'vinculos': return 'Vínculos';
      case 'usuarios': return 'Usuários';
      case 'sistemas': return 'Sistemas';
      case 'seguranca': return 'Segurança';
      case 'inicio': return 'Visão geral';
      default: return '';
    }
  };

  const getPageDescription = () => {
    switch (page) {
      case 'pessoas': return 'Informações organizadas para apoiar sua operação.';
      case 'profissionais': return 'Mapeie onde e como as pessoas atuam na organização.';
      case 'locais': return 'Espaços físicos onde a operação acontece.';
      case 'funcoes': return 'Cargos e papéis dentro da hierarquia.';
      case 'vinculos': return 'Tipos de relação trabalhista.';
      case 'usuarios': return 'Acessos ao Atlas e permissões.';
      case 'sistemas': return 'Controle as permissões de acesso ao ecossistema.';
      default: return '';
    }
  };

  return (
    <div className="atlasApp" data-theme={dark ? 'dark' : 'light'}>
      <div className="shell">
        <aside>
          <Mark />
          <button className={page === 'inicio' ? 'active' : ''} onClick={() => nav('inicio')}>Visão geral</button>
          <button className={page === 'pessoas' ? 'active' : ''} onClick={() => nav('pessoas')}>Pessoas</button>
          <button className={page === 'profissionais' ? 'active' : ''} onClick={() => nav('profissionais')}>Atuação profissional</button>
          <button className={page === 'locais' ? 'active' : ''} onClick={() => nav('locais')}>Locais de trabalho</button>
          <button className={page === 'funcoes' ? 'active' : ''} onClick={() => nav('funcoes')}>Funções</button>
          <button className={page === 'vinculos' ? 'active' : ''} onClick={() => nav('vinculos')}>Vínculos</button>
          
          <div style={{ marginTop: '20px', borderTop: '1px solid #e0d5c1', paddingTop: '10px' }} />
          <button className={page === 'usuarios' ? 'active' : ''} onClick={() => nav('usuarios')}>Usuários</button>
          <button className={page === 'sistemas' ? 'active' : ''} onClick={() => nav('sistemas')}>Sistemas externos</button>
          <button className={page === 'seguranca' ? 'active' : ''} onClick={() => nav('seguranca')}>Segurança</button>
        </aside>
        
        <main>
          <nav>
            <button><Menu /></button>
            <span>ATLAS / {getPageTitle()}</span>
            <button onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</button>
          </nav>

          <section className="page">
            {page === 'inicio' && (
              <>
                <header>
                  <div>
                    <span>PAINEL DE CONTROLE</span>
                    <h1>Gestão em perspectiva.</h1>
                    <p>Uma visão objetiva do que sustenta sua operação.</p>
                  </div>
                </header>
                <div className="hero" style={{ padding: '40px', background: 'var(--brand-surface)', borderRadius: '8px', border: '1px solid var(--brand-border)', textAlign: 'center' }}>
                  <ShieldCheck size={48} color="#722f37" style={{ marginBottom: '16px' }} />
                  <h2 style={{ fontSize: '24px', color: 'var(--brand-dark)', marginBottom: '8px' }}>Construa uma base sólida.</h2>
                  <p style={{ color: 'var(--brand-text)' }}>Cadastre pessoas, conecte funções, vínculos e locais de trabalho.</p>
                </div>
              </>
            )}

            {page === 'seguranca' && (
              <>
                <header>
                  <div>
                    <span>MINHA CONTA</span>
                    <h1>Segurança</h1>
                  </div>
                </header>
                <div className="hero" style={{ padding: '40px', background: 'var(--brand-surface)', borderRadius: '8px', border: '1px solid var(--brand-border)', textAlign: 'center' }}>
                  <ShieldCheck size={48} color="#722f37" style={{ marginBottom: '16px' }} />
                  <h2 style={{ fontSize: '24px', color: 'var(--brand-dark)', marginBottom: '8px' }}>Autenticação em Duas Etapas</h2>
                  <p style={{ color: 'var(--brand-text)', marginBottom: '24px' }}>Aumente a segurança da sua conta exigindo um código no acesso.</p>
                  <button className="primary" style={{ margin: '0 auto' }}>Habilitar 2FA</button>
                </div>
              </>
            )}

            {!['inicio', 'seguranca'].includes(page) && (
              <>
                <header>
                  <div>
                    <span>GESTÃO{['sistemas', 'usuarios'].includes(page) ? ' DE ACESSOS' : ''}</span>
                    <h1>{getPageTitle()}</h1>
                    <p>{getPageDescription()}</p>
                  </div>
                  {page !== 'usuarios' && (
                    <button className="primary" onClick={() => setEditing({})}>
                      <Plus size={16} /> Novo cadastro
                    </button>
                  )}
                </header>

                <div className="card">
                  <div className="bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{data.length} registros</span>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid #cdbda7', padding: '6px 12px', borderRadius: '4px' }}>
                      <Search size={14} color="#887a6a" />
                      <input 
                        placeholder="Buscar..." 
                        value={query} 
                        onChange={e => setQuery(e.target.value)}
                        style={{ border: 0, background: 'transparent', outline: 'none', width: '180px', color: 'inherit' }}
                      />
                    </label>
                  </div>
                  {renderTableContent()}
                </div>
              </>
            )}

            {editing && (
              <div className="modal">
                <form onSubmit={e => { e.preventDefault(); setEditing(null); }}>
                  <h2>{editing.id ? 'Atualizar' : 'Novo'} Registro</h2>
                  <p style={{ marginBottom: '20px', color: '#887a6a' }}>[ORIGEM: BACKEND] Modal interativo conectado ao mock.</p>
                  
                  {page === 'pessoas' && (
                    <>
                      <label>Nome completo<input required value={editing.name || ''} onChange={e => setEditing({...editing, name: e.target.value})} /></label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <label>CPF<input required value={editing.cpf || ''} onChange={e => setEditing({...editing, cpf: e.target.value})} /></label>
                        <label>Data Nascimento<input required value={editing.dateOfBirth || ''} placeholder="DD/MM/AAAA" onChange={e => setEditing({...editing, dateOfBirth: e.target.value})} /></label>
                      </div>
                      <label>Endereço<input required value={editing.address || ''} onChange={e => setEditing({...editing, address: e.target.value})} /></label>
                    </>
                  )}

                  {page === 'profissionais' && (
                    <>
                      <label>Pessoa<input required value={editing.nameEmploy || ''} onChange={e => setEditing({...editing, nameEmploy: e.target.value})} /></label>
                      <label>Função<input required value={editing.nameFunctionJob || ''} onChange={e => setEditing({...editing, nameFunctionJob: e.target.value})} /></label>
                      <label>Local<input required value={editing.workplaceName || ''} onChange={e => setEditing({...editing, workplaceName: e.target.value})} /></label>
                      <label>Vínculo<input required value={editing.bond || ''} onChange={e => setEditing({...editing, bond: e.target.value})} /></label>
                    </>
                  )}

                  {['locais', 'funcoes', 'vinculos', 'sistemas'].includes(page) && (
                    <>
                      <label>Nome<input required value={editing.name || ''} onChange={e => setEditing({...editing, name: e.target.value})} /></label>
                      {editing.description !== undefined && <label>Descrição<input value={editing.description || ''} onChange={e => setEditing({...editing, description: e.target.value})} /></label>}
                      {editing.code !== undefined && <label>Código<input value={editing.code || ''} onChange={e => setEditing({...editing, code: e.target.value})} /></label>}
                    </>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                    <button type="button" onClick={() => setEditing(null)} style={{ background: 'transparent', border: 0, color: '#722f37', padding: '12px 20px', cursor: 'pointer' }}>Cancelar</button>
                    <button className="primary" style={{ cursor: 'pointer' }}>Salvar</button>
                  </div>
                </form>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
