export const vemkaQueue = [
  { ticket: 'P043', customerName: 'João Silva', type: 'Prioritário', status: 'Waiting', time: '09:45' },
  { ticket: 'A044', customerName: 'Maria Silva', type: 'Comum', status: 'Waiting', time: '09:47' },
  { ticket: 'A045', customerName: '', type: 'Comum', status: 'Waiting', time: '09:50' },
  { ticket: 'A046', customerName: '', type: 'Comum', status: 'Waiting', time: '09:52' },
];

export const vemkaHistory = [
  { ticket: 'P041', customerName: 'Fernanda Lima', counter: 'Guichê 01', time: '09:40', status: 'Completed' },
  { ticket: 'A040', customerName: 'Pedro Santos', counter: 'Guichê 03', time: '09:35', status: 'Completed' },
  { ticket: 'A039', customerName: '', counter: 'Guichê 02', time: '09:30', status: 'Cancelled' },
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
  { id: 1, name: 'Atendimento geral', prefix: 'A', priority: 0, isActive: true, unitName: 'Unidade Centro' },
  { id: 2, name: 'Atualização cadastral', prefix: 'C', priority: 0, isActive: true, unitName: 'Unidade Centro' },
  { id: 3, name: 'Atendimento prioritário', prefix: 'P', priority: 1, isActive: true, unitName: 'Unidade Centro' }
];

export const vemkaUnits = [
  { id: 1, name: 'Unidade Centro', address: 'Av. Paulista, 1000', phone: '(11) 9999-9999', isActive: true, createdAt: '2025-01-10' },
  { id: 2, name: 'Unidade Norte', address: 'Av. Cruzeiro do Sul, 2000', phone: '(11) 8888-8888', isActive: true, createdAt: '2025-02-15' }
];

export const vemkaCounters = [
  { id: 1, name: 'Guichê Principal', number: 1, unitName: 'Unidade Centro', isActive: true, createdAt: '2025-01-10' },
  { id: 2, name: 'Guichê Secundário', number: 2, unitName: 'Unidade Centro', isActive: true, createdAt: '2025-01-10' },
  { id: 3, name: 'Guichê Exclusivo', number: 3, unitName: 'Unidade Centro', isActive: true, createdAt: '2025-01-10' }
];

export const vemkaTeam = [
  { id: 1, name: 'Atendente Principal', email: 'atendente@vemka.gov.br', roles: ['Attendant'], unit: 'Unidade Centro', service: 'Atendimento geral', counter: '01 · Guichê Principal', isActive: true },
  { id: 2, name: 'Administrador', email: 'admin@vemka.gov.br', roles: ['SuperAdmin', 'Admin'], unit: '-', service: '-', counter: '-', isActive: true },
  { id: 3, name: 'Painel Recepção', email: 'painel@vemka.gov.br', roles: ['Display'], unit: 'Unidade Centro', service: '-', counter: '-', isActive: true },
  { id: 4, name: 'Totem Entrada', email: 'totem@vemka.gov.br', roles: ['Kiosk'], unit: 'Unidade Centro', service: '-', counter: '-', isActive: true }
];
