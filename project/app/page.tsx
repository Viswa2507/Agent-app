import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RecycleIcon, Award, UserPlus, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-end space-x-4 mb-8">
          <Link href="/login">
            <Button variant="outline" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Agent Login
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="flex items-center gap-2 bg-primary/10">
              <LogIn className="h-4 w-4" />
              Admin Login
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-8">
            <RecycleIcon className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            EcoRecycle E-Waste Collection System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sustainable e-waste management with blockchain rewards
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Award className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">Reward Allocation</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Calculate and allocate rewards for e-waste submissions based on type, quality, and quantity.
            </p>
            <Link href="/rewards">
              <Button className="w-full">
                Manage Rewards
              </Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <UserPlus className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">Agent Registration</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Register new collection agents and manage collection centers.
            </p>
            <Link href="/register">
              <Button className="w-full">
                Register Agent
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function allocateReward(points: number): string {
    if (points >= 2000) {
        return "Gold Tier";
    } else if (points >= 1000) {
        return "Silver Tier";
    } else {
        return "Bronze Tier";
    }
}