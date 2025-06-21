import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Linkedin, FileText, Eye, Download, MapPin, Calendar, GraduationCap, Languages, Briefcase, Clock, X, Star } from "lucide-react";

// Vagas disponíveis para seleção
const AVAILABLE_JOBS = [
  { id: 1, title: "Desenvolvedor Frontend React", applicantsCount: 12 },
  { id: 2, title: "Analista de Marketing Digital", applicantsCount: 8 },
  { id: 3, title: "Gerente de Recursos Humanos", applicantsCount: 15 }
];

// Dados de exemplo de candidatos
const SAMPLE_CANDIDATES = [
  {
    id: 1,
    firstName: "Ana",
    lastName: "Silva",
    email: "ana.silva@email.com",
    phone: "(11) 99999-1234",
    linkedin: "linkedin.com/in/anasilva",
    city: "São Paulo",
    state: "SP",
    culturalProfile: "Exploradora",
    culturalMatch: 92,
    discProfile: "Dominante-Influente",
    education: [
      { type: "Superior", course: "Administração", institution: "USP", year: "2020" },
      { type: "Curso Livre", course: "Marketing Digital", institution: "ESPM", year: "2021" }
    ],
    experiences: [
      { company: "Tech Corp", role: "Analista de Marketing", period: "2022-2024" },
      { company: "StartupX", role: "Assistente de Marketing", period: "2021-2022" },
      { company: "Agência ABC", role: "Estagiária", period: "2020-2021" }
    ],
    languages: ["Português (Nativo)", "Inglês (Avançado)", "Espanhol (Intermediário)"],
    resumeUrl: "/sample-resume-ana.pdf",
    hasResume: true
  },
  {
    id: 2,
    firstName: "Carlos",
    lastName: "Santos",
    email: "carlos.santos@email.com",
    phone: "(11) 98888-5678",
    linkedin: "linkedin.com/in/carlossantos",
    city: "Rio de Janeiro",
    state: "RJ",
    culturalProfile: "Executor",
    culturalMatch: 88,
    discProfile: "Dominante-Estável",
    education: [
      { type: "Superior", course: "Engenharia de Software", institution: "PUC-RJ", year: "2019" },
      { type: "Pós-graduação", course: "Gestão de Projetos", institution: "FGV", year: "2022" }
    ],
    experiences: [
      { company: "DevCompany", role: "Desenvolvedor Senior", period: "2023-2024" },
      { company: "SoftwarePlus", role: "Desenvolvedor Pleno", period: "2021-2023" },
      { company: "CodeStart", role: "Desenvolvedor Junior", period: "2019-2021" }
    ],
    languages: ["Português (Nativo)", "Inglês (Fluente)", "Francês (Básico)"],
    resumeUrl: "/sample-resume-carlos.pdf",
    hasResume: true
  },
  {
    id: 3,
    firstName: "Maria",
    lastName: "Oliveira",
    email: "maria.oliveira@email.com",
    phone: "(11) 97777-9012",
    linkedin: "linkedin.com/in/mariaoliveira",
    city: "Belo Horizonte",
    state: "MG",
    culturalProfile: "Conectora",
    culturalMatch: 95,
    discProfile: "Influente-Estável",
    education: [
      { type: "Superior", course: "Psicologia", institution: "UFMG", year: "2018" },
      { type: "Especialização", course: "Recursos Humanos", institution: "PUC-MG", year: "2020" }
    ],
    experiences: [
      { company: "RH Inovador", role: "Analista de RH Sênior", period: "2022-2024" },
      { company: "Consultoria Pessoas", role: "Analista de RH", period: "2020-2022" },
      { company: "Empresa Tradicional", role: "Assistente de RH", period: "2018-2020" }
    ],
    languages: ["Português (Nativo)", "Inglês (Intermediário)", "Italiano (Básico)"],
    resumeUrl: "/sample-resume-maria.pdf",
    hasResume: true
  }
];

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

