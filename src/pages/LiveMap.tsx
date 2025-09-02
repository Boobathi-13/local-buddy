import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Phone, MessageCircle, Navigation, Clock, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LiveMap = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, requestId, supporterId } = location.state || {};
  
  const [supporterLocation, setSupporterLocation] = useState({ lat: 12.9716, lng: 77.5946 });
  const [userLocation] = useState({ lat: 12.9716, lng: 77.5946 });
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [status, setStatus] = useState("on_way"); // on_way, arrived, completed

  useEffect(() => {
    // Simulate supporter movement
    const interval = setInterval(() => {
      setSupporterLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
      
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 3000);

    // Simulate arrival after 15 seconds
    const arrivalTimer = setTimeout(() => {
      setStatus("arrived");
      toast({
        title: "Supporter Arrived!",
        description: "Your supporter has reached the location",
      });
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(arrivalTimer);
    };
  }, []);

  const handleCompleteSession = () => {
    setStatus("completed");
    navigate("/rating", { state: { supporterId, mode } });
  };

  const handleCallSupporter = () => {
    toast({
      title: "Calling Supporter",
      description: "Connecting you now...",
    });
  };

  const handleMessageSupporter = () => {
    toast({
      title: "Message Sent",
      description: "You can now chat with your supporter",
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
            <h1 className="text-2xl font-bold">Live Tracking</h1>
            <p className="text-white/90">
              {mode === "supporter" ? "Navigate to requestor" : "Track your supporter"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Map Container */}
        <Card className="shadow-[var(--shadow-medium)] rounded-2xl border-0 overflow-hidden">
          <div className="h-80 bg-gradient-to-br from-blue-100 to-green-100 relative flex items-center justify-center">
            {/* Simulated Map */}
            <div className="absolute inset-0 opacity-50 bg-gray-100"></div>
            
            {/* User Location */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="p-3 bg-blue-500 rounded-full shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs text-center mt-1 font-medium">You</p>
            </div>
            
            {/* Supporter Location */}
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-3000"
              style={{
                top: `${45 + Math.sin(Date.now() / 1000) * 5}%`,
                left: `${55 + Math.cos(Date.now() / 1000) * 5}%`
              }}
            >
              <div className="p-3 bg-app-orange rounded-full shadow-lg animate-pulse">
                <User className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs text-center mt-1 font-medium">Supporter</p>
            </div>

            {/* Route Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 50% 50% Q 60% 45% 65% 50%"
                stroke="#f8b323"
                strokeWidth="3"
                strokeDasharray="5,5"
                fill="none"
                className="animate-pulse"
              />
            </svg>
          </div>
        </Card>

        {/* Status Card */}
        <Card className="shadow-[var(--shadow-medium)] rounded-2xl border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-app-orange to-app-orange-light rounded-full">
                  <Navigation className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {status === "on_way" && "Supporter is on the way"}
                    {status === "arrived" && "Supporter has arrived!"}
                    {status === "completed" && "Session completed"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {mode === "supporter" ? "Arjun Patel" : "Your supporter"}
                  </p>
                </div>
              </div>
              
              {status === "on_way" && (
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-app-orange">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold">{estimatedTime} min</span>
                  </div>
                  <p className="text-xs text-muted-foreground">ETA</p>
                </div>
              )}
            </div>

            {status === "on_way" && (
              <div className="flex space-x-3">
                <CustomButton 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleMessageSupporter}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </CustomButton>
                <CustomButton 
                  variant="outline"
                  onClick={handleCallSupporter}
                >
                  <Phone className="h-4 w-4" />
                </CustomButton>
              </div>
            )}

            {status === "arrived" && (
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                  <p className="text-green-800 text-sm font-medium text-center">
                    🎉 Your supporter has arrived! You can now meet them.
                  </p>
                </div>
                <div className="flex space-x-3">
                  <CustomButton 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleMessageSupporter}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </CustomButton>
                  <CustomButton 
                    variant="outline"
                    onClick={handleCallSupporter}
                  >
                    <Phone className="h-4 w-4" />
                  </CustomButton>
                  <CustomButton 
                    variant="primary" 
                    className="flex-1"
                    onClick={handleCompleteSession}
                  >
                    Complete Session
                  </CustomButton>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Card */}
        <Card className="shadow-[var(--shadow-soft)] rounded-2xl border-0">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-3">Safety Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Meet in public places when possible</li>
              <li>• Share your live location with a trusted friend</li>
              <li>• Trust your instincts and stay safe</li>
              <li>• Contact support if you need help</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveMap;