
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, VideoIcon, Phone, MessageSquare, Star } from 'lucide-react';
import { MockCandidate } from '@/data/mockAdminData';

interface InterviewsViewProps {
  candidate: MockCandidate;
}

const InterviewsView = ({ candidate }: InterviewsViewProps) => {
  const getInterestBadge = (level: string) => {
    const styles = {
      'Muito Interessado': 'bg-green-100 text-green-800',
      'Interessado': 'bg-blue-100 text-blue-800',
      'Pouco Interessado': 'bg-yellow-100 text-yellow-800',
      'Não Interessado': 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={styles[level as keyof typeof styles]}>
        <Star size={12} className="mr-1" />
        {level}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      'Agendada': 'bg-blue-100 text-blue-800',
      'Realizada': 'bg-green-100 text-green-800',
      'Cancelada': 'bg-red-100 text-red-800',
      'Reagendada': 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <Badge className={styles[status as keyof typeof styles]}>
        {status}
      </Badge>
    );
  };

  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case 'Online':
        return <VideoIcon size={16} className="text-blue-600" />;
      case 'Telefone':
        return <Phone size={16} className="text-green-600" />;
      default:
        return <MapPin size={16} className="text-purple-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Avaliações de Interesse das Empresas */}
      {candidate.interviewEvaluations && candidate.interviewEvaluations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="text-yellow-600" size={20} />
              <span>Avaliações de Interesse das Empresas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidate.interviewEvaluations.map((evaluation, index) => (
                <div key={index} className="border-l-4 border-yellow-500 pl-4 py-3 bg-gray-50 rounded-r">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{evaluation.jobTitle}</h4>
                      <p className="text-sm text-gray-600">{evaluation.companyName}</p>
                    </div>
                    {getInterestBadge(evaluation.interestLevel)}
                  </div>
                  
                  {evaluation.comments && (
                    <div className="mt-3 p-3 bg-white rounded border-l-2 border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageSquare size={14} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Comentários da Empresa:</span>
                      </div>
                      <p className="text-sm text-gray-700">{evaluation.comments}</p>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Avaliado em: {evaluation.evaluatedAt.toLocaleDateString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Entrevistas Agendadas */}
      {candidate.scheduledInterviews && candidate.scheduledInterviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="text-blue-600" size={20} />
              <span>Entrevistas Agendadas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidate.scheduledInterviews.map((interview) => (
                <div key={interview.id} className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{interview.jobTitle}</h4>
                      <p className="text-sm text-gray-600">{interview.companyName}</p>
                    </div>
                    {getStatusBadge(interview.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {interview.scheduledDate.toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{interview.scheduledTime}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {getInterviewTypeIcon(interview.interviewType)}
                      <span className="text-sm text-gray-700">{interview.interviewType}</span>
                    </div>
                    
                    {interview.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin size={14} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{interview.location}</span>
                      </div>
                    )}
                    
                    {interview.meetingLink && (
                      <div className="flex items-center space-x-2 col-span-2">
                        <VideoIcon size={14} className="text-gray-500" />
                        <a 
                          href={interview.meetingLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Link da reunião
                        </a>
                      </div>
                    )}
                  </div>

                  {interview.notes && (
                    <div className="mt-3 p-3 bg-white rounded border-l-2 border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageSquare size={14} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Observações:</span>
                      </div>
                      <p className="text-sm text-gray-700">{interview.notes}</p>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Agendado em: {interview.createdAt.toLocaleDateString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mensagem quando não há dados */}
      {(!candidate.interviewEvaluations || candidate.interviewEvaluations.length === 0) &&
       (!candidate.scheduledInterviews || candidate.scheduledInterviews.length === 0) && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma entrevista ou avaliação encontrada
              </h3>
              <p className="text-gray-500">
                Este candidato ainda não possui entrevistas agendadas ou avaliações de interesse das empresas.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InterviewsView;
