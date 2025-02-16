export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  property_id: string | null;
  properties?: {
    name: string;
  };
  unit_number: string;
  lease_start: string;
  lease_end: string;
  rent_amount: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  tenant_profile_id: string | null;
  documents: TenantDocument[];
  paymentHistory: TenantPayment[];
  maintenanceRequests: MaintenanceRequest[];
  communications: Communication[];
}

export interface TenantDocument {
  id: string;
  name: string;
  file_url?: string;
  created_at: string;
}

export interface TenantPayment {
  id: string;
  amount: number;
  status: string;
  payment_date: string;
  created_at: string;
}

export interface MaintenanceRequest {
  id: string;
  issue: string;
  status: string;
  created_at: string;
  tenant_notified?: boolean;
}

export interface Communication {
  id: string;
  type: string;
  subject: string;
  content?: string;
  created_at: string;
  status: string;
  category: string;
  attachments?: string[];
  parent_id?: string;
  is_from_tenant?: boolean;
  resolved_at?: string;
  tenant_notified?: boolean;
  tenant_id?: string;
}