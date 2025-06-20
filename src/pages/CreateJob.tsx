
import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";

const CULTURAL_PROFILES = [
  'Exploradora', 'Executora', 'Guardiã', 'Conectora'
];

const DISC_PROFILES = [
  'Dominante', 'Influente', 'Estável', 'Consciencioso',
  'Dominante-Influente', 'Dominante-Estável', 'Dominante-Consciencioso',
  'Influente-Estável', 'Influente-Consciencioso', 'Estável-Consciencioso'
];

const LOCATION_TYPES = ['Remoto', 'Presencial', 'Híbrido'];
const CONTRACT_TYPES = ['CLT', 'PJ', 'Estágio', 'Freelancer', 'Temporário'];
const EXPERIENCE_LEVELS = ['Júnior', 'Pleno', 'Sênior', 'Especialista', 'Coordenação', 'Gerência'];

export default function CreateJob() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [benefits, setBenefits] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [qualifyingQuestions, setQualifyingQuestions] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newQuestion, setNewQuestion] = useState('');

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      location: '',
      locationType: 'Híbrido',
      salaryRange: '',
      contractType: 'CLT',
      experienceLevel: 'Pleno',
      culturalProfile: 'Exploradora',
      discProfile: ''
    }
  });

  if (user?.type !== 'company') {
    navigate('/dashboard');
    return null;
  }

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit('');
    }
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQualifyingQuestions([...qualifyingQuestions, newQuestion.trim()]);
      setNewQuestion('');
    }
  };

  const removeQuestion = (index: number) => {
    setQualifyingQuestions(qualifyingQuestions.filter((_, i) => i !== index));
  };

  const onSubmit = (data: any) => {
    console.log('Nova vaga criada:', {
      ...data,
      benefits,
      requirements,
      qualifyingQuestions
    });
    alert('Vaga criada com sucesso!');
    navigate('/jobs');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/jobs')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Voltar</span>
              </Button>
              <span className="text-2xl font-bold text-talently-purple">Talently</span>
            </div>
            <Button 
              onClick={form.handleSubmit(onSubmit)}
              className="bg-talently-purple hover:bg-talently-purple/90"
            >
              <Save size={16} className="mr-2" />
              Criar Vaga
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-talently-darkblue mb-2">
            Nova Vaga
          </h1>
          <p className="text-gray-600">
            Crie uma nova vaga para atrair os melhores talentos
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título da Vaga *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Desenvolvedor Frontend React" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição da Vaga *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva as principais responsabilidades e o que a pessoa fará no dia a dia..."
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Localização *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: São Paulo, SP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="locationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Trabalho *</FormLabel>
                        <FormControl>
                          <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            {LOCATION_TYPES.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="contractType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Contrato *</FormLabel>
                        <FormControl>
                          <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            {CONTRACT_TYPES.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nível de Experiência *</FormLabel>
                        <FormControl>
                          <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            {EXPERIENCE_LEVELS.map(level => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salaryRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Faixa Salarial</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: R$ 5.000 - R$ 8.000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Perfil Desejado */}
            <Card>
              <CardHeader>
                <CardTitle>Perfil Desejado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="culturalProfile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Perfil Cultural *</FormLabel>
                        <FormControl>
                          <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            {CULTURAL_PROFILES.map(profile => (
                              <option key={profile} value={profile}>{profile}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discProfile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Perfil DISC</FormLabel>
                        <FormControl>
                          <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="">Selecione um perfil DISC</option>
                            {DISC_PROFILES.map(profile => (
                              <option key={profile} value={profile}>{profile}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Requisitos */}
            <Card>
              <CardHeader>
                <CardTitle>Requisitos Obrigatórios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Digite um requisito obrigatório"
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                  />
                  <Button type="button" onClick={addRequirement} size="sm">
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {requirements.map((requirement, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-2">
                      {requirement}
                      <X 
                        size={14} 
                        className="cursor-pointer hover:text-red-500" 
                        onClick={() => removeRequirement(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefí cios */}
            <Card>
              <CardHeader>
                <CardTitle>Benefícios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Digite um benefício"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                  />
                  <Button type="button" onClick={addBenefit} size="sm">
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {benefits.map((benefit, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-2">
                      {benefit}
                      <X 
                        size={14} 
                        className="cursor-pointer hover:text-red-500" 
                        onClick={() => removeBenefit(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Perguntas Qualificadoras */}
            <Card>
              <CardHeader>
                <CardTitle>Perguntas Qualificadoras</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Digite uma pergunta qualificadora"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addQuestion())}
                  />
                  <Button type="button" onClick={addQuestion} size="sm">
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="space-y-2">
                  {qualifyingQuestions.map((question, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                      <span className="text-talently-purple font-medium">{index + 1}.</span>
                      <span className="flex-1">{question}</span>
                      <X 
                        size={16} 
                        className="cursor-pointer hover:text-red-500" 
                        onClick={() => removeQuestion(index)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
