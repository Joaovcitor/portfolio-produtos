# Cobertura funcional — documento interno

Análise estática das fontes disponíveis. IMPLEMENTADO indica implementação identificada no código, não homologação operacional. Nenhuma API/banco original foi executado. Telas do catálogo são representações locais com dados fictícios.


## Atlas — 13/13 controllers

### AntiforgeryController
- Fonte: `SIMGEP.API/Controllers/AntiforgeryController.cs`
- Funcionalidade: Proteção das operações da sessão.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: Mecanismo de infraestrutura consumido em services/api.ts; sem tela própria.
- Benefício: manter cadastros e responsabilidades de acesso organizados.
- Representação: `/atlas#acessos`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Atlas, páginas de capacidades e experiência.
- Entradas encontradas: 1.

### AuthController
- Fonte: `SIMGEP.API/Controllers/AuthController.cs`
- Funcionalidade: Entrada com confirmação de código, cadastro de administradores e cadastradores, troca de senha e saída.
- Status observado: **PARCIAL**.
- Cruzamento e limites: Login e confirmação presentes; cadastro de contas e troca de senha sem interface completa.
- Benefício: manter cadastros e responsabilidades de acesso organizados.
- Representação: `/atlas#acessos`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Atlas, páginas de capacidades e experiência.
- Entradas encontradas: 8.

### AuthorizationController
- Fonte: `SIMGEP.API/Controllers/AuthorizationController.cs`
- Funcionalidade: Acesso centralizado a sistemas autorizados.
- Status observado: **PARCIAL**.
- Cruzamento e limites: Valida usuário, organização, sistema ativo e perfis; retorno ao fluxo de autorização não é consumido pelo login atual. Exige configuração do sistema consumidor.
- Benefício: manter cadastros e responsabilidades de acesso organizados.
- Representação: `/atlas#acessos`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Atlas, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### TwoFactorController
- Fonte: `SIMGEP.API/Controllers/TwoFactorController.cs`
- Funcionalidade: Verificação em duas etapas e recuperação de acesso.
- Status observado: **PARCIAL**.
- Cruzamento e limites: Serviço e operações presentes; frontend apenas apresenta texto de segurança, sem configuração navegável. Desativação tem observação de desenvolvimento no controller.
- Benefício: manter cadastros e responsabilidades de acesso organizados.
- Representação: `/atlas#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Atlas, páginas de capacidades e experiência.
- Entradas encontradas: 5.

### PersonalFormController
- Fonte: `SIMGEP.API/Controllers/PersonalFormController.cs`
- Funcionalidade: Cadastro pessoal, identificação, contato, formação e profissão.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: App.tsx List + resources.pessoas. Formulário visual expõe subconjunto dos campos do modelo.
- Benefício: manter cadastros e responsabilidades de acesso organizados.
- Representação: `/atlas#cadastros`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Atlas, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### ProfessionalFormController
- Fonte: `SIMGEP.API/Controllers/ProfessionalFormController.cs`
- Funcionalidade: Atuação profissional, função, vínculo, carga horária e local de trabalho.
- Status observado: **PARCIAL**.
- Cruzamento e limites: Listagem presente; formulário usa identificadores manuais e URL de listagem como base de criação/edição, divergindo das rotas.
- Benefício: manter cadastros e responsabilidades de acesso organizados.
- Representação: `/atlas#cadastros`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Atlas, páginas de capacidades e experiência.
- Entradas encontradas: 5.

### WorkplaceController
- Fonte: `SIMGEP.API/Controllers/WorkplaceController.cs`
- Funcionalidade: Organização dos locais de trabalho.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: resources.locais; serviço impede nomes duplicados por organização.
- Benefício: manter cadastros e responsabilidades de acesso organizados.
- Representação: `/atlas#organizacao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Atlas, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### JobFunctionController
- Fonte: `SIMGEP.API/Controllers/JobFunctionController.cs`
- Funcionalidade: Cadastro das funções profissionais.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: resources.funcoes; criação e edição restritas ao cadastrador.
- Benefício: manter cadastros e responsabilidades de acesso organizados.
- Representação: `/atlas#organizacao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Atlas, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### EmploymentRelationshipController
- Fonte: `SIMGEP.API/Controllers/EmploymentRelationshipController.cs`
- Funcionalidade: Tipos de vínculo profissional.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: resources.vinculos; relação reutilizada na ficha profissional.
- Benefício: manter cadastros e responsabilidades de acesso organizados.
- Representação: `/atlas#organizacao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Atlas, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### UserController
- Fonte: `SIMGEP.API/Controllers/UserController.cs`
- Funcionalidade: Consulta das contas administradas.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: resources.usuarios; apenas consulta, não prometer edição geral.
- Benefício: manter cadastros e responsabilidades de acesso organizados.
- Representação: `/atlas#acessos`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Atlas, páginas de capacidades e experiência.
- Entradas encontradas: 1.

