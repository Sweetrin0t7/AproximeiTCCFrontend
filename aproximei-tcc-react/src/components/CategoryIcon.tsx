import { LucideIcon } from "lucide-react";

interface CategoryIconProps {
  Icon: LucideIcon;
  label: string;
}

const CategoryIcon = ({ Icon, label }: CategoryIconProps) => {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
        <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
      </div>
      <span className="text-xs md:text-sm text-foreground text-center max-w-[80px]">
        {label}
      </span>
    </div>
  );
};

export default CategoryIcon;
