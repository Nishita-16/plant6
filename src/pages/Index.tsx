import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Leaf, MapPin, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TopNavbar from '@/components/navigation/TopNavbar';
import BottomNavbar from '@/components/navigation/BottomNavbar';
import PlantCard from '@/components/plants/PlantCard';
import AIChatbot from '@/components/chat/AIChatbot';
import { useApp } from '@/context/AppContext';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'immunity', label: 'Immunity' },
  { id: 'digestion', label: 'Digestion' },
  { id: 'skin', label: 'Skin & Hair' },
  { id: 'stress', label: 'Mental Wellness' },
  { id: 'pain', label: 'Pain & Inflammation' },
  { id: 'respiratory', label: 'Respiratory' },
];

const Index: React.FC = () => {
  const { plants } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPlants = selectedCategory === 'all'
    ? plants
    : plants.filter((plant) => plant.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <BottomNavbar />

      {/* Hero Section - Clean, no background image */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/10">
              <Sparkles className="w-3 h-3 mr-1.5" />
              Virtual Herbal Garden
            </Badge>
            
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Discover the Healing{' '}
              <br className="hidden md:block" />
              Power of <span className="text-primary">Nature</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              Explore traditional AYUSH medicinal plants, learn their healing properties, and connect with ancient wisdom for modern wellness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <Search className="w-5 h-5" />
                  Explore Plants
                </Button>
              </Link>
              <Link to="/map">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                  <MapPin className="w-5 h-5" />
                  View Garden
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Herbal Garden Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8"
          >
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                Interactive Herbal Garden
              </h2>
              <p className="text-muted-foreground">
                Click on any plant to learn more about its medicinal properties
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className="rounded-full text-sm"
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Plants Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map((plant, index) => (
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

          {filteredPlants.length === 0 && (
            <div className="text-center py-12">
              <Leaf className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No plants found in this category</p>
            </div>
          )}
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
