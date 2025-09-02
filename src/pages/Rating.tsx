import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, Heart, ThumbsUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Rating = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { supporterId, mode } = location.state || {};
  
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmitRating = () => {
    if (rating === 0) {
      toast({
        title: "Please provide a rating",
        description: "Your feedback helps improve our community",
        variant: "destructive",
      });
      return;
    }

    // Store rating in localStorage for demo
    const ratings = JSON.parse(localStorage.getItem('ratings') || '[]');
    ratings.push({
      supporterId,
      rating,
      review,
      date: new Date().toISOString(),
      mode
    });
    localStorage.setItem('ratings', JSON.stringify(ratings));

    toast({
      title: "Thank you for your feedback!",
      description: "Your rating has been submitted successfully",
    });

    navigate("/home");
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isActive = starValue <= (hoveredRating || rating);
      
      return (
        <button
          key={index}
          className={`transition-colors ${isActive ? 'text-yellow-500' : 'text-gray-300'}`}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => setRating(starValue)}
        >
          <Star className={`h-8 w-8 ${isActive ? 'fill-current' : ''}`} />
        </button>
      );
    });
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return "Poor";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Very Good";
      case 5: return "Excellent";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-[var(--shadow-strong)] border-0 rounded-3xl">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-app-orange to-app-orange-light rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Rate Your Experience
          </CardTitle>
          <p className="text-muted-foreground">
            {mode === "supporter" 
              ? "How was your experience helping today?" 
              : "How was your support session?"}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Star Rating */}
          <div className="text-center space-y-3">
            <div className="flex justify-center space-x-2">
              {renderStars()}
            </div>
            {(hoveredRating || rating) > 0 && (
              <p className="text-lg font-medium text-app-orange">
                {getRatingText(hoveredRating || rating)}
              </p>
            )}
          </div>

          {/* Written Review */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Share your thoughts (optional)
            </label>
            <Textarea
              placeholder="Tell us about your experience..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="rounded-2xl min-h-[100px]"
            />
          </div>

          {/* Quick Feedback Options */}
          {rating >= 4 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">What made it great?</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Great conversation",
                  "Very helpful",
                  "Punctual",
                  "Kind & caring",
                  "Good listener",
                  "Made me feel better"
                ].map((tag, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 text-xs bg-app-gray hover:bg-app-orange hover:text-white rounded-full transition-colors"
                    onClick={() => setReview(prev => prev ? `${prev}, ${tag}` : tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <CustomButton 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={handleSubmitRating}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Submit Rating
          </CustomButton>

          {/* Skip Option */}
          <CustomButton 
            variant="ghost" 
            size="sm" 
            className="w-full"
            onClick={() => navigate("/home")}
          >
            Skip for now
          </CustomButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rating;