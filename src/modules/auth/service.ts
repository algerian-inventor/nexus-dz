import { z } from 'zod';
import { supabase, getSupabaseStatus } from '@/integrations/supabase/client';
import type { UserRole } from '@/integrations/supabase/types';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['volunteer', 'organization_admin', 'verifier', 'super_admin']),
  commune: z.string().min(2),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export const authService = {
  getConnectionStatus() {
    return getSupabaseStatus();
  },

  async signInWithPassword(input: LoginInput) {
    if (!supabase) {
      return {
        data: null,
        error: new Error('SUPABASE_NOT_CONFIGURED'),
      };
    }
    return supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });
  },

  async signUp(input: RegisterInput) {
    if (!supabase) {
      return {
        data: null,
        error: new Error('SUPABASE_NOT_CONFIGURED'),
      };
    }
    return supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          full_name: input.fullName,
          role: input.role,
          commune: input.commune,
          wilaya_code: '25',
        },
      },
    });
  },

  async signOut() {
    if (!supabase) return { error: null };
    return supabase.auth.signOut();
  },
};

export interface RolePermissionMatrix {
  role: UserRole;
  canManageOrganizations: boolean;
  canCreateInitiatives: boolean;
  canAssignTasks: boolean;
  canSubmitEvidence: boolean;
  canVerifyEvidence: boolean;
  canAccessAdminGovernance: boolean;
}

export function getRolePermissions(role: UserRole): RolePermissionMatrix {
  switch (role) {
    case 'super_admin':
      return {
        role,
        canManageOrganizations: true,
        canCreateInitiatives: true,
        canAssignTasks: true,
        canSubmitEvidence: true,
        canVerifyEvidence: true,
        canAccessAdminGovernance: true,
      };
    case 'organization_admin':
      return {
        role,
        canManageOrganizations: true,
        canCreateInitiatives: true,
        canAssignTasks: true,
        canSubmitEvidence: true,
        canVerifyEvidence: false,
        canAccessAdminGovernance: false,
      };
    case 'verifier':
      return {
        role,
        canManageOrganizations: false,
        canCreateInitiatives: false,
        canAssignTasks: false,
        canSubmitEvidence: false,
        canVerifyEvidence: true,
        canAccessAdminGovernance: false,
      };
    case 'volunteer':
    default:
      return {
        role: 'volunteer',
        canManageOrganizations: false,
        canCreateInitiatives: false,
        canAssignTasks: false,
        canSubmitEvidence: true,
        canVerifyEvidence: false,
        canAccessAdminGovernance: false,
      };
  }
}
