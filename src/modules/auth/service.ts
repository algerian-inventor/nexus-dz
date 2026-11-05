import { z } from 'zod';
import type { UserRole } from '../../data/demoTypes.ts';

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
        canCreateInitiatives: false,
        canAssignTasks: false,
        canSubmitEvidence: false,
        canVerifyEvidence: false, // Strict separation: platform admin is not an impact verifier
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
        canVerifyEvidence: false, // Organization cannot verify its own impact
        canAccessAdminGovernance: false,
      };
    case 'verifier':
      return {
        role,
        canManageOrganizations: false,
        canApproveOrganizations: false,
        canCreateInitiatives: false,
        canAssignTasks: false,
        canSubmitEvidence: false, // Verifier cannot submit evidence
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

export function canAccessPortal(activeRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(activeRole);
}

export interface EvidenceReviewCheckInput {
  evidenceSubmittedByAccountId: string;
  evidenceSubmittedByOrgId?: string;
  reviewerAccountId: string;
  reviewerOrgId?: string;
  activeRole: UserRole;
  decision: 'under_review' | 'rejected' | 'verified';
  hasBackendVerifierIsolation: boolean;
}

export interface EvidenceReviewCheckResult {
  allowed: boolean;
  reason?:
    | 'role_not_verifier'
    | 'conflict_of_interest_same_party'
    | 'certification_disabled_without_backend';
}

/**
 * Enforces the NEXUS DZ 3-Tier Impact Integrity & Impartiality Boundary:
 * 1. Only independent verifiers (`verifier` role) may review evidence.
 * 2. Submitter or same organization can NEVER review their own evidence.
 * 3. Final certification (`verified`) that increments verified impact figures
 *    is disabled when running in client-only prototype mode without backend isolation.
 */
export function validateEvidenceReview(input: EvidenceReviewCheckInput): EvidenceReviewCheckResult {
  const perms = getRolePermissions(input.activeRole);
  if (!perms.canVerifyEvidence) {
    return { allowed: false, reason: 'role_not_verifier' };
  }

  if (
    input.evidenceSubmittedByAccountId &&
    input.evidenceSubmittedByAccountId === input.reviewerAccountId
  ) {
    return { allowed: false, reason: 'conflict_of_interest_same_party' };
  }

  if (
    input.evidenceSubmittedByOrgId &&
    input.reviewerOrgId &&
    input.evidenceSubmittedByOrgId === input.reviewerOrgId
  ) {
    return { allowed: false, reason: 'conflict_of_interest_same_party' };
  }

  if (input.decision === 'verified' && !input.hasBackendVerifierIsolation) {
    return { allowed: false, reason: 'certification_disabled_without_backend' };
  }

  return { allowed: true };
}
