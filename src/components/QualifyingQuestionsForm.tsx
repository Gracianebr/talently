
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface QualifyingQuestionsFormProps {
  questions: string[];
  jobTitle: string;
  onComplete: (answers: Array<{ question: string; answer: 'sim' | 'não' }>) => void;
  onCancel: () => void;
}

const QualifyingQuestionsForm = ({ 
  questions, 
  jobTitle, 
  onComplete, 
  onCancel 
}: QualifyingQuestionsFormProps) => {
  const [answers, setAnswers] = useState<{ [key: number]: 'sim' | 'não' }>({});
  const { toast } = useToast();

  const handleAnswerChange = (questionIndex: number, answer: 'sim' | 'não') => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmit = () => {
    // Verificar se todas as perguntas foram respondidas
    if (Object.keys(answers).length !== questions.length) {
      toast({
        title: "Responda todas as perguntas",
        description: "Por favor, responda todas as perguntas qualificadoras antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    // Verificar se há alguma resposta "não"
    const hasNegativeAnswer = Object.values(answers).some(answer => answer === 'não');
    
    if (hasNegativeAnswer) {
      toast({
        title: "Não foi possível prosseguir",
        description: "Infelizmente você não atende a todos os requisitos obrigatórios para esta vaga.",
        variant: "destructive"
      });
      return;
    }

    // Se chegou até aqui, todas as respostas são "sim"
    const formattedAnswers = questions.map((question, index) => ({
      question,
      answer: answers[index]
    }));

    onComplete(formattedAnswers);
  };

  const allAnswered = Object.keys(answers).length === questions.length;
  const hasNegativeAnswer = Object.values(answers).some(answer => answer === 'não');

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="text-talently-purple" size={20} />
          <span>Perguntas Qualificadoras</span>
        </CardTitle>
        <p className="text-gray-600">
          Responda às perguntas abaixo para prosseguir com sua candidatura para a vaga de <strong>{jobTitle}</strong>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-talently-purple font-semibold mt-1">{index + 1}.</span>
              <p className="font-medium text-gray-900 flex-1">{question}</p>
            </div>
            
            <RadioGroup
              value={answers[index] || ''}
              onValueChange={(value) => handleAnswerChange(index, value as 'sim' | 'não')}
              className="ml-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id={`${index}-sim`} />
                <Label htmlFor={`${index}-sim`} className="text-green-700 font-medium">
                  Sim
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="não" id={`${index}-nao`} />
                <Label htmlFor={`${index}-nao`} className="text-red-700 font-medium">
                  Não
                </Label>
              </div>
            </RadioGroup>
          </div>
        ))}

        {allAnswered && hasNegativeAnswer && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="text-red-600 mt-0.5" size={20} />
            <div>
              <h4 className="font-semibold text-red-800">Requisitos não atendidos</h4>
              <p className="text-red-700 text-sm">
                Infelizmente, com base nas suas respostas, você não atende a todos os requisitos 
                obrigatórios para esta vaga. Recomendamos que desenvolva essas competências e 
                se candidate novamente no futuro.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="bg-talently-purple hover:bg-talently-purple/90"
          >
            {hasNegativeAnswer && allAnswered ? 'Finalizar' : 'Confirmar Candidatura'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualifyingQuestionsForm;
