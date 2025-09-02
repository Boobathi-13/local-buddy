import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
    aadhaar: "",
    language: "",
    interests: "",
    mentalHealthAssessment: "",
    agreedToTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    if (!formData.name || !formData.mobile || !formData.agreedToTerms) {
      toast({
        title: "Missing Information",
        description: "Please fill in required fields and accept terms",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registration Successful!",
      description: "Welcome to Mental Health Companion",
    });
    
    // Store user data in localStorage for demo
    localStorage.setItem('user', JSON.stringify(formData));
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-[var(--shadow-strong)] border-0 rounded-3xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-between mb-4">
              <CustomButton 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate("/login")}
              >
                <ArrowLeft className="h-5 w-5" />
              </CustomButton>
              <div className="p-3 bg-gradient-to-br from-app-orange to-app-orange-light rounded-full">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <div className="w-10" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Create Your Profile
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-12 rounded-2xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="h-12 rounded-2xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="h-12 rounded-2xl">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="h-12 rounded-2xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="rounded-2xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  placeholder="12-digit Aadhaar number"
                  value={formData.aadhaar}
                  onChange={(e) => handleInputChange("aadhaar", e.target.value.replace(/\D/g, '').slice(0, 12))}
                  className="h-12 rounded-2xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Preferred Language</Label>
                <Select onValueChange={(value) => handleInputChange("language", value)}>
                  <SelectTrigger className="h-12 rounded-2xl">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="bengali">Bengali</SelectItem>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="telugu">Telugu</SelectItem>
                    <SelectItem value="marathi">Marathi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests">Interests & Hobbies</Label>
              <Textarea
                id="interests"
                placeholder="Tell us about your interests, hobbies, and what you enjoy doing"
                value={formData.interests}
                onChange={(e) => handleInputChange("interests", e.target.value)}
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assessment">Mental Health Check</Label>
              <Textarea
                id="assessment"
                placeholder="How are you feeling today? Any specific support you're looking for?"
                value={formData.mentalHealthAssessment}
                onChange={(e) => handleInputChange("mentalHealthAssessment", e.target.value)}
                className="rounded-2xl"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the Terms & Conditions and Privacy Policy
              </Label>
            </div>

            <CustomButton 
              variant="primary" 
              size="lg" 
              className="w-full"
              onClick={handleRegister}
              disabled={!formData.agreedToTerms}
            >
              Create Account
            </CustomButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;