import { v4 as uuidv4 } from 'uuid';
import { MockJob, MockCandidate } from './mockAdminData';

export interface RecruiterProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  cpf: string;
  cnpj?: string;
  contractFile?: string;
  bankStatementFile?: string;
  registeredAt: Date;
  isActive: boolean;
}

export interface RecruiterCandidate {
  id: string;
  recruiterId: string;
  recruiterName: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  jobArea: string;
  resume: string;
  observations?: string;
  appliedJobs: string[];
  status: 'Indicado' | 'Em avaliação' | 'Aprovado' | 'Reprovado' | 'Selecionado' | 'Em contratação' | 'Contratado';
  contractStartDate?: Date;
  indicatedAt: Date;
}

export interface JobCommission {
  jobId: string;
  jobTitle: string;
  companyName: string;
  commissionValue: number;
  candidatesIndicated: number;
  candidatesHired: number;
}

export interface RecruiterCommission {
  id: string;
  recruiterId: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  commissionValue: number;
  status: 'Pendente' | 'Em andamento' | 'Pago';
  contractStartDate?: Date;
  paymentDueDate?: Date;
  paidAt?: Date;
}

// Mock recruiter data
export const mockRecruiters: RecruiterProfile[] = [
  {
    id: '1',
    name: 'Gabriel Oliveira',
    email: 'c.o.gabriel@gmail.com',
    phone: '(11) 99999-0001',
    linkedin: 'https://linkedin.com/in/gabriel-oliveira',
    cpf: '123.456.789-00',
    cnpj: '12.345.678/0001-90',
    contractFile: 'contrato-gabriel.pdf',
    bankStatementFile: 'comprovante-gabriel.pdf',
    registeredAt: new Date('2024-01-15'),
    isActive: true
  },
  {
    id: '2',
    name: 'Ana Recruiter',
    email: 'ana.recruiter@email.com',
    phone: '(11) 98888-0002',
    linkedin: 'https://linkedin.com/in/ana-recruiter',
    cpf: '987.654.321-00',
    registeredAt: new Date('2024-02-20'),
    isActive: true
  }
];

// Mock recruiter candidates
export const mockRecruiterCandidates: RecruiterCandidate[] = [
  {
    id: '1',
    recruiterId: '1',
    recruiterName: 'Gabriel Oliveira',
    name: 'Pedro Silva',
    email: 'pedro.silva@email.com',
    phone: '(11) 97777-0001',
    city: 'São Paulo, SP',
    jobArea: 'Tecnologia',
    resume: 'cv-pedro-silva.pdf',
    observations: 'Candidato com excelente experiência em React, muito proativo.',
    appliedJobs: ['1'],
    status: 'Contratado',
    contractStartDate: new Date('2024-05-01'),
    indicatedAt: new Date('2024-04-01')
  },
  {
    id: '2',
    recruiterId: '1',
    recruiterName: 'Gabriel Oliveira',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(11) 96666-0002',
    city: 'Rio de Janeiro, RJ',
    jobArea: 'Marketing',
    resume: 'cv-maria-santos.pdf',
    observations: 'Experiência sólida em marketing digital e redes sociais.',
    appliedJobs: ['3'],
    status: 'Selecionado',
    indicatedAt: new Date('2024-06-01')
  },
  {
    id: '3',
    recruiterId: '1',
    recruiterName: 'Gabriel Oliveira',
    name: 'João Pereira',
    email: 'joao.pereira@email.com',
    phone: '(11) 95555-0003',
    city: 'Belo Horizonte, MG',
    jobArea: 'Dados',
    resume: 'cv-joao-pereira.pdf',
    observations: 'Forte background em Python e Machine Learning.',
    appliedJobs: ['2'],
    status: 'Em contratação',
    indicatedAt: new Date('2024-06-15')
  },
  {
    id: '4',
    recruiterId: '2',
    recruiterName: 'Ana Recruiter',
    name: 'Carlos Lima',
    email: 'carlos.lima@email.com',
    phone: '(11) 94444-0004',
    city: 'Porto Alegre, RS',
    jobArea: 'Gestão',
    resume: 'cv-carlos-lima.pdf',
    observations: 'Liderança exemplar, experiência em gestão de projetos.',
    appliedJobs: ['4'],
    status: 'Em avaliação',
    indicatedAt: new Date('2024-06-20')
  }
];

