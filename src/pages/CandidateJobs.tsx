
import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, DollarSign, Building2, Eye } from "lucide-react";
import CandidateProfileMenu from "@/components/CandidateProfileMenu";
import { useTestStatus } from "@/hooks/useTestStatus";
import TestsRequired from "@/components/TestsRequired";

// Mock data para as vagas
const mockJobs = [
  {
    id: '1',
    title: 'Desenvolvedor Frontend React',
    company: 'Tech Solutions',
    location: 'São Paulo, SP',
    type: 'CLT',
    salary: 'R$ 8.000 - R$ 12.000',
    remote: 'Híbrido',
    posted: '2 dias atrás',
    description: 'Desenvolvedor React com experiência em TypeScript...',
  },
  {
    id: '2',
    title: 'Designer UX/UI',
    company: 'Creative Agency',
    location: 'Rio de Janeiro, RJ',
    type: 'PJ',
    salary: 'R$ 6.000 - R$ 9.000',
    remote: 'Remoto',
    posted: '5 dias atrás',
    description: 'Designer experiente em criação de interfaces...',
  },
  {
    id: '3',
    title: 'Analista de Marketing Digital',
    company: 'Marketing Pro',
    location: 'Belo Horizonte, MG',
    type: 'CLT',
    salary: 'R$ 4.500 - R$ 7.000',
    remote: 'Presencial',
    posted: '1 semana atrás',
    description: 'Profissional para gerenciar campanhas digitais...',
  },
];

export default function CandidateJobs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { canAccessJobs } = useTestStatus();

  // Se o usuário não completou os testes, mostrar tela de bloqueio
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

  const handleApply = (jobId: string) => {
    // Navegar para página de candidatura
    navigate(`/apply/${jobId}`);
  };

  const handleViewDetails = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

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
            Vagas Disponíveis
          </h1>
          <p className="text-gray-600">
            Encontre a oportunidade perfeita para sua carreira
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6">
          {mockJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-semibold text-talently-darkblue mb-2">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Building2 size={16} />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{job.posted}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{job.type}</Badge>
                      <Badge variant="outline">{job.remote}</Badge>
                      <Badge className="bg-green-100 text-green-800">
                        <DollarSign size={12} className="mr-1" />
                        {job.salary}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {job.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => handleApply(job.id)}
                    className="bg-talently-purple hover:bg-talently-purple/90 flex-1"
                  >
                    Candidatar-se
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleViewDetails(job.id)}
                    className="flex items-center justify-center space-x-2 flex-1"
                  >
                    <Eye size={16} />
                    <span>Ver Detalhes</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Carregar mais vagas
          </Button>
        </div>
      </div>
    </div>
  );
}
