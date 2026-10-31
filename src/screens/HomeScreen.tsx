import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell, Search, PlusCircle, MapPin, Recycle, Calendar,
  ChevronRight, Flame, Droplets, Wind, TrendingUp, Award
} from 'lucide-react'
import type { NavigateFn } from '../types'

interface Props { navigate: NavigateFn }

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(34,197,94,0.12)',
  backdropFilter: 'blur(12px)',
}

const statusColors: Record<string, string> = {
  Submitted: '#3b82f6',
  Verified: '#8b5cf6',
  Assigned: '#f59e0b',
  'In Progress': '#f97316',
  Completed: '#22c55e',
  Rejected: '#ef4444',
}

const complaints = [
  { id: 'ECB-2024-0091', type: 'Plastic Waste', loc: 'Sector 12, Pune', status: 'In Progress', ago: '2h ago', icon: '🧴' },
  { id: 'ECB-2024-0088', type: 'Mixed Waste', loc: 'MG Road, Pune', status: 'Completed', ago: '1d ago', icon: '🗑️' },
  { id: 'ECB-2024-0085', type: 'E-Waste', loc: 'Koregaon Park', status: 'Verified', ago: '2d ago', icon: '💻' },
]

const leaderboard = [
  { rank: 1, name: 'Priya Sharma', coins: 4820, avatar: '👩', badge: '🥇' },
  { rank: 2, name: 'Rahul Patil', coins: 4210, avatar: '👨', badge: '🥈' },
  { rank: 3, name: 'Ananya Singh', coins: 3890, avatar: '👩', badge: '🥉' },
  { rank: 4, name: 'Arjun Mehta', coins: 3240, avatar: '👨‍💻', badge: '🏅' },
  { rank: 5, name: 'Sneha Kulkarni', coins: 2980, avatar: '👩‍🎓', badge: '🏅' },
]

