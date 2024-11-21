import React from 'react'
import { motion } from 'framer-motion'
import { Coffee } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

import React from 'react';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface CoffeeCardProps {
  recommendation: string;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ recommendation }) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-amber-800">
          <Coffee className="mr-2" />
          Your Coffee Recommendation
        </CardTitle>
        <CardDescription>Based on your preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-medium"
        >
          {recommendation}
        </motion.p>
      </CardContent>
    </Card>
  );
};

export default CoffeeCard;