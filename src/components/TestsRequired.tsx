
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Brain, Users } from "lucide-react";
import { useTestStatus } from "@/hooks/useTestStatus";

export default function TestsRequired() {
  const navigate = useNavigate();
  const { hasCompletedDISC, hasCompletedCultural } = useTestStatus();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
            <AlertCircle className="text-yellow-600" size={32} />
          </div>
          <CardTitle className="text-2xl text-gray-800">
            Testes Obrigatórios Pendentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600 text-lg">
            Para acessar as vagas disponíveis, conclua primeiro os testes obrigatórios.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className={`border ${hasCompletedDISC ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${hasCompletedDISC ? 'bg-green-100' : 'bg-blue-100'}`}>
                  <Brain className={hasCompletedDISC ? 'text-green-600' : 'text-blue-600'} size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Teste DISC</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {hasCompletedDISC ? 'Concluído ✓' : 'Descubra seu perfil comportamental'}
                </p>
                {!hasCompletedDISC && (
                  <Button 
                    onClick={() => navigate('/disc-test')}
                    className="w-full"
                  >
                    Fazer Teste DISC
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className={`border ${hasCompletedCultural ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${hasCompletedCultural ? 'bg-green-100' : 'bg-purple-100'}`}>
                  <Users className={hasCompletedCultural ? 'text-green-600' : 'text-purple-600'} size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Teste Cultural</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {hasCompletedCultural ? 'Concluído ✓' : 'Veja seu fit cultural com empresas'}
                </p>
                {!hasCompletedCultural && (
                  <Button 
                    onClick={() => navigate('/cultural-test')}
                    className="w-full"
                    variant="secondary"
                  >
                    Fazer Teste Cultural
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {hasCompletedDISC && hasCompletedCultural && (
            <div className="text-center">
              <Button 
                onClick={() => navigate('/candidate-jobs')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                size="lg"
              >
                Acessar Vagas Disponíveis
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
