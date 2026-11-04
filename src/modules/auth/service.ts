import { z } from 'zod';
import type { UserRole } from '@/data/demoTypes';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const registerSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(4),
  role: z.enum(['volunteer', 'organization_admin', 'verifier', 'super_admin']),
  commune: z.string().min(2),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export interface RolePermissionMatrix {
  role: UserRole;
  canManageOrganizations: boolean;
  canApproveOrganizations: boolean;
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
        canApproveOrganizations: true,
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
        canApproveOrganizations: false,
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
        canApproveOrganizations: false,
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
        canApproveOrganizations: false,
        canCreateInitiatives: false,
        canAssignTasks: false,
        canSubmitEvidence: true,
        canVerifyEvidence: false,
        canAccessAdminGovernance: false,
      };
  }
}
