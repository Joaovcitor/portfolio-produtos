# Ciclos de Vida e Fluxos dos Produtos

Este documento interno mapeia os ciclos de vida e fluxos descobertos através da análise dos códigos-fonte de cada produto. Ele serve de base para a construção das narrativas guiadas no Portfólio.

---

## ATLAS

**História:** O Atlas organiza a base da instituição. Ele transforma uma pessoa comum em um profissional autorizado, vinculando-o ao contexto correto e definindo o que ele pode ou não fazer no ecossistema de sistemas.

### Jornada Principal: Gestão de Pessoas e Acessos
1. **Cadastro Pessoal:** Uma pessoa (Pessoa) é registrada no sistema (dados básicos, CPF).
2. **Atuação Profissional:** O perfil profissional é criado (Profissional), vinculando a pessoa a uma Função e a um Vínculo Empregatício.
3. **Localização:** A pessoa é lotada em um Local de Trabalho específico (Ex.: Unidade Centro).
4. **Provisionamento de Acesso:** A pessoa recebe um Usuário para login no ecossistema (Auth).
5. **Permissões:** O acesso aos Sistemas Externos autorizados é gerido pelo administrador.

### Entidades Envolvidas
- `Pessoa` (PersonalForm)
- `Atuação Profissional` (ProfessionalForm)
- `Função` (JobFunction)
- `Vínculo` (EmploymentRelationship)
- `Local de Trabalho` (Workplace)
- `Usuário` (User / Roles)
- `Sistemas Externos` (ExternalSystems)

### Cenário Fictício
*Ana Beatriz Lima* é recém-contratada. Ela é **cadastrada** no sistema, seu **perfil de Assistente Social** é criado e ela é **vinculada à Unidade Centro**. Com isso, ela recebe seu **Acesso** e o sistema libera suas permissões.

---

## DOMUS

**História:** O Domus é focado na operação em campo (Home Care / Assistência Domiciliar). Ele rastreia uma visita desde o agendamento no escritório até o relatório final assinado na porta do assistido, com validação de geolocalização em tempo real.

### Jornada Principal: Acompanhamento Domiciliar
1. **Agendamento:** Uma Visita é agendada para um Assistido, associada a um Território/Localização, definindo o Visitador responsável.
2. **Atribuição:** A visita fica "Sem visitador" ou é atribuída. O Visitador a "Assume".
3. **Deslocamento e Início:** O visitador chega ao local e clica em "Iniciar". O sistema coleta a latitude/longitude inicial. A situação muda para `Em atendimento`.
4. **Relato e Conclusão:** O visitador preenche o relato, anexa fotos ou documentos necessários e clica em "Concluir". A latitude/longitude final é coletada.

### Entidades Envolvidas
- `Visita` (Visit)
- `Assistido` (VisitedUser)
- `Visitador` (User Role Visitor)
- `Localização / Território` (Location / Neighborhood)
- `Anexos` (Attachments)

### Cenário Fictício
*Rafael* é um visitador. Uma **visita é agendada** para a *Família Oliveira* no *Bairro Jardim*. Ele **assume** a visita, **inicia** o atendimento (com GPS validando a chegada), e ao terminar, escreve o **relato e conclui** com a localização final gravada.

---

## VEMKA

**História:** O VemKa é uma engrenagem de filas e chamadas. O foco é otimizar o tempo e direcionar o cliente pela unidade através do Kiosk (Totem de senhas), Display (Painel de TV) e Station (Mesa do Operador).

### Jornada Principal: Ciclo do Atendimento
1. **Emissão (Kiosk):** O usuário escolhe o Serviço. O totem imprime a senha (Ex: `A042`). Situação: `Aguardando`.
2. **Espera:** A senha integra a Fila de Espera central.
3. **Chamada (Station & Display):** Um Atendente (Guichê 03) aperta para chamar o próximo. A senha aparece no Painel e o aviso sonoro toca. Situação: `Chamada`.
4. **Atendimento (Station):** O cliente chega ao guichê. O atendente clica em "Iniciar". Situação: `Em atendimento`.
5. **Conclusão:** O serviço finaliza e o atendente clica em "Encerrar". Situação: `Concluída`.

### Fluxo Secundário (Administrativo)
- Criação de Unidades → Serviços → Guichês → Usuários (Atendente, Kiosk, Display).

### Entidades Envolvidas
- `Ticket` / `Senha`
- `Serviço` (ServiceType)
- `Guichê` (ServiceCounter)
- `Unidade` (ServiceUnit)
- `Status` (Waiting, Called, InService, Completed)

### Cenário Fictício
*Mariana* chega à unidade e emite a **senha A042** para *Atendimento Geral*. A senha entra na **espera**. O *Guichê 03* fica livre e o atendente **chama a senha**. O **painel pisca e anuncia**. Mariana é **atendida** e o ciclo é **concluído** em 9 minutos.

---

## ORDIAN

**História:** O Ordian é o centro nervoso das solicitações corporativas (ITSM/Helpdesk). É uma central de produtividade orientada à resolução de demandas organizacionais, apoiada por uma forte base de conhecimento.

### Jornada Principal: Resolução de Demandas
1. **Entrada (Nova Demanda):** Um solicitante cria um "Ticket/Demanda", descrevendo a necessidade e a prioridade. Situação: `Aberta`.
2. **Triagem / Fila de Suporte:** A demanda cai no departamento responsável ou na fila geral.
3. **Atribuição e Andamento:** Um membro da equipe "Puxa" a demanda (Assigned). Trocas de mensagens e checklists podem ocorrer. Situação: `Em andamento`.
4. **Desfecho:** O problema é resolvido e o ticket encerrado. Situação: `Resolvida`.

### Fluxo Secundário
- **Base de Conhecimento:** Criação de Manuais (Documents) e Checklists estruturados que auxiliam a equipe do suporte a resolver as demandas com padrão (SLA).

### Entidades Envolvidas
- `Demanda / Ticket`
- `Status` (Aberta, Em andamento, Resolvida)
- `Equipe / Atribuição` (Assignee)
- `Mensagens / Interações`
- `Base de Conhecimento / Checklist`

### Cenário Fictício
A *Unidade Norte* reporta um problema preenchendo uma **Nova Demanda**. A demanda entra na **Fila de Suporte**. *Clara* **assume a demanda**, verifica a **Base de Conhecimento** para a solução, interage no histórico e finalmente marca como **Resolvida**.
