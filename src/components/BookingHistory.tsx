
import React from "react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle } from "lucide-react";

interface Booking {
  id: string;
  service: string;
  date: string; // ISO format date
  time: string; // e.g., "10:00 AM"
  status: "upcoming" | "completed" | "canceled";
}

interface BookingHistoryProps {
  bookings: Booking[];
}

export function BookingHistory({ bookings }: BookingHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "text-blue-700 bg-blue-100 hover:bg-blue-100";
      case "completed":
        return "text-green-700 bg-green-100 hover:bg-green-100";
      case "canceled":
        return "text-red-700 bg-red-100 hover:bg-red-100";
      default:
        return "text-gray-700 bg-gray-100 hover:bg-gray-100";
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), "MMMM d, yyyy");
    } catch (error) {
      return dateStr;
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No bookings found</p>
        <Button className="mt-4 bg-lava hover:bg-ember">Book a Service</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <div 
          key={booking.id}
          className="border rounded-lg p-5 hover:shadow-md transition duration-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-lg">{booking.service}</h4>
              <div className="flex items-center mt-2 text-sm text-muted-foreground gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(booking.date)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {booking.time}
                </div>
              </div>
            </div>
            <Badge className={getStatusColor(booking.status)} variant="outline">
              {booking.status === "upcoming" && "Upcoming"}
              {booking.status === "completed" && (
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Completed
                </span>
              )}
              {booking.status === "canceled" && "Canceled"}
            </Badge>
          </div>

          {booking.status === "upcoming" && (
            <div className="mt-4 flex gap-3">
              <Button variant="outline" size="sm">
                Reschedule
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                Cancel
              </Button>
            </div>
          )}
        </div>
      ))}

      <div className="pt-4 border-t">
        <Button className="bg-lava hover:bg-ember">Schedule New Pickup</Button>
      </div>
    </div>
  );
}
