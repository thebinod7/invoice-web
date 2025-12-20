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
import { useGetMeQuery } from '@/app/hooks/backend/invoice';
import { GENDER } from '@/app/constants';

export default function ProfileUpdateForm() {
  const { data } = useGetMeQuery();
  const userProfile = data?.data?.result || null;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
    };
    console.log(payload);
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
    <Card className="w-full max-w-md mx-auto">
      <div className="p-4 md:p-12">
        <div className="text-center mb-10">
          <p className="text-muted-foreground text-pretty leading-relaxed">
            Keep your information current and accurate
          </p>
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
              className="h-11"
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
              <SelectTrigger id="gender" className="h-11 w-full">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={GENDER.MALE}>Male</SelectItem>
                <SelectItem value={GENDER.FEMALE}>Female</SelectItem>
                <SelectItem value={GENDER.OTHER}>Other</SelectItem>
                <SelectItem value={GENDER.UNKNOWN}>Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full h-11 mt-8">
            Save Changes
          </Button>
        </form>
      </div>
    </Card>
  );
}
