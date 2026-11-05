import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  Clock,
  Award,
  CheckCircle2,
  MapPin,
  Calendar,
  ArrowUpRight,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useDemoStore } from '@/data/demoStoreContext';

export function VolunteerPortalPage() {
  const { t, i18n } = useTranslation();
  const { dataset, currentAccount, recordAttendance, updateTaskStatus } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const currentVolId = currentAccount.volunteerId || 'vol-1';
  const volunteer = dataset.volunteers.find((v) => v.id === currentVolId);

  // My tasks
  const myTasks = dataset.tasks.filter((t) => t.assignedVolunteerId === currentVolId);
  // My attendance records
  const myAttendance = dataset.attendance.filter((a) => a.volunteerId === currentVolId);
  const totalVerifiedHours = myAttendance.reduce((sum, a) => sum + a.hoursLogged, 0);

  // My initiatives
  const myInitiatives = dataset.initiatives.filter(
    (init) =>
      init.enrolledVolunteerIds.includes(currentVolId) ||
      init.applicantVolunteerIds.includes(currentVolId)
  );

  // Check-in simulator state
  const [selectedInitId, setSelectedInitId] = useState(
    myInitiatives[0]?.id || dataset.initiatives[0]?.id || ''
  );
  const [hoursToLog, setHoursToLog] = useState(3);
  const [checkInDone, setCheckInDone] = useState(false);

  const handleCheckIn = () => {
    if (!selectedInitId) return;
    recordAttendance({
      initiativeId: selectedInitId,
      taskId: myTasks[0]?.id || null,
      volunteerId: currentVolId,
      date: new Date().toISOString().split('T')[0],
      hoursLogged: Number(hoursToLog),
      status: 'completed',
      notes: 'تسجيل حضور تلقائي مؤكد بإحداثيات GPS (قسنطينة)',
    });
    setCheckInDone(true);
    setTimeout(() => setCheckInDone(false), 3000);
  };

  return (
    <div className="container space-y-10 py-10">
      {/* Portal Header */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#06452D] via-[#075B35] to-[#042E1E] p-8 text-white backdrop-blur-2xl sm:p-10 shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-zellij-hero opacity-60" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              <UserCheck className="h-3.5 w-3.5" />
              <span>فضاء المتطوع الميداني</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl text-white">
              {volunteer
                ? isAr
                  ? volunteer.fullNameAr
                  : volunteer.fullNameFr
                : 'المتطوع الميداني'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 max-w-xl">
              متابعة المهام الموكلة، تسجيل الحضور الميداني الموثق، وإدارة سجل ساعات التطوع المعتمدة.
            </p>
          </div>

          {/* Quick Civic Passport Badge */}
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-950/70 p-5 text-center backdrop-blur-xl space-y-1.5 shadow-inner">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              جواز السفر المدني (Wilaya 25)
            </span>
            <div className="text-3xl font-black text-white">{totalVerifiedHours} ساعة</div>
            <p className="text-[10px] text-emerald-200/70">ساعات تطوع معتمدة وموثقة</p>
          </div>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="border-emerald-500/25 bg-emerald-950/40 text-white backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-emerald-200/80">
              المهام الميدانية المسندة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-white">{myTasks.length}</div>
            <p className="text-[11px] text-emerald-200/60">مهام نشطة قيد التنفيذ</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/25 bg-emerald-950/40 text-white backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-emerald-200/80">
              المبادرات المسجل بها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-emerald-400">{myInitiatives.length}</div>
            <p className="text-[11px] text-emerald-200/60">مشاريع مجتمعية معتمدة</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/25 bg-emerald-950/40 text-white backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-emerald-200/80">
              حالة التوثيق والاعتماد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-emerald-300">100%</div>
            <p className="text-[11px] text-emerald-200/60">شهادة صادرة ومطابقة</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Tasks & Missions */}
        <div className="space-y-6 lg:col-span-8">
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
              <div className="flex items-center gap-2.5">
                <Clock className="h-5 w-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">جدول المهام الميدانية</h3>
              </div>
              <span className="text-xs font-mono text-emerald-300">{myTasks.length} مهام</span>
            </div>

            {myTasks.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <p className="text-xs text-emerald-200/70">
                  ليس لديك مهام ميدانية مسندة حالياً. يمكنك تصفح المبادرات المفتوحة والانضمام إليها.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-emerald-500/30 text-emerald-200"
                  asChild
                >
                  <Link to="/initiatives">استعراض المبادرات</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {myTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-900/30 p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">
                          {isAr ? task.titleAr : task.titleFr}
                        </span>
                        <Badge
                          variant="outline"
                          className="border-emerald-400/30 text-emerald-300 text-[10px]"
                        >
                          {t(`statuses.${task.status}`)}
                        </Badge>
                      </div>
                      <p className="text-xs text-emerald-200/70">
                        {isAr ? task.descriptionAr : task.descriptionFr}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-emerald-300/80 pt-1">
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="h-3 w-3" />
                          {task.dueDate}
                        </span>
                        <span className="font-mono">{task.estimatedHours} ساعات تقديرية</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {task.status !== 'verified' && task.status !== 'submitted' ? (
                        <Button
                          size="sm"
                          className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl"
                          onClick={() => updateTaskStatus(task.id, 'submitted')}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 me-1" />
                          إتمام المهمة
                        </Button>
                      ) : (
                        <Badge variant="emerald" className="text-xs">
                          {task.status === 'verified' ? 'معتمدة وموثقة' : 'مقدمة للتدقيق'}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enrolled Initiatives */}
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-6 sm:p-8 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
              <h3 className="text-base font-bold text-white">مشاركاتي في المبادرات</h3>
              <Button
                size="sm"
                variant="ghost"
                className="text-emerald-300 hover:text-white text-xs"
                asChild
              >
                <Link to="/initiatives">
                  دليل المبادرات <ArrowUpRight className="h-3.5 w-3.5 ms-1" />
                </Link>
              </Button>
            </div>

            <div className="space-y-3">
              {myInitiatives.map((init) => {
                const isEnrolled = init.enrolledVolunteerIds.includes(currentVolId);
                return (
                  <div
                    key={init.id}
                    className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-900/30 p-4 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {isAr ? init.titleAr : init.titleFr}
                      </h4>
                      <div className="flex items-center gap-2 text-emerald-200/70 mt-1">
                        <MapPin className="h-3 w-3 text-emerald-400" />
                        <span>{t(`common.communes.${init.commune}`)}</span>
                        <span>•</span>
                        <span>{t(`sectors.${init.category}`)}</span>
                      </div>
                    </div>

                    <div>
                      <Badge variant={isEnrolled ? 'emerald' : 'secondary'}>
                        {isEnrolled ? 'مشارك رسمي' : 'طلب قيد المراجعة'}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Attendance Check-in Widget & Passport */}
        <div className="space-y-6 lg:col-span-4">
          {/* Geolocation Attendance Check-in */}
          <div className="rounded-3xl border border-emerald-400/30 bg-emerald-950/60 p-6 backdrop-blur-xl space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <MapPin className="h-4 w-4" />
              <span>تسجيل الحضور الميداني (GPS)</span>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed font-normal">
              إثبات التواجد الفعلي في موقع المبادرة بقسنطينة لاعتماد ساعات التطوع.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-[11px] text-emerald-200 block mb-1">
                  المبادرة الميدانية:
                </label>
                <select
                  value={selectedInitId}
                  onChange={(e) => setSelectedInitId(e.target.value)}
                  className="w-full rounded-xl border border-emerald-500/30 bg-emerald-900/80 p-2.5 text-xs text-white"
                >
                  {dataset.initiatives.map((init) => (
                    <option key={init.id} value={init.id}>
                      {isAr ? init.titleAr : init.titleFr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] text-emerald-200 block mb-1">
                  عدد الساعات المنجزة:
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={hoursToLog}
                  onChange={(e) => setHoursToLog(Number(e.target.value))}
                  className="w-full rounded-xl border border-emerald-500/30 bg-emerald-900/80 p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-900/40 p-2.5 text-[11px] text-emerald-300/80 font-mono">
                📍 إحداثيات الموقع: 36.3650° N, 6.6147° E (قسنطينة)
              </div>

              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl text-xs shadow-md gap-2"
                onClick={handleCheckIn}
              >
                <Send className="h-3.5 w-3.5" />
                تأكيد الحضور وتسجيل الساعات
              </Button>

              {checkInDone && (
                <div className="rounded-xl bg-emerald-500/20 border border-emerald-400/40 p-2 text-center text-xs text-emerald-300 font-semibold animate-in fade-in">
                  ✓ تم قيد {hoursToLog} ساعات في سجل الحضور بنجاح!
                </div>
              )}
            </div>
          </div>

          {/* Civic Passport Badge */}
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <Award className="h-4 w-4" />
              <span>شارات الكفاءة المجتمعية</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-900/60 px-3 py-1 text-xs text-emerald-300 border border-emerald-500/30">
                🌱 تشجير وتهيئة بيئية
              </span>
              <span className="rounded-full bg-emerald-900/60 px-3 py-1 text-xs text-emerald-300 border border-emerald-500/30">
                📦 إغاثة وتوزيع عيني
              </span>
              <span className="rounded-full bg-emerald-900/60 px-3 py-1 text-xs text-emerald-300 border border-emerald-500/30">
                💻 تنظيم وتنسيق رقمي
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
