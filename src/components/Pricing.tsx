import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../utils/cn';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 999,
    annualPrice: 799,
    priceLabel: undefined as string | undefined,
    description: 'Perfect for small businesses getting started with AI automation',
    features: ['5 Automation Workflows', 'Basic AI Assistant', 'Email Support', 'Monthly Reports', 'Up to 1,000 Tasks/mo'],
    popular: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 2499,
    annualPrice: 1999,
    priceLabel: undefined as string | undefined,
    description: 'Ideal for growing businesses ready to scale automation',
    features: ['Unlimited Workflows', 'Advanced AI Assistant', 'Priority Support', 'Weekly Analytics', 'Up to 10,000 Tasks/mo', 'Custom Integrations', 'Team Training'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: null as number | null,
    annualPrice: null as number | null,
    priceLabel: 'Custom',
    description: 'Tailored solutions for large organizations with complex needs',
    features: ['Everything in Pro', 'Dedicated Account Manager', '24/7 Phone Support', 'Real-time Dashboards', 'Unlimited Tasks', 'Custom AI Development', 'On-premise Options', 'SLA Guarantee'],
    popular: false,
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-dark via-dark-light to-dark" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.span variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-wider">
            Pricing
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            <span className="text-white">The Best AI Automation,</span>
            <br />
            <span className="gradient-text">at the Right Price</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Choose a plan that fits your business needs and start automating with AI
          </motion.p>

          {/* Toggle */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white/5 border border-white/10"
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer',
                !isAnnual ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white',
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 cursor-pointer',
                isAnnual ? 'bg-linear-to-r from-primary to-secondary text-white' : 'text-gray-400 hover:text-white',
              )}
            >
              Annually
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">Save 20%</span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={scaleIn}
              whileHover={{ y: -10 }}
              className={cn(
                'relative p-8 rounded-3xl border transition-all duration-500',
                plan.popular
                  ? 'bg-linear-to-b from-primary/20 to-secondary/20 border-primary/50 glow-sm'
                  : 'bg-dark-card/50 backdrop-blur-sm border-white/10',
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-linear-to-r from-primary to-secondary text-white text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  {plan.priceLabel ? (
                    <span className="text-5xl font-bold gradient-text">{plan.priceLabel}</span>
                  ) : (
                    <>
                      <span className="text-5xl font-bold gradient-text">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-500">/month</span>
                    </>
                  )}
                </div>
                {plan.monthlyPrice && (
                  <p className="text-sm text-gray-500 mt-2">{isAnnual ? 'Billed annually' : 'Billed monthly'}</p>
                )}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400 shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'block w-full text-center py-4 rounded-full font-semibold transition-all cursor-pointer',
                  plan.popular
                    ? 'bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                    : 'bg-white/10 text-white hover:bg-white/20',
                )}
              >
                Get Started
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
