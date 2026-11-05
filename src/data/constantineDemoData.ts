import type { DemoDataset } from './demoTypes';

/**
 * NEXUS DZ — Authentic Baseline Dataset (Local Prototype Phase)
 *
 * In accordance with NEXUS DZ integrity principles:
 * - No fictional associations or fabricated registration numbers.
 * - No invented volunteer profiles or synthetic identities.
 * - No fake community initiatives, tasks, or attendance sheets.
 * - No unverified beneficiary counts or fabricated hours.
 * - No implied government or Wilaya institutional affiliation.
 *
 * All prototype interactions are stored strictly in browser localStorage.
 */
export const INITIAL_DEMO_DATASET: DemoDataset = {
  version: '2026.pilot.v6',
  accounts: [
    {
      id: 'acc-pilot-coordinator',
      email: 'prototype@nexus-dz.org',
      fullNameAr: 'حساب معاينة النموذج الأولي (محلي)',
      fullNameFr: 'Session Prototype Locale (Aperçu)',
      role: 'super_admin',
      commune: 'constantine',
      titleAr: 'بيئة تجريبية محلية — بدون مصادقة خادم',
      titleFr: 'Environnement Prototype Local — Sans serveur d’authentification',
    },
  ],
  organizations: [],
  volunteers: [],
  initiatives: [],
  tasks: [],
  attendance: [],
  evidence: [],
  verifications: [],
  notifications: [],
  sessionLogs: [],
};
