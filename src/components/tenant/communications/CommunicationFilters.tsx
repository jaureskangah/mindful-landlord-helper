import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/calendar";
import { SearchInput } from "./filters/SearchInput";
import { TypeFilter } from "./filters/TypeFilter";
import { DateFilter } from "./filters/DateFilter";

interface CommunicationFiltersProps {
  searchQuery: string;
  startDate: string;
  selectedType: string | null;
  communicationTypes: string[];
  onSearchChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export const CommunicationFilters = ({
  searchQuery,
  startDate,
  selectedType,
  communicationTypes,
  onSearchChange,
  onDateChange,
  onTypeChange,
}: CommunicationFiltersProps) => {
  console.log("CommunicationFilters - Types:", communicationTypes);
  console.log("CommunicationFilters - Selected type:", selectedType);

  const validTypes = communicationTypes.filter(type => type && type.trim() !== "");

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <SearchInput value={searchQuery} onChange={onSearchChange} />
      <TypeFilter 
        value={selectedType} 
        onChange={onTypeChange}
        types={validTypes}
      />
      <DateFilter value={startDate} onChange={onDateChange} />
    </div>
  );
};