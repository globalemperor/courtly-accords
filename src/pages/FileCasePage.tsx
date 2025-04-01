
import { useState } from "react";
import { useData } from "@/context/DataContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Trash2, Upload, FilePlus, UserPlus } from "lucide-react";
import { Witness, EvidenceItem } from "@/types";

// Government ID types
const GOV_ID_TYPES = [
  { value: "aadhar", label: "Aadhar Card" },
  { value: "passport", label: "Passport" },
  { value: "pan", label: "PAN Card" },
  { value: "voter", label: "Voter ID" },
  { value: "driving", label: "Driving License" },
];

// Evidence types
const EVIDENCE_TYPES = [
  { value: "document", label: "Document" },
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
  { value: "physical", label: "Physical Evidence" },
];

// Form schema with validation including witnesses and evidence
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  caseType: z.string().min(1, { message: "Please select a case type" }),
  defendant: z.object({
    name: z.string().min(2, { message: "Defendant name is required" }),
    contactNumber: z.string().min(10, { message: "Valid contact number is required" }),
    govIdType: z.string().min(1, { message: "Please select an ID type" }),
    govIdNumber: z.string().min(4, { message: "Government ID number is required" })
  }),
  witnesses: z.array(z.object({
    name: z.string().min(2, { message: "Witness name is required" }),
    contactNumber: z.string().min(10, { message: "Valid contact number is required" }),
    relation: z.string().min(2, { message: "Relationship to the case is required" }),
    statement: z.string().optional()
  })).optional(),
  evidence: z.array(z.object({
    title: z.string().min(2, { message: "Evidence title is required" }),
    description: z.string().optional(),
    type: z.string().min(1, { message: "Evidence type is required" }),
    fileUrl: z.string().optional() // Will be populated when file is uploaded
  })).optional()
});

type FormValues = z.infer<typeof formSchema>;

