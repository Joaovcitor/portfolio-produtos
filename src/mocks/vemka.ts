export const vemkaQueue = [
  { ticket: 'P043', type: 'Prioritário', status: 'Waiting', time: '09:45' },
  { ticket: 'A044', type: 'Comum', status: 'Waiting', time: '09:47' },
  { ticket: 'A045', type: 'Comum', status: 'Waiting', time: '09:50' },
  { ticket: 'A046', type: 'Comum', status: 'Waiting', time: '09:52' },
];

export const vemkaHistory = [
  { ticket: 'P041', counter: 'Guichê 01', time: '09:40' },
  { ticket: 'A040', counter: 'Guichê 03', time: '09:35' },
  { ticket: 'A039', counter: 'Guichê 02', time: '09:30' },
];

export const vemkaCurrent = {
  ticket: 'A042',
  customerName: 'Mariana Alves',
  type: 'Atendimento geral',
  status: 'InService',
  issuedAt: '09:42',
  calledAt: '09:46'
};

export const vemkaServices = [
  'Atendimento geral',
  'Atualização cadastral',
  'Orientação técnica',
  'Entrega de documentos',
  'Agendamento de retorno',
  'Dúvidas e informações'
];
