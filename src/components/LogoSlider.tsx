import { motion } from 'framer-motion';

const logos = [
  { name: 'Logoipsum', icon: '◆' },
  { name: 'Logoipsum', icon: '✻' },
  { name: 'Logoipsum', icon: '🛡' },
  { name: 'Logoipsum', icon: '●●' },
  { name: 'Logoipsum', icon: '▲' },
  { name: 'Logoipsum', icon: '✦' },
];

export function LogoSlider() {
  return (
    <div className="relative w-full overflow-hidden py-8 mb-16">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-dark to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-dark to-transparent z-10" />
      
      <div className="flex items-center justify-center mb-6">
        <span className="text-sm text-gray-500 font-medium">Over 50+ business trust us</span>
      </div>

      <div className="group relative flex overflow-hidden">
        <motion.div
          className="flex gap-16 items-center whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          whileHover={{
            transition: {
              x: {
                duration: 60, // Slower on hover
              },
            },
          }}
        >
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-default">
              <span className="text-xl">{logo.icon}</span>
              <span className="font-semibold text-lg">{logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