### ExternalSystemsController
- Fonte: `SIMGEP.API/Controllers/ExternalSystemsController.cs`
- Funcionalidade: Catálogo de sistemas e sua disponibilidade.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: resources.sistemas; criação, edição, ativação e desativação na API. Cadastro não implica integração automática.
- Benefício: manter cadastros e responsabilidades de acesso organizados.
- Representação: `/atlas#acessos`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Atlas, páginas de capacidades e experiência.
- Entradas encontradas: 7.

### ExternalSystemRolesController
- Fonte: `SIMGEP.API/Controllers/ExternalSystemRolesController.cs`
- Funcionalidade: Perfis específicos por sistema.
- Status observado: **PARCIAL**.
- Cruzamento e limites: Serviço valida nome/código e sistema; ausência de tela específica.
- Benefício: manter cadastros e responsabilidades de acesso organizados.
- Representação: `/atlas#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Atlas, páginas de capacidades e experiência.
- Entradas encontradas: 6.

### PermittedSystemsController
- Fonte: `SIMGEP.API/Controllers/PermittedSystemsController.cs`
- Funcionalidade: Concessão e suspensão de acesso por pessoa e sistema.
- Status observado: **PARCIAL**.
- Cruzamento e limites: Vínculo por usuário ou e-mail da ficha, com verificação de organização e perfis; sem tela específica.
- Benefício: manter cadastros e responsabilidades de acesso organizados.
- Representação: `/atlas#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Atlas, páginas de capacidades e experiência.
- Entradas encontradas: 8.


## Domus — 16/16 controllers

### AuthController
- Fonte: `Domus.API/Controllers/AuthController.cs`
- Funcionalidade: Entrada, saída e cadastro de contas por perfil.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: Login, AuthContext e People.Users; administrador cadastra equipe; superadministrador cria administradores.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#equipe`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 5.

### UserController
- Fonte: `Domus.API/Controllers/UserController.cs`
- Funcionalidade: Consulta de usuários e visitadores da organização.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: People.Users e seleção de visitador em Visits.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#equipe`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 3.

### ProfessionalController
- Fonte: `Domus.API/Controllers/ProfessionalController.cs`
- Funcionalidade: Profissionais, unidades, tipos de visita e áreas de atuação.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: Professionals.tsx; valida usuário e vínculos de território/unidade.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#equipe`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 3.

### CareUnitController
- Fonte: `Domus.API/Controllers/CareUnitController.cs`
- Funcionalidade: Unidades de atendimento.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: Resources: unidades, detalhes e contagens.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#territorio`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### LocationController
- Fonte: `Domus.API/Controllers/LocationController.cs`
- Funcionalidade: Localizações e consulta territorial.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: Resources: localizações; quantidades de visitas e assistidos.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#territorio`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### NeighborhoodController
- Fonte: `Domus.API/Controllers/NeighborhoodController.cs`
- Funcionalidade: Bairros vinculados às unidades.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: Resources: bairros; serviço valida unidade.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#territorio`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### VisitTypeController
- Fonte: `Domus.API/Controllers/VisitTypeController.cs`
- Funcionalidade: Tipos de visita configuráveis.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: Resources: tipos-visita e formulário de agenda.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#visitas`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### VisitedUserController
- Fonte: `Domus.API/Controllers/VisitedUserController.cs`
- Funcionalidade: Cadastro e consulta de assistidos e vínculos familiares.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: People.Assisted e Details.AssistedDetail; criação valida duplicidade e território. Edição existe na API, sem fluxo completo de edição no frontend.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#pessoas`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 6.

