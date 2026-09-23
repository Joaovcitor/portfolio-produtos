export const domusVisits = [
  { id: 1, time: '08:30', name: 'Família Oliveira', type: 'Visita domiciliar', status: 'Concluída', address: 'Rua das Araucárias, 45', neighborhood: 'Bairro Jardim', team: 'Rafael Martins', report: 'A família foi acompanhada pela equipe. As orientações foram registradas para apoiar a continuidade do atendimento.' },
  { id: 2, time: '09:30', name: 'Carlos Henrique Sousa', type: 'Visita domiciliar', status: 'Em andamento', address: 'Avenida Brasil, 456', neighborhood: 'Centro', team: 'Equipe Norte', report: '' },
  { id: 3, time: '11:00', name: 'Mariana Alves', type: 'Acompanhamento familiar', status: 'Agendada', address: 'Rua das Palmeiras, 789', neighborhood: 'Vila Madalena', team: 'Equipe Sul', report: '' },
  { id: 4, time: '14:00', name: 'Ana Beatriz Lima', type: 'Visita domiciliar', status: 'Agendada', address: 'Rua do Comércio, 101', neighborhood: 'Bela Vista', team: 'Equipe Centro', report: '' },
  { id: 5, time: '15:30', name: 'Juliana Ferreira', type: 'Acompanhamento familiar', status: 'Agendada', address: 'Avenida Paulista, 1000', neighborhood: 'Cerqueira César', team: 'Equipe Oeste', report: '' },
];

export const domusFamilies = [
  { 
    id: 1, 
    referenceName: 'Núcleo Oliveira', 
    neighborhood: 'Bairro Jardim', 
    referenceUnit: 'Unidade Centro',
    members: [
      { name: 'Marta Oliveira', relationship: 'Responsável familiar', active: true },
      { name: 'José Oliveira', relationship: 'Cônjuge', active: true },
      { name: 'Lucas Oliveira', relationship: 'Filho', active: true }
    ]
  }
];

export const domusMetrics = {
  totalVisits: 5,
  inProgress: 1,
  completed: 1,
  scheduled: 3
};
