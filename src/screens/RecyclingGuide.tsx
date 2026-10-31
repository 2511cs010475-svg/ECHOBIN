import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, BookOpen, ChevronDown } from 'lucide-react'
import type { NavigateFn } from '../types'

interface Props { navigate: NavigateFn }

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(34,197,94,0.12)',
  backdropFilter: 'blur(12px)',
}

const categories = [
  { id: 'all', label: 'All', icon: '♻️' },
  { id: 'plastic', label: 'Plastic', icon: '🧴' },
  { id: 'paper', label: 'Paper', icon: '📄' },
  { id: 'glass', label: 'Glass', icon: '🍶' },
  { id: 'metal', label: 'Metal', icon: '🔩' },
  { id: 'ewaste', label: 'E-Waste', icon: '💻' },
  { id: 'organic', label: 'Organic', icon: '🌿' },
  { id: 'hazardous', label: 'Hazardous', icon: '☢️' },
]

const guides = [
  {
    id: 'plastic', icon: '🧴', title: 'Plastic Waste', category: 'plastic',
    color: '#3b82f6', tag: 'Recyclable',
    steps: ['Rinse containers to remove food residue', 'Check the recycling number (1-7) on the bottom', 'Separate by type if possible', 'Flatten bottles to save space', 'Drop at nearest plastic recycling point'],
    tip: 'PET (#1) and HDPE (#2) plastics are most widely recycled. Avoid #6 (polystyrene).',
    impact: 'Recycling 1 ton of plastic saves 2 tons of CO₂',
  },
  {
    id: 'paper', icon: '📄', title: 'Paper & Cardboard', category: 'paper',
    color: '#d97706', tag: 'Recyclable',
    steps: ['Remove plastic windows from envelopes', 'Flatten cardboard boxes', 'Keep paper dry — wet paper cannot be recycled', 'Remove staples and tape where possible', 'Bundle newspapers for easy collection'],
    tip: 'Shredded paper is harder to recycle. Use it as compost or packing material instead.',
    impact: 'Recycling 1 ton of paper saves 17 trees',
  },
  {
    id: 'glass', icon: '🍶', title: 'Glass Waste', category: 'glass',
    color: '#06b6d4', tag: 'Recyclable',
    steps: ['Rinse bottles and jars', 'Remove metal lids (recycle separately)', 'Do NOT include light bulbs or window glass', 'Separate by color if required by your locality', 'Use drop-off bins for glass'],
    tip: 'Glass can be recycled endlessly without losing quality.',
    impact: 'Recycling glass saves 30% of energy vs new production',
  },
  {
    id: 'ewaste', icon: '💻', title: 'Electronic Waste', category: 'ewaste',
    color: '#8b5cf6', tag: 'Hazardous',
    steps: ['Never throw e-waste in regular bins', 'Remove personal data from old devices', 'Use authorized e-waste collection centers', 'Look for manufacturer take-back programs', 'Donate working devices to charities'],
    tip: 'E-waste contains valuable metals like gold and copper, but also toxic lead and mercury.',
    impact: 'Recycling 1 million phones recovers 16 kg of gold',
  },
  {
    id: 'organic', icon: '🌿', title: 'Organic / Food Waste', category: 'organic',
    color: '#22c55e', tag: 'Compostable',
    steps: ['Start a home compost bin', 'Use green bins provided by municipality', 'Separate wet and dry waste', 'Avoid mixing food with plastic bags', 'Apply compost to plants or community gardens'],
    tip: 'Food waste in landfills produces methane — 25x more potent than CO₂.',
    impact: 'Composting 1 ton diverts 1 ton of methane-producing waste',
  },
  {
    id: 'metal', icon: '🔩', title: 'Metal Waste', category: 'metal',
    color: '#94a3b8', tag: 'Recyclable',
    steps: ['Rinse food cans thoroughly', 'Crush aluminum cans to save space', 'Keep lids attached or place inside', 'Separate ferrous (magnetic) from non-ferrous metals', 'Visit scrap dealers or metal recycling plants'],
    tip: 'Aluminum is infinitely recyclable. A can can be back on shelves in 60 days.',
    impact: 'Recycling aluminum uses 95% less energy than making new aluminum',
  },
]

export default function RecyclingGuide({ navigate }: Props) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = guides.filter((g) => {
    const matchesCat = cat === 'all' || g.category === cat
    const matchesSearch = !search || g.title.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen overflow-y-auto pb-24"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <button onClick={() => navigate('home')} className="text-green-400/60 hover:text-green-400">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-white flex-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Recycling Guide</h1>
        <BookOpen size={20} className="text-green-400/60" />
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={glass}
        >
          <Search size={15} className="text-green-400/40" />
          <input
            type="text"
            placeholder="Search waste type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-green-50"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-green-400/40 hover:text-green-400 text-xs">✕</button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className="mb-5">
        <div className="flex gap-2 overflow-x-auto px-4 pb-1" style={{ scrollbarWidth: 'none' }}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex-shrink-0"
              style={{
                background: cat === c.id ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.04)',
                border: cat === c.id ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(34,197,94,0.1)',
                color: cat === c.id ? '#4ade80' : 'rgba(134,239,172,0.5)',
              }}
            >
              <span>{c.icon}</span>
              <span className="font-medium">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Top tip banner */}
      <div className="px-4 mb-5">
        <div
          className="p-4 rounded-2xl"
          style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.18)' }}
        >
          <p className="text-green-300/80 text-xs leading-relaxed">
            🌿 <span className="font-semibold">Did you know?</span> India generates 62 million tonnes of waste annually. Only 43 million tonnes is collected and just 12 million is treated. You can change this!
          </p>
        </div>
      </div>

      {/* Guides */}
      <div className="px-4 flex flex-col gap-3">
        <AnimatePresence>
          {filtered.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl overflow-hidden"
              style={glass}
            >
              <button
                onClick={() => setExpanded(expanded === g.id ? null : g.id)}
                className="w-full p-4 flex items-center gap-3 text-left"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${g.color}15` }}
                >
                  {g.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">{g.title}</p>
                  <p className="text-green-400/40 text-xs mt-0.5">{g.impact}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ color: g.color, background: `${g.color}18` }}
                  >
                    {g.tag}
                  </span>
                  <motion.div animate={{ rotate: expanded === g.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} className="text-green-400/40" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {expanded === g.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <div
                        className="p-4 rounded-xl"
                        style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(34,197,94,0.08)' }}
                      >
                        <p className="text-xs font-semibold text-green-300/60 mb-3 uppercase tracking-wider">How to Recycle</p>
                        {g.steps.map((step, si) => (
                          <div key={si} className="flex items-start gap-2.5 mb-2.5 last:mb-0">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                              style={{ background: `${g.color}20`, color: g.color }}
                            >
                              {si + 1}
                            </div>
                            <p className="text-green-200/70 text-sm leading-snug">{step}</p>
                          </div>
                        ))}
                        <div
                          className="mt-3 p-3 rounded-lg"
                          style={{ background: `${g.color}10`, border: `1px solid ${g.color}20` }}
                        >
                          <p className="text-xs" style={{ color: g.color }}>
                            💡 {g.tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <span className="text-5xl mb-4">🔍</span>
            <p className="text-green-300/50 text-sm">No guides found for "{search}"</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
