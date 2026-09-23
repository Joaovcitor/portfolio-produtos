# Domus — análise funcional interna

Backend: `/home/joao/RiderProjects/Domus`. Frontend: `/home/joao/Área de Trabalho/projetos/domus-front-end`. Correspondência confirmada por namespaces, projetos e chamadas do frontend.

## Entrada, saída e cadastro de contas por perfil

**IMPLEMENTADO** — Login, AuthContext e People.Users; administrador cadastra equipe; superadministrador cria administradores.

Origem: `AuthController`. Representação comercial: `/domus#equipe`.

## Consulta de usuários e visitadores da organização

**IMPLEMENTADO** — People.Users e seleção de visitador em Visits.

Origem: `UserController`. Representação comercial: `/domus#equipe`.

## Profissionais, unidades, tipos de visita e áreas de atuação

**IMPLEMENTADO** — Professionals.tsx; valida usuário e vínculos de território/unidade.

Origem: `ProfessionalController`. Representação comercial: `/domus#equipe`.

## Unidades de atendimento

**IMPLEMENTADO** — Resources: unidades, detalhes e contagens.

Origem: `CareUnitController`. Representação comercial: `/domus#territorio`.

## Localizações e consulta territorial

**IMPLEMENTADO** — Resources: localizações; quantidades de visitas e assistidos.

Origem: `LocationController`. Representação comercial: `/domus#territorio`.

## Bairros vinculados às unidades

**IMPLEMENTADO** — Resources: bairros; serviço valida unidade.

Origem: `NeighborhoodController`. Representação comercial: `/domus#territorio`.

## Tipos de visita configuráveis

**IMPLEMENTADO** — Resources: tipos-visita e formulário de agenda.

Origem: `VisitTypeController`. Representação comercial: `/domus#visitas`.

## Cadastro e consulta de assistidos e vínculos familiares

**IMPLEMENTADO** — People.Assisted e Details.AssistedDetail; criação valida duplicidade e território. Edição existe na API, sem fluxo completo de edição no frontend.

Origem: `VisitedUserController`. Representação comercial: `/domus#pessoas`.

## Núcleos familiares e integrantes

**IMPLEMENTADO** — People.Families e Details.FamilyDetail; código familiar único por organização.

Origem: `FamilyController`. Representação comercial: `/domus#pessoas`.

## Agendar, assumir, iniciar, concluir com relato, recusar com motivo e consultar visitas

**IMPLEMENTADO** — Visits.tsx; localização solicitada ao iniciar/concluir. Atualização/reagendamento presente na API. Não há evidência de otimização de rotas.

Origem: `VisitController`. Representação comercial: `/domus#visitas`.

## Arquivos vinculados às visitas

**PARCIAL** — Upload/listagem presentes; download anônimo conflita com exigência de contexto e link relativo diverge da base configurada.

Origem: `VisitAttachmentController`. Representação comercial: `/domus#evolucao`.

## Avisos com título, mensagem e situação

**PLANEJADO/INFERIDO** — Controller e serviço vazios; entidade Alert dá evidência da intenção.

Origem: `AlertController`. Representação comercial: `/domus#evolucao`.

## Histórico administrativo

**PLANEJADO/INFERIDO** — Controller e serviço vazios; entidade AuditLog.

Origem: `AuditLogController`. Representação comercial: `/domus#evolucao`.

## Motoristas associados às visitas

**PLANEJADO/INFERIDO** — Entidade vinculada a Visit; controller e serviço vazios; frontend envia vínculo nulo.

Origem: `MotoristController`. Representação comercial: `/domus#evolucao`.

## Relatórios próprios

**PLANEJADO/INFERIDO** — Controller/serviço vazios; entidade com título e descrição. Não confundir com relato de conclusão da visita.

Origem: `ReportController`. Representação comercial: `/domus#evolucao`.

## Arquivos para relatórios

**PLANEJADO/INFERIDO** — Classe em Controllers/AttachmentReport.cs herda ControllerBase, apesar de não ter sufixo Controller. Estrutura vazia.

Origem: `AttachmentReport`. Representação comercial: `/domus#evolucao`.

## Inventário e limites

O arquivo INVENTARIO-DOMUS.json registra a árvore de componentes, estilos, entidades, DTOs, serviços, repositórios e controladores com hashes de conteúdo. Configurações sensíveis, banco, dados de seed e credenciais não são copiados. O relatório COBERTURA.md registra todas as classes de controller, inclusive nomes fora do padrão.
