import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, MapPin, FileText, Image as ImageIcon } from 'lucide-react';
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

export function DocumentationPage() {
  const { t, i18n } = useTranslation();
  const { dataset, submitEvidence } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const [dialogOpen, setDialogOpen] = useState(false);
  const [initiativeId, setInitiativeId] = useState('init-2');
  const [taskId, setTaskId] = useState('task-5');
  const [titleAr, setTitleAr] = useState('');
  const [titleFr, setTitleFr] = useState('');
  const [notes, setNotes] = useState('توثيق ميداني مرفق بالصور وقائمة الحضور الموقعة.');
  const [gpsCoordinates, setGpsCoordinates] = useState('36.3650° N, 6.6147° E (Constantine)');
  const [beneficiariesReached, setBeneficiariesReached] = useState(120);
  const [hoursClaimed, setHoursClaimed] = useState(12);
  const [fileName, setFileName] = useState('constantine_field_proof.jpg');
  const [mimeType, setMimeType] = useState('image/jpeg');
  const [previewDataUrl, setPreviewDataUrl] = useState<string | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setMimeType(file.type || 'image/jpeg');

    if (file.type.startsWith('image/') && file.size < 2_500_000) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreviewDataUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr.trim() && !titleFr.trim()) return;
    submitEvidence({
      initiativeId,
      taskId: taskId || null,
      titleAr: titleAr || titleFr,
      titleFr: titleFr || titleAr,
      notes,
      fileName,
      mimeType,
      previewDataUrl,
      gpsCoordinates,
      beneficiariesReached: Number(beneficiariesReached) || 50,
      hoursClaimed: Number(hoursClaimed) || 8,
    });
    setTitleAr('');
    setTitleFr('');
    setPreviewDataUrl(undefined);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${t('pages.documentation.title')} (${dataset.evidence.length})`}
        subtitle={t('pages.documentation.subtitle')}
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Upload className="h-4 w-4" />
                {t('pages.documentation.uploadBtn')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('pages.documentation.uploadBtn')}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
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
                  <Label>{t('pages.tasks.colTask')}</Label>
                  <select
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-xs"
                  >
                    <option value="">-- General Initiative Evidence --</option>
                    {dataset.tasks.map((task) => (
                      <option key={task.id} value={task.id}>
                        {isAr ? task.titleAr : task.titleFr}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label>عنوان الدليل (عربي)</Label>
                  <Input
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    placeholder="محضر وصور النشاط الميداني بقسنطينة"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Intitulé de la preuve (Français)</Label>
                  <Input
                    value={titleFr}
                    onChange={(e) => setTitleFr(e.target.value)}
                    placeholder="Rapport photo et feuille d'émargement"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Beneficiaries Reached</Label>
                    <Input
                      type="number"
                      value={beneficiariesReached}
                      onChange={(e) => setBeneficiariesReached(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Volunteer Hours Claimed</Label>
                    <Input
                      type="number"
                      value={hoursClaimed}
                      onChange={(e) => setHoursClaimed(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>GPS Coordinates (Constantine)</Label>
                  <Input
                    value={gpsCoordinates}
                    onChange={(e) => setGpsCoordinates(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Select Image / Document (Browser Storage)</Label>
                  <Input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
                </div>
                <div className="space-y-1">
                  <Label>Notes</Label>
                  <Input value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
                <Button type="submit" className="w-full">
                  {t('common.save')}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('pages.documentation.colTitle')}</TableHead>
            <TableHead>{t('pages.documentation.colInitiative')}</TableHead>
            <TableHead>{t('pages.documentation.colSubmittedBy')}</TableHead>
            <TableHead>{t('pages.documentation.colImpact')}</TableHead>
            <TableHead>{t('pages.documentation.colVerification')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataset.evidence.map((ev) => {
            const init = dataset.initiatives.find((i) => i.id === ev.initiativeId);
            return (
              <TableRow key={ev.id}>
                <TableCell className="max-w-sm">
                  <div className="flex items-start gap-2.5">
                    {ev.previewDataUrl ? (
                      <img
                        src={ev.previewDataUrl}
                        alt={ev.fileName}
                        className="h-12 w-12 rounded border border-border object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-nexus-surface text-nexus-emerald">
                        {ev.mimeType.includes('pdf') ? (
                          <FileText className="h-5 w-5" />
                        ) : (
                          <ImageIcon className="h-5 w-5" />
                        )}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-nexus-navy">
                        {isAr ? ev.titleAr : ev.titleFr}
                      </p>
                      <p className="mt-0.5 text-xs text-nexus-gray">{ev.notes}</p>
                      <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-nexus-gray">
                        <MapPin className="h-3 w-3 text-nexus-emerald" />
                        {ev.gpsCoordinates} ({ev.fileName})
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs text-xs font-medium">
                  {init ? (isAr ? init.titleAr : init.titleFr) : '-'}
                </TableCell>
                <TableCell className="text-xs">
                  <p className="font-medium text-nexus-navy">{ev.submittedByName}</p>
                  <Badge variant="outline" className="mt-1 text-[10px]">
                    {t(`roles.${ev.submittedByRole}`)}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">
                  <p className="font-semibold text-nexus-emerald">
                    +{ev.beneficiariesReached} Beneficiaries
                  </p>
                  <p className="text-nexus-navy">+{ev.hoursClaimed}h Volunteer Hours</p>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      ev.verificationStatus === 'verified'
                        ? 'emerald'
                        : ev.verificationStatus === 'rejected'
                          ? 'navy'
                          : 'secondary'
                    }
                  >
                    {t(`statuses.${ev.verificationStatus}`)}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
