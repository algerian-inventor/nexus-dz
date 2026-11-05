import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoStoreProvider } from '@/data/DemoStoreProvider';
import { PublicLayout } from '@/shell/PublicLayout';
import { AppShell } from '@/shell/AppShell';
import { RoleRouteGuard } from '@/components/shared/RoleRouteGuard';

import { LandingPage } from '@/pages/public/LandingPage';
import { AboutPage } from '@/pages/public/AboutPage';
import { PublicInitiativesPage } from '@/pages/public/PublicInitiativesPage';
import { PublicOrganizationsPage } from '@/pages/public/PublicOrganizationsPage';
import { PublicImpactPage } from '@/pages/public/PublicImpactPage';
import { PublicResourcesPage } from '@/pages/public/PublicResourcesPage';
import { InitiativeDetailPage } from '@/pages/public/InitiativeDetailPage';
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
import { VolunteerPortalPage } from '@/pages/app/VolunteerPortalPage';
import { OrganizationPortalPage } from '@/pages/app/OrganizationPortalPage';
import { VerificationPortalPage } from '@/pages/app/VerificationPortalPage';
import { AdminPortalPage } from '@/pages/app/AdminPortalPage';

export function App() {
  return (
    <DemoStoreProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/initiatives" element={<PublicInitiativesPage />} />
            <Route path="/initiatives/:id" element={<InitiativeDetailPage />} />
            <Route path="/organizations" element={<PublicOrganizationsPage />} />
            <Route path="/impact" element={<PublicImpactPage />} />
            <Route path="/resources" element={<PublicResourcesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Application Workspace Routes (Local Prototype Mode) */}
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route
              path="volunteer"
              element={
                <RoleRouteGuard allowedRoles={['volunteer']}>
                  <VolunteerPortalPage />
                </RoleRouteGuard>
              }
            />
            <Route
              path="organization"
              element={
                <RoleRouteGuard allowedRoles={['organization_admin']}>
                  <OrganizationPortalPage />
                </RoleRouteGuard>
              }
            />
            <Route
              path="verifier"
              element={
                <RoleRouteGuard allowedRoles={['verifier']}>
                  <VerificationPortalPage />
                </RoleRouteGuard>
              }
            />
            <Route
              path="admin"
              element={
                <RoleRouteGuard allowedRoles={['super_admin']}>
                  <AdminPortalPage />
                </RoleRouteGuard>
              }
            />
            <Route path="organizations" element={<OrganizationsPage />} />
            <Route path="volunteers" element={<VolunteersPage />} />
            <Route path="initiatives" element={<InitiativesPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="documentation" element={<DocumentationPage />} />
            <Route
              path="verification"
              element={
                <RoleRouteGuard allowedRoles={['verifier']}>
                  <VerificationPage />
                </RoleRouteGuard>
              }
            />
            <Route path="analytics" element={<ImpactAnalyticsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DemoStoreProvider>
  );
}

export default App;
