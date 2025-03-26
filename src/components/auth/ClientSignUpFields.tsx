
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

// Government ID types
const GOV_ID_TYPES = [
  { value: "aadhar", label: "Aadhar Card" },
  { value: "passport", label: "Passport" },
  { value: "pan", label: "PAN Card" },
  { value: "voter", label: "Voter ID" },
  { value: "driving", label: "Driving License" },
];

type ClientSignUpFieldsProps = {
  form: UseFormReturn<any>;
};

export const ClientSignUpFields = ({ form }: ClientSignUpFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="Phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="governmentId.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Government ID Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {GOV_ID_TYPES.map(idType => (
                    <SelectItem key={idType.value} value={idType.value}>
                      {idType.label}
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
          name="governmentId.number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Government ID Number</FormLabel>
              <FormControl>
                <Input placeholder="ID number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input placeholder="Your address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
