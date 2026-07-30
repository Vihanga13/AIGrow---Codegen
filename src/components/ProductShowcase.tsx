import { motion } from 'motion/react';

export interface ShowcaseItem {
  image: string;
  title: string;
  desc: string;
}

/**
 * Auto-sliding product marquee. Cards scroll continuously and seamlessly
 * (the list is duplicated so the loop has no visible seam), pausing on hover.
 */
export default function ProductShowcase({ items }: { items: ShowcaseItem[] }) {
  const loop = [...items, ...items];

  return (
    <div className="group relative overflow-hidden">
      <motion.div
        className="flex gap-5 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: Math.max(30, items.length * 5), ease: 'linear', repeat: Infinity }}
        style={{ animationPlayState: 'running' }}
      >
        {loop.map((item, i) => (
          <div
            key={i}
            className="shrink-0 w-60 sm:w-72 glass rounded-3xl overflow-hidden flex flex-col"
          >
            <div className="relative h-40 flex items-center justify-center border-b border-gray-100 bg-gradient-to-br from-emerald-50 to-gray-100">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain p-5"
              />
            </div>
            <div className="p-5 flex flex-col gap-1.5 flex-1">
              <h3 className="font-sans text-sm font-bold text-gray-950 leading-snug">{item.title}</h3>
              <p className="font-sans text-xs text-gray-500 font-light leading-relaxed line-clamp-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
