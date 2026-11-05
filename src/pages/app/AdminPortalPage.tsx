import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FolderLock, Building2, CheckCircle2, XCircle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useDemoStore } from '@/data/demoStoreContext';

export function AdminPortalPage() {
  const { t, i18n } = useTranslation();
  const { dataset, updateOrganizationStatus } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const pendingOrgs = dataset.organizations.filter((o) => o.verificationStatus === 'pending');
  const accreditedOrgs = dataset.organizations.filter((o) => o.verificationStatus === 'verified');

  const [auditLogNotice, setAuditLogNotice] = useState<string | null>(null);

  const handleVerifyOrg = (orgId: string) => {
    updateOrganizationStatus(orgId, 'verified');
    setAuditLogNotice('تم اعتماد الجمعية رسمياً بعد فحص ملف الاعتماد الإداري.');
    setTimeout(() => setAuditLogNotice(null), 3000);
  };

  const handleRejectOrg = (orgId: string) => {
    updateOrganizationStatus(orgId, 'rejected');
    setAuditLogNotice('تم رفض ملف الجمعية لعدم استيفاء شروط القانون 12-06.');
    setTimeout(() => setAuditLogNotice(null), 3000);
  };

  return (
    <div className="container space-y-10 py-10">
      {/* Portal Header */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#06452D] via-[#075B35] to-[#042E1E] p-8 text-white backdrop-blur-2xl sm:p-10 shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-zellij-hero opacity-60" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              <FolderLock className="h-3.5 w-3.5" />
              <span>الإشراف الولائي والحوكمة الرقمية</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl text-white">
              {t('v5portals.admin.title')}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 max-w-xl">
              {t('v5portals.admin.subtitle')}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-950/70 p-5 text-center backdrop-blur-xl space-y-1 shadow-inner">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              طلبات الاعتماد
            </span>
            <div className="text-3xl font-black text-amber-300">{pendingOrgs.length}</div>
            <p className="text-[10px] text-emerald-200/70">ملف قيد فحص المطابقة</p>
          </div>
        </div>
      </div>

      {auditLogNotice && (
        <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/20 p-4 text-center text-sm font-bold text-emerald-300 animate-in fade-in">
          {auditLogNotice}
        </div>
      )}

      {/* KPI Overview */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="border-emerald-500/25 bg-emerald-950/40 text-white backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-emerald-200/80">
              الجمعيات المعتمدة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-white">{accreditedOrgs.length}</div>
            <p className="text-[11px] text-emerald-200/60">جمعيات مستوفية لشروط القانون 12-06</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/25 bg-emerald-950/40 text-white backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-emerald-200/80">
              إجمالي المتطوعين المسجلين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-emerald-400">{dataset.volunteers.length}</div>
            <p className="text-[11px] text-emerald-200/60">كفاءات في ولاية قسنطينة</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/25 bg-emerald-950/40 text-white backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-emerald-200/80">
              مؤشر النزاهة والامتثال
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-emerald-300">100%</div>
            <p className="text-[11px] text-emerald-200/60">خالٍ من أي سجلات غير مدققة</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid: Org Accreditation & Audit Trail */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  {t('v5portals.admin.orgVerification')}
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-300">
                {pendingOrgs.length} طلبات جديدة
              </span>
            </div>

            {pendingOrgs.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />
                <p className="text-xs text-emerald-200/80">
                  كافة ملفات الجمعيات مفحوصة ومعتمدة. لا توجد طلبات اعتماد معلقة.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingOrgs.map((org) => (
                  <div
                    key={org.id}
                    className="rounded-2xl border border-emerald-500/25 bg-emerald-900/30 p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                      <div>
                        <h4 className="font-bold text-white text-sm">
                          {isAr ? org.nameAr : org.nameFr}
                        </h4>
                        <span className="text-xs text-emerald-200/70">
                          المجال: {t(`sectors.${org.category}`)} • البلدية:{' '}
                          {t(`common.communes.${org.commune}`)}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-amber-400/40 text-amber-300 text-[10px]"
                      >
                        قيد الفحص الإداري
                      </Badge>
                    </div>

                    <div className="text-xs text-emerald-200 space-y-1">
                      <p>
                        رقم الاعتماد المصرح به:{' '}
                        <strong className="font-mono text-white">{org.registrationNumber}</strong>
                      </p>
                      <p>
                        المسؤول / الرئيس:{' '}
                        <strong className="text-white">{org.presidentName}</strong>
                      </p>
                      <p className="text-emerald-100/80 leading-relaxed text-[11px] pt-1">
                        {isAr ? org.descriptionAr : org.descriptionFr}
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-300 hover:bg-red-950/50 text-xs rounded-xl"
                        onClick={() => handleRejectOrg(org.id)}
                      >
                        <XCircle className="h-3.5 w-3.5 me-1" />
                        رفض الملف
                      </Button>
                      <Button
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl shadow-md"
                        onClick={() => handleVerifyOrg(org.id)}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 me-1" />
                        المصادقة ومنح الاعتماد
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Platform Audit Logs */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <Activity className="h-4 w-4" />
                <span>{t('v5portals.admin.auditLogs')}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-300">سجل غير قابل للتعديل</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/40 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">تسجيل حضور ميداني</span>
                  <span className="font-mono text-[10px] text-emerald-300/60">منذ دقائق</span>
                </div>
                <p className="text-[11px] text-emerald-200/80">
                  تم قيد 3 ساعات حضور بإحداثيات GPS (36.365° N, 6.614° E).
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/40 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">إيداع ملف توثيق أثر</span>
                  <span className="font-mono text-[10px] text-emerald-300/60">اليوم 10:15</span>
                </div>
                <p className="text-[11px] text-emerald-200/80">
                  تم رفع محضر تسليم عيني لقسم التدقيق المستقل.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/40 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">فحص ملف جمعية</span>
                  <span className="font-mono text-[10px] text-emerald-300/60">اليوم 09:30</span>
                </div>
                <p className="text-[11px] text-emerald-200/80">
                  مطابقة وثائق التأسيس مع أحكام القانون 12-06.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
