
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, MapPin, Phone, Mail } from "lucide-react";

interface ProfileSidebarProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  onLogout: () => void;
}

const ProfileSidebar = ({ name, email, phone, address, onLogout }: ProfileSidebarProps) => {
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="rounded-lg border bg-card shadow-sm p-6 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24 border-2 border-primary">
          <AvatarFallback className="text-2xl bg-lava text-white">
            {getInitials(name || email.split('@')[0])}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-xl font-semibold">{name || email.split('@')[0]}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm">
          <Mail size={16} />
          <span>{email}</span>
        </div>
        {phone && (
          <div className="flex items-center space-x-2 text-sm">
            <Phone size={16} />
            <span>{phone}</span>
          </div>
        )}
        {address && (
          <div className="flex items-center space-x-2 text-sm">
            <MapPin size={16} />
            <span>{address}</span>
          </div>
        )}
      </div>

      <Button
        variant="outline" 
        className="w-full flex items-center gap-2" 
        onClick={onLogout}
      >
        <LogOut size={16} /> Logout
      </Button>
    </div>
  );
};

export default ProfileSidebar;
