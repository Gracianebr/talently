import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockAdminData";
import { getJobCommission } from "@/data/mockRecruiterData";
import { MapPin, DollarSign, Users, Building, ArrowLeft } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";

const RecruiterJobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (!user || user.type !== 'recruiter') {
    navigate('/login');
    return null;
  }

  const job = mockJobs.find(j => j.id === id);
  
  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Vaga não encontrada</p>
      </div>
    );
  }

  const commission = getJobCommission(job.id);

  const translations = {
    pt: {
      jobDetails: 'Detalhes da Vaga',
      commission: 'Comissão',
      applications: 'Candidaturas',
      company: 'Empresa',
      location: 'Localização',
      salary: 'Salário',
      type: 'Tipo',
      description: 'Descrição',
      requirements: 'Requisitos',
      responsibilities: 'Responsabilidades',
      benefits: 'Benefícios',
      qualifyingQuestions: 'Perguntas Qualificadoras',
      indicateCandidate: 'Indicar Candidato',
      backToJobs: 'Voltar às Vagas',
      notSpecified: 'Não especificado'
    },
    en: {
      jobDetails: 'Job Details',
      commission: 'Commission',
      applications: 'Applications',
      company: 'Company',
      location: 'Location',
      salary: 'Salary',
      type: 'Type',
      description: 'Description',
      requirements: 'Requirements',
      responsibilities: 'Responsibilities',
      benefits: 'Benefits',
      qualifyingQuestions: 'Qualifying Questions',
      indicateCandidate: 'Indicate Candidate',
      backToJobs: 'Back to Jobs',
      notSpecified: 'Not specified'
    },
    es: {
      jobDetails: 'Detalles del Trabajo',
      commission: 'Comisión',
      applications: 'Aplicaciones',
      company: 'Empresa',
      location: 'Ubicación',
      salary: 'Salario',
      type: 'Tipo',
      description: 'Descripción',
      requirements: 'Requisitos',
      responsibilities: 'Responsabilidades',
      benefits: 'Beneficios',
      qualifyingQuestions: 'Preguntas Clasificatorias',
      indicateCandidate: 'Indicar Candidato',
      backToJobs: 'Volver a Trabajos',
      notSpecified: 'No especificado'
    }
  };

  const tr = translations[t] || translations.pt;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/recruiter/jobs')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {tr.backToJobs}
            </Button>
            <h1 className="text-xl font-semibold">{tr.jobDetails}</h1>
          </div>
          <LanguageSelector />
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        {job.companyName}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                  <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                    {job.type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1">{tr.salary}</h4>
                    <p className="text-sm text-muted-foreground">{job.salary}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{tr.applications}</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {job.applications}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">{tr.description}</h4>
                  <p className="text-sm text-muted-foreground">{job.description}</p>
                </div>

                {job.requirements && (
                  <div>
                    <h4 className="font-medium mb-2">{tr.requirements}</h4>
                    <p className="text-sm text-muted-foreground">{job.requirements}</p>
                  </div>
                )}

                {job.responsibilities && (
                  <div>
                    <h4 className="font-medium mb-2">{tr.responsibilities}</h4>
                    <p className="text-sm text-muted-foreground">{job.responsibilities}</p>
                  </div>
                )}

                {job.benefits && (
                  <div>
                    <h4 className="font-medium mb-2">{tr.benefits}</h4>
                    <p className="text-sm text-muted-foreground">{job.benefits}</p>
                  </div>
                )}

                {job.qualifyingQuestions && job.qualifyingQuestions.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">{tr.qualifyingQuestions}</h4>
                    <ul className="space-y-1">
                      {job.qualifyingQuestions.map((question, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{tr.commission}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-green-600 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 mr-1" />
                    R$ {commission.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Comissão paga após 100 dias de trabalho do candidato
                  </p>
                  <Button 
                    className="w-full" 
                    onClick={() => navigate(`/recruiter/job/${job.id}/indicate`)}
                  >
                    {tr.indicateCandidate}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações da Vaga</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h5 className="font-medium text-sm">{tr.company}</h5>
                  <p className="text-sm text-muted-foreground">{job.companyName}</p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">{tr.location}</h5>
                  <p className="text-sm text-muted-foreground">{job.location}</p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">{tr.type}</h5>
                  <p className="text-sm text-muted-foreground">{job.type}</p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">Data de Criação</h5>
                  <p className="text-sm text-muted-foreground">
                    {job.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterJobDetails;