import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, MapPin, Clock, Filter } from 'lucide-react'
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
  Cancelled: '#6b7280',
}

const statusOrder = ['Submitted', 'Verified', 'Assigned', 'In Progress', 'Completed']

const complaints = [
  {
    id: 'ECB-2024-0091', type: 'Plastic Waste', icon: '🧴', loc: 'Sector 12, Pune', status: 'In Progress',
    priority: 'high', date: 'Jul 13, 2024', weight: '8 kg', collector: 'Rajesh Kumar',
    timeline: [
      { status: 'Submitted', time: 'Jul 13, 10:30 AM', done: true },
      { status: 'Verified', time: 'Jul 13, 11:00 AM', done: true },
      { status: 'Assigned', time: 'Jul 13, 12:15 PM', done: true },
      { status: 'In Progress', time: 'Jul 13, 2:00 PM', done: true },
      { status: 'Completed', time: 'Pending', done: false },
    ],
    coins: 50,
  },
  {
    id: 'ECB-2024-0088', type: 'Mixed Waste', icon: '🗑️', loc: 'MG Road, Pune', status: 'Completed',
    priority: 'medium', date: 'Jul 12, 2024', weight: '15 kg', collector: 'Sunita Jadhav',
    timeline: statusOrder.map((s, i) => ({ status: s, time: `Jul 12, ${9 + i}:00 AM`, done: true })),
    coins: 75,
  },
  {
    id: 'ECB-2024-0085', type: 'E-Waste', icon: '💻', loc: 'Koregaon Park', status: 'Verified',
    priority: 'low', date: 'Jul 11, 2024', weight: '4 kg', collector: 'Unassigned',
    timeline: [
      { status: 'Submitted', time: 'Jul 11, 9:00 AM', done: true },
      { status: 'Verified', time: 'Jul 11, 11:30 AM', done: true },
      { status: 'Assigned', time: 'Pending', done: false },
      { status: 'In Progress', time: 'Pending', done: false },
      { status: 'Completed', time: 'Pending', done: false },
    ],
    coins: 30,
  },
  {
    id: 'ECB-2024-0079', type: 'Organic Waste', icon: '🌿', loc: 'Viman Nagar', status: 'Rejected',
    priority: 'low', date: 'Jul 9, 2024', weight: '3 kg', collector: 'N/A',
    timeline: [
      { status: 'Submitted', time: 'Jul 9, 8:00 AM', done: true },
      { status: 'Rejected', time: 'Jul 9, 9:00 AM', done: true },
    ],
    coins: 0,
  },
]

const filters = ['All', 'Active', 'Completed', 'Rejected']

const priorityColors: Record<string, string> = {
  low: '#22c55e', medium: '#f59e0b', high: '#f97316', emergency: '#ef4444',
}

export default function ComplaintTracking({ navigate }: Props) {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = complaints.filter((c) => {
    if (filter === 'All') return true
    if (filter === 'Active') return ['Submitted', 'Verified', 'Assigned', 'In Progress'].includes(c.status)
    if (filter === 'Completed') return c.status === 'Completed'
    if (filter === 'Rejected') return c.status === 'Rejected'
    return true
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
        <h1 className="text-xl font-bold text-white flex-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
          My Complaints
        </h1>
        <button className="text-green-400/60 hover:text-green-400">
          <Filter size={18} />
        </button>
      </div>

      {/* Stats row */}
      <div className="px-4 mb-4 grid grid-cols-4 gap-2">
        {[
          { label: 'Total', value: '47', color: '#22c55e' },
          { label: 'Active', value: '8', color: '#f59e0b' },
          { label: 'Done', value: '36', color: '#3b82f6' },
          { label: 'Rejected', value: '3', color: '#ef4444' },
        ].map((s) => (
          <div key={s.label} className="p-2.5 rounded-xl text-center" style={glass}>
            <p className="text-base font-bold" style={{ color: s.color, fontFamily: 'Outfit, sans-serif' }}>{s.value}</p>
            <p className="text-green-400/40 text-[9px] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
              style={{
                background: filter === f ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.04)',
                border: filter === f ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(34,197,94,0.1)',
                color: filter === f ? '#4ade80' : 'rgba(134,239,172,0.5)',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Complaint list */}
      <div className="px-4 flex flex-col gap-3">
        <AnimatePresence>
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl overflow-hidden"
              style={glass}
            >
              {/* Card header */}
              <button
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                className="w-full p-4 flex items-center gap-3 text-left"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: 'rgba(34,197,94,0.1)' }}
                >
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-white text-sm font-semibold truncate">{c.type}</p>
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0"
                      style={{ color: priorityColors[c.priority], background: `${priorityColors[c.priority]}18` }}
                    >
                      {c.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-0.5">
                    <MapPin size={10} className="text-green-400/40" />
                    <p className="text-green-400/50 text-[11px] truncate">{c.loc}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400/30 text-[10px]">{c.id}</span>
                    <div className="flex items-center gap-1">
                      <Clock size={9} className="text-green-400/30" />
                      <span className="text-green-400/30 text-[10px]">{c.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ color: statusColors[c.status], background: `${statusColors[c.status]}20` }}
                  >
                    {c.status}
                  </span>
                  <motion.div
                    animate={{ rotate: expanded === c.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={14} className="text-green-400/40" />
                  </motion.div>
                </div>
              </button>

              {/* Expanded timeline */}
              <AnimatePresence>
                {expanded === c.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div
                      className="mx-4 mb-4 p-4 rounded-xl"
                      style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(34,197,94,0.08)' }}
                    >
                      <h4 className="text-xs font-semibold text-green-300/60 mb-3 uppercase tracking-wider">
                        Status Timeline
                      </h4>
                      <div className="flex flex-col gap-0">
                        {c.timeline.map((t, ti) => (
                          <div key={ti} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div
                                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                                style={{
                                  background: t.done ? statusColors[t.status] || '#22c55e' : 'rgba(255,255,255,0.06)',
                                  border: t.done ? 'none' : '1px solid rgba(34,197,94,0.15)',
                                }}
                              >
                                {t.done && <span className="text-white text-[8px]">✓</span>}
                              </div>
                              {ti < c.timeline.length - 1 && (
                                <div
                                  className="w-px flex-1 min-h-[24px]"
                                  style={{ background: t.done ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.06)' }}
                                />
                              )}
                            </div>
                            <div className="pb-4">
                              <p className="text-sm font-medium" style={{ color: t.done ? '#f0fdf4' : 'rgba(240,253,244,0.35)' }}>
                                {t.status}
                              </p>
                              <p className="text-[11px]" style={{ color: t.done ? 'rgba(134,239,172,0.6)' : 'rgba(134,239,172,0.25)' }}>
                                {t.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {c.collector !== 'N/A' && c.collector !== 'Unassigned' && (
                        <div
                          className="flex items-center gap-2 mt-2 pt-3"
                          style={{ borderTop: '1px solid rgba(34,197,94,0.1)' }}
                        >
                          <span className="text-xl">👷</span>
                          <div>
                            <p className="text-xs text-green-300/60">Assigned Collector</p>
                            <p className="text-sm text-white font-medium">{c.collector}</p>
                          </div>
                          {c.status === 'Completed' && c.coins > 0 && (
                            <span className="ml-auto text-green-400 text-sm font-bold">+{c.coins} 🪙</span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <span className="text-5xl mb-4">🗂️</span>
            <p className="text-green-300/50 text-sm">No {filter.toLowerCase()} complaints found</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
