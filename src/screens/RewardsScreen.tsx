import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Trophy, TrendingUp, Gift, Star, Zap } from 'lucide-react'
import type { NavigateFn } from '../types'

interface Props { navigate: NavigateFn }

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(34,197,94,0.12)',
  backdropFilter: 'blur(12px)',
}

const badges = [
  { icon: '🌱', name: 'Green Starter', desc: 'First complaint filed', earned: true, date: 'Jun 1' },
  { icon: '♻️', name: 'Recycler', desc: '10 complaints filed', earned: true, date: 'Jun 8' },
  { icon: '🏅', name: 'Eco Warrior', desc: '50 complaints filed', earned: true, date: 'Jul 2' },
  { icon: '⚡', name: 'Speed Reporter', desc: 'Report within 1 min', earned: true, date: 'Jul 9' },
  { icon: '🔥', name: '7-Day Streak', desc: '7 days active', earned: false, progress: 5, total: 7 },
  { icon: '👑', name: 'Top Citizen', desc: 'Reach #1 in your area', earned: false, progress: 4, total: 1 },
  { icon: '🌍', name: 'Planet Hero', desc: '100 complaints filed', earned: false, progress: 47, total: 100 },
  { icon: '💎', name: 'Diamond Rank', desc: 'Earn 5000 coins', earned: false, progress: 3240, total: 5000 },
]

const leaderboard = [
  { rank: 1, name: 'Priya Sharma', coins: 4820, avatar: '👩', area: 'Koregaon Park', badge: '🥇' },
  { rank: 2, name: 'Rahul Patil', coins: 4210, avatar: '👨', area: 'Aundh', badge: '🥈' },
  { rank: 3, name: 'Ananya Singh', coins: 3890, avatar: '👩', area: 'Baner', badge: '🥉' },
  { rank: 4, name: 'Arjun Mehta', coins: 3240, avatar: '👨‍💻', area: 'Sector 12', badge: '🏅', isMe: true },
  { rank: 5, name: 'Sneha Kulkarni', coins: 2980, avatar: '👩‍🎓', area: 'Viman Nagar', badge: '🏅' },
]

const coupons = [
  { title: '₹50 Zomato Voucher', cost: 500, icon: '🍕', color: '#ef4444' },
  { title: '10% BigBasket Discount', cost: 750, icon: '🛒', color: '#22c55e' },
  { title: 'Free Metro Ride', cost: 300, icon: '🚇', color: '#3b82f6' },
  { title: '₹100 Amazon Gift Card', cost: 1200, icon: '📦', color: '#f59e0b' },
]

const tabs = ['Overview', 'Badges', 'Leaderboard', 'Redeem']

