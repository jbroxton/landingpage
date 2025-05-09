// A simple script to test the database connection
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
  });

  try {
    console.log('Connecting to database...');
    
    // Test the connection
    const client = await pool.connect();
    console.log('Connection successful!');

    // Test creating the waitlist table
    await client.query(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        role VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table created or already exists.');

    // Check if the table is empty
    const result = await client.query('SELECT COUNT(*) FROM waitlist');
    console.log(`Waitlist entries: ${result.rows[0].count}`);

    client.release();
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await pool.end();
  }
}

testConnection(); 