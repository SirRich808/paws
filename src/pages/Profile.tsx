
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCustomer } from "../contexts/CustomerContext";
import { toast } from "sonner";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookingHistory } from "@/components/BookingHistory";
import { Calendar, LogOut, User, MapPin, Phone, Mail } from "lucide-react";

const Profile = () => {
  const { authState, logout, updateProfile } = useCustomer();
  const navigate = useNavigate();
  
  const [name, setName] = useState(authState.customer?.name || "");
  const [email, setEmail] = useState(authState.customer?.email || "");
  const [address, setAddress] = useState(authState.customer?.address || "");
  const [phone, setPhone] = useState(authState.customer?.phone || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      navigate("/login");
    }
  }, [authState.isLoading, authState.isAuthenticated, navigate]);

  // Update form when customer data changes
  useEffect(() => {
    if (authState.customer) {
      setName(authState.customer.name || "");
      setEmail(authState.customer.email || "");
      setAddress(authState.customer.address || "");
      setPhone(authState.customer.phone || "");
    }
  }, [authState.customer]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateProfile({
        name,
        email,
        address,
        phone
      });
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock bookings data - in a real app, this would come from an API
  const mockBookings = [
    {
      id: "booking_1",
      service: "Weekly Service - 1 Dog",
      date: "2025-05-15",
      time: "10:00 AM",
      status: "upcoming"
    },
    {
      id: "booking_2",
      service: "Weekly Service - 1 Dog",
      date: "2025-05-08",
      time: "10:00 AM",
      status: "completed"
    },
    {
      id: "booking_3",
      service: "Weekly Service - 1 Dog",
      date: "2025-05-01",
      time: "10:00 AM",
      status: "completed"
    }
  ];

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Profile sidebar */}
            <div className="lg:col-span-3">
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
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> Logout
                </Button>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-9">
              <Tabs defaultValue="bookings" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="bookings" className="text-base">
                    <Calendar className="h-4 w-4 mr-2" /> Bookings
                  </TabsTrigger>
                  <TabsTrigger value="subscription" className="text-base">
                    <Calendar className="h-4 w-4 mr-2" /> My Subscription
                  </TabsTrigger>
                  <TabsTrigger value="account" className="text-base">
                    <User className="h-4 w-4 mr-2" /> Account Settings
                  </TabsTrigger>
                </TabsList>

                {/* Bookings Tab */}
                <TabsContent value="bookings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Service History</CardTitle>
                      <CardDescription>
                        View your past and upcoming service appointments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <BookingHistory bookings={mockBookings} />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Subscription Tab */}
                <TabsContent value="subscription">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Subscription</CardTitle>
                      <CardDescription>
                        Manage your current service subscription
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="rounded-md border p-6 bg-green-50 border-green-200">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">Weekly Service - 1 Dog</h3>
                            <p className="text-sm text-muted-foreground">Billed weekly</p>
                          </div>
                          <span className="text-lg font-semibold">$19.99/week</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Next service date:</span>
                            <span>May 15, 2025</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Service address:</span>
                            <span>{address || "Not specified"}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Active since:</span>
                            <span>May 1, 2025</span>
                          </div>
                        </div>
                        <div className="mt-6 flex gap-4">
                          <Button variant="outline" size="sm">
                            Change plan
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                            Cancel subscription
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid gap-4">
                        <div className="flex justify-between items-center border-b pb-4">
                          <h4 className="font-medium">Payment Method</h4>
                          <Button variant="outline" size="sm">Update</Button>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-16 rounded border flex items-center justify-center bg-white">
                            <span className="font-medium">VISA</span>
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/28</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Account Settings Tab */}
                <TabsContent value="account">
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
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
