import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  Clock,
  Award,
  CheckCircle2,
  Compass,
  Calendar,
  FileCheck2,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { useDemoStore } from '@/data/demoStoreContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function VolunteerPortalPage() {
  const { t, i18n } = useTranslation();
  const { dataset, currentAccount, updateTaskStatus, recordAttendance } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const [checkInHours, setCheckInHours] = useState('3');
  const [selectedInitId, setSelectedInitId] = useState(dataset.initiatives[0]?.id || '');
  const [checkInNote, setCheckInNote] = useState('');
  const [checkInDone, setCheckInDone] = useState(false);

  const volId = currentAccount.volunteerId || currentAccount.id;

  const myTasks = dataset.tasks.filter(
    (task) => !task.assignedVolunteerId || task.assignedVolunteerId === volId
  );
  const myAttendance = dataset.attendance.filter((a) => a.volunteerId === volId);
  const myReportedHours = myAttendance.reduce((acc, a) => acc + a.hoursLogged, 0);
  const myVolRecord = dataset.volunteers.find((v) => v.id === volId);
  const myVerifiedHours = myVolRecord?.verifiedHours ?? 0;

  const myInitiatives = dataset.initiatives.filter(
    (i) => i.enrolledVolunteerIds.includes(volId) || i.applicantVolunteerIds.includes(volId)
  );

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const targetInitId = selectedInitId || dataset.initiatives[0]?.id;
    if (!targetInitId) return;

    recordAttendance({
      volunteerId: volId,
      initiativeId: targetInitId,
      taskId: null,
      date: new Date().toISOString().slice(0, 10),
      hoursLogged: Number(checkInHours) || 2,
      status: 'present',
      notes: checkInNote.trim() || t('statuses.pending'),
    });
    setCheckInDone(true);
    setCheckInNote('');
    setTimeout(() => setCheckInDone(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Prototype Transparency Notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50/90 p-4 text-xs text-amber-950 shadow-2xs">
        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
        <p className="leading-relaxed">{t('prototype.localStorageNotice')}</p>
      </div>

      {/* Volunteer Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-[#042E1E] via-[#06452D] to-[#075B35] p-6 text-white shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-zellij-Hero opacity-25" />
        <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
              <UserCheck className="h-3.5 w-3.5" />
              <span>{t('v5portals.volunteer.badge')}</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {t('v5portals.volunteer.title')}
            </h1>
            <p className="text-xs text-emerald-100/80 max-w-2xl">
              {t('v5portals.volunteer.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-950/60 px-4 py-2.5 backdrop-blur-md">
              <span className="block text-[10px] text-emerald-300/80">
                {t('v5portals.volunteer.passportLabel')}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <Award className="h-4 w-4 text-emerald-400" />
                <span className="font-mono text-sm font-bold text-white">
                  {myVerifiedHours}h / {myReportedHours}h
                </span>
              </div>
              <span className="block text-[10px] text-amber-300/90 mt-0.5">
                {t('v5portals.volunteer.reportedHoursSub')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-emerald-500/20 bg-white/85">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-nexus-gray">
                {t('pages.volunteers.colVerifiedHours')}
              </span>
              <Clock className="h-4 w-4 text-nexus-emerald" />
            </div>
            <p className="mt-2 text-2xl font-bold text-nexus-navy">
              {myVerifiedHours}h{' '}
              <span className="text-sm font-normal text-nexus-gray">/ {myReportedHours}h</span>
            </p>
            <p className="mt-1 text-[11px] text-amber-700 font-medium">
              {t('v5portals.volunteer.reportedHoursSub')}
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-white/85">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-nexus-gray">
                {t('v5portals.volunteer.kpiTasks')}
              </span>
              <CheckCircle2 className="h-4 w-4 text-nexus-emerald" />
            </div>
            <p className="mt-2 text-2xl font-bold text-nexus-navy">{myTasks.length}</p>
            <p className="mt-1 text-[11px] text-nexus-gray">
              {t('v5portals.volunteer.kpiTasksSub')}
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-white/85">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-nexus-gray">
                {t('v5portals.volunteer.kpiInitiatives')}
              </span>
              <Compass className="h-4 w-4 text-nexus-emerald" />
            </div>
            <p className="mt-2 text-2xl font-bold text-nexus-navy">{myInitiatives.length}</p>
            <p className="mt-1 text-[11px] text-nexus-gray">
              {t('v5portals.volunteer.kpiInitiativesSub')}
            </p>
          </CardContent>
        </Card>

        <Card className="border-amber-500/25 bg-white/85">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-nexus-gray">
                {t('v5portals.volunteer.kpiStatus')}
              </span>
              <FileCheck2 className="h-4 w-4 text-amber-600" />
            </div>
            <p className="mt-2 text-lg font-bold text-amber-800">
              {t('v5portals.volunteer.kpiStatusValue')}
            </p>
            <p className="mt-1 text-[11px] text-nexus-gray">
              {t('v5portals.volunteer.kpiStatusSub')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 cols: Assigned Tasks & Enrolled Initiatives */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-bold text-nexus-navy">
                {t('v5portals.volunteer.tasksTitle')}
              </CardTitle>
              <Badge variant="emerald">{myTasks.length}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {myTasks.length === 0 ? (
                <div className="rounded-xl border border-dashed border-nexus-border bg-nexus-bg/50 p-8 text-center">
                  <Compass className="mx-auto h-8 w-8 text-nexus-emerald/60 mb-2" />
                  <p className="text-sm font-medium text-nexus-navy">
                    {t('v5portals.volunteer.emptyTasks')}
                  </p>
                  <Button size="sm" variant="outline" className="mt-4" asChild>
                    <Link to="/initiatives">{t('v5portals.volunteer.browseInitiativesBtn')}</Link>
                  </Button>
                </div>
              ) : (
                myTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col justify-between gap-3 rounded-xl border border-nexus-border bg-white/70 p-4 sm:flex-row sm:items-center"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-nexus-navy">
                          {isAr ? task.titleAr : task.titleFr}
                        </span>
                        <Badge variant={task.status === 'verified' ? 'emerald' : 'secondary'}>
                          {t(`statuses.${task.status}`)}
                        </Badge>
                      </div>
                      <p className="text-xs text-nexus-gray">
                        {t('pages.tasks.colHours')}: {task.loggedHours}h / {task.estimatedHours}h
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status !== 'submitted' && task.status !== 'verified' ? (
                        <Button
                          size="sm"
                          onClick={() => updateTaskStatus(task.id, 'submitted')}
                          className="text-xs"
                        >
                          {t('v5portals.volunteer.submitTaskBtn')}
                        </Button>
                      ) : (
                        <Badge variant="secondary">
                          {t('v5portals.volunteer.taskSubmittedBadge')}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Enrolled / Applied Initiatives */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-nexus-navy">
                {t('v5portals.volunteer.myInitiativesTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myInitiatives.length === 0 ? (
                <p className="text-xs text-nexus-gray py-4 text-center">
                  {t('pages.initiatives.emptyDesc')}
                </p>
              ) : (
                myInitiatives.map((init) => {
                  const isEnrolled = init.enrolledVolunteerIds.includes(volId);
                  return (
                    <div
                      key={init.id}
                      className="flex items-center justify-between rounded-xl border border-nexus-border p-3.5 bg-white/60"
                    >
                      <div>
                        <Link
                          to={`/initiatives/${init.id}`}
                          className="text-sm font-semibold text-nexus-navy hover:text-nexus-emerald"
                        >
                          {isAr ? init.titleAr : init.titleFr}
                        </Link>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-nexus-gray">
                          <span>{t(`common.communes.${init.commune}`)}</span>
                          <span>•</span>
                          <span>{init.startDate}</span>
                        </div>
                      </div>
                      <Badge variant={isEnrolled ? 'emerald' : 'secondary'}>
                        {isEnrolled
                          ? t('v5portals.volunteer.enrolledBadge')
                          : t('v5portals.volunteer.pendingAppBadge')}
                      </Badge>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Declarative Attendance Log & Honest Badges Empty State */}
        <div className="space-y-6">
          <Card className="border-emerald-500/30 bg-gradient-to-b from-white to-nexus-mint/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-nexus-emerald-deep">
                <Calendar className="h-4 w-4" />
                <CardTitle className="text-sm font-bold">
                  {t('v5portals.volunteer.checkInTitle')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckIn} className="space-y-3.5 text-xs">
                <p className="text-nexus-gray leading-relaxed">
                  {t('v5portals.volunteer.checkInDesc')}
                </p>
                <div>
                  <label className="block font-medium text-nexus-navy mb-1">
                    {t('v5portals.volunteer.selectInitiativeLabel')}
                  </label>
                  <select
                    value={selectedInitId}
                    onChange={(e) => setSelectedInitId(e.target.value)}
                    className="w-full rounded-xl border border-nexus-border bg-white px-3 py-2 text-xs"
                  >
                    {dataset.initiatives.length === 0 ? (
                      <option value="">{t('v5portals.volunteer.noInitiativesOption')}</option>
                    ) : (
                      dataset.initiatives.map((i) => (
                        <option key={i.id} value={i.id}>
                          {isAr ? i.titleAr : i.titleFr}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-nexus-navy mb-1">
                    {t('v5portals.volunteer.hoursLabel')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={checkInHours}
                    onChange={(e) => setCheckInHours(e.target.value)}
                    className="w-full rounded-xl border border-nexus-border bg-white px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-nexus-navy mb-1">
                    {t('v5portals.volunteer.notesLabel')}
                  </label>
                  <input
                    type="text"
                    value={checkInNote}
                    onChange={(e) => setCheckInNote(e.target.value)}
                    placeholder={t('v5portals.volunteer.notesPlaceholder')}
                    className="w-full rounded-xl border border-nexus-border bg-white px-3 py-2 text-xs"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={dataset.initiatives.length === 0}
                  className="w-full bg-nexus-emerald hover:bg-nexus-emerald-deep text-white text-xs"
                >
                  {t('v5portals.volunteer.submitCheckInBtn')}
                </Button>
                {checkInDone && (
                  <p className="text-amber-800 font-medium text-center pt-1">
                    {t('v5portals.volunteer.checkInSuccess')}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-nexus-emerald" />
                <CardTitle className="text-sm font-bold text-nexus-navy">
                  {t('v5portals.volunteer.badgesTitle')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-dashed border-nexus-border bg-nexus-bg/40 p-4 text-center">
                <p className="text-xs text-nexus-gray leading-relaxed">
                  {t('v5portals.volunteer.badgesEmpty')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
