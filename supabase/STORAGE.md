# NEXUS DZ — Supabase Storage Configuration

This document defines the required Supabase Storage buckets, file restrictions, and Row-Level Security (RLS) policies for **NEXUS DZ**.

---

## 1. Required Storage Buckets

Create the following buckets in your Supabase project (`Storage > Buckets`) or via SQL migration:

| Bucket ID | Public | Allowed MIME Types | Max File Size | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `initiative-evidence` | `false` | `image/jpeg`, `image/png`, `image/webp`, `application/pdf` | `15 MB` | Field evidence photos, attendance logs, and impact receipts submitted by volunteers and coordinators in Constantine. |
| `organization-documents` | `false` | `application/pdf`, `image/jpeg`, `image/png` | `10 MB` | Official association accreditation documents (`Agrément`), statutes, and compliance certificates. |
| `avatars` | `true` | `image/jpeg`, `image/png`, `image/webp` | `2 MB` | Organization logos and volunteer profile avatars. |

---

## 2. Folder Naming Convention

To maintain clean multi-tenant isolation and deterministic RLS checks:

- **`initiative-evidence`**:
  `{organization_id}/{initiative_id}/{submitted_by_user_id}/{timestamp}_{filename}`
- **`organization-documents`**:
  `{organization_id}/accreditation/{filename}`
- **`avatars`**:
  `{user_id}/{filename}`

---

## 3. Storage RLS Policies (SQL)

Run these policies in the Supabase SQL Editor after creating the buckets:

```sql
-- 1. Avatars: Publicly viewable, owner can upload/update
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- 2. Initiative Evidence: Authenticated contributors can upload; Verifiers & Org Admins can read
CREATE POLICY "Authenticated users can view evidence files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'initiative-evidence');

CREATE POLICY "Contributors can upload initiative evidence"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'initiative-evidence'
    AND (storage.foldername(name))[3] = auth.uid()::text
  );

-- 3. Organization Documents: Only organization owner and verifiers can access
CREATE POLICY "Organization owners can upload accreditation docs"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'organization-documents');
```
