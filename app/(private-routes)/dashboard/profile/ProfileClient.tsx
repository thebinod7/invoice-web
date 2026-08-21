'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { GENDER } from '@/app/constants';
import { useGetMeQuery } from '@/app/hooks/backend/user.hook';
import { useMutation } from '@tanstack/react-query';
import { patchRequest } from '@/app/helpers/request';
import { API_ROUTES } from '@/app/constants/api-routes';
import { sanitizeError } from '@/app/helpers';
import { toast } from 'sonner';
import { Info } from 'lucide-react';

export default function ProfileClient() {
  const { data } = useGetMeQuery();
  const userProfile = data?.data?.result || null;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
  });

  const updateProfileMutation = useMutation({
    mutationFn: (payload: any) => {
      return patchRequest(`${API_ROUTES.USERS}/me`, payload);
    },
    onError: (error) => {
      toast.error(sanitizeError(error));
    },
    onSuccess: () => {
      toast.success('Profile updated successfully!');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
    };
    return updateProfileMutation.mutate(payload);
  };

  useEffect(() => {
    if (userProfile) {
      setFormData({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        email: userProfile.email || '',
        gender: userProfile.gender || '',
      });
    }
  }, [data]);

  const initials =
    `${formData.firstName?.[0] ?? ''}${formData.lastName?.[0] ?? ''}`.toUpperCase() ||
    'U';

  return (
    <div className="flex justify-center px-4 py-6 md:py-12">
      <Card className="w-full md:w-[640px] overflow-hidden py-0">
        <div className="bg-muted/40 border-b px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
              {initials}
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                {formData.firstName || formData.lastName
                  ? `${formData.firstName} ${formData.lastName}`.trim()
                  : 'Your Profile'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {formData.email || 'Manage your personal information'}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <div className="mb-6 flex items-start gap-2 rounded-lg bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <p>Keep your information current and accurate.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                disabled={true}
                id="email"
                type="email"
                placeholder="your.email@example.com"
                defaultValue={formData.email}
                className="h-11 disabled:opacity-70"
              />
              <p className="text-xs text-muted-foreground">
                Your email address cannot be changed.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-medium">
                Gender
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
                required
              >
                <SelectTrigger id="gender" className="h-11 w-full">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent defaultValue={formData.gender}>
                  <SelectItem value={GENDER.MALE}>Male</SelectItem>
                  <SelectItem value={GENDER.FEMALE}>Female</SelectItem>
                  <SelectItem value={GENDER.OTHER}>Other</SelectItem>
                  <SelectItem value={GENDER.UNKNOWN}>Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button
                disabled={updateProfileMutation.isPending}
                type="submit"
                className="h-11 w-full sm:w-auto sm:min-w-[160px]"
              >
                {updateProfileMutation.isPending
                  ? 'Updating...'
                  : 'Update Profile'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
