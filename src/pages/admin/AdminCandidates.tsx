import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Search, Eye, Edit, Trash2, CheckCircle, XCircle, FileText } from 'lucide-react';
import { mockCandidates, MockCandidate } from '@/data/mockAdminData';

const AdminCandidates = () => {
  const [candidates, setCandidates] = useState<MockCandidate[]>(mockCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<MockCandidate | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<MockCandidate | null>(null);
  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view');
  const { toast } = useToast();

  // Filter candidates
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'disc-complete' && candidate.hasCompletedDISC) ||
                         (statusFilter === 'cultural-complete' && candidate.hasCompletedCultural) ||
                         (statusFilter === 'both-complete' && candidate.hasCompletedDISC && candidate.hasCompletedCultural) ||
                         (statusFilter === 'incomplete' && (!candidate.hasCompletedDISC || !candidate.hasCompletedCultural));
    
    return matchesSearch && matchesStatus;
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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Buscar por nome ou email..."
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
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="disc-complete">DISC Completo</SelectItem>
                <SelectItem value="cultural-complete">Cultural Completo</SelectItem>
                <SelectItem value="both-complete">Ambos Completos</SelectItem>
                <SelectItem value="incomplete">Incompletos</SelectItem>
              </SelectContent>
            </Select>
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
                  <th className="text-left p-3 font-semibold">DISC</th>
                  <th className="text-left p-3 font-semibold">Cultural</th>
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
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {viewMode === 'view' ? 'Visualizar' : 'Editar'} Candidato
            </DialogTitle>
            <DialogDescription>
              {viewMode === 'view' ? 'Detalhes completos do candidato' : 'Edite as informações do candidato'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedCandidate && (
            <CandidateForm 
              candidate={selectedCandidate}
              mode={viewMode}
              onSave={handleSaveCandidate}
              onCancel={() => setSelectedCandidate(null)}
            />
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
  mode, 
  onSave, 
  onCancel 
}: {
  candidate: MockCandidate;
  mode: 'view' | 'edit';
  onSave: (candidate: MockCandidate) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(candidate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (mode === 'view') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Nome</label>
            <p className="mt-1 text-sm text-gray-900">{candidate.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-sm text-gray-900">{candidate.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Telefone</label>
            <p className="mt-1 text-sm text-gray-900">{candidate.phone}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Cidade</label>
            <p className="mt-1 text-sm text-gray-900">{candidate.city}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Status DISC</label>
            <div className="mt-1">
              {candidate.hasCompletedDISC ? (
                <div>
                  <Badge className="bg-green-100 text-green-800">Concluído</Badge>
                  {candidate.discProfile && (
                    <p className="text-sm text-gray-600 mt-1">{candidate.discProfile}</p>
                  )}
                </div>
              ) : (
                <Badge className="bg-red-100 text-red-800">Pendente</Badge>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Status Cultural</label>
            <div className="mt-1">
              {candidate.hasCompletedCultural ? (
                <div>
                  <Badge className="bg-green-100 text-green-800">Concluído</Badge>
                  {candidate.culturalProfile && (
                    <p className="text-sm text-gray-600 mt-1">{candidate.culturalProfile}</p>
                  )}
                </div>
              ) : (
                <Badge className="bg-gray-100 text-gray-800">Não feito</Badge>
              )}
            </div>
          </div>
        </div>

        {candidate.resume && (
          <div>
            <label className="text-sm font-medium text-gray-700">Currículo</label>
            <div className="mt-1 flex items-center space-x-2">
              <FileText size={16} className="text-gray-500" />
              <span className="text-sm text-gray-900">{candidate.resume}</span>
            </div>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-gray-700">Candidaturas</label>
          <p className="mt-1 text-sm text-gray-900">
            {candidate.applications.length} vagas aplicadas
          </p>
        </div>

        <div className="flex justify-end">
          <Button onClick={onCancel}>Fechar</Button>
        </div>
      </div>
    );
  }

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