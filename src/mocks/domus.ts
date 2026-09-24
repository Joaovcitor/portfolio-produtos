export const domusVisits = [
  { id: 1, date: '15/10/2026', time: '08:30', name: 'Família Oliveira', type: 'Visita domiciliar', status: 'Concluída', address: 'Rua das Araucárias, 45', neighborhood: 'Bairro Jardim', team: 'Rafael Martins', report: 'A família foi acompanhada pela equipe. As orientações foram registradas para apoiar a continuidade do atendimento.' },
  { id: 2, date: '15/10/2026', time: '09:30', name: 'Carlos Henrique Sousa', type: 'Visita domiciliar', status: 'Em andamento', address: 'Avenida Brasil, 456', neighborhood: 'Centro', team: 'Rafael Martins', report: '' },
  { id: 3, date: '16/10/2026', time: '11:00', name: 'Mariana Alves', type: 'Acompanhamento familiar', status: 'Agendada', address: 'Rua das Palmeiras, 789', neighborhood: 'Vila Madalena', team: 'Sem visitador', report: '' },
  { id: 4, date: '16/10/2026', time: '14:00', name: 'Ana Beatriz Lima', type: 'Visita domiciliar', status: 'Agendada', address: 'Rua do Comércio, 101', neighborhood: 'Bela Vista', team: 'Rafael Martins', report: '' },
  { id: 5, date: '17/10/2026', time: '15:30', name: 'Juliana Ferreira', type: 'Acompanhamento familiar', status: 'Agendada', address: 'Avenida Paulista, 1000', neighborhood: 'Cerqueira César', team: 'Sem visitador', report: '' },
];

export const domusFamilies = [
  { 
    id: 1, 
    referenceName: 'Núcleo Oliveira', 
    neighborhood: 'Bairro Jardim', 
    referenceUnit: 'Unidade Centro',
    members: [
      { id: 101, name: 'Marta Oliveira', cpf: '111.***.***-11', relationship: 'Responsável familiar', active: true },
      { id: 102, name: 'José Oliveira', cpf: '222.***.***-22', relationship: 'Cônjuge', active: true },
      { id: 103, name: 'Lucas Oliveira', cpf: '333.***.***-33', relationship: 'Filho', active: true }
    ]
  },
  { 
    id: 2, 
    referenceName: 'Núcleo Lima', 
    neighborhood: 'Bela Vista', 
    referenceUnit: 'Unidade Norte',
    members: [
      { id: 104, name: 'Ana Beatriz Lima', cpf: '123.***.***-45', relationship: 'Responsável familiar', active: true }
    ]
  }
];

export const domusPeople = [
  { id: 101, name: 'Marta Oliveira', cpf: '111.***.***-11', nis: '123456789', income: 'R$ 1.500,00', phone: '(11) 98765-4321', email: 'marta@email.com', address: 'Rua das Araucárias', houseNumber: '45', neighborhoodName: 'Bairro Jardim', locationName: 'Região Leste', familyCode: 'Núcleo Oliveira', quantityVisits: 3, isActive: true },
  { id: 104, name: 'Ana Beatriz Lima', cpf: '123.***.***-45', nis: '987654321', income: 'Não informado', phone: '(11) 9****-1234', email: 'ana@email.com', address: 'Rua do Comércio', houseNumber: '101', neighborhoodName: 'Bela Vista', locationName: 'Região Norte', familyCode: 'Núcleo Lima', quantityVisits: 1, isActive: true }
];

export const domusMetrics = {
  totalVisits: 5,
  inProgress: 1,
  completed: 1,
  scheduled: 3
};

export const domusResources = {
  unidades: [
    { id: 1, name: 'Unidade Centro', isActive: true },
    { id: 2, name: 'Unidade Norte', isActive: true }
  ],
  bairros: [
    { id: 1, name: 'Bairro Jardim', locationId: 1 },
    { id: 2, name: 'Centro', locationId: 1 },
    { id: 3, name: 'Vila Madalena', locationId: 2 }
  ],
  localizacoes: [
    { id: 1, name: 'Região Leste', isActive: true },
    { id: 2, name: 'Região Norte', isActive: true }
  ],
  tiposVisita: [
    { id: 1, name: 'Visita domiciliar', isDefault: true },
    { id: 2, name: 'Acompanhamento familiar', isDefault: false }
  ]
};

export const domusProfessionals = [
  { id: 1, name: 'Rafael Martins', role: 'Visitador', unit: 'Unidade Centro', phone: '(11) 9****-3456', isActive: true },
  { id: 2, name: 'Carlos Henrique Sousa', role: 'Coordenador', unit: 'Unidade Norte', phone: '(11) 9****-5678', isActive: true }
];
