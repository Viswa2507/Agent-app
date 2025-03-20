'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const itemTypes = {
  Smartphone: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Other'],
  Laptop: ['Apple', 'Dell', 'HP', 'Lenovo', 'Other'],
  Monitor: ['Dell', 'LG', 'Samsung', 'ViewSonic', 'Other'],
  Tablet: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Other'],
  'Desktop PC': ['Dell', 'HP', 'Lenovo', 'Custom Built', 'Other'],
};

const qualityMultipliers = {
  Excellent: 1.2,
  Working: 1.0,
  Damaged: 0.7,
};

const basePoints = {
  Smartphone: 100,
  Laptop: 300,
  Monitor: 150,
  Tablet: 120,
  'Desktop PC': 400,
};

export default function RewardsPage() {
  const { toast } = useToast();
  const [itemType, setItemType] = useState('');
  const [brand, setBrand] = useState('');
  const [weight, setWeight] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quality, setQuality] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const calculatePoints = () => {
    if (!itemType || !brand || !weight || !quantity || !quality) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields to calculate points.',
        variant: 'destructive',
      });
      return;
    }

    const basePoint = basePoints[itemType as keyof typeof basePoints];
    const qualityMultiplier = qualityMultipliers[quality as keyof typeof qualityMultipliers];
    const weightMultiplier = Math.min(parseFloat(weight) / 2, 3);
    const points = Math.round(
      basePoint * qualityMultiplier * weightMultiplier * parseInt(quantity)
    );

    toast({
      title: 'Points Calculated',
      description: `${points} points will be awarded to ${userEmail}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Reward Allocation</h1>
        
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="itemType">Item Type</Label>
              <Select onValueChange={setItemType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(itemTypes).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {itemType && (
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Select onValueChange={setBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {itemTypes[itemType as keyof typeof itemTypes].map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kg"
              />
            </div>

            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
            </div>

            <div>
              <Label htmlFor="quality">Quality</Label>
              <Select onValueChange={setQuality}>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(qualityMultipliers).map((quality) => (
                    <SelectItem key={quality} value={quality}>
                      {quality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="email">User Email</Label>
              <Input
                id="email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter user email"
              />
            </div>

            <Button
              className="w-full"
              onClick={calculatePoints}
            >
              Calculate & Allocate Points
            </Button>
          </div>
        </Card>

        <Card className="mt-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Points Reference Table</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Item Type</th>
                  <th className="text-left py-2">Base Points</th>
                  <th className="text-left py-2">Quality Multiplier</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(basePoints).map(([type, points]) => (
                  <tr key={type} className="border-b">
                    <td className="py-2">{type}</td>
                    <td className="py-2">{points}</td>
                    <td className="py-2">
                      Excellent: 1.2x<br />
                      Working: 1.0x<br />
                      Damaged: 0.7x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}