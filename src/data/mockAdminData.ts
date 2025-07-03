
export interface MockCandidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  jobArea: string; // Nova propriedade para área de atuação
  hasCompletedDISC: boolean;
  discProfile?: string;
  hasCompletedCultural: boolean;
  culturalProfile?: string;
  applications: string[];
  status: 'Em avaliação' | 'Pré-aprovado' | 'Reprovado';
  resume?: string;
  resumeText?: string;
  registeredAt: string;
  // Novos campos para visualização completa
  education?: {
    level: string;
    course: string;
    institution: string;
    year: string;
  }[];
  experience?: {
    position: string;
    company: string;
    period: string;
    description: string;
  }[];
  languages?: {
    language: string;
    level: string;
  }[];
  skills?: string[];
}

export interface MockCompany {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  phone: string;
  city: string;
  sector: string;
  size: 'Pequena' | 'Média' | 'Grande'; // Nova propriedade para porte
  responsibleName: string;
  hasCompletedCultural: boolean;
  culturalProfile?: string;
  jobsPosted: number;
  registeredAt: string;
}

export interface MockJob {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements?: string;
  benefits?: string;
  responsibilities?: string;
  status: 'active' | 'inactive';
  applications: number;
  createdAt: string;
}

export interface MockTest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: 'disc' | 'cultural';
  profile: string;
  completedAt: string;
  questions?: {
    question: string;
    answer: string;
  }[];
  detailedResult?: {
    description: string;
    strengths: string[];
    areas_for_development: string[];
    recommendations: string[];
  };
}

export const mockCandidates: MockCandidate[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '(11) 99999-9999',
    city: 'São Paulo',
    jobArea: 'Tecnologia',
    hasCompletedDISC: true,
    discProfile: 'Dominância (D)',
    hasCompletedCultural: true,
    culturalProfile: 'Executor',
    applications: ['1', '2'],
    status: 'Em avaliação',
    resume: 'curriculo_ana_silva.pdf',
    resumeText: 'Desenvolvedora Full Stack com 3 anos de experiência em React e Node.js...',
    registeredAt: '2024-01-15T10:00:00Z',
    education: [
      {
        level: 'Superior',
        course: 'Ciência da Computação',
        institution: 'USP',
        year: '2021'
      }
    ],
    experience: [
      {
        position: 'Desenvolvedor Full Stack',
        company: 'TechCorp',
        period: '2021 - Atual',
        description: 'Desenvolvimento de aplicações web usando React, Node.js e MongoDB'
      }
    ],
    languages: [
      { language: 'Inglês', level: 'Avançado' },
      { language: 'Espanhol', level: 'Intermediário' }
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Git']
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    phone: '(11) 88888-8888',
    city: 'Rio de Janeiro',
    jobArea: 'Design',
    hasCompletedDISC: true,
    discProfile: 'Influência (I)',
    hasCompletedCultural: false,
    applications: ['1'],
    status: 'Pré-aprovado',
    resume: 'curriculo_carlos_oliveira.pdf',
    resumeText: 'Designer UX/UI especializado em interfaces mobile e web...',
    registeredAt: '2024-01-20T14:30:00Z',
    education: [
      {
        level: 'Superior',
        course: 'Design Gráfico',
        institution: 'PUC-RJ',
        year: '2020'
      }
    ],
    experience: [
      {
        position: 'UX/UI Designer',
        company: 'DesignStudio',
        period: '2020 - Atual',
        description: 'Criação de interfaces para aplicativos mobile e web'
      }
    ],
    languages: [
      { language: 'Inglês', level: 'Intermediário' }
    ],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research']
  },
  {
    id: '3',
    name: 'Mariana Santos',
    email: 'mariana.santos@email.com',
    phone: '(11) 77777-7777',
    city: 'Belo Horizonte',
    jobArea: 'Marketing',
    hasCompletedDISC: false,
    hasCompletedCultural: true,
    culturalProfile: 'Conector',
    applications: ['2'],
    status: 'Reprovado',
    resume: 'curriculo_mariana_santos.pdf',
    resumeText: 'Especialista em marketing digital com foco em redes sociais...',
    registeredAt: '2024-02-01T09:15:00Z',
    education: [
      {
        level: 'Superior',
        course: 'Marketing',
        institution: 'UFMG',
        year: '2019'
      }
    ],
    experience: [
      {
        position: 'Analista de Marketing Digital',
        company: 'Marketing Pro',
        period: '2019 - Atual',
        description: 'Gestão de campanhas digitais e análise de métricas'
      }
    ],
    languages: [
      { language: 'Inglês', level: 'Avançado' },
      { language: 'Francês', level: 'Básico' }
    ],
    skills: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics', 'Social Media']
  }
];

