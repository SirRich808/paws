
import React from "react";
import { Badge } from "@/components/ui/badge";
import { format, isAfter, parseISO } from "date-fns";

interface BookingProps {
  id: string;
  service: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface BookingHistoryProps {
  bookings: BookingProps[];
}

export const BookingHistory: React.FC<BookingHistoryProps> = ({ bookings }) => {
  // Format date to display
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMMM d, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  // Sort bookings to show upcoming first, then completed, then cancelled
  const sortedBookings = [...bookings].sort((a, b) => {
    // If one is upcoming and one is not, upcoming comes first
    if (a.status === "upcoming" && b.status !== "upcoming") return -1;
    if (b.status === "upcoming" && a.status !== "upcoming") return 1;

    // If both have same status, sort by date (newest first for upcoming, oldest first for others)
    if (a.status === "upcoming") {
      return parseISO(b.date) > parseISO(a.date) ? 1 : -1;
    } else {
      return parseISO(b.date) > parseISO(a.date) ? -1 : 1;
    }
  });

  return (
    <div className="space-y-4">
      {sortedBookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No bookings found</p>
        </div>
      ) : (
        sortedBookings.map((booking) => (
          <div
            key={booking.id}
            className="flex flex-col md:flex-row justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="space-y-1">
              <h3 className="font-medium">{booking.service}</h3>
              <p className="text-sm text-gray-500">
                {formatDate(booking.date)} at {booking.time}
              </p>
            </div>
            <div className="mt-2 md:mt-0 flex items-center">
              <Badge className={getStatusBadgeClass(booking.status)} variant="outline">
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
