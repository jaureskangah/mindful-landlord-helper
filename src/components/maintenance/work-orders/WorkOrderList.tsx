import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WorkOrderCard } from "./WorkOrderCard";
import { WorkOrderFilters } from "./WorkOrderFilters";
import { CreateWorkOrderDialog } from "./CreateWorkOrderDialog";

interface WorkOrder {
  id: number;
  title: string;
  property: string;
  unit: string;
  status: string;
  vendor: string;
  cost: number;
  date?: string;
}

interface WorkOrderListProps {
  workOrders: WorkOrder[];
  propertyId: string;
}

export const WorkOrderList = ({ workOrders, propertyId }: WorkOrderListProps) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "cost">("date");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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
    // Refresh work orders list - this will be handled by the parent component
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Ordres de Travail</h2>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
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
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleCreateSuccess}
        propertyId={propertyId}
      />
    </>
  );
};