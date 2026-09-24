export const ordianTasks = [
  { id: 1, type: 'ADMINISTRATIVO', title: 'Revisão de cadastro', description: 'Conferência das informações da unidade.', priority: 'Média', assignee: 'Ana Beatriz', status: 'Abertas' },
  { id: 2, type: 'SUPORTE', title: 'Acesso ao portal', description: 'Orientação para a equipe.', priority: 'Alta', assignee: 'Rafael', status: 'Abertas' },
  { id: 3, type: 'SUPORTE', title: 'Falha de comunicação', description: 'Equipamentos da unidade sem acesso.', priority: 'Alta', assignee: 'Clara Santos', status: 'Em andamento', progress: 50, messages: 3 },
  { id: 4, type: 'ADMINISTRATIVO', title: 'Orientação de rotina', description: 'Procedimento compartilhado com a equipe.', priority: 'Baixa', assignee: 'Mariana', status: 'Resolvidas' },
];

export const ordianKnowledge = [
  { id: 1, title: 'Como registrar uma boa solicitação', description: 'Descreva o contexto, selecione o departamento e reúna os arquivos necessários.', category: 'PROCESSOS INTERNOS', isActive: true },
  { id: 2, title: 'Primeiros passos na unidade', description: 'Guia de integração para novos membros da equipe.', category: 'INTEGRAÇÃO', isActive: true },
  { id: 3, title: 'Solução de falhas de rede', description: 'Passo a passo para restabelecer a comunicação entre equipamentos da Unidade Norte e Central.', category: 'ATENDIMENTO', isActive: true },
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

export const ordianSla = [
  { id: 1, department: 'TI', category: 'Suporte', priority: 'Alta', firstResponse: '1 hora', resolution: '4 horas', isActive: true },
  { id: 2, department: 'RH', category: 'Administrativo', priority: 'Média', firstResponse: '4 horas', resolution: '24 horas', isActive: true },
  { id: 3, department: 'Manutenção', category: 'Infraestrutura', priority: 'Baixa', firstResponse: '24 horas', resolution: '72 horas', isActive: true }
];

export const ordianUsers = [
  { id: 1, name: 'Clara Santos', email: 'clara@ordian.gov.br', department: 'TI', roles: ['Equipe', 'Admin'], isActive: true },
  { id: 2, name: 'Rafael Martins', email: 'rafael@ordian.gov.br', department: 'TI', roles: ['Equipe'], isActive: true },
  { id: 3, name: 'Ana Beatriz', email: 'ana@ordian.gov.br', department: 'RH', roles: ['Equipe'], isActive: true }
];

export const ordianDepartments = [
  { id: 1, name: 'Tecnologia da Informação', code: 'TI', isCustomer: false, isProvider: true, isActive: true },
  { id: 2, name: 'Recursos Humanos', code: 'RH', isCustomer: true, isProvider: true, isActive: true },
  { id: 3, name: 'Unidade Norte', code: 'UN', isCustomer: true, isProvider: false, isActive: true }
];

export const ordianCategories = [
  { id: 1, name: 'Suporte', department: 'TI', isActive: true },
  { id: 2, name: 'Manutenção', department: 'Infraestrutura', isActive: true },
  { id: 3, name: 'Acesso', department: 'TI', isActive: true },
  { id: 4, name: 'Administrativo', department: 'RH', isActive: true }
];
