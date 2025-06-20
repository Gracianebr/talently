import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    profile: 'Explorador' | 'Executor' | 'Guardião' | 'Conector';
  }[];
}

const CANDIDATE_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Qual estilo de liderança você prefere?",
    options: [
      { text: "Líderes que me deixam criar meu próprio caminho", profile: "Explorador" },
      { text: "Líderes que acompanham de perto e cobram resultados", profile: "Executor" },
      { text: "Líderes que seguem normas e processos claros", profile: "Guardião" },
      { text: "Líderes que cuidam do time como mentores", profile: "Conector" }
    ]
  },
  {
    id: 2,
    question: "Em qual ambiente você se sente mais produtivo?",
    options: [
      { text: "Ambientes informais, com espaço para experimentar", profile: "Explorador" },
      { text: "Ambientes rápidos e orientados a metas", profile: "Executor" },
      { text: "Ambientes organizados e previsíveis", profile: "Guardião" },
      { text: "Ambientes humanos e acolhedores", profile: "Conector" }
    ]
  },
  {
    id: 3,
    question: "O que mais te motiva no trabalho?",
    options: [
      { text: "Liberdade para propor e criar", profile: "Explorador" },
      { text: "Bater metas e ser reconhecido por isso", profile: "Executor" },
      { text: "Ter um plano de carreira estável", profile: "Guardião" },
      { text: "Trabalhar com um propósito que eu acredito", profile: "Conector" }
    ]
  },
  {
    id: 4,
    question: "Como você lida com mudanças?",
    options: [
      { text: "Me animo com mudanças constantes", profile: "Explorador" },
      { text: "Aceito mudanças se trouxerem mais performance", profile: "Executor" },
      { text: "Prefiro que as mudanças sejam bem estruturadas", profile: "Guardião" },
      { text: "Valorizo mudanças que respeitem o bem-estar de todos", profile: "Conector" }
    ]
  },
  {
    id: 5,
    question: "Como você toma decisões?",
    options: [
      { text: "Com base na minha intuição e criatividade", profile: "Explorador" },
      { text: "Sou direto: foco no resultado e executo", profile: "Executor" },
      { text: "Avalio todos os riscos antes de decidir", profile: "Guardião" },
      { text: "Escuto o time e busco consenso", profile: "Conector" }
    ]
  }
];

const COMPANY_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Como é o estilo de gestão na sua empresa?",
    options: [
      { text: "A liderança estimula ideias novas e testes rápidos", profile: "Explorador" },
      { text: "A liderança cobra metas com frequência", profile: "Executor" },
      { text: "A liderança segue um protocolo definido", profile: "Guardião" },
      { text: "A liderança age como guia e incentivadora", profile: "Conector" }
    ]
  },
  {
    id: 2,
    question: "Como descreveria o ambiente na empresa?",
    options: [
      { text: "Informal, criativo e com liberdade", profile: "Explorador" },
      { text: "Dinâmico, intenso e competitivo", profile: "Executor" },
      { text: "Sério, estruturado e disciplinado", profile: "Guardião" },
      { text: "Colaborativo, empático e participativo", profile: "Conector" }
    ]
  },
  {
    id: 3,
    question: "Quais valores mais representam sua empresa?",
    options: [
      { text: "Inovação e autonomia são essenciais", profile: "Explorador" },
      { text: "Mérito, resultado e entrega são o foco", profile: "Executor" },
      { text: "Disciplina, regras e organização são fundamentais", profile: "Guardião" },
      { text: "Ética, respeito e impacto são prioridade", profile: "Conector" }
    ]
  },
  {
    id: 4,
    question: "Como a empresa se adapta a mudanças?",
    options: [
      { text: "Mudança faz parte do nosso DNA", profile: "Explorador" },
      { text: "Mudamos quando isso aumenta resultados", profile: "Executor" },
      { text: "Só mudamos com planejamento e cuidado", profile: "Guardião" },
      { text: "Mudamos com foco nas pessoas e no bem-estar", profile: "Conector" }
    ]
  },
  {
    id: 5,
    question: "Como é a comunicação interna?",
    options: [
      { text: "Horizontal, aberta e descontraída", profile: "Explorador" },
      { text: "Direta, com foco em performance", profile: "Executor" },
      { text: "Formal, com protocolos e canais definidos", profile: "Guardião" },
      { text: "Empática, com escuta ativa", profile: "Conector" }
    ]
  }
];

const PROFILE_DESCRIPTIONS = {
  Explorador: {
    title: "🔷 Explorador",
    description: "Valorizam a inovação, a criatividade e a autonomia. Estão sempre em busca de novas ideias, abraçam mudanças e têm forte espírito empreendedor.",
    keywords: "Inovação, liberdade, criatividade, risco, autonomia"
  },
  Executor: {
    title: "🔶 Executor", 
    description: "Focados em resultados, metas e performance. Gostam de ambientes dinâmicos, com metas claras e recompensas por produtividade.",
    keywords: "Performance, metas, ambição, agilidade, competitividade"
  },
  Guardião: {
    title: "🟤 Guardião",
    description: "Prezando estabilidade, organização e regras claras, esse perfil prefere ambientes bem estruturados.",
    keywords: "Segurança, estabilidade, tradição, processo, formalidade"
  },
  Conector: {
    title: "🟢 Conector",
    description: "Guiados por propósito, colaboração e impacto social. São engajados em criar laços e construir um ambiente de trabalho acolhedor e ético.",
    keywords: "Propósito, colaboração, empatia, ética, impacto"
  }
};

