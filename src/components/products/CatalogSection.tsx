import { useMemo, useState } from 'react';
import { ChevronDown, Leaf, Search } from 'lucide-react';
import { CatalogItem } from '../../data';
import Reveal from '../Reveal';

interface CatalogSectionProps {
  title: string;
  subtitle: string;
  items: CatalogItem[];
  groups: readonly string[];
  /** Cards rendered before the "Show all" control appears. */
  initialCount?: number;
  /** Renders a name search box — worth it once the list runs long. */
  searchable?: boolean;
  /** Image credit line, required by the licence of any sourced photography. */
  attribution?: string;
}

/** Lettered tile for items the database has no photograph for yet. */
function Placeholder({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-200/60">
      <span className="font-sans text-3xl font-black text-emerald-600/50">{name.charAt(0)}</span>
      <Leaf className="absolute bottom-2 right-2 h-4 w-4 text-emerald-500/40" />
    </div>
  );
}

function CatalogCard({ item }: { item: CatalogItem }) {
  const [open, setOpen] = useState(false);
  const hasVariants = !!item.variants?.length;

  return (
    <div className="group glass rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5">
      <div className="relative h-32 sm:h-36 overflow-hidden bg-emerald-50">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Placeholder name={item.name} />
        )}
        {item.unitRate && (
          <span className="absolute top-2 left-2 rounded-md bg-white/85 backdrop-blur-sm px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
            {item.unitRate}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-sans text-sm font-bold text-gray-950 leading-snug">{item.name}</h3>

        {item.spec && (
          <p className="font-sans text-[11px] text-gray-500 font-light leading-relaxed">{item.spec}</p>
        )}

        <span className="mt-auto pt-2 font-mono text-sm font-bold text-emerald-600">{item.price}</span>

        {hasVariants && (
          <>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="mt-1 inline-flex items-center gap-1 self-start font-sans text-[11px] font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              {item.variants!.length} {item.variants!.length === 1 ? 'size' : 'options'}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <div className="mt-1 flex flex-col divide-y divide-gray-100 border-t border-gray-100">
                {item.variants!.map((v, i) => (
                  <div key={i} className="flex flex-col gap-0.5 py-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-[11px] text-gray-500">{v.label}</span>
                      <span className="font-mono text-[11px] font-bold text-gray-800">{v.price}</span>
                    </div>
                    {v.note && (
                      <span className="font-mono text-[10px] text-gray-400 leading-relaxed">{v.note}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function CatalogSection({
  title,
  subtitle,
  items,
  groups,
  initialCount = 12,
  searchable = false,
  attribution
}: CatalogSectionProps) {
  const [group, setGroup] = useState('all');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) =>
        (group === 'all' || i.group === group) &&
        (!q || i.name.toLowerCase().includes(q) || i.spec?.toLowerCase().includes(q))
    );
  }, [items, group, query]);

  const visible = expanded ? filtered : filtered.slice(0, initialCount);
  const hidden = filtered.length - visible.length;

  return (
    <section className="mb-16">
      <Reveal className="mb-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-gray-950">{title}</h2>
            <p className="font-sans text-sm text-gray-500 font-light mt-1 max-w-2xl">{subtitle}</p>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
            {filtered.length} of {items.length} items
          </span>
        </div>
      </Reveal>

      {/* Group filters + search */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => { setGroup('all'); setExpanded(false); }}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
            group === 'all' ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/15' : 'glass text-gray-600 hover:text-gray-900'
          }`}
        >
          All
        </button>
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => { setGroup(g); setExpanded(false); }}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              group === g ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/15' : 'glass text-gray-600 hover:text-gray-900'
            }`}
          >
            {g}
          </button>
        ))}

        {searchable && (
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setExpanded(false); }}
              placeholder="Search items…"
              className="glass rounded-lg py-1.5 pl-8 pr-3 font-sans text-xs text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-500/30 w-44"
            />
          </div>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="glass rounded-2xl p-6 font-sans text-sm text-gray-500 font-light">
          No items match that search.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {visible.map((item, idx) => (
            <Reveal key={item.id} delay={(idx % 4) * 0.05}>
              <CatalogCard item={item} />
            </Reveal>
          ))}
        </div>
      )}

      {hidden > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setExpanded(true)}
            className="glass rounded-xl px-5 py-2.5 font-sans text-xs font-bold text-gray-700 hover:text-gray-900 transition-all"
          >
            Show all {filtered.length} items
          </button>
        </div>
      )}

      {attribution && (
        <p className="mt-6 font-sans text-[10px] text-gray-400 font-light leading-relaxed">
          {attribution}
        </p>
      )}
    </section>
  );
}
