# UXR Studies Signup

## Goal
Build a flexible system for managing and displaying user research studies with:
- Admin portal for creating/managing studies (accessible via secret route)
- Public UI for viewing and signing up for studies
- Integration with Calendly for scheduling

---

## Admin Experience

### Access
- Secret route: `/admin/studies` (protected, not linked publicly)
- Simple authentication (can be basic auth or single admin password)

### Admin Dashboard Features
1. **Study List View**
   - Table showing all studies (draft & published)
   - Columns: Name, Status, Signups Count, Created Date, Actions
   - Actions: Edit, Delete, View Signups, Toggle Status

2. **Create/Edit Study Form**
   - Study Name (text)
   - Description (rich text/markdown)
   - User Type (dropdown: Product Manager, Designer, Developer, etc.)
   - Location (dropdown: Remote, In-Person, Hybrid)
   - Status (toggle: Draft/Published)
   - Participant Limit (number)
   - Calendly Link (URL for embedding)
   - Date Range (start/end dates for when study is active)

3. **View Signups**
   - List of participants with all their information
   - Export to CSV functionality
   - Mark as contacted/scheduled

---

## Public User Experience

### User Journey 1: Discovering Studies
- **Entry Point**: CTA button next to waitlist "Participate in User Studies"
- **Landing**: Studies listing page showing all published studies
- **Browse**: See study cards with key info
- **Select**: Click on a study to view details

### User Journey 2: Signing Up for a Study
1. **View Study Details**
   - Study name and description
   - Requirements (user type, time commitment)
   - Location (Remote/In-Person)
   - Available slots indicator

2. **Start Signup**
   - Click "Sign Up for This Study" button
   - Opens signup form modal/page

3. **Complete Form**
   - First Name*
   - Last Name*
   - Email*
   - Role* (dropdown)
   - Company Name*
   - Company Size* (dropdown: 1-10, 11-50, 51-200, 201-500, 500+)
   - Years of Experience* (dropdown: 0-1, 2-5, 6-10, 10+)
   - Timezone* (dropdown)
   - Pronouns (optional text field)

4. **Schedule via Calendly**
   - After form submission, show embedded Calendly
   - User selects their preferred time slot

5. **Confirmation**
   - Success message
   - Optional: Confirmation email with details

---

## Database Schema

### Studies Table
```sql
CREATE TABLE studies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  user_type VARCHAR(100),
  location VARCHAR(50),
  status VARCHAR(20) DEFAULT 'draft',
  participant_limit INTEGER,
  calendly_link TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Study Signups Table
```sql
CREATE TABLE study_signups (
  id SERIAL PRIMARY KEY,
  study_id INTEGER REFERENCES studies(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(100),
  company_name VARCHAR(255),
  company_size VARCHAR(50),
  years_experience VARCHAR(50),
  timezone VARCHAR(100),
  pronouns VARCHAR(50),
  calendly_scheduled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## UI Components

### Public Pages
1. **Studies Listing Page** (`/studies`)
   - Grid of study cards
   - Filter by user type, location
   - Show "X spots remaining" if limit set

2. **Study Detail Page** (`/studies/[id]`)
   - Full description
   - Requirements section
   - Signup form
   - Calendly embed after form submission

### Admin Pages
1. **Admin Dashboard** (`/admin/studies`)
   - Data table with studies
   - Quick actions menu

2. **Study Form** (`/admin/studies/[id]` or `/admin/studies/new`)
   - Form with all fields
   - Save as draft / Publish buttons
   - Preview functionality

---

## Technical Implementation Notes

### Security
- Admin routes protected by middleware
- Use environment variable for admin password
- Rate limiting on signup forms

### Styling
- Consistent with existing dark theme
- Purple gradient accents
- Glass morphism effects for cards

### Mobile Responsiveness
- Stack form fields on mobile
- Simplified table view for admin on mobile
- Touch-friendly buttons and inputs

---

## MVP vs Future Enhancements

### MVP (Phase 1)
- Basic admin CRUD for studies
- Public listing and signup flow
- Calendly integration
- Database storage

### Future Enhancements (Phase 2)
- Email confirmations
- Admin analytics dashboard
- Participant communication tools
- Automated reminder emails
- Tags/categories for studies
- Search functionality
