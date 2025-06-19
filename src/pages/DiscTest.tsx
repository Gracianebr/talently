
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const DISC_QUESTIONS = [
  {
    question: "Em situações de trabalho, você prefere:",
    options: [
      { text: "Liderar e tomar decisões rapidamente", type: "D" },
      { text: "Trabalhar com pessoas e influenciar", type: "I" },
      { text: "Manter harmonia e estabilidade", type: "S" },
      { text: "Analisar dados e seguir procedimentos", type: "C" }
    ]
  },
  {
    question: "Quando enfrenta um problema, você:",
    options: [
      { text: "Age rapidamente para resolver", type: "D" },
      { text: "Busca apoio de outras pessoas", type: "I" },
      { text: "Analisa calmamente a situação", type: "S" },
      { text: "Pesquisa informações detalhadas", type: "C" }
    ]
  },
  {
    question: "Seu ambiente de trabalho ideal é:",
    options: [
      { text: "Dinâmico e desafiador", type: "D" },
      { text: "Colaborativo e social", type: "I" },
      { text: "Estável e previsível", type: "S" },
      { text: "Organizado e estruturado", type: "C" }
    ]
  },
  {
    question: "Ao comunicar com colegas, você:",
    options: [
      { text: "É direto e objetivo", type: "D" },
      { text: "É entusiasta e expressivo", type: "I" },
      { text: "É paciente e compreensivo", type: "S" },
      { text: "É preciso e detalhado", type: "C" }
    ]
  },
  {
    question: "Sob pressão, você tende a:",
    options: [
      { text: "Assumir controle da situação", type: "D" },
      { text: "Buscar soluções criativas", type: "I" },
      { text: "Manter calma e seguir rotinas", type: "S" },
      { text: "Revisar procedimentos cuidadosamente", type: "C" }
    ]
  },
  {
    question: "Sua maior motivação no trabalho é:",
    options: [
      { text: "Alcançar resultados e metas", type: "D" },
      { text: "Reconhecimento e interação social", type: "I" },
      { text: "Estabilidade e harmonia", type: "S" },
      { text: "Qualidade e precisão", type: "C" }
    ]
  },
  {
    question: "Ao trabalhar em equipe, você:",
    options: [
      { text: "Assume naturalmente a liderança", type: "D" },
      { text: "Motiva e energiza o grupo", type: "I" },
      { text: "Apoia e coopera com todos", type: "S" },
      { text: "Contribui com análises e dados", type: "C" }
    ]
  },
  {
    question: "Diante de mudanças, você:",
    options: [
      { text: "Abraça rapidamente novas oportunidades", type: "D" },
      { text: "Se adapta facilmente e encontra o lado positivo", type: "I" },
      { text: "Prefere mudanças graduais e planejadas", type: "S" },
      { text: "Analisa cuidadosamente antes de aceitar", type: "C" }
    ]
  },
  {
    question: "Seu estilo de tomada de decisão é:",
    options: [
      { text: "Rápido e baseado em intuição", type: "D" },
      { text: "Baseado em discussões e feedback", type: "I" },
      { text: "Cauteloso e consensual", type: "S" },
      { text: "Baseado em dados e análise", type: "C" }
    ]
  },
  {
    question: "O que mais o incomoda no trabalho:",
    options: [
      { text: "Lentidão e falta de ação", type: "D" },
      { text: "Isolamento e falta de interação", type: "I" },
      { text: "Conflitos e mudanças bruscas", type: "S" },
      { text: "Desorganização e falta de clareza", type: "C" }
    ]
  }
];

export default function DiscTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleAnswer = (selectedType: string) => {
    const newAnswers = [...answers, selectedType];
    setAnswers(newAnswers);

    if (currentQuestion < DISC_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeTest(newAnswers);
    }
  };

  const completeTest = (allAnswers: string[]) => {
    // Calcular pontuações DISC
    const scores = { D: 0, I: 0, S: 0, C: 0 };
    
    allAnswers.forEach(answer => {
      scores[answer as keyof typeof scores]++;
    });

    // Converter para porcentagem
    const totalQuestions = DISC_QUESTIONS.length;
    const discResults = {
      D: Math.round((scores.D / totalQuestions) * 100),
      I: Math.round((scores.I / totalQuestions) * 100),
      S: Math.round((scores.S / totalQuestions) * 100),
      C: Math.round((scores.C / totalQuestions) * 100)
    };

    // Salvar resultados (temporariamente no localStorage)
    const savedUser = JSON.parse(localStorage.getItem('talently_user') || '{}');
    savedUser.profile = {
      ...savedUser.profile,
      hasCompletedDISC: true,
      discResults: discResults
    };
    localStorage.setItem('talently_user', JSON.stringify(savedUser));

    setIsCompleted(true);
    
    toast({
      title: "Teste DISC Concluído!",
      description: "Seus resultados foram salvos com sucesso.",
    });

    setTimeout(() => {
      navigate('/disc-results');
    }, 2000);
  };

  const progress = ((currentQuestion + 1) / DISC_QUESTIONS.length) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center pt-6">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2">Teste Concluído!</h2>
            <p className="text-gray-600">Redirecionando para os resultados...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-talently-darkblue">Teste DISC</h1>
            <span className="text-sm text-gray-600">
              {currentQuestion + 1} de {DISC_QUESTIONS.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {DISC_QUESTIONS[currentQuestion].question}
            </CardTitle>
            <CardDescription>
              Escolha a opção que melhor descreve seu comportamento:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {DISC_QUESTIONS[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-4"
                  onClick={() => handleAnswer(option.type)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
