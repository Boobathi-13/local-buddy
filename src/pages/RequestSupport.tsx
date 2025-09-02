import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Coffee, Utensils, Car, Home, Heart, Users, MapPin, Calendar, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RequestSupport = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    timeFrom: "",
    timeTo: "",
    language: "",
    location: "home",
    customLocation: "",
    details: "",
    reward: false
  });

  const categories = [
    { id: "coffee", label: "Coffee & Talks", icon: Coffee, color: "from-amber-500 to-orange-500" },
    { id: "meals", label: "Meals Together", icon: Utensils, color: "from-green-500 to-emerald-500" },
    { id: "outing", label: "Outings", icon: Users, color: "from-blue-500 to-cyan-500" },
    { id: "hobby", label: "Hobby Activities", icon: Heart, color: "from-pink-500 to-rose-500" },
    { id: "household", label: "Household Help", icon: Home, color: "from-purple-500 to-violet-500" },
    { id: "transportation", label: "Transportation", icon: Car, color: "from-indigo-500 to-blue-500" },
  ];

  const handleSubmitRequest = () => {
    if (!selectedCategory || !formData.date || !formData.timeFrom) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const request = {
      id: Date.now().toString(),
      category: selectedCategory,
      ...formData,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    // Store in localStorage for demo
    const requests = JSON.parse(localStorage.getItem('userRequests') || '[]');
    requests.push(request);
    localStorage.setItem('userRequests', JSON.stringify(requests));

    toast({
      title: "Request Submitted!",
      description: "We'll notify you when someone responds",
    });

    navigate("/responses", { state: { requestId: request.id } });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-app-orange to-app-orange-light p-6 text-white">
        <div className="flex items-center space-x-4">
          <CustomButton 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/home")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </CustomButton>
          <div>
            <h1 className="text-2xl font-bold">Request Support</h1>
            <p className="text-white/90">What kind of company do you need?</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Category Selection */}
        <Card className="shadow-[var(--shadow-medium)] rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-lg">Choose Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`p-4 rounded-2xl cursor-pointer transition-all ${
                    selectedCategory === category.id
                      ? 'ring-2 ring-app-orange bg-app-orange/10'
                      : 'bg-white shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)]'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl w-fit mb-3`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium">{category.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedCategory && (
          <Card className="shadow-[var(--shadow-medium)] rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-lg">Request Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="pl-10 h-12 rounded-2xl"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Preferred Language</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger className="h-12 rounded-2xl">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="bengali">Bengali</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeFrom">Start Time *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="timeFrom"
                      type="time"
                      value={formData.timeFrom}
                      onChange={(e) => setFormData(prev => ({ ...prev, timeFrom: e.target.value }))}
                      className="pl-10 h-12 rounded-2xl"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeTo">End Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="timeTo"
                      type="time"
                      value={formData.timeTo}
                      onChange={(e) => setFormData(prev => ({ ...prev, timeTo: e.target.value }))}
                      className="pl-10 h-12 rounded-2xl"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Select 
                  value={formData.location}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
                >
                  <SelectTrigger className="h-12 rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">My Home</SelectItem>
                    <SelectItem value="public">Public Place</SelectItem>
                    <SelectItem value="online">Online/Virtual</SelectItem>
                    <SelectItem value="custom">Custom Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.location === "custom" && (
                <div className="space-y-2">
                  <Label htmlFor="customLocation">Custom Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="customLocation"
                      placeholder="Enter location details"
                      value={formData.customLocation}
                      onChange={(e) => setFormData(prev => ({ ...prev, customLocation: e.target.value }))}
                      className="pl-10 h-12 rounded-2xl"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="details">Additional Details</Label>
                <Textarea
                  id="details"
                  placeholder="Tell us more about what you're looking for..."
                  value={formData.details}
                  onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                  className="rounded-2xl"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-app-gray rounded-2xl">
                <div>
                  <Label htmlFor="reward" className="text-sm font-medium">Offer Reward/Payment</Label>
                  <p className="text-xs text-muted-foreground">Optional token of appreciation</p>
                </div>
                <Switch
                  id="reward"
                  checked={formData.reward}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, reward: checked }))}
                />
              </div>

              <CustomButton 
                variant="primary" 
                size="lg" 
                className="w-full"
                onClick={handleSubmitRequest}
              >
                Submit Request
              </CustomButton>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RequestSupport;