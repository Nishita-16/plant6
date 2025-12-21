import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Bookmark, MapPin } from 'lucide-react';
import { Plant } from '@/types';
import { getCategoryColor } from '@/data/plants';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PlantCardProps {
  plant: Plant;
  onClick?: () => void;
  variant?: 'default' | 'compact';
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onClick, variant = 'default' }) => {
  const { toggleLikePlant, toggleBookmarkPlant, isAuthenticated } = useApp();

  const categoryColor = getCategoryColor(plant.category);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuthenticated) {
      toggleLikePlant(plant.id);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuthenticated) {
      toggleBookmarkPlant(plant.id);
    }
  };

  if (variant === 'compact') {
    return (
      <motion.div
        className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-muted/50 cursor-pointer transition-colors border border-border"
        onClick={onClick}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <img
          src={plant.imageUrl}
          alt={plant.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate">{plant.name}</h4>
          <p className="text-sm text-muted-foreground truncate">{plant.botanicalName}</p>
        </div>
        <Badge
          className="shrink-0 text-xs"
          style={{ backgroundColor: categoryColor, color: 'white' }}
        >
          {plant.category}
        </Badge>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="group relative bg-card rounded-xl overflow-hidden card-shadow border border-border/50 cursor-pointer"
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={plant.imageUrl}
          alt={plant.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <Badge
          className="absolute top-3 left-3 text-xs font-medium"
          style={{ backgroundColor: categoryColor, color: 'white' }}
        >
          {plant.category}
        </Badge>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              'w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background',
              plant.isLiked && 'text-destructive'
            )}
            onClick={handleLike}
          >
            <Heart className={cn('w-4 h-4', plant.isLiked && 'fill-current')} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              'w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background',
              plant.isBookmarked && 'text-accent'
            )}
            onClick={handleBookmark}
          >
            <Bookmark className={cn('w-4 h-4', plant.isBookmarked && 'fill-current')} />
          </Button>
        </div>

        {/* Location */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-primary-foreground/90 text-xs">
          <MapPin className="w-3 h-3" />
          <span>{plant.location.region}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {plant.name}
        </h3>
        <p className="text-sm text-muted-foreground italic mb-2">{plant.botanicalName}</p>
        <p className="text-sm text-foreground/80 line-clamp-2 mb-3">
          {plant.medicinalUse}
        </p>

        {/* AYUSH Systems */}
        <div className="flex flex-wrap gap-1">
          {plant.ayushSystem.map((system) => (
            <Badge key={system} variant="secondary" className="text-xs">
              {system}
            </Badge>
          ))}
        </div>

        {/* Likes */}
        <div className="flex items-center gap-1 mt-3 text-muted-foreground text-sm">
          <Heart className="w-4 h-4" />
          <span>{plant.likes} likes</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PlantCard;
