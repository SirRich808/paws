import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../contexts/CustomerContext";
import { toast } from "sonner";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingHistory } from "@/components/BookingHistory";
import { Calendar, User } from "lucide-react";
import ProfileSidebar from "@/components/ProfileSidebar";
import SubscriptionTab from "@/components/SubscriptionTab";
import AccountSettingsTab from "@/components/AccountSettingsTab";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BookingData {
  id: string;
  service: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

const Profile = () => {
  const { authState, logout, updateProfile } = useCustomer();
  const navigate = useNavigate();
  
  const [name, setName] = useState(authState.customer?.name || "");
  const [email, setEmail] = useState(authState.customer?.email || "");
  const [address, setAddress] = useState(authState.customer?.address || "");
  const [phone, setPhone] = useState(authState.customer?.phone || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

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

  // Fetch real bookings data
  useEffect(() => {
    const fetchBookings = async () => {
      if (!authState.customer?.id) return;
      
      setIsLoadingBookings(true);
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            id,
            service_date,
            service_time,
            status,
            service_plan_id,
            service_plans(name)
          `)
          .eq('customer_id', authState.customer.id)
          .order('service_date', { ascending: false });
          
        if (error) throw error;
        
        const formattedBookings = data.map(booking => ({
          id: booking.id,
          service: booking.service_plans?.name || 'Pet Waste Service',
          date: booking.service_date,
          time: booking.service_time,
          status: booking.status as "upcoming" | "completed" | "cancelled"
        }));
        
        setBookings(formattedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load booking history");
      } finally {
        setIsLoadingBookings(false);
      }
    };

    if (authState.isAuthenticated) {
      fetchBookings();
    }
  }, [authState.isAuthenticated, authState.customer?.id]);

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
              <ProfileSidebar 
                name={name}
                email={email}
                phone={phone}
                address={address}
                onLogout={handleLogout}
              />
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
                      {isLoadingBookings ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                      ) : bookings.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <p className="mb-4">You don't have any bookings yet</p>
                          <Button onClick={() => navigate("/booking")} className="bg-lava hover:bg-ember">
                            Book a Service
                          </Button>
                        </div>
                      ) : (
                        <BookingHistory bookings={bookings} />
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Subscription Tab */}
                <TabsContent value="subscription">
                  <SubscriptionTab address={address} />
                </TabsContent>

                {/* Account Settings Tab */}
                <TabsContent value="account">
                  <AccountSettingsTab 
                    name={name}
                    email={email}
                    phone={phone}
                    address={address}
                    isEditing={isEditing}
                    isSubmitting={isSubmitting}
                    setName={setName}
                    setEmail={setEmail}
                    setPhone={setPhone}
                    setAddress={setAddress}
                    setIsEditing={setIsEditing}
                    handleUpdateProfile={handleUpdateProfile}
                  />
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
