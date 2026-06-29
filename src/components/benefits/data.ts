import { BarChart3, Users, Clock, DollarSign, Brain, Scale, LucideIcon } from 'lucide-react';

export interface BenefitItem {
  icon: LucideIcon;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  color: string;
  accent: string;
}

export const benefits: BenefitItem[] = [
  {
    icon: BarChart3,
    title: 'Increased Productivity',
    description: 'AI-driven analytics that supercharge decision-making and strategy execution.',
    stat: '+47%',
    statLabel: 'Efficiency',
    color: '#3b82f6',
    accent: '#06b6d4',
  },
  {
    icon: Users,
    title: 'Better Customer Experience',
    description: 'Personalized AI interactions that improve response times and engagement.',
    stat: '+92%',
    statLabel: 'Satisfaction',
    color: '#8b5cf6',
    accent: '#ec4899',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'AI systems that never sleep, ensuring seamless support without downtime.',
    stat: '24/7',
    statLabel: 'Uptime',
    color: '#f97316',
    accent: '#ef4444',
  },
  {
    icon: DollarSign,
    title: 'Cost Reduction',
    description: 'Minimize manual work, cut operational costs, and optimize resource allocation.',
    stat: '-35%',
    statLabel: 'Costs',
    color: '#22c55e',
    accent: '#10b981',
  },
  {
    icon: Brain,
    title: 'Data-Driven Insights',
    description: 'Analyze vast datasets, identify trends, and make smarter business decisions.',
    stat: '10x',
    statLabel: 'Faster',
    color: '#6366f1',
    accent: '#8b5cf6',
  },
  {
    icon: Scale,
    title: 'Scalability & Growth',
    description: 'AI adapts to your needs, allowing you to scale without increasing workload.',
    stat: '∞',
    statLabel: 'Scale',
    color: '#ec4899',
    accent: '#f43f5e',
  },
];
