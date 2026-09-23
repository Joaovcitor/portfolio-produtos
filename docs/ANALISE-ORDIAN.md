# Ordian — análise funcional interna

Backend: `/home/joao/Área de Trabalho/projetos/OrdianApi`. Frontend: `/home/joao/Área de Trabalho/projetos/ordian-front-end`. Correspondência confirmada por namespaces, projetos e chamadas do frontend.

## Entrada, recuperação de senha e cadastro por perfil

**IMPLEMENTADO** — LoginPage, AccountPages e UserManagementPage.

Origem: `AuthController`. Representação comercial: `/ordian#gestao`.

## Entrada pela identidade do Atlas

**PARCIAL** — Código de provedor externo com conta preexistente e sincronização de papéis; depende da configuração dos dois ambientes e do retorno do Atlas.

Origem: `ExternalAuthController`. Representação comercial: `/ordian#evolucao`.

## Diretório, perfis, ativação e vínculos departamentais

**IMPLEMENTADO** — DirectoryPage e RolePages; operações administrativas separadas por política.

Origem: `UserController`. Representação comercial: `/ordian#gestao`.

## Administração de ambientes e responsáveis

**PARCIAL** — SuperAdminPage; rota admins/{adminId}/users recebe parâmetro userId divergente.

Origem: `SuperAdminController`. Representação comercial: `/ordian#evolucao`.

## Departamentos responsáveis pelas demandas

**IMPLEMENTADO** — CatalogsPage; consulta, criação e edição.

Origem: `DepartmentController`. Representação comercial: `/ordian#gestao`.

## Vínculos entre pessoas e departamentos

**PARCIAL** — MembershipsPage; exclusão usa parâmetros FromQuery embora rota contenha segmentos.

Origem: `UserDepartmentController`. Representação comercial: `/ordian#evolucao`.

## Registro, classificação, acompanhamento, prioridade e atribuição de demandas

**IMPLEMENTADO** — NewDemandPage, TicketListPage, DemandDetailPage e EditDemandPage. Finalizados/cancelados bloqueiam mudança de situação. Duas rotas POST concorrentes para agents exigem validação.

Origem: `TicketController`. Representação comercial: `/ordian#demandas`.

## Categorias de demandas por departamento

**IMPLEMENTADO** — CatalogsPage e NewDemandPage; categoria precisa pertencer ao departamento.

Origem: `TicketCategoryController`. Representação comercial: `/ordian#demandas`.

## Equipe de atendimento e responsável principal

**PARCIAL** — DemandDetailPage; serviço prevê principal único, mas POST colide com TicketController.

Origem: `TicketAgentController`. Representação comercial: `/ordian#evolucao`.

## Conversa e arquivos no contexto da demanda

**IMPLEMENTADO** — DemandDetailPage; envio/listagem/edição. DeleteAsync não implementado e não exposto. Não prometer remoção nem confidencialidade de notas internas sem validação adicional.

Origem: `TicketMessageController`. Representação comercial: `/ordian#colaboracao`.

## Gestão independente de anexos

**PLANEJADO/INFERIDO** — Controller/serviço vazios. Anexos na criação e mensagens existem via TicketService/TicketMessageService e não dependem deste controller.

Origem: `TicketAttachmentController`. Representação comercial: `/ordian#evolucao`.

## Listas pessoais e vinculadas às demandas

**IMPLEMENTADO** — ChecklistsPage e detalhe da demanda; autoria verificada na alteração.

Origem: `CheckListController`. Representação comercial: `/ordian#colaboracao`.

## Etapas, ordenação e conclusão de tarefas

**IMPLEMENTADO** — ChecklistsPage; valida lista e proprietário.

Origem: `CheckListItemController`. Representação comercial: `/ordian#colaboracao`.

## Central de documentos institucionais

**IMPLEMENTADO** — DocumentsPage; consulta, envio e exclusão por gestão.

Origem: `DocsController`. Representação comercial: `/ordian#conhecimento`.

## Artigos, tutoriais, perguntas e processos

**IMPLEMENTADO** — KnowledgePage; rascunho, publicado e arquivado definidos no domínio.

Origem: `KnowledgePostController`. Representação comercial: `/ordian#conhecimento`.

## Categorias de conhecimento

**IMPLEMENTADO** — KnowledgePage/CatalogsPage; criação e edição administrativas.

Origem: `KnowledgeCategoryController`. Representação comercial: `/ordian#conhecimento`.

## Comentários nas publicações

**IMPLEMENTADO** — KnowledgePage; serviço verifica publicação e aceitação de comentários.

Origem: `KnowledgeCommentController`. Representação comercial: `/ordian#conhecimento`.

## Expediente e feriados para cálculo de prazo

**IMPLEMENTADO** — SlaPage CalendarPanel; calendário padrão e intervalos de expediente.

Origem: `SlaCalendarController`. Representação comercial: `/ordian#prazos`.

## Prazos de resposta e resolução

**IMPLEMENTADO** — SlaPage PolicyPanel; departamento, categoria e prioridade, aplicação à demanda e marcação de resposta/resolução.

Origem: `SlaPolicyController`. Representação comercial: `/ordian#prazos`.

## Panorama de demandas, prazos, distribuição, evolução e tempo em aberto

**PARCIAL** — ReportsPage/DashboardPage; service passa UserId a repository que filtra OwnerId. Escopo e datas de encerramento exigem validação, não afirmar indicadores operacionais comprovados.

Origem: `TicketReportsController`. Representação comercial: `/ordian#evolucao`.

## Histórico de alterações das demandas

**IMPLEMENTADO** — AuditPage e histórico por demanda; acesso geral administrativo.

Origem: `AuditLogController`. Representação comercial: `/ordian#gestao`.

## Inventário e limites

O arquivo INVENTARIO-ORDIAN.json registra a árvore de componentes, estilos, entidades, DTOs, serviços, repositórios e controladores com hashes de conteúdo. Configurações sensíveis, banco, dados de seed e credenciais não são copiados. O relatório COBERTURA.md registra todas as classes de controller, inclusive nomes fora do padrão.
