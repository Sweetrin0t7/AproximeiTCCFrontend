import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProviderCardProps {
  id: number;
  name: string;
  rating: number;
  distance: string;
  categories: string[];
  image?: string;
  description?: string;
  horizontal?: boolean;
}

const ProviderCard = ({
  id,
  name,
  rating,
  distance,
  categories = [],
  image,
  description,
  horizontal = false,
}: ProviderCardProps) => {
  const navigate = useNavigate();

  const renderAvatar = (size: "sm" | "lg") => {
    const sizeClasses = size === "lg" ? "w-16 h-16" : "w-12 h-12";
    return (
      <Avatar className={sizeClasses}>
        {image && <AvatarImage src={image} alt={name} />}
        <AvatarFallback className="bg-aproximei-blue text-white">
          {name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    );
  };

  if (horizontal) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex gap-4">
          {renderAvatar("lg")}
          <div className="flex-1">
            <h3 className="font-semibold">{name}</h3>

            <div className="flex items-center gap-2 mt-1">
              <Star className="w-4 h-4 fill-aproximei-orange text-aproximei-orange" />
              <span className="text-sm font-medium">{rating}</span>
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{distance}</span>
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

            <Button
              className="mt-3 w-full"
              size="sm"
              onClick={() => navigate(`/prestador/${id}`)}
            >
              Ver perfil
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          {renderAvatar("sm")}
          <div className="flex-1">
            <h3 className="font-semibold">{name}</h3>
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

        <Button className="w-full" size="sm" onClick={() => navigate(`/prestador/${id}`)}>
          Ver perfil
        </Button>
      </div>
    </div>
  );
};

export default ProviderCard;
