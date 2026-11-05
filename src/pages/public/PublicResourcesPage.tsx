import { useTranslation } from 'react-i18next';
import {
  BookOpen,
  Scale,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  FileText,
  Clock,
} from 'lucide-react';

export function PublicResourcesPage() {
  const { t } = useTranslation();

  const guides = [
    {
      id: 'law-12-06',
      icon: Scale,
      tag: t('resources.law1206Tag'),
      title: t('resources.law1206Title'),
      desc: t('resources.law1206Desc'),
      items: [
        t('resources.law1206Item1'),
        t('resources.law1206Item2'),
        t('resources.law1206Item3'),
        t('resources.law1206Item4'),
      ],
    },
    {
      id: 'volunteer-charter',
      icon: ShieldCheck,
      tag: t('resources.volunteerCharterTag'),
      title: t('resources.volunteerCharterTitle'),
      desc: t('resources.volunteerCharterDesc'),
      items: [
        t('resources.volunteerCharterItem1'),
        t('resources.volunteerCharterItem2'),
        t('resources.volunteerCharterItem3'),
        t('resources.volunteerCharterItem4'),
      ],
    },
    {
      id: 'evidence-guide',
      icon: FileCheck2,
      tag: t('resources.evidenceGuideTag'),
      title: t('resources.evidenceGuideTitle'),
      desc: t('resources.evidenceGuideDesc'),
      items: [
        t('resources.evidenceGuideItem1'),
        t('resources.evidenceGuideItem2'),
        t('resources.evidenceGuideItem3'),
        t('resources.evidenceGuideItem4'),
      ],
    },
  ];

  const plannedTemplates = [
    {
      title: t('resources.template1Title'),
      desc: t('resources.template1Desc'),
    },
    {
      title: t('resources.template2Title'),
      desc: t('resources.template2Desc'),
    },
    {
      title: t('resources.template3Title'),
      desc: t('resources.template3Desc'),
    },
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="container space-y-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/80 px-3.5 py-1 text-xs font-semibold text-emerald-300">
            <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
            <span>{t('resources.badge')}</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t('resources.title')}
          </h1>
          <p className="text-sm text-emerald-100/80 leading-relaxed">{t('resources.subtitle')}</p>
        </div>

        {/* 3 Core Guides (Honest Reference Checklists — No Fake File Sizes or Alerts) */}
        <div className="grid gap-6 lg:grid-cols-3">
          {guides.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.id}
                className="flex flex-col justify-between rounded-2xl border border-emerald-400/25 bg-[#042E1E]/85 p-6 backdrop-blur-xl shadow-xl space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-950 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                      {g.tag}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-white">{g.title}</h2>
                  <p className="text-xs leading-relaxed text-emerald-100/75">{g.desc}</p>
                  <ul className="space-y-2 pt-2 border-t border-emerald-500/20">
                    {g.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-emerald-100/85">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-emerald-500/20">
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-amber-300/90">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <span>{t('resources.unavailableDownloadNotice')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Planned Working Templates */}
        <div className="rounded-2xl border border-emerald-400/25 bg-[#042E1E]/80 p-6 sm:p-8 backdrop-blur-xl space-y-5">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">
              {t('resources.additionalSectionTitle')}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {plannedTemplates.map((tpl, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-xl border border-emerald-400/20 bg-white/[0.04] p-4 space-y-3"
              >
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">{tpl.title}</p>
                  <p className="text-[11px] text-emerald-200/75 leading-relaxed">{tpl.desc}</p>
                </div>
                <span className="inline-flex w-fit items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-medium text-amber-200">
                  {t('resources.templateStatusBadge')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
