
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/context/DataContext";
import { PlaintiffSelector } from "@/components/cases/PlaintiffSelector";
import { User } from "@/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FileCasePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { createCase } = useData();
  const [selectedPlaintiff, setSelectedPlaintiff] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("details");

  const formSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters" }),
    type: z.string().min(1, { message: "Please select a case type" }),
    description: z.string().min(20, { message: "Description must be at least 20 characters" }),
    court: z.string().min(1, { message: "Please select a court" }),
    defendantName: z.string().min(2, { message: "Defendant name is required" }),
    defendantContact: z.string().optional(),
    defendantIdType: z.string().min(1, { message: "ID type is required" }),
    defendantIdNumber: z.string().min(1, { message: "ID number is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
      description: "",
      court: "",
      defendantName: "",
      defendantContact: "",
      defendantIdType: "",
      defendantIdNumber: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedPlaintiff) {
      toast({
        title: "Error",
        description: "Please select a plaintiff for this case",
        variant: "destructive",
      });
      return;
    }

    const newCase = {
      id: `case_${Date.now()}`,
      title: values.title,
      description: values.description,
      clientId: selectedPlaintiff.id,
      lawyerId: user?.id,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: values.type,
      filedDate: new Date().toISOString().split('T')[0],
      courtRoom: values.court,
      defendantInfo: {
        name: values.defendantName,
        contactNumber: values.defendantContact || "",
        idType: values.defendantIdType,
        idNumber: values.defendantIdNumber,
      },
    };

    createCase(newCase);

    toast({
      title: "Case Filed Successfully",
      description: "The new case has been filed and is pending review",
    });

    navigate("/cases");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">File a New Case</h1>
        <p className="text-muted-foreground">Submit details to file a new court case</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Case Filing Form</CardTitle>
          <CardDescription>
            Please provide complete and accurate information for this legal filing
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="plaintiff">Plaintiff</TabsTrigger>
              <TabsTrigger value="details">Case Details</TabsTrigger>
              <TabsTrigger value="defendant">Defendant</TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <TabsContent value="plaintiff" className="mt-6 space-y-4">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Select the plaintiff (person filing the case) from your client list or add a new client.
                    </p>
                    
                    <PlaintiffSelector 
                      value={selectedPlaintiff}
                      onChange={setSelectedPlaintiff}
                    />

                    {selectedPlaintiff && (
                      <div className="mt-4 space-y-2">
                        <h3 className="text-sm font-medium">Plaintiff Details</h3>
                        <div className="grid grid-cols-2 gap-4 border rounded-md p-4 bg-muted/20">
                          <div>
                            <p className="text-xs text-muted-foreground">Full Name</p>
                            <p className="font-medium">{selectedPlaintiff.name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Email</p>
                            <p className="font-medium">{selectedPlaintiff.email}</p>
                          </div>
                          {selectedPlaintiff.phone && (
                            <div>
                              <p className="text-xs text-muted-foreground">Phone</p>
                              <p className="font-medium">{selectedPlaintiff.phone}</p>
                            </div>
                          )}
                          {selectedPlaintiff.address && (
                            <div>
                              <p className="text-xs text-muted-foreground">Address</p>
                              <p className="font-medium">{selectedPlaintiff.address}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <Button type="button" onClick={() => setActiveTab("details")}>
                        Next: Case Details
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="mt-6 space-y-4">
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Case Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Smith vs. Jones" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter a clear and concise title for the case
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Case Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select case type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="civil">Civil</SelectItem>
                              <SelectItem value="criminal">Criminal</SelectItem>
                              <SelectItem value="family">Family</SelectItem>
                              <SelectItem value="corporate">Corporate</SelectItem>
                              <SelectItem value="real_estate">Real Estate</SelectItem>
                              <SelectItem value="bankruptcy">Bankruptcy</SelectItem>
                              <SelectItem value="tax">Tax</SelectItem>
                              <SelectItem value="immigration">Immigration</SelectItem>
                              <SelectItem value="intellectual_property">Intellectual Property</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the appropriate legal category for this case
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Case Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide a detailed description of the case..."
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Include all relevant facts and circumstances
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="court"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Court</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select court" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="district_court">District Court</SelectItem>
                              <SelectItem value="high_court">High Court</SelectItem>
                              <SelectItem value="supreme_court">Supreme Court</SelectItem>
                              <SelectItem value="family_court">Family Court</SelectItem>
                              <SelectItem value="tax_court">Tax Court</SelectItem>
                              <SelectItem value="bankruptcy_court">Bankruptcy Court</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the court where the case will be filed
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("plaintiff")}>
                      Back: Plaintiff
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("defendant")}>
                      Next: Defendant
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="defendant" className="mt-6 space-y-4">
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="defendantName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Defendant Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name of the defendant" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="defendantContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Defendant Contact Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="defendantIdType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ID Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select ID type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="passport">Passport</SelectItem>
                                <SelectItem value="driver_license">Driver's License</SelectItem>
                                <SelectItem value="national_id">National ID</SelectItem>
                                <SelectItem value="ssn">Social Security Number</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="defendantIdNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ID Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter ID number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                      Back: Case Details
                    </Button>
                    <Button type="submit">Submit Case Filing</Button>
                  </div>
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileCasePage;
