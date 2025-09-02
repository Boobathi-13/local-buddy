import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (mobile.length !== 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }
    setOtpSent(true);
    toast({
      title: "OTP Sent!",
      description: `Verification code sent to +91 ${mobile}`,
    });
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      toast({
        title: "Welcome!",
        description: "Login successful",
      });
      navigate("/home");
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP (hint: 1234)",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-[var(--shadow-strong)] border-0 rounded-3xl">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-app-orange to-app-orange-light rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Mental Health Companion
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Connect with caring supporters in your community
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mobile" className="text-sm font-medium">
              Mobile Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="pl-10 h-12 rounded-2xl border-border bg-white"
                disabled={otpSent}
              />
            </div>
          </div>

          {!otpSent ? (
            <CustomButton 
              variant="primary" 
              size="lg" 
              className="w-full"
              onClick={handleSendOtp}
            >
              Send OTP
            </CustomButton>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium">
                  Enter OTP
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="text-center text-lg h-12 rounded-2xl border-border bg-white"
                />
                <p className="text-xs text-muted-foreground text-center">
                  OTP sent to +91 {mobile} (Demo: use 1234)
                </p>
              </div>
              
              <div className="space-y-3">
                <CustomButton 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  onClick={handleVerifyOtp}
                >
                  Verify & Login
                </CustomButton>
                
                <CustomButton 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setOtpSent(false)}
                >
                  Change Number
                </CustomButton>
              </div>
            </div>
          )}

          <div className="pt-4 text-center">
            <CustomButton 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/register")}
            >
              New User? Register Here
            </CustomButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;