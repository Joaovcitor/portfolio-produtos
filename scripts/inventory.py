from pathlib import Path
import re,json,hashlib
base=Path(__file__).resolve().parents[1]; projects=base.parent
roots={'Atlas':projects/'SIMGEP','Domus':Path('/home/joao/RiderProjects/Domus'),'VemKa':projects/'VemKa','Ordian':projects/'OrdianApi'}
fronts={k:projects/(k.lower()+'-front-end') for k in roots}
rows={
'Atlas':[
('AntiforgeryController','Proteção das operações da sessão','IMPLEMENTADO','Mecanismo de infraestrutura consumido em services/api.ts; sem tela própria.','acessos'),
('AuthController','Entrada com confirmação de código, cadastro de administradores e cadastradores, troca de senha e saída','PARCIAL','Login e confirmação presentes; cadastro de contas e troca de senha sem interface completa.','acessos'),
('AuthorizationController','Acesso centralizado a sistemas autorizados','PARCIAL','Valida usuário, organização, sistema ativo e perfis; retorno ao fluxo de autorização não é consumido pelo login atual. Exige configuração do sistema consumidor.','acessos'),
('TwoFactorController','Verificação em duas etapas e recuperação de acesso','PARCIAL','Serviço e operações presentes; frontend apenas apresenta texto de segurança, sem configuração navegável. Desativação tem observação de desenvolvimento no controller.','evolucao'),
('PersonalFormController','Cadastro pessoal, identificação, contato, formação e profissão','IMPLEMENTADO','App.tsx List + resources.pessoas. Formulário visual expõe subconjunto dos campos do modelo.','cadastros'),
('ProfessionalFormController','Atuação profissional, função, vínculo, carga horária e local de trabalho','PARCIAL','Listagem presente; formulário usa identificadores manuais e URL de listagem como base de criação/edição, divergindo das rotas.','cadastros'),
('WorkplaceController','Organização dos locais de trabalho','IMPLEMENTADO','resources.locais; serviço impede nomes duplicados por organização.','organizacao'),
('JobFunctionController','Cadastro das funções profissionais','IMPLEMENTADO','resources.funcoes; criação e edição restritas ao cadastrador.','organizacao'),
('EmploymentRelationshipController','Tipos de vínculo profissional','IMPLEMENTADO','resources.vinculos; relação reutilizada na ficha profissional.','organizacao'),
('UserController','Consulta das contas administradas','IMPLEMENTADO','resources.usuarios; apenas consulta, não prometer edição geral.','acessos'),
('ExternalSystemsController','Catálogo de sistemas e sua disponibilidade','IMPLEMENTADO','resources.sistemas; criação, edição, ativação e desativação na API. Cadastro não implica integração automática.','acessos'),
('ExternalSystemRolesController','Perfis específicos por sistema','PARCIAL','Serviço valida nome/código e sistema; ausência de tela específica.','evolucao'),
('PermittedSystemsController','Concessão e suspensão de acesso por pessoa e sistema','PARCIAL','Vínculo por usuário ou e-mail da ficha, com verificação de organização e perfis; sem tela específica.','evolucao')],
'Domus':[
('AuthController','Entrada, saída e cadastro de contas por perfil','IMPLEMENTADO','Login, AuthContext e People.Users; administrador cadastra equipe; superadministrador cria administradores.','equipe'),
('UserController','Consulta de usuários e visitadores da organização','IMPLEMENTADO','People.Users e seleção de visitador em Visits.','equipe'),
('ProfessionalController','Profissionais, unidades, tipos de visita e áreas de atuação','IMPLEMENTADO','Professionals.tsx; valida usuário e vínculos de território/unidade.','equipe'),
('CareUnitController','Unidades de atendimento','IMPLEMENTADO','Resources: unidades, detalhes e contagens.','territorio'),
('LocationController','Localizações e consulta territorial','IMPLEMENTADO','Resources: localizações; quantidades de visitas e assistidos.','territorio'),
('NeighborhoodController','Bairros vinculados às unidades','IMPLEMENTADO','Resources: bairros; serviço valida unidade.','territorio'),
('VisitTypeController','Tipos de visita configuráveis','IMPLEMENTADO','Resources: tipos-visita e formulário de agenda.','visitas'),
('VisitedUserController','Cadastro e consulta de assistidos e vínculos familiares','IMPLEMENTADO','People.Assisted e Details.AssistedDetail; criação valida duplicidade e território. Edição existe na API, sem fluxo completo de edição no frontend.','pessoas'),
('FamilyController','Núcleos familiares e integrantes','IMPLEMENTADO','People.Families e Details.FamilyDetail; código familiar único por organização.','pessoas'),
('VisitController','Agendar, assumir, iniciar, concluir com relato, recusar com motivo e consultar visitas','IMPLEMENTADO','Visits.tsx; localização solicitada ao iniciar/concluir. Atualização/reagendamento presente na API. Não há evidência de otimização de rotas.','visitas'),
('VisitAttachmentController','Arquivos vinculados às visitas','PARCIAL','Upload/listagem presentes; download anônimo conflita com exigência de contexto e link relativo diverge da base configurada.','evolucao'),
('AlertController','Avisos com título, mensagem e situação','PLANEJADO/INFERIDO','Controller e serviço vazios; entidade Alert dá evidência da intenção.','evolucao'),
('AuditLogController','Histórico administrativo','PLANEJADO/INFERIDO','Controller e serviço vazios; entidade AuditLog.','evolucao'),
('MotoristController','Motoristas associados às visitas','PLANEJADO/INFERIDO','Entidade vinculada a Visit; controller e serviço vazios; frontend envia vínculo nulo.','evolucao'),
('ReportController','Relatórios próprios','PLANEJADO/INFERIDO','Controller/serviço vazios; entidade com título e descrição. Não confundir com relato de conclusão da visita.','evolucao'),
('AttachmentReport','Arquivos para relatórios','PLANEJADO/INFERIDO','Classe em Controllers/AttachmentReport.cs herda ControllerBase, apesar de não ter sufixo Controller. Estrutura vazia.','evolucao')],
'VemKa':[
('AuthController','Acesso por perfil de administração, atendente, totem e painel','IMPLEMENTADO','permissions.ts e login; contas administrativas e de operação.','operacao'),
('QueueTicketController','Emissão, espera prioritária, chamada, início, conclusão, cancelamento, realocação e histórico','PARCIAL','Fluxo principal em QueueTicketService e Operation. UpdateAsync lança NotImplementedException. KioskPage reseta ao sucesso sem exibir TicketVisual. Conexões de Operation/Display não chamam joinUnit. Visão geral administrativa chama rota restrita a atendentes.','fila'),
('ServiceCounterController','Guichês e profissionais responsáveis','IMPLEMENTADO','Management counters; associação com unidade.','estrutura'),
('ServiceUnitController','Unidades de atendimento','IMPLEMENTADO','Management units; endereço, contato e disponibilidade.','estrutura'),
('ServiceTypeController','Serviços, prefixos e disponibilidade','IMPLEMENTADO','Management services; preferência ordenada por IsPriority na fila, não prometer algoritmo configurável de alternância.','estrutura'),
('UserController','Equipe, alocação em unidades/guichês/serviços e ativação de acesso','IMPLEMENTADO','Team; contas por organização e consulta global restrita.','equipe')],
'Ordian':[
('AuthController','Entrada, recuperação de senha e cadastro por perfil','IMPLEMENTADO','LoginPage, AccountPages e UserManagementPage.','gestao'),
('ExternalAuthController','Entrada pela identidade do Atlas','PARCIAL','Código de provedor externo com conta preexistente e sincronização de papéis; depende da configuração dos dois ambientes e do retorno do Atlas.','evolucao'),
('UserController','Diretório, perfis, ativação e vínculos departamentais','IMPLEMENTADO','DirectoryPage e RolePages; operações administrativas separadas por política.','gestao'),
('SuperAdminController','Administração de ambientes e responsáveis','PARCIAL','SuperAdminPage; rota admins/{adminId}/users recebe parâmetro userId divergente.','evolucao'),
('DepartmentController','Departamentos responsáveis pelas demandas','IMPLEMENTADO','CatalogsPage; consulta, criação e edição.','gestao'),
('UserDepartmentController','Vínculos entre pessoas e departamentos','PARCIAL','MembershipsPage; exclusão usa parâmetros FromQuery embora rota contenha segmentos.','evolucao'),
('TicketController','Registro, classificação, acompanhamento, prioridade e atribuição de demandas','IMPLEMENTADO','NewDemandPage, TicketListPage, DemandDetailPage e EditDemandPage. Finalizados/cancelados bloqueiam mudança de situação. Duas rotas POST concorrentes para agents exigem validação.','demandas'),
('TicketCategoryController','Categorias de demandas por departamento','IMPLEMENTADO','CatalogsPage e NewDemandPage; categoria precisa pertencer ao departamento.','demandas'),
('TicketAgentController','Equipe de atendimento e responsável principal','PARCIAL','DemandDetailPage; serviço prevê principal único, mas POST colide com TicketController.','evolucao'),
('TicketMessageController','Conversa e arquivos no contexto da demanda','IMPLEMENTADO','DemandDetailPage; envio/listagem/edição. DeleteAsync não implementado e não exposto. Não prometer remoção nem confidencialidade de notas internas sem validação adicional.','colaboracao'),
('TicketAttachmentController','Gestão independente de anexos','PLANEJADO/INFERIDO','Controller/serviço vazios. Anexos na criação e mensagens existem via TicketService/TicketMessageService e não dependem deste controller.','evolucao'),
('CheckListController','Listas pessoais e vinculadas às demandas','IMPLEMENTADO','ChecklistsPage e detalhe da demanda; autoria verificada na alteração.','colaboracao'),
('CheckListItemController','Etapas, ordenação e conclusão de tarefas','IMPLEMENTADO','ChecklistsPage; valida lista e proprietário.','colaboracao'),
('DocsController','Central de documentos institucionais','IMPLEMENTADO','DocumentsPage; consulta, envio e exclusão por gestão.','conhecimento'),
('KnowledgePostController','Artigos, tutoriais, perguntas e processos','IMPLEMENTADO','KnowledgePage; rascunho, publicado e arquivado definidos no domínio.','conhecimento'),
('KnowledgeCategoryController','Categorias de conhecimento','IMPLEMENTADO','KnowledgePage/CatalogsPage; criação e edição administrativas.','conhecimento'),
('KnowledgeCommentController','Comentários nas publicações','IMPLEMENTADO','KnowledgePage; serviço verifica publicação e aceitação de comentários.','conhecimento'),
('SlaCalendarController','Expediente e feriados para cálculo de prazo','IMPLEMENTADO','SlaPage CalendarPanel; calendário padrão e intervalos de expediente.','prazos'),
('SlaPolicyController','Prazos de resposta e resolução','IMPLEMENTADO','SlaPage PolicyPanel; departamento, categoria e prioridade, aplicação à demanda e marcação de resposta/resolução.','prazos'),
('TicketReportsController','Panorama de demandas, prazos, distribuição, evolução e tempo em aberto','PARCIAL','ReportsPage/DashboardPage; service passa UserId a repository que filtra OwnerId. Escopo e datas de encerramento exigem validação, não afirmar indicadores operacionais comprovados.','evolucao'),
('AuditLogController','Histórico de alterações das demandas','IMPLEMENTADO','AuditPage e histórico por demanda; acesso geral administrativo.','gestao')]
}
manifest={}; coverage=['# Cobertura funcional — documento interno\n','Análise estática das fontes disponíveis. IMPLEMENTADO indica implementação identificada no código, não homologação operacional. Nenhuma API/banco original foi executado. Telas do catálogo são representações locais com dados fictícios.\n']
for product,root in roots.items():
 controllers=[]
 for path in sorted(root.rglob('*.cs')):
  if any(x in path.parts for x in ['obj','bin','.git']): continue
  t=path.read_text(errors='replace')
  if re.search(r'class\s+\w+\s*:\s*Controller(?:Base)?\b',t):
   name=re.search(r'class\s+(\w+)\s*:\s*Controller',t)[1]
   controllers.append({'name':name,'file':str(path.relative_to(root)),'actions':re.findall(r'\[Http\w+[^\]]*\]',t),'sha256':hashlib.sha256(t.encode()).hexdigest()})
 known={r[0] for r in rows[product]}; actual={c['name'] for c in controllers}; assert known==actual,(product,known^actual)
 manifest[product]=controllers
 coverage += [f'\n## {product} — {len(controllers)}/{len(controllers)} controllers\n']
 for name,feature,status,note,section in rows[product]:
  c=next(c for c in controllers if c['name']==name)
  coverage += [f'### {name}\n- Fonte: `{c["file"]}`\n- Funcionalidade: {feature}.\n- Status observado: **{status}**.\n- Cruzamento e limites: {note}\n- Benefício: '+{'Atlas':'manter cadastros e responsabilidades de acesso organizados.','Domus':'dar contexto e continuidade ao acompanhamento domiciliar.','VemKa':'tornar as etapas do atendimento visíveis para a operação.','Ordian':'preservar o contexto e a responsabilidade por cada demanda.'}[product]+f'\n- Representação: `/{product.lower()}#{section}`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo {product}, páginas de capacidades e experiência.\n- Entradas encontradas: {len(c["actions"])}.\n']
 files=[]
 for origin in [root,fronts[product]]:
  for f in sorted(origin.rglob('*')):
   if f.is_file() and f.suffix in ['.cs','.tsx','.ts','.css','.svg'] and not any(x in f.parts for x in ['node_modules','obj','bin','.git','Migrations','dist']):
    content=f.read_bytes();files.append({'origin':'backend' if origin==root else 'frontend','file':str(f.relative_to(origin)),'sha256':hashlib.sha256(content).hexdigest()})
 (base/'docs'/f'INVENTARIO-{product.upper()}.json').write_text(json.dumps(files,ensure_ascii=False,indent=2))
 (base/'docs'/f'ANALISE-{product.upper()}.md').write_text(f'# {product} — análise funcional interna\n\n'+f'Backend: `{root}`. Frontend: `{fronts[product]}`. Correspondência confirmada por namespaces, projetos e chamadas do frontend.\n\n'+ '\n\n'.join(f'## {feature}\n\n**{status}** — {note}\n\nOrigem: `{name}`. Representação comercial: `/{product.lower()}#{section}`.' for name,feature,status,note,section in rows[product])+ '\n\n## Inventário e limites\n\nO arquivo INVENTARIO-'+product.upper()+'.json registra a árvore de componentes, estilos, entidades, DTOs, serviços, repositórios e controladores com hashes de conteúdo. Configurações sensíveis, banco, dados de seed e credenciais não são copiados. O relatório COBERTURA.md registra todas as classes de controller, inclusive nomes fora do padrão.\n')
coverage+=['\n## Resultado\n\n56/56 classes de controllers mapeadas (13 Atlas, 16 Domus, 6 VemKa, 21 Ordian). Nenhum controller ficou sem interpretação funcional; estruturas vazias são inferências explicitamente marcadas.\n']
(base/'docs/COBERTURA.md').write_text('\n'.join(coverage));(base/'docs/controllers.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print({k:len(v) for k,v in manifest.items()})
