import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useProperties } from "@/hooks/useProperties";
import type { TenantFormValues } from "../tenantValidation";

interface PropertyFieldsProps {
  form: UseFormReturn<TenantFormValues>;
}

export function PropertyFields({ form }: PropertyFieldsProps) {
  const { properties } = useProperties();

  // Ensure we only work with valid properties that have both id and name
  const validProperties = (properties ?? []).filter(property => 
    property && 
    typeof property.id === 'string' && 
    property.id.trim() !== '' &&
    typeof property.name === 'string' &&
    property.name.trim() !== ''
  );

  console.log("Valid properties:", validProperties);
  console.log("Current property_id value:", form.watch("property_id"));

  return (
    <>
      <FormField
        control={form.control}
        name="property_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property *</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value || undefined}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a property" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {validProperties.map((property) => (
                  <SelectItem 
                    key={property.id} 
                    value={property.id}
                  >
                    {property.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="unit_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Unit Number</FormLabel>
            <FormControl>
              <Input placeholder="A1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}