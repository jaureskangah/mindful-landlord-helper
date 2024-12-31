import React, { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import PropertyFinancials from "@/components/PropertyFinancials";
import { AddPropertyModal } from "@/components/AddPropertyModal";
import { EditPropertyModal } from "@/components/EditPropertyModal";
import { useToast } from "@/components/ui/use-toast";
import { useProperties, Property } from "@/hooks/useProperties";
import { Loader2, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const PROPERTY_TYPES = [
  "All",
  "Apartment",
  "House",
  "Studio",
  "Condo",
  "Office",
  "Commercial Space"
] as const;

const Properties = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { properties, isLoadingProperties } = useProperties();
  const { toast } = useToast();

  const handleEdit = (id: string) => {
    const property = properties.find(p => p.id === id);
    if (property) {
      setEditingProperty(property);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", id);

      if (error) throw error;

      if (selectedPropertyId === id) {
        setSelectedPropertyId(null);
      }

      toast({
        title: "Property deleted",
        description: "The property has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting property:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to delete the property.",
      });
    }
  };

  const handleViewFinancials = (id: string) => {
    console.log("View financials for property:", id);
    setSelectedPropertyId(id);
  };

  const filteredProperties = properties
    .filter(property => selectedType === "All" || property.type === selectedType)
    .filter(property => 
      searchQuery === "" || 
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  // Mock financial data
  const mockFinancials = {
    rentRoll: [
      { unit: "1A", tenant: "John Doe", rent: 1200, status: "Active" },
      { unit: "1B", tenant: "Jane Smith", rent: 1300, status: "Active" },
      { unit: "2A", tenant: "", rent: 1100, status: "Vacant" }
    ],
    expenses: [
      { category: "Maintenance", amount: 500, date: "2024-01-15" },
      { category: "Utilities", amount: 300, date: "2024-01-20" },
      { category: "Insurance", amount: 800, date: "2024-01-01" }
    ],
    maintenance: [
      { description: "Plumbing repair", cost: 300, date: "2024-01-10" },
      { description: "HVAC maintenance", cost: 200, date: "2024-01-05" },
      { description: "Paint touch-up", cost: 150, date: "2024-01-18" }
    ]
  };

  if (isLoadingProperties) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Properties Management</h1>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-64">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <AddPropertyModal />
        </div>
      </div>
      
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {properties.length === 0 
              ? "Start by adding your first property!"
              : "No properties match the selected filters."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewFinancials={handleViewFinancials}
            />
          ))}
        </div>
      )}

      {selectedPropertyId && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Financial Overview - {selectedProperty?.name}
          </h2>
          <PropertyFinancials
            propertyId={selectedPropertyId}
            rentRoll={mockFinancials.rentRoll}
            expenses={mockFinancials.expenses}
            maintenance={mockFinancials.maintenance}
          />
        </div>
      )}

      {editingProperty && (
        <EditPropertyModal
          property={editingProperty}
          isOpen={true}
          onClose={() => setEditingProperty(null)}
        />
      )}
    </div>
  );
};

export default Properties;