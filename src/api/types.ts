/* ============================================================
 * ENUMS
 * ============================================================ */
export type UserRole = 'CANDIDATE' | 'EMPLOYER' | 'ADMIN' | 'SUPERADMIN'

export type ApplicationStatus =
  | 'RECEIVED'
  | 'IN_REVIEW'
  | 'SHORTLISTED'
  | 'INTERVIEW'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'WITHDRAWN'

export type JobStatus =
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'PUBLISHED'
  | 'EXPIRED'
  | 'CLOSED'
  | 'ARCHIVED'
  | 'SUSPENDED'

export type WorkplaceType = 'ON_SITE' | 'HYBRID' | 'REMOTE'

export type Availability =
  | 'IMMEDIATE'
  | 'ONE_MONTH'
  | 'THREE_MONTHS'
  | 'SPECIFIC_DATE'

export type CompanyMemberRole = 'OWNER' | 'ADMIN' | 'RECRUITER'

export type ReportReason =
  | 'DISCRIMINATORY'
  | 'PAYMENT_DEMANDED'
  | 'FRAUD_SCAM'
  | 'MISLEADING_INFO'
  | 'INAPPROPRIATE'
  | 'OTHER'

/* ============================================================
 * PAGINATION
 * ============================================================ */
export interface Paginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

/* ============================================================
 * UTILISATEUR
 * ============================================================ */
export interface UserMe {
  id: string
  email: string
  phone_number: string
  role: UserRole
  is_active: boolean
  is_email_verified: boolean
  is_phone_verified: boolean
  is_mfa_enabled: boolean
  is_suspended: boolean
  created_at: string
}

/* ============================================================
 * AUTH
 * ============================================================ */
