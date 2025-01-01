import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WorkOrderCard } from "./WorkOrderCard";
import { WorkOrderFilters } from "./WorkOrderFilters";
import { CreateWorkOrderDialog } from "./CreateWorkOrderDialog";
import { useToast } from "@/hooks/use-toast";

interface WorkOrder {
  id: string; // Changed to string for UUID
  title: string;
  property: string;
  unit: string;
  status: string;
  vendor: string; // This is now a UUID string
  cost: number;
  date?: string;
}

interface WorkOrderListProps {
  workOrders: WorkOrder[];
  propertyId: string; // This is now a UUID string
  onWorkOrderCreated?: () => void;
}

export const WorkOrderList = ({ workOrders, propertyId, onWorkOrderCreated }: WorkOrderListProps) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "cost">("date");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  // Filter and sort work orders
  const filteredAndSortedOrders = useMemo(() => {
    return workOrders
      .filter((order) => {
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        const matchesSearch = 
          order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.property.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          return (b.date || "").localeCompare(a.date || "");
        } else {
          return b.cost - a.cost;
        }
      });
  }, [workOrders, statusFilter, searchQuery, sortBy]);

  const handleCreateSuccess = () => {
    console.log("Work order created successfully");
    toast({
      title: "Ordre de travail créé",
      description: "L'ordre de travail a été créé avec succès",
    });
    setIsCreateDialogOpen(false);
    if (onWorkOrderCreated) {
      onWorkOrderCreated();
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Ordres de Travail</h2>
        <Button 
          onClick={() => {
            console.log("Opening create dialog");
            setIsCreateDialogOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Créer un Ordre
        </Button>
      </div>

      <WorkOrderFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedOrders.map((order) => (
          <WorkOrderCard key={order.id} order={order} />
        ))}
      </div>

      <CreateWorkOrderDialog
        isOpen={isCreateDialogOpen}
        onClose={() => {
          console.log("Closing create dialog");
          setIsCreateDialogOpen(false);
        }}
        onSuccess={handleCreateSuccess}
        propertyId={propertyId}
      />
    </>
  );
};