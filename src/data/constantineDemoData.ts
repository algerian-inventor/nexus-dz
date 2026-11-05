import type { DemoDataset } from './demoTypes';

/**
 * NEXUS DZ — Authentic Baseline Dataset (Pilot Deployment Phase)
 *
 * In accordance with NEXUS DZ integrity principles:
 * - No fictional associations or fabricated registration numbers.
 * - No invented volunteer profiles or synthetic identities.
 * - No fake community initiatives, tasks, or attendance sheets.
 * - No unverified beneficiary counts or fabricated hours.
 *
 * Records are populated exclusively through verified submissions during the pilot phase.
 */
export const INITIAL_DEMO_DATASET: DemoDataset = {
  version: '2026.pilot.v4',
  accounts: [
    {
      id: 'acc-pilot-coordinator',
      email: 'coordination.constantine@nexus-dz.org',
      fullNameAr: 'منسق المرحلة التجريبية — قسنطينة',
      fullNameFr: 'Coordinateur Phase Pilote — Constantine',
      role: 'super_admin',
      commune: 'constantine',
      titleAr: 'المكتب التنسيقي للعمل المدني (الولاية 25)',
      titleFr: 'Bureau de Coordination Civique (Wilaya 25)',
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
};
