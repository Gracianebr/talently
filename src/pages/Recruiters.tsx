import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, DollarSign, TrendingUp, Award } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";

const Recruiters = () => {
  const navigate = useNavigate();
  const currentLang = (localStorage.getItem('language') || 'pt') as 'pt' | 'en' | 'es';

  const translations = {
    pt: {
      title: "Programa de Recrutadores Talently",
      subtitle: "Ganhe comissões indicando candidatos qualificados para vagas exclusivas",
      howItWorks: "Como Funciona",
      step1Title: "Cadastre-se",
      step1Desc: "Crie sua conta de recrutador gratuitamente",
      step2Title: "Explore Vagas",
      step2Desc: "Acesse vagas exclusivas com comissões atrativas",
      step3Title: "Indique Candidatos",
      step3Desc: "Faça upload de CVs e acompanhe suas indicações",
      step4Title: "Receba Comissões",
      step4Desc: "Ganhe após o candidato completar 100 dias na empresa",
      benefits: "Benefícios",
      benefit1: "Comissões competitivas",
      benefit2: "Vagas exclusivas",
      benefit3: "Dashboard completo",
      benefit4: "Suporte dedicado",
      cta: "Comece Agora",
      login: "Já tem conta? Faça login"
    },
    en: {
      title: "Talently Recruiters Program",
      subtitle: "Earn commissions by referring qualified candidates to exclusive jobs",
      howItWorks: "How It Works",
      step1Title: "Sign Up",
      step1Desc: "Create your recruiter account for free",
      step2Title: "Explore Jobs",
      step2Desc: "Access exclusive jobs with attractive commissions",
      step3Title: "Refer Candidates",
      step3Desc: "Upload CVs and track your referrals",
      step4Title: "Get Paid",
      step4Desc: "Earn after candidate completes 100 days at company",
      benefits: "Benefits",
      benefit1: "Competitive commissions",
      benefit2: "Exclusive jobs",
      benefit3: "Complete dashboard",
      benefit4: "Dedicated support",
      cta: "Get Started",
      login: "Already have an account? Sign in"
    },
    es: {
      title: "Programa de Reclutadores Talently",
      subtitle: "Gana comisiones recomendando candidatos calificados para trabajos exclusivos",
      howItWorks: "Cómo Funciona",
      step1Title: "Regístrate",
      step1Desc: "Crea tu cuenta de reclutador gratis",
      step2Title: "Explora Trabajos",
      step2Desc: "Accede a trabajos exclusivos con comisiones atractivas",
      step3Title: "Recomienda Candidatos",
      step3Desc: "Sube CVs y rastrea tus recomendaciones",
      step4Title: "Recibe Pagos",
      step4Desc: "Gana después de que el candidato complete 100 días",
      benefits: "Beneficios",
      benefit1: "Comisiones competitivas",
      benefit2: "Trabajos exclusivos",
      benefit3: "Dashboard completo",
      benefit4: "Soporte dedicado",
      cta: "Comenzar Ahora",
      login: "¿Ya tienes cuenta? Iniciar sesión"
    }
  };

  const tr = translations[currentLang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Talently</h1>
          <LanguageSelector />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {tr.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          {tr.subtitle}
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => navigate('/recruiter-signup')} className="text-lg px-8">
            {tr.cta}
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/login')} className="text-lg px-8">
            {tr.login}
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-20">
        <h2 className="text-3xl font-bold text-center mb-12">{tr.howItWorks}</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{tr.step1Title}</h3>
              <p className="text-sm text-muted-foreground">{tr.step1Desc}</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{tr.step2Title}</h3>
              <p className="text-sm text-muted-foreground">{tr.step2Desc}</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{tr.step3Title}</h3>
              <p className="text-sm text-muted-foreground">{tr.step3Desc}</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{tr.step4Title}</h3>
              <p className="text-sm text-muted-foreground">{tr.step4Desc}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="container py-20">
        <h2 className="text-3xl font-bold text-center mb-12">{tr.benefits}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[tr.benefit1, tr.benefit2, tr.benefit3, tr.benefit4].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-lg border bg-card">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-medium">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20 text-center">
        <Card className="max-w-2xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-10 pb-10">
            <h2 className="text-3xl font-bold mb-4">
              Comece a ganhar hoje
            </h2>
            <p className="text-muted-foreground mb-6">
              Junte-se a centenas de recrutadores que já estão ganhando comissões
            </p>
            <Button size="lg" onClick={() => navigate('/recruiter-signup')} className="text-lg px-8">
              {tr.cta}
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Recruiters;
