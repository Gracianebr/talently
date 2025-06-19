
import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Eye, Edit, X, MapPin, DollarSign, Calendar, Users } from "lucide-react";

// Dados de exemplo de vagas
const SAMPLE_JOBS = [
  {
    id: 1,
    title: "Desenvolvedor Frontend React",
    description: "Desenvolvedor experiente em React.js para atuar em projetos inovadores...",
    location: "São Paulo, SP",
    locationType: "Híbrido",
    salaryRange: "R$ 8.000 - R$ 12.000",
    status: "Ativa",
    createdAt: "2024-01-15",
    applicantsCount: 12,
    culturalProfile: "Exploradora",
    discProfile: "Dominante-Influente",
    qualifyingQuestions: [
      "Você tem experiência com React.js?",
      "Já trabalhou em metodologia ágil?",
      "Tem inglês intermediário ou avançado?",
      "Disponibilidade para trabalho híbrido?"
    ]
  },
  {
    id: 2,
    title: "Analista de Marketing Digital",
    description: "Profissional para gerenciar campanhas digitais e estratégias de growth...",
    location: "Rio de Janeiro, RJ",
    locationType: "Remoto",
    salaryRange: "R$ 5.000 - R$ 8.000",
    status: "Ativa",
    createdAt: "2024-01-10",
    applicantsCount: 8,
    culturalProfile: "Executora",
    discProfile: "Influente-Estável",
    qualifyingQuestions: [
      "Tem experiência com Google Ads?",
      "Conhece ferramentas de analytics?",
      "Já gerenciou orçamento de mídia?",
      "Tem portfolio de campanhas realizadas?"
    ]
  },
  {
    id: 3,
    title: "Gerente de Recursos Humanos",
    description: "Liderança de equipe de RH e implementação de políticas organizacionais...",
    location: "Belo Horizonte, MG",
    locationType: "Presencial",
    salaryRange: "R$ 10.000 - R$ 15.000",
    status: "Ativa",
    createdAt: "2024-01-05",
    applicantsCount: 15,
    culturalProfile: "Conectora",
    discProfile: "Estável-Consciencioso",
    qualifyingQuestions: [
      "Tem experiência em liderança de equipe?",
      "Conhece legislação trabalhista?",
      "Já implementou políticas de RH?",
      "Tem formação em Psicologia ou RH?"
    ]
  }
];

const STATUS_COLORS = {
  'Ativa': 'bg-green-100 text-green-800',
  'Pausada': 'bg-yellow-100 text-yellow-800',
  'Finalizada': 'bg-gray-100 text-gray-800'
};

const CULTURAL_PROFILE_COLORS = {
  'Exploradora': 'bg-blue-100 text-blue-800',
  'Explorador': 'bg-blue-100 text-blue-800',
  'Executora': 'bg-orange-100 text-orange-800',
  'Executor': 'bg-orange-100 text-orange-800',
  'Guardiã': 'bg-amber-100 text-amber-800',
  'Guardião': 'bg-amber-100 text-amber-800',
  'Conectora': 'bg-green-100 text-green-800',
  'Conector': 'bg-green-100 text-green-800'
};

