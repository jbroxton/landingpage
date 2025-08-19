'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getClientAuthHeaders } from '@/AdminPortal/client-auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  const checkAuth = useCallback(async () => {
    try {
      const savedAuth = localStorage.getItem('adminAuth');
      
      if (!savedAuth) {
        router.push('/login');
        return;
      }
      
      const headers = getClientAuthHeaders();
      const response = await fetch('/api/admin/studies', {
        headers,
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        // Invalid credentials, clear and redirect to login
        localStorage.removeItem('adminAuth');
        router.push('/login');
      }
    } catch {
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!isLoginPage) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, [pathname, isLoginPage, checkAuth]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/login');
  };

  // Show login page without the admin header
  if (isLoginPage) {
    return children;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Admin Header */}
      <header className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(15,15,17,0.8)] backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-white">
                Speqq Admin
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Studies
                </Link>
                <Link href="/signups" className="text-gray-300 hover:text-white transition-colors">
                  All Signups
                </Link>
              </nav>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}