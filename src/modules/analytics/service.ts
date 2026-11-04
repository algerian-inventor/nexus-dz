import { CONSTANTINE_COMMUNES } from '@/modules/organizations/service';

export interface CommuneImpactPoint {
  communeKey: (typeof CONSTANTINE_COMMUNES)[number];
  communeLabel: string;
  verifiedInitiatives: number;
  verifiedHours: number;
  beneficiaries: number;
}

export interface SectorImpactPoint {
  sector: string;
  count: number;
}

/**
 * NEXUS DZ Impact Analytics Domain Service
 *
 * Strictly adheres to the zero-fake-data rule: when Supabase is not yet connected
 * or no audited records exist, it returns the structural commune schema initialized to 0.
 */
export const analyticsService = {
  getEmptyConstantineCommuneSeries(
    translateCommune: (key: string) => string
  ): CommuneImpactPoint[] {
    return CONSTANTINE_COMMUNES.map((key) => ({
      communeKey: key,
      communeLabel: translateCommune(key),
      verifiedInitiatives: 0,
      verifiedHours: 0,
      beneficiaries: 0,
    }));
  },

  getEmptySectorSeries(): SectorImpactPoint[] {
    return [
      { sector: 'Environment & Urban Hygiene', count: 0 },
      { sector: 'Education & Youth Digital Literacy', count: 0 },
      { sector: 'Public Health & Solidarity', count: 0 },
      { sector: 'Heritage & Community Spaces', count: 0 },
    ];
  },
};
