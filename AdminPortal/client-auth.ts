// Client-side auth helper for admin pages
export function getClientAuthHeaders(): HeadersInit {
  const savedAuth = localStorage.getItem('adminAuth');
  
  if (savedAuth) {
    return {
      'Authorization': `Basic ${savedAuth}`
    };
  }
  
  // Return empty headers if no saved auth
  return {};
}