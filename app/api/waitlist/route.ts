import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { email, role } = await request.json();
    
    // Basic validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Create waitlist table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        role VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert the new waitlist entry
    const result = await sql`
      INSERT INTO waitlist (email, role)
      VALUES (${email}, ${role})
      ON CONFLICT (email) DO UPDATE
      SET role = ${role}
      RETURNING id;
    `;

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined the waitlist!',
      id: result.rows[0].id
    });
  } catch (error) {
    console.error('Error saving to waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
} 