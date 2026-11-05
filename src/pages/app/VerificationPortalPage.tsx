import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileCheck2,
  MapPin,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDemoStore } from '@/data/demoStoreContext';

export function VerificationPortalPage() {
  const { t, i18n } = useTranslation();
  const { dataset, reviewEvidence } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const pendingEvidence = dataset.evidence.filter((e) => e.verificationStatus === 'pending');
  const auditedEvidence = dataset.evidence.filter((e) => e.verificationStatus !== 'pending');

  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    reviewEvidence(id, 'verified', 'تم فحص المرفقات ومطابقة إحداثيات GPS وقوائم الحضور بنجاح.');
    setActionNotice('تمت المصادقة على الأثر واعتماده في السجل العلني!');
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleReject = (id: string) => {
    if (!rejectReason.trim()) {
      alert('يرجى ذكر سبب الرفض أو النقص في التوثيق.');
      return;
    }
    reviewEvidence(id, 'rejected', rejectReason);
    setRejectingId(null);
    setRejectReason('');
    setActionNotice('تم رفض ملف التوثيق مع إشعار الجمعية بالتعليل.');
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="container space-y-10 py-10">
      {/* Portal Header */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#06452D] via-[#075B35] to-[#042E1E] p-8 text-white backdrop-blur-2xl sm:p-10 shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-zellij-hero opacity-60" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>مركز التدقيق المستقل</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl text-white">
              {t('v5portals.verifier.title')}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 max-w-xl">
              {t('v5portals.verifier.subtitle')}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-950/70 p-5 text-center backdrop-blur-xl space-y-1 shadow-inner">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              ملفات قيد التدقيق
            </span>
            <div className="text-3xl font-black text-amber-300">{pendingEvidence.length}</div>
            <p className="text-[10px] text-emerald-200/70">في انتظار المراجعة الميدانية</p>
          </div>
        </div>
      </div>

      {actionNotice && (
        <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/20 p-4 text-center text-sm font-bold text-emerald-300 animate-in fade-in">
          {actionNotice}
        </div>
      )}

      {/* Strict 3-Tier Banner */}
      <div className="rounded-2xl border border-emerald-500/25 bg-emerald-950/50 p-4 text-xs text-emerald-200/90 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
          <span>
            مبدأ النزاهة: لا يُعتمد أي أثر في السجل العلني دون وثائق مادية وإحداثيات جغرافية مؤكدة.
          </span>
        </div>
        <span className="font-mono text-emerald-300 text-[11px]">قسنطينة (25)</span>
      </div>

      {/* Main Grid: Pending Queue & History */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-5 w-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  {t('v5portals.verifier.pendingQueue')}
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-300">
                {pendingEvidence.length} ملفات
              </span>
            </div>

            {pendingEvidence.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />
                <p className="text-xs text-emerald-200/80">
                  كافة ملفات التوثيق مدققة ومصادق عليها. طابور الفحص خالٍ حالياً.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingEvidence.map((ev) => {
                  const init = dataset.initiatives.find((i) => i.id === ev.initiativeId);
                  const isRejecting = rejectingId === ev.id;

                  return (
                    <div
                      key={ev.id}
                      className="rounded-2xl border border-emerald-500/25 bg-emerald-900/30 p-5 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
                        <div>
                          <h4 className="font-bold text-white text-sm">
                            {isAr ? ev.titleAr : ev.titleFr}
                          </h4>
                          <span className="text-xs text-emerald-200/70">
                            المبادرة: {init ? (isAr ? init.titleAr : init.titleFr) : '-'}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-amber-400/40 text-amber-300 text-[10px] self-start sm:self-center"
                        >
                          قيد الفحص الميداني
                        </Badge>
                      </div>

                      {/* Evidence details & GPS */}
                      <div className="grid gap-3 sm:grid-cols-3 text-xs text-emerald-200">
                        <div className="rounded-xl bg-emerald-950/60 p-2.5">
                          <span className="text-[10px] text-emerald-300/70 block">
                            المستفيدون المصرح بهم:
                          </span>
                          <span className="font-mono font-bold text-white text-sm">
                            {ev.beneficiariesReached} مستفيد
                          </span>
                        </div>
                        <div className="rounded-xl bg-emerald-950/60 p-2.5">
                          <span className="text-[10px] text-emerald-300/70 block">
                            ساعات التطوع الميدانية:
                          </span>
                          <span className="font-mono font-bold text-white text-sm">
                            {ev.hoursClaimed} ساعة
                          </span>
                        </div>
                        <div className="rounded-xl bg-emerald-950/60 p-2.5">
                          <span className="text-[10px] text-emerald-300/70 block">
                            الإحداثيات الجغرافية:
                          </span>
                          <span className="font-mono text-emerald-300 flex items-center gap-1 text-[11px] mt-0.5">
                            <MapPin className="h-3 w-3" />
                            {ev.gpsCoordinates || '36.3650° N, 6.6147° E'}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-emerald-100/80 leading-relaxed">
                        ملاحظات الجهة الرافعة: {ev.notes}
                      </p>

                      {/* Review Actions */}
                      {isRejecting ? (
                        <div className="space-y-3 rounded-2xl border border-red-500/30 bg-red-950/30 p-4">
                          <label className="text-xs text-red-200 block">
                            علل سبب الرفض أو النقص المطلوب تصحيحه (إلزامي):
                          </label>
                          <textarea
                            rows={2}
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder={t('v5portals.verifier.reasonPlaceholder')}
                            className="w-full rounded-xl border border-red-500/30 bg-black/40 p-2.5 text-xs text-white"
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-emerald-200"
                              onClick={() => {
                                setRejectingId(null);
                                setRejectReason('');
                              }}
                            >
                              إلغاء
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs"
                              onClick={() => handleReject(ev.id)}
                            >
                              تأكيد الرفض مع التعليل
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500/30 text-red-300 hover:bg-red-950/50 text-xs rounded-xl gap-1"
                            onClick={() => setRejectingId(ev.id)}
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            {t('v5portals.verifier.rejectDecision')}
                          </Button>

                          <Button
                            size="sm"
                            className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl gap-1 shadow-md"
                            onClick={() => handleApprove(ev.id)}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {t('v5portals.verifier.approveDecision')}
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Decision History */}
        <div className="space-y-6 lg:col-span-4">
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <Clock className="h-4 w-4" />
                <span>{t('v5portals.verifier.approvedHistory')}</span>
              </div>
              <span className="text-xs font-mono text-emerald-300">
                {auditedEvidence.length} قرارات
              </span>
            </div>

            {auditedEvidence.length === 0 ? (
              <p className="text-xs text-emerald-200/70 py-4 text-center">
                لا توجد قرارات تدقيق سابقة.
              </p>
            ) : (
              <div className="space-y-3">
                {auditedEvidence.map((ev) => {
                  const ver = dataset.verifications.find((v) => v.evidenceId === ev.id);
                  return (
                    <div
                      key={ev.id}
                      className="rounded-2xl border border-emerald-500/20 bg-emerald-900/40 p-3.5 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white block">
                          {isAr ? ev.titleAr : ev.titleFr}
                        </span>
                        <Badge
                          variant={ev.verificationStatus === 'verified' ? 'emerald' : 'outline'}
                          className="text-[10px]"
                        >
                          {ev.verificationStatus === 'verified' ? 'معتمد' : 'مرفوض'}
                        </Badge>
                      </div>
                      {ver?.reviewNotes && (
                        <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                          تعليل المدقق: {ver.reviewNotes}
                        </p>
                      )}
                      <span className="font-mono text-[10px] text-emerald-300/60 block">
                        التاريخ: {ver?.reviewedAt || '2026-11-05'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
