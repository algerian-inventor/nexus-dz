import { useTranslation } from 'react-i18next';
import { CheckCheck, Bell } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { useDemoStore } from '@/data/demoStoreContext';

export function NotificationsPage() {
  const { t, i18n } = useTranslation();
  const { dataset, markNotificationRead, markAllNotificationsRead } = useDemoStore();
  const isAr = i18n.language === 'ar';

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${t('pages.notifications.title')} (${dataset.notifications.length})`}
        subtitle={t('pages.notifications.subtitle')}
        actions={
          <Button size="sm" variant="outline" onClick={markAllNotificationsRead}>
            <CheckCheck className="h-4 w-4" />
            {t('pages.notifications.markAllRead')}
          </Button>
        }
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('pages.notifications.title')}</TableHead>
            <TableHead>Target Role</TableHead>
            <TableHead>{t('pages.verification.colTimestamp')}</TableHead>
            <TableHead>{t('common.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataset.notifications.map((notif) => (
            <TableRow
              key={notif.id}
              className={notif.read ? 'opacity-70' : 'bg-nexus-emerald-light/25'}
            >
              <TableCell className="max-w-md">
                <div className="flex items-start gap-2.5">
                  <Bell className="mt-0.5 h-4 w-4 shrink-0 text-nexus-emerald" />
                  <div>
                    <p className="font-semibold text-nexus-navy">
                      {isAr ? notif.titleAr : notif.titleFr}
                    </p>
                    <p className="mt-0.5 text-xs text-nexus-gray">
                      {isAr ? notif.bodyAr : notif.bodyFr}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {notif.roleTarget === 'all' ? 'All Roles' : t(`roles.${notif.roleTarget}`)}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-xs text-nexus-gray">
                {notif.createdAt.slice(0, 16).replace('T', ' ')}
              </TableCell>
              <TableCell>
                {!notif.read ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs"
                    onClick={() => markNotificationRead(notif.id)}
                  >
                    Mark Read
                  </Button>
                ) : (
                  <Badge variant="secondary">Read</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
