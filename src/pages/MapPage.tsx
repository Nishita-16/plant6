import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Maximize2, Filter, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MapView from '@/components/map/MapView';
import PlantCard from '@/components/plants/PlantCard';
import AIChatbot from '@/components/chat/AIChatbot';
import { useApp } from '@/context/AppContext';
import { Plant, PlantCategory } from '@/types';
import { getCategoryColor } from '@/data/plants';

const regions = [
  'All Regions',
  'North India',
  'South India',
  'East India',
  'West India',
  'Central India',
];

const categories: PlantCategory[] = ['immunity', 'digestion', 'skin', 'respiratory', 'stress', 'general'];

const MapPage: React.FC = () => {
  const { plants } = useApp();
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPlants = plants.filter((plant) => {
    const matchesRegion =
      selectedRegion === 'All Regions' ||
      plant.location.region.includes(selectedRegion.replace(' India', ''));
    const matchesCategory =
      selectedCategory === 'all' || plant.category === selectedCategory;
    return matchesRegion && matchesCategory;
  });

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-background via-background/95 to-transparent pt-4 pb-8 px-4"
      >
        <div className="flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="icon" className="glass-card">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="glass-card"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 glass-card rounded-xl p-4 space-y-4"
          >
            <div className="flex gap-3">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="flex-1 bg-background">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="flex-1 bg-background">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="capitalize">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Map */}
      <div className="flex-1 relative">
        <MapView
          plants={filteredPlants}
          onPlantClick={setSelectedPlant}
          selectedPlant={selectedPlant}
          fullScreen
        />

        {/* Legend */}
        <div className="absolute bottom-24 md:bottom-8 left-4 glass-card rounded-xl p-4 z-10">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Categories</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getCategoryColor(cat) }}
                />
                <span className="text-xs capitalize">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plant Count */}
        <div className="absolute top-20 right-4 glass-card rounded-lg px-3 py-2 z-10">
          <span className="text-sm font-medium">{filteredPlants.length} plants</span>
        </div>

        {/* Selected Plant Card */}
        {selectedPlant && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-24 md:bottom-8 right-4 left-auto w-[300px] z-10"
          >
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-card"
                onClick={() => setSelectedPlant(null)}
              >
                ×
              </Button>
              <PlantCard plant={selectedPlant} />
            </div>
          </motion.div>
        )}
      </div>

      {/* AR Preview Button (placeholder for future) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <Button
          variant="outline"
          className="glass-card gap-2"
          disabled
        >
          <Maximize2 className="w-4 h-4" />
          AR Preview (Coming Soon)
        </Button>
      </motion.div>

      <AIChatbot />
    </div>
  );
};

export default MapPage;