export interface LoginRequest {
  identifier: string // email ou téléphone
  password: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

export interface LoginResponse {
  message?: string
  tokens?: AuthTokens
  user?: UserMe
  // Si 2FA activée
  mfa_required?: boolean
  mfa_session_token?: string
}

export interface MFALoginRequest {
  mfa_session_token: string
  code: string
}

export interface RegisterRequest {
  email: string
  phone_number: string
  role: UserRole
  password: string
  cgu_accepted: boolean
  data_protection_accepted: boolean
  institutional_com_accepted?: boolean
}

export interface RegisterResponse {
  id: string
  email: string
  phone_number: string
  role: UserRole
}

export interface VerifyOTPRequest {
  identifier: string
  code: string
  token_type: 'EMAIL_VERIFY' | 'PHONE_OTP' | 'PASSWORD_RESET'
}

export interface PasswordResetRequest {
  identifier: string
}

export interface PasswordResetConfirm {
  identifier: string
  code: string
  new_password: string
}

/* ============================================================
 * RÉFÉRENTIELS
 * ============================================================ */
export interface ContractType {
  id: string
  name: string
  code: string
  order: number
}

export interface EducationLevel {
  id: string
  name: string
  code: string
  order: number
}

export interface JobFamily {
  id: string
  name: string
  code: string
  is_active: boolean
}

export interface Sector {
  id: string
  name: string
  code: string
  description: string
  order: number
  job_families: JobFamily[]
}

export interface LocationRef {
  id: string
  name: string
  location_type: 'REGION' | 'CITY' | 'COMMUNE'
  parent: string | null
  parent_name: string | null
}

/* ============================================================
 * PROFIL CANDIDAT
 * ============================================================ */
export interface CandidateProfile {
  id: string
  user_email: string
  user_phone: string
  first_name: string
  last_name: string
  birth_date: string | null
  location: string | null
  location_detail?: LocationRef | null
  address_details: string | null
  national_mobility: boolean
  current_title: string | null
  education_level: string | null
  education_level_detail?: EducationLevel | null
  years_of_experience: number
  target_sectors: string[]
  target_job_families: string[]
  availability: Availability
  available_from: string | null
  resume_original_name?: string | null
  resume_uploaded_at?: string | null
  resume_url?: string | null
  is_profile_complete: boolean
  created_at: string
  updated_at: string
}

/* ============================================================
 * ENTREPRISE
 * ============================================================ */
export interface Company {
  id: string
  name: string
  legal_identifier: string
  sector: string
  sector_detail: Sector
  description: string
  website: string | null
  contact_email: string
  contact_phone: string
  location: string | null
  location_detail?: LocationRef | null
  address: string
  verification_document_url?: string | null
  verification_status: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED'
  free_period_starts_at?: string | null
  free_period_ends_at?: string | null
  is_verified: boolean
  user_facing_verification_feedback?: string
  created_at: string
  updated_at: string
}

/* ============================================================
 * OFFRE D'EMPLOI
 * ============================================================ */
export interface JobOffer {
  id: string
  title: string
  internal_reference: string | null
  sector: string
  sector_detail?: Sector
  job_family: string | null
  job_family_detail?: JobFamily
  contract_type: string
  contract_type_detail?: ContractType
  duration_months: number | null
  desired_start_date: string | null
  location: string
  location_detail?: LocationRef
  workplace_type: WorkplaceType
  missions_description: string
  required_skills: string
  required_experience_years: number
  required_education_level: string | null
  required_education_level_detail?: EducationLevel
  required_languages: string
  salary_min: string | null
  salary_max: string | null
  is_salary_confidential: boolean
  benefits: string
  open_positions_count: number
  deadline_date: string
  internal_contact_info?: string
  status: JobStatus
  moderation_feedback_user?: string
  submitted_at?: string | null
  published_at?: string | null
  closed_at?: string | null
  hired_candidates_count?: number
  closure_reason?: string
  views_count: number
  applications_count: number
  created_at: string
  updated_at: string
}

/** Version publique (ce que voit un candidat sur /jobs) */
export interface PublicJob {
  id: string
  title: string
  company_name: string
  sector_name: string
  location_name: string
  contract_type_name: string
  workplace_type: WorkplaceType
  open_positions_count: number
  deadline_date: string
  published_at: string
  is_salary_confidential: boolean
  salary_min: string | null
  salary_max: string | null
}

/* ============================================================
 * CANDIDATURE
 * ============================================================ */
export interface Application {
  id: string
  job: string
  job_detail: PublicJob
  resume_snapshot_name: string
  resume_snapshot_url: string
  cover_note: string
  status: ApplicationStatus
  candidate_feedback?: string
  employer_private_notes?: string
  created_at: string
  status_updated_at: string
}

export interface ApplyRequest {
  cover_note: string
}

export interface UpdateApplicationStatusRequest {
  status: ApplicationStatus
  candidate_feedback?: string
  employer_private_notes?: string
  history_comment?: string
}

/* ============================================================
 * FAVORIS
 * ============================================================ */
export interface Bookmark {
  id: string
  job_id: string
  job_title: string
  company_name: string
  location_name: string
  contract_type_name: string
  deadline_date: string
}

/* ============================================================
 * NOTIFICATIONS
 * ============================================================ */
export interface Notification {
  id: string
  channel: 'EMAIL' | 'SMS' | 'PUSH' | 'IN_APP'
  event_type: string
  subject: string
  content: string
  metadata: string
  status: 'PENDING' | 'SENT' | 'FAILED'
  sent_at: string | null
  created_at: string
}

export interface UnreadCount {
  unread_count: number
}

/* ============================================================
 * MODÉRATION
 * ============================================================ */
export interface ModerateCompanyRequest {
  action: 'APPROVE_COMPANY' | 'REJECT_COMPANY' | 'SUSPEND_COMPANY'
  internal_motive: string
  user_facing_explanation: string
}

export interface ModerateJobRequest {
  action: 'APPROVE_JOB' | 'REJECT_JOB' | 'UNPUBLISH_JOB'
  internal_motive: string
  user_facing_explanation: string
}

export interface CreateReportRequest {
  target_type: 'job' | 'company'
  target_id: string
  reason: ReportReason
  details: string
  reporter_email?: string
}

/* ============================================================
 * DASHBOARD KPI (admin)
 * ============================================================ */
export interface DashboardKPI {
  registered_candidates: number
  total_candidates_registered: number
  verified_employers: number
  pending_employers: number
  active_job_offers: number
  total_applications: number
  avg_moderation_delay_hours: number
  conversion_rate_percentage: number
}