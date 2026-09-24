export const atlasPeople = [
  { id: 1, name: 'Ana Beatriz Lima', email: 'ana.lima@gov.br', cpf: '123.***.***-45', isActive: true, gender: 'Feminino', telephone: '(11) 9****-1234', dateOfBirth: '1992-04-15', address: 'Rua das Flores, 123', profession: 'Assistente Social' },
  { id: 2, name: 'Carlos Henrique Sousa', email: 'carlos.sousa@gov.br', cpf: '234.***.***-56', isActive: true, gender: 'Masculino', telephone: '(11) 9****-5678', dateOfBirth: '1985-08-22', address: 'Avenida Brasil, 456', profession: 'Coordenador' },
  { id: 3, name: 'Mariana Alves', email: 'mariana.alves@gov.br', cpf: '345.***.***-67', isActive: false, gender: 'Feminino', telephone: '(11) 9****-9012', dateOfBirth: '1990-11-10', address: 'Rua das Palmeiras, 789', profession: 'Analista' },
  { id: 4, name: 'Rafael Martins', email: 'rafael.martins@gov.br', cpf: '456.***.***-78', isActive: true, gender: 'Masculino', telephone: '(11) 9****-3456', dateOfBirth: '1988-02-05', address: 'Rua do Comércio, 101', profession: 'Técnico' },
];

export const atlasProfessionals = [
  { id: 1, nameEmploy: 'Ana Beatriz Lima', nameFunctionJob: 'Assistente Social', workplaceName: 'Unidade Centro', isActive: true, startExerciseFunction: '2020-01-15', workload: '40h', bond: 'Estatutário', dateFilledOut: '2020-01-10' },
  { id: 2, nameEmploy: 'Carlos Henrique Sousa', nameFunctionJob: 'Coordenador', workplaceName: 'Unidade Norte', isActive: true, startExerciseFunction: '2018-05-20', workload: '40h', bond: 'Comissionado', dateFilledOut: '2018-05-15' },
  { id: 3, nameEmploy: 'Mariana Alves', nameFunctionJob: 'Analista', workplaceName: 'Unidade São José', isActive: false, startExerciseFunction: '2021-03-10', workload: '30h', bond: 'CLT', dateFilledOut: '2021-03-05' },
];

export const atlasLocations = [
  { id: 1, name: 'Unidade Centro', createdAt: '15/01/2020' },
  { id: 2, name: 'Unidade Norte', createdAt: '20/05/2018' },
  { id: 3, name: 'Unidade São José', createdAt: '10/03/2021' },
  { id: 4, name: 'Unidade Regional', createdAt: '05/02/2019' },
  { id: 5, name: 'Atendimento Central', createdAt: '30/07/2017' }
];

export const atlasFunctions = [
  { id: 1, name: 'Assistente Social', description: 'Atendimento direto às famílias' },
  { id: 2, name: 'Coordenador', description: 'Gestão da unidade de atendimento' },
  { id: 3, name: 'Analista', description: 'Análise de dados e emissão de relatórios' },
  { id: 4, name: 'Técnico', description: 'Suporte técnico aos sistemas' },
];

export const atlasBonds = [
  { id: 1, name: 'Estatutário' },
  { id: 2, name: 'Comissionado' },
  { id: 3, name: 'CLT' },
  { id: 4, name: 'Estágio' },
];

export const atlasUsers = [
  { id: 'ana.lima@gov.br', completeName: 'Ana Beatriz Lima', roles: 'Registrar, Consultar' },
  { id: 'carlos.sousa@gov.br', completeName: 'Carlos Henrique Sousa', roles: 'Admin' },
  { id: 'admin@gov.br', completeName: 'Administrador do Sistema', roles: 'SuperAdmin' },
];

export const atlasSystems = [
  { id: 1, name: 'Domus', code: 'DMS-01', url: 'https://domus.gov.br', urlApi: 'https://api.domus.gov.br', description: 'Sistema de gestão habitacional', isActive: true },
  { id: 2, name: 'VemKa', code: 'VMK-02', url: 'https://vemka.gov.br', urlApi: 'https://api.vemka.gov.br', description: 'Gestão de filas e senhas', isActive: true },
  { id: 3, name: 'Ordian', code: 'ORD-03', url: 'https://ordian.gov.br', urlApi: 'https://api.ordian.gov.br', description: 'Central de serviços e Help Desk', isActive: true },
];
