// Mock data for admin panel
export interface MockCandidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  hasCompletedDISC: boolean;
  hasCompletedCultural: boolean;
  discProfile?: string;
  culturalProfile?: string;
  applications: string[];
  registeredAt: string;
  resume?: string;
  status: 'Em avaliação' | 'Pré-aprovado' | 'Reprovado';
  resumeText?: string;
}

export interface MockCompany {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  phone: string;
  city: string;
  sector: string;
  hasCompletedCultural: boolean;
  culturalProfile?: string;
  jobsPosted: number;
  registeredAt: string;
  responsibleName: string;
}

export interface MockJob {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  location: string;
  type: 'CLT' | 'PJ' | 'Estágio' | 'Freelancer';
  salary: string;
  status: 'active' | 'inactive';
  applications: number;
  createdAt: string;
  description: string;
}

export const mockCandidates: MockCandidate[] = [
  {
    id: '1',
    name: 'Ana Silva Santos',
    email: 'ana.santos@email.com',
    phone: '(11) 99876-5432',
    city: 'São Paulo - SP',
    hasCompletedDISC: true,
    hasCompletedCultural: true,
    discProfile: 'D - Dominância',
    culturalProfile: 'Executor',
    applications: ['1', '3'],
    registeredAt: '2024-01-15',
    resume: 'curriculum_ana_santos.pdf',
    status: 'Pré-aprovado',
    resumeText: 'Desenvolvedora com 5 anos de experiência em React e Node.js. Especializada em desenvolvimento full-stack.'
  },
  {
    id: '2',
    name: 'Carlos Eduardo Lima',
    email: 'carlos.lima@email.com',
    phone: '(21) 98765-4321',
    city: 'Rio de Janeiro - RJ',
    hasCompletedDISC: true,
    hasCompletedCultural: false,
    discProfile: 'I - Influência',
    applications: ['2'],
    registeredAt: '2024-02-20',
    resume: 'curriculum_carlos_lima.pdf',
    status: 'Em avaliação',
    resumeText: 'Analista de marketing com experiência em campanhas digitais e estratégias de growth hacking.'
  },
  {
    id: '3',
    name: 'Mariana Costa Oliveira',
    email: 'mariana.costa@email.com',
    phone: '(31) 97654-3210',
    city: 'Belo Horizonte - MG',
    hasCompletedDISC: true,
    hasCompletedCultural: true,
    discProfile: 'S - Estabilidade',
    culturalProfile: 'Conector',
    applications: ['1', '4'],
    registeredAt: '2024-01-10',
    resume: 'curriculum_mariana_costa.pdf',
    status: 'Pré-aprovado',
    resumeText: 'UX/UI Designer com foco em design centrado no usuário e experiência de produto.'
  },
  {
    id: '4',
    name: 'Roberto Fernandes',
    email: 'roberto.fernandes@email.com',
    phone: '(41) 96543-2109',
    city: 'Curitiba - PR',
    hasCompletedDISC: false,
    hasCompletedCultural: false,
    applications: [],
    registeredAt: '2024-03-01',
    status: 'Em avaliação'
  },
  {
    id: '5',
    name: 'Juliana Pereira Santos',
    email: 'juliana.pereira@email.com',
    phone: '(51) 95432-1098',
    city: 'Porto Alegre - RS',
    hasCompletedDISC: true,
    hasCompletedCultural: true,
    discProfile: 'C - Conformidade',
    culturalProfile: 'Guardião',
    applications: ['5'],
    registeredAt: '2024-02-05',
    status: 'Reprovado',
    resumeText: 'Enfermeira especializada em UTI com 8 anos de experiência em hospitais de grande porte.'
  }
];

