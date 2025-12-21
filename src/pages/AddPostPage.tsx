import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, MapPin, Leaf, Send, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import TopNavbar from '@/components/navigation/TopNavbar';
import BottomNavbar from '@/components/navigation/BottomNavbar';
import AIChatbot from '@/components/chat/AIChatbot';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

const AddPostPage: React.FC = () => {
  const { isAuthenticated, addPost } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    plantName: '',
    description: '',
    location: '',
    imageUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to add a post.',
        variant: 'destructive',
      });
      navigate('/profile');
      return;
    }

    if (!formData.plantName || !formData.description) {
      toast({
        title: 'Missing information',
        description: 'Please fill in the plant name and description.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      addPost({
        plantName: formData.plantName,
        description: formData.description,
        location: formData.location || undefined,
        imageUrl: formData.imageUrl || undefined,
        isLiked: false,
        isBookmarked: false,
      });

      toast({
        title: 'Post submitted! 🌿',
        description: 'Your post is pending moderation and will be visible soon.',
      });

      setFormData({ plantName: '', description: '', location: '', imageUrl: '' });
      navigate('/profile');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <BottomNavbar />

      <main className="pt-20 pb-24 md:pb-8">
        <div className="container mx-auto px-6 max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-bold text-foreground">
                  Share Your Experience
                </h1>
                <p className="text-muted-foreground">
                  Add a post about medicinal plants
                </p>
              </div>
            </div>
          </motion.div>

          {/* Auth Warning */}
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <Alert variant="default" className="border-accent bg-accent/10">
                <AlertCircle className="h-4 w-4 text-accent" />
                <AlertDescription className="text-accent-foreground">
                  Please{' '}
                  <button
                    onClick={() => navigate('/profile')}
                    className="font-medium underline hover:no-underline"
                  >
                    sign in
                  </button>{' '}
                  to submit posts.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-card rounded-2xl p-6 md:p-8 card-shadow border border-border"
          >
            {/* Plant Name */}
            <div className="space-y-2">
              <Label htmlFor="plantName" className="text-base">
                Plant Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="plantName"
                placeholder="e.g., Tulsi, Ashwagandha, Neem..."
                value={formData.plantName}
                onChange={(e) => setFormData({ ...formData, plantName: e.target.value })}
                className="h-12"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">
                Description / Experience <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Share your experience with this plant, its benefits, how you use it..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[150px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Minimum 20 characters. Be descriptive and helpful to others.
              </p>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-base flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Image URL (optional)
              </Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/plant-image.jpg"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="h-12"
              />
              <p className="text-xs text-muted-foreground">
                Paste a direct link to an image of the plant
              </p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location (optional)
              </Label>
              <Input
                id="location"
                placeholder="e.g., Mumbai, Maharashtra"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="h-12"
              />
            </div>

            {/* Moderation Note */}
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">📋 Moderation Notice</p>
              <p>
                All posts are reviewed by our team before being published. Please ensure your
                content is accurate, respectful, and provides educational value.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              disabled={isSubmitting || !isAuthenticated}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Post
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </main>

      <AIChatbot />
    </div>
  );
};

export default AddPostPage;
