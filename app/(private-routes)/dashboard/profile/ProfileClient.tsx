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

  return (
    <div className="flex justify-center mt-4 md:mt-8 lg:mt-12">
      <Card className="w-full md:w-[60%]">
        <div className="p-4 md:p-8">
          <div className="hidden lg:block">
            <div className="mb-4 flex items-center text-sm">
              <Info className="w-4 h-4 mr-2" />
              <p className="text-muted-foreground font-semibold">
                Keep your information current and accurate
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="h-10"
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
                className="h-10"
                required
              />
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
                className="h-10"
              />
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
                <SelectTrigger id="gender" className="h-10 w-full">
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

            <Button
              disabled={updateProfileMutation.isPending}
              type="submit"
              className="w-full h-10 mt-8"
            >
              {updateProfileMutation.isPending
                ? 'Updating...'
                : 'Update Profile'}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
