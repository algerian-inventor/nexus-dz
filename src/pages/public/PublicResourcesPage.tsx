import { useTranslation } from 'react-i18next';
import {
  BookOpen,
  Download,
  ShieldCheck,
  Scale,
  Users,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function PublicResourcesPage() {
  const { t } = useTranslation();

  const guides = [
    {
      icon: Scale,
      title: t('resources.law1206Title'),
      desc: t('resources.law1206Desc'),
      tag: 'إطار قانوني',
      items: [
        'إجراءات تأسيس وتجديد الهيئات القيادية للجمعية.',
        'شروط إمساك السجلات الإدارية والمحاسبية الرسمية.',
        'صياغة التقارير الأدبية والمالية السنوية للولاية.',
        'الضوابط القانونية لقبول الإعانات وتنظيم التبرعات.',
      ],
      format: 'PDF (2.4 MB)',
    },
    {
      icon: Users,
      title: t('resources.volunteerCharterTitle'),
      desc: t('resources.volunteerCharterDesc'),
      tag: 'ميثاق أخلاقي',
      items: [
        'حقوق المتطوع في التغطية التأمينية والسلامة الميدانية.',
        'واجبات الالتزام بمواعيد المهام وحفظ سرية البيانات.',
        'معايير إصدار وتوثيق شهادات وساعات التطوع المعتمدة.',
        'مدونة السلوك المجتمعي واحترام المستفيدين.',
      ],
      format: 'PDF / Word (1.1 MB)',
    },
    {
      icon: ShieldCheck,
      title: t('resources.evidenceGuideTitle'),
      desc: t('resources.evidenceGuideDesc'),
      tag: 'معايير التدقيق',
      items: [
        'شروط الصور المقبولة (تضمين التوقيت والإحداثيات الجغرافية EXIF).',
        'نموذج سجل الحضور الميداني مع إمضاءات المشاركين.',
        'محاضر تسليم الإعانات العينية ووصولات الاستلام.',
        'آلية التدقيق المستقل وقواعد قبول أو رفض الأدلة.',
      ],
      format: 'PDF (3.0 MB)',
    },
  ];

  return (
    <div className="container space-y-12 py-10">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#06452D] via-[#075B35] to-[#042E1E] p-8 text-white backdrop-blur-2xl sm:p-12 shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-zellij-hero opacity-60" />
        <div className="relative max-w-3xl space-y-4">
          <Badge
            variant="outline"
            className="border-emerald-400/30 bg-emerald-950/60 text-emerald-300"
          >
            المكتبة واللوائح الميدانية
          </Badge>
          <h1 className="text-3xl font-extrabold sm:text-4xl text-white">{t('resources.title')}</h1>
          <p className="text-sm font-normal text-emerald-100/90 sm:text-base leading-relaxed">
            {t('resources.subtitle')}
          </p>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid gap-8 lg:grid-cols-3">
        {guides.map((g) => {
          const Icon = g.icon;
          return (
            <Card
              key={g.title}
              className="flex flex-col justify-between border-emerald-500/25 bg-emerald-950/40 text-white backdrop-blur-xl shadow-lg transition-all hover:border-emerald-400/50"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-emerald-900/60 px-3 py-1 text-[11px] font-semibold text-emerald-300 border border-emerald-500/30">
                    {g.tag}
                  </span>
                </div>
                <CardTitle className="text-lg font-bold text-white">{g.title}</CardTitle>
                <p className="text-xs text-emerald-200/80 leading-relaxed font-normal">{g.desc}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2 rounded-2xl border border-emerald-500/20 bg-emerald-900/20 p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                    أبرز المحاور والمحتويات:
                  </span>
                  <ul className="space-y-1.5 text-xs text-emerald-100/80">
                    {g.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl shadow-md text-xs gap-2"
                  onClick={() => {
                    alert(`جاري تجهيز تحميل المستند: ${g.title} (${g.format})`);
                  }}
                >
                  <Download className="h-4 w-4" />
                  {t('resources.downloadTemplate')}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Toolkit & FAQ Section */}
      <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-8 text-white backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-emerald-400" />
          <h2 className="text-lg font-bold">بوابة النماذج والوثائق التنظيمية</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/30 p-4 space-y-2">
            <h4 className="text-sm font-semibold text-white">نموذج محضر الجمعية العامة</h4>
            <p className="text-xs text-emerald-200/70">
              وثيقة مطابقة للأنظمة الأساسية المعتمدة لجمعيات المجتمع المدني.
            </p>
            <span className="inline-flex items-center text-[11px] text-emerald-300 font-semibold cursor-pointer hover:underline">
              معاينة النموذج <ExternalLink className="h-3 w-3 ms-1" />
            </span>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/30 p-4 space-y-2">
            <h4 className="text-sm font-semibold text-white">جدول حصر المستفيدين الميداني</h4>
            <p className="text-xs text-emerald-200/70">
              قالب مهيأ لتدوين الاستفادات الاجتماعية مع حماية الخصوصية.
            </p>
            <span className="inline-flex items-center text-[11px] text-emerald-300 font-semibold cursor-pointer hover:underline">
              معاينة النموذج <ExternalLink className="h-3 w-3 ms-1" />
            </span>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/30 p-4 space-y-2">
            <h4 className="text-sm font-semibold text-white">شهادة مشاركة متطوع معتمدة</h4>
            <p className="text-xs text-emerald-200/70">
              تنسيق رسمي معتمد يتضمن الرمز التعريفي للمبادرة ومجموع الساعات.
            </p>
            <span className="inline-flex items-center text-[11px] text-emerald-300 font-semibold cursor-pointer hover:underline">
              معاينة النموذج <ExternalLink className="h-3 w-3 ms-1" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
