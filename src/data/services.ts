import { ConditionIntelligenceVisual } from '@/components/services/ConditionIntelligenceVisual';
import { BarChart3, Brain, CircleFadingArrowUp, Clock, DollarSign, LucideBadgeDollarSign, Scale, UserCheck, Users, Zap } from 'lucide-react';
import { BenefitItem } from "../components/benefits/data";
import { AIAssistantVisual } from "../components/services/AIAssistantVisual";
import { WorkflowVisual } from "../components/services/WorkflowVisual";

export interface ServiceData {
    id: string;
    category: string;
    title: string;
    description: string;
    fullDescription: string;
    features: string[];
    /** "chips" (default) shows short tags; "checklist" shows full-sentence bullets with check icons. */
    featureLayout?: "chips" | "checklist";
    benefits: boolean;
    detailedBenefits: BenefitItem[];
    Visual: React.ComponentType;
    readMore: boolean;
}

export const services: ServiceData[] = [
    {
        id: "learning-platform",
        category: "SMARTCEM",
        title: "AI-Powered Learning Intelligence",
        description:
            "Identify gaps. Learn smarter. Assess progress. Grow continuously.\nEmpower your workforce with personalized learning, AI-assisted knowledge access, and competency-driven development powered by CEMTRIX.",
        fullDescription: "SMARTCEM is an AI-powered Learning Intelligence platform purpose-built for the cement industry. It identifies workforce competency gaps, delivers personalized learning journeys, and provides an interactive AI assistant that gives employees instant access to technical knowledge, best practices, and operational guidance. By combining competency intelligence, institutional knowledge, and continuous assessment, SMARTCEM helps organizations accelerate workforce development, preserve critical expertise, and improve operational performance.",
        features: ["Competency Intelligence", "AI Learning Assistant", "10,000+ Knowledge Resources"],
        benefits: true,
        detailedBenefits: [
            {
                icon: LucideBadgeDollarSign,
                title: 'LOWER TRAINING COSTS',
                description: 'Reduce classroom, travel, and content development costs.',
                stat: '20-30%',
                statLabel: 'Cost Savings',
                color: '#3b82f6',
                accent: '#06b6d4',
            },
            {
                icon: Clock,
                title: 'FASTER TIME TO PROFICIENCY',
                description: 'Shorter ramp-up time for new hires and faster upskilling for existing teams.',
                stat: '30-50%',
                statLabel: 'Time Savings',
                color: '#8b5cf6',
                accent: '#ec4899',
            },
            {
                icon: CircleFadingArrowUp,
                title: 'IMPROVED PRODUCTIVITY',
                description: 'Higher CSAT, more resolutions and better quality with fewer resources.',
                stat: '15-25%',
                statLabel: 'Productivity Boost',
                color: '#f97316',
                accent: '#ef4444',
            },
            {
                icon: UserCheck,
                title: 'LOWER ATTRITION COST',
                description: 'Stronger engagement and growth opportunities lead to higher retention and lower hiring costs.',
                stat: '10-20%',
                statLabel: 'Attrition reduction',
                color: '#22c55e',
                accent: '#10b981',
            },
        ],
        Visual: WorkflowVisual,
        readMore: true
    },
    {
        id: "plant-platform",
        category: "Plant Intelligence",
        title: "AI-Powered Plant Intelligence",
        description:
            "Transform operational data into actionable intelligence. CEMTRIX connects production, energy, quality, maintenance, and business systems into a single AI-powered platform, delivering real-time KPI visibility, automated performance monitoring, and intelligent operational insights. By providing one source of truth across the entire plant, teams can make faster decisions, improve collaboration, and continuously optimize plant performance.",
        fullDescription: "Transform your raw plant data into actionable intelligence. This platform integrates directly with your existing SCADA and DCS systems to provide a unified view of your entire operation. Using predictive modeling, it analyzes energy consumption patterns and production bottlenecks, offering recommendations that can improve overall equipment effectiveness (OEE) by up to 15%.",
        features: ["Live Plant Data Integration", "AI-Driven Insights", "Real-Time KPI Monitoring"],
        benefits: true,
        detailedBenefits: [
            {
                icon: BarChart3,
                title: 'Production Intelligence',
                description: 'Improve production stability through continuous throughput and OEE optimization.',
                stat: '+3-8%',
                statLabel: 'Production Stability',
                color: '#3b82f6',
                accent: '#06b6d4',
            },
            {
                icon: Zap,
                title: 'Energy Intelligence',
                description: 'Optimize specific energy consumption with real-time power and heat performance insights.',
                stat: '5-12% Less',
                statLabel: 'Energy Consumption',
                color: '#8b5cf6',
                accent: '#ec4899',
            },
            {
                icon: Clock,
                title: 'Operational Intelligence',
                description: 'Gain real-time operational visibility with instant access to critical KPIs.',
                stat: '90% Faster',
                statLabel: 'KPI Access',
                color: '#f97316',
                accent: '#ef4444',
            },
            {
                icon: Brain,
                title: 'AI Decision Intelligence',
                description: 'Receive 24/7 AI-powered recommendations and operational insights for smarter decisions.',
                stat: '24/7',
                statLabel: 'AI Assistant',
                color: '#22c55e',
                accent: '#10b981',
            },
            {
                icon: Users,
                title: 'Performance Intelligence',
                description: 'Eliminate manual reporting with automated KPI dashboards and executive reports.',
                stat: '70% Less',
                statLabel: 'Manual Reporting',
                color: '#6366f1',
                accent: '#8b5cf6',
            },
            {
                icon: Scale,
                title: 'Executive Intelligence',
                description: 'Unify production, energy, quality, and maintenance into a single source of truth.',
                stat: 'One Platform',
                statLabel: 'Single Source of Truth',
                color: '#ec4899',
                accent: '#f43f5e',
            },
        ],
        Visual: AIAssistantVisual,
        readMore: true
    },
    {
        id: "condition-intelligence",
        category: "Predictive Maintenance",
        title: "Condition Intelligence",
        description: "Predict failures before they stop production.",
        fullDescription: "Move from reactive to proactive maintenance. Condition Intelligence continuously monitors critical assets and gives early warning of developing faults, so maintenance is planned on evidence, not the calendar — extending asset life and reducing emergency repairs.",
        features: [
            "Continuous condition monitoring of critical assets",
            "Early warning of developing faults",
            "Maintenance planned on evidence, not the calendar",
            "Longer asset life and fewer emergency repairs",
        ],
        featureLayout: "checklist",
        benefits: false,
        detailedBenefits: [
            {
                icon: Clock,
                title: 'Failure Prediction',
                description: 'Detect anomalies weeks before they lead to catastrophic failure.',
                stat: '3wks',
                statLabel: 'Lead Time',
                color: '#3b82f6',
                accent: '#06b6d4',
            },
            {
                icon: DollarSign,
                title: 'Cost Savings',
                description: 'Avoid emergency repairs and optimize your spare parts inventory.',
                stat: '-30%',
                statLabel: 'OPEX',
                color: '#8b5cf6',
                accent: '#ec4899',
            },
            {
                icon: BarChart3,
                title: 'Asset Reliability',
                description: 'Ensure critical machinery stays operational and efficient.',
                stat: '99.9%',
                statLabel: 'Reliability',
                color: '#f97316',
                accent: '#ef4444',
            },
            {
                icon: Brain,
                title: 'Smart Diagnosis',
                description: 'AI identifies the root cause of issues, not just symptoms.',
                stat: '95%',
                statLabel: 'Accuracy',
                color: '#22c55e',
                accent: '#10b981',
            },
            {
                icon: Users,
                title: 'Priority Insight',
                description: 'AI ranks assets by risk level to focus maintenance efforts.',
                stat: 'Top-Down',
                statLabel: 'Strategy',
                color: '#6366f1',
                accent: '#8b5cf6',
            },
            {
                icon: Scale,
                title: 'Full Coverage',
                description: 'Scalable monitoring from small motors to massive kilns.',
                stat: '10k+',
                statLabel: 'Assets',
                color: '#ec4899',
                accent: '#f43f5e',
            },
        ],
        Visual: ConditionIntelligenceVisual,
        readMore: false
    },
]
