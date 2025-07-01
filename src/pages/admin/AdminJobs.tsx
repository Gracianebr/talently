import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Search, Eye, Edit, Trash2, Briefcase, Users, ToggleLeft, ToggleRight } from 'lucide-react';
import { mockJobs, MockJob, mockCompanies } from '@/data/mockAdminData';

const AdminJobs = () => {
  const [jobs, setJobs] = useState<MockJob[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<MockJob | null>(null);
  const [deleteJob, setDeleteJob] = useState<MockJob | null>(null);
  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view');
  const { toast } = useToast();

  // Get unique types
  const types = Array.from(new Set(jobs.map(job => job.type)));

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDeleteJob = () => {
    if (deleteJob) {
      setJobs(jobs.filter(j => j.id !== deleteJob.id));
      setDeleteJob(null);
      toast({
        title: "Vaga excluída",
        description: `A vaga "${deleteJob.title}" foi removida do sistema.`,
      });
    }
  };

  const handleSaveJob = (updatedJob: MockJob) => {
    setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
    setSelectedJob(null);
    toast({
      title: "Vaga atualizada",
      description: "Os dados foram salvos com sucesso.",
    });
  };

  const handleToggleStatus = (job: MockJob) => {
    const newStatus = job.status === 'active' ? 'inactive' : 'active';
    const updatedJob = { ...job, status: newStatus as 'active' | 'inactive' };
    setJobs(jobs.map(j => j.id === job.id ? updatedJob : j));
    
    toast({
      title: `Vaga ${newStatus === 'active' ? 'ativada' : 'desativada'}`,
      description: `A vaga "${job.title}" foi ${newStatus === 'active' ? 'ativada' : 'desativada'}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Vagas</h1>
          <p className="text-gray-500 mt-1">{filteredJobs.length} vagas encontradas</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Buscar por título, empresa ou localização..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativas</SelectItem>
                <SelectItem value="inactive">Inativas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Vagas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Vaga</th>
                  <th className="text-left p-3 font-semibold">Empresa</th>
                  <th className="text-left p-3 font-semibold">Tipo</th>
                  <th className="text-left p-3 font-semibold">Salário</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Candidaturas</th>
                  <th className="text-left p-3 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-talently-darkblue rounded-lg flex items-center justify-center">
                          <Briefcase className="text-white" size={16} />
                        </div>
                        <div>
                          <div className="font-medium">{job.title}</div>
                          <div className="text-sm text-gray-500">{job.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{job.companyName}</td>
                    <td className="p-3">
                      <Badge variant="outline">{job.type}</Badge>
                    </td>
                    <td className="p-3 text-sm">{job.salary}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="secondary" 
                          className={job.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                          }
                        >
                          {job.status === 'active' ? 'Ativa' : 'Inativa'}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleStatus(job)}
                          className="p-1"
                        >
                          {job.status === 'active' ? (
                            <ToggleRight className="text-green-600" size={18} />
                          ) : (
                            <ToggleLeft className="text-gray-400" size={18} />
                          )}
                        </Button>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1">
                        <Users size={14} className="text-gray-500" />
                        <span className="text-sm">{job.applications}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedJob(job);
                            setViewMode('view');
                          }}
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedJob(job);
                            setViewMode('edit');
                          }}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setDeleteJob(job)}
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
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {viewMode === 'view' ? 'Visualizar' : 'Editar'} Vaga
            </DialogTitle>
            <DialogDescription>
              {viewMode === 'view' ? 'Detalhes completos da vaga' : 'Edite as informações da vaga'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedJob && (
            <JobForm 
              job={selectedJob}
              mode={viewMode}
              onSave={handleSaveJob}
              onCancel={() => setSelectedJob(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteJob} onOpenChange={() => setDeleteJob(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a vaga <strong>"{deleteJob?.title}"</strong>?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteJob(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteJob}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Job Form Component
const JobForm = ({ 
  job, 
  mode, 
  onSave, 
  onCancel 
}: {
  job: MockJob;
  mode: 'view' | 'edit';
  onSave: (job: MockJob) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(job);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (mode === 'view') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Título da Vaga</label>
            <p className="mt-1 text-sm text-gray-900">{job.title}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Empresa</label>
            <p className="mt-1 text-sm text-gray-900">{job.companyName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Localização</label>
            <p className="mt-1 text-sm text-gray-900">{job.location}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Tipo</label>
            <p className="mt-1 text-sm text-gray-900">{job.type}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Salário</label>
            <p className="mt-1 text-sm text-gray-900">{job.salary}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <p className="mt-1">
              <Badge 
                className={job.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
                }
              >
                {job.status === 'active' ? 'Ativa' : 'Inativa'}
              </Badge>
            </p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Descrição</label>
          <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-900">
            {job.description}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Candidaturas</label>
            <p className="mt-1 text-sm text-gray-900">{job.applications} candidatos</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Criada em</label>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(job.createdAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
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
          <label className="text-sm font-medium text-gray-700">Título da Vaga</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Localização</label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Tipo</label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CLT">CLT</SelectItem>
              <SelectItem value="PJ">PJ</SelectItem>
              <SelectItem value="Estágio">Estágio</SelectItem>
              <SelectItem value="Freelancer">Freelancer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Salário</label>
          <Input
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Descrição</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Status</label>
        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Ativa</SelectItem>
            <SelectItem value="inactive">Inativa</SelectItem>
          </SelectContent>
        </Select>
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

export default AdminJobs;