import { v4 as uuidv4 } from 'uuid';

export interface MockJob {
  id: string;
  title: string;
  companyName: string;
  companyId: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  status: 'active' | 'inactive';
  applications: number;
  createdAt: Date;
  updatedAt: Date;
  requirements?: string;
  responsibilities?: string;
  benefits?: string;
}

export interface MockCompany {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  jobs: string[];
  logo?: string;
}

export interface MockTest {
  id: string;
  userName: string;
  userEmail: string;
  type: 'disc' | 'cultural';
  completedAt: Date;
  profile: string;
  questions?: Array<{
    question: string;
    answer: string;
  }>;
  detailedResult?: {
    description: string;
    strengths: string[];
    areas_for_development: string[];
    recommendations: string[];
  };
}

export interface QualifyingAnswer {
  question: string;
  answer: 'sim' | 'não';
}

export interface MockCandidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  jobArea: string;
  status: 'Pré-aprovado' | 'Reprovado' | 'Em avaliação';
  hasCompletedDISC: boolean;
  discProfile?: string;
  hasCompletedCultural: boolean;
  culturalProfile?: string;
  applications: string[];
  resume?: string;
  education?: Array<{
    course: string;
    institution: string;
    level: string;
    year: string;
  }>;
  experience?: Array<{
    position: string;
    company: string;
    period: string;
    description: string;
  }>;
  languages?: Array<{
    language: string;
    level: string;
  }>;
  skills?: string[];
  qualifyingAnswers?: { [jobId: string]: QualifyingAnswer[] };
}

export const mockJobs: MockJob[] = [
  {
    id: '1',
    title: 'Desenvolvedor Frontend React',
    companyName: 'Tech Solutions',
    companyId: '1',
    location: 'São Paulo, SP',
    type: 'Frontend',
    salary: 'R$ 8.000 - R$ 12.000',
    description: 'Buscamos um desenvolvedor React para criar interfaces incríveis.',
    status: 'active',
    applications: 25,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    requirements: 'Experiência com React, TypeScript, Git',
    responsibilities: 'Desenvolvimento de interfaces, code review, testes unitários',
    benefits: 'VR, VA, Plano de Saúde'
  },
  {
    id: '2',
    title: 'Cientista de Dados',
    companyName: 'Data Insights',
    companyId: '2',
    location: 'Rio de Janeiro, RJ',
    type: 'Data Science',
    salary: 'R$ 10.000 - R$ 15.000',
    description: 'Procuramos um cientista de dados para análise e modelagem preditiva.',
    status: 'active',
    applications: 15,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Analista de Marketing Digital',
    companyName: 'Marketing Plus',
    companyId: '3',
    location: 'Belo Horizonte, MG',
    type: 'Marketing',
    salary: 'R$ 6.000 - R$ 9.000',
    description: 'Vaga para analista de marketing digital com foco em SEO e mídias sociais.',
    status: 'inactive',
    applications: 8,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Gerente de Projetos',
    companyName: 'Global Projects',
    companyId: '4',
    location: 'Porto Alegre, RS',
    type: 'Gestão',
    salary: 'R$ 12.000 - R$ 18.000',
    description: 'Estamos buscando um gerente de projetos experiente para liderar equipes multidisciplinares.',
    status: 'active',
    applications: 32,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date(),
  },
  {
    id: '5',
    title: 'Analista Financeiro',
    companyName: 'Finance Solutions',
    companyId: '5',
    location: 'Curitiba, PR',
    type: 'Financeiro',
    salary: 'R$ 7.000 - R$ 11.000',
    description: 'Oportunidade para analista financeiro com conhecimento em contabilidade e finanças.',
    status: 'inactive',
    applications: 12,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date(),
  },
  {
    id: '6',
    title: 'Especialista em Cibersegurança',
    companyName: 'Secure Tech',
    companyId: '1',
    location: 'Recife, PE',
    type: 'Segurança da Informação',
    salary: 'R$ 9.000 - R$ 14.000',
    description: 'Buscamos um especialista em cibersegurança para proteger nossos sistemas e dados.',
    status: 'active',
    applications: 18,
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date(),
  },
  {
    id: '7',
    title: 'Consultor de Vendas',
    companyName: 'Salesforce',
    companyId: '2',
    location: 'Salvador, BA',
    type: 'Vendas',
    salary: 'R$ 5.000 - R$ 10.000',
    description: 'Vaga para consultor de vendas com experiência em vendas consultivas.',
    status: 'active',
    applications: 20,
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date(),
  },
  {
    id: '8',
    title: 'Designer UX/UI',
    companyName: 'Creative Agency',
    companyId: '3',
    location: 'Goiânia, GO',
    type: 'Design',
    salary: 'R$ 6.500 - R$ 10.000',
    description: 'Procuramos um designer UX/UI para criar interfaces intuitivas e agradáveis.',
    status: 'inactive',
    applications: 10,
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date(),
  },
  {
    id: '9',
    title: 'Engenheiro de Software',
    companyName: 'Innovation Labs',
    companyId: '4',
    location: 'Manaus, AM',
    type: 'Engenharia de Software',
    salary: 'R$ 11.000 - R$ 16.000',
    description: 'Estamos buscando um engenheiro de software para desenvolver soluções inovadoras.',
    status: 'active',
    applications: 28,
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date(),
  },
  {
    id: '10',
    title: 'Analista de Suporte Técnico',
    companyName: 'Help Desk Solutions',
    companyId: '5',
    location: 'Florianópolis, SC',
    type: 'Suporte Técnico',
    salary: 'R$ 4.500 - R$ 7.500',
    description: 'Oportunidade para analista de suporte técnico com habilidades de comunicação e resolução de problemas.',
    status: 'active',
    applications: 15,
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date(),
  }
];

