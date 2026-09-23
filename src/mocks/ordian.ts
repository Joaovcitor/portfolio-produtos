export const ordianTasks = [
  { id: 1, type: 'ADMINISTRATIVO', title: 'Revisão de cadastro', description: 'Conferência das informações da unidade.', priority: 'Média', assignee: 'Ana Beatriz', status: 'Abertas' },
  { id: 2, type: 'SUPORTE', title: 'Acesso ao portal', description: 'Orientação para a equipe.', priority: 'Alta', assignee: 'Rafael', status: 'Abertas' },
  { id: 3, type: 'SUPORTE', title: 'Falha de comunicação', description: 'Equipamentos da unidade sem acesso.', priority: 'Alta', assignee: 'Clara Santos', status: 'Em andamento', progress: 50, messages: 3 },
  { id: 4, type: 'ADMINISTRATIVO', title: 'Orientação de rotina', description: 'Procedimento compartilhado com a equipe.', priority: 'Baixa', assignee: 'Mariana', status: 'Resolvidas' },
];

export const ordianKnowledge = [
  { title: 'Como registrar uma boa solicitação', description: 'Descreva o contexto, selecione o departamento e reúna os arquivos necessários.', category: 'PROCESSOS INTERNOS' },
  { title: 'Primeiros passos na unidade', description: 'Guia de integração para novos membros da equipe.', category: 'INTEGRAÇÃO' },
  { title: 'Solução de falhas de rede', description: 'Passo a passo para restabelecer a comunicação entre equipamentos da Unidade Norte e Central.', category: 'ATENDIMENTO' },
];

export const ordianTaskDetails = {
  id: 3,
  title: 'Falha de comunicação',
  type: 'SUPORTE',
  status: 'Em andamento',
  requester: 'Unidade Norte',
  assignee: 'Clara Santos',
  messages: [
    { sender: 'Unidade Norte', role: 'SOLICITANTE', text: 'Perdemos a comunicação com os equipamentos locais. Precisamos de suporte.', attachment: 'log_erro.txt', time: '09:00' },
    { sender: 'Clara Santos', role: 'EQUIPE', text: 'Estou verificando os relatórios. O histórico da solução ficará registrado aqui.', time: '09:15' }
  ],
  steps: [
    { text: 'Conferir relatórios de erro', completed: true },
    { text: 'Consultar base de conhecimento', completed: true },
    { text: 'Aplicar configuração correta', completed: false }
  ]
};
