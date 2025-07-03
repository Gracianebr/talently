import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Users, 
  GraduationCap,
  Briefcase,
  Calendar,
  ArrowLeft,
  ExternalLink
} from "lucide-react";
import QualifyingQuestionsForm from "@/components/QualifyingQuestionsForm";

// Mock data - em produção viria de uma API
const mockJob = {
  id: '1',
  title: 'Desenvolvedor Frontend React',
  company: 'Tech Solutions',
  location: 'São Paulo, SP',
  type: 'CLT',
  salary: 'R$ 8.000 - R$ 12.000',
  remote: 'Híbrido',
  posted: '2 dias atrás',
  description: `Estamos procurando um Desenvolvedor Frontend experiente em React para se juntar ao nosso time inovador. Você trabalhará em projetos desafiadores e terá a oportunidade de crescer profissionalmente em um ambiente colaborativo.

Responsabilidades:
• Desenvolver interfaces de usuário responsivas e intuitivas
• Colaborar com designers e desenvolvedores backend
• Implementar boas práticas de desenvolvimento
• Participar de code reviews e melhorias contínuas
• Manter-se atualizado com as últimas tecnologias`,
  requirements: [
    'Experiência mínima de 3 anos com React',
    'Conhecimento em TypeScript',
    'Experiência com Git e metodologias ágeis',
    'Inglês intermediário',
    'Experiência com testes unitários'
  ],
  benefits: [
    'Vale refeição R$ 800',
    'Plano de saúde',
    'Plano odontológico',
    'Auxílio home office',
    'Flexibilidade de horários',
    'Programa de educação continuada'
  ],
  qualifyingQuestions: [
    'Você tem experiência mínima de 3 anos com React?',
    'Possui conhecimento em TypeScript?',
    'Tem experiência com metodologias ágeis?',
    'Possui nível intermediário de inglês?'
  ],
  desiredProfile: 'Profissional proativo, com boa comunicação e capacidade de trabalhar em equipe. Busca constante evolução técnica e gosta de desafios.',
  workFormat: 'Híbrido - 3 dias presencial, 2 dias remoto'
};

export default function JobDetails() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isApplying, setIsApplying] = useState(false);
  const [showQualifyingQuestions, setShowQualifyingQuestions] = useState(false);

  // Em produção, aqui faria fetch da vaga por ID
  const job = mockJob;

  const handleApply = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login necessário",
        description: "Faça login para se candidatar a esta vaga.",
        variant: "destructive",
      });
      navigate(`/login?redirect=/job/${id}`);
      return;
    }

    if (user?.type !== 'candidate') {
      toast({
        title: "Acesso restrito",
        description: "Apenas candidatos podem se candidatar às vagas.",
        variant: "destructive",
      });
      return;
    }

    // Mostrar perguntas qualificadoras se existirem
    if (job.qualifyingQuestions && job.qualifyingQuestions.length > 0) {
      setShowQualifyingQuestions(true);
    } else {
      // Se não há perguntas, processar candidatura diretamente
      processApplication();
    }
  };

  const handleQualifyingQuestionsComplete = (answers: Array<{ question: string; answer: 'sim' | 'não' }>) => {
    // Verificar se há alguma resposta "não"
    const hasNegativeAnswer = answers.some(answer => answer.answer === 'não');
    
    if (hasNegativeAnswer) {
      // Candidatura não pode prosseguir
      setShowQualifyingQuestions(false);
      toast({
        title: "Candidatura não realizada",
        description: "Você não atende aos requisitos obrigatórios para esta vaga.",
        variant: "destructive",
      });
      return;
    }

    // Salvar respostas e processar candidatura
    console.log('Respostas das perguntas qualificadoras:', answers);
    setShowQualifyingQuestions(false);
    processApplication();
  };

  const processApplication = () => {
    setIsApplying(true);
    // Simular processo de candidatura
    setTimeout(() => {
      setIsApplying(false);
      toast({
        title: "Candidatura enviada!",
        description: "Sua candidatura foi enviada com sucesso.",
      });
    }, 1500);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copiado!",
      description: "Link da vaga copiado para a área de transferência.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Voltar</span>
              </Button>
              <span className="text-2xl font-bold text-talently-purple">Talently</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <ExternalLink size={16} className="mr-2" />
                Compartilhar
              </Button>
              {isAuthenticated && user?.type === 'candidate' && (
                <Button onClick={() => navigate('/dashboard')}>
                  Meu Painel
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-talently-darkblue mb-2">
                  {job.title}
                </CardTitle>
                <div className="flex items-center space-x-4 text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Building2 size={16} />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{job.posted}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{job.type}</Badge>
                  <Badge variant="outline">{job.remote}</Badge>
                  <Badge className="bg-green-100 text-green-800">
                    <DollarSign size={12} className="mr-1" />
                    {job.salary}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Button 
                  onClick={handleApply}
                  disabled={isApplying}
                  className="bg-talently-purple hover:bg-talently-purple/90"
                  size="lg"
                >
                  {isApplying ? 'Enviando...' : 'Candidatar-se'}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase size={20} />
                <span>Descrição da Vaga</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {job.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap size={20} />
                <span>Requisitos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-talently-purple mt-1">•</span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users size={20} />
                <span>Benefícios</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Desired Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Perfil Desejado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{job.desiredProfile}</p>
            </CardContent>
          </Card>

          {/* Work Format */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock size={20} />
                <span>Formato de Trabalho</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{job.workFormat}</p>
            </CardContent>
          </Card>

          {/* Qualifying Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Qualificadoras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">
                  Estas perguntas são obrigatórias e você deve responder "Sim" a todas para prosseguir com a candidatura:
                </p>
                {job.qualifyingQuestions.map((question, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 font-medium">{index + 1}. {question}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Apply Button (bottom) */}
        <div className="mt-8 text-center">
          <Button 
            onClick={handleApply}
            disabled={isApplying}
            className="bg-talently-purple hover:bg-talently-purple/90 px-12 py-3"
            size="lg"
          >
            {isApplying ? 'Enviando candidatura...' : 'Candidatar-se à Vaga'}
          </Button>
        </div>
      </div>

      {/* Qualifying Questions Dialog */}
      <Dialog open={showQualifyingQuestions} onOpenChange={() => setShowQualifyingQuestions(false)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Perguntas Qualificadoras</DialogTitle>
          </DialogHeader>
          
          <QualifyingQuestionsForm
            questions={job.qualifyingQuestions}
            jobTitle={job.title}
            onComplete={handleQualifyingQuestionsComplete}
            onCancel={() => setShowQualifyingQuestions(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
