
import { useAuth } from "@/contexts/AuthContext";

export const useTestStatus = () => {
  const { user } = useAuth();

  if (!user || user.type !== 'candidate') {
    return {
      hasCompletedDISC: false,
      hasCompletedCultural: false,
      canAccessJobs: false,
    };
  }

  const hasCompletedDISC = user.profile?.hasCompletedDISC || false;
  const hasCompletedCultural = user.profile?.hasCompletedCultural || false;
  const canAccessJobs = hasCompletedDISC; // Apenas DISC é obrigatório

  return {
    hasCompletedDISC,
    hasCompletedCultural,
    canAccessJobs,
  };
};
