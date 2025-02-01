import { useState } from "react";
import { Communication } from "@/types/tenant";
import { CardContent } from "@/components/ui/card";
import { CommunicationFilters } from "./CommunicationFilters";
import { CommunicationsList } from "./CommunicationsList";
import { useCommunicationsData } from "@/hooks/communications/useCommunicationsData";
import { useCommunicationActions } from "@/hooks/communications/useCommunicationActions";
import { CommunicationDetailsDialog } from "./CommunicationDetailsDialog";

interface CommunicationsContentProps {
  communications: Communication[];
  onToggleStatus: (comm: Communication) => void;
  onCommunicationSelect: (comm: Communication | null) => void;
  onCommunicationUpdate?: () => void;
}

export const CommunicationsContent = ({
  communications,
  onToggleStatus,
  onCommunicationSelect,
  onCommunicationUpdate
}: CommunicationsContentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [selectedComm, setSelectedComm] = useState<Communication | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { handleDeleteCommunication } = useCommunicationActions();

  const {
    groupedCommunications,
    communicationTypes,
    filteredCommunications
  } = useCommunicationsData(
    communications, 
    searchQuery, 
    selectedType, 
    startDate ? new Date(startDate) : null
  );

  const handleDelete = async (comm: Communication) => {
    const success = await handleDeleteCommunication(comm.id);
    if (success) {
      onCommunicationUpdate?.();
    }
  };

  const handleCommunicationClick = (comm: Communication) => {
    console.log("Communication clicked:", comm);
    setSelectedComm(comm);
    setIsDialogOpen(true);
    onCommunicationSelect(comm);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedComm(null);
    onCommunicationSelect(null);
  };

  console.log("CommunicationsContent render:", {
    totalCommunications: communications.length,
    filteredCount: filteredCommunications.length,
    selectedType,
    startDate,
    selectedComm: selectedComm?.id,
    isDialogOpen
  });

  return (
    <CardContent>
      <div className="space-y-4">
        <CommunicationFilters
          searchQuery={searchQuery}
          startDate={startDate}
          selectedType={selectedType}
          communicationTypes={communicationTypes}
          onSearchChange={setSearchQuery}
          onDateChange={setStartDate}
          onTypeChange={setSelectedType}
        />

        <CommunicationsList
          filteredCommunications={filteredCommunications}
          groupedCommunications={groupedCommunications}
          onCommunicationClick={handleCommunicationClick}
          onToggleStatus={onToggleStatus}
          onDeleteCommunication={handleDelete}
        />

        <CommunicationDetailsDialog
          communication={selectedComm}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
        />
      </div>
    </CardContent>
  );
};