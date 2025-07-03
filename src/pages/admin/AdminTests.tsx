
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Eye, Brain, Users } from 'lucide-react';
import { mockTests, MockTest } from '@/data/mockAdminData';
import TestFullView from '@/components/admin/TestFullView';

const AdminTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profileFilter, setProfileFilter] = useState<string>('all');
  const [selectedTest, setSelectedTest] = useState<MockTest | null>(null);

  // Get DISC results
  const discResults = mockTests.filter(test => test.type === 'disc');

  // Get Cultural results
  const culturalResults = mockTests.filter(test => test.type === 'cultural');

  // Filter functions
  const filterResults = (results: MockTest[]) => {
    return results.filter(result => {
      const matchesSearch = result.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           result.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
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

  const handleViewResult = (test: MockTest) => {
    setSelectedTest(test);
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
                          <div className="font-medium">{result.userName}</div>
                        </td>
                        <td className="p-3 text-sm">{result.userEmail}</td>
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
                            onClick={() => handleViewResult(result)}
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
                      <th className="text-left p-3 font-semibold">Perfil Cultural</th>
                      <th className="text-left p-3 font-semibold">Data do Teste</th>
                      <th className="text-left p-3 font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCulturalResults.map((result) => (
                      <tr key={result.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-medium">{result.userName}</div>
                        </td>
                        <td className="p-3 text-sm">{result.userEmail}</td>
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
                            onClick={() => handleViewResult(result)}
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

      {/* Test Full View Dialog */}
      <Dialog open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {selectedTest?.type === 'disc' ? (
                <Brain className="text-blue-600" size={20} />
              ) : (
                <Users className="text-purple-600" size={20} />
              )}
              <span>
                Resultado Completo - {selectedTest?.userName}
              </span>
            </DialogTitle>
            <DialogDescription>
              Visualização completa do teste {selectedTest?.type === 'disc' ? 'DISC' : 'Cultural'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTest && (
            <TestFullView test={selectedTest} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTests;
