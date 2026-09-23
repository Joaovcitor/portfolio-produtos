# VemKa — análise funcional interna

Backend: `/home/joao/Área de Trabalho/projetos/VemKa`. Frontend: `/home/joao/Área de Trabalho/projetos/vemka-front-end`. Correspondência confirmada por namespaces, projetos e chamadas do frontend.

## Acesso por perfil de administração, atendente, totem e painel

**IMPLEMENTADO** — permissions.ts e login; contas administrativas e de operação.

Origem: `AuthController`. Representação comercial: `/vemka#operacao`.

## Emissão, espera prioritária, chamada, início, conclusão, cancelamento, realocação e histórico

**PARCIAL** — Fluxo principal em QueueTicketService e Operation. UpdateAsync lança NotImplementedException. KioskPage reseta ao sucesso sem exibir TicketVisual. Conexões de Operation/Display não chamam joinUnit. Visão geral administrativa chama rota restrita a atendentes.

Origem: `QueueTicketController`. Representação comercial: `/vemka#fila`.

## Guichês e profissionais responsáveis

**IMPLEMENTADO** — Management counters; associação com unidade.

Origem: `ServiceCounterController`. Representação comercial: `/vemka#estrutura`.

## Unidades de atendimento

**IMPLEMENTADO** — Management units; endereço, contato e disponibilidade.

Origem: `ServiceUnitController`. Representação comercial: `/vemka#estrutura`.

## Serviços, prefixos e disponibilidade

**IMPLEMENTADO** — Management services; preferência ordenada por IsPriority na fila, não prometer algoritmo configurável de alternância.

Origem: `ServiceTypeController`. Representação comercial: `/vemka#estrutura`.

## Equipe, alocação em unidades/guichês/serviços e ativação de acesso

**IMPLEMENTADO** — Team; contas por organização e consulta global restrita.

Origem: `UserController`. Representação comercial: `/vemka#equipe`.

## Inventário e limites

O arquivo INVENTARIO-VEMKA.json registra a árvore de componentes, estilos, entidades, DTOs, serviços, repositórios e controladores com hashes de conteúdo. Configurações sensíveis, banco, dados de seed e credenciais não são copiados. O relatório COBERTURA.md registra todas as classes de controller, inclusive nomes fora do padrão.
