import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Heart, MessageCircle, Phone, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Support = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Mock data for available requests
    const mockRequests = [
      {
        id: "1",
        category: "coffee",
        name: "Priya Sharma",
        age: 28,
        distance: "0.8 km",
        time: "Today, 4:00 PM",
        duration: "1-2 hours",
        details: "Looking for someone to chat over coffee. Feeling a bit lonely today.",
        interests: ["Reading", "Movies"],
        matchPercentage: 92,
        reward: false,
        location: "Cafe Coffee Day, Koramangala"
      },
      {
        id: "2",
        category: "meals",
        name: "Rajesh Kumar",
        age: 45,
        distance: "1.2 km",
        time: "Tomorrow, 7:00 PM",
        duration: "2 hours",
        details: "Would like company for dinner. New to the city and don't know many people.",
        interests: ["Cooking", "Travel"],
        matchPercentage: 85,
        reward: true,
        location: "MTR Restaurant, Jayanagar"
      },
      {
        id: "3",
        category: "household",
        name: "Anita Devi",
        age: 62,
        distance: "2.1 km",
        time: "Today, 10:00 AM",
        duration: "3-4 hours",
        details: "Need help with grocery shopping and organizing home. Can't carry heavy items.",
        interests: ["Gardening", "Cooking"],
        matchPercentage: 78,
        reward: true,
        location: "Home - HSR Layout"
      }
    ];
    setRequests(mockRequests);
  }, []);

  const handleAcceptRequest = (requestId: string) => {
    toast({
      title: "Request Accepted!",
      description: "You'll be connected with the requestor shortly",
    });
    navigate("/map", { state: { mode: "supporter", requestId } });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      coffee: "bg-amber-100 text-amber-800",
      meals: "bg-green-100 text-green-800",
      household: "bg-purple-100 text-purple-800",
      outing: "bg-blue-100 text-blue-800",
      hobby: "bg-pink-100 text-pink-800",
      transportation: "bg-indigo-100 text-indigo-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const filteredRequests = filter === "all" ? requests : requests.filter(req => req.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
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
            <h1 className="text-2xl font-bold">Support Others</h1>
            <p className="text-white/90">Help someone in your community</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Filter */}
        <Card className="shadow-[var(--shadow-soft)] rounded-2xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 overflow-x-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <CustomButton 
                variant={filter === "all" ? "primary" : "outline"} 
                size="sm"
                onClick={() => setFilter("all")}
              >
                All
              </CustomButton>
              <CustomButton 
                variant={filter === "coffee" ? "primary" : "outline"} 
                size="sm"
                onClick={() => setFilter("coffee")}
              >
                Coffee
              </CustomButton>
              <CustomButton 
                variant={filter === "meals" ? "primary" : "outline"} 
                size="sm"
                onClick={() => setFilter("meals")}
              >
                Meals
              </CustomButton>
              <CustomButton 
                variant={filter === "household" ? "primary" : "outline"} 
                size="sm"
                onClick={() => setFilter("household")}
              >
                Help
              </CustomButton>
            </div>
          </CardContent>
        </Card>

        {/* Request List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="shadow-[var(--shadow-medium)] rounded-2xl border-0">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-app-orange to-app-orange-light rounded-full">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{request.name}</h3>
                      <p className="text-sm text-muted-foreground">Age {request.age} • {request.distance} away</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className={`${getCategoryColor(request.category)} border-0`}>
                      {request.category}
                    </Badge>
                    <p className="text-xs text-app-orange font-medium mt-1">{request.matchPercentage}% match</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{request.time} • {request.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{request.location}</span>
                  </div>
                </div>

                <p className="text-sm text-foreground">{request.details}</p>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Interests:</span>
                  {request.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                  {request.reward && (
                    <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                      Reward Offered
                    </Badge>
                  )}
                </div>

                <div className="flex space-x-3 pt-2">
                  <CustomButton 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => toast({ title: "Message sent", description: "You can now chat with them" })}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </CustomButton>
                  <CustomButton 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({ title: "Calling...", description: "Connecting you now" })}
                  >
                    <Phone className="h-4 w-4" />
                  </CustomButton>
                  <CustomButton 
                    variant="primary" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    Accept & Help
                  </CustomButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <Card className="shadow-[var(--shadow-soft)] rounded-2xl border-0">
            <CardContent className="p-8 text-center">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Requests Available</h3>
              <p className="text-muted-foreground">Check back later for new support requests in your area.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Support;