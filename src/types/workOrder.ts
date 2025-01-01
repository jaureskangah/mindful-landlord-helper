export interface WorkOrder {
  id: string;
  title: string;
  property: string;
  unit: string;
  status: string;
  vendor: string;
  cost: number;
  date?: string;
}