### FamilyController
- Fonte: `Domus.API/Controllers/FamilyController.cs`
- Funcionalidade: Núcleos familiares e integrantes.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: People.Families e Details.FamilyDetail; código familiar único por organização.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#pessoas`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### VisitController
- Fonte: `Domus.API/Controllers/VisitController.cs`
- Funcionalidade: Agendar, assumir, iniciar, concluir com relato, recusar com motivo e consultar visitas.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: Visits.tsx; localização solicitada ao iniciar/concluir. Atualização/reagendamento presente na API. Não há evidência de otimização de rotas.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#visitas`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 13.

### VisitAttachmentController
- Fonte: `Domus.API/Controllers/VisitAttachmentController.cs`
- Funcionalidade: Arquivos vinculados às visitas.
- Status observado: **PARCIAL**.
- Cruzamento e limites: Upload/listagem presentes; download anônimo conflita com exigência de contexto e link relativo diverge da base configurada.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### AlertController
- Fonte: `Domus.API/Controllers/AlertController.cs`
- Funcionalidade: Avisos com título, mensagem e situação.
- Status observado: **PLANEJADO/INFERIDO**.
- Cruzamento e limites: Controller e serviço vazios; entidade Alert dá evidência da intenção.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 0.

### AuditLogController
- Fonte: `Domus.API/Controllers/AuditLogController.cs`
- Funcionalidade: Histórico administrativo.
- Status observado: **PLANEJADO/INFERIDO**.
- Cruzamento e limites: Controller e serviço vazios; entidade AuditLog.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 0.

### MotoristController
- Fonte: `Domus.API/Controllers/MotoristController.cs`
- Funcionalidade: Motoristas associados às visitas.
- Status observado: **PLANEJADO/INFERIDO**.
- Cruzamento e limites: Entidade vinculada a Visit; controller e serviço vazios; frontend envia vínculo nulo.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 0.

### ReportController
- Fonte: `Domus.API/Controllers/ReportController.cs`
- Funcionalidade: Relatórios próprios.
- Status observado: **PLANEJADO/INFERIDO**.
- Cruzamento e limites: Controller/serviço vazios; entidade com título e descrição. Não confundir com relato de conclusão da visita.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 0.

### AttachmentReport
- Fonte: `Domus.API/Controllers/AttachmentReport.cs`
- Funcionalidade: Arquivos para relatórios.
- Status observado: **PLANEJADO/INFERIDO**.
- Cruzamento e limites: Classe em Controllers/AttachmentReport.cs herda ControllerBase, apesar de não ter sufixo Controller. Estrutura vazia.
- Benefício: dar contexto e continuidade ao acompanhamento domiciliar.
- Representação: `/domus#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Domus, páginas de capacidades e experiência.
- Entradas encontradas: 0.


## VemKa — 6/6 controllers

### AuthController
- Fonte: `VemKa.API/Controllers/AuthController.cs`
- Funcionalidade: Acesso por perfil de administração, atendente, totem e painel.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: permissions.ts e login; contas administrativas e de operação.
- Benefício: tornar as etapas do atendimento visíveis para a operação.
- Representação: `/vemka#operacao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo VemKa, páginas de capacidades e experiência.
- Entradas encontradas: 5.

### QueueTicketController
- Fonte: `VemKa.API/Controllers/QueueTicketController.cs`
- Funcionalidade: Emissão, espera prioritária, chamada, início, conclusão, cancelamento, realocação e histórico.
- Status observado: **PARCIAL**.
- Cruzamento e limites: Fluxo principal em QueueTicketService e Operation. UpdateAsync lança NotImplementedException. KioskPage reseta ao sucesso sem exibir TicketVisual. Conexões de Operation/Display não chamam joinUnit. Visão geral administrativa chama rota restrita a atendentes.
- Benefício: tornar as etapas do atendimento visíveis para a operação.
- Representação: `/vemka#fila`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo VemKa, páginas de capacidades e experiência.
- Entradas encontradas: 14.

