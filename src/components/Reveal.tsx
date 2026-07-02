import { ReactNode } from 'react';
import { motion } from 'motion/react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  /** Slide-in direction. Default 'up'. */
  direction?: Direction;
  /** Stagger delay in seconds. Default 0. */
  delay?: number;
  /** Animation duration in seconds. Default 0.6. */
  duration?: number;
  className?: string;
}

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 }
};

/**
 * Lightweight scroll-reveal wrapper. Fades + slides children into view once,
 * when they scroll near the viewport. Reuses the easing curve used across HomeView.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className
}: RevealProps) {
  const { x, y } = OFFSET[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
