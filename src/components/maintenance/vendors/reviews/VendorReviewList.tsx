import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { VendorReview } from "@/types/vendor";
import { VendorReviewDialog } from "./VendorReviewDialog";
import { useState } from "react";

interface VendorReviewListProps {
  reviews: VendorReview[];
  onEdit: (review: VendorReview) => void;
  onRefresh: () => void;
}

export const VendorReviewList = ({ reviews, onRefresh }: VendorReviewListProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [editingReview, setEditingReview] = useState<VendorReview | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  const handleDelete = async (review: VendorReview) => {
    try {
      const { error } = await supabase
        .from('vendor_reviews')
        .delete()
        .eq('id', review.id);

      if (error) throw error;

      toast({
        title: "Review deleted",
        description: "The review has been deleted successfully.",
      });
      
      onRefresh();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the review.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (review: VendorReview) => {
    setEditingReview(review);
    setReviewDialogOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  {review.rating}/5
                </CardTitle>
                <span className="text-sm text-gray-500">
                  {format(new Date(review.created_at), "MMMM d, yyyy", { locale: enUS })}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="font-medium">Quality</p>
                    <p>{review.quality_rating}/5</p>
                  </div>
                  <div>
                    <p className="font-medium">Price</p>
                    <p>{review.price_rating}/5</p>
                  </div>
                  <div>
                    <p className="font-medium">Punctuality</p>
                    <p>{review.punctuality_rating}/5</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
                {user?.id === review.user_id && (
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(review)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(review)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingReview && (
        <VendorReviewDialog
          open={reviewDialogOpen}
          onOpenChange={setReviewDialogOpen}
          vendorId={editingReview.vendor_id}
          initialData={editingReview}
          onSuccess={() => {
            setReviewDialogOpen(false);
            setEditingReview(null);
            onRefresh();
          }}
        />
      )}
    </>
  );
};