export default function Jobs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);

  if (user?.type !== 'company') {
    navigate('/dashboard');
    return null;
  }

  const handleViewJob = (job) => {
    setSelectedJob(job);
  };

  const handleCloseJob = (jobId) => {
    alert(`Vaga ${jobId} foi finalizada!`);
  };

  const handlePauseJob = (jobId) => {
    alert(`Vaga ${jobId} foi pausada!`);
  };

  const handleEditJob = (jobId) => {
    alert(`Redirecionando para edição da vaga ${jobId}`);
  };

  const handleViewCandidates = (jobId) => {
    navigate(`/candidates?jobId=${jobId}`);
  };

  if (selectedJob) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedJob(null)}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft size={16} />
                  <span>Voltar</span>
                </Button>
                <span className="text-2xl font-bold text-talently-purple">Talently</span>
              </div>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Informações da Vaga */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{selectedJob.title}</CardTitle>
                      <CardDescription className="mt-2 flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <MapPin size={16} />
                          <span>{selectedJob.location} • {selectedJob.locationType}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <DollarSign size={16} />
                          <span>{selectedJob.salaryRange}</span>
                        </span>
                      </CardDescription>
                    </div>
                    <Badge className={STATUS_COLORS[selectedJob.status]}>
                      {selectedJob.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-talently-darkblue mb-2">Descrição da Vaga</h4>
                      <p className="text-gray-700">{selectedJob.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-talently-darkblue mb-2">Perguntas Qualificadoras</h4>
                      <ul className="space-y-2">
                        {selectedJob.qualifyingQuestions.map((question, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-talently-purple font-medium">{index + 1}.</span>
                            <span className="text-gray-700">{question}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar com Ações */}
            <div className="space-y-6">
              {/* Estatísticas */}
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Candidatos:</span>
                    <span className="font-semibold">{selectedJob.applicantsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Criada em:</span>
                    <span className="font-semibold">{new Date(selectedJob.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Perfil Desejado */}
              <Card>
                <CardHeader>
                  <CardTitle>Perfil Desejado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Perfil Cultural:</p>
                    <Badge className={CULTURAL_PROFILE_COLORS[selectedJob.culturalProfile]}>
                      {selectedJob.culturalProfile}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Perfil DISC:</p>
                    <Badge variant="outline">{selectedJob.discProfile}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Ações */}
              <Card>
                <CardHeader>
                  <CardTitle>Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => handleViewCandidates(selectedJob.id)}
                    className="w-full bg-talently-purple hover:bg-talently-purple/90"
                  >
                    <Users size={16} className="mr-2" />
                    Ver Candidatos ({selectedJob.applicantsCount})
                  </Button>
                  <Button 
                    onClick={() => handleEditJob(selectedJob.id)}
                    variant="outline"
                    className="w-full"
                  >
                    <Edit size={16} className="mr-2" />
                    Editar Vaga
                  </Button>
                  <Button 
                    onClick={() => handlePauseJob(selectedJob.id)}
                    variant="outline"
                    className="w-full"
                  >
                    Pausar Vaga
                  </Button>
                  <Button 
                    onClick={() => handleCloseJob(selectedJob.id)}
                    variant="destructive"
                    className="w-full"
                  >
                    <X size={16} className="mr-2" />
                    Finalizar Vaga
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Dashboard</span>
              </Button>
              <span className="text-2xl font-bold text-talently-purple">Talently</span>
            </div>
            <Button 
              onClick={() => alert('Funcionalidade de criar vaga em desenvolvimento')}
              className="bg-talently-purple hover:bg-talently-purple/90"
            >
              <Plus size={16} className="mr-2" />
              Nova Vaga
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-talently-darkblue mb-2">
            Minhas Vagas
          </h1>
          <p className="text-gray-600">
            Gerencie suas vagas abertas e visualize candidatos
          </p>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-talently-purple">{SAMPLE_JOBS.length}</div>
              <p className="text-sm text-gray-600">Total de Vagas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {SAMPLE_JOBS.filter(j => j.status === 'Ativa').length}
              </div>
              <p className="text-sm text-gray-600">Vagas Ativas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {SAMPLE_JOBS.reduce((acc, job) => acc + job.applicantsCount, 0)}
              </div>
              <p className="text-sm text-gray-600">Total de Candidatos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-talently-purple">
                {Math.round(SAMPLE_JOBS.reduce((acc, job) => acc + job.applicantsCount, 0) / SAMPLE_JOBS.length)}
              </div>
              <p className="text-sm text-gray-600">Média por Vaga</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Vagas */}
        <div className="grid gap-6">
          {SAMPLE_JOBS.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-talently-darkblue mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{job.location} • {job.locationType}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <DollarSign size={16} />
                        <span>{job.salaryRange}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>Criada em {new Date(job.createdAt).toLocaleDateString('pt-BR')}</span>
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={STATUS_COLORS[job.status]}>
                        {job.status}
                      </Badge>
                      <Badge className={CULTURAL_PROFILE_COLORS[job.culturalProfile]}>
                        {job.culturalProfile}
                      </Badge>
                      <Badge variant="outline">{job.discProfile}</Badge>
                    </div>
                  </div>
                  <div className="ml-6 text-center">
                    <div className="text-2xl font-bold text-talently-purple">{job.applicantsCount}</div>
                    <p className="text-sm text-gray-600">Candidatos</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleViewJob(job)}
                      variant="outline"
                    >
                      <Eye size={16} className="mr-1" />
                      Ver Detalhes
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleViewCandidates(job.id)}
                      className="bg-talently-purple hover:bg-talently-purple/90"
                    >
                      <Users size={16} className="mr-1" />
                      Ver Candidatos
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleEditJob(job.id)}
                      variant="ghost"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleCloseJob(job.id)}
                      variant="ghost"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
