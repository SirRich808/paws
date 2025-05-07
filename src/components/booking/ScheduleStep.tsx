
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "@/types/booking";

interface ScheduleStepProps {
  form: UseFormReturn<BookingFormValues>;
  timeSlots: string[];
  today: string;
}

const ScheduleStep: React.FC<ScheduleStepProps> = ({ form, timeSlots, today }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="serviceDate"
          rules={{ required: "Please select a service date" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Date</FormLabel>
              <FormControl>
                <Input 
                  type="date" 
                  min={today}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="serviceTime"
          rules={{ required: "Please select a service time" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Time</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="numDogs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Dogs</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of dogs" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1 Dog</SelectItem>
                  <SelectItem value="2">2 Dogs</SelectItem>
                  <SelectItem value="3">3 Dogs</SelectItem>
                  <SelectItem value="4">4 Dogs</SelectItem>
                  <SelectItem value="5">5+ Dogs</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="servicePlan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Plan</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service plan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="weekly">Weekly Service - $19.99/week</SelectItem>
                  <SelectItem value="biweekly">Bi-Weekly Service - $24.99/visit</SelectItem>
                  <SelectItem value="monthly">Monthly Service - $29.99/visit</SelectItem>
                  <SelectItem value="onetime">One-Time Cleanup - $34.99</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="specialInstructions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Instructions (Optional)</FormLabel>
            <FormControl>
              <textarea
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Gate code, dog breed info, yard specifics, etc."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ScheduleStep;