### ServiceCounterController
- Fonte: `VemKa.API/Controllers/ServiceCounterController.cs`
- Funcionalidade: Guichês e profissionais responsáveis.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: Management counters; associação com unidade.
- Benefício: tornar as etapas do atendimento visíveis para a operação.
- Representação: `/vemka#estrutura`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo VemKa, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### ServiceUnitController
- Fonte: `VemKa.API/Controllers/ServiceUnitController.cs`
- Funcionalidade: Unidades de atendimento.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: Management units; endereço, contato e disponibilidade.
- Benefício: tornar as etapas do atendimento visíveis para a operação.
- Representação: `/vemka#estrutura`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo VemKa, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### ServiceTypeController
- Fonte: `VemKa.API/Controllers/ServiceTypeController.cs`
- Funcionalidade: Serviços, prefixos e disponibilidade.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: Management services; preferência ordenada por IsPriority na fila, não prometer algoritmo configurável de alternância.
- Benefício: tornar as etapas do atendimento visíveis para a operação.
- Representação: `/vemka#estrutura`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo VemKa, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### UserController
- Fonte: `VemKa.API/Controllers/UserController.cs`
- Funcionalidade: Equipe, alocação em unidades/guichês/serviços e ativação de acesso.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: Team; contas por organização e consulta global restrita.
- Benefício: tornar as etapas do atendimento visíveis para a operação.
- Representação: `/vemka#equipe`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo VemKa, páginas de capacidades e experiência.
- Entradas encontradas: 7.


## Ordian — 21/21 controllers

### AuthController
- Fonte: `HelpDesk.API/Controllers/AuthController.cs`
- Funcionalidade: Entrada, recuperação de senha e cadastro por perfil.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: LoginPage, AccountPages e UserManagementPage.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#gestao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 7.

### ExternalAuthController
- Fonte: `HelpDesk.API/Controllers/ExternalAuthController.cs`
- Funcionalidade: Entrada pela identidade do Atlas.
- Status observado: **PARCIAL**.
- Cruzamento e limites: Código de provedor externo com conta preexistente e sincronização de papéis; depende da configuração dos dois ambientes e do retorno do Atlas.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 2.

### UserController
- Fonte: `HelpDesk.API/Controllers/UserController.cs`
- Funcionalidade: Diretório, perfis, ativação e vínculos departamentais.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: DirectoryPage e RolePages; operações administrativas separadas por política.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#gestao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 7.

### SuperAdminController
- Fonte: `HelpDesk.API/Controllers/SuperAdminController.cs`
- Funcionalidade: Administração de ambientes e responsáveis.
- Status observado: **PARCIAL**.
- Cruzamento e limites: SuperAdminPage; rota admins/{adminId}/users recebe parâmetro userId divergente.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 6.

### DepartmentController
- Fonte: `HelpDesk.API/Controllers/DepartmentController.cs`
- Funcionalidade: Departamentos responsáveis pelas demandas.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: CatalogsPage; consulta, criação e edição.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#gestao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### UserDepartmentController
- Fonte: `HelpDesk.API/Controllers/UserDepartmentController.cs`
- Funcionalidade: Vínculos entre pessoas e departamentos.
- Status observado: **PARCIAL**.
- Cruzamento e limites: MembershipsPage; exclusão usa parâmetros FromQuery embora rota contenha segmentos.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### TicketController
- Fonte: `HelpDesk.API/Controllers/TicketController.cs`
- Funcionalidade: Registro, classificação, acompanhamento, prioridade e atribuição de demandas.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: NewDemandPage, TicketListPage, DemandDetailPage e EditDemandPage. Finalizados/cancelados bloqueiam mudança de situação. Duas rotas POST concorrentes para agents exigem validação.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#demandas`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 12.

### TicketCategoryController
- Fonte: `HelpDesk.API/Controllers/TicketCategoryController.cs`
- Funcionalidade: Categorias de demandas por departamento.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: CatalogsPage e NewDemandPage; categoria precisa pertencer ao departamento.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#demandas`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 5.

### TicketAgentController
- Fonte: `HelpDesk.API/Controllers/TicketAgentController.cs`
- Funcionalidade: Equipe de atendimento e responsável principal.
- Status observado: **PARCIAL**.
- Cruzamento e limites: DemandDetailPage; serviço prevê principal único, mas POST colide com TicketController.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### TicketMessageController
- Fonte: `HelpDesk.API/Controllers/TicketMessageController.cs`
- Funcionalidade: Conversa e arquivos no contexto da demanda.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: DemandDetailPage; envio/listagem/edição. DeleteAsync não implementado e não exposto. Não prometer remoção nem confidencialidade de notas internas sem validação adicional.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#colaboracao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 3.

