export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type UserRole = 'volunteer' | 'organization_admin' | 'verifier' | 'super_admin';
export type VerificationStatus = 'pending' | 'under_review' | 'verified' | 'rejected';
export type InitiativeStatus =
  'draft' | 'open' | 'in_progress' | 'completed' | 'verified' | 'archived';
export type TaskStatus = 'todo' | 'assigned' | 'in_progress' | 'submitted' | 'verified';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: UserRole;
          wilaya_code: string;
          commune: string | null;
          phone: string | null;
          preferred_locale: 'ar' | 'fr' | 'en';
          avatar_url: string | null;
          verified_hours: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: UserRole;
          wilaya_code?: string;
          commune?: string | null;
          phone?: string | null;
          preferred_locale?: 'ar' | 'fr' | 'en';
          avatar_url?: string | null;
          verified_hours?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string;
          role?: UserRole;
          wilaya_code?: string;
          commune?: string | null;
          phone?: string | null;
          preferred_locale?: 'ar' | 'fr' | 'en';
          avatar_url?: string | null;
          verified_hours?: number;
          updated_at?: string;
        };
      };
      organizations: {
        Row: {
          id: string;
          name_ar: string;
          name_fr: string | null;
          name_en: string | null;
          registration_number: string | null;
          category: string;
          wilaya_code: string;
          commune: string;
          description: string | null;
          verification_status: VerificationStatus;
          owner_id: string;
          logo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name_ar: string;
          name_fr?: string | null;
          name_en?: string | null;
          registration_number?: string | null;
          category: string;
          wilaya_code?: string;
          commune: string;
          description?: string | null;
          verification_status?: VerificationStatus;
          owner_id: string;
          logo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name_ar?: string;
          name_fr?: string | null;
          name_en?: string | null;
          registration_number?: string | null;
          category?: string;
          wilaya_code?: string;
          commune?: string;
          description?: string | null;
          verification_status?: VerificationStatus;
          logo_url?: string | null;
          updated_at?: string;
        };
      };
      initiatives: {
        Row: {
          id: string;
          organization_id: string;
          title: string;
          summary: string;
          category: string;
          wilaya_code: string;
          commune: string;
          location_details: string | null;
          status: InitiativeStatus;
          target_volunteers: number;
          target_beneficiaries: number;
          start_date: string | null;
          end_date: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          title: string;
          summary: string;
          category: string;
          wilaya_code?: string;
          commune: string;
          location_details?: string | null;
          status?: InitiativeStatus;
          target_volunteers?: number;
          target_beneficiaries?: number;
          start_date?: string | null;
          end_date?: string | null;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          summary?: string;
          category?: string;
          commune?: string;
          location_details?: string | null;
          status?: InitiativeStatus;
          target_volunteers?: number;
          target_beneficiaries?: number;
          start_date?: string | null;
          end_date?: string | null;
          updated_at?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          initiative_id: string;
          title: string;
          description: string | null;
          assigned_volunteer_id: string | null;
          estimated_hours: number;
          logged_hours: number;
          status: TaskStatus;
          due_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          initiative_id: string;
          title: string;
          description?: string | null;
          assigned_volunteer_id?: string | null;
          estimated_hours?: number;
          logged_hours?: number;
          status?: TaskStatus;
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          assigned_volunteer_id?: string | null;
          estimated_hours?: number;
          logged_hours?: number;
          status?: TaskStatus;
          due_date?: string | null;
          updated_at?: string;
        };
      };
      evidence_records: {
        Row: {
          id: string;
          initiative_id: string;
          task_id: string | null;
          submitted_by: string;
          title: string;
          notes: string | null;
          file_path: string;
          mime_type: string;
          gps_latitude: number | null;
          gps_longitude: number | null;
          beneficiaries_reached: number;
          verification_status: VerificationStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          initiative_id: string;
          task_id?: string | null;
          submitted_by: string;
          title: string;
          notes?: string | null;
          file_path: string;
          mime_type: string;
          gps_latitude?: number | null;
          gps_longitude?: number | null;
          beneficiaries_reached?: number;
          verification_status?: VerificationStatus;
          created_at?: string;
        };
        Update: {
          title?: string;
          notes?: string | null;
          verification_status?: VerificationStatus;
        };
      };
      verification_audits: {
        Row: {
          id: string;
          evidence_id: string;
          verifier_id: string;
          decision: VerificationStatus;
          review_notes: string | null;
          reviewed_at: string;
        };
        Insert: {
          id?: string;
          evidence_id: string;
          verifier_id: string;
          decision: VerificationStatus;
          review_notes?: string | null;
          reviewed_at?: string;
        };
        Update: {
          decision?: VerificationStatus;
          review_notes?: string | null;
        };
      };
      notifications: {
        Row: {
          id: string;
          recipient_id: string;
          title: string;
          body: string;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          recipient_id: string;
          title: string;
          body: string;
          read_at?: string | null;
          created_at?: string;
        };
        Update: {
          read_at?: string | null;
        };
      };
    };
    Enums: {
      user_role: UserRole;
      verification_status: VerificationStatus;
      initiative_status: InitiativeStatus;
      task_status: TaskStatus;
    };
  };
}
