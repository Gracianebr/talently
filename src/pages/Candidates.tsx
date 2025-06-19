
import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Linkedin, FileText, Eye, Download, MapPin, Calendar, GraduationCap, Languages } from "lucide-react";

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
  const [selectedCandidate, setSelectedCandidate] = useState(null);

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
  };

  const handleDownloadResume = (candidate) => {
    // Simular download do currículo
    alert(`Download do currículo de ${candidate.firstName} ${candidate.lastName} iniciado!`);
  };

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
                <CardContent>
                  <Button 
                    onClick={() => handleDownloadResume(selectedCandidate)}
                    className="w-full bg-talently-purple hover:bg-talently-purple/90"
                  >
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </Button>
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
            Candidatos Disponíveis
          </h1>
          <p className="text-gray-600">
            Visualize os candidatos compatíveis com o perfil cultural da sua empresa
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
