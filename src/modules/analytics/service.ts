import { CONSTANTINE_COMMUNES, SECTOR_CATEGORIES } from '@/modules/organizations/service';
import type { DemoDataset } from '@/data/demoTypes';

export interface CommuneImpactPoint {
  communeKey: string;
  communeLabel: string;
  initiativesCount: number;
  verifiedHours: number;
  beneficiaries: number;
}

export interface SectorImpactPoint {
  sectorKey: string;
  sectorLabel: string;
  initiativesCount: number;
  beneficiaries: number;
}

export const analyticsService = {
  computeDashboardMetrics(dataset: DemoDataset) {
    const totalOrganizations = dataset.organizations.length;
    const verifiedOrganizations = dataset.organizations.filter(
      (o) => o.verificationStatus === 'verified'
    ).length;

    const activeVolunteers = dataset.volunteers.length;

    const totalInitiatives = dataset.initiatives.length;
    const completedActivities = dataset.tasks.filter(
      (t) => t.status === 'verified' || t.status === 'submitted'
    ).length;

    const totalVolunteerHours = dataset.volunteers.reduce((sum, v) => sum + v.verifiedHours, 0);

    const totalBeneficiaries = dataset.initiatives.reduce(
      (sum, i) => sum + i.verifiedBeneficiaries,
      0
    );

    const pendingVerification = dataset.evidence.filter(
      (e) => e.verificationStatus === 'pending' || e.verificationStatus === 'under_review'
    ).length;

    return {
      totalOrganizations,
      verifiedOrganizations,
      activeVolunteers,
      totalInitiatives,
      completedActivities,
      totalVolunteerHours,
      totalBeneficiaries,
      pendingVerification,
    };
  },

  computeCommuneSeries(
    dataset: DemoDataset,
    translateCommune: (key: string) => string
  ): CommuneImpactPoint[] {
    return CONSTANTINE_COMMUNES.map((key) => {
      const communeInits = dataset.initiatives.filter((i) => i.commune === key);
      const communeVols = dataset.volunteers.filter((v) => v.commune === key);

      const verifiedHours = communeVols.reduce((sum, v) => sum + v.verifiedHours, 0);
      const beneficiaries = communeInits.reduce((sum, i) => sum + i.verifiedBeneficiaries, 0);

      return {
        communeKey: key,
        communeLabel: translateCommune(key),
        initiativesCount: communeInits.length,
        verifiedHours,
        beneficiaries,
      };
    });
  },

  computeSectorSeries(
    dataset: DemoDataset,
    translateSector: (key: string) => string
  ): SectorImpactPoint[] {
    return SECTOR_CATEGORIES.map((sector) => {
      const sectorInits = dataset.initiatives.filter((i) => i.category === sector);
      const beneficiaries = sectorInits.reduce((sum, i) => sum + i.verifiedBeneficiaries, 0);

      return {
        sectorKey: sector,
        sectorLabel: translateSector(sector),
        initiativesCount: sectorInits.length,
        beneficiaries,
      };
    });
  },
};
