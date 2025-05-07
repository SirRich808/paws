
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SubscriptionTabProps {
  address: string;
}

const SubscriptionTab = ({ address }: SubscriptionTabProps) => {
  return (
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
  );
};

export default SubscriptionTab;
