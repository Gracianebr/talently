import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  getRecruiterStats, 
  mockRecruiterCandidates, 
  mockRecruiterCommissions,
  jobsWithCommission
} from "@/data/mockRecruiterData";
import { mockJobs } from "@/data/mockAdminData";
import { Users, TrendingUp, DollarSign, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector";

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (!user || user.type !== 'recruiter') {
    navigate('/login');
    return null;
  }

  const recruiterId = user.profile?.id || '1';
  const stats = getRecruiterStats(recruiterId);
  const recruiterCandidates = mockRecruiterCandidates.filter(c => c.recruiterId === recruiterId);
  const recruiterCommissions = mockRecruiterCommissions.filter(c => c.recruiterId === recruiterId);
  const candidatesInHiring = recruiterCandidates.filter(c => 
    ['Selecionado', 'Em contratação', 'Contratado'].includes(c.status)
  );

  const translations = {
    pt: {
      dashboard: 'Dashboard do Recrutador',
      totalIndicated: 'Total Indicados',
      approved: 'Aprovados',
      rejected: 'Reprovados',
      inProcess: 'Em Processo',
      hired: 'Contratados',
      totalBalance: 'Saldo Total a Receber',
      potentialBalance: 'Saldo Potencial',
      availableJobs: 'Vagas Disponíveis',
      candidatesInHiring: 'Candidatos em Contratação',
      generalMetrics: 'Métricas Gerais',
      viewJobs: 'Ver Vagas',
      candidate: 'Candidato',
      job: 'Vaga',
      status: 'Status',
      startDate: 'Data de Início',
      commission: 'Comissão',
      paymentStatus: 'Status Pagamento',
      selected: 'Selecionado',
      inHiring: 'Em contratação',
      started: 'Iniciou trabalho',
      pending: 'Pendente',
      inProgress: 'Em andamento',
      paid: 'Pago'
    },
    en: {
      dashboard: 'Recruiter Dashboard',
      totalIndicated: 'Total Indicated',
      approved: 'Approved',
      rejected: 'Rejected',
      inProcess: 'In Process',
      hired: 'Hired',
      totalBalance: 'Total Balance to Receive',
      potentialBalance: 'Potential Balance',
      availableJobs: 'Available Jobs',
      candidatesInHiring: 'Candidates in Hiring',
      generalMetrics: 'General Metrics',
      viewJobs: 'View Jobs',
      candidate: 'Candidate',
      job: 'Job',
      status: 'Status',
      startDate: 'Start Date',
      commission: 'Commission',
      paymentStatus: 'Payment Status',
      selected: 'Selected',
      inHiring: 'In hiring',
      started: 'Started work',
      pending: 'Pending',
      inProgress: 'In Progress',
      paid: 'Paid'
    },
    es: {
      dashboard: 'Panel del Reclutador',
      totalIndicated: 'Total Indicados',
      approved: 'Aprobados',
      rejected: 'Rechazados',
      inProcess: 'En Proceso',
      hired: 'Contratados',
      totalBalance: 'Saldo Total a Recibir',
      potentialBalance: 'Saldo Potencial',
      availableJobs: 'Trabajos Disponibles',
      candidatesInHiring: 'Candidatos en Contratación',
      generalMetrics: 'Métricas Generales',
      viewJobs: 'Ver Trabajos',
      candidate: 'Candidato',
      job: 'Trabajo',
      status: 'Estado',
      startDate: 'Fecha de Inicio',
      commission: 'Comisión',
      paymentStatus: 'Estado del Pago',
      selected: 'Seleccionado',
      inHiring: 'En contratación',
      started: 'Comenzó a trabajar',
      pending: 'Pendiente',
      inProgress: 'En Progreso',
      paid: 'Pagado'
    }
  };

  const currentLang = (localStorage.getItem('language') || 'pt') as 'pt' | 'en' | 'es';
  const tr = translations[currentLang];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'Selecionado': { variant: 'default' as const, text: tr.selected },
      'Em contratação': { variant: 'secondary' as const, text: tr.inHiring },
      'Contratado': { variant: 'default' as const, text: tr.started }
    };
    
    const statusConfig = statusMap[status as keyof typeof statusMap];
    return (
      <Badge variant={statusConfig?.variant || 'outline'}>
        {statusConfig?.text || status}
      </Badge>
    );
  };

  const getCommissionStatusBadge = (status: string) => {
    const statusMap = {
      'Pendente': { variant: 'outline' as const, text: tr.pending },
      'Em andamento': { variant: 'secondary' as const, text: tr.inProgress },
      'Pago': { variant: 'default' as const, text: tr.paid }
    };
    
    const statusConfig = statusMap[status as keyof typeof statusMap];
    return (
      <Badge variant={statusConfig?.variant || 'outline'}>
        {statusConfig?.text || status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 justify-between">
          <h1 className="text-xl font-semibold">{tr.dashboard}</h1>
          <LanguageSelector />
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{tr.totalIndicated}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalIndicados}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{tr.totalBalance}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {stats.saldoTotalReceber.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{tr.potentialBalance}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {stats.saldoPotencial.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{tr.hired}</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.contratados}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{stats.aprovados}</div>
              <p className="text-xs text-muted-foreground">{tr.approved}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">{stats.reprovados}</div>
              <p className="text-xs text-muted-foreground">{tr.rejected}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">{stats.emProcesso}</div>
              <p className="text-xs text-muted-foreground">{tr.inProcess}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Button onClick={() => navigate('/recruiter/jobs')} className="w-full">
                {tr.viewJobs}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="candidates" className="w-full">
          <TabsList>
            <TabsTrigger value="candidates">{tr.candidatesInHiring}</TabsTrigger>
            <TabsTrigger value="metrics">{tr.generalMetrics}</TabsTrigger>
          </TabsList>

          <TabsContent value="candidates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{tr.candidatesInHiring}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidatesInHiring.map((candidate) => {
                    const job = mockJobs.find(j => j.id === candidate.appliedJobs[0]);
                    const commission = recruiterCommissions.find(c => c.candidateId === candidate.id);
                    
                    return (
                      <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">{job?.title}</p>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(candidate.status)}
                            {candidate.contractStartDate && (
                              <span className="text-xs text-muted-foreground">
                                {tr.startDate}: {candidate.contractStartDate.toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-medium">R$ {commission?.commissionValue.toLocaleString()}</p>
                          {commission && getCommissionStatusBadge(commission.status)}
                        </div>
                      </div>
                    );
                  })}
                  {candidatesInHiring.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">
                      Nenhum candidato em processo de contratação.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo de Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Taxa de Aprovação:</span>
                    <span className="font-medium">
                      {stats.totalIndicados > 0 ? 
                        Math.round((stats.aprovados / stats.totalIndicados) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de Contratação:</span>
                    <span className="font-medium">
                      {stats.totalIndicados > 0 ? 
                        Math.round((stats.contratados / stats.totalIndicados) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comissão Média:</span>
                    <span className="font-medium">
                      R$ {recruiterCommissions.length > 0 ? 
                        Math.round(recruiterCommissions.reduce((sum, c) => sum + c.commissionValue, 0) / recruiterCommissions.length).toLocaleString() : 0}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vagas com Maior Comissão</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {jobsWithCommission
                      .sort((a, b) => b.commissionValue - a.commissionValue)
                      .slice(0, 5)
                      .map((job) => (
                        <div key={job.jobId} className="flex justify-between text-sm">
                          <span className="truncate">{job.jobTitle}</span>
                          <span className="font-medium">R$ {job.commissionValue.toLocaleString()}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RecruiterDashboard;