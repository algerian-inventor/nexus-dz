import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Clock, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDemoStore } from '@/data/demoStoreContext';
import type { TaskStatus, AttendanceStatus } from '@/data/demoTypes';

export function TasksPage() {
  const { t, i18n } = useTranslation();
  const { dataset, createTask, assignTaskVolunteer, updateTaskStatus, recordAttendance } =
    useDemoStore();
  const isAr = i18n.language === 'ar';

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [attModalOpen, setAttModalOpen] = useState(false);

  // Create Task state
  const [initiativeId, setInitiativeId] = useState('init-1');
  const [titleAr, setTitleAr] = useState('');
  const [titleFr, setTitleFr] = useState('');
  const [assignedVolunteerId, setAssignedVolunteerId] = useState<string>('vol-1');
  const [estimatedHours, setEstimatedHours] = useState(6);

  // Record Attendance state
  const [attInitiativeId, setAttInitiativeId] = useState('init-1');
  const [attTaskId, setAttTaskId] = useState('task-1');
  const [attVolunteerId, setAttVolunteerId] = useState('vol-1');
  const [attHours, setAttHours] = useState(4);
  const [attStatus, setAttStatus] = useState<AttendanceStatus>('completed');
  const [attNotes, setAttNotes] = useState('مشاركة ميدانية موثقة في قسنطينة.');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr.trim() && !titleFr.trim()) return;
    createTask({
      initiativeId,
      titleAr: titleAr || titleFr,
      titleFr: titleFr || titleAr,
      descriptionAr: 'مهمة ميدانية ضمن البرنامج الولائي.',
      descriptionFr: 'Mission opérationnelle terrain.',
      assignedVolunteerId: assignedVolunteerId || null,
      estimatedHours: Number(estimatedHours) || 4,
      dueDate: '2026-11-25',
    });
    setTitleAr('');
    setTitleFr('');
    setTaskModalOpen(false);
  };

  const handleRecordAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    recordAttendance({
      initiativeId: attInitiativeId,
      taskId: attTaskId || null,
      volunteerId: attVolunteerId,
      date: new Date().toISOString().slice(0, 10),
      hoursLogged: Number(attHours) || 4,
      status: attStatus,
      notes: attNotes,
    });
    setAttModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${t('pages.tasks.title')} (${dataset.tasks.length})`}
        subtitle={t('pages.tasks.subtitle')}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {/* Record Attendance Modal */}
            <Dialog open={attModalOpen} onOpenChange={setAttModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="navy">
                  <Clock className="h-4 w-4" />
                  {t('pages.tasks.recordAttendanceBtn')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('pages.tasks.recordAttendanceBtn')}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleRecordAttendance} className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <Label>{t('pages.tasks.colInitiative')}</Label>
                    <select
                      value={attInitiativeId}
                      onChange={(e) => setAttInitiativeId(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-xs"
                    >
                      {dataset.initiatives.map((i) => (
                        <option key={i.id} value={i.id}>
                          {isAr ? i.titleAr : i.titleFr}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label>{t('pages.tasks.colTask')}</Label>
                    <select
                      value={attTaskId}
                      onChange={(e) => setAttTaskId(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-xs"
                    >
                      {dataset.tasks.map((task) => (
                        <option key={task.id} value={task.id}>
                          {isAr ? task.titleAr : task.titleFr}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label>{t('pages.tasks.colAssignee')}</Label>
                      <select
                        value={attVolunteerId}
                        onChange={(e) => setAttVolunteerId(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-xs"
                      >
                        {dataset.volunteers.map((v) => (
                          <option key={v.id} value={v.id}>
                            {isAr ? v.fullNameAr : v.fullNameFr}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label>Hours Logged</Label>
                      <Input
                        type="number"
                        min={1}
                        max={24}
                        value={attHours}
                        onChange={(e) => setAttHours(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Status</Label>
                    <select
                      value={attStatus}
                      onChange={(e) => setAttStatus(e.target.value as AttendanceStatus)}
                      className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-xs"
                    >
                      <option value="completed">Completed (مكتمل)</option>
                      <option value="present">Present (حاضر)</option>
                      <option value="excused">Excused (مبرر)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label>Notes</Label>
                    <Input value={attNotes} onChange={(e) => setAttNotes(e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full">
                    {t('common.save')}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Create Task Modal */}
            <Dialog open={taskModalOpen} onOpenChange={setTaskModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                  {t('pages.tasks.createBtn')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('pages.tasks.createBtn')}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateTask} className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <Label>{t('pages.tasks.colInitiative')}</Label>
                    <select
                      value={initiativeId}
                      onChange={(e) => setInitiativeId(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-xs"
                    >
                      {dataset.initiatives.map((i) => (
                        <option key={i.id} value={i.id}>
                          {isAr ? i.titleAr : i.titleFr}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label>عنوان المهمة (عربي)</Label>
                    <Input
                      value={titleAr}
                      onChange={(e) => setTitleAr(e.target.value)}
                      placeholder="توزيع الشتلات وتوثيق القطاع"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Titre de la tâche (Français)</Label>
                    <Input
                      value={titleFr}
                      onChange={(e) => setTitleFr(e.target.value)}
                      placeholder="Distribution des plants et relevé terrain"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label>{t('pages.tasks.colAssignee')}</Label>
                      <select
                        value={assignedVolunteerId}
                        onChange={(e) => setAssignedVolunteerId(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-xs"
                      >
                        <option value="">-- Unassigned --</option>
                        {dataset.volunteers.map((v) => (
                          <option key={v.id} value={v.id}>
                            {isAr ? v.fullNameAr : v.fullNameFr}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label>Estimated Hours</Label>
                      <Input
                        type="number"
                        value={estimatedHours}
                        onChange={(e) => setEstimatedHours(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    {t('common.save')}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      {/* Tasks Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('pages.tasks.colTask')}</TableHead>
            <TableHead>{t('pages.tasks.colInitiative')}</TableHead>
            <TableHead>{t('pages.tasks.colAssignee')}</TableHead>
            <TableHead>{t('pages.tasks.colHours')}</TableHead>
            <TableHead>{t('pages.tasks.colStatus')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataset.tasks.map((task) => {
            const init = dataset.initiatives.find((i) => i.id === task.initiativeId);
            return (
              <TableRow key={task.id}>
                <TableCell className="max-w-xs">
                  <p className="font-semibold text-nexus-navy">
                    {isAr ? task.titleAr : task.titleFr}
                  </p>
                  <p className="text-xs text-nexus-gray">
                    {isAr ? task.descriptionAr : task.descriptionFr}
                  </p>
                </TableCell>
                <TableCell className="max-w-xs text-xs font-medium">
                  {init ? (isAr ? init.titleAr : init.titleFr) : '-'}
                </TableCell>
                <TableCell>
                  <select
                    value={task.assignedVolunteerId || ''}
                    onChange={(e) =>
                      assignTaskVolunteer(task.id, e.target.value ? e.target.value : null)
                    }
                    className="h-8 rounded border border-border bg-white px-2 text-xs text-nexus-navy"
                  >
                    <option value="">-- Unassigned --</option>
                    {dataset.volunteers.map((v) => (
                      <option key={v.id} value={v.id}>
                        {isAr ? v.fullNameAr : v.fullNameFr}
                      </option>
                    ))}
                  </select>
                </TableCell>
                <TableCell className="font-mono text-xs">
                  <strong className="text-nexus-emerald">{task.loggedHours}h</strong> /{' '}
                  {task.estimatedHours}h
                </TableCell>
                <TableCell>
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                    className="h-8 rounded border border-border bg-nexus-surface px-2 text-xs font-medium text-nexus-navy"
                  >
                    <option value="todo">{t('statuses.todo')}</option>
                    <option value="assigned">{t('statuses.assigned')}</option>
                    <option value="in_progress">{t('statuses.in_progress')}</option>
                    <option value="submitted">{t('statuses.submitted')}</option>
                    <option value="verified">{t('statuses.verified')}</option>
                  </select>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Attendance Records Section */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-nexus-navy">
          {t('pages.tasks.attendanceTitle')} ({dataset.attendance.length})
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('pages.volunteers.colName')}</TableHead>
              <TableHead>{t('pages.tasks.colInitiative')}</TableHead>
              <TableHead>{t('pages.tasks.colHours')}</TableHead>
              <TableHead>{t('pages.tasks.colStatus')}</TableHead>
              <TableHead>Date & Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataset.attendance.map((att) => {
              const vol = dataset.volunteers.find((v) => v.id === att.volunteerId);
              const init = dataset.initiatives.find((i) => i.id === att.initiativeId);
              return (
                <TableRow key={att.id}>
                  <TableCell className="font-semibold">
                    {vol ? (isAr ? vol.fullNameAr : vol.fullNameFr) : att.volunteerId}
                  </TableCell>
                  <TableCell className="text-xs">
                    {init ? (isAr ? init.titleAr : init.titleFr) : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="emerald" className="font-mono">
                      +{att.hoursLogged}h
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      <CheckCircle2 className="h-3 w-3 text-nexus-emerald" />
                      {att.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-nexus-gray">
                    <span className="font-mono">{att.date}</span> — {att.notes}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
