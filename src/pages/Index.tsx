import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Coffee, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import CoffeeCard from '@/components/CoffeeCard'
import { getCoffeeRecommendation } from '@/utils/coffeeRecommendations'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import CoffeeCard from '@/components/CoffeeCard';
import { getCoffeeRecommendation } from '@/utils/coffeeRecommendations';

const Index: React.FC = () => {
  const [name, setName] = useState('');
  const [roastPreference, setRoastPreference] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !roastPreference) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const result = await getCoffeeRecommendation(name, roastPreference);
      setRecommendation(result);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get recommendation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-200 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-6"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-amber-800">CoffeeAI</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <Label>Roast Preference</Label>
            <RadioGroup value={roastPreference} onValueChange={setRoastPreference}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">Dark</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Coffee className="mr-2 h-4 w-4" />
            )}
            Get Recommendation
          </Button>
        </form>
      </motion.div>

      {recommendation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <CoffeeCard recommendation={recommendation} />
        </motion.div>
      )}
    </div>
  );
};

export default Index;