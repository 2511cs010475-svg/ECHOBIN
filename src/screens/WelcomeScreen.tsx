import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Leaf, Trophy, Globe } from 'lucide-react'
import type { NavigateFn } from '../types'

interface Props { navigate: NavigateFn }

const slides = [
  {
    icon: Leaf,
    emoji: '🗑️',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.12)',
    title: 'Report Waste Instantly',
    desc: 'Snap a photo, pin the location, and submit a waste complaint in under 30 seconds. Our AI auto-detects the garbage type for you.',
  },
  {
    icon: Trophy,
    emoji: '🏆',
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.1)',
    title: 'Earn Green Rewards',
    desc: 'Every complaint earns you Green Coins. Climb the leaderboard, unlock badges, and redeem your coins for exciting coupons.',
  },
  {
    icon: Globe,
    emoji: '🌍',
    color: '#86efac',
    bg: 'rgba(134,239,172,0.08)',
    title: 'Build a Greener Future',
    desc: 'Join thousands of eco-warriors cleaning up our cities. Real-time tracking, collector assignment, and AI-powered resolution.',
  },
]

export default function WelcomeScreen({ navigate }: Props) {
  const [active, setActive] = useState(0)

  const next = () => {
    if (active < slides.length - 1) setActive(active + 1)
    else navigate('auth')
  }

  const s = slides[active]
  const Icon = s.icon

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #020b04 0%, #030f06 60%, #051408 100%)' }}
    >
      {/* Top skip */}
      <div className="flex justify-end px-6 pt-12">
        <button
          onClick={() => navigate('auth')}
          className="text-green-400/50 text-sm font-medium hover:text-green-400 transition-colors"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Skip →
        </button>
      </div>

      {/* Illustration area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center text-center"
          >
            {/* Icon circle */}
            <div
              className="w-40 h-40 rounded-full flex items-center justify-center mb-8 relative"
              style={{ background: s.bg, border: `1px solid ${s.color}30` }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-7xl">{s.emoji}</span>
              </motion.div>
              {/* Orbit dots */}
              {[0, 120, 240].map((deg, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: s.color,
                    opacity: 0.5,
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                  }}
                  animate={{ rotate: [deg, deg + 360] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear' }}
                  // eslint-disable-next-line
                  // @ts-ignore
                  initial={{ rotate: deg, translateX: 72, translateY: -4 }}
                />
              ))}
            </div>

            <h2
              className="text-3xl font-bold mb-4 text-white leading-tight"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {s.title}
            </h2>
            <p className="text-green-300/60 text-sm leading-relaxed max-w-xs">
              {s.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            animate={{ width: i === active ? 24 : 6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="h-1.5 rounded-full"
            style={{ background: i === active ? '#22c55e' : 'rgba(34,197,94,0.25)' }}
          />
        ))}
      </div>

      {/* CTAs */}
      <div className="px-6 pb-10 flex flex-col gap-3">
        <button
          onClick={next}
          className="w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
          style={{
            fontFamily: 'Outfit, sans-serif',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: '#052e16',
            boxShadow: '0 8px 32px rgba(34,197,94,0.35)',
          }}
        >
          {active < slides.length - 1 ? (
            <>Continue <ChevronRight size={18} /></>
          ) : (
            <>Get Started <ChevronRight size={18} /></>
          )}
        </button>

        <button
          onClick={() => navigate('auth')}
          className="w-full py-3 rounded-2xl text-sm text-green-400/70 hover:text-green-400 transition-colors font-medium"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Already have an account? <span className="text-green-400">Login</span>
        </button>
      </div>
    </div>
  )
}