### TicketAttachmentController
- Fonte: `HelpDesk.API/Controllers/TicketAttachmentController.cs`
- Funcionalidade: Gestão independente de anexos.
- Status observado: **PLANEJADO/INFERIDO**.
- Cruzamento e limites: Controller/serviço vazios. Anexos na criação e mensagens existem via TicketService/TicketMessageService e não dependem deste controller.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 0.

### CheckListController
- Fonte: `HelpDesk.API/Controllers/CheckListController.cs`
- Funcionalidade: Listas pessoais e vinculadas às demandas.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: ChecklistsPage e detalhe da demanda; autoria verificada na alteração.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#colaboracao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 7.

### CheckListItemController
- Fonte: `HelpDesk.API/Controllers/CheckListItemController.cs`
- Funcionalidade: Etapas, ordenação e conclusão de tarefas.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: ChecklistsPage; valida lista e proprietário.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#colaboracao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 3.

### DocsController
- Fonte: `HelpDesk.API/Controllers/DocsController.cs`
- Funcionalidade: Central de documentos institucionais.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: DocumentsPage; consulta, envio e exclusão por gestão.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#conhecimento`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### KnowledgePostController
- Fonte: `HelpDesk.API/Controllers/KnowledgePostController.cs`
- Funcionalidade: Artigos, tutoriais, perguntas e processos.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: KnowledgePage; rascunho, publicado e arquivado definidos no domínio.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#conhecimento`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 6.

### KnowledgeCategoryController
- Fonte: `HelpDesk.API/Controllers/KnowledgeCategoryController.cs`
- Funcionalidade: Categorias de conhecimento.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: KnowledgePage/CatalogsPage; criação e edição administrativas.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#conhecimento`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### KnowledgeCommentController
- Fonte: `HelpDesk.API/Controllers/KnowledgeCommentController.cs`
- Funcionalidade: Comentários nas publicações.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: KnowledgePage; serviço verifica publicação e aceitação de comentários.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#conhecimento`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 4.

### SlaCalendarController
- Fonte: `HelpDesk.API/Controllers/SlaCalendarController.cs`
- Funcionalidade: Expediente e feriados para cálculo de prazo.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: SlaPage CalendarPanel; calendário padrão e intervalos de expediente.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#prazos`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 6.

### SlaPolicyController
- Fonte: `HelpDesk.API/Controllers/SlaPolicyController.cs`
- Funcionalidade: Prazos de resposta e resolução.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: SlaPage PolicyPanel; departamento, categoria e prioridade, aplicação à demanda e marcação de resposta/resolução.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#prazos`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 5.

### TicketReportsController
- Fonte: `HelpDesk.API/Controllers/TicketReportsController.cs`
- Funcionalidade: Panorama de demandas, prazos, distribuição, evolução e tempo em aberto.
- Status observado: **PARCIAL**.
- Cruzamento e limites: ReportsPage/DashboardPage; service passa UserId a repository que filtra OwnerId. Escopo e datas de encerramento exigem validação, não afirmar indicadores operacionais comprovados.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#evolucao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 9.

### AuditLogController
- Fonte: `HelpDesk.API/Controllers/AuditLogController.cs`
- Funcionalidade: Histórico de alterações das demandas.
- Status observado: **IMPLEMENTADO**.
- Cruzamento e limites: AuditPage e histórico por demanda; acesso geral administrativo.
- Benefício: preservar o contexto e a responsabilidade por cada demanda.
- Representação: `/ordian#gestao`; seção de recursos ou evolução; composição visual do produto. PDF: capítulo Ordian, páginas de capacidades e experiência.
- Entradas encontradas: 2.


## Resultado

56/56 classes de controllers mapeadas (13 Atlas, 16 Domus, 6 VemKa, 21 Ordian). Nenhum controller ficou sem interpretação funcional; estruturas vazias são inferências explicitamente marcadas.
