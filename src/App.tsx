
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import DiscTest from "./pages/DiscTest";
import DiscResults from "./pages/DiscResults";
import CulturalTest from "./pages/CulturalTest";
import Candidates from "./pages/Candidates";
import Jobs from "./pages/Jobs";
import EditJob from "./pages/EditJob";
import CreateJob from "./pages/CreateJob";
import CandidateJobs from "./pages/CandidateJobs";
import JobDetails from "./pages/JobDetails";

const queryClient = new QueryClient();

import { AuthProvider } from "./contexts/AuthContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import AdminLayout from "./components/AdminLayout";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCandidates from "./pages/admin/AdminCandidates";
import AdminCompanies from "./pages/admin/AdminCompanies";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminTests from "./pages/admin/AdminTests";
import JobCandidates from "./pages/admin/JobCandidates";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import RecruiterJobs from "./pages/RecruiterJobs";
import RecruiterJobDetails from "./pages/RecruiterJobDetails";
import RecruiterIndicateCandidate from "./pages/RecruiterIndicateCandidate";
import RecruiterSignUp from "./pages/RecruiterSignUp";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <Toaster />
            <Sonner />
            <FloatingWhatsApp />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/disc-test" element={<DiscTest />} />
                <Route path="/disc-results" element={<DiscResults />} />
                <Route path="/cultural-test" element={<CulturalTest />} />
                <Route path="/candidates" element={<Candidates />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/edit" element={<EditJob />} />
                <Route path="/jobs/create" element={<CreateJob />} />
                <Route path="/candidate-jobs" element={<CandidateJobs />} />
                <Route path="/job/:id" element={<JobDetails />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                {/* Recruiter Routes */}
                <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
                <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
                <Route path="/recruiter/job/:id" element={<RecruiterJobDetails />} />
                <Route path="/recruiter/job/:id/indicate" element={<RecruiterIndicateCandidate />} />
                <Route path="/recruiter/signup" element={<RecruiterSignUp />} />
                
                <Route path="/admin" element={
                  <AdminProtectedRoute>
                    <AdminLayout />
                  </AdminProtectedRoute>
                }>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="candidates" element={<AdminCandidates />} />
                  <Route path="companies" element={<AdminCompanies />} />
                  <Route path="jobs" element={<AdminJobs />} />
                  <Route path="jobs/:jobId/candidates" element={<JobCandidates />} />
                  <Route path="tests" element={<AdminTests />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AdminAuthProvider>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
