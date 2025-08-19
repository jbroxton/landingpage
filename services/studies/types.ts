export interface Study {
  id: number;
  name: string;
  description: string;
  user_type: string;
  location: 'Remote' | 'In-Person' | 'Hybrid';
  status: 'draft' | 'published';
  participant_limit: number | null;
  calendly_link: string | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
  signups_count?: number;
  spots_remaining?: number;
}

export interface StudySignup {
  id: number;
  study_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  company_name: string;
  company_size: string;
  years_experience: string;
  timezone: string;
  pronouns?: string;
  calendly_scheduled: boolean;
  created_at: string;
  study?: Study;
}

export interface CreateStudyInput {
  name: string;
  description: string;
  user_type: string;
  location: string;
  status: 'draft' | 'published';
  participant_limit?: number;
  calendly_link?: string;
  start_date?: string;
  end_date?: string;
}

export interface CreateSignupInput {
  study_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  company_name: string;
  company_size: string;
  years_experience: string;
  timezone: string;
  pronouns?: string;
}