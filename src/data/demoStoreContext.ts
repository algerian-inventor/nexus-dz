import { createContext, useContext } from 'react';
import type {
  DemoDataset,
  DemoAccount,
  UserRole,
  CommuneKey,
  SectorCategory,
  VerificationStatus,
  InitiativeStatus,
  TaskStatus,
  AttendanceStatus,
} from './demoTypes';
import { getRolePermissions, type RolePermissionMatrix } from '@/modules/auth/service';

export interface CreateOrganizationPayload {
  nameAr: string;
  nameFr: string;
  registrationNumber: string;
  category: SectorCategory;
  commune: CommuneKey;
  address: string;
  presidentName: string;
  phone: string;
  email: string;
  descriptionAr: string;
  descriptionFr: string;
}

export interface CreateVolunteerPayload {
  fullNameAr: string;
  fullNameFr: string;
  email: string;
  phone: string;
  commune: CommuneKey;
  specialtyAr: string;
  specialtyFr: string;
  skills: string[];
}

export interface UpsertInitiativePayload {
  id?: string;
  organizationId: string;
  titleAr: string;
  titleFr: string;
  summaryAr: string;
  summaryFr: string;
  category: SectorCategory;
  commune: CommuneKey;
  locationDetails: string;
  status: InitiativeStatus;
  targetVolunteers: number;
  targetBeneficiaries: number;
  startDate: string;
  endDate: string;
}

export interface CreateTaskPayload {
  initiativeId: string;
  titleAr: string;
  titleFr: string;
  descriptionAr: string;
  descriptionFr: string;
  assignedVolunteerId: string | null;
  estimatedHours: number;
  dueDate: string;
}

export interface RecordAttendancePayload {
  initiativeId: string;
  taskId: string | null;
  volunteerId: string;
  date: string;
  hoursLogged: number;
  status: AttendanceStatus;
  notes: string;
}

export interface SubmitEvidencePayload {
  initiativeId: string;
  taskId: string | null;
  titleAr: string;
  titleFr: string;
  notes: string;
  fileName: string;
  mimeType: string;
  previewDataUrl?: string;
  gpsCoordinates: string;
  beneficiariesReached: number;
  hoursClaimed: number;
}

export interface DemoStoreContextValue {
  dataset: DemoDataset;
  currentAccount: DemoAccount;
  activeRole: UserRole;
  permissions: RolePermissionMatrix;
  feedbackBanner: { message: string; type: 'success' | 'info' } | null;
  clearFeedback: () => void;

  // Account & Role Switching
  loginWithDemoAccount: (accountId: string) => void;
  switchRole: (role: UserRole) => void;

  // Organization Management
  createOrganization: (payload: CreateOrganizationPayload) => void;
  updateOrganizationStatus: (orgId: string, status: VerificationStatus) => void;

  // Volunteer Management
  createVolunteer: (payload: CreateVolunteerPayload) => void;

  // Initiative & Volunteer Application Management
  upsertInitiative: (payload: UpsertInitiativePayload) => void;
  applyToInitiative: (initiativeId: string, volunteerId?: string) => void;
  approveVolunteerApplication: (initiativeId: string, volunteerId: string) => void;

  // Task & Attendance Management
  createTask: (payload: CreateTaskPayload) => void;
  assignTaskVolunteer: (taskId: string, volunteerId: string | null) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  recordAttendance: (payload: RecordAttendancePayload) => void;

  // Evidence & Verification
  submitEvidence: (payload: SubmitEvidencePayload) => void;
  reviewEvidence: (
    evidenceId: string,
    decision: 'verified' | 'rejected',
    reviewNotes: string
  ) => void;

  // Notifications & Reset
  markNotificationRead: (notifId: string) => void;
  markAllNotificationsRead: () => void;
  resetDemoData: () => void;
}

export const DemoStoreContext = createContext<DemoStoreContextValue | null>(null);

export function useDemoStore(): DemoStoreContextValue {
  const ctx = useContext(DemoStoreContext);
  if (!ctx) {
    throw new Error('useDemoStore must be used within DemoStoreProvider');
  }
  return ctx;
}

export { getRolePermissions };
