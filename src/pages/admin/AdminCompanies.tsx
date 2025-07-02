import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Search, Eye, Edit, Trash2, Building, CheckCircle, XCircle } from 'lucide-react';
import { mockCompanies, MockCompany } from '@/data/mockAdminData';

const AdminCompanies = () => {
  const [companies, setCompanies] = useState<MockCompany[]>(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<MockCompany | null>(null);
  const [deleteCompany, setDeleteCompany] = useState<MockCompany | null>(null);
  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view');
  const { toast } = useToast();

  // Get unique sectors
  const sectors = Array.from(new Set(companies.map(company => company.sector)));

  // Filter companies
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.cnpj.includes(searchTerm);
    
    const matchesSector = sectorFilter === 'all' || company.sector === sectorFilter;
    
    return matchesSearch && matchesSector;
  });

  const handleDeleteCompany = () => {
    if (deleteCompany) {
      setCompanies(companies.filter(c => c.id !== deleteCompany.id));
      setDeleteCompany(null);
      toast({
        title: "Empresa excluída",
        description: `${deleteCompany.name} foi removida do sistema.`,
      });
    }
  };

  const handleSaveCompany = (updatedCompany: MockCompany) => {
    setCompanies(companies.map(c => c.id === updatedCompany.id ? updatedCompany : c));
    setSelectedCompany(null);
    toast({
      title: "Empresa atualizada",
      description: "Os dados foram salvos com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Empresas</h1>
          <p className="text-gray-500 mt-1">{filteredCompanies.length} empresas encontradas</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Buscar por nome, email ou CNPJ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os setores</SelectItem>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Companies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Empresas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Empresa</th>
                  <th className="text-left p-3 font-semibold">Responsável</th>
                  <th className="text-left p-3 font-semibold">CNPJ</th>
                  <th className="text-left p-3 font-semibold">Setor</th>
                  <th className="text-left p-3 font-semibold">Cidade</th>
                  <th className="text-left p-3 font-semibold">Teste Cultural</th>
                  <th className="text-left p-3 font-semibold">Vagas</th>
                  <th className="text-left p-3 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-talently-purple rounded-lg flex items-center justify-center">
                          <Building className="text-white" size={16} />
                        </div>
                        <div>
                          <div className="font-medium">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{company.responsibleName}</div>
                    </td>
                    <td className="p-3 text-sm font-mono">{company.cnpj}</td>
                    <td className="p-3">
                      <Badge variant="outline">{company.sector}</Badge>
                    </td>
                    <td className="p-3 text-sm">{company.city}</td>
                    <td className="p-3">
                      {company.hasCompletedCultural ? (
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 mb-1">
                            <CheckCircle size={12} className="mr-1" />
                            Concluído
                          </Badge>
                          {company.culturalProfile && (
                            <div className="text-xs text-gray-600">{company.culturalProfile}</div>
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
                      <Badge variant="outline">
                        {company.jobsPosted} vagas
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCompany(company);
                            setViewMode('view');
                          }}
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCompany(company);
                            setViewMode('edit');
                          }}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setDeleteCompany(company)}
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
      <Dialog open={!!selectedCompany} onOpenChange={() => setSelectedCompany(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {viewMode === 'view' ? 'Visualizar' : 'Editar'} Empresa
            </DialogTitle>
            <DialogDescription>
              {viewMode === 'view' ? 'Detalhes completos da empresa' : 'Edite as informações da empresa'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedCompany && (
            <CompanyForm 
              company={selectedCompany}
              mode={viewMode}
              onSave={handleSaveCompany}
              onCancel={() => setSelectedCompany(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteCompany} onOpenChange={() => setDeleteCompany(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a empresa <strong>{deleteCompany?.name}</strong>?
              Esta ação não pode ser desfeita e todas as vagas da empresa também serão removidas.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteCompany(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteCompany}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Company Form Component
const CompanyForm = ({ 
  company, 
  mode, 
  onSave, 
  onCancel 
}: {
  company: MockCompany;
  mode: 'view' | 'edit';
  onSave: (company: MockCompany) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(company);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (mode === 'view') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Nome da Empresa</label>
            <p className="mt-1 text-sm text-gray-900">{company.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Responsável</label>
            <p className="mt-1 text-sm text-gray-900">{company.responsibleName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-sm text-gray-900">{company.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">CNPJ</label>
            <p className="mt-1 text-sm text-gray-900 font-mono">{company.cnpj}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Telefone</label>
            <p className="mt-1 text-sm text-gray-900">{company.phone}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Cidade</label>
            <p className="mt-1 text-sm text-gray-900">{company.city}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Setor</label>
            <p className="mt-1 text-sm text-gray-900">{company.sector}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Teste Cultural</label>
            <div className="mt-1">
              {company.hasCompletedCultural ? (
                <div>
                  <Badge className="bg-green-100 text-green-800">Concluído</Badge>
                  {company.culturalProfile && (
                    <p className="text-sm text-gray-600 mt-1">{company.culturalProfile}</p>
                  )}
                </div>
              ) : (
                <Badge className="bg-red-100 text-red-800">Pendente</Badge>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Vagas Publicadas</label>
            <p className="mt-1 text-sm text-gray-900">{company.jobsPosted} vagas</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Data de Registro</label>
          <p className="mt-1 text-sm text-gray-900">
            {new Date(company.registeredAt).toLocaleDateString('pt-BR')}
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
          <label className="text-sm font-medium text-gray-700">Nome da Empresa</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Responsável</label>
          <Input
            value={formData.responsibleName}
            onChange={(e) => setFormData({ ...formData, responsibleName: e.target.value })}
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
          <label className="text-sm font-medium text-gray-700">CNPJ</label>
          <Input
            value={formData.cnpj}
            onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
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
          <label className="text-sm font-medium text-gray-700">Setor</label>
          <Input
            value={formData.sector}
            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
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

export default AdminCompanies;