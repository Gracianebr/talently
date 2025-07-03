import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Search, Eye, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { mockCandidates, MockCandidate } from '@/data/mockAdminData';
import CandidateFullView from '@/components/admin/CandidateFullView';

const AdminCandidates = () => {
  const [candidates, setCandidates] = useState<MockCandidate[]>(mockCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [discFilter, setDiscFilter] = useState<string>('all');
  const [culturalFilter, setCulturalFilter] = useState<string>('all');
  const [candidateStatusFilter, setCandidateStatusFilter] = useState<string>('all');
  const [jobAreaFilter, setJobAreaFilter] = useState<string>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<MockCandidate | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<MockCandidate | null>(null);
  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view');
  const { toast } = useToast();

  // Get unique job areas
  const jobAreas = Array.from(new Set(candidates.map(candidate => candidate.jobArea)));

  // Filter candidates
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'disc-complete' && candidate.hasCompletedDISC) ||
                         (statusFilter === 'cultural-complete' && candidate.hasCompletedCultural) ||
                         (statusFilter === 'both-complete' && candidate.hasCompletedDISC && candidate.hasCompletedCultural) ||
                         (statusFilter === 'incomplete' && (!candidate.hasCompletedDISC || !candidate.hasCompletedCultural));
    
    const matchesDisc = discFilter === 'all' || 
                       (discFilter === 'none' && !candidate.hasCompletedDISC) ||
                       (candidate.discProfile && candidate.discProfile.toLowerCase().includes(discFilter.toLowerCase()));

    const matchesCultural = culturalFilter === 'all' ||
                           (culturalFilter === 'none' && !candidate.hasCompletedCultural) ||
                           (candidate.culturalProfile && candidate.culturalProfile.toLowerCase().includes(culturalFilter.toLowerCase()));

    const matchesCandidateStatus = candidateStatusFilter === 'all' || candidate.status === candidateStatusFilter;
    
    const matchesJobArea = jobAreaFilter === 'all' || candidate.jobArea === jobAreaFilter;
    
    return matchesSearch && matchesStatus && matchesDisc && matchesCultural && matchesCandidateStatus && matchesJobArea;
  });

  const handleDeleteCandidate = () => {
    if (deleteCandidate) {
      setCandidates(candidates.filter(c => c.id !== deleteCandidate.id));
      setDeleteCandidate(null);
      toast({
        title: "Candidato excluído",
        description: `${deleteCandidate.name} foi removido do sistema.`,
      });
    }
  };

  const handleSaveCandidate = (updatedCandidate: MockCandidate) => {
    setCandidates(candidates.map(c => c.id === updatedCandidate.id ? updatedCandidate : c));
    setSelectedCandidate(null);
    toast({
      title: "Candidato atualizado",
      description: "Os dados foram salvos com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Candidatos</h1>
          <p className="text-gray-500 mt-1">{filteredCandidates.length} candidatos encontrados</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Buscar por nome, email ou cidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Status dos testes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="disc-complete">DISC Completo</SelectItem>
                  <SelectItem value="cultural-complete">Cultural Completo</SelectItem>
                  <SelectItem value="both-complete">Ambos Completos</SelectItem>
                  <SelectItem value="incomplete">Incompletos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={jobAreaFilter} onValueChange={setJobAreaFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Área de Atuação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Áreas</SelectItem>
                  {jobAreas.map((area) => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={discFilter} onValueChange={setDiscFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Perfil DISC" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos DISC</SelectItem>
                  <SelectItem value="none">Sem DISC</SelectItem>
                  <SelectItem value="dominância">D - Dominância</SelectItem>
                  <SelectItem value="influência">I - Influência</SelectItem>
                  <SelectItem value="estabilidade">S - Estabilidade</SelectItem>
                  <SelectItem value="conformidade">C - Conformidade</SelectItem>
                </SelectContent>
              </Select>

              <Select value={culturalFilter} onValueChange={setCulturalFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Fit Cultural" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Cultural</SelectItem>
                  <SelectItem value="none">Sem Cultural</SelectItem>
                  <SelectItem value="executor">Executor</SelectItem>
                  <SelectItem value="conector">Conector</SelectItem>
                  <SelectItem value="guardião">Guardião</SelectItem>
                  <SelectItem value="explorador">Explorador</SelectItem>
                </SelectContent>
              </Select>

              <Select value={candidateStatusFilter} onValueChange={setCandidateStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Status candidato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Status</SelectItem>
                  <SelectItem value="Em avaliação">Em avaliação</SelectItem>
                  <SelectItem value="Pré-aprovado">Pré-aprovado</SelectItem>
                  <SelectItem value="Reprovado">Reprovado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Candidatos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Nome</th>
                  <th className="text-left p-3 font-semibold">Email</th>
                  <th className="text-left p-3 font-semibold">Cidade</th>
                  <th className="text-left p-3 font-semibold">Área</th>
                  <th className="text-left p-3 font-semibold">DISC</th>
                  <th className="text-left p-3 font-semibold">Cultural</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Candidaturas</th>
                  <th className="text-left p-3 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-gray-500">{candidate.phone}</div>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{candidate.email}</td>
                    <td className="p-3 text-sm">{candidate.city}</td>
                    <td className="p-3">
                      <Badge variant="outline">{candidate.jobArea}</Badge>
                    </td>
                    <td className="p-3">
                      {candidate.hasCompletedDISC ? (
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 mb-1">
                            <CheckCircle size={12} className="mr-1" />
                            Concluído
                          </Badge>
                          {candidate.discProfile && (
                            <div className="text-xs text-gray-600">{candidate.discProfile}</div>
                          )}
                        </div>
                      ) : (
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          <XCircle size={12} className="mr-1" />
                          Pendente
                        </Badge>
                      )}
                    </td>
                    <td className="p-3">
                      {candidate.hasCompletedCultural ? (
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 mb-1">
                            <CheckCircle size={12} className="mr-1" />
                            Concluído
                          </Badge>
                          {candidate.culturalProfile && (
                            <div className="text-xs text-gray-600">{candidate.culturalProfile}</div>
                          )}
                        </div>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                          <XCircle size={12} className="mr-1" />
                          Não feito
                        </Badge>
                      )}
                    </td>
                    <td className="p-3">
                      <Badge 
                        variant="secondary" 
                        className={
                          candidate.status === 'Pré-aprovado' ? 'bg-green-100 text-green-800' :
                          candidate.status === 'Reprovado' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {candidate.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">
                        {candidate.applications.length} vagas
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            setViewMode('view');
                          }}
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            setViewMode('edit');
                          }}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setDeleteCandidate(candidate)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View/Edit Dialog */}
      <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {viewMode === 'view' ? 'Visualizar' : 'Editar'} Candidato
            </DialogTitle>
            <DialogDescription>
              {viewMode === 'view' ? 'Dados completos do candidato' : 'Edite as informações do candidato'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedCandidate && (
            viewMode === 'view' ? (
              <CandidateFullView candidate={selectedCandidate} />
            ) : (
              <CandidateForm 
                candidate={selectedCandidate}
                onSave={handleSaveCandidate}
                onCancel={() => setSelectedCandidate(null)}
              />
            )
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteCandidate} onOpenChange={() => setDeleteCandidate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o candidato <strong>{deleteCandidate?.name}</strong>?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteCandidate(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteCandidate}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Candidate Form Component
const CandidateForm = ({ 
  candidate, 
  onSave, 
  onCancel 
}: {
  candidate: MockCandidate;
  onSave: (candidate: MockCandidate) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(candidate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Nome</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Telefone</label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Cidade</label>
          <Input
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Área de Atuação</label>
          <Input
            value={formData.jobArea}
            onChange={(e) => setFormData({ ...formData, jobArea: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default AdminCandidates;
