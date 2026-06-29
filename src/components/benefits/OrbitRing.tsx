import { motion } from 'framer-motion';

interface OrbitRingProps {
  radius: number;
  duration: number;
  color: string;
  dotSize?: number;
}

export function OrbitRing({ radius, duration, color, dotSize = 4 }: OrbitRingProps) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        <circle
          cx={radius}
          cy={radius}
          r={radius - 1}
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.15"
        />
      </svg>
      <div
        className="absolute rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          top: 0,
          left: '50%',
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          backgroundColor: color,
          boxShadow: `0 0 12px ${color}`,
        }}
      />
    </motion.div>
  );
}
