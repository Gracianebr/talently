
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, FileText, GraduationCap, Briefcase, Globe, HelpCircle, Calendar } from 'lucide-react';
import { MockCandidate } from '@/data/mockAdminData';
import InterviewsView from './InterviewsView';

interface CandidateFullViewProps {
  candidate: MockCandidate;
  jobId?: string;
}

const CandidateFullView = ({ candidate, jobId }: CandidateFullViewProps) => {
  const getStatusBadge = (status: MockCandidate['status']) => {
    const styles = {
      'Pré-aprovado': 'bg-green-100 text-green-800',
      'Reprovado': 'bg-red-100 text-red-800',
      'Em avaliação': 'bg-yellow-100 text-yellow-800',
      'Contratado': 'bg-blue-100 text-blue-800'
    };
    
    return (
      <Badge className={styles[status]}>
        {status}
      </Badge>
    );
  };

  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
        <TabsTrigger value="professional">Profissional</TabsTrigger>
        <TabsTrigger value="interviews">Entrevistas</TabsTrigger>
        <TabsTrigger value="tests">Testes</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-6">
        {/* Dados Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="text-blue-600" size={20} />
              <span>Dados Pessoais</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                <p className="mt-1 text-sm text-gray-900">{candidate.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{candidate.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Telefone</label>
                <p className="mt-1 text-sm text-gray-900">{candidate.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Cidade</label>
                <p className="mt-1 text-sm text-gray-900">{candidate.city}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Área de Atuação</label>
                <p className="mt-1 text-sm text-gray-900">{candidate.jobArea}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                {getStatusBadge(candidate.status)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Respostas das Perguntas Qualificadoras */}
        {jobId && candidate.qualifyingAnswers && candidate.qualifyingAnswers[jobId] && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="text-orange-600" size={20} />
                <span>Respostas das Perguntas Qualificadoras</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidate.qualifyingAnswers[jobId].map((qa, index) => (
                  <div key={index} className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {index + 1}. {qa.question}
                    </h4>
                    <div className="flex items-center space-x-2">
                      {qa.answer === 'sim' ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle size={12} className="mr-1" />
                          Sim
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">
                          <XCircle size={12} className="mr-1" />
                          Não
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="professional" className="space-y-6">
        {/* Formação */}
        {candidate.education && candidate.education.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="text-green-600" size={20} />
                <span>Formação Acadêmica</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidate.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-900">{edu.course}</h4>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.level} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Experiência */}
        {candidate.experience && candidate.experience.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="text-purple-600" size={20} />
                <span>Experiência Profissional</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidate.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.period}</p>
                    <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Idiomas */}
        {candidate.languages && candidate.languages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="text-orange-600" size={20} />
                <span>Idiomas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {candidate.languages.map((lang, index) => (
                  <div key={index} className="text-center">
                    <p className="font-medium text-gray-900">{lang.language}</p>
                    <Badge variant="outline" className="mt-1">
                      {lang.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Habilidades */}
        {candidate.skills && candidate.skills.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Habilidades Técnicas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="interviews">
        <InterviewsView candidate={candidate} />
      </TabsContent>

      <TabsContent value="tests" className="space-y-6">
        {/* Perfis dos Testes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Perfil DISC</CardTitle>
            </CardHeader>
            <CardContent>
              {candidate.hasCompletedDISC ? (
                <div>
                  <Badge className="bg-blue-100 text-blue-800 mb-2">
                    <CheckCircle size={12} className="mr-1" />
                    Concluído
                  </Badge>
                  <p className="text-sm text-gray-900">{candidate.discProfile}</p>
                </div>
              ) : (
                <Badge className="bg-red-100 text-red-800">
                  <XCircle size={12} className="mr-1" />
                  Pendente
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Perfil Cultural</CardTitle>
            </CardHeader>
            <CardContent>
              {candidate.hasCompletedCultural ? (
                <div>
                  <Badge className="bg-green-100 text-green-800 mb-2">
                    <CheckCircle size={12} className="mr-1" />
                    Concluído
                  </Badge>
                  <p className="text-sm text-gray-900">{candidate.culturalProfile}</p>
                </div>
              ) : (
                <Badge className="bg-gray-100 text-gray-800">
                  <XCircle size={12} className="mr-1" />
                  Não realizado
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CandidateFullView;
