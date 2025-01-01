import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { UseFormReturn } from "react-hook-form";

interface RatingFieldsProps {
  form: UseFormReturn<any>;
}

export const RatingFields = ({ form }: RatingFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="qualityRating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Work Quality</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="w-48"
                />
                <span className="w-8 text-center">{field.value}/5</span>
              </div>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="priceRating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Value for Money</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="w-48"
                />
                <span className="w-8 text-center">{field.value}/5</span>
              </div>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="punctualityRating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Punctuality</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="w-48"
                />
                <span className="w-8 text-center">{field.value}/5</span>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};