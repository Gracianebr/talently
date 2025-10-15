import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LanguageSelector from "@/components/LanguageSelector";

const RecruiterSignUp = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    cpf: '',
    cnpj: '',
    password: '',
    confirmPassword: '',
    contractFile: null as File | null,
    bankStatementFile: null as File | null,
    agreeTerms: false
  });

  const translations = {
    pt: {
      recruiterSignUp: 'Cadastro de Recrutador',
      personalData: 'Dados Pessoais',
      name: 'Nome Completo',
      email: 'E-mail',
      phone: 'Telefone',
      linkedin: 'LinkedIn',
      cpf: 'CPF',
      cnpj: 'CNPJ (Opcional)',
      password: 'Senha',
      confirmPassword: 'Confirmar Senha',
      documents: 'Documentos',
      contractFile: 'Contrato',
      bankStatementFile: 'Comprovante Bancário',
      selectFile: 'Selecionar arquivo',
      agreeTerms: 'Concordo com os termos e condições',
      createAccount: 'Criar Conta',
      backToLogin: 'Já tem conta? Faça login',
      fillAllFields: 'Preencha todos os campos obrigatórios',
      passwordsNotMatch: 'As senhas não coincidem',
      accountCreated: 'Conta criada com sucesso!',
      cpfInvalid: 'CPF inválido',
      linkedinInvalid: 'URL do LinkedIn inválida'
    },
    en: {
      recruiterSignUp: 'Recruiter Sign Up',
      personalData: 'Personal Data',
      name: 'Full Name',
      email: 'E-mail',
      phone: 'Phone',
      linkedin: 'LinkedIn',
      cpf: 'CPF',
      cnpj: 'CNPJ (Optional)',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      documents: 'Documents',
      contractFile: 'Contract',
      bankStatementFile: 'Bank Statement',
      selectFile: 'Select file',
      agreeTerms: 'I agree to the terms and conditions',
      createAccount: 'Create Account',
      backToLogin: 'Already have an account? Sign in',
      fillAllFields: 'Fill all required fields',
      passwordsNotMatch: 'Passwords do not match',
      accountCreated: 'Account created successfully!',
      cpfInvalid: 'Invalid CPF',
      linkedinInvalid: 'Invalid LinkedIn URL'
    },
    es: {
      recruiterSignUp: 'Registro de Reclutador',
      personalData: 'Datos Personales',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      linkedin: 'LinkedIn',
      cpf: 'CPF',
      cnpj: 'CNPJ (Opcional)',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      documents: 'Documentos',
      contractFile: 'Contrato',
      bankStatementFile: 'Comprobante Bancario',
      selectFile: 'Seleccionar archivo',
      agreeTerms: 'Acepto los términos y condiciones',
      createAccount: 'Crear Cuenta',
      backToLogin: '¿Ya tienes cuenta? Iniciar sesión',
      fillAllFields: 'Completar todos los campos obligatorios',
      passwordsNotMatch: 'Las contraseñas no coinciden',
      accountCreated: '¡Cuenta creada con éxito!',
      cpfInvalid: 'CPF inválido',
      linkedinInvalid: 'URL de LinkedIn inválida'
    }
  };

  const currentLang = (localStorage.getItem('language') || 'pt') as 'pt' | 'en' | 'es';
  const tr = translations[currentLang];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field: 'contractFile' | 'bankStatementFile', file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const validateCPF = (cpf: string) => {
    // Simple CPF validation pattern
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfPattern.test(cpf);
  };

  const validateLinkedIn = (url: string) => {
    if (!url) return true; // Optional field
    const linkedinPattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    return linkedinPattern.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.linkedin || 
        !formData.cpf || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Erro",
        description: tr.fillAllFields,
        variant: "destructive"
      });
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: tr.passwordsNotMatch,
        variant: "destructive"
      });
      return;
    }

    // Validate CPF
    if (!validateCPF(formData.cpf)) {
      toast({
        title: "Erro",
        description: tr.cpfInvalid,
        variant: "destructive"
      });
      return;
    }

    // Validate LinkedIn
    if (!validateLinkedIn(formData.linkedin)) {
      toast({
        title: "Erro",
        description: tr.linkedinInvalid,
        variant: "destructive"
      });
      return;
    }

    // Validate terms agreement
    if (!formData.agreeTerms) {
      toast({
        title: "Erro",
        description: "Você deve concordar com os termos e condições",
        variant: "destructive"
      });
      return;
    }

    // Simulate account creation
    toast({
      title: "Sucesso!",
      description: tr.accountCreated
    });

    // Navigate to login after successful registration
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 justify-between">
          <h1 className="text-xl font-semibold">{tr.recruiterSignUp}</h1>
          <LanguageSelector />
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{tr.personalData}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">{tr.name} *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">{tr.email} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{tr.phone} *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="linkedin">{tr.linkedin} *</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/seu-perfil"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cpf">{tr.cpf} *</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange('cpf', e.target.value)}
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cnpj">{tr.cnpj}</Label>
                  <Input
                    id="cnpj"
                    value={formData.cnpj}
                    onChange={(e) => handleInputChange('cnpj', e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">{tr.password} *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">{tr.confirmPassword} *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{tr.documents}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{tr.contractFile}</Label>
                <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="text-center">
                    <Upload className="mx-auto h-6 w-6 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">
                      {formData.contractFile ? formData.contractFile.name : tr.selectFile}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange('contractFile', e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              <div>
                <Label>{tr.bankStatementFile}</Label>
                <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="text-center">
                    <Upload className="mx-auto h-6 w-6 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">
                      {formData.bankStatementFile ? formData.bankStatementFile.name : tr.selectFile}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('bankStatementFile', e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeTerms: !!checked }))}
            />
            <Label htmlFor="terms" className="text-sm">
              {tr.agreeTerms}
            </Label>
          </div>

          <Button type="submit" className="w-full" size="lg">
            {tr.createAccount}
          </Button>

          <div className="text-center">
            <Button 
              variant="link" 
              onClick={() => navigate('/login')}
              className="text-sm"
            >
              {tr.backToLogin}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecruiterSignUp;