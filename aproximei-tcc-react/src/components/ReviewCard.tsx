import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ReviewCardProps {
  name: string;
  rating: number;
  category: string;
  date: string;
  comment: string;
  avatar?: string;
}

const ReviewCard = ({ name, rating, category, date, comment, avatar }: ReviewCardProps) => {
  return (
    <div className="flex gap-4 p-4 border border-border rounded-lg">
      <Avatar className="h-12 w-12">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="bg-aproximei-blue text-white">
          {name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">{name}</h4>
        
        <div className="flex items-center gap-2 mt-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating
                    ? "fill-aproximei-orange text-aproximei-orange"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">• {category}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mt-1">Avaliado em {date}</p>
        <p className="text-sm text-foreground mt-2">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
