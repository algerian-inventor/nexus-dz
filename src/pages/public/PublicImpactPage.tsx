import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  MapPin,
  CheckCircle2,
  FileText,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CONSTANTINE_COMMUNES } from '@/modules/organizations/service';
import { Link } from 'react-router-dom';

export function PublicImpactPage() {
  const { t } = useTranslation();

  const metrics = [
    {
      title: 'الأثر المستهدف (المخطط)',
      value: '0',
      subtitle: 'حسب خطط العمل المودعة',
      color: 'text-emerald-300',
    },
    {
      title: 'الأثر المصرح به (الميداني)',
      value: '0',
      subtitle: 'قيد التدقيق المستقل',
      color: 'text-amber-300',
    },
    {
      title: 'الأثر المصادق عليه رسمياً',
      value: '+0',
      subtitle: 'مستوفٍ لكافة الأدلة والإحداثيات',
      color: 'text-emerald-400',
    },
    {
      title: 'معيار الالتزام بالشفافية',
      value: '100%',
      subtitle: 'صفر بيانات مصطنعة أو وهمية',
      color: 'text-white',
    },
  ];

  return (
    <div className="container space-y-12 py-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#06452D] via-[#075B35] to-[#042E1E] p-8 text-white backdrop-blur-2xl sm:p-12 shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-zellij-hero opacity-60" />
        <div className="relative max-w-3xl space-y-4">
          <Badge
            variant="outline"
            className="border-emerald-400/30 bg-emerald-950/60 text-emerald-300"
          >
            سجل الشفافية العامة • ولاية قسنطينة
          </Badge>
          <h1 className="text-3xl font-extrabold sm:text-4xl text-white">{t('impact.title')}</h1>
          <p className="text-sm font-normal text-emerald-100/90 sm:text-base leading-relaxed">
            {t('impact.subtitle')}
          </p>
        </div>
      </div>

      {/* 3-Tier Rule Architecture Box */}
      <div className="grid gap-6 md:grid-cols-4">
        {metrics.map((m) => (
          <Card
            key={m.title}
            className="border-emerald-500/25 bg-emerald-950/40 backdrop-blur-xl shadow-md text-white"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-emerald-200/80">{m.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className={`text-3xl font-black ${m.color}`}>{m.value}</div>
              <p className="text-[11px] text-emerald-200/60">{m.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Methodology Section */}
      <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-8 text-white backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{t('impact.methodologyTitle')}</h2>
            <p className="text-xs text-emerald-200/80">
              معيار NEXUS DZ الصارم لضمان موثوقية العمل الجمعوي
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-emerald-100/90 font-normal">
          {t('impact.methodologyDesc')}
        </p>

        <div className="grid gap-4 sm:grid-cols-3 pt-2">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/30 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span>1. التخطيط المسبق</span>
            </div>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              إيداع خطة المبادرة وتحديد الأثر المرجو والمستفيدين المستهدفين قبل انطلاق النشاط.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/30 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span>2. التوثيق الميداني المزدوج</span>
            </div>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              صور ملتقطة بإحداثيات GPS وقوائم حضور موقعة من المتطوعين والمستفيدين الفعليين.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/30 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span>3. التدقيق المستقل</span>
            </div>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              مراجعة طرف ثالث محايد ومطابقة المستندات قبل قيد أي رقم في السجل العام.
            </p>
          </div>
        </div>
      </div>

      {/* Municipal Breakdown Section */}
      <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-8 text-white backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{t('impact.constantineBreakdown')}</h2>
            <p className="text-xs text-emerald-200/80">
              حالة المؤشرات الميدانية المعتمدة عبر بلديات ولاية قسنطينة
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONSTANTINE_COMMUNES.map((commune) => (
            <div
              key={commune}
              className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-900/30 p-4 text-xs"
            >
              <div className="space-y-0.5">
                <span className="font-semibold text-white">{t(`common.communes.${commune}`)}</span>
                <span className="block text-[11px] text-emerald-200/60">
                  بلدية تابعة للولاية 25
                </span>
              </div>
              <div className="text-end">
                <span className="font-mono font-bold text-emerald-300">0 أثر معتمد</span>
                <span className="block text-[10px] text-emerald-200/50">جاهز للرصد</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Public Verified Audit Ledger — Transparent Empty State */}
      <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/40 p-8 sm:p-12 text-center text-white backdrop-blur-xl space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-bold text-white">{t('impact.recentAudits')}</h3>
        <p className="mx-auto max-w-xl text-xs font-normal leading-relaxed text-emerald-200/80">
          {t('impact.emptyNotice')}
        </p>
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-500/30 bg-emerald-900/50 text-emerald-200 hover:text-white rounded-xl text-xs"
            asChild
          >
            <Link to="/resources">
              <FileText className="h-3.5 w-3.5 me-1.5" />
              معايير إعداد ورفع ملفات التدقيق
              <ExternalLink className="h-3.5 w-3.5 ms-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
