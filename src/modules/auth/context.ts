import { createContext, useContext } from 'react';
import type { UserRole } from '@/integrations/supabase/types';
import { getRolePermissions, type RolePermissionMatrix } from './service';

export interface AuthContextValue {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  permissions: RolePermissionMatrix;
  supabaseConfigured: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  activeRole: 'organization_admin',
  setActiveRole: () => undefined,
  permissions: getRolePermissions('organization_admin'),
  supabaseConfigured: false,
});

export function useAuthContext() {
  return useContext(AuthContext);
}
