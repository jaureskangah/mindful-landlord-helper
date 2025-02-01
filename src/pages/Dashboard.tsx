import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { UnreadMessagesDialog } from "@/components/dashboard/UnreadMessagesDialog";
import { useNavigate } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import type { DateRange } from "@/components/dashboard/DashboardDateFilter";

const Dashboard = () => {
  console.log("Rendering Dashboard");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState<any[]>([]);
  const [hasShownDialog, setHasShownDialog] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: messagesData } = useQuery({
    queryKey: ["unread_messages", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tenant_communications")
        .select(`
          *,
          tenants (
            id,
            name,
            unit_number
          )
        `)
        .eq("status", "unread")
        .eq("is_from_tenant", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      console.log("Unread messages:", data);
      return data;
    },
    enabled: !!user && !profileData?.is_tenant_user,
  });

  const { data: propertiesData, isLoading: isLoadingProperties } = useQuery({
    queryKey: ["properties", user?.id, dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*, tenants(*)");
      if (error) throw error;
      console.log("Properties data:", data);
      return data;
    },
    enabled: !!user && !profileData?.is_tenant_user,
  });

  const { data: maintenanceData, isLoading: isLoadingMaintenance } = useQuery({
    queryKey: ["maintenance_requests", user?.id, dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("maintenance_requests")
        .select("*");
      if (error) throw error;
      console.log("Maintenance data:", data);
      return data;
    },
    enabled: !!user && !profileData?.is_tenant_user,
  });

  const { data: tenantsData, isLoading: isLoadingTenants } = useQuery({
    queryKey: ["tenants", user?.id, dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tenants")
        .select("*");
      if (error) throw error;
      console.log("Tenants data:", data);
      return data;
    },
    enabled: !!user && !profileData?.is_tenant_user,
  });

  useEffect(() => {
    if (messagesData && messagesData.length > 0 && !hasShownDialog) {
      setUnreadMessages(messagesData);
      setShowNewMessageDialog(true);
      setHasShownDialog(true);
    }
  }, [messagesData, hasShownDialog]);

  useEffect(() => {
    if (profileData?.is_tenant_user) {
      navigate("/maintenance");
    }
  }, [profileData, navigate]);

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <>
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex-1 space-y-6 p-8 font-sans">
          <DashboardHeader />
          
          <DashboardContent
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            propertiesData={propertiesData || []}
            maintenanceData={maintenanceData || []}
            tenantsData={tenantsData || []}
          />
        </div>
      </div>

      <UnreadMessagesDialog
        open={showNewMessageDialog}
        onOpenChange={setShowNewMessageDialog}
        unreadMessages={unreadMessages}
      />
    </>
  );
};

export default Dashboard;