export default function Candidates() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(searchParams.get('jobId') || null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleOptions, setScheduleOptions] = useState([
    { date: '', time: '' },
    { date: '', time: '' }
  ]);
  const [interestLevel, setInterestLevel] = useState([70]);
  const [feedback, setFeedback] = useState('');
  const [hasEvaluated, setHasEvaluated] = useState(false);

  if (user?.type !== 'company') {
    navigate('/dashboard');
    return null;
  }

  const getMatchColor = (match) => {
    if (match >= 90) return 'text-green-600 font-bold';
    if (match >= 70) return 'text-orange-600 font-semibold';
    return 'text-red-600';
  };

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setShowScheduleForm(false);
    setScheduleOptions([{ date: '', time: '' }, { date: '', time: '' }]);
  };

  const handleDownloadResume = (candidate) => {
    // Simular download do currículo
    alert(`Download do currículo de ${candidate.firstName} ${candidate.lastName} iniciado!`);
  };

  const handleScheduleInterview = () => {
    setShowScheduleForm(true);
  };

  const handleScheduleOptionChange = (index, field, value) => {
    const newOptions = [...scheduleOptions];
    newOptions[index][field] = value;
    setScheduleOptions(newOptions);
  };

  const handleRemoveScheduleOption = (index) => {
    if (scheduleOptions.length > 1) {
      const newOptions = scheduleOptions.filter((_, i) => i !== index);
      setScheduleOptions(newOptions);
    }
  };

  const handleAddScheduleOption = () => {
    if (scheduleOptions.length < 2) {
      setScheduleOptions([...scheduleOptions, { date: '', time: '' }]);
    }
  };

  const handleConfirmSchedule = () => {
    const validOptions = scheduleOptions.filter(opt => opt.date && opt.time);
    if (validOptions.length > 0) {
      alert(`Opções de entrevista enviadas para ${selectedCandidate.firstName} ${selectedCandidate.lastName}:\n${validOptions.map((opt, i) => `Opção ${i + 1}: ${opt.date} às ${opt.time}`).join('\n')}`);
      setShowScheduleForm(false);
      setScheduleOptions([{ date: '', time: '' }, { date: '', time: '' }]);
    } else {
      alert('Por favor, preencha pelo menos uma opção de data e horário.');
    }
  };

  const handleSaveEvaluation = () => {
    if (selectedCandidate) {
      alert(`Avaliação salva para ${selectedCandidate.firstName} ${selectedCandidate.lastName}:\nNível de Interesse: ${interestLevel[0]}%\nFeedback: ${feedback || 'Nenhum feedback fornecido'}`);
      setHasEvaluated(true);
    }
  };

  const getInterestColor = (level) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getInterestLabel = (level) => {
    if (level >= 80) return 'Alto Interesse';
    if (level >= 50) return 'Interesse Moderado';
    return 'Baixo Interesse';
  };

  const selectedJob = AVAILABLE_JOBS.find(job => job.id === parseInt(selectedJobId));

  // Se não há vaga selecionada, mostrar seletor de vagas
  if (!selectedJobId) {
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

        {/* Job Selection */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-talently-darkblue mb-2">
              Selecione uma Vaga
            </h1>
            <p className="text-gray-600">
              Escolha a vaga para visualizar os candidatos inscritos
            </p>
          </div>

          <div className="grid gap-4">
            {AVAILABLE_JOBS.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedJobId(job.id.toString())}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-talently-darkblue mb-2">{job.title}</h3>
                      <p className="text-gray-600">
                        {job.applicantsCount} candidatos inscritos
                      </p>
                    </div>
                    <div className="text-right">
                      <Button className="bg-talently-purple hover:bg-talently-purple/90">
                        Ver Candidatos
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

  if (selectedCandidate) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedCandidate(null)}
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

        {/* Candidate Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Informações Básicas */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="text-talently-purple" size={24} />
                    <span>{selectedCandidate.firstName} {selectedCandidate.lastName}</span>
                  </CardTitle>
                  <CardDescription>Informações do Candidato</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-500" />
                    <span className="text-sm">{selectedCandidate.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-500" />
                    <span className="text-sm">{selectedCandidate.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Linkedin size={16} className="text-gray-500" />
                    <a href={`https://${selectedCandidate.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      {selectedCandidate.linkedin}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-sm">{selectedCandidate.city}, {selectedCandidate.state}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Avaliação de Interesse */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="text-talently-purple" size={20} />
                    <span>Avaliação de Interesse</span>
                  </CardTitle>
                  <CardDescription>Avalie seu interesse neste candidato</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Nível de Interesse: {interestLevel[0]}%
                    </Label>
                    <Slider
                      value={interestLevel}
                      onValueChange={setInterestLevel}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span className={getInterestColor(interestLevel[0])}>
                        {getInterestLabel(interestLevel[0])}
                      </span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="feedback" className="text-sm font-medium mb-2 block">
                      Feedback {interestLevel[0] < 50 && <span className="text-red-500">*</span>}
                    </Label>
                    <Textarea
                      id="feedback"
                      placeholder={interestLevel[0] < 50 ? "Por favor, informe o motivo do baixo interesse..." : "Comentários adicionais sobre o candidato (opcional)"}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>

                  <Button 
                    onClick={handleSaveEvaluation}
                    className="w-full bg-talently-purple hover:bg-talently-purple/90"
                    disabled={interestLevel[0] < 50 && !feedback.trim()}
                  >
                    {hasEvaluated ? 'Atualizar Avaliação' : 'Salvar Avaliação'}
                  </Button>
                </CardContent>
              </Card>

              {/* Perfil Cultural */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Fit Cultural</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-3xl font-bold text-talently-purple">
                      {selectedCandidate.culturalMatch}%
                    </div>
                    <Badge className={CULTURAL_PROFILE_COLORS[selectedCandidate.culturalProfile]}>
                      {selectedCandidate.culturalProfile}
                    </Badge>
                    <p className="text-sm text-gray-600">
                      Perfil DISC: {selectedCandidate.discProfile}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Currículo */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="text-talently-purple" size={20} />
                    <span>Currículo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => handleDownloadResume(selectedCandidate)}
                    className="w-full bg-talently-purple hover:bg-talently-purple/90"
                  >
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </Button>

                  {/* Agendar Entrevista */}
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-talently-darkblue mb-3 flex items-center">
                      <Calendar className="mr-2" size={16} />
                      Agendar Entrevista
                    </h4>
                    
                    {!showScheduleForm ? (
                      <Button 
                        onClick={handleScheduleInterview}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        <Clock size={16} className="mr-2" />
                        Agendar
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          Disponibilize até 2 opções de data e horário para o candidato escolher:
                        </p>
                        
                        {scheduleOptions.map((option, index) => (
                          <div key={index} className="p-3 border rounded-lg bg-gray-50">
                            <div className="flex justify-between items-center mb-2">
                              <Label className="text-sm font-medium">Opção {index + 1}</Label>
                              {scheduleOptions.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveScheduleOption(index)}
                                  className="h-6 w-6 p-0"
                                >
                                  <X size={12} />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label className="text-xs text-gray-500">Data</Label>
                                <Input
                                  type="date"
                                  value={option.date}
                                  onChange={(e) => handleScheduleOptionChange(index, 'date', e.target.value)}
                                  className="text-sm"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-gray-500">Horário</Label>
                                <Input
                                  type="time"
                                  value={option.time}
                                  onChange={(e) => handleScheduleOptionChange(index, 'time', e.target.value)}
                                  className="text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        {scheduleOptions.length < 2 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleAddScheduleOption}
                            className="w-full"
                          >
                            + Adicionar outra opção
                          </Button>
                        )}

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => setShowScheduleForm(false)}
                            className="flex-1"
                          >
                            Cancelar
                          </Button>
                          <Button
                            onClick={handleConfirmSchedule}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                          >
                            Enviar Convite
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detalhes Profissionais */}
            <div className="lg:col-span-2 space-y-6">
              {/* Experiências */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="text-talently-purple" size={20} />
                    <span>Experiências Profissionais</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedCandidate.experiences.map((exp, index) => (
                      <div key={index} className="border-l-2 border-talently-purple pl-4">
                        <h4 className="font-semibold text-talently-darkblue">{exp.role}</h4>
                        <p className="text-gray-700">{exp.company}</p>
                        <p className="text-sm text-gray-500">{exp.period}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Formação */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="text-talently-purple" size={20} />
                    <span>Formação Acadêmica</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedCandidate.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-green-500 pl-4">
                        <h4 className="font-semibold text-talently-darkblue">{edu.course}</h4>
                        <p className="text-gray-700">{edu.institution}</p>
                        <div className="flex justify-between">
                          <Badge variant="outline">{edu.type}</Badge>
                          <span className="text-sm text-gray-500">{edu.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Idiomas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Languages className="text-talently-purple" size={20} />
                    <span>Idiomas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.languages.map((language, index) => (
                      <Badge key={index} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
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
                onClick={() => setSelectedJobId(null)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Vagas</span>
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
            Candidatos - {selectedJob?.title}
          </h1>
          <p className="text-gray-600">
            {selectedJob?.applicantsCount} candidatos inscritos nesta vaga
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-talently-purple">{SAMPLE_CANDIDATES.length}</div>
              <p className="text-sm text-gray-600">Total de Candidatos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {SAMPLE_CANDIDATES.filter(c => c.culturalMatch >= 90).length}
              </div>
              <p className="text-sm text-gray-600">Match Alto (90%+)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {SAMPLE_CANDIDATES.filter(c => c.culturalMatch >= 70 && c.culturalMatch < 90).length}
              </div>
              <p className="text-sm text-gray-600">Match Médio (70-89%)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-talently-purple">
                {SAMPLE_CANDIDATES.filter(c => c.hasResume).length}
              </div>
              <p className="text-sm text-gray-600">Com Currículo</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Candidatos */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Candidatos</CardTitle>
            <CardDescription>
              Candidatos ordenados por compatibilidade cultural
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Perfil Cultural</TableHead>
                  <TableHead>Match</TableHead>
                  <TableHead>Currículo</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SAMPLE_CANDIDATES
                  .sort((a, b) => b.culturalMatch - a.culturalMatch)
                  .map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-medium">
                      {candidate.firstName} {candidate.lastName}
                    </TableCell>
                    <TableCell>
                      {candidate.city}, {candidate.state}
                    </TableCell>
                    <TableCell>
                      <Badge className={CULTURAL_PROFILE_COLORS[candidate.culturalProfile]}>
                        {candidate.culturalProfile}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={getMatchColor(candidate.culturalMatch)}>
                        {candidate.culturalMatch}%
                      </span>
                    </TableCell>
                    <TableCell>
                      {candidate.hasResume ? (
                        <Badge className="bg-green-100 text-green-800">Disponível</Badge>
                      ) : (
                        <Badge variant="outline">Não enviado</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handleViewCandidate(candidate)}
                        className="bg-talently-purple hover:bg-talently-purple/90"
                      >
                        <Eye size={16} className="mr-1" />
                        Ver Perfil
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
