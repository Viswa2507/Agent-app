'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PendingAgent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  collectionCenter: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Mock data - in a real app, this would come from your database
const mockPendingAgents: PendingAgent[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    companyName: 'EcoTech Solutions',
    collectionCenter: 'Central Hub - Downtown',
    status: 'pending',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    companyName: 'Green Recyclers Inc',
    collectionCenter: 'North District Center',
    status: 'pending',
  },
];

export default function AdminPage() {
  const { toast } = useToast();
  const [pendingAgents, setPendingAgents] = useState<PendingAgent[]>(mockPendingAgents);

  const handleApproval = (agentId: string, approved: boolean) => {
    setPendingAgents((agents) =>
      agents.map((agent) =>
        agent.id === agentId
          ? { ...agent, status: approved ? 'approved' : 'rejected' }
          : agent
      )
    );

    toast({
      title: approved ? 'Agent Approved' : 'Agent Rejected',
      description: `Agent has been ${approved ? 'approved' : 'rejected'} successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Pending Agent Approvals</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Collection Center</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      {agent.firstName} {agent.lastName}
                    </TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.companyName}</TableCell>
                    <TableCell>{agent.collectionCenter}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          agent.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : agent.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {agent.status === 'pending' && (
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproval(agent.id, true)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleApproval(agent.id, false)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">System Statistics</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Total Agents</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Collection Centers</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total E-Waste Collected</p>
                <p className="text-2xl font-bold">1,234 kg</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm text-gray-600">New Agent Registration</p>
                <p className="text-sm font-medium">John Doe - EcoTech Solutions</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm text-gray-600">Collection Center Update</p>
                <p className="text-sm font-medium">Central Hub - Capacity Increased</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm text-gray-600">Large Collection</p>
                <p className="text-sm font-medium">250kg of e-waste processed</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}