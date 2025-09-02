import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, MapPin, Star, MessageCircle, Phone, Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Responses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const requestId = location.state?.requestId;
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // Mock responses data
    const mockResponses = [
      {
        id: "1",
        name: "Arjun Patel",
        age: 32,
        profileImage: "",
        interests: ["Coffee", "Books", "Music"],
        location: "0.5 km away",
        rating: 4.8,
        completedSessions: 15,
        matchPercentage: 94,
        bio: "Love meeting new people and helping out. Great listener and always up for a good conversation!",
        responseTime: "2 mins ago",
        verified: true
      },
      {
        id: "2",
        name: "Sneha Reddy",
        age: 27,
        profileImage: "",
        interests: ["Photography", "Travel", "Cooking"],
        location: "1.2 km away",
        rating: 4.9,
        completedSessions: 23,
        matchPercentage: 89,
        bio: "Friendly and empathetic. Love helping others and making meaningful connections.",
        responseTime: "5 mins ago",
        verified: true
      },
      {
        id: "3",
        name: "Karan Singh",
        age: 35,
        profileImage: "",
        interests: ["Sports", "Movies", "Technology"],
        location: "2.1 km away",
        rating: 4.7,
        completedSessions: 12,
        matchPercentage: 82,
        bio: "Tech enthusiast who enjoys meaningful conversations. Happy to lend a helping hand!",
        responseTime: "8 mins ago",
        verified: false
      }
    ];
    setResponses(mockResponses);
  }, []);

  const handleConfirmSupporter = (supporterId: string, supporterName: string) => {
    toast({
      title: "Supporter Confirmed!",
      description: `${supporterName} will be with you shortly`,
    });
    navigate("/map", { state: { mode: "requestor", supporterId } });
  };

  const handleMessage = (supporterName: string) => {
    toast({
      title: "Chat Started",
      description: `You can now message ${supporterName}`,
    });
  };

  const handleCall = (supporterName: string) => {
    toast({
      title: "Calling...",
      description: `Connecting you with ${supporterName}`,
    });
  };

  const handleDecline = (supporterId: string) => {
    setResponses(prev => prev.filter(response => response.id !== supporterId));
    toast({
      title: "Response Declined",
      description: "The supporter has been notified",
    });
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
            <h1 className="text-2xl font-bold">Support Responses</h1>
            <p className="text-white/90">{responses.length} people want to help you</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {responses.length > 0 ? (
          <div className="space-y-4">
            {responses.map((response) => (
              <Card key={response.id} className="shadow-[var(--shadow-medium)] rounded-2xl border-0">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-app-orange to-app-orange-light rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-foreground">{response.name}</h3>
                          {response.verified && (
                            <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Age {response.age} • {response.location}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{response.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {response.completedSessions} sessions
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-app-orange">{response.matchPercentage}%</p>
                      <p className="text-xs text-muted-foreground">match</p>
                      <p className="text-xs text-muted-foreground mt-1">{response.responseTime}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground">{response.bio}</p>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">INTERESTS</p>
                    <div className="flex flex-wrap gap-2">
                      {response.interests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <CustomButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDecline(response.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Decline
                    </CustomButton>
                    
                    <CustomButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMessage(response.name)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </CustomButton>
                    
                    <CustomButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCall(response.name)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </CustomButton>
                    
                    <CustomButton 
                      variant="primary" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleConfirmSupporter(response.id, response.name)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Confirm
                    </CustomButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-[var(--shadow-soft)] rounded-2xl border-0">
            <CardContent className="p-8 text-center">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Responses Yet</h3>
              <p className="text-muted-foreground mb-4">
                We're notifying nearby supporters. You'll get responses soon!
              </p>
              <CustomButton 
                variant="outline"
                onClick={() => navigate("/home")}
              >
                Go Back Home
              </CustomButton>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Responses;