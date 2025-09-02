import { useNavigate } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, HandHeart, Coffee, Users, Settings, MapPin, Calendar, Star } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const quickStats = [
    { label: "Connections Made", value: "12", icon: Users },
    { label: "Sessions Attended", value: "8", icon: Coffee },
    { label: "Rating", value: "4.8", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-app-orange to-app-orange-light p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Hello, {user.name || 'Friend'}!</h1>
            <p className="text-white/90">How can we support you today?</p>
          </div>
          <CustomButton 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/profile")}
            className="text-white hover:bg-white/20"
          >
            <Settings className="h-6 w-6" />
          </CustomButton>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="text-center shadow-[var(--shadow-soft)] rounded-2xl border-0">
              <CardContent className="p-4">
                <stat.icon className="h-6 w-6 text-app-orange mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">What do you need today?</h2>
          
          <Card 
            className="shadow-[var(--shadow-medium)] rounded-2xl border-0 cursor-pointer hover:shadow-[var(--shadow-strong)] transition-shadow"
            onClick={() => navigate("/request")}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gradient-to-br from-app-orange to-app-orange-light rounded-full">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">I need company for...</h3>
                  <p className="text-muted-foreground">Coffee, meals, outings, or just someone to talk to</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="shadow-[var(--shadow-medium)] rounded-2xl border-0 cursor-pointer hover:shadow-[var(--shadow-strong)] transition-shadow"
            onClick={() => navigate("/support")}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full">
                  <HandHeart className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">I want to help others</h3>
                  <p className="text-muted-foreground">Browse requests and offer your support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-2 gap-4">
          <CustomButton 
            variant="outline" 
            className="h-20 rounded-2xl flex-col"
            onClick={() => navigate("/map")}
          >
            <MapPin className="h-6 w-6 mb-2" />
            <span>Live Map</span>
          </CustomButton>
          
          <CustomButton 
            variant="outline" 
            className="h-20 rounded-2xl flex-col"
            onClick={() => navigate("/calendar")}
          >
            <Calendar className="h-6 w-6 mb-2" />
            <span>My Calendar</span>
          </CustomButton>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-[var(--shadow-soft)] rounded-2xl border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-app-gray rounded-xl">
                <Coffee className="h-5 w-5 text-app-orange" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Coffee chat with Priya</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 4:00 PM</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-app-gray rounded-xl">
                <HandHeart className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Helped with grocery shopping</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Rated 5★</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;