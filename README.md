# NEXUS DZ

> **From Community Needs to Measurable Impact.**  
> **من احتياجات المجتمع إلى أثر قابل للقياس.**

**NEXUS DZ** is a Civic-Tech, Social Impact, and Volunteer Management platform engineered for **Constantine, Algeria (Wilaya 25)** with an architecture designed to scale across all 58 Algerian wilayas.

---

## 1. Project Identity & Scope

- **Name**: NEXUS DZ
- **Category**: Civic-Tech / Social Impact / Volunteer Management
- **Initial Geographic Target**: Wilaya 25 — Constantine (`Constantine Center`, `El Khroub`, `Ali Mendjeli`, `Ain Smara`, `Hamma Bouziane`, `Didouche Mourad`, `Zighoud Youcef`)
- **Localization**:
  - **Arabic (`ar`)** — Default (`dir="rtl"`)
  - **French (`fr`)** — Supported (`dir="ltr"`)
  - **English (`en`)** — Supported (`dir="ltr"`)
- **Visual Identity**:
  - Emerald: `#0B8A44`
  - Navy: `#0F172A`
  - Surface Background: `#F8FAFC`
  - Pure White: `#FFFFFF`
  - Slate Gray: `#64748B`

---

## 2. Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling & UI**: Tailwind CSS, `shadcn/ui` primitives (Radix UI), Lucide Icons
- **Routing**: React Router v7
- **Internationalization**: `i18next` & `react-i18next` with automatic `RTL`/`LTR` document switching
- **Validation**: Zod (environment variables, authentication, and domain schemas)
- **Data Visualization**: Recharts
- **Backend & Persistence (Prepared)**: Supabase (`@supabase/supabase-js`), PostgreSQL, Row-Level Security (RLS), Supabase Auth, Supabase Storage

---

## 3. Modular Architecture

Business logic and data services are strictly separated from presentation components:

```text
d:\NEXUS
├── supabase/
│   ├── migrations/
│   │   └── 0001_initial_schema.sql      # PostgreSQL enums & tables
│   ├── policies/
│   │   └── 0001_rls_policies.sql        # Row-Level Security policies
│   └── STORAGE.md                       # Storage buckets & access rules
├── src/
│   ├── components/
│   │   ├── shared/                      # LanguageSwitcher, CommuneFilterBar, StatusBanners
│   │   └── ui/                          # Reusable design system primitives (shadcn/ui)
│   ├── i18n/
│   │   ├── config.ts                    # i18next initialization & RTL/LTR synchronization
│   │   └── locales/                     # ar.json (default), fr.json, en.json
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts                # Safe, typed Supabase client
│   │       └── types.ts                 # PostgreSQL Database TypeScript definitions
│   ├── lib/
│   │   ├── env.ts                       # Zod-validated environment configuration
│   │   └── utils.ts                     # Classname & UI utilities
│   ├── modules/                         # Domain business logic (separated from UI)
│   │   ├── administration/
│   │   ├── analytics/
│   │   ├── auth/
│   │   ├── evidence/
│   │   ├── initiatives/
│   │   ├── organizations/
│   │   ├── verification/
│   │   └── volunteers/
│   ├── pages/
│   │   ├── public/                      # Landing, About, Initiatives, Organizations, Login, Register
│   │   └── app/                         # Dashboard, Orgs, Volunteers, Initiatives, Tasks, Docs, Verification, Analytics, Notifications, Settings
│   └── shell/                           # PublicLayout & role-aware AppShell
```

---

## 4. Getting Started

### Prerequisites
- Node.js `>= 20.x`
- npm `>= 10.x`

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and supply your Supabase project credentials:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Quality & Build Checks
```bash
npm run typecheck
npm run lint
npm run build
```