const quickActions = [
  { icon: PlusCircle, label: 'Report Waste', color: '#22c55e', bg: 'rgba(34,197,94,0.12)', screen: 'report' },
  { icon: MapPin, label: 'Track', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', screen: 'complaints' },
  { icon: Recycle, label: 'Recycle Guide', color: '#86efac', bg: 'rgba(134,239,172,0.08)', screen: 'guide' },
  { icon: Calendar, label: 'Events', color: '#a7f3d0', bg: 'rgba(167,243,208,0.07)', screen: 'events' },
]

const tips = [
  { icon: Droplets, text: 'Rinse plastic containers before recycling to avoid contamination.' },
  { icon: Flame, text: 'Composting food waste reduces methane emissions from landfills by 50%.' },
  { icon: Wind, text: 'One recycled aluminum can saves enough energy to power a TV for 3 hours.' },
]

const events = [
  { title: 'Campus Cleanup Drive', date: 'Jul 20, 2024', loc: 'FC Road, Pune', tag: 'Volunteer', color: '#22c55e' },
  { title: 'Tree Plantation Day', date: 'Jul 28, 2024', loc: 'Baner Hills', tag: 'Community', color: '#4ade80' },
]

export default function HomeScreen({ navigate }: Props) {
  const [tipIdx] = useState(0)
  const tip = tips[tipIdx]
  const TipIcon = tip.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen overflow-y-auto pb-24 px-4 pt-4"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-5 pt-2">
        <div>
          <p className="text-green-400/50 text-xs font-medium tracking-wide">GOOD MORNING</p>
          <h2 className="text-xl font-bold text-white leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Arjun Mehta 🌿
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center relative"
            style={glass}
          >
            <Bell size={16} className="text-green-400/70" />
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-green-400" />
          </button>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #0d2e14, #1a5c35)', border: '1px solid rgba(34,197,94,0.3)' }}
            onClick={() => navigate('profile')}
          >
            👨‍💻
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5"
        style={glass}
      >
        <Search size={15} className="text-green-400/40" />
        <span className="text-green-300/30 text-sm">Search complaints, guides, events...</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {[
          { label: 'Complaints', value: '47', icon: '📋', trend: '+3 this week' },
          { label: 'KG Collected', value: '234', icon: '♻️', trend: '+12 kg today' },
          { label: 'Green Coins', value: '3,240', icon: '🪙', trend: 'Level 8' },
        ].map((s) => (
          <motion.div
            key={s.label}
            whileTap={{ scale: 0.97 }}
            className="p-3 rounded-2xl"
            style={glass}
          >
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="text-lg font-bold text-white leading-none" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {s.value}
            </div>
            <div className="text-green-400/50 text-[9px] mt-0.5 leading-tight">{s.label}</div>
            <div className="text-green-400/40 text-[9px] mt-1">{s.trend}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-green-300/70 mb-3 px-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
          QUICK ACTIONS
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((a) => {
            const Icon = a.icon
            return (
              <motion.button
                key={a.label}
                whileTap={{ scale: 0.93 }}
                onClick={() => navigate(a.screen as any)}
                className="flex flex-col items-center gap-2 py-4 rounded-2xl transition-all"
                style={{ background: a.bg, border: `1px solid ${a.color}20` }}
              >
                <Icon size={22} style={{ color: a.color }} />
                <span className="text-[10px] font-medium text-green-200/70 leading-tight text-center">{a.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Recent Complaints */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-semibold text-green-300/70" style={{ fontFamily: 'Outfit, sans-serif' }}>
            RECENT COMPLAINTS
          </h3>
          <button onClick={() => navigate('complaints')} className="text-green-400/60 text-xs flex items-center gap-1 hover:text-green-400">
            View all <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {complaints.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate('complaints')}
              className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer hover:bg-white/[0.05] transition-all"
              style={glass}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'rgba(34,197,94,0.1)' }}
              >
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium leading-tight truncate">{c.type}</p>
                <p className="text-green-400/50 text-[11px] truncate">{c.loc}</p>
                <p className="text-green-400/30 text-[10px]">{c.id} · {c.ago}</p>
              </div>
              <div>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ color: statusColors[c.status], background: `${statusColors[c.status]}20` }}
                >
                  {c.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-semibold text-green-300/70" style={{ fontFamily: 'Outfit, sans-serif' }}>
            🏆 LEADERBOARD
          </h3>
          <button onClick={() => navigate('rewards')} className="text-green-400/60 text-xs flex items-center gap-1 hover:text-green-400">
            Full board <ChevronRight size={12} />
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden" style={glass}>
          {leaderboard.map((u, i) => (
            <div
              key={u.rank}
              className={`flex items-center gap-3 px-4 py-3 ${i < leaderboard.length - 1 ? 'border-b' : ''}`}
              style={{ borderColor: 'rgba(34,197,94,0.08)', background: u.name === 'Arjun Mehta' ? 'rgba(34,197,94,0.08)' : 'transparent' }}
            >
              <span className="text-base w-5 text-center">{u.badge}</span>
              <span className="text-xl">{u.avatar}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white leading-none">{u.name}</p>
                {u.name === 'Arjun Mehta' && <p className="text-green-400/50 text-[10px]">You</p>}
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp size={11} className="text-green-400/60" />
                <span className="text-green-300 text-xs font-semibold">{u.coins.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eco Tip */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-green-300/70 mb-3 px-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
          🌿 TODAY'S ECO TIP
        </h3>
        <div
          className="p-4 rounded-2xl flex items-start gap-3"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(34,197,94,0.15)' }}>
            <TipIcon size={16} className="text-green-400" />
          </div>
          <p className="text-green-200/70 text-sm leading-relaxed">{tip.text}</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-semibold text-green-300/70" style={{ fontFamily: 'Outfit, sans-serif' }}>
            UPCOMING EVENTS
          </h3>
          <button onClick={() => navigate('events')} className="text-green-400/60 text-xs flex items-center gap-1 hover:text-green-400">
            See all <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {events.map((e) => (
            <motion.div
              key={e.title}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('events')}
              className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer"
              style={glass}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                style={{ background: `${e.color}15`, border: `1px solid ${e.color}25` }}
              >
                🌱
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{e.title}</p>
                <p className="text-green-400/50 text-[11px]">{e.date} · {e.loc}</p>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{ color: e.color, background: `${e.color}15` }}
              >
                {e.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Admin shortcut */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('admin')}
        className="w-full p-4 rounded-2xl flex items-center gap-3 mb-2"
        style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}
      >
        <Award size={20} className="text-green-400" />
        <div className="flex-1 text-left">
          <p className="text-white text-sm font-medium">Admin Dashboard</p>
          <p className="text-green-400/50 text-xs">View analytics & manage system</p>
        </div>
        <ChevronRight size={16} className="text-green-400/40" />
      </motion.button>
    </motion.div>
  )
}
