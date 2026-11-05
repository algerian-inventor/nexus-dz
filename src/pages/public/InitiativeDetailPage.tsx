import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Building2,
  Calendar,
  CheckCircle2,
  FileCheck2,
  UserPlus,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useDemoStore } from '@/data/demoStoreContext';

export function InitiativeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const { dataset, applyToInitiative, currentAccount } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const initiative = dataset.initiatives.find((init) => init.id === id);
  const currentVolId = currentAccount.volunteerId || 'vol-1';

  if (!initiative) {
    return (
      <div className="container py-20 text-center space-y-4 text-white">
        <h2 className="text-2xl font-bold">المبادرة غير موجودة أو قيد الاعتماد الأولي</h2>
        <p className="text-sm text-emerald-200/80">
          لم يتم العثور على مبادرة بهذا المعرف في السجل العام.
        </p>
        <Button variant="outline" asChild className="border-emerald-500/30 text-emerald-200">
          <Link to="/initiatives">
            {isAr ? (
              <ArrowRight className="h-4 w-4 me-2" />
            ) : (
              <ArrowLeft className="h-4 w-4 me-2" />
            )}
            العودة لدليل المبادرات
          </Link>
        </Button>
      </div>
    );
  }

  const org = dataset.organizations.find((o) => o.id === initiative.organizationId);
  const isEnrolled = initiative.enrolledVolunteerIds.includes(currentVolId);
  const isApplied = initiative.applicantVolunteerIds.includes(currentVolId);

  // Associated tasks & evidence
  const tasks = dataset.tasks.filter((t) => t.initiativeId === initiative.id);
  const evidence = dataset.evidence.filter((e) => e.initiativeId === initiative.id);

  return (
    <div className="container space-y-10 py-10 text-white">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          to="/initiatives"
          className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white transition-colors"
        >
          {isAr ? <ArrowRight className="h-3.5 w-3.5" /> : <ArrowLeft className="h-3.5 w-3.5" />}
          العودة إلى دليل المبادرات الميدانية
        </Link>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#06452D] via-[#075B35] to-[#042E1E] p-8 backdrop-blur-2xl sm:p-12 shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-zellij-hero opacity-60" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="border-emerald-400/40 bg-emerald-950/60 text-emerald-300"
              >
                {t(`sectors.${initiative.category}`)}
              </Badge>
              <Badge
                variant="outline"
                className="border-emerald-400/40 bg-emerald-950/60 text-emerald-300"
              >
                <MapPin className="h-3 w-3 me-1" />
                {t(`common.communes.${initiative.commune}`)}
              </Badge>
              <Badge variant={initiative.status === 'verified' ? 'emerald' : 'outline'}>
                {t(`statuses.${initiative.status}`)}
              </Badge>
            </div>

            <h1 className="text-3xl font-extrabold sm:text-4xl text-white">
              {isAr ? initiative.titleAr : initiative.titleFr}
            </h1>

            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <Building2 className="h-4 w-4 text-emerald-400" />
              <span>الجمعية المشرفة: </span>
              <strong className="text-white">{org ? (isAr ? org.nameAr : org.nameFr) : '-'}</strong>
            </div>
          </div>

          <div>
            {isEnrolled ? (
              <Badge variant="emerald" className="px-4 py-2 text-sm font-semibold">
                <CheckCircle2 className="h-4 w-4 me-1.5" />
                أنت مسجل رسمياً في هذه المبادرة
              </Badge>
            ) : isApplied ? (
              <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold">
                طلب الانضمام قيد دراسة الجمعية
              </Badge>
            ) : (
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-6 rounded-2xl shadow-md gap-2"
                onClick={() => applyToInitiative(initiative.id, currentVolId)}
              >
                <UserPlus className="h-5 w-5" />
                {t('pages.initiatives.applyBtn')}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 3-Tier Impact Breakdown Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="border-emerald-500/25 bg-emerald-950/40 text-white backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-emerald-200/80">
              المستهدف المخطط
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-white">{initiative.targetBeneficiaries}</div>
            <p className="text-[11px] text-emerald-200/60">مستفيد مستهدف بالنشاط</p>
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
              {initiative.verifiedBeneficiaries}
            </div>
            <p className="text-[11px] text-emerald-200/60">مستفيد تم توثيقه وتدقيقه</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/25 bg-emerald-950/40 text-white backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-emerald-200/80">
              المتطوعون المعتمدون
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-emerald-300">
              {initiative.enrolledVolunteerIds.length} / {initiative.targetVolunteers}
            </div>
            <p className="text-[11px] text-emerald-200/60">طاقة الاستيعاب الميدانية</p>
          </CardContent>
        </Card>
      </div>

      {/* Description & Operational Details */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-6 sm:p-8 backdrop-blur-xl space-y-4">
            <h3 className="text-base font-bold text-white">تفاصيل ونطاق المبادرة الميدانية</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-emerald-100/90 font-normal">
              {initiative.locationDetails}. تسعى هذه المبادرة إلى التنسيق بين الكفاءات الشبانية
              المتطوعة والهيئات المجتمعية الفاعلة في ولاية قسنطينة وفق خطة تشغيلية واضحة المعالم.
            </p>
          </div>

          {/* Operational Tasks Roster */}
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-6 sm:p-8 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <h3 className="text-base font-bold text-white">المهام الميدانية المجدولة</h3>
              <span className="text-xs text-emerald-300 font-mono">{tasks.length} مهام</span>
            </div>

            {tasks.length === 0 ? (
              <p className="text-xs text-emerald-200/70">
                لا توجد مهام منشورة علناً لهذه المبادرة حالياً.
              </p>
            ) : (
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-900/30 p-3.5 text-xs"
                  >
                    <div className="space-y-0.5">
                      <span className="font-semibold text-white">
                        {isAr ? task.titleAr : task.titleFr}
                      </span>
                      <span className="block text-[11px] text-emerald-200/60">
                        {isAr ? task.descriptionAr : task.descriptionFr}
                      </span>
                    </div>
                    <div className="text-end">
                      <Badge
                        variant="outline"
                        className="border-emerald-500/30 text-emerald-300 text-[10px]"
                      >
                        {t(`statuses.${task.status}`)}
                      </Badge>
                      <span className="block font-mono text-[11px] text-emerald-200/70 mt-1">
                        {task.loggedHours} ساعة معتمدة
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6 lg:col-span-4">
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-6 backdrop-blur-xl space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              معلومات الاعتماد
            </h4>
            <div className="space-y-3 text-xs text-emerald-200">
              <div className="flex items-center justify-between">
                <span>تاريخ الإطلاق:</span>
                <span className="font-mono text-white flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-emerald-400" />
                  {initiative.startDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>تاريخ الاختتام:</span>
                <span className="font-mono text-white flex items-center gap-1">
                  <Clock className="h-3 w-3 text-emerald-400" />
                  {initiative.endDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>ملفات التوثيق:</span>
                <span className="font-mono text-white flex items-center gap-1">
                  <FileCheck2 className="h-3 w-3 text-emerald-400" />
                  {evidence.length} مرفقات
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>حالة التدقيق:</span>
                <span className="font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  مدققة ميدانياً
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
