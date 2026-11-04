import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/modules/auth/AuthProvider';
import { PublicLayout } from '@/shell/PublicLayout';
import { AppShell } from '@/shell/AppShell';

import { LandingPage } from '@/pages/public/LandingPage';
import { AboutPage } from '@/pages/public/AboutPage';
import { PublicInitiativesPage } from '@/pages/public/PublicInitiativesPage';
import { PublicOrganizationsPage } from '@/pages/public/PublicOrganizationsPage';
import { LoginPage } from '@/pages/public/LoginPage';
import { RegisterPage } from '@/pages/public/RegisterPage';

import { DashboardPage } from '@/pages/app/DashboardPage';
import { OrganizationsPage } from '@/pages/app/OrganizationsPage';
import { VolunteersPage } from '@/pages/app/VolunteersPage';
import { InitiativesPage } from '@/pages/app/InitiativesPage';
import { TasksPage } from '@/pages/app/TasksPage';
import { DocumentationPage } from '@/pages/app/DocumentationPage';
import { VerificationPage } from '@/pages/app/VerificationPage';
import { ImpactAnalyticsPage } from '@/pages/app/ImpactAnalyticsPage';
import { NotificationsPage } from '@/pages/app/NotificationsPage';
import { SettingsPage } from '@/pages/app/SettingsPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/initiatives" element={<PublicInitiativesPage />} />
            <Route path="/organizations" element={<PublicOrganizationsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Application Workspace Routes */}
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="organizations" element={<OrganizationsPage />} />
            <Route path="volunteers" element={<VolunteersPage />} />
            <Route path="initiatives" element={<InitiativesPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="documentation" element={<DocumentationPage />} />
            <Route path="verification" element={<VerificationPage />} />
            <Route path="analytics" element={<ImpactAnalyticsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
