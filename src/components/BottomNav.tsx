import { motion } from 'framer-motion'
import { Home, PlusCircle, MapPin, Trophy, User } from 'lucide-react'
import type { Screen, NavigateFn } from '../types'

interface Props {
  current: Screen
  navigate: NavigateFn
}

const tabs = [
  { id: 'home' as Screen, icon: Home, label: 'Home' },
  { id: 'report' as Screen, icon: PlusCircle, label: 'Report' },
  { id: 'complaints' as Screen, icon: MapPin, label: 'Track' },
  { id: 'rewards' as Screen, icon: Trophy, label: 'Rewards' },
  { id: 'profile' as Screen, icon: User, label: 'Profile' },
]

export default function BottomNav({ current, navigate }: Props) {
  return (
    <div
      className="fixed bottom-0 left-1/2 w-full max-w-[430px] z-50"
      style={{ transform: 'translateX(-50%)' }}
    >
      <div
        className="mx-3 mb-3 rounded-2xl px-2 py-2 flex items-center justify-around"
        style={{
          background: 'rgba(5, 20, 8, 0.85)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(34,197,94,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        {tabs.map((tab) => {
          const isActive = current === tab.id
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id)}
              className="relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all duration-200"
              style={{ minWidth: 56 }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'rgba(34,197,94,0.15)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                className="relative z-10 transition-colors duration-200"
                style={{ color: isActive ? '#4ade80' : 'rgba(134,239,172,0.4)' }}
              />
              <span
                className="relative z-10 text-[10px] font-medium transition-colors duration-200"
                style={{
                  color: isActive ? '#4ade80' : 'rgba(134,239,172,0.35)',
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
