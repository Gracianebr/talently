
import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { User, Building2, FileText, LogOut, Users, Briefcase, Download, ExternalLink, Phone, Mail, Linkedin } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isCandidate = user?.type === 'candidate';

  // Dados de exemplo da empresa
  const companyData = {
    cnpj: "12.345.678/0001-90",
    razaoSocial: "Betec Consultoria e Projetos Ltda",
    site: "https://www.betecps.com.br",
    responsavel: "Maria Silva",
    cargo: "Diretora de RH",
    linkedin: "https://linkedin.com/in/maria-silva-rh",
    telefone: "+55 11 99999-9999",
    contratoUrl: "/downloads/contrato-prestacao-servicos.pdf"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-talently-purple">Talently</span>
              <div className="flex items-center space-x-2 text-gray-600">
                {isCandidate ? <User size={20} /> : <Building2 size={20} />}
                <span>{user?.name}</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut size={16} />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-talently-darkblue mb-2">
            {isCandidate ? 'Painel do Candidato' : 'Painel da Empresa'}
          </h1>
          <p className="text-gray-600">
            {isCandidate 
              ? 'Complete seus testes e encontre vagas ideais para você'
              : 'Configure sua empresa e encontre candidatos ideais'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Teste DISC - Apenas para candidatos */}
          {isCandidate && (
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="text-talently-purple" size={24} />
                  <span>Teste DISC</span>
                </CardTitle>
                <CardDescription>
                  {user?.profile?.hasCompletedDISC 
                    ? 'Teste concluído' 
                    : 'Descubra seu perfil comportamental'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate('/disc-test')}
                  className="w-full bg-talently-purple hover:bg-talently-purple/90"
                  disabled={user?.profile?.hasCompletedDISC}
                >
                  {user?.profile?.hasCompletedDISC ? 'Ver Resultado' : 'Iniciar Teste'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Teste Cultural */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="text-talently-purple" size={24} />
                <span>Teste de Fit Cultural</span>
              </CardTitle>
              <CardDescription>
                {user?.profile?.hasCompletedCultural 
                  ? 'Teste concluído' 
                  : 'Descubra seu perfil cultural'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user?.profile?.hasCompletedCultural ? (
                <div className="space-y-2">
                  <Button 
                    onClick={() => navigate('/cultural-test')}
                    className="w-full bg-talently-purple hover:bg-talently-purple/90"
                  >
                    Ver Resultado
                  </Button>
                  <Button 
                    onClick={() => navigate('/cultural-test')}
                    variant="outline"
                    className="w-full"
                  >
                    Refazer Teste
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => navigate('/cultural-test')}
                  className="w-full bg-talently-purple hover:bg-talently-purple/90"
                >
                  Iniciar Teste
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Candidatos (para empresas) / Vagas (para candidatos) */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {isCandidate ? (
                  <>
                    <Building2 className="text-talently-purple" size={24} />
                    <span>Vagas Disponíveis</span>
                  </>
                ) : (
                  <>
                    <Users className="text-talently-purple" size={24} />
                    <span>Candidatos</span>
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {isCandidate 
                  ? 'Veja vagas compatíveis com seu perfil'
                  : 'Visualize candidatos e seus perfis culturais'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate(isCandidate ? '/jobs' : '/candidates')}
                className="w-full bg-talently-purple hover:bg-talently-purple/90"
              >
                {isCandidate ? 'Ver Vagas' : 'Ver Candidatos'}
              </Button>
            </CardContent>
          </Card>

          {/* Minhas Vagas - Apenas para empresas */}
          {!isCandidate && (
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="text-talently-purple" size={24} />
                  <span>Minhas Vagas</span>
                </CardTitle>
                <CardDescription>
                  Gerencie suas vagas abertas e crie novas oportunidades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate('/jobs')}
                  className="w-full bg-talently-purple hover:bg-talently-purple/90"
                >
                  Gerenciar Vagas
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Profile Summary */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>
                {isCandidate ? 'Resumo do Perfil' : 'Informações da Empresa'}
              </CardTitle>
              <CardDescription>
                {isCandidate ? 'Suas informações e progresso' : 'Dados cadastrais e contato'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isCandidate ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-gray-700">E-mail:</p>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Tipo de conta:</p>
                    <p className="text-gray-600">Candidato</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Teste DISC:</p>
                    <p className="text-gray-600">
                      {user?.profile?.hasCompletedDISC ? '✅ Concluído' : '⏳ Pendente'}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Teste Cultural:</p>
                    <p className="text-gray-600">
                      {user?.profile?.hasCompletedCultural ? '✅ Concluído' : '⏳ Pendente'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Teste Cultural Result */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-talently-darkblue">Perfil Cultural:</p>
                      <span className="text-2xl">🔶</span>
                    </div>
                    <p className="text-blue-700 font-medium">
                      {user?.profile?.hasCompletedCultural ? 'Executora - Cultura de Performance' : '⏳ Teste Pendente'}
                    </p>
                  </div>

                  {/* Company Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-700 flex items-center space-x-2">
                          <Building2 size={16} />
                          <span>CNPJ:</span>
                        </p>
                        <p className="text-gray-600">{companyData.cnpj}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Razão Social:</p>
                        <p className="text-gray-600">{companyData.razaoSocial}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 flex items-center space-x-2">
                          <ExternalLink size={16} />
                          <span>Website:</span>
                        </p>
                        <a 
                          href={companyData.site} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-talently-purple hover:underline"
                        >
                          {companyData.site}
                        </a>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">E-mail:</p>
                        <p className="text-gray-600">{user?.email}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-700">Responsável:</p>
                        <p className="text-gray-600">{companyData.responsavel}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Cargo:</p>
                        <p className="text-gray-600">{companyData.cargo}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 flex items-center space-x-2">
                          <Linkedin size={16} />
                          <span>LinkedIn:</span>
                        </p>
                        <a 
                          href={companyData.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-talently-purple hover:underline"
                        >
                          Ver perfil
                        </a>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 flex items-center space-x-2">
                          <Phone size={16} />
                          <span>WhatsApp/Telefone:</span>
                        </p>
                        <p className="text-gray-600">{companyData.telefone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Service Agreement Download */}
                  <div className="pt-4 border-t">
                    <Button 
                      variant="outline" 
                      className="flex items-center space-x-2"
                      onClick={() => window.open(companyData.contratoUrl, '_blank')}
                    >
                      <Download size={16} />
                      <span>Baixar Contrato de Prestação de Serviços</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
