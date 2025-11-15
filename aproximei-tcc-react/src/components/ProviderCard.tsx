import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProviderCardProps {
  name: string;
  rating: number;
  distance: string;
  categories: string[];
  image?: string;
  description?: string;
  horizontal?: boolean;
}

const ProviderCard = ({
  name,
  rating,
  distance,
  categories = [], 
  image = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  description,
  horizontal = false,
}: ProviderCardProps) => {
  if (horizontal) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex gap-4">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-aproximei-orange text-aproximei-orange" />
                <span className="text-sm font-medium">{rating}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{distance}</span>
              </div>
            </div>
            {description && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {description}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              {categories.map((category, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground">{name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-aproximei-orange text-aproximei-orange" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{distance}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((category, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        <Button className="w-full" size="sm">
          Ver perfil
        </Button>
      </div>
    </div>
  );
};

export default ProviderCard;
