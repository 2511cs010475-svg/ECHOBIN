import { motion } from 'framer-motion'
import { Settings, ChevronRight, LogOut, BookOpen, Calendar, BarChart2, Award, Edit3 } from 'lucide-react'
import type { NavigateFn } from '../types'

interface Props { navigate: NavigateFn }

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(34,197,94,0.12)',
  backdropFilter: 'blur(12px)',
}

const badges = [
  { icon: '🌱', name: 'Green Starter', earned: true },
  { icon: '♻️', name: 'Recycler', earned: true },
  { icon: '🏅', name: 'Eco Warrior', earned: true },
  { icon: '⚡', name: 'Speed Reporter', earned: true },
  { icon: '🔥', name: '7-Day Streak', earned: false },
  { icon: '👑', name: 'Top Citizen', earned: false },
]

const activity = [
  { icon: '📋', text: 'Filed complaint ECB-2024-0091', time: '2 hours ago', coins: '+50' },
  { icon: '✅', text: 'Complaint ECB-2024-0088 resolved', time: '1 day ago', coins: '+75' },
  { icon: '🎁', text: 'Redeemed Zomato voucher', time: '3 days ago', coins: '-500' },
  { icon: '🌱', text: 'Attended Tree Plantation Event', time: '5 days ago', coins: '+200' },
  { icon: '🏆', text: 'Reached Eco Warrior badge', time: '2 weeks ago', coins: '+100' },
]

const menuItems = [
  { icon: BookOpen, label: 'Recycling Guide', screen: 'guide', color: '#22c55e' },
  { icon: Calendar, label: 'Events', screen: 'events', color: '#4ade80' },
  { icon: BarChart2, label: 'Admin Dashboard', screen: 'admin', color: '#8b5cf6' },
  { icon: Settings, label: 'Settings', screen: 'settings', color: '#94a3b8' },
]

export default function ProfileScreen({ navigate }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen overflow-y-auto pb-24"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>My Profile</h1>
        <button onClick={() => navigate('settings')} className="text-green-400/60 hover:text-green-400">
          <Settings size={20} />
        </button>
      </div>

      {/* Profile hero */}
      <div className="px-4 mb-5">
        <div
          className="relative overflow-hidden rounded-3xl p-5"
          style={{
            background: 'linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(16,185,129,0.08) 100%)',
            border: '1px solid rgba(34,197,94,0.2)',
          }}
        >
          {/* Orb */}
          <div className="absolute right-0 top-0 w-40 h-40 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #22c55e, transparent)', transform: 'translate(40%, -40%)' }} />

          <div className="flex items-center gap-4 relative z-10">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: 'linear-gradient(135deg, #0d2e14, #1a5c35)', border: '2px solid rgba(34,197,94,0.35)' }}
              >
                👨‍💻
              </div>
              <button
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: '#22c55e' }}
              >
                <Edit3 size={10} className="text-white" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Arjun Mehta</h2>
              <p className="text-green-400/60 text-sm">arjun.mehta@email.com</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(34,197,94,0.2)', color: '#4ade80' }}>
                  Level 8
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>
                  Eco Warrior 🏅
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(34,197,94,0.12)' }}>
            {[
              { label: 'Complaints', value: '47' },
              { label: 'KG Collected', value: '234' },
              { label: 'Green Coins', value: '3,240' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</p>
                <p className="text-green-400/50 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress to next level */}
      <div className="px-4 mb-5">
        <div className="p-4 rounded-2xl" style={glass}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white font-medium">Level Progress</span>
            <span className="text-green-400/60 text-xs">3,240 / 4,000 XP</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden mb-1" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '81%' }}
              transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #22c55e, #4ade80)' }}
            />
          </div>
          <p className="text-green-400/40 text-xs">760 XP to Level 9</p>
        </div>
      </div>

      {/* Badges */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-green-300/70" style={{ fontFamily: 'Outfit, sans-serif' }}>BADGES</h3>
          <button onClick={() => navigate('rewards')} className="text-green-400/60 text-xs hover:text-green-400">See all →</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {badges.map((b) => (
            <div
              key={b.name}
              className="flex flex-col items-center gap-1.5 flex-shrink-0"
              style={{ opacity: b.earned ? 1 : 0.35 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{
                  background: b.earned ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.03)',
                  border: b.earned ? '1px solid rgba(34,197,94,0.25)' : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {b.earned ? b.icon : '🔒'}
              </div>
              <span className="text-[9px] text-green-300/60 text-center leading-tight max-w-[48px]">{b.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity timeline */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-green-300/70" style={{ fontFamily: 'Outfit, sans-serif' }}>ACTIVITY</h3>
          <Award size={14} className="text-green-400/40" />
        </div>
        <div className="flex flex-col gap-2">
          {activity.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={glass}
            >
              <span className="text-xl">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{a.text}</p>
                <p className="text-green-400/40 text-xs">{a.time}</p>
              </div>
              <span
                className="text-xs font-semibold"
                style={{ color: a.coins.startsWith('+') ? '#4ade80' : '#f87171' }}
              >
                {a.coins} 🪙
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="px-4 mb-5">
        <h3 className="text-sm font-semibold text-green-300/70 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>NAVIGATE</h3>
        <div className="rounded-2xl overflow-hidden" style={glass}>
          {menuItems.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate(item.screen as any)}
                className="w-full flex items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-white/[0.03]"
                style={{ borderBottom: i < menuItems.length - 1 ? '1px solid rgba(34,197,94,0.07)' : 'none' }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15` }}>
                  <Icon size={16} style={{ color: item.color }} />
                </div>
                <span className="flex-1 text-sm text-white font-medium">{item.label}</span>
                <ChevronRight size={14} className="text-green-400/30" />
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Location & contact */}
      <div className="px-4 mb-5">
        <div className="p-4 rounded-2xl" style={glass}>
          <h3 className="text-sm font-semibold text-white mb-3">Account Details</h3>
          {[
            { label: 'Location', value: 'Sector 12, Pune - 411001' },
            { label: 'Phone', value: '+91 98765 43210' },
            { label: 'Member Since', value: 'March 2024' },
            { label: 'Role', value: 'Citizen · Volunteer' },
          ].map((d) => (
            <div key={d.label} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid rgba(34,197,94,0.06)' }}>
              <span className="text-green-400/50 text-xs">{d.label}</span>
              <span className="text-white text-xs font-medium">{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-4">
        <button
          onClick={() => navigate('auth')}
          className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold transition-all"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </motion.div>
  )
}
