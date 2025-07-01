import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Eye, FileText, Brain, Users } from 'lucide-react';
import { mockCandidates, mockCompanies } from '@/data/mockAdminData';

const AdminTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profileFilter, setProfileFilter] = useState<string>('all');
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [resultType, setResultType] = useState<'disc' | 'cultural'>('disc');

  // Get DISC results
  const discResults = mockCandidates
    .filter(candidate => candidate.hasCompletedDISC)
    .map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      profile: candidate.discProfile,
      completedAt: candidate.registeredAt,
      type: 'disc' as const
    }));

  // Get Cultural results from candidates
  const candidateCulturalResults = mockCandidates
    .filter(candidate => candidate.hasCompletedCultural)
    .map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      profile: candidate.culturalProfile,
      completedAt: candidate.registeredAt,
      type: 'cultural-candidate' as const,
      userType: 'Candidato'
    }));

  // Get Cultural results from companies
  const companyCulturalResults = mockCompanies
    .filter(company => company.hasCompletedCultural)
    .map(company => ({
      id: company.id,
      name: company.name,
      email: company.email,
      profile: company.culturalProfile,
      completedAt: company.registeredAt,
      type: 'cultural-company' as const,
      userType: 'Empresa'
    }));

  const culturalResults = [...candidateCulturalResults, ...companyCulturalResults];

  // Filter functions
  const filterResults = (results: any[]) => {
    return results.filter(result => {
      const matchesSearch = result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           result.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesProfile = profileFilter === 'all' || 
                            (result.profile && result.profile.toLowerCase().includes(profileFilter.toLowerCase()));
      
      return matchesSearch && matchesProfile;
    });
  };

  const filteredDiscResults = filterResults(discResults);
  const filteredCulturalResults = filterResults(culturalResults);

  // Get unique profiles for filtering
  const discProfiles = Array.from(new Set(discResults.map(r => r.profile).filter(Boolean)));
  const culturalProfiles = Array.from(new Set(culturalResults.map(r => r.profile).filter(Boolean)));

  const handleViewResult = (result: any, type: 'disc' | 'cultural') => {
    setSelectedResult(result);
    setResultType(type);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resultados dos Testes</h1>
        <p className="text-gray-500 mt-1">Visualize todos os resultados dos testes DISC e de Fit Cultural</p>
      </div>

      <Tabs defaultValue="disc" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="disc" className="flex items-center space-x-2">
            <Brain size={16} />
            <span>Testes DISC</span>
          </TabsTrigger>
          <TabsTrigger value="cultural" className="flex items-center space-x-2">
            <Users size={16} />
            <span>Testes Culturais</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="disc" className="space-y-6">
          {/* DISC Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Buscar candidato..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={profileFilter} onValueChange={setProfileFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filtrar por perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os perfis</SelectItem>
                    {discProfiles.map((profile) => (
                      <SelectItem key={profile} value={profile || ''}>{profile}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* DISC Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="text-blue-600" size={20} />
                <span>Resultados DISC ({filteredDiscResults.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Candidato</th>
                      <th className="text-left p-3 font-semibold">Email</th>
                      <th className="text-left p-3 font-semibold">Perfil DISC</th>
                      <th className="text-left p-3 font-semibold">Data do Teste</th>
                      <th className="text-left p-3 font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDiscResults.map((result) => (
                      <tr key={result.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-medium">{result.name}</div>
                        </td>
                        <td className="p-3 text-sm">{result.email}</td>
                        <td className="p-3">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {result.profile}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">
                          {new Date(result.completedAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewResult(result, 'disc')}
                          >
                            <Eye size={14} className="mr-1" />
                            Ver Detalhes
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cultural" className="space-y-6">
          {/* Cultural Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Buscar candidato ou empresa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={profileFilter} onValueChange={setProfileFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filtrar por perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os perfis</SelectItem>
                    {culturalProfiles.map((profile) => (
                      <SelectItem key={profile} value={profile || ''}>{profile}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Cultural Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="text-purple-600" size={20} />
                <span>Resultados Culturais ({filteredCulturalResults.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Nome</th>
                      <th className="text-left p-3 font-semibold">Email</th>
                      <th className="text-left p-3 font-semibold">Tipo</th>
                      <th className="text-left p-3 font-semibold">Perfil Cultural</th>
                      <th className="text-left p-3 font-semibold">Data do Teste</th>
                      <th className="text-left p-3 font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCulturalResults.map((result) => (
                      <tr key={`${result.type}-${result.id}`} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-medium">{result.name}</div>
                        </td>
                        <td className="p-3 text-sm">{result.email}</td>
                        <td className="p-3">
                          <Badge variant="outline">
                            {result.userType}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                            {result.profile}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">
                          {new Date(result.completedAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewResult(result, 'cultural')}
                          >
                            <Eye size={14} className="mr-1" />
                            Ver Detalhes
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Result Detail Dialog */}
      <Dialog open={!!selectedResult} onOpenChange={() => setSelectedResult(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {resultType === 'disc' ? (
                <Brain className="text-blue-600" size={20} />
              ) : (
                <Users className="text-purple-600" size={20} />
              )}
              <span>
                Resultado do Teste {resultType === 'disc' ? 'DISC' : 'Cultural'}
              </span>
            </DialogTitle>
            <DialogDescription>
              Detalhes do resultado para {selectedResult?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedResult && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nome</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedResult.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedResult.email}</p>
                </div>
                {selectedResult.userType && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tipo</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedResult.userType}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-700">Data do Teste</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedResult.completedAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Resultado {resultType === 'disc' ? 'DISC' : 'Cultural'}
                </label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <Badge 
                    variant="secondary" 
                    className={resultType === 'disc' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800'
                    }
                  >
                    {selectedResult.profile}
                  </Badge>
                </div>
              </div>

              {resultType === 'disc' && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Sobre o Perfil DISC</h4>
                  <p className="text-sm text-blue-800">
                    {selectedResult.profile?.includes('D') && 'Perfil Dominância: Pessoa focada em resultados, direta e assertiva.'}
                    {selectedResult.profile?.includes('I') && 'Perfil Influência: Pessoa sociável, otimista e persuasiva.'}
                    {selectedResult.profile?.includes('S') && 'Perfil Estabilidade: Pessoa paciente, confiável e colaborativa.'}
                    {selectedResult.profile?.includes('C') && 'Perfil Conformidade: Pessoa analítica, precisa e sistemática.'}
                  </p>
                </div>
              )}

              {resultType === 'cultural' && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Sobre o Perfil Cultural</h4>
                  <p className="text-sm text-purple-800">
                    {selectedResult.profile?.includes('Explorador') && 'Perfil voltado à inovação, criatividade e autonomia.'}
                    {selectedResult.profile?.includes('Executor') && 'Perfil focado em performance, metas e resultados.'}
                    {selectedResult.profile?.includes('Guardião') && 'Perfil que preza estabilidade, organização e regras claras.'}
                    {selectedResult.profile?.includes('Conector') && 'Perfil guiado por propósito, colaboração e impacto social.'}
                  </p>
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={() => setSelectedResult(null)}>
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTests;