import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Building, Briefcase, FileText, TrendingUp, CheckCircle } from 'lucide-react';
import { getAdminStats } from '@/data/mockAdminData';

const AdminDashboard = () => {
  const stats = getAdminStats();

  const statCards = [
    {
      title: 'Total de Candidatos',
      value: stats.totalCandidates,
      icon: Users,
      color: 'bg-blue-500',
      description: 'Candidatos cadastrados'
    },
    {
      title: 'Total de Empresas',
      value: stats.totalCompanies,
      icon: Building,
      color: 'bg-green-500',
      description: 'Empresas ativas'
    },
    {
      title: 'Vagas Ativas',
      value: `${stats.activeJobs}/${stats.totalJobs}`,
      icon: Briefcase,
      color: 'bg-purple-500',
      description: 'Vagas disponíveis'
    },
    {
      title: 'Total de Candidaturas',
      value: stats.totalApplications,
      icon: TrendingUp,
      color: 'bg-orange-500',
      description: 'Aplicações realizadas'
    },
    {
      title: 'Testes DISC',
      value: stats.completedDISC,
      icon: CheckCircle,
      color: 'bg-indigo-500',
      description: 'Testes concluídos'
    },
    {
      title: 'Testes Culturais',
      value: stats.completedCultural,
      icon: FileText,
      color: 'bg-pink-500',
      description: 'Perfis culturais'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Visão geral do sistema Talently</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Sistema Ativo
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">5 novos candidatos registrados hoje</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">3 novas vagas publicadas esta semana</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">12 testes DISC realizados esta semana</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-700">8 novas candidaturas hoje</span>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Status do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Taxa de conclusão DISC</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {Math.round((stats.completedDISC / stats.totalCandidates) * 100)}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Taxa de conclusão Cultural</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {Math.round((stats.completedCultural / stats.totalCandidates) * 100)}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Vagas ativas</span>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                {Math.round((stats.activeJobs / stats.totalJobs) * 100)}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Média candidaturas/vaga</span>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {Math.round(stats.totalApplications / stats.totalJobs)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;