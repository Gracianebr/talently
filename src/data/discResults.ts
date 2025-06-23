
export interface DiscProfile {
  id: string;
  nome: string;
  cor: string;
  descricao: string;
}

export const DISC_PROFILES: DiscProfile[] = [
  {
    id: "D",
    nome: "Dominância",
    cor: "#E63946",
    descricao: "Você tem um perfil Dominante. Pessoas com esse estilo são objetivas, diretas, orientadas para resultados e tomadas de decisão rápidas. Costumam assumir a liderança em situações desafiadoras, preferem autonomia e têm facilidade para lidar com pressão. Ambientes com metas claras e espaço para ação costumam ser os ideais para esse perfil."
  },
  {
    id: "I",
    nome: "Influência",
    cor: "#F4A261",
    descricao: "Você tem um perfil Influente. Pessoas com esse estilo são comunicativas, entusiasmadas, persuasivas e têm facilidade para engajar outras pessoas. Valorizam relações humanas, ambientes colaborativos e tendem a ser excelentes em posições que envolvem trabalho em equipe, atendimento ou vendas. Gostam de variedade e têm grande capacidade de motivar o grupo."
  },
  {
    id: "S",
    nome: "Estabilidade",
    cor: "#2A9D8F",
    descricao: "Você tem um perfil Estável. Pessoas com esse estilo são calmas, pacientes, empáticas e gostam de ambientes previsíveis. Valorizam a harmonia nas relações, gostam de apoiar o grupo e têm grande resistência a mudanças bruscas. São ótimas para funções que exigem consistência, escuta ativa e trabalho em equipe de longo prazo."
  },
  {
    id: "C",
    nome: "Conformidade",
    cor: "#264653",
    descricao: "Você tem um perfil Conforme. Pessoas com esse estilo são analíticas, precisas, organizadas e orientadas a regras e padrões. Gostam de trabalhar com dados, procedimentos e tarefas bem definidas. São excelentes em funções que exigem foco, responsabilidade e alta qualidade técnica. Valorizam excelência e tendem a ser detalhistas."
  },
  {
    id: "D/I",
    nome: "Dominância + Influência",
    cor: "#E63946",
    descricao: "Você tem um perfil Dominante com Influência. É uma pessoa determinada e extrovertida, que lidera com carisma e energia. Tende a assumir o controle das situações e a inspirar os outros a seguirem suas ideias. Busca resultados com agilidade e entusiasmo, sendo ideal para ambientes dinâmicos e voltados a metas, inovação e engajamento."
  },
  {
    id: "I/S",
    nome: "Influência + Estabilidade",
    cor: "#F4A261",
    descricao: "Você tem um perfil Influente com Estabilidade. Costuma ser uma pessoa empática, comunicativa e que valoriza boas relações. Consegue equilibrar entusiasmo com escuta ativa, criando ambientes colaborativos e harmônicos. É excelente em mediação, atendimento, educação e gestão de pessoas."
  },
  {
    id: "S/C",
    nome: "Estabilidade + Conformidade",
    cor: "#2A9D8F",
    descricao: "Você tem um perfil Estável com Conformidade. É uma pessoa cuidadosa, confiável e comprometida com a qualidade. Gosta de ambientes tranquilos, estruturados e organizados, onde possa contribuir com consistência e precisão. Trabalha bem com rotinas e processos bem definidos."
  },
  {
    id: "C/D",
    nome: "Conformidade + Dominância",
    cor: "#264653",
    descricao: "Você tem um perfil Conforme com Dominância. Tem foco em eficiência, qualidade e resultado. É uma pessoa direta, prática e analítica, que busca tomar decisões com base em dados. Costuma ser exigente, tanto consigo quanto com os outros, sendo ideal para cargos técnicos, estratégicos e de liderança com alto grau de responsabilidade."
  },
  {
    id: "D/S",
    nome: "Dominância + Estabilidade",
    cor: "#E63946",
    descricao: "Você tem um perfil Dominante com Estabilidade. Une firmeza com paciência. Tende a ser uma pessoa determinada, porém sem impulsividade, que prefere agir com responsabilidade. Tem facilidade para liderar projetos e times com disciplina e constância."
  },
  {
    id: "I/C",
    nome: "Influência + Conformidade",
    cor: "#F4A261",
    descricao: "Você tem um perfil Influente com Conformidade. Uma combinação de criatividade com atenção aos detalhes. Você consegue equilibrar empatia com precisão, sendo ótimo(a) para áreas que exigem comunicação clara, organização e entrega de valor com excelência."
  }
];

export const getDominantProfile = (scores: { D: number; I: number; S: number; C: number }): string => {
  // Encontrar os dois maiores valores
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const highest = sortedScores[0];
  const secondHighest = sortedScores[1];
  
  // Se a diferença for menor que 15%, considerar combinação
  if (highest[1] - secondHighest[1] < 15) {
    return `${highest[0]}/${secondHighest[0]}`;
  }
  
  return highest[0];
};

export const getProfileData = (profileId: string): DiscProfile | undefined => {
  return DISC_PROFILES.find(profile => profile.id === profileId);
};
