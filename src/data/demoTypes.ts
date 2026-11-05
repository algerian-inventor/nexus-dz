export type UserRole = 'super_admin' | 'organization_admin' | 'volunteer' | 'verifier';

export type VerificationStatus = 'pending' | 'under_review' | 'verified' | 'rejected';

export type InitiativeStatus = 'open' | 'in_progress' | 'completed' | 'verified';

export type TaskStatus = 'todo' | 'assigned' | 'in_progress' | 'submitted' | 'verified';

export type AttendanceStatus = 'present' | 'completed' | 'excused';

export type CommuneKey =
  | 'constantine'
  | 'el_khroub'
  | 'ali_mendjeli'
  | 'ain_smara'
  | 'hamma_bouziane'
  | 'didouche_mourad'
  | 'zighoud_youcef';

export type SectorCategory =
  'environment' | 'education' | 'health' | 'heritage' | 'solidarity' | 'youth_tech';

export interface DemoAccount {
  id: string;
  email: string;
  fullNameAr: string;
  fullNameFr: string;
  role: UserRole;
  commune: CommuneKey;
  titleAr: string;
  titleFr: string;
  organizationId?: string;
  volunteerId?: string;
}

export interface DemoOrganization {
  id: string;
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
  verificationStatus: VerificationStatus;
  foundedYear: number;
  membersCount: number;
  createdAt: string;
}

export interface DemoVolunteer {
  id: string;
  fullNameAr: string;
  fullNameFr: string;
  email: string;
  phone: string;
  commune: CommuneKey;
  skills: string[];
  specialtyAr: string;
  specialtyFr: string;
  verifiedHours: number;
  pendingHours: number;
  completedTasksCount: number;
  status: 'active' | 'onboarding';
  joinedAt: string;
}

export interface DemoInitiative {
  id: string;
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
  enrolledVolunteerIds: string[];
  applicantVolunteerIds: string[];
  targetBeneficiaries: number;
  verifiedBeneficiaries: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface DemoTask {
  id: string;
  initiativeId: string;
  titleAr: string;
  titleFr: string;
  descriptionAr: string;
  descriptionFr: string;
  assignedVolunteerId: string | null;
  estimatedHours: number;
  loggedHours: number;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

export interface DemoAttendance {
  id: string;
  initiativeId: string;
  taskId: string | null;
  volunteerId: string;
  date: string;
  hoursLogged: number;
  status: AttendanceStatus;
  notes: string;
}

export interface DemoEvidence {
  id: string;
  initiativeId: string;
  taskId: string | null;
  submittedByAccountId: string;
  submittedByOrgId?: string;
  submittedByName: string;
  submittedByRole: UserRole;
  titleAr: string;
  titleFr: string;
  notes: string;
  fileName: string;
  mimeType: string;
  previewDataUrl?: string;
  gpsCoordinates: string;
  beneficiariesReached: number;
  hoursClaimed: number;
  verificationStatus: VerificationStatus;
  createdAt: string;
}

export interface DemoVerificationRecord {
  id: string;
  evidenceId: string;
  verifierName: string;
  decision: VerificationStatus;
  reviewNotes: string;
  reviewedAt: string;
}

export interface DemoSessionLog {
  id: string;
  action: string;
  actorRole: UserRole;
  details: string;
  timestamp: string;
}

export interface DemoNotification {
  id: string;
  titleAr: string;
  titleFr: string;
  bodyAr: string;
  bodyFr: string;
  roleTarget: UserRole | 'all';
  category: 'verification' | 'initiative' | 'task' | 'organization';
  read: boolean;
  createdAt: string;
}

export interface DemoDataset {
  version: string;
  accounts: DemoAccount[];
  organizations: DemoOrganization[];
  volunteers: DemoVolunteer[];
  initiatives: DemoInitiative[];
  tasks: DemoTask[];
  attendance: DemoAttendance[];
  evidence: DemoEvidence[];
  verifications: DemoVerificationRecord[];
  notifications: DemoNotification[];
  sessionLogs?: DemoSessionLog[];
}
