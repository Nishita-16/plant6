import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import TopNavbar from '@/components/navigation/TopNavbar';
import BottomNavbar from '@/components/navigation/BottomNavbar';
import PlantCard from '@/components/plants/PlantCard';
import AIChatbot from '@/components/chat/AIChatbot';
import { useApp } from '@/context/AppContext';
import { PlantCategory, AyushSystem } from '@/types';

const categories: PlantCategory[] = ['immunity', 'digestion', 'skin', 'respiratory', 'stress', 'general'];
const ayushSystems: AyushSystem[] = ['Ayurveda', 'Yoga', 'Unani', 'Siddha', 'Homeopathy'];

const SearchPage: React.FC = () => {
  const { plants } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSystem, setSelectedSystem] = useState<string>('all');

  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      const matchesSearch =
        searchQuery === '' ||
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.medicinalUse.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || plant.category === selectedCategory;

      const matchesSystem =
        selectedSystem === 'all' || plant.ayushSystem.includes(selectedSystem as AyushSystem);

      return matchesSearch && matchesCategory && matchesSystem;
    });
  }, [plants, searchQuery, selectedCategory, selectedSystem]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSystem('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedSystem !== 'all';

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <BottomNavbar />

      <main className="pt-20 pb-24 md:pb-8">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Search Plants
            </h1>
            <p className="text-muted-foreground">
              Find medicinal plants by name, use, or AYUSH system
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, botanical name, or medicinal use..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base"
                />
                {searchQuery && (
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>

              {/* Desktop Filters */}
              <div className="hidden md:flex gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] h-12">
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

                <Select value={selectedSystem} onValueChange={setSelectedSystem}>
                  <SelectTrigger className="w-[180px] h-12">
                    <SelectValue placeholder="AYUSH System" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Systems</SelectItem>
                    {ayushSystems.map((sys) => (
                      <SelectItem key={sys} value={sys}>
                        {sys}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters} className="h-12">
                    Clear All
                  </Button>
                )}
              </div>

              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" className="h-12 gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-1">
                        Active
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[70vh]">
                  <SheetHeader>
                    <SheetTitle>Filter Plants</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full">
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

                    <div>
                      <label className="text-sm font-medium mb-2 block">AYUSH System</label>
                      <Select value={selectedSystem} onValueChange={setSelectedSystem}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="AYUSH System" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Systems</SelectItem>
                          {ayushSystems.map((sys) => (
                            <SelectItem key={sys} value={sys}>
                              {sys}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {hasActiveFilters && (
                      <Button variant="outline" onClick={clearFilters} className="w-full">
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Active Filters Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mt-4">
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchQuery}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                  </Badge>
                )}
                {selectedCategory !== 'all' && (
                  <Badge variant="secondary" className="gap-1 capitalize">
                    {selectedCategory}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                  </Badge>
                )}
                {selectedSystem !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedSystem}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSystem('all')} />
                  </Badge>
                )}
              </div>
            )}
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-muted-foreground mb-6">
              Found <span className="font-medium text-foreground">{filteredPlants.length}</span> plants
            </p>

            {filteredPlants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPlants.map((plant, index) => (
                  <motion.div
                    key={plant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PlantCard plant={plant} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <SearchIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">No plants found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <AIChatbot />
    </div>
  );
};

export default SearchPage;