// Jobs with commission values
export const jobsWithCommission: JobCommission[] = [
  {
    jobId: '1',
    jobTitle: 'Desenvolvedor Frontend React',
    companyName: 'Tech Solutions',
    commissionValue: 2500,
    candidatesIndicated: 1,
    candidatesHired: 1
  },
  {
    jobId: '2',
    jobTitle: 'Cientista de Dados',
    companyName: 'Data Insights',
    commissionValue: 3500,
    candidatesIndicated: 1,
    candidatesHired: 0
  },
  {
    jobId: '3',
    jobTitle: 'Analista de Marketing Digital',
    companyName: 'Marketing Plus',
    commissionValue: 2000,
    candidatesIndicated: 1,
    candidatesHired: 0
  },
  {
    jobId: '4',
    jobTitle: 'Gerente de Projetos',
    companyName: 'Global Projects',
    commissionValue: 4000,
    candidatesIndicated: 1,
    candidatesHired: 0
  },
  {
    jobId: '5',
    jobTitle: 'Analista Financeiro',
    companyName: 'Finance Solutions',
    commissionValue: 2800,
    candidatesIndicated: 0,
    candidatesHired: 0
  },
  {
    jobId: '6',
    jobTitle: 'Especialista em Cibersegurança',
    companyName: 'Secure Tech',
    commissionValue: 3200,
    candidatesIndicated: 0,
    candidatesHired: 0
  },
  {
    jobId: '7',
    jobTitle: 'Consultor de Vendas',
    companyName: 'Salesforce',
    commissionValue: 1800,
    candidatesIndicated: 0,
    candidatesHired: 0
  },
  {
    jobId: '8',
    jobTitle: 'Designer UX/UI',
    companyName: 'Creative Agency',
    commissionValue: 2200,
    candidatesIndicated: 0,
    candidatesHired: 0
  },
  {
    jobId: '9',
    jobTitle: 'Engenheiro de Software',
    companyName: 'Innovation Labs',
    commissionValue: 3800,
    candidatesIndicated: 0,
    candidatesHired: 0
  },
  {
    jobId: '10',
    jobTitle: 'Analista de Suporte Técnico',
    companyName: 'Help Desk Solutions',
    commissionValue: 1500,
    candidatesIndicated: 0,
    candidatesHired: 0
  }
];

// Mock recruiter commissions
export const mockRecruiterCommissions: RecruiterCommission[] = [
  {
    id: '1',
    recruiterId: '1',
    candidateId: '1',
    candidateName: 'Pedro Silva',
    jobId: '1',
    jobTitle: 'Desenvolvedor Frontend React',
    companyName: 'Tech Solutions',
    commissionValue: 2500,
    status: 'Pago',
    contractStartDate: new Date('2024-05-01'),
    paymentDueDate: new Date('2024-08-09'), // 100 days after start
    paidAt: new Date('2024-08-10')
  },
  {
    id: '2',
    recruiterId: '1',
    candidateId: '2',
    candidateName: 'Maria Santos',
    jobId: '3',
    jobTitle: 'Analista de Marketing Digital',
    companyName: 'Marketing Plus',
    commissionValue: 2000,
    status: 'Em andamento'
  },
  {
    id: '3',
    recruiterId: '1',
    candidateId: '3',
    candidateName: 'João Pereira',
    jobId: '2',
    jobTitle: 'Cientista de Dados',
    companyName: 'Data Insights',
    commissionValue: 3500,
    status: 'Em andamento'
  }
];

export const getRecruiterStats = (recruiterId: string) => {
  const recruiterCandidates = mockRecruiterCandidates.filter(c => c.recruiterId === recruiterId);
  const recruiterCommissions = mockRecruiterCommissions.filter(c => c.recruiterId === recruiterId);
  
  const totalIndicados = recruiterCandidates.length;
  const aprovados = recruiterCandidates.filter(c => c.status === 'Aprovado').length;
  const reprovados = recruiterCandidates.filter(c => c.status === 'Reprovado').length;
  const emProcesso = recruiterCandidates.filter(c => 
    ['Em avaliação', 'Selecionado', 'Em contratação'].includes(c.status)
  ).length;
  const contratados = recruiterCandidates.filter(c => c.status === 'Contratado').length;
  
  const saldoTotalReceber = recruiterCommissions
    .filter(c => c.status === 'Pago')
    .reduce((sum, c) => sum + c.commissionValue, 0);
    
  const saldoPotencial = recruiterCommissions
    .filter(c => c.status === 'Em andamento')
    .reduce((sum, c) => sum + c.commissionValue, 0);

  return {
    totalIndicados,
    aprovados,
    reprovados,
    emProcesso,
    contratados,
    saldoTotalReceber,
    saldoPotencial
  };
};

export const getJobCommission = (jobId: string): number => {
  const job = jobsWithCommission.find(j => j.jobId === jobId);
  return job?.commissionValue || 0;
};