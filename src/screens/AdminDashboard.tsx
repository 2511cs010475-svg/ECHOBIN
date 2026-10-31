import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { ArrowLeft, TrendingUp, Users, CheckCircle, AlertTriangle, Truck, RefreshCw } from 'lucide-react'
import type { NavigateFn } from '../types'

interface Props { navigate: NavigateFn }

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(34,197,94,0.12)',
  backdropFilter: 'blur(12px)',
}

const areaData = [
  { month: 'Feb', complaints: 142 }, { month: 'Mar', complaints: 198 },
  { month: 'Apr', complaints: 231 }, { month: 'May', complaints: 287 },
  { month: 'Jun', complaints: 312 }, { month: 'Jul', complaints: 394 },
]

const barData = [
  { type: 'Plastic', count: 156 }, { type: 'Organic', count: 98 },
  { type: 'Mixed', count: 87 }, { type: 'E-Waste', count: 45 },
  { type: 'Metal', count: 32 }, { type: 'Glass', count: 28 },
]

const pieData = [
  { name: 'Completed', value: 312, color: '#22c55e' },
  { name: 'In Progress', value: 48, color: '#f97316' },
  { name: 'Pending', value: 24, color: '#f59e0b' },
  { name: 'Rejected', value: 10, color: '#ef4444' },
]

const recentComplaints = [
  { id: 'ECB-0097', user: 'Arjun Mehta', type: 'Plastic', area: 'Sector 12', status: 'In Progress', priority: 'high' },
  { id: 'ECB-0096', user: 'Priya Sharma', type: 'E-Waste', area: 'Koregaon', status: 'Assigned', priority: 'medium' },
  { id: 'ECB-0095', user: 'Rahul Patil', type: 'Organic', area: 'Aundh', status: 'Completed', priority: 'low' },
  { id: 'ECB-0094', user: 'Ananya Singh', type: 'Hazardous', area: 'Baner', status: 'Verified', priority: 'emergency' },
  { id: 'ECB-0093', user: 'Vikram Joshi', type: 'Mixed', area: 'FC Road', status: 'Submitted', priority: 'medium' },
]

const statusColors: Record<string, string> = {
  Completed: '#22c55e', 'In Progress': '#f97316', Assigned: '#f59e0b',
  Verified: '#8b5cf6', Submitted: '#3b82f6', Rejected: '#ef4444',
}
const priorityColors: Record<string, string> = {
  low: '#22c55e', medium: '#f59e0b', high: '#f97316', emergency: '#ef4444',
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="px-3 py-2 rounded-lg text-xs" style={{ background: '#0d2e14', border: '1px solid rgba(34,197,94,0.3)', color: '#f0fdf4' }}>
        <p className="text-green-400/70">{label}</p>
        <p className="font-semibold">{payload[0].value}</p>
      </div>
    )
  }
  return null
}

