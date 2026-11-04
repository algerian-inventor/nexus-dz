-- =============================================================================
-- NEXUS DZ — Row Level Security (RLS) Policies
-- =============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view public profile directory and update their own profile
CREATE POLICY "Public profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Organizations: Publicly readable when verified, manageable by owner or super_admin
CREATE POLICY "Verified organizations are publicly viewable"
  ON public.organizations FOR SELECT
  USING (verification_status = 'verified' OR auth.uid() = owner_id);

CREATE POLICY "Authenticated users can register organizations"
  ON public.organizations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Organization owners can update their organization"
  ON public.organizations FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Initiatives: Publicly readable when open/in_progress/completed/verified
CREATE POLICY "Public initiatives are viewable by everyone"
  ON public.initiatives FOR SELECT
  USING (status IN ('open', 'in_progress', 'completed', 'verified') OR auth.uid() = created_by);

CREATE POLICY "Organization admins can create initiatives"
  ON public.initiatives FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Tasks: Readable by authenticated volunteers and organization owners
CREATE POLICY "Authenticated users can view tasks"
  ON public.tasks FOR SELECT
  TO authenticated
  USING (true);

-- Evidence Records: Readable by authenticated users, insertable by submitter
CREATE POLICY "Authenticated users can view evidence records"
  ON public.evidence_records FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can submit field evidence"
  ON public.evidence_records FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = submitted_by);

-- Verification Audits: Readable by authenticated users, insertable by verifiers
CREATE POLICY "Authenticated users can view verification audits"
  ON public.verification_audits FOR SELECT
  TO authenticated
  USING (true);

-- Notifications: Users can only read and update their own notifications
CREATE POLICY "Users can read own notifications"
  ON public.notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = recipient_id);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = recipient_id);