const COMPANY_PROFILE_DESCRIPTIONS = {
  Exploradora: {
    title: "🔷 Exploradora",
    description: "A sua empresa tem um perfil Explorador, voltado à inovação, criatividade e autonomia. Esse tipo de organização costuma valorizar a liberdade para experimentar, pensar fora da caixa e adaptar-se rapidamente às mudanças do mercado. São ambientes ideais para profissionais com espírito empreendedor, que buscam crescer junto com ideias novas. Aqui, errar rápido é parte do processo e a flexibilidade é uma aliada da evolução constante.",
    keywords: "Inovação, liberdade, criatividade, experimentação, flexibilidade"
  },
  Executora: {
    title: "🔶 Executora",
    description: "A sua empresa tem um perfil Executor, voltado à performance, metas e entrega de resultados. Esse tipo de organização valoriza profissionais comprometidos, ambiciosos e com foco em produtividade. A velocidade, eficiência e a busca por excelência são pilares da cultura. Ambientes com esse perfil são ideais para talentos que gostam de desafios, metas claras e recompensas proporcionais ao esforço.",
    keywords: "Performance, metas, resultados, eficiência, competitividade"
  },
  Guardiã: {
    title: "🟤 Guardiã",
    description: "A sua empresa tem um perfil Guardião, com foco em estabilidade, segurança e cumprimento de regras. Esse tipo de organização funciona bem com processos claros, hierarquia definida e um ambiente previsível. É ideal para pessoas que valorizam planejamento, estrutura e uma jornada profissional sólida e segura. Mudanças são bem-vindas, mas apenas com organização e responsabilidade.",
    keywords: "Estabilidade, segurança, processos, estrutura, planejamento"
  },
  Conectora: {
    title: "🟢 Conectora", 
    description: "A sua empresa tem um perfil Conector, com foco em propósito, pessoas e impacto social. Essa cultura valoriza um ambiente humano, empático e colaborativo. É o lugar ideal para quem busca fazer parte de algo maior, onde as relações, o respeito e os valores éticos vêm antes de tudo. Mudanças são bem aceitas quando estão alinhadas ao bem-estar da equipe e à missão da empresa.",
    keywords: "Propósito, pessoas, impacto social, colaboração, valores éticos"
  }
};

export default function CulturalTest() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<string>('');

  const questions = user?.type === 'candidate' ? CANDIDATE_QUESTIONS : COMPANY_QUESTIONS;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (profile: string) => {
    const newAnswers = [...answers, profile];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcular resultado
      const profileCounts = newAnswers.reduce((acc, profile) => {
        acc[profile] = (acc[profile] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const dominantProfile = Object.keys(profileCounts).reduce((a, b) => 
        profileCounts[a] > profileCounts[b] ? a : b
      );

      setResult(dominantProfile);
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleFinish = () => {
    toast({
      title: "Teste concluído!",
      description: "Seu perfil cultural foi salvo com sucesso.",
    });
    navigate('/dashboard');
  };

  if (showResult) {
    const isCandidate = user?.type === 'candidate';
    const profileDescriptions = isCandidate ? PROFILE_DESCRIPTIONS : COMPANY_PROFILE_DESCRIPTIONS;
    const profileInfo = profileDescriptions[result as keyof typeof profileDescriptions];
    
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-talently-darkblue">
                {isCandidate ? 'Seu Perfil Cultural' : 'Perfil Cultural da Empresa'}
              </CardTitle>
              <CardDescription>
                Resultado do seu teste de fit cultural
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl mb-4">
                {profileInfo.title.split(' ')[0]}
              </div>
              <h3 className="text-2xl font-bold text-talently-purple">
                {profileInfo.title}
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg text-left">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {profileInfo.description}
                </p>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-semibold text-talently-darkblue mb-2">Palavras-chave:</p>
                  <p className="text-gray-600">{profileInfo.keywords}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={handleFinish}
                  className="flex-1 bg-talently-purple hover:bg-talently-purple/90"
                >
                  Finalizar
                </Button>
                <Button 
                  onClick={() => {
                    setShowResult(false);
                    setCurrentQuestion(0);
                    setAnswers([]);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Refazer Teste
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-talently-darkblue">
              Teste de Fit Cultural
            </CardTitle>
            <CardDescription>
              Pergunta {currentQuestion + 1} de {questions.length}
            </CardDescription>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          <CardContent className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              {questions[currentQuestion].question}
            </h3>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left h-auto p-4 justify-start hover:bg-talently-purple/10"
                  onClick={() => handleAnswer(option.profile)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Voltar</span>
              </Button>
              <span className="text-sm text-gray-500">
                {currentQuestion + 1} de {questions.length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
