# Atlas — análise funcional interna

Backend: `/home/joao/Área de Trabalho/projetos/SIMGEP`. Frontend: `/home/joao/Área de Trabalho/projetos/atlas-front-end`. Correspondência confirmada por namespaces, projetos e chamadas do frontend.

## Proteção das operações da sessão

**IMPLEMENTADO** — Mecanismo de infraestrutura consumido em services/api.ts; sem tela própria.

Origem: `AntiforgeryController`. Representação comercial: `/atlas#acessos`.

## Entrada com confirmação de código, cadastro de administradores e cadastradores, troca de senha e saída

**PARCIAL** — Login e confirmação presentes; cadastro de contas e troca de senha sem interface completa.

Origem: `AuthController`. Representação comercial: `/atlas#acessos`.

## Acesso centralizado a sistemas autorizados

**PARCIAL** — Valida usuário, organização, sistema ativo e perfis; retorno ao fluxo de autorização não é consumido pelo login atual. Exige configuração do sistema consumidor.

Origem: `AuthorizationController`. Representação comercial: `/atlas#acessos`.

## Verificação em duas etapas e recuperação de acesso

**PARCIAL** — Serviço e operações presentes; frontend apenas apresenta texto de segurança, sem configuração navegável. Desativação tem observação de desenvolvimento no controller.

Origem: `TwoFactorController`. Representação comercial: `/atlas#evolucao`.

## Cadastro pessoal, identificação, contato, formação e profissão

**IMPLEMENTADO** — App.tsx List + resources.pessoas. Formulário visual expõe subconjunto dos campos do modelo.

Origem: `PersonalFormController`. Representação comercial: `/atlas#cadastros`.

## Atuação profissional, função, vínculo, carga horária e local de trabalho

**PARCIAL** — Listagem presente; formulário usa identificadores manuais e URL de listagem como base de criação/edição, divergindo das rotas.

Origem: `ProfessionalFormController`. Representação comercial: `/atlas#cadastros`.

## Organização dos locais de trabalho

**IMPLEMENTADO** — resources.locais; serviço impede nomes duplicados por organização.

Origem: `WorkplaceController`. Representação comercial: `/atlas#organizacao`.

## Cadastro das funções profissionais

**IMPLEMENTADO** — resources.funcoes; criação e edição restritas ao cadastrador.

Origem: `JobFunctionController`. Representação comercial: `/atlas#organizacao`.

## Tipos de vínculo profissional

**IMPLEMENTADO** — resources.vinculos; relação reutilizada na ficha profissional.

Origem: `EmploymentRelationshipController`. Representação comercial: `/atlas#organizacao`.

## Consulta das contas administradas

**IMPLEMENTADO** — resources.usuarios; apenas consulta, não prometer edição geral.

Origem: `UserController`. Representação comercial: `/atlas#acessos`.

## Catálogo de sistemas e sua disponibilidade

**IMPLEMENTADO** — resources.sistemas; criação, edição, ativação e desativação na API. Cadastro não implica integração automática.

Origem: `ExternalSystemsController`. Representação comercial: `/atlas#acessos`.

## Perfis específicos por sistema

**PARCIAL** — Serviço valida nome/código e sistema; ausência de tela específica.

Origem: `ExternalSystemRolesController`. Representação comercial: `/atlas#evolucao`.

## Concessão e suspensão de acesso por pessoa e sistema

**PARCIAL** — Vínculo por usuário ou e-mail da ficha, com verificação de organização e perfis; sem tela específica.

Origem: `PermittedSystemsController`. Representação comercial: `/atlas#evolucao`.

## Inventário e limites

O arquivo INVENTARIO-ATLAS.json registra a árvore de componentes, estilos, entidades, DTOs, serviços, repositórios e controladores com hashes de conteúdo. Configurações sensíveis, banco, dados de seed e credenciais não são copiados. O relatório COBERTURA.md registra todas as classes de controller, inclusive nomes fora do padrão.
