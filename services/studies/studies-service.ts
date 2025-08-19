import { sql } from '@vercel/postgres';
import { Study, StudySignup, CreateStudyInput, CreateSignupInput } from './types';

// Admin queries - get all studies
export async function getAllStudies() {
  const result = await sql<Study & { signups_count: number }>`
    SELECT 
      s.*,
      COUNT(ss.id)::int as signups_count
    FROM studies s
    LEFT JOIN study_signups ss ON s.id = ss.study_id
    GROUP BY s.id
    ORDER BY s.created_at DESC
  `;
  return result.rows;
}

// Public queries - get published studies only
export async function getPublishedStudies() {
  const result = await sql<Study & { signups_count: number; spots_remaining: number }>`
    SELECT 
      s.*,
      COUNT(ss.id)::int as signups_count,
      CASE 
        WHEN s.participant_limit IS NULL THEN NULL
        ELSE GREATEST(0, s.participant_limit - COUNT(ss.id)::int)
      END as spots_remaining
    FROM studies s
    LEFT JOIN study_signups ss ON s.id = ss.study_id
    WHERE s.status = 'published'
      AND (s.start_date IS NULL OR s.start_date <= CURRENT_DATE)
      AND (s.end_date IS NULL OR s.end_date >= CURRENT_DATE)
    GROUP BY s.id
    ORDER BY s.created_at DESC
  `;
  return result.rows;
}

export async function getStudyById(id: number) {
  const result = await sql<Study>`
    SELECT * FROM studies WHERE id = ${id}
  `;
  return result.rows[0] || null;
}

export async function getPublishedStudyById(id: number) {
  const result = await sql<Study & { signups_count: number; spots_remaining: number }>`
    SELECT 
      s.*,
      COUNT(ss.id)::int as signups_count,
      CASE 
        WHEN s.participant_limit IS NULL THEN NULL
        ELSE GREATEST(0, s.participant_limit - COUNT(ss.id)::int)
      END as spots_remaining
    FROM studies s
    LEFT JOIN study_signups ss ON s.id = ss.study_id
    WHERE s.id = ${id}
      AND s.status = 'published'
    GROUP BY s.id
  `;
  return result.rows[0] || null;
}

export async function createStudy(input: CreateStudyInput) {
  const result = await sql<Study>`
    INSERT INTO studies (
      name, description, user_type, location, status,
      participant_limit, calendly_link, start_date, end_date
    )
    VALUES (
      ${input.name}, ${input.description}, ${input.user_type}, 
      ${input.location}, ${input.status}, ${input.participant_limit || null},
      ${input.calendly_link || null}, ${input.start_date || null}, 
      ${input.end_date || null}
    )
    RETURNING *
  `;
  return result.rows[0];
}

export async function updateStudy(id: number, input: CreateStudyInput) {
  const result = await sql<Study>`
    UPDATE studies
    SET 
      name = ${input.name},
      description = ${input.description},
      user_type = ${input.user_type},
      location = ${input.location},
      status = ${input.status},
      participant_limit = ${input.participant_limit || null},
      calendly_link = ${input.calendly_link || null},
      start_date = ${input.start_date || null},
      end_date = ${input.end_date || null},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return result.rows[0] || null;
}

export async function deleteStudy(id: number) {
  await sql`DELETE FROM studies WHERE id = ${id}`;
}

// Signups queries
export async function getSignupsByStudyId(studyId: number) {
  const result = await sql<StudySignup>`
    SELECT * FROM study_signups 
    WHERE study_id = ${studyId}
    ORDER BY created_at DESC
  `;
  return result.rows;
}

export async function createSignup(input: CreateSignupInput) {
  // Check if study is full
  const studyCheck = await sql`
    SELECT id, participant_limit,
      (SELECT COUNT(*) FROM study_signups WHERE study_id = ${input.study_id})::int as current_signups
    FROM studies 
    WHERE id = ${input.study_id} AND status = 'published'
  `;

  if (studyCheck.rows.length === 0) {
    throw new Error('Study not found or not available');
  }

  const study = studyCheck.rows[0];
  
  if (study.participant_limit && study.current_signups >= study.participant_limit) {
    throw new Error('Study is full');
  }

  const result = await sql<StudySignup>`
    INSERT INTO study_signups (
      study_id, first_name, last_name, email, role,
      company_name, company_size, years_experience, timezone, pronouns
    )
    VALUES (
      ${input.study_id}, ${input.first_name}, ${input.last_name}, ${input.email}, 
      ${input.role}, ${input.company_name}, ${input.company_size},
      ${input.years_experience}, ${input.timezone}, ${input.pronouns || null}
    )
    ON CONFLICT (study_id, email) DO UPDATE
    SET 
      first_name = ${input.first_name},
      last_name = ${input.last_name},
      role = ${input.role},
      company_name = ${input.company_name},
      company_size = ${input.company_size},
      years_experience = ${input.years_experience},
      timezone = ${input.timezone},
      pronouns = ${input.pronouns || null}
    RETURNING *
  `;
  
  return result.rows[0];
}