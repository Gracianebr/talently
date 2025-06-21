
import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, DollarSign, Calendar, Building, Upload, Clock, CheckCircle, AlertCircle } from "lucide-react";

// Vagas disponíveis para candidatura
const AVAILABLE_JOBS = [
  {
    id: 1,
    title: "Desenvolvedor Frontend React",
    company: "TechCorp",
    description: "Desenvolvedor experiente em React.js para atuar em projetos inovadores. Procuramos alguém com paixão por tecnologia e vontade de crescer em um ambiente colaborativo.",
    location: "São Paulo, SP",
    locationType: "Híbrido",
    salaryRange: "R$ 8.000 - R$ 12.000",
    requirements: [
      "Experiência com React.js e JavaScript",
      "Conhecimento em HTML5, CSS3 e TypeScript",
      "Experiência com Git e metodologias ágeis",
      "Inglês intermediário"
    ],
    benefits: [
      "Vale alimentação",
      "Plano de saúde",
      "Home office flexível",
      "Auxílio educação"
    ],
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
    company: "MarketPlus",
    description: "Profissional para gerenciar campanhas digitais e estratégias de growth. Oportunidade de trabalhar com as principais ferramentas do mercado.",
    location: "Rio de Janeiro, RJ",
    locationType: "Remoto",
    salaryRange: "R$ 5.000 - R$ 8.000",
    requirements: [
      "Experiência com Google Ads e Facebook Ads",
      "Conhecimento em Google Analytics",
      "Experiência em SEO/SEM",
      "Graduação em Marketing ou áreas afins"
    ],
    benefits: [
      "Trabalho 100% remoto",
      "Plano de saúde premium",
      "Participação nos lucros",
      "Cursos e certificações"
    ],
    culturalProfile: "Executora",
    discProfile: "Influente-Estável",
    qualifyingQuestions: [
      "Tem experiência com Google Ads?",
      "Conhece ferramentas de analytics?",
      "Já gerenciou orçamento de mídia?",
      "Tem portfolio de campanhas realizadas?"
    ]
  }
];

