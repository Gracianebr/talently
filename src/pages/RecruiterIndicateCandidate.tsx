import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { mockJobs } from "@/data/mockAdminData";
import { getJobCommission } from "@/data/mockRecruiterData";
import { ArrowLeft, Upload, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LanguageSelector from "@/components/LanguageSelector";

const RecruiterIndicateCandidate = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    jobArea: '',
    resume: null as File | null,
    observations: '',
    qualifyingAnswers: {} as Record<string, 'sim' | 'não'>
  });

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
      indicateCandidate: 'Indicar Candidato',
      candidateData: 'Dados do Candidato',
      name: 'Nome Completo',
      email: 'E-mail',
      phone: 'Telefone',
      city: 'Cidade',
      jobArea: 'Área de Atuação',
      resume: 'Currículo',
      selectFile: 'Selecionar arquivo',
      observations: 'Observações',
      observationsPlaceholder: 'Adicione suas observações sobre este candidato...',
      qualifyingQuestions: 'Perguntas Qualificadoras',
      yes: 'Sim',
      no: 'Não',
      commission: 'Comissão',
      submitIndication: 'Enviar Indicação',
      backToJob: 'Voltar à Vaga',
      fillAllFields: 'Preencha todos os campos obrigatórios',
      indicationSent: 'Indicação enviada com sucesso!',
      jobInfo: 'Informações da Vaga'
    },
    en: {
      indicateCandidate: 'Indicate Candidate',
      candidateData: 'Candidate Data',
      name: 'Full Name',
      email: 'E-mail',
      phone: 'Phone',
      city: 'City',
      jobArea: 'Work Area',
      resume: 'Resume',
      selectFile: 'Select file',
      observations: 'Observations',
      observationsPlaceholder: 'Add your observations about this candidate...',
      qualifyingQuestions: 'Qualifying Questions',
      yes: 'Yes',
      no: 'No',
      commission: 'Commission',
      submitIndication: 'Submit Indication',
      backToJob: 'Back to Job',
      fillAllFields: 'Fill all required fields',
      indicationSent: 'Indication sent successfully!',
      jobInfo: 'Job Information'
    },
    es: {
      indicateCandidate: 'Indicar Candidato',
      candidateData: 'Datos del Candidato',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      city: 'Ciudad',
      jobArea: 'Área de Trabajo',
      resume: 'Currículum',
      selectFile: 'Seleccionar archivo',
      observations: 'Observaciones',
      observationsPlaceholder: 'Agregar observaciones sobre este candidato...',
      qualifyingQuestions: 'Preguntas Clasificatorias',
      yes: 'Sí',
      no: 'No',
      commission: 'Comisión',
      submitIndication: 'Enviar Indicación',
      backToJob: 'Volver al Trabajo',
      fillAllFields: 'Completar todos los campos obligatorios',
      indicationSent: '¡Indicación enviada con éxito!',
      jobInfo: 'Información del Trabajo'
    }
  };

  const tr = translations[t] || translations.pt;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleQualifyingAnswer = (question: string, answer: 'sim' | 'não') => {
    setFormData(prev => ({
      ...prev,
      qualifyingAnswers: {
        ...prev.qualifyingAnswers,
        [question]: answer
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.city || !formData.jobArea || !formData.resume) {
      toast({
        title: "Erro",
        description: tr.fillAllFields,
        variant: "destructive"
      });
      return;
    }

    // Validate qualifying questions if they exist
    if (job.qualifyingQuestions && job.qualifyingQuestions.length > 0) {
      const unansweredQuestions = job.qualifyingQuestions.filter(
        question => !formData.qualifyingAnswers[question]
      );
      
      if (unansweredQuestions.length > 0) {
        toast({
          title: "Erro",
          description: "Responda todas as perguntas qualificadoras",
          variant: "destructive"
        });
        return;
      }
    }

    // Simulate form submission
    toast({
      title: "Sucesso!",
      description: tr.indicationSent
    });

    // Navigate back to jobs after successful submission
    setTimeout(() => {
      navigate('/recruiter/jobs');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/recruiter/job/${job.id}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {tr.backToJob}
            </Button>
            <h1 className="text-xl font-semibold">{tr.indicateCandidate}</h1>
          </div>
          <LanguageSelector />
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{tr.candidateData}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{tr.name} *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{tr.email} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">{tr.phone} *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">{tr.city} *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="jobArea">{tr.jobArea} *</Label>
                    <Select onValueChange={(value) => handleInputChange('jobArea', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a área" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Vendas">Vendas</SelectItem>
                        <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                        <SelectItem value="Financeiro">Financeiro</SelectItem>
                        <SelectItem value="Gestão">Gestão</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Dados">Dados</SelectItem>
                        <SelectItem value="Suporte">Suporte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="resume">{tr.resume} *</Label>
                    <div className="mt-1">
                      <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-600">
                            {formData.resume ? formData.resume.name : tr.selectFile}
                          </p>
                          <p className="text-xs text-gray-500">PDF, DOC, DOCX (máx. 10MB)</p>
                        </div>
                        <input
                          id="resume"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          required
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="observations">{tr.observations}</Label>
                    <Textarea
                      id="observations"
                      placeholder={tr.observationsPlaceholder}
                      value={formData.observations}
                      onChange={(e) => handleInputChange('observations', e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {job.qualifyingQuestions && job.qualifyingQuestions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>{tr.qualifyingQuestions}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {job.qualifyingQuestions.map((question, index) => (
                      <div key={index} className="space-y-2">
                        <Label className="text-sm font-medium">{question}</Label>
                        <RadioGroup
                          value={formData.qualifyingAnswers[question] || ''}
                          onValueChange={(value) => handleQualifyingAnswer(question, value as 'sim' | 'não')}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sim" id={`${index}-sim`} />
                            <Label htmlFor={`${index}-sim`}>{tr.yes}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="não" id={`${index}-nao`} />
                            <Label htmlFor={`${index}-nao`}>{tr.no}</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              <Button type="submit" className="w-full" size="lg">
                {tr.submitIndication}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{tr.commission}</CardTitle>
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
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{tr.jobInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h5 className="font-medium text-sm">Vaga</h5>
                  <p className="text-sm text-muted-foreground">{job.title}</p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">Empresa</h5>
                  <p className="text-sm text-muted-foreground">{job.companyName}</p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">Localização</h5>
                  <p className="text-sm text-muted-foreground">{job.location}</p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">Salário</h5>
                  <p className="text-sm text-muted-foreground">{job.salary}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterIndicateCandidate;