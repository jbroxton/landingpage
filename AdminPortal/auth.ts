import { NextRequest } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';

export function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return false;
  }
  
  const [type, credentials] = authHeader.split(' ');
  
  if (type !== 'Basic') {
    return false;
  }
  
  const decoded = Buffer.from(credentials, 'base64').toString();
  const [username, password] = decoded.split(':');
  
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function getAuthHeaders(): HeadersInit {
  const credentials = Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString('base64');
  return {
    'Authorization': `Basic ${credentials}`
  };
}