import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Leaf, MapPin, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import TopNavbar from '@/components/navigation/TopNavbar';
import BottomNavbar from '@/components/navigation/BottomNavbar';
import MapView from '@/components/map/MapView';
import PlantCard from '@/components/plants/PlantCard';
import AIChatbot from '@/components/chat/AIChatbot';
import { useApp } from '@/context/AppContext';
import { Plant } from '@/types';
import heroImage from '@/assets/hero-garden.jpg';

const categories = [
  { id: 'immunity', label: 'Immunity', color: 'bg-category-immunity' },
  { id: 'digestion', label: 'Digestion', color: 'bg-category-digestion' },
  { id: 'skin', label: 'Skin Care', color: 'bg-category-skin' },
  { id: 'respiratory', label: 'Respiratory', color: 'bg-category-respiratory' },
  { id: 'stress', label: 'Stress Relief', color: 'bg-category-stress' },
];

const Index: React.FC = () => {
  const { plants } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const filteredPlants = selectedCategory
    ? plants.filter((plant) => plant.category === selectedCategory)
    : plants;

  const featuredPlants = plants.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <BottomNavbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="AYUSH Herbal Garden"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <Badge className="mb-4 bg-primary/90 text-primary-foreground">
              <Sparkles className="w-3 h-3 mr-1" />
              Explore India's Medicinal Heritage
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
              Discover the Healing Power of{' '}
              <span className="text-accent">Nature</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Explore thousands of medicinal plants from Ayurveda, Unani, Siddha, and more. 
              Learn traditional remedies passed down through generations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/search">
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Search className="w-5 h-5" />
                  Search Plants
                </Button>
              </Link>
              <Link to="/map">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 bg-background/20 border-primary-foreground/30 text-primary-foreground hover:bg-background/30">
                  <MapPin className="w-5 h-5" />
                  Explore Map
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-8 left-6 right-6"
          >
            <div className="flex flex-wrap gap-6 md:gap-12">
              <div className="glass-card px-4 py-3 rounded-xl">
                <p className="text-2xl md:text-3xl font-bold text-primary">{plants.length}+</p>
                <p className="text-sm text-muted-foreground">Medicinal Plants</p>
              </div>
              <div className="glass-card px-4 py-3 rounded-xl">
                <p className="text-2xl md:text-3xl font-bold text-primary">5</p>
                <p className="text-sm text-muted-foreground">AYUSH Systems</p>
              </div>
              <div className="glass-card px-4 py-3 rounded-xl">
                <p className="text-2xl md:text-3xl font-bold text-primary">1000+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Explore by Category
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover plants based on their medicinal properties and health benefits
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >
              All Plants
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.id)}
                className="rounded-full"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                Discover on Map
              </h2>
              <p className="text-muted-foreground">
                Click on pins to explore medicinal plants across India
              </p>
            </div>
            <Link to="/map">
              <Button variant="outline" className="hidden md:flex gap-2">
                Full Map View
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden elevated-shadow"
          >
            <MapView
              plants={filteredPlants}
              onPlantClick={setSelectedPlant}
              selectedPlant={selectedPlant}
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Plants Section */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Plants
              </h2>
              <p className="text-muted-foreground">
                Popular medicinal plants from AYUSH traditions
              </p>
            </div>
            <Link to="/search">
              <Button variant="outline" className="hidden md:flex gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlants.map((plant, index) => (
              <motion.div
                key={plant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PlantCard plant={plant} />
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 md:hidden">
            <Link to="/search">
              <Button variant="outline" className="gap-2">
                View All Plants
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className="w-12 h-12 mx-auto text-primary-foreground/80 mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Share Your Knowledge
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Join our community of herbal enthusiasts. Share your experiences with medicinal plants and learn from others.
            </p>
            <Link to="/add-post">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                <Leaf className="w-5 h-5" />
                Add Your Post
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border mb-16 md:mb-0">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-semibold">AYUSH Garden</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 AYUSH Virtual Herbal Garden. Educational purposes only.
          </p>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Index;
