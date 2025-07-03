
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Download, CheckCircle, XCircle, User, Search } from 'lucide-react';
import { mockJobs, mockCandidates, MockCandidate } from '@/data/mockAdminData';
import CandidateFullView from '@/components/admin/CandidateFullView';

const JobCandidates = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const job = mockJobs.find(j => j.id === jobId);
  const [candidates, setCandidates] = useState<MockCandidate[]>(
    mockCandidates.filter(candidate => 
      candidate.applications.includes(jobId || '')
    )
  );
  
  // Novos estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<MockCandidate | null>(null);

  // Filtrar candidatos
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vaga não encontrada</h2>
        <Button onClick={() => navigate('/admin/jobs')}>
          <ArrowLeft className="mr-2" size={16} />
          Voltar para Vagas
        </Button>
      </div>
    );
  }

  const handleStatusChange = (candidateId: string, newStatus: MockCandidate['status']) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, status: newStatus }
        : candidate
    ));
    
    const candidate = candidates.find(c => c.id === candidateId);
    toast({
      title: `Candidato ${newStatus.toLowerCase()}`,
      description: `${candidate?.name} foi marcado como ${newStatus.toLowerCase()}.`,
    });
  };

  const handleDownloadResume = (candidateName: string, resumeFile?: string) => {
    if (!resumeFile) {
      toast({
        title: "Currículo não disponível",
        description: `${candidateName} ainda não enviou o currículo.`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Download iniciado",
      description: `Baixando currículo de ${candidateName}...`,
    });
  };

  const getStatusBadge = (status: MockCandidate['status']) => {
    const styles = {
      'Pré-aprovado': 'bg-green-100 text-green-800',
      'Reprovado': 'bg-red-100 text-red-800',
      'Em avaliação': 'bg-yellow-100 text-yellow-800',
      'Contratado': 'bg-blue-100 text-blue-800'
    };
    
    return (
      <Badge className={styles[status]}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/jobs')}
          >
            <ArrowLeft className="mr-2" size={16} />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-gray-500">{job.companyName} • {job.location}</p>
          </div>
        </div>
      </div>

      {/* Job Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Total de Candidatos</label>
              <p className="text-2xl font-bold text-talently-purple">{filteredCandidates.length}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Pré-aprovados</label>
              <p className="text-2xl font-bold text-green-600">
                {filteredCandidates.filter(c => c.status === 'Pré-aprovado').length}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Em Avaliação</label>
              <p className="text-2xl font-bold text-yellow-600">
                {filteredCandidates.filter(c => c.status === 'Em avaliação').length}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Contratados</label>
              <p className="text-2xl font-bold text-blue-600">
                {filteredCandidates.filter(c => c.status === 'Contratado').length}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Reprovados</label>
              <p className="text-2xl font-bold text-red-600">
                {filteredCandidates.filter(c => c.status === 'Reprovado').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Buscar candidato por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="Pré-aprovado">Pré-aprovado</SelectItem>
                <SelectItem value="Em avaliação">Em avaliação</SelectItem>
                <SelectItem value="Contratado">Contratado</SelectItem>
                <SelectItem value="Reprovado">Reprovado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      <Card>
        <CardHeader>
          <CardTitle>Candidatos Inscritos</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCandidates.length === 0 ? (
            <div className="text-center py-12">
              <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum candidato encontrado</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Tente ajustar os filtros de busca.' 
                  : 'Esta vaga ainda não recebeu candidaturas.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="border rounded-lg p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-talently-purple rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {candidate.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                          <p className="text-sm text-gray-500">{candidate.email}</p>
                        </div>
                        {getStatusBadge(candidate.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Perfil DISC</label>
                          <p className="text-sm text-gray-900">
                            {candidate.hasCompletedDISC ? candidate.discProfile : 'Não realizado'}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Fit Cultural</label>
                          <p className="text-sm text-gray-900">
                            {candidate.hasCompletedCultural ? candidate.culturalProfile : 'Não realizado'}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Cidade</label>
                          <p className="text-sm text-gray-900">{candidate.city}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadResume(candidate.name, candidate.resume)}
                        className="flex items-center"
                      >
                        <Download size={14} className="mr-2" />
                        Download CV
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedCandidate(candidate)}
                        className="flex items-center"
                      >
                        Ver Todos os Dados
                      </Button>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(candidate.id, 'Pré-aprovado')}
                          className="bg-green-600 hover:bg-green-700 text-white flex items-center"
                          disabled={candidate.status === 'Pré-aprovado'}
                        >
                          <CheckCircle size={14} className="mr-1" />
                          Pré-aprovar
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(candidate.id, 'Contratado')}
                          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                          disabled={candidate.status === 'Contratado'}
                        >
                          <CheckCircle size={14} className="mr-1" />
                          Contratar
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusChange(candidate.id, 'Reprovado')}
                          disabled={candidate.status === 'Reprovado'}
                          className="flex items-center"
                        >
                          <XCircle size={14} className="mr-1" />
                          Reprovar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Candidate Full View Dialog */}
      <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Dados Completos do Candidato</DialogTitle>
          </DialogHeader>
          
          {selectedCandidate && (
            <CandidateFullView 
              candidate={selectedCandidate} 
              jobId={jobId}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobCandidates;
