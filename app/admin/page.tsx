'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Study } from '@/services/studies/types';
import { getClientAuthHeaders } from '@/AdminPortal/client-auth';

export default function AdminDashboard() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    try {
      const response = await fetch('/api/admin/studies', {
        headers: getClientAuthHeaders(),
      });
      
      if (response.ok) {
        const data = await response.json();
        setStudies(data);
      }
    } catch (error) {
      console.error('Error fetching studies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this study?')) return;

    try {
      const response = await fetch(`/api/admin/studies/${id}`, {
        method: 'DELETE',
        headers: getClientAuthHeaders(),
      });

      if (response.ok) {
        fetchStudies();
      }
    } catch (error) {
      console.error('Error deleting study:', error);
    }
  };

  const toggleStatus = async (study: Study) => {
    const newStatus = study.status === 'published' ? 'draft' : 'published';
    
    try {
      const response = await fetch(`/api/admin/studies/${study.id}`, {
        method: 'PUT',
        headers: {
          ...getClientAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...study,
          status: newStatus,
        }),
      });

      if (response.ok) {
        fetchStudies();
      }
    } catch (error) {
      console.error('Error updating study:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Loading studies...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Studies</h1>
          <p className="text-gray-400 mt-1">Manage your UX research studies</p>
        </div>
        <Button
          onClick={() => router.push('/admin/studies/new')}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Create Study
        </Button>
      </div>

      {/* Studies Table */}
      <div className="bg-[rgba(20,20,25,0.25)] backdrop-blur-md rounded-xl border border-[rgba(255,255,255,0.12)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[rgba(255,255,255,0.12)] hover:bg-transparent">
              <TableHead className="text-gray-300">Name</TableHead>
              <TableHead className="text-gray-300">User Type</TableHead>
              <TableHead className="text-gray-300">Location</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Signups</TableHead>
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                  No studies created yet
                </TableCell>
              </TableRow>
            ) : (
              studies.map((study) => (
                <TableRow 
                  key={study.id}
                  className="border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <TableCell className="text-white font-medium">
                    {study.name}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {study.user_type}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {study.location}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={study.status === 'published' ? 'default' : 'secondary'}
                      className={study.status === 'published' 
                        ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                        : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                      }
                    >
                      {study.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {study.signups_count || 0}
                    {study.participant_limit && (
                      <span className="text-gray-500">/{study.participant_limit}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => router.push(`/admin/studies/${study.id}`)}
                        className="text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.1)]"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => router.push(`/admin/studies/${study.id}/signups`)}
                        className="text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.1)]"
                      >
                        Signups
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleStatus(study)}
                        className="text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.1)]"
                      >
                        {study.status === 'published' ? 'Unpublish' : 'Publish'}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(study.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}