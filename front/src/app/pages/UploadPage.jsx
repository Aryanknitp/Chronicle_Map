import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  Upload as UploadIcon,
  MapPin,
  Image,
  FileText,
  Mic,
  Video,
  X,
  Check,
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Progress } from "../components/ui/progress";
import { useUpload } from "../context/UploadContext";
import { toast } from "sonner";
import LeafletMap from "../components/map/LeafletMap";

const UploadPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    draftUpload,
    uploadProgress,
    isUploading,
    updateFiles,
    updateMetadata,
    updateLocation,
    updateConsent,
    updateAttribution,
    resetDraft,
  } = useUpload();

  const [step, setStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear(),
    category: "photo",
    tags: "",
    location: "",
    attribution: "",
    consent: false,
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    updateFiles(files);
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    updateFiles(newFiles);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (["title", "description", "year", "category", "tags"].includes(field)) {
      updateMetadata({ [field]: value });
    } else if (field === "location") {
      updateLocation(value);
    } else if (field === "attribution") {
      updateAttribution(value);
    } else if (field === "consent") {
      updateConsent(value);
    }
  };

  const handleNext = () => {
    if (step === 1 && selectedFiles.length === 0) {
      toast.error("Please select at least one file to upload");
      return;
    }
    if (step === 2 && !formData.title) {
      toast.error("Please provide a title");
      return;
    }
    if (step === 3 && !formData.location) {
      toast.error("Please specify a location");
      return;
    }
    if (step === 4 && !formData.consent) {
      toast.error("Please confirm you have the rights to share this content");
      return;
    }

    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    toast.success(
      "Upload submitted successfully! Our team will review it shortly.",
    );
    resetDraft();
    navigate("/");
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, label: "Upload Files" },
      { number: 2, label: "Add Details" },
      { number: 3, label: "Set Location" },
      { number: 4, label: "Consent" },
      { number: 5, label: "Review" },
    ];

    return (
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, index) => (
          <div key={s.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s.number
                    ? "bg-amber-700 text-white"
                    : "bg-stone-200 text-stone-500"
                }`}
              >
                {step > s.number ? <Check className="w-5 h-5" /> : s.number}
              </div>
              <span className="text-xs mt-2 text-center hidden sm:block">
                {s.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 ${
                  step > s.number ? "bg-amber-700" : "bg-stone-200"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="bg-stone-50 min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-stone-900 mb-3">
              Contribute to History
            </h1>
            <p className="text-lg text-stone-600">
              Share your photos, documents, and stories to help preserve local
              history
            </p>
          </div>

          {renderStepIndicator()}

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>
                {step === 1 && "Upload Your Files"}
                {step === 2 && "Add Details"}
                {step === 3 && "Select Location"}
                {step === 4 && "Consent & Attribution"}
                {step === 5 && "Review & Submit"}
              </CardTitle>
              <CardDescription>
                {step === 1 &&
                  "Select photos, documents, audio, or video files to upload"}
                {step === 2 && "Provide information about your contribution"}
                {step === 3 &&
                  "Pin your content to a specific location on the map"}
                {step === 4 && "Confirm you have rights to share this content"}
                {step === 5 && "Review your submission before sending"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Upload Files */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center hover:border-amber-500 transition-colors">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <UploadIcon className="w-12 h-12 text-amber-700 mb-4" />
                      <span className="text-lg font-medium text-stone-900 mb-2">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-sm text-stone-500">
                        Photos, videos, audio, or documents (Max 50MB each)
                      </span>
                    </label>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-stone-900">
                        Selected Files:
                      </h3>
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-stone-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            {file.type.startsWith("image/") && (
                              <Image className="w-5 h-5 text-amber-700" />
                            )}
                            {file.type.startsWith("video/") && (
                              <Video className="w-5 h-5 text-red-700" />
                            )}
                            {file.type.startsWith("audio/") && (
                              <Mic className="w-5 h-5 text-green-700" />
                            )}
                            {file.type.includes("pdf") ||
                              (file.type.includes("document") && (
                                <FileText className="w-5 h-5 text-blue-700" />
                              ))}
                            <div>
                              <p className="font-medium text-stone-900">
                                {file.name}
                              </p>
                              <p className="text-sm text-stone-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Metadata */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Main Street in 1950"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this content shows..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        type="number"
                        min="1800"
                        max={new Date().getFullYear()}
                        value={formData.year}
                        onChange={(e) =>
                          handleInputChange("year", parseInt(e.target.value))
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="photo">Photo</SelectItem>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      placeholder="e.g., architecture, downtown, 1950s"
                      value={formData.tags}
                      onChange={(e) =>
                        handleInputChange("tags", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Location */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., 123 Main Street, Downtown"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                    />
                  </div>

                  <div className="border rounded-lg p-4 bg-stone-50">
                    <div className="flex items-center space-x-2 mb-4">
                      <MapPin className="w-5 h-5 text-amber-700" />
                      <span className="font-medium text-stone-900">
                        Pin Location on Map
                      </span>
                    </div>
                    <div className="bg-stone-200 h-64 rounded-lg flex items-center justify-center">
                      <p className="text-stone-500">
                        {/* Interactive map picker would be here */}
                        <LeafletMap />
                      </p>
                    </div>
                    <p className="text-sm text-stone-500 mt-2">
                      Click on the map to set the exact location
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Consent */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="attribution">Attribution (optional)</Label>
                    <Input
                      id="attribution"
                      placeholder="e.g., Family collection of John Smith"
                      value={formData.attribution}
                      onChange={(e) =>
                        handleInputChange("attribution", e.target.value)
                      }
                    />
                    <p className="text-sm text-stone-500 mt-1">
                      Credit the source of this content
                    </p>
                  </div>

                  <div className="border rounded-lg p-6 bg-amber-50 border-amber-200">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) =>
                          handleInputChange("consent", checked)
                        }
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor="consent"
                          className="text-sm font-medium text-stone-900 cursor-pointer"
                        >
                          I confirm that I have the rights to share this content
                        </Label>
                        <p className="text-sm text-stone-600 mt-2">
                          By checking this box, you confirm that you own this
                          content or have permission from the copyright holder
                          to share it publicly on ChronicleMap. You agree that
                          this content will be made available under a Creative
                          Commons license for preservation and educational
                          purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Review */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-2">
                      Files to Upload
                    </h3>
                    <p className="text-stone-600">
                      {selectedFiles.length} file(s) selected
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-stone-900 mb-2">
                      Details
                    </h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-stone-500">Title:</dt>
                        <dd className="font-medium text-stone-900">
                          {formData.title}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-stone-500">Year:</dt>
                        <dd className="font-medium text-stone-900">
                          {formData.year}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-stone-500">Category:</dt>
                        <dd className="font-medium text-stone-900">
                          {formData.category}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-stone-500">Location:</dt>
                        <dd className="font-medium text-stone-900">
                          {formData.location}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>What happens next?</strong> Your submission will
                      be reviewed by our team of historians and
                      preservationists. Once approved, it will be published on
                      ChronicleMap and become part of the community archive.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  Back
                </Button>
                {step < 5 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-amber-700 hover:bg-amber-800"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-amber-700 hover:bg-amber-800"
                    disabled={!formData.consent}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default UploadPage;