export default function AdminDashboard({ navigate }: Props) {
  const [activeTab, setActiveTab] = useState('Overview')

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
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Admin Dashboard</h1>
          <p className="text-green-400/40 text-xs">July 14, 2024 · Live Data</p>
        </div>
        <button className="text-green-400/60 hover:text-green-400">
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Stat cards */}
      <div className="px-4 mb-5 grid grid-cols-2 gap-2.5">
        {[
          { icon: <AlertTriangle size={16} className="text-amber-400" />, label: 'Total Complaints', value: '394', delta: '+12%', color: '#f59e0b' },
          { icon: <CheckCircle size={16} className="text-green-400" />, label: 'Resolved Today', value: '28', delta: '+5 today', color: '#22c55e' },
          { icon: <Users size={16} className="text-blue-400" />, label: 'Active Users', value: '1,847', delta: '+23 new', color: '#3b82f6' },
          { icon: <Truck size={16} className="text-purple-400" />, label: 'Active Collectors', value: '14', delta: '6 on duty', color: '#8b5cf6' },
          { icon: <TrendingUp size={16} className="text-emerald-400" />, label: 'Coins Issued', value: '48,320', delta: '🪙 today', color: '#10b981' },
          { icon: <span className="text-base">♻️</span>, label: 'KG Collected', value: '1,240', delta: '+89 today', color: '#4ade80' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-3.5 rounded-2xl"
            style={glass}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                {s.icon}
              </div>
              <span className="text-[10px] font-medium" style={{ color: s.color }}>{s.delta}</span>
            </div>
            <div className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</div>
            <p className="text-green-400/50 text-[10px] mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {['Overview', 'Complaints', 'Analytics'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: activeTab === t ? 'rgba(34,197,94,0.2)' : 'transparent',
                color: activeTab === t ? '#4ade80' : 'rgba(134,239,172,0.4)',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'Overview' && (
        <div className="px-4 flex flex-col gap-4">
          {/* Area chart */}
          <div className="p-4 rounded-2xl" style={glass}>
            <h3 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Complaints Over Time</h3>
            <p className="text-green-400/40 text-xs mb-4">Monthly complaint volume</p>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.06)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(134,239,172,0.5)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(134,239,172,0.5)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="complaints" stroke="#22c55e" strokeWidth={2} fill="url(#cGrad)" dot={{ fill: '#22c55e', r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bar chart */}
          <div className="p-4 rounded-2xl" style={glass}>
            <h3 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Waste by Category</h3>
            <p className="text-green-400/40 text-xs mb-4">Total complaints per type</p>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={barData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.06)" />
                <XAxis dataKey="type" tick={{ fill: 'rgba(134,239,172,0.5)', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(134,239,172,0.5)', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="rgba(34,197,94,0.6)" radius={[4, 4, 0, 0]}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={`rgba(34,${100 + i * 16},94,0.7)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="p-4 rounded-2xl" style={glass}>
            <h3 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Status Distribution</h3>
            <p className="text-green-400/40 text-xs mb-4">Current complaint status breakdown</p>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={130} height={130}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 flex flex-col gap-2">
                {pieData.map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="text-xs text-green-300/70 flex-1">{d.name}</span>
                    <span className="text-xs font-semibold text-white">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Complaints' && (
        <div className="px-4">
          <p className="text-green-400/50 text-xs mb-3">RECENT COMPLAINTS</p>
          <div className="rounded-2xl overflow-hidden" style={glass}>
            {recentComplaints.map((c, i) => (
              <div
                key={c.id}
                className="px-4 py-3 flex items-center gap-3"
                style={{ borderBottom: i < recentComplaints.length - 1 ? '1px solid rgba(34,197,94,0.07)' : 'none' }}
              >
                <div>
                  <p className="text-xs font-mono text-green-400/60">{c.id}</p>
                  <p className="text-sm text-white font-medium">{c.user}</p>
                  <p className="text-[11px] text-green-400/40">{c.type} · {c.area}</p>
                </div>
                <div className="ml-auto flex flex-col items-end gap-1">
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ color: statusColors[c.status], background: `${statusColors[c.status]}20` }}
                  >
                    {c.status}
                  </span>
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full"
                    style={{ color: priorityColors[c.priority], background: `${priorityColors[c.priority]}15` }}
                  >
                    {c.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Analytics' && (
        <div className="px-4 flex flex-col gap-4">
          {[
            { label: 'Avg Resolution Time', value: '4.2 hours', icon: '⏱️', trend: '↓ 18% faster' },
            { label: 'Complaint Satisfaction', value: '4.6 / 5.0', icon: '⭐', trend: '↑ 0.2 this month' },
            { label: 'Collector Efficiency', value: '89%', icon: '🚛', trend: '↑ 4% this week' },
            { label: 'Carbon Saved (est.)', value: '1.2 tons', icon: '🌱', trend: 'This month' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-2xl flex items-center gap-4"
              style={glass}
            >
              <div className="text-3xl">{s.icon}</div>
              <div className="flex-1">
                <p className="text-green-400/60 text-xs">{s.label}</p>
                <p className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</p>
              </div>
              <span className="text-green-400 text-xs font-medium">{s.trend}</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
