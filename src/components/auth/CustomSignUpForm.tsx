
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import LawyerSignUpFields from "./LawyerSignUpFields";
import { ClientSignUpFields } from "./ClientSignUpFields";
import { UserRole } from "@/types";
import { RoleIcon } from "../common/RoleIcon";

// Form schema validation
const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }).optional(),
  address: z.string().min(5, { message: "Please enter your address" }).optional(),
  governmentId: z.object({
    type: z.string().min(1, { message: "Please select an ID type" }),
    number: z.string().min(4, { message: "Please enter your ID number" })
  }).optional(),
  // Lawyer specific fields
  specialization: z.string().optional(),
  barId: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  // Judge specific fields
  chamberNumber: z.string().optional(),
  courtDistrict: z.string().optional(),
  yearsOnBench: z.string().optional(),
  // Clerk specific fields
  courtId: z.string().optional(),
  department: z.string().optional()
});

type FormValues = z.infer<typeof signUpSchema>;

type SignUpFormProps = {
  defaultRole: UserRole;
};

export const CustomSignUpForm = ({ defaultRole }: SignUpFormProps) => {
  const { signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      governmentId: {
        type: "", 
        number: ""
      }
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      const { error } = await signup(data.email, data.password, {
        name: data.name,
        role: defaultRole,
        phone: data.phone,
        address: data.address,
        governmentId: data.governmentId || { type: "", number: "" },
        // Role specific fields
        specialization: data.specialization,
        barId: data.barId,
        yearsOfExperience: data.yearsOfExperience,
        chamberNumber: data.chamberNumber,
        courtDistrict: data.courtDistrict,
        yearsOnBench: data.yearsOnBench,
        courtId: data.courtId,
        department: data.department
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <RoleIcon role={defaultRole} showDropdown={true} />
        </div>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Create your {defaultRole} account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Create a password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Role-specific fields */}
            {defaultRole === 'client' && <ClientSignUpFields form={form} />}
            {defaultRole === 'lawyer' && <LawyerSignUpFields form={form} />}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" className="p-0 h-auto" onClick={() => navigate(`/login/${defaultRole}`)}>
            Sign in
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
