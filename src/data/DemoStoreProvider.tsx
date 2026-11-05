import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { INITIAL_DEMO_DATASET } from './constantineDemoData';
import type {
  DemoDataset,
  DemoAccount,
  UserRole,
  VerificationStatus,
  TaskStatus,
} from './demoTypes';
import {
  DemoStoreContext,
  getRolePermissions,
  type CreateOrganizationPayload,
  type CreateVolunteerPayload,
  type UpsertInitiativePayload,
  type CreateTaskPayload,
  type RecordAttendancePayload,
  type SubmitEvidencePayload,
} from './demoStoreContext';
import { validateEvidenceReview } from '@/modules/auth/service';

const STORAGE_KEY_DATASET = 'nexus_dz_pilot_dataset_v6';
const STORAGE_KEY_ACCOUNT = 'nexus_dz_pilot_account_v6';

const PROTOTYPE_ROLE_ACCOUNTS: Record<UserRole, DemoAccount> = {
  super_admin: {
    id: 'sim-super-admin',
    email: 'admin.prototype@nexus-dz.org',
    fullNameAr: 'معاينة دور: تنسيق المنصة (نموذج أولي)',
    fullNameFr: 'Aperçu Rôle : Coordination Plateforme (Prototype)',
    role: 'super_admin',
    commune: 'constantine',
    titleAr: 'حساب محاكاة محلي — بدون صلاحيات خادم',
    titleFr: 'Compte de simulation local — Sans serveur',
  },
  organization_admin: {
    id: 'sim-org-admin',
    email: 'asso.prototype@nexus-dz.org',
    fullNameAr: 'معاينة دور: ممثل جمعية (نموذج أولي)',
    fullNameFr: 'Aperçu Rôle : Responsable Association (Prototype)',
    role: 'organization_admin',
    commune: 'constantine',
    titleAr: 'محاكاة تقديم المبادرات والتقارير (محلي)',
    titleFr: 'Simulation de soumission associative (Local)',
    organizationId: 'org-local-1',
  },
  volunteer: {
    id: 'sim-volunteer',
    email: 'volunteer.prototype@nexus-dz.org',
    fullNameAr: 'معاينة دور: متطوع ميداني (نموذج أولي)',
    fullNameFr: 'Aperçu Rôle : Bénévole de Terrain (Prototype)',
    role: 'volunteer',
    commune: 'constantine',
    titleAr: 'محاكاة الترشح وتسجيل الساعات التصريحية',
    titleFr: 'Simulation de bénévolat déclaratif (Local)',
    volunteerId: 'vol-local-1',
  },
  verifier: {
    id: 'sim-verifier',
    email: 'verifier.prototype@nexus-dz.org',
    fullNameAr: 'معاينة دور: مراجع مستقل (نموذج أولي)',
    fullNameFr: 'Aperçu Rôle : Vérificateur Indépendant (Prototype)',
    role: 'verifier',
    commune: 'constantine',
    titleAr: 'محاكاة الفحص الأولي — الاعتماد النهائي معطل بدون خادم',
    titleFr: 'Simulation de pré-contrôle — Certification désactivée sans serveur',
  },
};

function loadInitialDataset(): DemoDataset {
  if (typeof window === 'undefined') return INITIAL_DEMO_DATASET;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_DATASET);
    if (!raw) return INITIAL_DEMO_DATASET;
    const parsed = JSON.parse(raw) as DemoDataset;
    if (parsed && parsed.version === INITIAL_DEMO_DATASET.version) {
      return {
        ...parsed,
        sessionLogs: parsed.sessionLogs ?? [],
      };
    }
  } catch {
    // Fallback to initial dataset
  }
  return INITIAL_DEMO_DATASET;
}

function loadInitialRole(): UserRole {
  if (typeof window === 'undefined') return 'volunteer';
  const saved = window.localStorage.getItem(STORAGE_KEY_ACCOUNT);
  if (
    saved === 'super_admin' ||
    saved === 'organization_admin' ||
    saved === 'volunteer' ||
    saved === 'verifier'
  ) {
    return saved;
  }
  return 'volunteer';
}

export function DemoStoreProvider({ children }: { children: React.ReactNode }) {
  const [dataset, setDataset] = useState<DemoDataset>(loadInitialDataset);
  const [activeRole, setActiveRole] = useState<UserRole>(loadInitialRole);
  const [feedbackBanner, setFeedbackBanner] = useState<{
    message: string;
    type: 'success' | 'info';
  } | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_DATASET, JSON.stringify(dataset));
    } catch {
      // Ignore quota errors
    }
  }, [dataset]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_ACCOUNT, activeRole);
    } catch {
      // Ignore storage errors
    }
  }, [activeRole]);

  const notify = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    setFeedbackBanner({ message, type });
  }, []);

  const clearFeedback = useCallback(() => {
    setFeedbackBanner(null);
  }, []);

  const currentAccount = useMemo<DemoAccount>(() => {
    const base = PROTOTYPE_ROLE_ACCOUNTS[activeRole] ?? PROTOTYPE_ROLE_ACCOUNTS.volunteer;
    if (activeRole === 'organization_admin' && dataset.organizations.length > 0) {
      return {
        ...base,
        organizationId: dataset.organizations[0].id,
      };
    }
    if (activeRole === 'volunteer' && dataset.volunteers.length > 0) {
      return {
        ...base,
        volunteerId: dataset.volunteers[0].id,
      };
    }
    return base;
  }, [activeRole, dataset.organizations, dataset.volunteers]);

  const permissions = useMemo(() => getRolePermissions(activeRole), [activeRole]);

  const appendLog = useCallback(
    (prev: DemoDataset, action: string, details: string, role: UserRole) => {
      const entry = {
        id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        action,
        actorRole: role,
        details,
        timestamp: new Date().toISOString(),
      };
      return [entry, ...(prev.sessionLogs ?? [])];
    },
    []
  );

  const loginWithDemoAccount = useCallback(
    (accountId: string) => {
      const target = dataset.accounts.find((a) => a.id === accountId);
      if (target) {
        setActiveRole(target.role);
        notify(`${target.fullNameAr} — ${target.fullNameFr}`, 'info');
      }
    },
    [dataset.accounts, notify]
  );

  const switchRole = useCallback(
    (role: UserRole) => {
      setActiveRole(role);
      setDataset((prev) => ({
        ...prev,
        sessionLogs: appendLog(
          prev,
          'ROLE_SIMULATION_SWITCH',
          `Switched local prototype role preview to: ${role}`,
          role
        ),
      }));
      notify(`Prototype Role Simulation: ${role}`, 'info');
    },
    [appendLog, notify]
  );

  const createOrganization = useCallback(
    (payload: CreateOrganizationPayload) => {
      const newId = `org-${Date.now()}`;
      setDataset((prev) => ({
        ...prev,
        organizations: [
          {
            id: newId,
            ...payload,
            registrationNumber: payload.registrationNumber.trim() || 'غير مرفق (تصريحي)',
            verificationStatus: 'pending',
            foundedYear: new Date().getFullYear(),
            membersCount: 0, // Never fabricate member counts
            createdAt: new Date().toISOString(),
          },
          ...prev.organizations,
        ],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            titleAr: `مسودة تسجيل جمعية (محلي): ${payload.nameAr}`,
            titleFr: `Brouillon d'organisation (Local) : ${payload.nameFr}`,
            bodyAr: `تم حفظ بيانات الجمعية محلياً في المتصفح (غير مصادق عليها رسمياً).`,
            bodyFr: `Données enregistrées localement dans le navigateur (non vérifiées).`,
            roleTarget: 'super_admin',
            category: 'organization',
            read: false,
            createdAt: new Date().toISOString(),
          },
          ...prev.notifications,
        ],
        sessionLogs: appendLog(
          prev,
          'CREATE_ORGANIZATION_DRAFT',
          `Submitted unverified organization profile: ${payload.nameAr || payload.nameFr}`,
          activeRole
        ),
      }));
      notify(`${payload.nameAr || payload.nameFr} (Saved locally — Unverified)`, 'info');
    },
    [activeRole, appendLog, notify]
  );

  const updateOrganizationStatus = useCallback(
    (orgId: string, status: VerificationStatus) => {
      if (!permissions.canApproveOrganizations) {
        notify('Unauthorized role for organization status update.', 'info');
        return;
      }
      // In client-only prototype mode, never allow setting 'verified' as official accreditation
      const safeStatus: VerificationStatus = status === 'verified' ? 'under_review' : status;

      setDataset((prev) => ({
        ...prev,
        organizations: prev.organizations.map((o) =>
          o.id === orgId ? { ...o, verificationStatus: safeStatus } : o
        ),
        sessionLogs: appendLog(
          prev,
          'UPDATE_ORG_PROTOTYPE_STATUS',
          `Changed organization ${orgId} prototype status to ${safeStatus}`,
          activeRole
        ),
      }));
      notify(
        status === 'verified'
          ? 'Marked as Under Review (Official accreditation requires backend verification)'
          : `Prototype status updated: ${safeStatus}`,
        'info'
      );
    },
    [activeRole, appendLog, notify, permissions.canApproveOrganizations]
  );

  const createVolunteer = useCallback(
    (payload: CreateVolunteerPayload) => {
      const newId = `vol-${Date.now()}`;
      setDataset((prev) => ({
        ...prev,
        volunteers: [
          {
            id: newId,
            ...payload,
            verifiedHours: 0,
            pendingHours: 0,
            completedTasksCount: 0,
            status: 'onboarding',
            joinedAt: new Date().toISOString().slice(0, 10),
          },
          ...prev.volunteers,
        ],
        sessionLogs: appendLog(
          prev,
          'CREATE_VOLUNTEER_DRAFT',
          `Registered local volunteer profile: ${payload.fullNameAr || payload.fullNameFr}`,
          activeRole
        ),
      }));
      notify(`${payload.fullNameAr || payload.fullNameFr} (Local prototype profile)`, 'info');
    },
    [activeRole, appendLog, notify]
  );

  const upsertInitiative = useCallback(
    (payload: UpsertInitiativePayload) => {
      if (!permissions.canCreateInitiatives && activeRole !== 'super_admin') {
        notify('Only association coordinators can create or edit initiatives.', 'info');
        return;
      }
      // Never allow creating/editing an initiative directly as 'verified'
      const safeStatus = payload.status === 'verified' ? 'open' : payload.status;

      setDataset((prev) => {
        if (payload.id) {
          return {
            ...prev,
            initiatives: prev.initiatives.map((init) =>
              init.id === payload.id
                ? {
                    ...init,
                    ...payload,
                    status: safeStatus,
                    id: init.id,
                  }
                : init
            ),
            sessionLogs: appendLog(
              prev,
              'UPDATE_INITIATIVE_DRAFT',
              `Updated initiative: ${payload.titleAr}`,
              activeRole
            ),
          };
        }
        const newId = `init-${Date.now()}`;
        return {
          ...prev,
          initiatives: [
            {
              id: newId,
              organizationId: payload.organizationId,
              titleAr: payload.titleAr,
              titleFr: payload.titleFr,
              summaryAr: payload.summaryAr,
              summaryFr: payload.summaryFr,
              category: payload.category,
              commune: payload.commune,
              locationDetails: payload.locationDetails,
              status: safeStatus,
              targetVolunteers: payload.targetVolunteers,
              enrolledVolunteerIds: [], // Never fabricate enrolled volunteers
              applicantVolunteerIds: [],
              targetBeneficiaries: payload.targetBeneficiaries,
              verifiedBeneficiaries: 0,
              startDate: payload.startDate,
              endDate: payload.endDate,
              createdAt: new Date().toISOString(),
            },
            ...prev.initiatives,
          ],
          notifications: [
            {
              id: `notif-${Date.now()}`,
              titleAr: `مبادرة مقترحة (محلي): ${payload.titleAr}`,
              titleFr: `Initiative proposée (Local) : ${payload.titleFr}`,
              bodyAr: `تم إدراج مسودة مبادرة ${payload.titleAr} في الجلسة المحلية.`,
              bodyFr: `Brouillon d'initiative ${payload.titleFr} enregistré localement.`,
              roleTarget: 'volunteer',
              category: 'initiative',
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...prev.notifications,
          ],
          sessionLogs: appendLog(
            prev,
            'CREATE_INITIATIVE_DRAFT',
            `Created unverified initiative draft: ${payload.titleAr}`,
            activeRole
          ),
        };
      });
      notify(`${payload.titleAr} (Local draft saved)`, 'info');
    },
    [activeRole, appendLog, notify, permissions.canCreateInitiatives]
  );

  const applyToInitiative = useCallback(
    (initiativeId: string, volunteerId?: string) => {
      const volId = volunteerId || currentAccount.volunteerId || 'vol-local-1';
      setDataset((prev) => {
        const targetInit = prev.initiatives.find((i) => i.id === initiativeId);
        const vol = prev.volunteers.find((v) => v.id === volId);
        return {
          ...prev,
          initiatives: prev.initiatives.map((init) => {
            if (init.id !== initiativeId) return init;
            if (
              init.enrolledVolunteerIds.includes(volId) ||
              init.applicantVolunteerIds.includes(volId)
            ) {
              return init;
            }
            return {
              ...init,
              applicantVolunteerIds: [...init.applicantVolunteerIds, volId],
            };
          }),
          notifications: [
            {
              id: `notif-${Date.now()}`,
              titleAr: `طلب ترشح محلي من ${vol?.fullNameAr ?? 'متطوع (نموذج أولي)'}`,
              titleFr: `Candidature locale de ${vol?.fullNameFr ?? 'Bénévole (Prototype)'}`,
              bodyAr: `تم تسجيل طلب انضمام مبدئي إلى مبادرة: ${targetInit?.titleAr ?? ''}`,
              bodyFr: `Demande préliminaire pour l'initiative : ${targetInit?.titleFr ?? ''}`,
              roleTarget: 'organization_admin',
              category: 'initiative',
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...prev.notifications,
          ],
          sessionLogs: appendLog(
            prev,
            'VOLUNTEER_APPLICATION',
            `Submitted prototype application to initiative ${initiativeId}`,
            activeRole
          ),
        };
      });
      notify('Application recorded in local prototype session', 'info');
    },
    [activeRole, appendLog, currentAccount.volunteerId, notify]
  );

  const approveVolunteerApplication = useCallback(
    (initiativeId: string, volunteerId: string) => {
      if (!permissions.canCreateInitiatives) {
        notify('Only association coordinators can review volunteer applications.', 'info');
        return;
      }
      setDataset((prev) => ({
        ...prev,
        initiatives: prev.initiatives.map((init) => {
          if (init.id !== initiativeId) return init;
          return {
            ...init,
            applicantVolunteerIds: init.applicantVolunteerIds.filter((id) => id !== volunteerId),
            enrolledVolunteerIds: init.enrolledVolunteerIds.includes(volunteerId)
              ? init.enrolledVolunteerIds
              : [...init.enrolledVolunteerIds, volunteerId],
          };
        }),
        sessionLogs: appendLog(
          prev,
          'ACCEPT_VOLUNTEER_PROTOTYPE',
          `Preliminarily accepted applicant ${volunteerId} for ${initiativeId} (Unverified)`,
          activeRole
        ),
      }));
      notify('Applicant preliminarily accepted in local prototype (Unverified)', 'info');
    },
    [activeRole, appendLog, notify, permissions.canCreateInitiatives]
  );

  const createTask = useCallback(
    (payload: CreateTaskPayload) => {
      if (!permissions.canAssignTasks && activeRole !== 'super_admin') {
        notify('Unauthorized role for creating tasks.', 'info');
        return;
      }
      const newId = `task-${Date.now()}`;
      setDataset((prev) => ({
        ...prev,
        tasks: [
          {
            id: newId,
            ...payload,
            loggedHours: 0,
            status: payload.assignedVolunteerId ? 'assigned' : 'todo',
            createdAt: new Date().toISOString(),
          },
          ...prev.tasks,
        ],
        sessionLogs: appendLog(
          prev,
          'CREATE_TASK_DRAFT',
          `Created task draft: ${payload.titleAr}`,
          activeRole
        ),
      }));
      notify(payload.titleAr, 'info');
    },
    [activeRole, appendLog, notify, permissions.canAssignTasks]
  );

  const assignTaskVolunteer = useCallback(
    (taskId: string, volunteerId: string | null) => {
      if (!permissions.canAssignTasks && activeRole !== 'super_admin') {
        notify('Unauthorized role for task assignment.', 'info');
        return;
      }
      setDataset((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                assignedVolunteerId: volunteerId,
                status: volunteerId && t.status === 'todo' ? 'assigned' : t.status,
              }
            : t
        ),
      }));
      notify('Task assignment updated (Local prototype)', 'info');
    },
    [activeRole, notify, permissions.canAssignTasks]
  );

  const updateTaskStatus = useCallback(
    (taskId: string, status: TaskStatus) => {
      // Never allow setting task status directly to 'verified' from client UI
      const safeStatus: TaskStatus = status === 'verified' ? 'submitted' : status;
      setDataset((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, status: safeStatus } : t)),
        sessionLogs: appendLog(
          prev,
          'UPDATE_TASK_STATUS',
          `Task ${taskId} status changed to ${safeStatus}`,
          activeRole
        ),
      }));
      notify(`Task status updated: ${safeStatus} (Unverified)`, 'info');
    },
    [activeRole, appendLog, notify]
  );

  const recordAttendance = useCallback(
    (payload: RecordAttendancePayload) => {
      const newId = `att-${Date.now()}`;
      setDataset((prev) => ({
        ...prev,
        attendance: [
          {
            id: newId,
            ...payload,
            status: 'present', // Self-reported presence only, never confirmed physical attendance
          },
          ...prev.attendance,
        ],
        tasks: prev.tasks.map((t) =>
          t.id === payload.taskId
            ? {
                ...t,
                loggedHours: t.loggedHours + payload.hoursLogged,
                status: t.status === 'todo' || t.status === 'assigned' ? 'in_progress' : t.status,
              }
            : t
        ),
        volunteers: prev.volunteers.map((v) =>
          v.id === payload.volunteerId
            ? {
                ...v,
                pendingHours: v.pendingHours + payload.hoursLogged, // Only pending (reported), never verifiedHours
              }
            : v
        ),
        sessionLogs: appendLog(
          prev,
          'LOG_REPORTED_ATTENDANCE',
          `Logged ${payload.hoursLogged}h unverified self-reported attendance`,
          activeRole
        ),
      }));
      notify(
        `Self-reported ${payload.hoursLogged}h recorded as Pending (Unverified — not certified)`,
        'info'
      );
    },
    [activeRole, appendLog, notify]
  );

  const submitEvidence = useCallback(
    (payload: SubmitEvidencePayload) => {
      if (!permissions.canSubmitEvidence) {
        notify('Current role cannot submit field evidence.', 'info');
        return;
      }
      const newId = `ev-${Date.now()}`;
      const targetInit = dataset.initiatives.find((i) => i.id === payload.initiativeId);
      const submitterOrgId = currentAccount.organizationId || targetInit?.organizationId;

      setDataset((prev) => ({
        ...prev,
        evidence: [
          {
            id: newId,
            initiativeId: payload.initiativeId,
            taskId: payload.taskId,
            submittedByAccountId: currentAccount.id,
            submittedByOrgId: submitterOrgId,
            submittedByName: `${currentAccount.fullNameAr} / ${currentAccount.fullNameFr}`,
            submittedByRole: activeRole,
            titleAr: payload.titleAr,
            titleFr: payload.titleFr,
            notes: payload.notes,
            fileName: payload.fileName || 'unattached_prototype_reference',
            mimeType: payload.mimeType || 'text/plain',
            previewDataUrl: payload.previewDataUrl,
            gpsCoordinates: payload.gpsCoordinates || 'غير مرفق (بدون تحقق جغرافي)',
            beneficiariesReached: payload.beneficiariesReached,
            hoursClaimed: payload.hoursClaimed,
            verificationStatus: 'pending',
            createdAt: new Date().toISOString(),
          },
          ...prev.evidence,
        ],
        tasks: prev.tasks.map((t) => (t.id === payload.taskId ? { ...t, status: 'submitted' } : t)),
        notifications: [
          {
            id: `notif-${Date.now()}`,
            titleAr: `تصريح أثر مبدئي (غير مدقق): ${payload.titleAr}`,
            titleFr: `Déclaration d'impact (Non vérifiée) : ${payload.titleFr}`,
            bodyAr: `تم تسجيل تصريح بـ ${payload.beneficiariesReached} مستفيد (قيد الانتظار — لا يُحتسب في الأثر الموثق).`,
            bodyFr: `Déclaration de ${payload.beneficiariesReached} bénéficiaires enregistrée (en attente).`,
            roleTarget: 'verifier',
            category: 'verification',
            read: false,
            createdAt: new Date().toISOString(),
          },
          ...prev.notifications,
        ],
        sessionLogs: appendLog(
          prev,
          'SUBMIT_DECLARATIVE_EVIDENCE',
          `Submitted unverified evidence declaration: ${payload.titleAr}`,
          activeRole
        ),
      }));
      notify(`${payload.titleAr} (Submitted as unverified declaration)`, 'info');
    },
    [
      activeRole,
      appendLog,
      currentAccount,
      dataset.initiatives,
      notify,
      permissions.canSubmitEvidence,
    ]
  );

  const reviewEvidence = useCallback(
    (
      evidenceId: string,
      decision: 'under_review' | 'rejected' | 'verified',
      reviewNotes: string
    ): { allowed: boolean; reason?: string } => {
      const targetEv = dataset.evidence.find((e) => e.id === evidenceId);
      if (!targetEv) {
        return { allowed: false, reason: 'not_found' };
      }

      const check = validateEvidenceReview({
        evidenceSubmittedByAccountId: targetEv.submittedByAccountId,
        evidenceSubmittedByOrgId: targetEv.submittedByOrgId,
        reviewerAccountId: currentAccount.id,
        reviewerOrgId: currentAccount.organizationId,
        activeRole,
        decision,
        hasBackendVerifierIsolation: false, // Client-only prototype has no backend isolation
      });

      if (!check.allowed) {
        if (check.reason === 'conflict_of_interest_same_party') {
          notify(
            'Conflict of Interest Blocked: Submitter or same organization cannot review its own evidence.',
            'info'
          );
        } else if (check.reason === 'certification_disabled_without_backend') {
          notify(
            'Official Impact Certification is disabled in client-only prototype mode (requires backend verifier isolation).',
            'info'
          );
        } else {
          notify('Only the Independent Verifier role may review evidence submissions.', 'info');
        }
        return check;
      }

      setDataset((prev) => {
        const updatedEvidence = prev.evidence.map((e) =>
          e.id === evidenceId ? { ...e, verificationStatus: decision } : e
        );

        const newAuditRecord = {
          id: `ver-${Date.now()}`,
          evidenceId,
          verifierName: `${currentAccount.fullNameAr} / ${currentAccount.fullNameFr}`,
          decision,
          reviewNotes:
            reviewNotes ||
            (decision === 'under_review'
              ? 'ملاحظة فحص أولي في النموذج التجريبي (لا تُعد مصادقة نهائية).'
              : 'مرفوض لعدم كفاية التوثيق.'),
          reviewedAt: new Date().toISOString(),
        };

        return {
          ...prev,
          evidence: updatedEvidence,
          // NEVER increment verifiedBeneficiaries or verifiedHours in client-only prototype mode
          verifications: [newAuditRecord, ...prev.verifications],
          sessionLogs: appendLog(
            prev,
            'PRELIMINARY_EVIDENCE_REVIEW',
            `Reviewed evidence ${evidenceId} with prototype status: ${decision}`,
            activeRole
          ),
        };
      });

      notify(`Evidence status updated to: ${decision} (Unverified prototype mode)`, 'info');
      return { allowed: true };
    },
    [activeRole, appendLog, currentAccount, dataset.evidence, notify]
  );

  const markNotificationRead = useCallback((notifId: string) => {
    setDataset((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === notifId ? { ...n, read: true } : n)),
    }));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setDataset((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
    notify('All notifications marked as read', 'info');
  }, [notify]);

  const resetDemoData = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY_DATASET);
    window.localStorage.removeItem(STORAGE_KEY_ACCOUNT);
    setDataset(INITIAL_DEMO_DATASET);
    setActiveRole('volunteer');
    notify('Local browser storage reset to clean zero-data baseline.', 'info');
  }, [notify]);

  const value = useMemo(
    () => ({
      dataset,
      currentAccount,
      activeRole,
      permissions,
      feedbackBanner,
      clearFeedback,
      loginWithDemoAccount,
      switchRole,
      createOrganization,
      updateOrganizationStatus,
      createVolunteer,
      upsertInitiative,
      applyToInitiative,
      approveVolunteerApplication,
      createTask,
      assignTaskVolunteer,
      updateTaskStatus,
      recordAttendance,
      submitEvidence,
      reviewEvidence,
      markNotificationRead,
      markAllNotificationsRead,
      resetDemoData,
    }),
    [
      dataset,
      currentAccount,
      activeRole,
      permissions,
      feedbackBanner,
      clearFeedback,
      loginWithDemoAccount,
      switchRole,
      createOrganization,
      updateOrganizationStatus,
      createVolunteer,
      upsertInitiative,
      applyToInitiative,
      approveVolunteerApplication,
      createTask,
      assignTaskVolunteer,
      updateTaskStatus,
      recordAttendance,
      submitEvidence,
      reviewEvidence,
      markNotificationRead,
      markAllNotificationsRead,
      resetDemoData,
    ]
  );

  return <DemoStoreContext.Provider value={value}>{children}</DemoStoreContext.Provider>;
}
