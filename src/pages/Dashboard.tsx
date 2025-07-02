
import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Briefcase, GraduationCap, User, Users } from "lucide-react";
import CandidateProfileMenu from "@/components/CandidateProfileMenu";
import { useTestStatus } from "@/hooks/useTestStatus";
import TestsRequired from "@/components/TestsRequired";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { canAccessJobs } = useTestStatus();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (user?.type === 'candidate') {
    // Verificar se os testes foram concluídos
    if (!canAccessJobs) {
      return (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-talently-purple">Talently</span>
                </div>
                <div>
                  <CandidateProfileMenu />
                </div>
              </div>
            </div>
          </div>

          <TestsRequired />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-talently-purple">Talently</span>
              </div>
              <div>
                <CandidateProfileMenu />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-talently-darkblue mb-2">
              Olá, {user.name}!
            </h1>
            <p className="text-gray-600">
              Bem-vindo ao seu painel. Explore as oportunidades e impulsione sua carreira.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/candidate-jobs')}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-talently-purple/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="text-talently-purple" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-talently-darkblue mb-2">Ver Vagas</h3>
                <p className="text-gray-600 text-sm">Explore oportunidades disponíveis</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/disc-test')}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-talently-darkblue mb-2">Teste DISC</h3>
                <p className="text-gray-600 text-sm">Descubra seu perfil comportamental</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/cultural-test')}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="text-green-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-talently-darkblue mb-2">Teste Cultural</h3>
                <p className="text-gray-600 text-sm">Veja seu fit cultural com empresas</p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Candidate Content */}
          <div className="grid gap-6">
            {/* Vagas Candidatadas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-talently-darkblue">
                  Minhas Candidaturas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-talently-darkblue">Desenvolvedor Full Stack</h4>
                      <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Em análise</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">TechFlow Soluções • São Paulo - SP</p>
                    <p className="text-gray-500 text-xs">Candidatado em 15/03/2024</p>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-talently-darkblue">UX/UI Designer</h4>
                      <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">Pré-aprovado</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">TechFlow Soluções • São Paulo - SP</p>
                    <p className="text-gray-500 text-xs">Candidatado em 10/03/2024</p>
                  </div>
                  
                  <div className="text-center py-4">
                    <Button variant="outline" onClick={() => navigate('/candidate-jobs')}>
                      Ver Todas as Vagas Disponíveis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <h3 className="text-xl font-semibold text-talently-darkblue mb-4">
                  Próximos Passos
                </h3>
                <p className="text-gray-700">
                  Mantenha seu perfil atualizado e candidate-se para as vagas que mais combinam com você.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (user?.type === 'company') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-talently-purple">Talently</span>
              </div>
              <div>
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-talently-darkblue mb-2">
              Painel da Empresa
            </h1>
            <p className="text-gray-600">
              Gerencie suas vagas, visualize candidatos e encontre os melhores talentos.
            </p>
          </div>

          {/* Company Information Section */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-talently-darkblue">
                  Informações da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Razão Social</h4>
                    <p className="text-gray-600">Empresa Exemplo Ltda.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">CNPJ</h4>
                    <p className="text-gray-600">12.345.678/0001-90</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Setor</h4>
                    <p className="text-gray-600">Tecnologia</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Porte</h4>
                    <p className="text-gray-600">Médio Porte</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Dashboard Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/jobs')}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-talently-purple/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="text-talently-purple" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-talently-darkblue mb-2">Gerenciar Vagas</h3>
                <p className="text-gray-600 text-sm">Visualize e edite suas vagas</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/candidates')}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-talently-darkblue mb-2">Ver Candidatos</h3>
                <p className="text-gray-600 text-sm">Encontre os candidatos ideais</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/cultural-test')}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="text-green-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-talently-darkblue mb-2">Teste Cultural</h3>
                <p className="text-gray-600 text-sm">Veja o fit cultural da empresa</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Loading...</p>
    </div>
  );
}
