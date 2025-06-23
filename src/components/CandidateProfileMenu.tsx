
import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User, Edit, Trash2, LogOut, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CandidateProfileMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
  };

  const handleDeleteAccount = () => {
    // Aqui seria implementada a lógica de exclusão da conta
    logout();
    navigate('/');
    toast({
      title: "Conta excluída",
      description: "Sua conta foi excluída com sucesso",
      variant: "destructive",
    });
    setShowDeleteDialog(false);
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  if (!user || user.type !== 'candidate') {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <User size={20} />
            <span>{user.name}</span>
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={handleViewProfile} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Visualizar Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEditProfile} className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            <span>Editar Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)} 
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Excluir Conta</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Fazer Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Conta</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.
              Todos os seus dados serão permanentemente removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir Conta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