// Exemplo de convite de entrevista
const INTERVIEW_INVITE = {
  jobTitle: "Desenvolvedor Frontend React",
  company: "TechCorp",
  message: "Parabéns! Seu perfil foi selecionado para a próxima etapa do processo seletivo. Por favor, escolha um dos horários disponíveis para sua entrevista:",
  options: [
    { date: "2024-02-15", time: "14:00", formatted: "15 de Fevereiro, 14:00" },
    { date: "2024-02-16", time: "10:00", formatted: "16 de Fevereiro, 10:00" }
  ],
  interviewType: "Entrevista online via Google Meet"
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

export default function CandidateJobs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [selectedInterviewOption, setSelectedInterviewOption] = useState('');
  const [hasInterviewInvite, setHasInterviewInvite] = useState(true); // Simulando convite
  
  // Dados do formulário de candidatura
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    city: '',
    state: '',
    experience: '',
    education: '',
    skills: '',
    motivation: '',
    answers: ['', '', '', ''] // Para as perguntas qualificadoras
  });

  if (user?.type !== 'candidate') {
    navigate('/dashboard');
    return null;
  }

  const handleApplyToJob = (job) => {
    setSelectedJob(job);
    setIsApplicationOpen(true);
  };

  const handleSubmitApplication = () => {
    if (!applicationData.firstName || !applicationData.lastName || !applicationData.email || !applicationData.phone) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    alert(`Candidatura enviada com sucesso para a vaga: ${selectedJob.title}!`);
    setIsApplicationOpen(false);
    setSelectedJob(null);
  };

  const handleInterviewResponse = () => {
    if (!selectedInterviewOption) {
      alert('Por favor, selecione um horário para a entrevista.');
      return;
    }
    
    const selectedOption = INTERVIEW_INVITE.options.find(opt => `${opt.date}-${opt.time}` === selectedInterviewOption);
    alert(`Entrevista confirmada para ${selectedOption.formatted}!`);
    setHasInterviewInvite(false);
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
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Dashboard</span>
              </Button>
              <span className="text-2xl font-bold text-talently-purple">Talently</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-talently-darkblue mb-2">
            Vagas Disponíveis
          </h1>
          <p className="text-gray-600">
            Encontre oportunidades que combinam com seu perfil
          </p>
        </div>

        {/* Convite de Entrevista */}
        {hasInterviewInvite && (
          <Card className="mb-8 border-l-4 border-l-talently-purple bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-talently-purple">
                <Calendar size={20} />
                <span>Convite para Entrevista!</span>
              </CardTitle>
              <CardDescription className="text-talently-darkblue">
                {INTERVIEW_INVITE.company} - {INTERVIEW_INVITE.jobTitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{INTERVIEW_INVITE.message}</p>
              
              <div className="grid gap-3">
                {INTERVIEW_INVITE.options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="interviewOption"
                      value={`${option.date}-${option.time}`}
                      checked={selectedInterviewOption === `${option.date}-${option.time}`}
                      onChange={(e) => setSelectedInterviewOption(e.target.value)}
                      className="text-talently-purple"
                    />
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-talently-purple" />
                      <span className="font-medium">{option.formatted}</span>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <AlertCircle size={16} />
                <span>{INTERVIEW_INVITE.interviewType}</span>
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={handleInterviewResponse}
                  className="bg-talently-purple hover:bg-talently-purple/90"
                  disabled={!selectedInterviewOption}
                >
                  <CheckCircle size={16} className="mr-2" />
                  Confirmar Entrevista
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setHasInterviewInvite(false)}
                >
                  Recusar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Vagas */}
        <div className="grid gap-6">
          {AVAILABLE_JOBS.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-talently-darkblue mb-1">{job.title}</h3>
                      <div className="flex items-center space-x-1 text-gray-600 mb-2">
                        <Building size={16} />
                        <span className="font-medium">{job.company}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleApplyToJob(job)}
                      className="bg-talently-purple hover:bg-talently-purple/90 shrink-0"
                    >
                      Candidatar-se
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{job.location} • {job.locationType}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <DollarSign size={16} />
                      <span>{job.salaryRange}</span>
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className={CULTURAL_PROFILE_COLORS[job.culturalProfile]}>
                      {job.culturalProfile}
                    </Badge>
                    <Badge variant="outline">{job.discProfile}</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-talently-darkblue mb-2">Requisitos:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-talently-purple">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-talently-darkblue mb-2">Benefícios:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {job.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-green-600">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal de Candidatura */}
        <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Candidatar-se para: {selectedJob?.title}</DialogTitle>
              <DialogDescription>
                Preencha seus dados para se candidatar a esta vaga
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              {/* Dados Pessoais */}
              <div>
                <h3 className="text-lg font-semibold text-talently-darkblue mb-4">Dados Pessoais</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nome *</Label>
                    <Input
                      id="firstName"
                      value={applicationData.firstName}
                      onChange={(e) => setApplicationData({...applicationData, firstName: e.target.value})}
                      placeholder="Seu primeiro nome"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Sobrenome *</Label>
                    <Input
                      id="lastName"
                      value={applicationData.lastName}
                      onChange={(e) => setApplicationData({...applicationData, lastName: e.target.value})}
                      placeholder="Seu sobrenome"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={applicationData.email}
                      onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      value={applicationData.phone}
                      onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={applicationData.linkedin}
                      onChange={(e) => setApplicationData({...applicationData, linkedin: e.target.value})}
                      placeholder="https://linkedin.com/in/seu-perfil"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={applicationData.city}
                      onChange={(e) => setApplicationData({...applicationData, city: e.target.value})}
                      placeholder="Sua cidade"
                    />
                  </div>
                </div>
              </div>

              {/* Experiência e Formação */}
              <div>
                <h3 className="text-lg font-semibold text-talently-darkblue mb-4">Experiência e Formação</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="experience">Experiência Profissional</Label>
                    <Textarea
                      id="experience"
                      value={applicationData.experience}
                      onChange={(e) => setApplicationData({...applicationData, experience: e.target.value})}
                      placeholder="Descreva sua experiência profissional relevante..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="education">Formação Acadêmica</Label>
                    <Textarea
                      id="education"
                      value={applicationData.education}
                      onChange={(e) => setApplicationData({...applicationData, education: e.target.value})}
                      placeholder="Descreva sua formação acadêmica..."
                      className="min-h-[80px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="skills">Principais Habilidades</Label>
                    <Textarea
                      id="skills"
                      value={applicationData.skills}
                      onChange={(e) => setApplicationData({...applicationData, skills: e.target.value})}
                      placeholder="Liste suas principais habilidades técnicas e comportamentais..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>

              {/* Currículo */}
              <div>
                <h3 className="text-lg font-semibold text-talently-darkblue mb-4">Currículo</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="mb-2">Clique para fazer upload do seu currículo</p>
                  <p className="text-sm text-gray-500">PDF, DOC ou DOCX (máx. 5MB)</p>
                  <Button variant="outline" className="mt-3">
                    Selecionar Arquivo
                  </Button>
                </div>
              </div>

              {/* Perguntas Qualificadoras */}
              {selectedJob && (
                <div>
                  <h3 className="text-lg font-semibold text-talently-darkblue mb-4">Perguntas Qualificadoras</h3>
                  <div className="space-y-4">
                    {selectedJob.qualifyingQuestions.map((question, index) => (
                      <div key={index}>
                        <Label htmlFor={`question-${index}`} className="mb-2 block">
                          {index + 1}. {question}
                        </Label>
                        <Textarea
                          id={`question-${index}`}
                          value={applicationData.answers[index]}
                          onChange={(e) => {
                            const newAnswers = [...applicationData.answers];
                            newAnswers[index] = e.target.value;
                            setApplicationData({...applicationData, answers: newAnswers});
                          }}
                          placeholder="Sua resposta..."
                          className="min-h-[60px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Motivação */}
              <div>
                <Label htmlFor="motivation">Por que você tem interesse nesta vaga?</Label>
                <Textarea
                  id="motivation"
                  value={applicationData.motivation}
                  onChange={(e) => setApplicationData({...applicationData, motivation: e.target.value})}
                  placeholder="Conte-nos o que te motiva a se candidatar para esta posição..."
                  className="min-h-[100px]"
                />
              </div>

              {/* Botões */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsApplicationOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSubmitApplication}
                  className="bg-talently-purple hover:bg-talently-purple/90"
                >
                  Enviar Candidatura
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
