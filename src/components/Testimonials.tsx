import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

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

const testimonials = [
  {
    id: '1',
    quote: 'AI automation transformed our operations by eliminating repetitive tasks and improving efficiency. Scaling our workflow has never been easier!',
    author: 'James Carter',
    role: 'CEO at TechFlow Solutions',
    image: 'https://framerusercontent.com/images/Ja6vnrdyxR6DoP2iS9CRMnsQXSo.jpg',
    rating: 5,
  },
  {
    id: '2',
    quote: 'With AI, we cut manual work and improved accuracy. Our team now focuses on high-impact tasks while automation handles the rest!',
    author: 'Sophia Martinez',
    role: 'Operations Manager at NexaCorp',
    image: 'https://framerusercontent.com/images/prJVkx4ybEf6YSyZs9EZDABPto.jpg',
    rating: 5,
  },
  {
    id: '3',
    quote: 'AI-driven insights doubled our sales efficiency. We now engage leads at the right time with smarter, data-backed decisions!',
    author: 'David Reynolds',
    role: 'Head of Sales at GrowthPeak',
    image: 'https://framerusercontent.com/images/HDIEzwzzph6mZtBFYG3fS721U.jpg',
    rating: 5,
  },
  {
    id: '4',
    quote: 'Customer support is now seamless. Our response time improved drastically, and satisfaction levels are at an all-time high, thanks to CEMTRIX',
    author: 'Emily Wong',
    role: 'Customer Success Lead at SupportHive',
    image: 'https://framerusercontent.com/images/Ja6vnrdyxR6DoP2iS9CRMnsQXSo.jpg',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 relative">
      <div className="absolute inset-0 grid-pattern" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span variants={fadeInUp} className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            <span className="text-white">Why Businesses Love</span>
            <br />
            <span className="gradient-text">Our AI Solutions</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real businesses, real results with AI automation.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={scaleIn}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-dark-card/50 backdrop-blur-sm border border-white/10"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="text-white font-semibold">{t.author}</p>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
