const { sql } = require('@vercel/postgres');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function createTables() {
  try {
    console.log('Creating studies table...');
    
    // Create studies table
    await sql`
      CREATE TABLE IF NOT EXISTS studies (
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
    `;
    
    console.log('✅ Studies table created');
    
    // Create study_signups table
    console.log('Creating study_signups table...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS study_signups (
        id SERIAL PRIMARY KEY,
        study_id INTEGER REFERENCES studies(id) ON DELETE CASCADE,
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(study_id, email)
      );
    `;
    
    console.log('✅ Study_signups table created');
    
    // Create indexes for better performance
    console.log('Creating indexes...');
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_studies_status ON studies(status);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_signups_study_id ON study_signups(study_id);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_signups_email ON study_signups(email);
    `;
    
    console.log('✅ Indexes created');
    console.log('✅ Database setup complete!');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

createTables();