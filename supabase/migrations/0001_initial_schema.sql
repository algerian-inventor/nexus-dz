-- =============================================================================
-- NEXUS DZ — Initial Database Schema Migration
-- Target: Constantine, Algeria (Wilaya 25) & National Scalability
-- =============================================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. ENUMS
-- -----------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM (
    'volunteer',
    'organization_admin',
    'verifier',
    'super_admin'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.verification_status AS ENUM (
    'pending',
    'under_review',
    'verified',
    'rejected'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.initiative_status AS ENUM (
    'draft',
    'open',
    'in_progress',
    'completed',
    'verified',
    'archived'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.task_status AS ENUM (
    'todo',
    'assigned',
    'in_progress',
    'submitted',
    'verified'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- -----------------------------------------------------------------------------
-- 2. PROFILES (1:1 with auth.users)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role public.user_role NOT NULL DEFAULT 'volunteer',
  wilaya_code VARCHAR(4) NOT NULL DEFAULT '25',
  commune TEXT,
  phone TEXT,
  preferred_locale VARCHAR(5) NOT NULL DEFAULT 'ar',
  avatar_url TEXT,
  verified_hours NUMERIC(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 3. ORGANIZATIONS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL,
  name_fr TEXT,
  name_en TEXT,
  registration_number TEXT UNIQUE,
  category TEXT NOT NULL,
  wilaya_code VARCHAR(4) NOT NULL DEFAULT '25',
  commune TEXT NOT NULL,
  description TEXT,
  verification_status public.verification_status NOT NULL DEFAULT 'pending',
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 4. INITIATIVES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.initiatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  category TEXT NOT NULL,
  wilaya_code VARCHAR(4) NOT NULL DEFAULT '25',
  commune TEXT NOT NULL,
  location_details TEXT,
  status public.initiative_status NOT NULL DEFAULT 'draft',
  target_volunteers INTEGER NOT NULL DEFAULT 10,
  target_beneficiaries INTEGER NOT NULL DEFAULT 0,
  start_date DATE,
  end_date DATE,
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 5. TASKS (Field & Volunteer Assignments)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  initiative_id UUID NOT NULL REFERENCES public.initiatives(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  assigned_volunteer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  estimated_hours NUMERIC(6, 2) NOT NULL DEFAULT 1.0,
  logged_hours NUMERIC(6, 2) NOT NULL DEFAULT 0.0,
  status public.task_status NOT NULL DEFAULT 'todo',
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 6. EVIDENCE (Field Documentation & Impact Proof)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.evidence_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  initiative_id UUID NOT NULL REFERENCES public.initiatives(id) ON DELETE CASCADE,
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  submitted_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  notes TEXT,
  file_path TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  gps_latitude NUMERIC(9, 6),
  gps_longitude NUMERIC(9, 6),
  beneficiaries_reached INTEGER NOT NULL DEFAULT 0,
  verification_status public.verification_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 7. VERIFICATION AUDITS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.verification_audits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  evidence_id UUID NOT NULL REFERENCES public.evidence_records(id) ON DELETE CASCADE,
  verifier_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  decision public.verification_status NOT NULL,
  review_notes TEXT,
  reviewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 8. NOTIFICATIONS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
