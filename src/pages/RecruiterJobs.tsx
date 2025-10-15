import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockJobs } from "@/data/mockAdminData";
import { getJobCommission } from "@/data/mockRecruiterData";
import { MapPin, DollarSign, Users, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector";

const RecruiterJobs = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  if (!user || user.type !== 'recruiter') {
    navigate('/login');
    return null;
  }

  const translations = {
    pt: {
      availableJobs: 'Vagas Disponíveis',
      searchJobs: 'Pesquisar vagas...',
      filterByLocation: 'Filtrar por localização',
      filterByType: 'Filtrar por tipo',
      allLocations: 'Todas as localizações',
      allTypes: 'Todos os tipos',
      commission: 'Comissão',
      applications: 'Candidaturas',
      indicateCandidate: 'Indicar Candidato',
      backToDashboard: 'Voltar ao Dashboard',
      noJobsFound: 'Nenhuma vaga encontrada com os filtros aplicados.',
      viewDetails: 'Ver Detalhes'
    },
    en: {
      availableJobs: 'Available Jobs',
      searchJobs: 'Search jobs...',
      filterByLocation: 'Filter by location',
      filterByType: 'Filter by type',
      allLocations: 'All locations',
      allTypes: 'All types',
      commission: 'Commission',
      applications: 'Applications',
      indicateCandidate: 'Indicate Candidate',
      backToDashboard: 'Back to Dashboard',
      noJobsFound: 'No jobs found with the applied filters.',
      viewDetails: 'View Details'
    },
    es: {
      availableJobs: 'Trabajos Disponibles',
      searchJobs: 'Buscar trabajos...',
      filterByLocation: 'Filtrar por ubicación',
      filterByType: 'Filtrar por tipo',
      allLocations: 'Todas las ubicaciones',
      allTypes: 'Todos los tipos',
      commission: 'Comisión',
      applications: 'Aplicaciones',
      indicateCandidate: 'Indicar Candidato',
      backToDashboard: 'Volver al Panel',
      noJobsFound: 'No se encontraron trabajos con los filtros aplicados.',
      viewDetails: 'Ver Detalles'
    }
  };

  const currentLang = (localStorage.getItem('language') || 'pt') as 'pt' | 'en' | 'es';
  const tr = translations[currentLang];

  // Only show active jobs
  const activeJobs = mockJobs.filter(job => job.status === 'active');

  // Apply filters
  const filteredJobs = activeJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.includes(locationFilter);
    const matchesType = !typeFilter || job.type === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  // Get unique locations and types for filters
  const uniqueLocations = [...new Set(activeJobs.map(job => job.location.split(',')[0]))];
  const uniqueTypes = [...new Set(activeJobs.map(job => job.type))];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/recruiter/dashboard')}
            >
              {tr.backToDashboard}
            </Button>
            <h1 className="text-xl font-semibold">{tr.availableJobs}</h1>
          </div>
          <LanguageSelector />
        </div>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={tr.searchJobs}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder={tr.filterByLocation} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">{tr.allLocations}</SelectItem>
              {uniqueLocations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder={tr.filterByType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">{tr.allTypes}</SelectItem>
              {uniqueTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => {
            const commission = getJobCommission(job.id);
            
            return (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg mb-2">{job.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{job.companyName}</p>
                    </div>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      {job.applications} {tr.applications}
                    </div>
                    <div className="flex items-center text-sm font-medium text-green-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      R$ {commission.toLocaleString()}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {job.description}
                  </p>
                  
                  <div className="text-sm font-medium text-green-600 bg-green-50 p-2 rounded">
                    {tr.commission}: R$ {commission.toLocaleString()}
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate(`/recruiter/job/${job.id}`)}
                      className="flex-1"
                    >
                      {tr.viewDetails}
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => navigate(`/recruiter/job/${job.id}/indicate`)}
                      className="flex-1"
                    >
                      {tr.indicateCandidate}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{tr.noJobsFound}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterJobs;