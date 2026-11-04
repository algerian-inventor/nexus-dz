import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { INITIAL_DEMO_DATASET } from './constantineDemoData';
import type { DemoDataset, UserRole, VerificationStatus, TaskStatus } from './demoTypes';
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

const STORAGE_KEY_DATASET = 'nexus_dz_hackathon_dataset_v1';
const STORAGE_KEY_ACCOUNT = 'nexus_dz_hackathon_account_v1';

function loadInitialDataset(): DemoDataset {
  if (typeof window === 'undefined') return INITIAL_DEMO_DATASET;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_DATASET);
    if (!raw) return INITIAL_DEMO_DATASET;
    const parsed = JSON.parse(raw) as DemoDataset;
    if (parsed && parsed.version === INITIAL_DEMO_DATASET.version) {
      return parsed;
    }
  } catch {
    // Fallback to initial dataset
  }
  return INITIAL_DEMO_DATASET;
}

function loadInitialAccountId(): string {
  if (typeof window === 'undefined') return 'acc-super-admin';
  return window.localStorage.getItem(STORAGE_KEY_ACCOUNT) || 'acc-super-admin';
}

export function DemoStoreProvider({ children }: { children: React.ReactNode }) {
  const [dataset, setDataset] = useState<DemoDataset>(loadInitialDataset);
  const [currentAccountId, setCurrentAccountId] = useState<string>(loadInitialAccountId);
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
      window.localStorage.setItem(STORAGE_KEY_ACCOUNT, currentAccountId);
    } catch {
      // Ignore storage errors
    }
  }, [currentAccountId]);

  const notify = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    setFeedbackBanner({ message, type });
  }, []);

  const clearFeedback = useCallback(() => {
    setFeedbackBanner(null);
  }, []);

  const currentAccount = useMemo(() => {
    return dataset.accounts.find((a) => a.id === currentAccountId) ?? dataset.accounts[0];
  }, [dataset.accounts, currentAccountId]);

  const activeRole = currentAccount.role;
  const permissions = useMemo(() => getRolePermissions(activeRole), [activeRole]);

  const loginWithDemoAccount = useCallback(
    (accountId: string) => {
      const target = dataset.accounts.find((a) => a.id === accountId);
      if (target) {
        setCurrentAccountId(target.id);
        notify(`${target.fullNameAr} — ${target.fullNameFr}`, 'info');
      }
    },
    [dataset.accounts, notify]
  );

  const switchRole = useCallback(
    (role: UserRole) => {
      const target = dataset.accounts.find((a) => a.role === role);
      if (target) {
        setCurrentAccountId(target.id);
        notify(`${target.fullNameAr} (${target.fullNameFr})`, 'info');
      }
    },
    [dataset.accounts, notify]
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
            verificationStatus: 'pending',
            foundedYear: 2026,
            membersCount: 25,
            createdAt: new Date().toISOString(),
          },
          ...prev.organizations,
        ],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            titleAr: `تسجيل جمعية جديدة: ${payload.nameAr}`,
            titleFr: `Nouvelle organisation : ${payload.nameFr}`,
            bodyAr: `تم إيداع ملف الجمعية ببلدية قسنطينة للمراجعة والاعتماد.`,
            bodyFr: `Le dossier d'agrément a été enregistré pour vérification.`,
            roleTarget: 'super_admin',
            category: 'organization',
            read: false,
            createdAt: new Date().toISOString(),
          },
          ...prev.notifications,
        ],
      }));
      notify(`${payload.nameAr} / ${payload.nameFr}`);
    },
    [notify]
  );

  const updateOrganizationStatus = useCallback(
    (orgId: string, status: VerificationStatus) => {
      setDataset((prev) => ({
        ...prev,
        organizations: prev.organizations.map((o) =>
          o.id === orgId ? { ...o, verificationStatus: status } : o
        ),
      }));
      notify(`Organization status updated: ${status.toUpperCase()}`);
    },
    [notify]
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
            status: 'active',
            joinedAt: new Date().toISOString().slice(0, 10),
          },
          ...prev.volunteers,
        ],
      }));
      notify(`${payload.fullNameAr} / ${payload.fullNameFr}`);
    },
    [notify]
  );

  const upsertInitiative = useCallback(
    (payload: UpsertInitiativePayload) => {
      setDataset((prev) => {
        if (payload.id) {
          return {
            ...prev,
            initiatives: prev.initiatives.map((init) =>
              init.id === payload.id
                ? {
                    ...init,
                    ...payload,
                    id: init.id,
                  }
                : init
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
              status: payload.status,
              targetVolunteers: payload.targetVolunteers,
              enrolledVolunteerIds: ['vol-1'],
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
              titleAr: `إطلاق مبادرة جديدة: ${payload.titleAr}`,
              titleFr: `Nouvelle initiative lancée : ${payload.titleFr}`,
              bodyAr: `باب التطوع مفتوح الآن ضمن مبادرة ${payload.titleAr}.`,
              bodyFr: `Les candidatures bénévoles sont ouvertes pour ${payload.titleFr}.`,
              roleTarget: 'volunteer',
              category: 'initiative',
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...prev.notifications,
          ],
        };
      });
      notify(`${payload.titleAr}`);
    },
    [notify]
  );

  const applyToInitiative = useCallback(
    (initiativeId: string, volunteerId?: string) => {
      const volId = volunteerId || currentAccount.volunteerId || 'vol-1';
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
              titleAr: `طلب تطوع جديد من ${vol?.fullNameAr ?? 'متطوع'}`,
              titleFr: `Candidature bénévole de ${vol?.fullNameFr ?? 'Bénévole'}`,
              bodyAr: `تم تسجيل طلب انضمام إلى مبادرة: ${targetInit?.titleAr ?? ''}`,
              bodyFr: `Nouvelle candidature pour l'initiative : ${targetInit?.titleFr ?? ''}`,
              roleTarget: 'organization_admin',
              category: 'initiative',
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...prev.notifications,
          ],
        };
      });
      notify('Volunteer application submitted / Candidature envoyée');
    },
    [currentAccount.volunteerId, notify]
  );

  const approveVolunteerApplication = useCallback(
    (initiativeId: string, volunteerId: string) => {
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
      }));
      notify('Volunteer enrolled in initiative / Bénévole accepté');
    },
    [notify]
  );

  const createTask = useCallback(
    (payload: CreateTaskPayload) => {
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
      }));
      notify(payload.titleAr);
    },
    [notify]
  );

  const assignTaskVolunteer = useCallback(
    (taskId: string, volunteerId: string | null) => {
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
      notify('Task assignment updated / Affectation mise à jour');
    },
    [notify]
  );

  const updateTaskStatus = useCallback(
    (taskId: string, status: TaskStatus) => {
      setDataset((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
      }));
      notify(`Task status updated: ${status}`);
    },
    [notify]
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
                pendingHours: v.pendingHours + payload.hoursLogged,
              }
            : v
        ),
      }));
      notify(`Attendance & ${payload.hoursLogged}h recorded`);
    },
    [notify]
  );

  const submitEvidence = useCallback(
    (payload: SubmitEvidencePayload) => {
      const newId = `ev-${Date.now()}`;
      setDataset((prev) => ({
        ...prev,
        evidence: [
          {
            id: newId,
            initiativeId: payload.initiativeId,
            taskId: payload.taskId,
            submittedByName: `${currentAccount.fullNameAr} / ${currentAccount.fullNameFr}`,
            submittedByRole: currentAccount.role,
            titleAr: payload.titleAr,
            titleFr: payload.titleFr,
            notes: payload.notes,
            fileName: payload.fileName,
            mimeType: payload.mimeType,
            previewDataUrl: payload.previewDataUrl,
            gpsCoordinates: payload.gpsCoordinates,
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
            titleAr: `دليل ميداني جديد للمراجعة: ${payload.titleAr}`,
            titleFr: `Nouvelle preuve soumise : ${payload.titleFr}`,
            bodyAr: `تم رفع دليل جديد (${payload.beneficiariesReached} مستفيد) بانتظار مصادقة المدقق.`,
            bodyFr: `Preuve déposée (${payload.beneficiariesReached} bénéficiaires) en attente d'audit.`,
            roleTarget: 'verifier',
            category: 'verification',
            read: false,
            createdAt: new Date().toISOString(),
          },
          ...prev.notifications,
        ],
      }));
      notify(`${payload.titleAr}`);
    },
    [currentAccount, notify]
  );

  const reviewEvidence = useCallback(
    (evidenceId: string, decision: 'verified' | 'rejected', reviewNotes: string) => {
      setDataset((prev) => {
        const targetEv = prev.evidence.find((e) => e.id === evidenceId);
        if (!targetEv) return prev;

        const isApproving = decision === 'verified' && targetEv.verificationStatus !== 'verified';

        const updatedEvidence = prev.evidence.map((e) =>
          e.id === evidenceId ? { ...e, verificationStatus: decision } : e
        );

        const updatedInitiatives = prev.initiatives.map((init) => {
          if (init.id !== targetEv.initiativeId) return init;
          return {
            ...init,
            verifiedBeneficiaries: isApproving
              ? init.verifiedBeneficiaries + targetEv.beneficiariesReached
              : init.verifiedBeneficiaries,
            status: isApproving ? 'verified' : init.status,
          };
        });

        const linkedTask = prev.tasks.find((t) => t.id === targetEv.taskId);
        const targetVolId = linkedTask?.assignedVolunteerId || 'vol-1';

        const updatedVolunteers = prev.volunteers.map((v) => {
          if (v.id !== targetVolId || !isApproving) return v;
          return {
            ...v,
            verifiedHours: v.verifiedHours + targetEv.hoursClaimed,
            pendingHours: Math.max(0, v.pendingHours - targetEv.hoursClaimed),
            completedTasksCount: v.completedTasksCount + 1,
          };
        });

        const updatedTasks = prev.tasks.map((t) =>
          t.id === targetEv.taskId && decision === 'verified'
            ? { ...t, status: 'verified' as TaskStatus }
            : t
        );

        const newAuditRecord = {
          id: `ver-${Date.now()}`,
          evidenceId,
          verifierName: `${currentAccount.fullNameAr} / ${currentAccount.fullNameFr}`,
          decision,
          reviewNotes:
            reviewNotes ||
            (decision === 'verified'
              ? 'تم التحقق من المطابقة الميدانية واعتماد مؤشرات الأثر.'
              : 'يرجى استكمال الوثائق المرفقة.'),
          reviewedAt: new Date().toISOString(),
        };

        return {
          ...prev,
          evidence: updatedEvidence,
          initiatives: updatedInitiatives,
          volunteers: updatedVolunteers,
          tasks: updatedTasks,
          verifications: [newAuditRecord, ...prev.verifications],
          notifications: [
            {
              id: `notif-${Date.now()}`,
              titleAr:
                decision === 'verified'
                  ? `تمت المصادقة على الدليل: ${targetEv.titleAr}`
                  : `ملاحظات تدقيق حول الدليل: ${targetEv.titleAr}`,
              titleFr:
                decision === 'verified'
                  ? `Preuve certifiée : ${targetEv.titleFr}`
                  : `Preuve rejetée : ${targetEv.titleFr}`,
              bodyAr:
                decision === 'verified'
                  ? `تم اعتماد ${targetEv.beneficiariesReached} مستفيد و ${targetEv.hoursClaimed} ساعة تطوع في لوحة الأثر.`
                  : reviewNotes,
              bodyFr:
                decision === 'verified'
                  ? `${targetEv.beneficiariesReached} bénéficiaires et ${targetEv.hoursClaimed}h ont été ajoutés aux indicateurs d'impact.`
                  : reviewNotes,
              roleTarget: 'all',
              category: 'verification',
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...prev.notifications,
          ],
        };
      });
      notify(
        decision === 'verified'
          ? 'Evidence verified & Impact metrics updated!'
          : 'Evidence marked as rejected'
      );
    },
    [currentAccount, notify]
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
    notify('All notifications marked as read');
  }, [notify]);

  const resetDemoData = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY_DATASET);
    window.localStorage.removeItem(STORAGE_KEY_ACCOUNT);
    setDataset(INITIAL_DEMO_DATASET);
    setCurrentAccountId('acc-super-admin');
    notify('Constantine Demo Dataset restored to initial state', 'info');
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