export default function RewardsScreen({ navigate }: Props) {
  const [tab, setTab] = useState('Overview')
  const coins = 3240
  const level = 8
  const nextLevelCoins = 4000
  const progress = (coins / nextLevelCoins) * 100

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
        <h1 className="text-xl font-bold text-white flex-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Rewards</h1>
        <Trophy size={20} className="text-green-400/60" />
      </div>

      {/* Hero coin display */}
      <div className="px-4 mb-5">
        <div
          className="relative overflow-hidden rounded-3xl p-6 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(16,185,129,0.1) 100%)',
            border: '1px solid rgba(34,197,94,0.25)',
          }}
        >
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #22c55e, transparent)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #4ade80, transparent)', transform: 'translate(-30%, 30%)' }} />

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10"
          >
            <div className="text-5xl mb-1">🪙</div>
            <div
              className="text-5xl font-black mb-1"
              style={{ fontFamily: 'Outfit, sans-serif', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {coins.toLocaleString()}
            </div>
            <p className="text-green-300/60 text-sm">Green Coins</p>
          </motion.div>

          <div className="relative z-10 mt-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-green-400/60 text-xs">Level {level}</span>
              <span className="text-green-400/60 text-xs">{coins} / {nextLevelCoins}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #22c55e, #4ade80)' }}
              />
            </div>
            <p className="text-green-400/40 text-[10px] mt-1 text-center">{nextLevelCoins - coins} coins to Level {level + 1}</p>
          </div>
        </div>
      </div>

      {/* Daily login reward */}
      <div className="px-4 mb-5">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full p-4 rounded-2xl flex items-center gap-3"
          style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)' }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(251,191,36,0.2)' }}>
            🎁
          </div>
          <div className="flex-1">
            <p className="text-amber-300 text-sm font-semibold">Daily Login Reward</p>
            <p className="text-amber-300/60 text-xs">Claim +25 coins for today!</p>
          </div>
          <span className="text-amber-300 text-sm font-bold">Claim</span>
        </motion.button>
      </div>

      {/* Quick stats */}
      <div className="px-4 grid grid-cols-3 gap-2 mb-5">
        {[
          { icon: <Star size={14} className="text-amber-400" />, label: 'Rank', value: '#4 Area' },
          { icon: <Zap size={14} className="text-blue-400" />, label: 'Streak', value: '5 Days' },
          { icon: <Gift size={14} className="text-purple-400" />, label: 'Redeemed', value: '3 Items' },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-xl text-center" style={glass}>
            <div className="flex justify-center mb-1">{s.icon}</div>
            <p className="text-white text-sm font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</p>
            <p className="text-green-400/40 text-[10px]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: tab === t ? 'rgba(34,197,94,0.2)' : 'transparent',
                color: tab === t ? '#4ade80' : 'rgba(134,239,172,0.4)',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-4">
        {/* Overview - earning history */}
        {tab === 'Overview' && (
          <div>
            <p className="text-green-400/50 text-xs mb-3 font-medium">EARNING HISTORY</p>
            {[
              { event: 'Complaint ECB-2024-0091 filed', coins: '+50', date: 'Jul 13', icon: '📋' },
              { event: 'Recycling guide completed', coins: '+15', date: 'Jul 12', icon: '♻️' },
              { event: 'Daily login streak x5', coins: '+25', date: 'Jul 12', icon: '🎯' },
              { event: 'Complaint ECB-2024-0088 resolved', coins: '+75', date: 'Jul 12', icon: '✅' },
              { event: 'Event "Campus Clean" attended', coins: '+100', date: 'Jul 10', icon: '🌱' },
              { event: 'Referral bonus - Priya joined', coins: '+200', date: 'Jul 5', icon: '👥' },
            ].map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-3 rounded-xl mb-2"
                style={glass}
              >
                <span className="text-xl">{h.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{h.event}</p>
                  <p className="text-green-400/40 text-[11px]">{h.date}</p>
                </div>
                <span className="text-green-400 text-sm font-bold">{h.coins} 🪙</span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Badges */}
        {tab === 'Badges' && (
          <div className="grid grid-cols-2 gap-3">
            {badges.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-2xl"
                style={{
                  background: b.earned ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.03)',
                  border: b.earned ? '1px solid rgba(34,197,94,0.25)' : '1px solid rgba(255,255,255,0.06)',
                  opacity: b.earned ? 1 : 0.6,
                }}
              >
                <div className="text-3xl mb-2">{b.earned ? b.icon : '🔒'}</div>
                <p className="text-white text-sm font-semibold mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{b.name}</p>
                <p className="text-green-400/50 text-[11px] mb-2">{b.desc}</p>
                {b.earned ? (
                  <span className="text-green-400 text-[10px] font-medium">{b.date} ✓</span>
                ) : (
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-green-400/40">Progress</span>
                      <span className="text-green-400/60">{b.progress}/{b.total}</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${Math.min(100, (b.progress! / b.total!) * 100)}%`, background: 'linear-gradient(90deg, #22c55e, #4ade80)' }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Leaderboard */}
        {tab === 'Leaderboard' && (
          <div className="rounded-2xl overflow-hidden" style={glass}>
            {leaderboard.map((u, i) => (
              <div
                key={u.rank}
                className="flex items-center gap-3 px-4 py-3.5"
                style={{
                  borderBottom: i < leaderboard.length - 1 ? '1px solid rgba(34,197,94,0.07)' : 'none',
                  background: u.isMe ? 'rgba(34,197,94,0.1)' : 'transparent',
                }}
              >
                <span className="text-lg w-6 text-center">{u.badge}</span>
                <span className="text-2xl">{u.avatar}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{u.name}</p>
                    {u.isMe && <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.2)', color: '#4ade80' }}>YOU</span>}
                  </div>
                  <p className="text-green-400/40 text-[11px]">{u.area}</p>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={11} className="text-green-400/60" />
                  <span className="text-green-300 text-sm font-bold">{u.coins.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Redeem */}
        {tab === 'Redeem' && (
          <div className="grid grid-cols-2 gap-3">
            {coupons.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="p-4 rounded-2xl"
                style={glass}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                  style={{ background: `${c.color}15` }}
                >
                  {c.icon}
                </div>
                <p className="text-white text-sm font-semibold mb-1 leading-tight">{c.title}</p>
                <p className="text-amber-400/80 text-xs mb-3">{c.cost} 🪙</p>
                <button
                  className="w-full py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: coins >= c.cost ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${coins >= c.cost ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    color: coins >= c.cost ? '#4ade80' : 'rgba(134,239,172,0.3)',
                  }}
                >
                  {coins >= c.cost ? 'Redeem' : 'Insufficient'}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
