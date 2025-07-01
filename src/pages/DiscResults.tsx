
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getProfileData } from "@/data/discResults";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useTestStatus } from "@/hooks/useTestStatus";

export default function DiscResults() {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const { hasCompletedCultural } = useTestStatus();

  if (!user || !user.profile?.discResults) {
    navigate('/disc-test');
    return null;
  }

  const profileData = getProfileData(user.profile.discResults.profileId);

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center pt-6">
            <p className="text-gray-600">Erro ao carregar resultados. Tente novamente.</p>
            <Button onClick={() => navigate('/dashboard')} className="mt-4">
              Voltar ao Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleNext = () => {
    if (hasCompletedCultural) {
      navigate('/candidate-jobs');
    } else {
      navigate('/cultural-test');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header de Sucesso */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="text-green-600" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-talently-darkblue mb-2">
            Teste DISC Concluído!
          </h1>
          <p className="text-gray-600 text-lg">
            Seu perfil comportamental foi identificado com sucesso
          </p>
        </div>

        {/* Resultado Principal */}
        <Card className="mb-8 border-2" style={{ borderColor: profileData.cor }}>
          <CardHeader className="text-center" style={{ backgroundColor: `${profileData.cor}15` }}>
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundColor: profileData.cor }}
            >
              {profileData.id.split('/')[0]}
            </div>
            <CardTitle className="text-2xl" style={{ color: profileData.cor }}>
              {profileData.nome}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700 text-lg leading-relaxed text-center">
              {profileData.descricao}
            </p>
          </CardContent>
        </Card>

        {/* Pontuações Detalhadas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-talently-darkblue">
              Suas Pontuações DISC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(user.profile.discResults.scores).map(([type, score]) => (
                <div key={type} className="text-center">
                 <div className="text-3xl font-bold text-talently-purple mb-1">
                    {String(score)}%
                  </div>
                  <div className="text-sm text-gray-600">
                    {type === 'D' && 'Dominância'}
                    {type === 'I' && 'Influência'}
                    {type === 'S' && 'Estabilidade'}
                    {type === 'C' && 'Conformidade'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Próximos Passos */}
        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-semibold text-talently-darkblue mb-4">
              Próximos Passos
            </h3>
            {!hasCompletedCultural ? (
              <>
                <p className="text-gray-600 mb-6">
                  Agora você precisa completar o Teste de Fit Cultural para acessar as vagas disponíveis.
                </p>
                <Button 
                  onClick={handleNext}
                  className="bg-talently-purple hover:bg-talently-purple/90"
                  size="lg"
                >
                  Fazer Teste Cultural
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  Parabéns! Você completou todos os testes obrigatórios. Agora pode explorar as vagas disponíveis.
                </p>
                <Button 
                  onClick={handleNext}
                  className="bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Ver Vagas Disponíveis
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </>
            )}
            
            <div className="mt-6">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
              >
                Voltar ao Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
