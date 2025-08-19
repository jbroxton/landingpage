'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Study, CreateStudyInput } from '@/services/studies/types';
import { USER_TYPES, LOCATIONS } from '@/services/studies/constants';
import { getClientAuthHeaders } from '@/AdminPortal/client-auth';

export default function EditStudyPage() {
  const router = useRouter();
  const params = useParams();
  const studyId = params?.id as string;
  const isNew = studyId === 'new';

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<CreateStudyInput>({
    name: '',
    description: '',
    user_type: '',
    location: 'Remote',
    status: 'draft',
    participant_limit: undefined,
    calendly_link: '',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/studies/${studyId}`, {
        headers: getClientAuthHeaders(),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Failed to fetch study');
        })
        .then((study: Study) => {
          setFormData({
            name: study.name,
            description: study.description,
            user_type: study.user_type,
            location: study.location,
            status: study.status,
            participant_limit: study.participant_limit || undefined,
            calendly_link: study.calendly_link || '',
            start_date: study.start_date || '',
            end_date: study.end_date || '',
          });
        })
        .catch(error => {
          console.error('Error fetching study:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [studyId, isNew]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const url = isNew 
      ? '/api/admin/studies' 
      : `/api/admin/studies/${studyId}`;
    
    fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: {
        ...getClientAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          router.push('/admin');
        } else {
          throw new Error('Failed to save study');
        }
      })
      .catch(error => {
        console.error('Error saving study:', error);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Loading study...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          {isNew ? 'Create Study' : 'Edit Study'}
        </h1>
        <p className="text-gray-400 mt-1">
          {isNew ? 'Create a new UX research study' : 'Update study details'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[rgba(20,20,25,0.25)] backdrop-blur-md rounded-xl border border-[rgba(255,255,255,0.12)] p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Basic Information</h2>
            
            <div>
              <Label htmlFor="name" className="text-gray-300">Study Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white"
                placeholder="e.g., Product Manager Workflow Study"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white min-h-[120px]"
                placeholder="Describe the study objectives, what participants will do, etc."
                required
              />
            </div>
          </div>

          {/* Target Audience */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Target Audience</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="user_type" className="text-gray-300">User Type</Label>
                <Select
                  value={formData.user_type}
                  onValueChange={(value) => setFormData({ ...formData, user_type: value })}
                >
                  <SelectTrigger className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1D] border-[rgba(255,255,255,0.1)]">
                    {USER_TYPES.map((type) => (
                      <SelectItem key={type} value={type} className="text-white hover:bg-[rgba(255,255,255,0.1)]">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location" className="text-gray-300">Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1D] border-[rgba(255,255,255,0.1)]">
                    {LOCATIONS.map((loc) => (
                      <SelectItem key={loc} value={loc} className="text-white hover:bg-[rgba(255,255,255,0.1)]">
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="participant_limit" className="text-gray-300">Participant Limit (optional)</Label>
                <Input
                  id="participant_limit"
                  type="number"
                  value={formData.participant_limit || ''}
                  onChange={(e) => setFormData({ ...formData, participant_limit: e.target.value ? Number(e.target.value) : undefined })}
                  className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white"
                  placeholder="e.g., 10"
                />
              </div>

              <div>
                <Label htmlFor="status" className="text-gray-300">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'draft' | 'published') => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1D] border-[rgba(255,255,255,0.1)]">
                    <SelectItem value="draft" className="text-white hover:bg-[rgba(255,255,255,0.1)]">Draft</SelectItem>
                    <SelectItem value="published" className="text-white hover:bg-[rgba(255,255,255,0.1)]">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="calendly_link" className="text-gray-300">Calendly Link (optional)</Label>
              <Input
                id="calendly_link"
                value={formData.calendly_link}
                onChange={(e) => setFormData({ ...formData, calendly_link: e.target.value })}
                className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white"
                placeholder="https://calendly.com/your-username/meeting-type"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter only the Calendly URL, not the embed code. Example: https://calendly.com/jbroxton/30min
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start_date" className="text-gray-300">Start Date (optional)</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white"
                />
              </div>

              <div>
                <Label htmlFor="end_date" className="text-gray-300">End Date (optional)</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin')}
            className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isSaving ? 'Saving...' : (isNew ? 'Create Study' : 'Update Study')}
          </Button>
        </div>
      </form>
    </div>
  );
}