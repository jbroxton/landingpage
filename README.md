# Speqq Landing Page

A landing page for Speqq - a platform for product managers to turn ideas into launches faster.

## Features

- Modern UI built with Next.js 14 and React
- Animated components using Framer Motion
- Form handling with database integration
- Responsive design for all device sizes
- Waitlist email collection

## Deployment with Vercel

This project is configured to work with Vercel deployment and Neon PostgreSQL.

### Prerequisites

- A Vercel account
- A Neon PostgreSQL database

### Environment Variables

Add the following environment variables in your Vercel project settings:

```
POSTGRES_URL=your_neon_connection_string
POSTGRES_USER=your_neon_user
POSTGRES_HOST=your_neon_host
POSTGRES_PASSWORD=your_neon_password
POSTGRES_DATABASE=your_neon_database
```

### Deploy

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Add the environment variables
4. Deploy!

### Development

For local development:

1. Clone the repository
2. Create a `.env.local` file with your Neon database credentials
3. Install dependencies with `npm install`
4. Run the development server with `npm run dev`

## Database Setup

The database table is automatically created when the first form submission is made. It creates:

```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Data Export

To export your waitlist data, you can use the Neon database interface or connect using any PostgreSQL client.
