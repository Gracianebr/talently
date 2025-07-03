
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { MockTest } from '@/data/mockAdminData';

interface TestFullViewProps {
  test: MockTest;
}

const TestFullView = ({ test }: TestFullViewProps) => {
  const isDiscTest = test.type === 'disc';

  return (
    <div className="space-y-6">
      {/* Informações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {isDiscTest ? (
              <Brain className="text-blue-600" size={20} />
            ) : (
              <Users className="text-purple-600" size={20} />
            )}
            <span>Informações do Teste {isDiscTest ? 'DISC' : 'Cultural'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Participante</label>
              <p className="mt-1 text-sm text-gray-900">{test.userName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{test.userEmail}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Data de Conclusão</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(test.completedAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Resultado</label>
              <Badge 
                className={isDiscTest 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-purple-100 text-purple-800'
                }
              >
                {test.profile}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Perguntas e Respostas */}
      {test.questions && test.questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Perguntas e Respostas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {test.questions.map((qa, index) => (
                <div key={index} className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {index + 1}. {qa.question}
                  </h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {qa.answer}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resultado Detalhado */}
      {test.detailedResult && (
        <Card>
          <CardHeader>
            <CardTitle>Análise Detalhada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Descrição */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Descrição do Perfil</h4>
              <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                {test.detailedResult.description}
              </p>
            </div>

            {/* Pontos Fortes */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <CheckCircle className="text-green-600 mr-2" size={18} />
                Pontos Fortes
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {test.detailedResult.strengths.map((strength, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Áreas de Desenvolvimento */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <AlertCircle className="text-orange-600 mr-2" size={18} />
                Áreas para Desenvolvimento
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {test.detailedResult.areas_for_development.map((area, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recomendações */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recomendações</h4>
              <div className="space-y-2">
                {test.detailedResult.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span className="text-sm text-gray-700">{recommendation}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sobre o Teste */}
      <Card>
        <CardHeader>
          <CardTitle>Sobre o Teste {isDiscTest ? 'DISC' : 'Cultural'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`p-4 rounded-lg ${isDiscTest ? 'bg-blue-50' : 'bg-purple-50'}`}>
            <p className={`text-sm ${isDiscTest ? 'text-blue-800' : 'text-purple-800'}`}>
              {isDiscTest ? (
                'O teste DISC é uma ferramenta de avaliação comportamental que identifica os estilos de comportamento predominantes de uma pessoa. Ele analisa quatro dimensões principais: Dominância (D), Influência (I), Estabilidade (S) e Conformidade (C).'
              ) : (
                'O teste de Fit Cultural avalia a compatibilidade entre os valores, crenças e comportamentos de uma pessoa com a cultura organizacional. Ele identifica perfis como Executor, Conector, Guardião e Explorador.'
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestFullView;