export const mockCompanies: MockCompany[] = [
  {
    id: '1',
    name: 'TechFlow Soluções',
    email: 'rh@techflow.com.br',
    cnpj: '12.345.678/0001-90',
    phone: '(11) 3456-7890',
    city: 'São Paulo - SP',
    sector: 'Tecnologia',
    hasCompletedCultural: true,
    culturalProfile: 'Exploradora',
    jobsPosted: 3,
    registeredAt: '2023-12-10',
    responsibleName: 'Maria Fernanda Silva'
  },
  {
    id: '2',
    name: 'Innovare Consultoria',
    email: 'contato@innovare.com.br',
    cnpj: '23.456.789/0001-01',
    phone: '(21) 2345-6789',
    city: 'Rio de Janeiro - RJ',
    sector: 'Consultoria',
    hasCompletedCultural: true,
    culturalProfile: 'Executora',
    jobsPosted: 2,
    registeredAt: '2024-01-05',
    responsibleName: 'João Carlos Pereira'
  },
  {
    id: '3',
    name: 'Construtech Engenharia',
    email: 'rh@construtech.com.br',
    cnpj: '34.567.890/0001-12',
    phone: '(31) 3234-5678',
    city: 'Belo Horizonte - MG',
    sector: 'Engenharia',
    hasCompletedCultural: false,
    jobsPosted: 1,
    registeredAt: '2024-02-15',
    responsibleName: 'Ana Beatriz Costa'
  },
  {
    id: '4',
    name: 'HealthCare Solutions',
    email: 'talentos@healthcare.com.br',
    cnpj: '45.678.901/0001-23',
    phone: '(41) 3123-4567',
    city: 'Curitiba - PR',
    sector: 'Saúde',
    hasCompletedCultural: true,
    culturalProfile: 'Conectora',
    jobsPosted: 2,
    registeredAt: '2023-11-20',
    responsibleName: 'Dr. Roberto Santos'
  }
];

export const mockJobs: MockJob[] = [
  {
    id: '1',
    title: 'Desenvolvedor Full Stack',
    companyId: '1',
    companyName: 'TechFlow Soluções',
    location: 'São Paulo - SP',
    type: 'CLT',
    salary: 'R$ 8.000 - R$ 12.000',
    status: 'active',
    applications: 15,
    createdAt: '2024-03-01',
    description: 'Desenvolvedor experiente em React, Node.js e bancos de dados relacionais.'
  },
  {
    id: '2',
    title: 'Analista de Marketing Digital',
    companyId: '2',
    companyName: 'Innovare Consultoria',
    location: 'Rio de Janeiro - RJ',
    type: 'CLT',
    salary: 'R$ 5.000 - R$ 7.000',
    status: 'active',
    applications: 8,
    createdAt: '2024-02-25',
    description: 'Profissional para gerenciar campanhas digitais e estratégias de marketing online.'
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    companyId: '1',
    companyName: 'TechFlow Soluções',
    location: 'São Paulo - SP',
    type: 'PJ',
    salary: 'R$ 6.000 - R$ 9.000',
    status: 'active',
    applications: 12,
    createdAt: '2024-02-20',
    description: 'Designer para criar interfaces intuitivas e experiências de usuário excepcionais.'
  },
  {
    id: '4',
    title: 'Engenheiro Civil Júnior',
    companyId: '3',
    companyName: 'Construtech Engenharia',
    location: 'Belo Horizonte - MG',
    type: 'CLT',
    salary: 'R$ 4.000 - R$ 6.000',
    status: 'active',
    applications: 6,
    createdAt: '2024-02-18',
    description: 'Engenheiro recém-formado para acompanhar projetos de construção civil.'
  },
  {
    id: '5',
    title: 'Enfermeiro Especialista',
    companyId: '4',
    companyName: 'HealthCare Solutions',
    location: 'Curitiba - PR',
    type: 'CLT',
    salary: 'R$ 5.500 - R$ 8.000',
    status: 'active',
    applications: 4,
    createdAt: '2024-02-10',
    description: 'Enfermeiro especializado em cuidados intensivos para hospital de referência.'
  },
  {
    id: '6',
    title: 'Product Manager',
    companyId: '1',
    companyName: 'TechFlow Soluções',
    location: 'São Paulo - SP',
    type: 'CLT',
    salary: 'R$ 12.000 - R$ 18.000',
    status: 'inactive',
    applications: 20,
    createdAt: '2024-01-15',
    description: 'Gerente de produto para liderar estratégia e desenvolvimento de produtos digitais.'
  }
];

// Admin statistics
export const getAdminStats = () => {
  const totalCandidates = mockCandidates.length;
  const totalCompanies = mockCompanies.length;
  const totalJobs = mockJobs.length;
  const activeJobs = mockJobs.filter(job => job.status === 'active').length;
  const totalApplications = mockJobs.reduce((sum, job) => sum + job.applications, 0);
  const completedDISC = mockCandidates.filter(candidate => candidate.hasCompletedDISC).length;
  const completedCultural = mockCandidates.filter(candidate => candidate.hasCompletedCultural).length;

  return {
    totalCandidates,
    totalCompanies,
    totalJobs,
    activeJobs,
    totalApplications,
    completedDISC,
    completedCultural
  };
};