import { getSupabaseStatus } from '@/integrations/supabase/client';

export interface ModuleReadinessItem {
  moduleKey: string;
  moduleName: string;
  tableName: string;
  rlsPolicyName: string;
  ready: boolean;
}

export const administrationService = {
  getDiagnosticSummary() {
    return getSupabaseStatus();
  },

  getModuleReadinessManifest(): ModuleReadinessItem[] {
    return [
      {
        moduleKey: 'auth_profiles',
        moduleName: 'Authentication & Volunteer Profiles',
        tableName: 'public.profiles',
        rlsPolicyName: 'Public profiles viewable / Own profile editable',
        ready: true,
      },
      {
        moduleKey: 'organizations',
        moduleName: 'Organizations & Associations',
        tableName: 'public.organizations',
        rlsPolicyName: 'Verified public read / Owner write',
        ready: true,
      },
      {
        moduleKey: 'initiatives',
        moduleName: 'Field Initiatives',
        tableName: 'public.initiatives',
        rlsPolicyName: 'Public lifecycle read / Org Admin write',
        ready: true,
      },
      {
        moduleKey: 'tasks',
        moduleName: 'Volunteer Tasks & Assignments',
        tableName: 'public.tasks',
        rlsPolicyName: 'Authenticated read / Coordinator manage',
        ready: true,
      },
      {
        moduleKey: 'evidence',
        moduleName: 'Field Documentation & Evidence',
        tableName: 'public.evidence_records',
        rlsPolicyName: 'Contributor insert / Authenticated read',
        ready: true,
      },
      {
        moduleKey: 'verification',
        moduleName: 'Impact Verification Audits',
        tableName: 'public.verification_audits',
        rlsPolicyName: 'Verifier decision audit log',
        ready: true,
      },
      {
        moduleKey: 'notifications',
        moduleName: 'System Notifications',
        tableName: 'public.notifications',
        rlsPolicyName: 'Recipient-only strict isolation',
        ready: true,
      },
    ];
  },
};
