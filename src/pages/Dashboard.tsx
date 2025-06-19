
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, FileText, Brain, Heart, Briefcase } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const profileCompletion = () => {
    if (!user.profile) return 0;
    
    let completed = 0;
    const total = 6;
    
    if (user.profile.fullName) completed++;
    if (user.profile.city && user.profile.state) completed++;
    if (user.profile.education) completed++;
    if (user.profile.hasCompletedDISC) completed++;
    if (user.profile.hasCompletedCultural) completed++;
    if (user.profile.experiences?.length > 0) completed++;
    
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-talently-purple">Talently</span>
            <Badge variant="secondary">Candidato</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Olá, {user.name}!</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Progresso do Perfil */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Progresso do Perfil
              </CardTitle>
              <CardDescription>
                Complete seu perfil para ter acesso a mais vagas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Perfil Completo</span>
                  <span className="text-sm text-gray-600">{profileCompletion()}%</span>
                </div>
                <Progress value={profileCompletion()} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Completar Perfil */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Perfil Pessoal
              </CardTitle>
              <CardDescription>
                Complete suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/profile">
                <Button className="w-full">
                  Completar Perfil
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Teste DISC */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Teste DISC
              </CardTitle>
              <CardDescription>
                Descubra seu perfil comportamental
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.profile?.hasCompletedDISC ? (
                  <div>
                    <Badge variant="outline" className="mb-2">Concluído</Badge>
                    <Link to="/disc-results">
                      <Button variant="outline" className="w-full">
                        Ver Resultados
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Link to="/disc-test">
                    <Button className="w-full">
                      Fazer Teste DISC
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Match Cultural */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Match Cultural
              </CardTitle>
              <CardDescription>
                Encontre empresas com cultura compatível
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.profile?.hasCompletedCultural ? (
                  <div>
                    <Badge variant="outline" className="mb-2">Concluído</Badge>
                    <Link to="/cultural-results">
                      <Button variant="outline" className="w-full">
                        Ver Resultados
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Link to="/cultural-test">
                    <Button className="w-full">
                      Fazer Teste Cultural
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Vagas Disponíveis */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Vagas Disponíveis
              </CardTitle>
              <CardDescription>
                Encontre oportunidades compatíveis com seu perfil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileCompletion() < 80 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Complete pelo menos 80% do seu perfil para ver vagas personalizadas</p>
                  </div>
                ) : (
                  <Link to="/jobs">
                    <Button className="w-full">
                      Ver Vagas Disponíveis
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
