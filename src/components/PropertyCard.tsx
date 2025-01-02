import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Edit, Trash2, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    address: string;
    units: number;
    type: string;
    image?: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onViewFinancials: (id: string) => void;
}

const PropertyCard = ({ property, onEdit, onDelete, onViewFinancials }: PropertyCardProps) => {
  const placeholderImage = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop&q=60";
  
  return (
    <Card className="w-full min-w-[300px] h-full group hover:shadow-lg transition-all duration-300 animate-fade-in">
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
        <img
          src={property.image || placeholderImage}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = placeholderImage;
          }}
        />
      </div>
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold">{property.name}</CardTitle>
            <Badge variant="secondary" className="text-sm">
              {property.type}
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewFinancials(property.id)}
              className="hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              <DollarSign className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(property.id)}
              className="hover:bg-green-100 hover:text-green-600 transition-colors"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(property.id)}
              className="hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription className="mt-2 text-sm break-words line-clamp-2">
          {property.address}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-muted-foreground">Units</p>
            <p className="text-lg font-semibold">{property.units}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-muted-foreground">Type</p>
            <p className="text-lg font-semibold capitalize">{property.type}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;