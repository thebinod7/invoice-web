'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function EmailDrawer() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('FormData', formData);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size={'sm'} variant="default">
          Send
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Send Invoice by Email</DrawerTitle>
            <DrawerDescription>
              Your invoice will be sent as a PDF attachment. Client details
              won't be saved.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-sm font-medium">
                  Client Name
                </Label>
                <Input
                  id="clientName"
                  name="clientName"
                  type="text"
                  placeholder="eg: Jon Snow"
                  className="h-10"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientEmail" className="text-sm font-medium">
                  Client Email{' '}
                  <span className="text-xs">(Recipient Email)</span>
                </Label>
                <Input
                  id="clientEmail"
                  name="clientEmail"
                  type="email"
                  placeholder="eg: jon@example.com"
                  className="h-10"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button className="w-full">Submit</Button>
            </form>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
