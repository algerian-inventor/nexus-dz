import { getRolePermissions, canAccessPortal, validateEvidenceReview } from './service.ts';

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

export function runAuthAndVerificationTests(): void {
  // 1. Role Permission Matrix Separation of Duties
  const adminPerms = getRolePermissions('super_admin');
  assert(adminPerms.canApproveOrganizations === true, 'super_admin can review org drafts');
  assert(adminPerms.canVerifyEvidence === false, 'super_admin cannot verify impact evidence');
  assert(adminPerms.canCreateInitiatives === false, 'super_admin cannot create initiatives');

  const orgPerms = getRolePermissions('organization_admin');
  assert(orgPerms.canCreateInitiatives === true, 'organization_admin can create initiatives');
  assert(orgPerms.canSubmitEvidence === true, 'organization_admin can submit evidence');
  assert(orgPerms.canVerifyEvidence === false, 'organization_admin cannot verify its own evidence');
  assert(orgPerms.canApproveOrganizations === false, 'organization_admin cannot approve orgs');

  const verifierPerms = getRolePermissions('verifier');
  assert(verifierPerms.canVerifyEvidence === true, 'verifier can review evidence');
  assert(verifierPerms.canSubmitEvidence === false, 'verifier cannot submit evidence');
  assert(verifierPerms.canCreateInitiatives === false, 'verifier cannot create initiatives');

  const volunteerPerms = getRolePermissions('volunteer');
  assert(volunteerPerms.canSubmitEvidence === true, 'volunteer can submit task evidence');
  assert(volunteerPerms.canVerifyEvidence === false, 'volunteer cannot verify evidence');
  assert(volunteerPerms.canManageOrganizations === false, 'volunteer cannot manage orgs');

  // 2. Portal Route Access Boundaries
  assert(
    canAccessPortal('volunteer', ['volunteer']) === true,
    'volunteer can access volunteer portal'
  );
  assert(
    canAccessPortal('volunteer', ['organization_admin']) === false,
    'volunteer blocked from organization portal'
  );
  assert(
    canAccessPortal('volunteer', ['verifier']) === false,
    'volunteer blocked from verifier portal'
  );
  assert(
    canAccessPortal('volunteer', ['super_admin']) === false,
    'volunteer blocked from admin portal'
  );

  // 3. Independent Verification & Conflict-of-Interest Rules
  const nonVerifierAttempt = validateEvidenceReview({
    evidenceSubmittedByAccountId: 'acc-org-1',
    evidenceSubmittedByOrgId: 'org-1',
    reviewerAccountId: 'acc-org-2',
    reviewerOrgId: 'org-2',
    activeRole: 'organization_admin',
    decision: 'under_review',
    hasBackendVerifierIsolation: false,
  });
  assert(
    nonVerifierAttempt.allowed === false && nonVerifierAttempt.reason === 'role_not_verifier',
    'non-verifier role must be blocked from reviewing evidence'
  );

  const sameAccountAttempt = validateEvidenceReview({
    evidenceSubmittedByAccountId: 'acc-same',
    evidenceSubmittedByOrgId: 'org-1',
    reviewerAccountId: 'acc-same',
    reviewerOrgId: undefined,
    activeRole: 'verifier',
    decision: 'under_review',
    hasBackendVerifierIsolation: false,
  });
  assert(
    sameAccountAttempt.allowed === false &&
      sameAccountAttempt.reason === 'conflict_of_interest_same_party',
    'same account must be blocked from reviewing its own evidence'
  );

  const sameOrgAttempt = validateEvidenceReview({
    evidenceSubmittedByAccountId: 'acc-org-1',
    evidenceSubmittedByOrgId: 'org-shared',
    reviewerAccountId: 'acc-verifier-1',
    reviewerOrgId: 'org-shared',
    activeRole: 'verifier',
    decision: 'under_review',
    hasBackendVerifierIsolation: false,
  });
  assert(
    sameOrgAttempt.allowed === false && sameOrgAttempt.reason === 'conflict_of_interest_same_party',
    'same organization must be blocked from reviewing its own evidence'
  );

  const serverlessCertifyAttempt = validateEvidenceReview({
    evidenceSubmittedByAccountId: 'acc-org-1',
    evidenceSubmittedByOrgId: 'org-1',
    reviewerAccountId: 'acc-verifier-independent',
    reviewerOrgId: undefined,
    activeRole: 'verifier',
    decision: 'verified',
    hasBackendVerifierIsolation: false,
  });
  assert(
    serverlessCertifyAttempt.allowed === false &&
      serverlessCertifyAttempt.reason === 'certification_disabled_without_backend',
    'official verified certification must be blocked in client-only mode without backend isolation'
  );

  const validPreliminaryReview = validateEvidenceReview({
    evidenceSubmittedByAccountId: 'acc-org-1',
    evidenceSubmittedByOrgId: 'org-1',
    reviewerAccountId: 'acc-verifier-independent',
    reviewerOrgId: undefined,
    activeRole: 'verifier',
    decision: 'under_review',
    hasBackendVerifierIsolation: false,
  });
  assert(
    validPreliminaryReview.allowed === true,
    'independent verifier can mark evidence as under_review in prototype mode'
  );
}

runAuthAndVerificationTests();
