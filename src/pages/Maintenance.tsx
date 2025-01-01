import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { MaintenanceMetrics } from "@/components/maintenance/MaintenanceMetrics";
import { PreventiveMaintenance } from "@/components/maintenance/PreventiveMaintenance";
import { WorkOrderList } from "@/components/maintenance/work-orders/WorkOrderList";
import { VendorList } from "@/components/maintenance/vendors/VendorList";
import { PropertyFinancials } from "@/components/maintenance/PropertyFinancials";
import { MaintenanceNotifications } from "@/components/maintenance/MaintenanceNotifications";

// Fetch maintenance requests
const fetchMaintenanceRequests = async () => {
  const { data, error } = await supabase
    .from('maintenance_requests')
    .select('*');
  
  if (error) throw error;
  return data;
};

const Maintenance = () => {
  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['maintenance_requests'],
    queryFn: fetchMaintenanceRequests,
  });

  // Calculate statistics
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const resolvedRequests = requests.filter(r => r.status === 'Resolved').length;
  const urgentRequests = requests.filter(r => r.priority === 'Urgent').length;

  // Mock data for demonstration
  const mockFinancialData = {
    propertyId: "123e4567-e89b-12d3-a456-426614174000",
    rentRoll: [
      { unit: "101", tenant: "John Doe", rent: 1200, status: "Current" },
      { unit: "102", tenant: "Jane Smith", rent: 1300, status: "Current" },
    ],
    expenses: [
      { category: "Utilities", amount: 500, date: "2024-03-01" },
      { category: "Insurance", amount: 300, date: "2024-03-05" },
    ],
    maintenance: [
      { description: "Plumbing repair", cost: 250, date: "2024-03-02" },
      { description: "HVAC maintenance", cost: 400, date: "2024-03-10" },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Maintenance Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <MaintenanceMetrics
            totalRequests={totalRequests}
            pendingRequests={pendingRequests}
            resolvedRequests={resolvedRequests}
            urgentRequests={urgentRequests}
          />
        </div>
        <div className="lg:col-span-1">
          <MaintenanceNotifications />
        </div>
      </div>

      <Tabs defaultValue="preventive" className="space-y-4">
        <TabsList>
          <TabsTrigger value="preventive">Preventive Maintenance</TabsTrigger>
          <TabsTrigger value="work-orders">Work Orders</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="financials">Costs</TabsTrigger>
        </TabsList>

        <TabsContent value="preventive">
          <PreventiveMaintenance />
        </TabsContent>

        <TabsContent value="work-orders">
          <WorkOrderList 
            propertyId={mockFinancialData.propertyId}
          />
        </TabsContent>

        <TabsContent value="vendors">
          <VendorList />
        </TabsContent>

        <TabsContent value="financials">
          <PropertyFinancials {...mockFinancialData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Maintenance;