export const mockCompanies: MockCompany[] = [
  {
    id: '1',
    name: 'TechFlow Soluções',
    email: 'contato@techflow.com',
    cnpj: '12.345.678/0001-90',
    phone: '(11) 3333-3333',
    city: 'São Paulo',
    sector: 'Tecnologia',
    size: 'Média',
    responsibleName: 'João Silva',
    hasCompletedCultural: true,
    culturalProfile: 'Executor',
    jobsPosted: 5,
    registeredAt: '2024-01-10T08:00:00Z'
  },
  {
    id: '2',
    name: 'Inovação Digital',
    email: 'rh@inovacaodigital.com',
    cnpj: '98.765.432/0001-10',
    phone: '(11) 4444-4444',
    city: 'Rio de Janeiro',
    sector: 'Tecnologia',
    size: 'Grande',
    responsibleName: 'Maria Santos',
    hasCompletedCultural: false,
    jobsPosted: 3,
    registeredAt: '2024-01-12T10:30:00Z'
  },
  {
    id: '3',
    name: 'StartupX',
    email: 'hiring@startupx.com',
    cnpj: '11.222.333/0001-44',
    phone: '(11) 5555-5555',
    city: 'São Paulo',
    sector: 'Tecnologia',
    size: 'Pequena',
    responsibleName: 'Pedro Oliveira',
    hasCompletedCultural: true,
    culturalProfile: 'Explorador',
    jobsPosted: 2,
    registeredAt: '2024-01-15T16:45:00Z'
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
    description: 'Vaga para desenvolvedor full stack com experiência em React e Node.js',
    requirements: 'Experiência mínima de 2 anos com React, Node.js, MongoDB. Conhecimento em TypeScript é um diferencial.',
    benefits: 'Vale refeição, plano de saúde, plano odontológico, gympass, home office flexível',
    responsibilities: 'Desenvolver aplicações web, manter código existente, participar de code reviews, colaborar com equipe de design',
    status: 'active',
    applications: 15,
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    companyId: '2',
    companyName: 'Inovação Digital',
    location: 'Rio de Janeiro - RJ',
    type: 'PJ',
    salary: 'R$ 5.000 - R$ 8.000',
    description: 'Designer para criar interfaces inovadoras e user-friendly',
    requirements: 'Experiência com Figma, Adobe XD, conhecimento em Design System, portfolio sólido',
    benefits: 'Horário flexível, equipamento fornecido, ambiente criativo',
    responsibilities: 'Criar wireframes, protótipos, conduzir pesquisas com usuários, trabalhar em equipe multidisciplinar',
    status: 'active',
    applications: 8,
    createdAt: '2024-01-25T14:00:00Z'
  }
];

export const mockTests: MockTest[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Ana Silva',
    userEmail: 'ana.silva@email.com',
    type: 'disc',
    profile: 'Dominância (D)',
    completedAt: '2024-01-16T10:00:00Z',
    questions: [
      {
        question: 'Como você prefere trabalhar em equipe?',
        answer: 'Gosto de liderar e tomar decisões rápidas'
      },
      {
        question: 'Como você lida com conflitos?',
        answer: 'Enfrento de forma direta e busco soluções práticas'
      }
    ],
    detailedResult: {
      description: 'Perfil Dominância caracteriza-se por pessoas focadas em resultados, diretas e assertivas.',
      strengths: ['Liderança natural', 'Tomada de decisões rápidas', 'Foco em resultados', 'Assertividade'],
      areas_for_development: ['Paciência com processos', 'Escuta ativa', 'Trabalho em equipe'],
      recommendations: ['Desenvolver habilidades de coaching', 'Praticar feedback construtivo', 'Trabalhar flexibilidade']
    }
  },
  {
    id: '2',
    userId: '1',
    userName: 'Ana Silva',
    userEmail: 'ana.silva@email.com',
    type: 'cultural',
    profile: 'Executor',
    completedAt: '2024-01-17T15:30:00Z',
    questions: [
      {
        question: 'O que mais te motiva no trabalho?',
        answer: 'Atingir metas e ver resultados concretos'
      },
      {
        question: 'Como você prefere receber feedback?',
        answer: 'De forma direta e com foco em melhorias'
      }
    ],
    detailedResult: {
      description: 'Perfil Executor é focado em performance, metas e resultados mensuráveis.',
      strengths: ['Orientação para resultados', 'Disciplina', 'Eficiência', 'Competitividade saudável'],
      areas_for_development: ['Flexibilidade', 'Criatividade', 'Colaboração'],
      recommendations: ['Participar de projetos colaborativos', 'Explorar soluções criativas', 'Desenvolver empatia']
    }
  }
];

export const getAdminStats = () => {
  return {
    totalCandidates: mockCandidates.length,
    totalCompanies: mockCompanies.length,
    totalJobs: mockJobs.length,
    activeJobs: mockJobs.filter(job => job.status === 'active').length,
    totalApplications: mockJobs.reduce((sum, job) => sum + job.applications, 0),
    completedDISC: mockCandidates.filter(c => c.hasCompletedDISC).length,
    completedCultural: mockCandidates.filter(c => c.hasCompletedCultural).length + mockCompanies.filter(c => c.hasCompletedCultural).length
  };
};
