
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AccountSettingsTabProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  isEditing: boolean;
  isSubmitting: boolean;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setAddress: (address: string) => void;
  setIsEditing: (isEditing: boolean) => void;
  handleUpdateProfile: (e: React.FormEvent) => void;
}

const AccountSettingsTab = ({
  name,
  email,
  phone,
  address,
  isEditing,
  isSubmitting,
  setName,
  setEmail,
  setPhone,
  setAddress,
  setIsEditing,
  handleUpdateProfile
}: AccountSettingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Update your account information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Service Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-lava hover:bg-ember"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button 
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-lava hover:bg-ember"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AccountSettingsTab;
