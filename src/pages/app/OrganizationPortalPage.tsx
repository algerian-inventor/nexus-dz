import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Building2, Users, Plus, CheckCircle2, ShieldCheck, MapPin, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useDemoStore } from '@/data/demoStoreContext';
import { CONSTANTINE_COMMUNES } from '@/modules/organizations/service';
import type { CommuneKey, SectorCategory } from '@/data/demoTypes';

export function OrganizationPortalPage() {
  const { t, i18n } = useTranslation();
  const { dataset, currentAccount, upsertInitiative, approveVolunteerApplication, submitEvidence } =
    useDemoStore();
  const isAr = i18n.language === 'ar';

  const orgId = currentAccount.organizationId || 'org-1';
  const org = dataset.organizations.find((o) => o.id === orgId) || dataset.organizations[0];

  // Initiatives of this org
  const orgInitiatives = dataset.initiatives.filter((i) => i.organizationId === org?.id);

  // New initiative form state
  const [showCreateInit, setShowCreateInit] = useState(false);
  const [newTitleAr, setNewTitleAr] = useState('');
  const [newTitleFr, setNewTitleFr] = useState('');
  const [newCommune, setNewCommune] = useState<CommuneKey>('constantine');
  const [newCategory, setNewCategory] = useState<SectorCategory>('environment');
  const [newTargetVols, setNewTargetVols] = useState(15);
  const [newTargetBeneficiaries, setNewTargetBeneficiaries] = useState(200);

  // Evidence submission state
  const [showSubmitEvidence, setShowSubmitEvidence] = useState(false);
  const [evidenceInitId, setEvidenceInitId] = useState(orgInitiatives[0]?.id || '');
  const [evidenceTitleAr, setEvidenceTitleAr] = useState('');
  const [evidenceBeneficiaries, setEvidenceBeneficiaries] = useState(50);
  const [evidenceHours, setEvidenceHours] = useState(25);
  const [evidenceSuccess, setEvidenceSuccess] = useState(false);

  const handleCreateInitiative = (e: React.FormEvent) => {
    e.preventDefault();
    if (!org) return;
    upsertInitiative({
      organizationId: org.id,
      titleAr: newTitleAr || 'مبادرة مجتمعية جديدة',
      titleFr: newTitleFr || 'Nouvelle initiative',
      summaryAr: 'مبادرة ميدانية لتلبية احتياجات المجتمع المحلي في قسنطينة.',
      summaryFr: 'Initiative de terrain pour la communauté locale.',
      category: newCategory,
      commune: newCommune,
      locationDetails: `بلدية ${newCommune} — ولاية قسنطينة`,
      status: 'open',
      targetVolunteers: Number(newTargetVols),
      targetBeneficiaries: Number(newTargetBeneficiaries),
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    });
    setShowCreateInit(false);
    setNewTitleAr('');
    setNewTitleFr('');
  };

  const handleSubmitEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    submitEvidence({
      initiativeId: evidenceInitId || orgInitiatives[0]?.id || 'init-1',
      taskId: null,
      titleAr: evidenceTitleAr || 'محضر تسليم ميداني وصور موثقة بالـ GPS',
      titleFr: 'Rapport de terrain et photos géolocalisées',
      notes: 'تم التقاط الصور الميدانية واستكمال قوائم إمضاء الحضور وفق الأصول.',
      fileName: 'pv-terrain-constantine.pdf',
      mimeType: 'application/pdf',
      gpsCoordinates: '36.3650° N, 6.6147° E',
      beneficiariesReached: Number(evidenceBeneficiaries),
      hoursClaimed: Number(evidenceHours),
    });
    setEvidenceSuccess(true);
    setTimeout(() => {
      setEvidenceSuccess(false);
      setShowSubmitEvidence(false);
      setEvidenceTitleAr('');
    }, 2500);
  };

  // Find all applicant volunteers for this org's initiatives
  const applicantsList: { initId: string; initTitle: string; volId: string; volName: string }[] =
    [];
  orgInitiatives.forEach((init) => {
    init.applicantVolunteerIds.forEach((volId) => {
      const vol = dataset.volunteers.find((v) => v.id === volId);
      if (vol) {
        applicantsList.push({
          initId: init.id,
          initTitle: isAr ? init.titleAr : init.titleFr,
          volId: vol.id,
          volName: isAr ? vol.fullNameAr : vol.fullNameFr,
        });
      }
    });
  });

  return (
    <div className="container space-y-10 py-10">
      {/* Portal Header */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#06452D] via-[#075B35] to-[#042E1E] p-8 text-white backdrop-blur-2xl sm:p-10 shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-zellij-hero opacity-60" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              <Building2 className="h-3.5 w-3.5" />
              <span>فضاء الجمعيات المعتمدة</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl text-white">
              {org ? (isAr ? org.nameAr : org.nameFr) : 'الجمعية الشريكة'}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200">
              <span>
                رقم الاعتماد:{' '}
                <strong className="font-mono text-white">
                  {org?.registrationNumber || '1206-W25-001'}
                </strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                مطابقة للقانون 12-06
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl shadow-md gap-1.5"
              onClick={() => setShowCreateInit(!showCreateInit)}
            >
              <Plus className="h-4 w-4" />
              إدراج مبادرة جديدة
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-emerald-500/30 bg-emerald-950/60 text-emerald-200 hover:text-white rounded-xl gap-1.5"
              onClick={() => setShowSubmitEvidence(!showSubmitEvidence)}
            >
              <Upload className="h-4 w-4" />
              رفع ملف أثر للتدقيق
            </Button>
          </div>
        </div>
      </div>

      {/* Inline Create Initiative Drawer */}
      {showCreateInit && (
        <form
          onSubmit={handleCreateInitiative}
          className="rounded-3xl border border-emerald-400/30 bg-emerald-950/70 p-6 backdrop-blur-xl text-white space-y-4 animate-in fade-in"
        >
          <h3 className="text-base font-bold text-white border-b border-emerald-500/20 pb-2">
            إدراج مبادرة ميدانية جديدة (ولاية قسنطينة)
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-emerald-200 block mb-1">
                عنوان المبادرة (بالعربية):
              </label>
              <input
                type="text"
                required
                placeholder="مثال: حملة تشجير غابة البعراوية"
                value={newTitleAr}
                onChange={(e) => setNewTitleAr(e.target.value)}
                className="w-full rounded-xl border border-emerald-500/30 bg-emerald-900/80 p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-emerald-200 block mb-1">Titre (en français):</label>
              <input
                type="text"
                placeholder="Campagne de reboisement..."
                value={newTitleFr}
                onChange={(e) => setNewTitleFr(e.target.value)}
                className="w-full rounded-xl border border-emerald-500/30 bg-emerald-900/80 p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-emerald-200 block mb-1">بلدية النشاط:</label>
              <select
                value={newCommune}
                onChange={(e) => setNewCommune(e.target.value as CommuneKey)}
                className="w-full rounded-xl border border-emerald-500/30 bg-emerald-900/80 p-2.5 text-xs text-white"
              >
                {CONSTANTINE_COMMUNES.map((c) => (
                  <option key={c} value={c}>
                    {t(`common.communes.${c}`)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-emerald-200 block mb-1">مجال المبادرة:</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as SectorCategory)}
                className="w-full rounded-xl border border-emerald-500/30 bg-emerald-900/80 p-2.5 text-xs text-white"
              >
                <option value="environment">البيئة والتشجير</option>
                <option value="solidarity">التضامن الإنساني</option>
                <option value="youth_tech">الشباب والتقنية</option>
                <option value="health">الصحة المجتمعية</option>
                <option value="heritage">حماية التراث</option>
                <option value="education">التربية والتعليم</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-emerald-200 block mb-1">المتطوعون المطلوبون:</label>
              <input
                type="number"
                min="1"
                value={newTargetVols}
                onChange={(e) => setNewTargetVols(Number(e.target.value))}
                className="w-full rounded-xl border border-emerald-500/30 bg-emerald-900/80 p-2.5 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-emerald-200 block mb-1">المستفيدون المستهدفون:</label>
              <input
                type="number"
                min="1"
                value={newTargetBeneficiaries}
                onChange={(e) => setNewTargetBeneficiaries(Number(e.target.value))}
                className="w-full rounded-xl border border-emerald-500/30 bg-emerald-900/80 p-2.5 text-xs text-white font-mono"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowCreateInit(false)}
              className="text-emerald-200"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl"
            >
              حفظ ونشر المبادرة
            </Button>
          </div>
        </form>
      )}

      {/* Inline Submit Evidence Drawer */}
      {showSubmitEvidence && (
        <form
          onSubmit={handleSubmitEvidence}
          className="rounded-3xl border border-emerald-400/30 bg-emerald-950/70 p-6 backdrop-blur-xl text-white space-y-4 animate-in fade-in"
        >
          <h3 className="text-base font-bold text-white border-b border-emerald-500/20 pb-2">
            رفع ملف أثر ميداني للتدقيق المستقل
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-emerald-200 block mb-1">المبادرة المرتبطة:</label>
              <select
                value={evidenceInitId}
                onChange={(e) => setEvidenceInitId(e.target.value)}
                className="w-full rounded-xl border border-emerald-500/30 bg-emerald-900/80 p-2.5 text-xs text-white"
              >
                {orgInitiatives.map((i) => (
                  <option key={i.id} value={i.id}>
                    {isAr ? i.titleAr : i.titleFr}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-emerald-200 block mb-1">عنوان التوثيق:</label>
              <input
                type="text"
                required
                placeholder="محضر تسليم أو صور موثقة..."
                value={evidenceTitleAr}
                onChange={(e) => setEvidenceTitleAr(e.target.value)}
                className="w-full rounded-xl border border-emerald-500/30 bg-emerald-900/80 p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-emerald-200 block mb-1">عدد المستفيدين المحقق:</label>
              <input
                type="number"
                min="1"
                value={evidenceBeneficiaries}
                onChange={(e) => setEvidenceBeneficiaries(Number(e.target.value))}
                className="w-full rounded-xl border border-emerald-500/30 bg-emerald-900/80 p-2.5 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-emerald-200 block mb-1">
                ساعات التطوع المطالب بها:
              </label>
              <input
                type="number"
                min="1"
                value={evidenceHours}
                onChange={(e) => setEvidenceHours(Number(e.target.value))}
                className="w-full rounded-xl border border-emerald-500/30 bg-emerald-900/80 p-2.5 text-xs text-white font-mono"
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-emerald-300">
              📍 يتم إرفاق إحداثيات GPS تلقائياً للمصادقة
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowSubmitEvidence(false)}
                className="text-emerald-200"
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl"
              >
                إرسال إلى طابور التدقيق
              </Button>
            </div>
          </div>
          {evidenceSuccess && (
            <div className="rounded-xl bg-emerald-500/20 border border-emerald-400/40 p-2 text-center text-xs text-emerald-300 font-semibold">
              ✓ تم إرسال ملف التوثيق بنجاح إلى مركز التدقيق المستقل!
            </div>
          )}
        </form>
      )}

      {/* KPI Overview */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="border-emerald-500/25 bg-emerald-950/40 text-white backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-emerald-200/80">
              المبادرات المعتمدة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-white">{orgInitiatives.length}</div>
            <p className="text-[11px] text-emerald-200/60">مشاريع في ولاية قسنطينة</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/25 bg-emerald-950/40 text-white backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-emerald-200/80">
              طلبات التطوع المعلقة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-amber-300">{applicantsList.length}</div>
            <p className="text-[11px] text-emerald-200/60">كفاءات في انتظار الموافقة</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/25 bg-emerald-950/40 text-white backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-emerald-200/80">
              الأثر المصادق عليه
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-emerald-400">
              +{orgInitiatives.reduce((sum, i) => sum + i.verifiedBeneficiaries, 0)}
            </div>
            <p className="text-[11px] text-emerald-200/60">مستفيد معتمد في السجل العام</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Initiatives & Applicant Queue */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          {/* Active Initiatives List */}
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-6 sm:p-8 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
              <h3 className="text-base font-bold text-white">
                المبادرات الميدانية المشرفة عليها الجمعية
              </h3>
              <span className="text-xs font-mono text-emerald-300">
                {orgInitiatives.length} مبادرات
              </span>
            </div>

            <div className="space-y-3">
              {orgInitiatives.map((init) => (
                <div
                  key={init.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-900/30 p-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">
                        {isAr ? init.titleAr : init.titleFr}
                      </span>
                      <Badge
                        variant="outline"
                        className="border-emerald-400/30 text-emerald-300 text-[10px]"
                      >
                        {t(`statuses.${init.status}`)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-emerald-200/70">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-emerald-400" />
                        {t(`common.communes.${init.commune}`)}
                      </span>
                      <span>•</span>
                      <span>{t(`sectors.${init.category}`)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="font-mono text-xs text-emerald-300">
                      {init.verifiedBeneficiaries} / {init.targetBeneficiaries} مستفيد
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-500/30 text-emerald-200 text-xs rounded-xl"
                      asChild
                    >
                      <Link to={`/initiatives/${init.id}`}>معاينة</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Volunteer Applicants Queue */}
        <div className="space-y-6 lg:col-span-4">
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <Users className="h-4 w-4" />
                <span>طلبات التطوع الواردة</span>
              </div>
              <span className="text-xs font-mono text-amber-300">{applicantsList.length} طلب</span>
            </div>

            {applicantsList.length === 0 ? (
              <p className="text-xs text-emerald-200/70 py-4 text-center">
                لا توجد طلبات تطوع معلقة حالياً.
              </p>
            ) : (
              <div className="space-y-3">
                {applicantsList.map((app) => (
                  <div
                    key={`${app.initId}-${app.volId}`}
                    className="rounded-2xl border border-emerald-500/20 bg-emerald-900/40 p-3.5 space-y-2 text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{app.volName}</span>
                      <span className="text-[11px] text-emerald-200/70 block mt-0.5">
                        المبادرة: {app.initTitle}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl gap-1.5"
                      onClick={() => approveVolunteerApplication(app.initId, app.volId)}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      قبول وإلحاق بالفريق
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