const FileCasePage = () => {
  const { user } = useAuth();
  const { createCase, getUsersByRole } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File}>({});

  // Get all available lawyers
  const lawyers = getUsersByRole("lawyer");

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      caseType: "",
      defendant: {
        name: "",
        contactNumber: "",
        govIdType: "",
        govIdNumber: ""
      },
      witnesses: [],
      evidence: []
    }
  });

  // Set up field arrays for witnesses and evidence
  const { fields: witnessFields, append: appendWitness, remove: removeWitness } = 
    useFieldArray({ control: form.control, name: "witnesses" });
  
  const { fields: evidenceFields, append: appendEvidence, remove: removeEvidence } = 
    useFieldArray({ control: form.control, name: "evidence" });

  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Store the file in state
      setUploadedFiles(prev => ({
        ...prev,
        [`evidence_${index}`]: file
      }));
      
      // Update the form with the file name
      const currentEvidence = form.getValues("evidence") || [];
      currentEvidence[index] = {
        ...currentEvidence[index],
        fileUrl: file.name
      };
      form.setValue("evidence", currentEvidence);
      
      toast({
        title: "File added",
        description: `${file.name} has been added to your evidence.`,
      });
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to file a case",
        variant: "destructive",
      });
      return;
    }

    try {
      // Format defendant info to include in the case
      const defendantInfo = {
        name: data.defendant.name,
        contactNumber: data.defendant.contactNumber,
        idType: data.defendant.govIdType,
        idNumber: data.defendant.govIdNumber
      };

      // Create properly typed witnesses and evidence arrays
      const witnesses: Witness[] = (data.witnesses || []).map(w => ({
        name: w.name,
        contactNumber: w.contactNumber,
        relation: w.relation,
        statement: w.statement || ''
      }));

      const evidence: EvidenceItem[] = (data.evidence || []).map(e => ({
        title: e.title,
        type: e.type,
        description: e.description || '',
        fileUrl: e.fileUrl || ''
      }));

      // Create the case with the additional witness and evidence data
      const newCase = await createCase({
        title: data.title,
        description: data.description,
        caseNumber: `CV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        status: "pending",
        clientId: user.id,
        filedDate: new Date().toISOString(),
        defendantInfo,
        witnesses,
        evidence
      });

      toast({
        title: "Case filed successfully",
        description: `Your case has been filed with case number ${newCase.caseNumber}`,
      });

      navigate("/cases");
    } catch (error) {
      console.error("Error filing case:", error);
      toast({
        title: "Error filing case",
        description: "There was a problem filing your case. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">File a New Case</h1>
        <p className="text-muted-foreground">
          Complete the form below to file a new case with the court
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
              <CardDescription>
                Provide the details about your case
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Property Dispute at 123 Main Street" {...field} />
                    </FormControl>
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
                        placeholder="Provide a detailed description of your case..." 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="caseType"
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
                        <SelectItem value="property">Property</SelectItem>
                        <SelectItem value="employment">Employment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Defendant Information</CardTitle>
              <CardDescription>
                Information about the opposing party
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="defendant.name"
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
                name="defendant.contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Defendant's contact number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="defendant.govIdType"
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
                  name="defendant.govIdNumber"
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
            </CardContent>
          </Card>

          {/* New Witnesses Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Witnesses</CardTitle>
                <CardDescription>
                  Add information about witnesses to support your case
                </CardDescription>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => appendWitness({ 
                  name: "", 
                  contactNumber: "", 
                  relation: "",
                  statement: "" 
                })}
                className="flex items-center gap-1"
              >
                <UserPlus className="h-4 w-4" /> Add Witness
              </Button>
            </CardHeader>
            <CardContent>
              {witnessFields.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No witnesses added yet. Click the button above to add witnesses.
                </div>
              ) : (
                <div className="space-y-6">
                  {witnessFields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-4 space-y-4 relative">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeWitness(index)}
                        className="absolute top-2 right-2 h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <div className="font-medium text-lg">Witness {index + 1}</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`witnesses.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Witness full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`witnesses.${index}.contactNumber`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Witness contact number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name={`witnesses.${index}.relation`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relationship to Case</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Eyewitness, Expert, Character witness" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`witnesses.${index}.statement`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Initial Statement (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief statement about what the witness observed or knows" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* New Evidence Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Evidence</CardTitle>
                <CardDescription>
                  Upload evidence to support your case
                </CardDescription>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => appendEvidence({ 
                  title: "", 
                  description: "", 
                  type: "",
                  fileUrl: "" 
                })}
                className="flex items-center gap-1"
              >
                <FilePlus className="h-4 w-4" /> Add Evidence
              </Button>
            </CardHeader>
            <CardContent>
              {evidenceFields.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No evidence added yet. Click the button above to add evidence.
                </div>
              ) : (
                <div className="space-y-6">
                  {evidenceFields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-4 space-y-4 relative">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeEvidence(index)}
                        className="absolute top-2 right-2 h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <div className="font-medium text-lg">Evidence {index + 1}</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`evidence.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Brief title for this evidence" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`evidence.${index}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Evidence Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select evidence type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {EVIDENCE_TYPES.map(type => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name={`evidence.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe this evidence and its relevance to the case" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-2">
                        <Label htmlFor={`evidence-file-${index}`}>Upload File</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id={`evidence-file-${index}`}
                            type="file"
                            onChange={(e) => handleFileChange(index, e)}
                            className="flex-1"
                            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp3,.mp4,.wav,.avi"
                          />
                          <Button 
                            type="button" 
                            variant="outline"
                            size="icon"
                            onClick={() => document.getElementById(`evidence-file-${index}`)?.click()}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                        {uploadedFiles[`evidence_${index}`] && (
                          <p className="text-sm text-muted-foreground">
                            File added: {uploadedFiles[`evidence_${index}`].name}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit">File Case</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FileCasePage;