export const mockCompanies: MockCompany[] = [
  {
    id: '1',
    name: 'Tech Solutions',
    email: 'contact@techsolutions.com',
    phone: '(11) 1234-5678',
    address: 'Av. Paulista, 1234 - São Paulo, SP',
    jobs: ['1', '6'],
    logo: 'tech-solutions-logo.png'
  },
  {
    id: '2',
    name: 'Data Insights',
    email: 'info@datainsights.com',
    phone: '(21) 9876-5432',
    address: 'Rua das Laranjeiras, 567 - Rio de Janeiro, RJ',
    jobs: ['2', '7'],
    logo: 'data-insights-logo.png'
  },
  {
    id: '3',
    name: 'Marketing Plus',
    email: 'hello@marketingplus.com',
    phone: '(31) 4321-8765',
    address: 'Av. Afonso Pena, 789 - Belo Horizonte, MG',
    jobs: ['3', '8'],
    logo: 'marketing-plus-logo.png'
  },
  {
    id: '4',
    name: 'Global Projects',
    email: 'work@globalprojects.com',
    phone: '(51) 5678-1234',
    address: 'Rua da Praia, 1010 - Porto Alegre, RS',
    jobs: ['4', '9'],
    logo: 'global-projects-logo.png'
  },
  {
    id: '5',
    name: 'Finance Solutions',
    email: 'money@financesolutions.com',
    phone: '(41) 8765-4321',
    address: 'Av. Batel, 2323 - Curitiba, PR',
    jobs: ['5', '10'],
    logo: 'finance-solutions-logo.png'
  }
];

export const mockTests: MockTest[] = [
  {
    id: uuidv4(),
    userName: 'João Silva',
    userEmail: 'joao.silva@example.com',
    type: 'disc',
    completedAt: new Date(),
    profile: 'Analista',
    questions: [
      { question: 'Você se considera uma pessoa comunicativa?', answer: 'Sim' },
      { question: 'Você prefere trabalhar em equipe ou sozinho?', answer: 'Em equipe' },
    ],
    detailedResult: {
      description: 'Perfil analítico e detalhista, com foco em qualidade e precisão.',
      strengths: ['Atenção aos detalhes', 'Organização', 'Pensamento lógico'],
      areas_for_development: ['Comunicação', 'Flexibilidade'],
      recommendations: ['Invista em cursos de comunicação', 'Busque atividades que exijam flexibilidade'],
    },
  },
  {
    id: uuidv4(),
    userName: 'Maria Souza',
    userEmail: 'maria.souza@example.com',
    type: 'cultural',
    completedAt: new Date(),
    profile: 'Líder',
    questions: [
      { question: 'Você se considera uma pessoa proativa?', answer: 'Sim' },
      { question: 'Você prefere liderar ou ser liderado?', answer: 'Liderar' },
    ],
    detailedResult: {
      description: 'Perfil de liderança, com foco em resultados e tomada de decisão.',
      strengths: ['Liderança', 'Proatividade', 'Visão estratégica'],
      areas_for_development: ['Empatia', 'Delegação'],
      recommendations: ['Invista em cursos de liderança', 'Busque atividades que exijam delegação'],
    },
  },
];

