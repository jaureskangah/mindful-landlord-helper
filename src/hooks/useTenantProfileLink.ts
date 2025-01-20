import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import type { Tenant } from "@/types/tenant";
import { useInvitationCheck } from "./tenant/useInvitationCheck";
import { useProfileLookup } from "./tenant/useProfileLookup";
import { useInvitationService } from "./tenant/useInvitationService";
import { useProfileUpdate } from "./tenant/useProfileUpdate";

interface LinkProfileResult {
  success: boolean;
  message: string;
}

export function useTenantProfileLink() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { checkExistingInvitation } = useInvitationCheck();
  const { findTenantProfile } = useProfileLookup();
  const { createInvitation } = useInvitationService();
  const { updateTenantProfile } = useProfileUpdate();

  const linkProfile = async (tenant: Tenant): Promise<LinkProfileResult> => {
    if (isLoading) return { success: false, message: "Operation in progress" };
    
    setIsLoading(true);
    setError("");

    try {
      console.log('Attempting to link tenant profile for:', tenant.email);
      
      const profile = await findTenantProfile(tenant.email);

      if (!profile) {
        console.log('No profile found, sending invitation');
        const hasExistingInvite = await checkExistingInvitation(tenant.email);
        
        if (hasExistingInvite) {
          toast({
            title: "Information",
            description: "An invitation has already been sent to this email. The tenant needs to create their account to complete the linking process.",
          });
          return { 
            success: false, 
            message: "An invitation has already been sent to this email" 
          };
        }

        const invitationResult = await createInvitation(tenant);
        toast({
          title: invitationResult.success ? "Invitation Sent" : "Error",
          description: invitationResult.message,
          variant: invitationResult.success ? "default" : "destructive",
        });
        return invitationResult;
      }

      console.log('Profile found, updating tenant');
      await updateTenantProfile(tenant.id, profile.id);
      
      console.log('Tenant profile linked successfully');
      toast({
        title: "Success",
        description: "Tenant profile has been linked successfully",
      });

      return {
        success: true,
        message: "Tenant profile has been linked successfully"
      };
    } catch (err: any) {
      console.error('Error in linkProfile:', err);
      setError(err.message);
      toast({
        title: "Error",
        description: "An error occurred while linking the profile",
        variant: "destructive",
      });
      return {
        success: false,
        message: "An error occurred while linking the profile"
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    linkProfile,
    isLoading,
    error,
  };
}