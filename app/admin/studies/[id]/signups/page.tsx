'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StudySignup, Study } from '@/services/studies/types';
import { getClientAuthHeaders } from '@/AdminPortal/client-auth';

export default function StudySignupsPage() {
  const params = useParams();
  const router = useRouter();
  const studyId = params?.id as string;
  
  const [study, setStudy] = useState<Study | null>(null);
  const [signups, setSignups] = useState<StudySignup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch study details
    fetch(`/api/admin/studies/${studyId}`, {
      headers: getClientAuthHeaders(),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch study');
      })
      .then(studyData => {
        setStudy(studyData);
      })
      .catch(error => {
        console.error('Error fetching study:', error);
      });

    // Fetch signups
    fetch(`/api/admin/studies/${studyId}/signups`, {
      headers: getClientAuthHeaders(),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch signups');
      })
      .then(signupsData => {
        setSignups(signupsData);
      })
      .catch(error => {
        console.error('Error fetching signups:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [studyId]);

  const exportToCSV = () => {
    const headers = [
      'First Name',
      'Last Name',
      'Email',
      'Role',
      'Company',
      'Company Size',
      'Years Experience',
      'Timezone',
      'Pronouns',
      'Signup Date'
    ];

    const rows = signups.map(signup => [
      signup.first_name,
      signup.last_name,
      signup.email,
      signup.role,
      signup.company_name,
      signup.company_size,
      signup.years_experience,
      signup.timezone,
      signup.pronouns || '',
      new Date(signup.created_at).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${study?.name || 'study'}-signups-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Loading signups...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-gray-400 hover:text-white mb-2 -ml-2"
          >
            ← Back to Studies
          </Button>
          <h1 className="text-3xl font-bold text-white">{study?.name}</h1>
          <p className="text-gray-400 mt-1">
            {signups.length} participants signed up
            {study?.participant_limit && ` / ${study.participant_limit} limit`}
          </p>
        </div>
        {signups.length > 0 && (
          <Button
            onClick={exportToCSV}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Export to CSV
          </Button>
        )}
      </div>

      {/* Signups Table */}
      <div className="bg-[rgba(20,20,25,0.25)] backdrop-blur-md rounded-xl border border-[rgba(255,255,255,0.12)] overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-[rgba(255,255,255,0.12)] hover:bg-transparent">
              <TableHead className="text-gray-300">Name</TableHead>
              <TableHead className="text-gray-300">Email</TableHead>
              <TableHead className="text-gray-300">Role</TableHead>
              <TableHead className="text-gray-300">Company</TableHead>
              <TableHead className="text-gray-300 hidden md:table-cell">Size</TableHead>
              <TableHead className="text-gray-300 hidden md:table-cell">Experience</TableHead>
              <TableHead className="text-gray-300 hidden lg:table-cell">Timezone</TableHead>
              <TableHead className="text-gray-300">Signup Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {signups.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-400 py-8">
                  No signups yet
                </TableCell>
              </TableRow>
            ) : (
              signups.map((signup) => (
                <TableRow 
                  key={signup.id}
                  className="border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <TableCell className="text-white">
                    {signup.first_name} {signup.last_name}
                    {signup.pronouns && (
                      <span className="text-gray-500 text-sm ml-1">({signup.pronouns})</span>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <a href={`mailto:${signup.email}`} className="hover:text-purple-400">
                      {signup.email}
                    </a>
                  </TableCell>
                  <TableCell className="text-gray-300">{signup.role}</TableCell>
                  <TableCell className="text-gray-300">{signup.company_name}</TableCell>
                  <TableCell className="text-gray-300 hidden md:table-cell">{signup.company_size}</TableCell>
                  <TableCell className="text-gray-300 hidden md:table-cell">{signup.years_experience}</TableCell>
                  <TableCell className="text-gray-300 hidden lg:table-cell">{signup.timezone}</TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(signup.created_at).toLocaleDateString()}
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