
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
  password: z.string().min(1, {
    message: "A senha não pode estar em branco.",
  }),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    try {
      const success = await login(values.email, values.password);
      
      if (success) {
        toast({
          title: t('login.success'),
          description: t('login.welcome'),
        });
        navigate('/dashboard');
      } else {
        toast({
          title: t('login.error'),
          description: t('login.incorrectCredentials'),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t('login.error'),
        description: t('login.tryAgain'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-talently-darkblue">{t('login.title')}</CardTitle>
          <CardDescription>
            {t('login.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('login.email')}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>{t('login.password')}</FormLabel>
                      <Link to="/forgot-password" className="text-sm text-talently-purple hover:underline">
                        {t('login.forgotPassword')}
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-talently-purple hover:bg-talently-purple/90"
                disabled={isLoading}
              >
                {isLoading ? t('login.loading') : t('login.submit')}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            {t('login.noAccount')}{" "}
            <Link to="/signup" className="font-semibold text-talently-purple hover:underline">
              {t('login.signUpLink')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
