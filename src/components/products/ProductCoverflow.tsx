import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Cpu, Activity, Droplet } from 'lucide-react';
import { Product } from '../../types';

const CAT_ICON: Record<Product['category'], typeof Cpu> = {
  environmental: Cpu,
  resource: Activity,
  irrigation: Droplet
};

interface ProductCoverflowProps {
  products: Product[];
  initialActive?: number;
  onOpen: (product: Product) => void;
}

export default function ProductCoverflow({ products, initialActive = 0, onOpen }: ProductCoverflowProps) {
  const [active, setActive] = useState(initialActive);
  const len = products.length;
  const prev = () => setActive((a) => (a - 1 + len) % len);
  const next = () => setActive((a) => (a + 1) % len);
  const activeP = products[active];

  if (len === 0) return null;

  return (
    <div className="w-full select-none">
      {/* Stage */}
      <div
        className="relative h-[380px] sm:h-[420px] flex items-center justify-center overflow-hidden"
        style={{ perspective: 1400 }}
      >
        {products.map((p, idx) => {
          const offset = idx - active;
          const abs = Math.abs(offset);
          const visible = abs <= 2;
          const Icon = CAT_ICON[p.category];
          const isCenter = offset === 0;
          return (
            <motion.button
              key={p.id}
              onClick={() => (isCenter ? onOpen(p) : setActive(idx))}
              aria-label={p.name}
              animate={{
                x: offset * 205,
                rotateY: offset * -34,
                scale: isCenter ? 1 : 0.82 - (abs - 1) * 0.05,
                opacity: visible ? (isCenter ? 1 : 0.68) : 0
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 26 }}
              style={{ zIndex: 30 - abs, transformStyle: 'preserve-3d', pointerEvents: visible ? 'auto' : 'none' }}
              className="absolute w-[248px] sm:w-[268px]"
            >
              <div className={`h-[350px] rounded-3xl overflow-hidden border bg-white text-left shadow-2xl flex flex-col transition-colors ${isCenter ? 'border-emerald-300 ring-2 ring-emerald-400/40' : 'border-gray-100'}`}>
                {/* Header */}
                <div className="relative h-36 bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_100%_0%,rgba(255,255,255,0.25),transparent_60%)]" />
                  <Icon className="relative h-16 w-16 text-white/95 drop-shadow" />
                  {p.price && (
                    <span className="absolute top-3 right-3 rounded-lg bg-white/20 backdrop-blur-sm px-2.5 py-1 font-mono text-xs font-bold text-white">{p.price}</span>
                  )}
                </div>
                {/* Body */}
                <div className="flex-1 p-5 flex flex-col">
                  <h3 className="font-sans text-base font-bold text-gray-950 leading-snug">{p.name}</h3>
                  <p className="font-sans text-xs italic text-emerald-700 font-medium mt-1 line-clamp-1">"{p.catchphrase}"</p>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {p.specs.slice(0, 2).map((s, i) => (
                      <div key={i} className="flex justify-between gap-2 text-[10px]">
                        <span className="font-mono text-gray-400 uppercase tracking-wide truncate">{s.label}</span>
                        <span className="font-mono text-gray-700 font-medium text-right truncate">{s.value}</span>
                      </div>
                    ))}
                  </div>
                  {isCenter && (
                    <span className="mt-auto flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      Open product <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button onClick={prev} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full glass text-gray-600 hover:text-emerald-600 transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1.5">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === active ? 'w-7 bg-emerald-600' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
        <button onClick={next} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full glass text-gray-600 hover:text-emerald-600 transition-colors">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Active info */}
      <div className="text-center mt-5 max-w-lg mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-widest text-emerald-600 font-bold">{activeP.categoryLabel}</p>
        <h3 className="font-sans text-xl md:text-2xl font-bold text-gray-950 mt-1">{activeP.name}</h3>
        <p className="font-sans text-sm text-gray-500 font-light mt-1.5 line-clamp-2">{activeP.description}</p>
      </div>
    </div>
  );
}
