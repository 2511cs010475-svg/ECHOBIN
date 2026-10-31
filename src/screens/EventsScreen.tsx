import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, Users, CheckCircle, Clock } from 'lucide-react'
import type { NavigateFn } from '../types'

interface Props { navigate: NavigateFn }

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(34,197,94,0.12)',
  backdropFilter: 'blur(12px)',
}

const events = [
  {
    id: 1, title: 'Campus Cleanup Drive', org: 'EcoBin × Pune University',
    date: 'July 20, 2024', time: '8:00 AM – 12:00 PM',
    loc: 'FC Road, Pune', category: 'Cleanup',
    volunteers: 128, max: 200, coins: 150,
    desc: 'Join us for a large-scale campus cleanup drive covering FC Road and surrounding areas. Gloves, bags, and refreshments provided.',
    color: '#22c55e', icon: '🧹', registered: false,
  },
  {
    id: 2, title: 'Tree Plantation Day', org: 'EcoBin × Green India Mission',
    date: 'July 28, 2024', time: '7:00 AM – 11:00 AM',
    loc: 'Baner Hills, Pune', category: 'Nature',
    volunteers: 64, max: 150, coins: 200,
    desc: 'Plant native trees across Baner Hills. Each volunteer plants at least 3 trees. All supplies provided. Certificate of participation included.',
    color: '#4ade80', icon: '🌳', registered: true,
  },
  {
    id: 3, title: 'E-Waste Collection Camp', org: 'EcoBin × MPCB',
    date: 'August 5, 2024', time: '10:00 AM – 4:00 PM',
    loc: 'Shivajinagar Grounds', category: 'E-Waste',
    volunteers: 45, max: 100, coins: 100,
    desc: 'Bring your old electronics for responsible disposal. Earn double coins for every kg of e-waste dropped. All brands accepted.',
    color: '#8b5cf6', icon: '💻', registered: false,
  },
  {
    id: 4, title: 'Awareness Walk & Rally', org: 'EcoBin × NGO Connect',
    date: 'August 15, 2024', time: '6:00 AM – 9:00 AM',
    loc: 'Shivaji Park, Pune', category: 'Awareness',
    volunteers: 310, max: 500, coins: 75,
    desc: "Independence Day special awareness walk. Carry EcoBin banners and spread the message of cleanliness. Medals for all participants.",
    color: '#f59e0b', icon: '🚶', registered: false,
  },
]

const tabs = ['Upcoming', 'My Events']

export default function EventsScreen({ navigate }: Props) {
  const [tab, setTab] = useState('Upcoming')
  const [registrations, setRegistrations] = useState<Set<number>>(new Set([2]))
  const [expanded, setExpanded] = useState<number | null>(null)

  const toggle = (id: number) => {
    setRegistrations((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const displayed = tab === 'Upcoming' ? events : events.filter((e) => registrations.has(e.id))

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
        <h1 className="text-xl font-bold text-white flex-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Events</h1>
        <span className="text-green-400/50 text-xs">{registrations.size} Registered</span>
      </div>

      {/* Featured banner */}
      <div className="px-4 mb-5">
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-3xl p-5"
          style={{
            background: 'linear-gradient(135deg, rgba(34,197,94,0.18) 0%, rgba(16,185,129,0.12) 100%)',
            border: '1px solid rgba(34,197,94,0.28)',
          }}
        >
          <div className="absolute right-4 top-4 text-5xl opacity-25">🧹</div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: 'rgba(34,197,94,0.25)', color: '#4ade80' }}>
            FEATURED
          </span>
          <h2 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Campus Cleanup Drive
          </h2>
          <p className="text-green-300/60 text-xs mb-3">EcoBin × Pune University · July 20, 2024</p>
          <div className="flex items-center gap-4 text-xs text-green-400/70 mb-4">
            <span className="flex items-center gap-1"><Users size={12} /> 128/200</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> FC Road</span>
            <span className="flex items-center gap-1">🪙 +150 coins</span>
          </div>
          <button
            onClick={() => toggle(1)}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: registrations.has(1) ? 'rgba(34,197,94,0.2)' : 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: registrations.has(1) ? '#4ade80' : '#052e16',
              border: registrations.has(1) ? '1px solid rgba(34,197,94,0.4)' : 'none',
            }}
          >
            {registrations.has(1) ? '✓ Registered' : 'Register Now'}
          </button>
        </motion.div>
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
              {t} {t === 'My Events' && `(${registrations.size})`}
            </button>
          ))}
        </div>
      </div>

      {/* Events list */}
      <div className="px-4 flex flex-col gap-3">
        <AnimatePresence>
          {displayed.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl overflow-hidden"
              style={glass}
            >
              <button
                onClick={() => setExpanded(expanded === e.id ? null : e.id)}
                className="w-full p-4 flex items-center gap-3 text-left"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${e.color}15` }}
                >
                  {e.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-white text-sm font-semibold truncate">{e.title}</p>
                    {registrations.has(e.id) && (
                      <CheckCircle size={13} className="text-green-400 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-green-400/50">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {e.date}</span>
                    <span className="flex items-center gap-1"><Users size={10} /> {e.volunteers}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                      style={{ color: e.color, background: `${e.color}15` }}
                    >
                      {e.category}
                    </span>
                    <span className="text-[10px] text-amber-400/70">+{e.coins} 🪙</span>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expanded === e.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <div className="p-4 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(34,197,94,0.08)' }}>
                        <p className="text-green-200/70 text-sm leading-relaxed mb-4">{e.desc}</p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {[
                            { icon: <Clock size={12} />, label: 'Time', value: e.time },
                            { icon: <MapPin size={12} />, label: 'Location', value: e.loc },
                            { icon: <Users size={12} />, label: 'Capacity', value: `${e.volunteers}/${e.max}` },
                            { icon: <span className="text-xs">🪙</span>, label: 'Reward', value: `${e.coins} coins` },
                          ].map((d, di) => (
                            <div key={di} className="p-2.5 rounded-lg" style={{ background: 'rgba(34,197,94,0.06)' }}>
                              <div className="flex items-center gap-1 text-green-400/60 mb-0.5">{d.icon}<span className="text-[10px]">{d.label}</span></div>
                              <p className="text-white text-xs font-medium">{d.value}</p>
                            </div>
                          ))}
                        </div>

                        {/* Volunteer bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-green-400/50 mb-1">
                            <span>Volunteers</span>
                            <span>{e.volunteers}/{e.max}</span>
                          </div>
                          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${(e.volunteers / e.max) * 100}%`, background: `linear-gradient(90deg, ${e.color}, ${e.color}aa)` }}
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => toggle(e.id)}
                          className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
                          style={{
                            background: registrations.has(e.id) ? 'rgba(239,68,68,0.1)' : `linear-gradient(135deg, ${e.color}, ${e.color}cc)`,
                            color: registrations.has(e.id) ? '#ef4444' : '#052e16',
                            border: registrations.has(e.id) ? '1px solid rgba(239,68,68,0.3)' : 'none',
                          }}
                        >
                          {registrations.has(e.id) ? 'Cancel Registration' : '✓ Register as Volunteer'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {displayed.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <span className="text-5xl mb-4">📅</span>
            <p className="text-green-300/50 text-sm">No registered events yet</p>
            <button onClick={() => setTab('Upcoming')} className="text-green-400 text-sm mt-2">Browse upcoming events →</button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
