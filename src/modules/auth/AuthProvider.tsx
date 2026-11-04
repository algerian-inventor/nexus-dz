import React, { useState, useMemo } from 'react';
import type { UserRole } from '@/integrations/supabase/types';
import { isSupabaseConfigured } from '@/lib/env';
import { getRolePermissions } from './service';
import { AuthContext } from './context';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRole] = useState<UserRole>('organization_admin');

  const value = useMemo(
    () => ({
      activeRole,
      setActiveRole,
      permissions: getRolePermissions(activeRole),
      supabaseConfigured: isSupabaseConfigured,
    }),
    [activeRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