export const mockCandidates: MockCandidate[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '(11) 99999-1234',
    city: 'São Paulo, SP',
    jobArea: 'Tecnologia',
    status: 'Pré-aprovado',
    hasCompletedDISC: true,
    discProfile: 'Dominante',
    hasCompletedCultural: true,
    culturalProfile: 'Executora',
    applications: ['1', '2'],
    resume: 'curriculo-ana-silva.pdf',
    education: [
      {
        course: 'Ciência da Computação',
        institution: 'USP',
        level: 'Bacharelado',
        year: '2020'
      }
    ],
    experience: [
      {
        position: 'Desenvolvedora Frontend',
        company: 'Tech Corp',
        period: '2020 - Atual',
        description: 'Desenvolvimento de aplicações React e Vue.js'
      }
    ],
    languages: [
      { language: 'Inglês', level: 'Avançado' },
      { language: 'Espanhol', level: 'Intermediário' }
    ],
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML'],
    qualifyingAnswers: {
      '1': [
        { question: 'Você tem experiência mínima de 3 anos com React?', answer: 'sim' },
        { question: 'Possui conhecimento em TypeScript?', answer: 'sim' },
        { question: 'Tem experiência com metodologias ágeis?', answer: 'sim' },
        { question: 'Possui nível intermediário de inglês?', answer: 'sim' }
      ],
      '2': [
        { question: 'Você tem experiência com Python?', answer: 'não' },
        { question: 'Possui conhecimento em Machine Learning?', answer: 'não' }
      ]
    }
  },
  {
    id: '2',
    name: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    phone: '(11) 98888-5678',
    city: 'Rio de Janeiro, RJ',
    jobArea: 'Marketing',
    status: 'Em avaliação',
    hasCompletedDISC: true,
    discProfile: 'Influente',
    hasCompletedCultural: false,
    applications: ['1', '3'],
    resume: 'curriculo-carlos-santos.pdf',
    education: [
      {
        course: 'Marketing Digital',
        institution: 'FGV',
        level: 'MBA',
        year: '2021'
      }
    ],
    experience: [
      {
        position: 'Analista de Marketing',
        company: 'Marketing Plus',
        period: '2019 - Atual',
        description: 'Gestão de campanhas digitais e análise de métricas'
      }
    ],
    languages: [
      { language: 'Inglês', level: 'Intermediário' }
    ],
    skills: ['Google Ads', 'Facebook Ads', 'Analytics', 'SEO'],
    qualifyingAnswers: {
      '1': [
        { question: 'Você tem experiência mínima de 3 anos com React?', answer: 'não' },
        { question: 'Possui conhecimento em TypeScript?', answer: 'não' }
      ]
    }
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    phone: '(11) 97777-9012',
    city: 'Belo Horizonte, MG',
    jobArea: 'Recursos Humanos',
    status: 'Reprovado',
    hasCompletedDISC: false,
    hasCompletedCultural: true,
    culturalProfile: 'Conectora',
    applications: ['2'],
    education: [
      {
        course: 'Psicologia',
        institution: 'UFMG',
        level: 'Bacharelado',
        year: '2018'
      }
    ],
    experience: [
      {
        position: 'Analista de RH',
        company: 'RH Solutions',
        period: '2018 - Atual',
        description: 'Recrutamento e seleção, gestão de pessoas'
      }
    ],
    languages: [
      { language: 'Inglês', level: 'Básico' }
    ],
    skills: ['Recrutamento', 'Seleção', 'Gestão de Pessoas'],
    qualifyingAnswers: {
      '2': [
        { question: 'Você tem experiência com Python?', answer: 'sim' },
        { question: 'Possui conhecimento em Machine Learning?', answer: 'sim' }
      ]
    }
  }
];
