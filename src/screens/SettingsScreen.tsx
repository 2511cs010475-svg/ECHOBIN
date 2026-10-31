import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Bell, Moon, Globe, Shield, Trash2,
  Download, HelpCircle, FileText, Mail, ChevronRight, Info, Lock
} from 'lucide-react'
import type { NavigateFn } from '../types'

interface Props { navigate: NavigateFn }

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(34,197,94,0.12)',
  backdropFilter: 'blur(12px)',
}

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0"
      style={{ background: value ? '#22c55e' : 'rgba(255,255,255,0.1)' }}
    >
      <motion.div
        animate={{ x: value ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white"
      />
    </button>
  )
}

function SettingsRow({
  icon: Icon,
  label,
  sub,
  value,
  onToggle,
  onPress,
  color = '#22c55e',
  danger,
}: {
  icon: React.ElementType
  label: string
  sub?: string
  value?: boolean
  onToggle?: () => void
  onPress?: () => void
  color?: string
  danger?: boolean
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.99 }}
      onClick={onToggle || onPress}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.02]"
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: danger ? 'rgba(239,68,68,0.12)' : `${color}15` }}
      >
        <Icon size={15} style={{ color: danger ? '#ef4444' : color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: danger ? '#f87171' : '#f0fdf4' }}>{label}</p>
        {sub && <p className="text-green-400/40 text-xs truncate">{sub}</p>}
      </div>
      {value !== undefined ? (
        <Toggle value={value} onChange={onToggle!} />
      ) : (
        <ChevronRight size={14} className="text-green-400/25 flex-shrink-0" />
      )}
    </motion.button>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-4 mb-5">
      <p className="text-green-400/50 text-[10px] font-semibold tracking-widest uppercase mb-2 px-1">{title}</p>
      <div className="rounded-2xl overflow-hidden divide-y" style={{ ...glass, borderColor: 'rgba(34,197,94,0.12)' }}>
        {children}
      </div>
    </div>
  )
}

export default function SettingsScreen({ navigate }: Props) {
  const [notif, setNotif] = useState({ email: true, sms: false, push: true, complaints: true, events: true, rewards: true })
  const [privacy, setPrivacy] = useState({ location: true, analytics: true, dataSharing: false })
  const [app, setApp] = useState({ darkMode: true, units: 'kg' })
  const [lang, setLang] = useState('English')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen overflow-y-auto pb-24"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <button onClick={() => navigate('profile')} className="text-green-400/60 hover:text-green-400">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-white flex-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Settings</h1>
      </div>

      {/* Profile quick view */}
      <div className="px-4 mb-5">
        <div
          className="flex items-center gap-3 p-4 rounded-2xl"
          style={glass}
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: 'linear-gradient(135deg, #0d2e14, #1a5c35)', border: '1.5px solid rgba(34,197,94,0.3)' }}>
            👨‍💻
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold">Arjun Mehta</p>
            <p className="text-green-400/50 text-xs">arjun.mehta@email.com</p>
          </div>
          <button
            onClick={() => navigate('profile')}
            className="text-xs px-3 py-1.5 rounded-lg font-medium"
            style={{ background: 'rgba(34,197,94,0.12)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Account */}
      <Section title="Account">
        <SettingsRow icon={Lock} label="Change Password" sub="Last changed 30 days ago" color="#8b5cf6" />
        <SettingsRow icon={Shield} label="Two-Factor Authentication" sub="Secure your account" color="#3b82f6" />
        <SettingsRow icon={Globe} label="Language" sub={lang} color="#22c55e" onPress={() => {}} />
      </Section>

      {/* Notifications */}
      <Section title="Notifications">
        <SettingsRow icon={Bell} label="Push Notifications" sub="App alerts on this device"
          value={notif.push} onToggle={() => setNotif(p => ({ ...p, push: !p.push }))} />
        <SettingsRow icon={Mail} label="Email Notifications" sub="arjun.mehta@email.com"
          value={notif.email} onToggle={() => setNotif(p => ({ ...p, email: !p.email }))} />
        <SettingsRow icon={Bell} label="SMS Alerts" sub="+91 98765 43210"
          value={notif.sms} onToggle={() => setNotif(p => ({ ...p, sms: !p.sms }))} color="#f59e0b" />
        <SettingsRow icon={Bell} label="Complaint Updates"
          value={notif.complaints} onToggle={() => setNotif(p => ({ ...p, complaints: !p.complaints }))} color="#4ade80" />
        <SettingsRow icon={Bell} label="Event Reminders"
          value={notif.events} onToggle={() => setNotif(p => ({ ...p, events: !p.events }))} color="#86efac" />
        <SettingsRow icon={Bell} label="Reward Alerts"
          value={notif.rewards} onToggle={() => setNotif(p => ({ ...p, rewards: !p.rewards }))} color="#fbbf24" />
      </Section>

      {/* Privacy */}
      <Section title="Privacy & Data">
        <SettingsRow icon={Globe} label="Share Location" sub="Required for complaint tracking"
          value={privacy.location} onToggle={() => setPrivacy(p => ({ ...p, location: !p.location }))} />
        <SettingsRow icon={Shield} label="Usage Analytics" sub="Help us improve EcoBin"
          value={privacy.analytics} onToggle={() => setPrivacy(p => ({ ...p, analytics: !p.analytics }))} color="#8b5cf6" />
        <SettingsRow icon={Shield} label="Data Sharing with Partners" sub="NGOs and civic bodies"
          value={privacy.dataSharing} onToggle={() => setPrivacy(p => ({ ...p, dataSharing: !p.dataSharing }))} color="#f59e0b" />
      </Section>

      {/* App */}
      <Section title="App Preferences">
        <SettingsRow icon={Moon} label="Dark Mode" sub="Currently enabled"
          value={app.darkMode} onToggle={() => setApp(p => ({ ...p, darkMode: !p.darkMode }))} />
        <SettingsRow icon={Globe} label="Weight Units" sub={app.units === 'kg' ? 'Kilograms (kg)' : 'Pounds (lb)'} />
        <SettingsRow icon={Download} label="Export My Data" sub="Download all your reports" color="#06b6d4" />
        <SettingsRow icon={Download} label="Backup Data" sub="Last backup: Jul 10, 2024" color="#3b82f6" />
      </Section>

      {/* Support */}
      <Section title="Help & Support">
        <SettingsRow icon={HelpCircle} label="Help Center" sub="FAQs, guides, tutorials" color="#4ade80" />
        <SettingsRow icon={Mail} label="Contact Support" sub="support@ecobin.in" color="#22c55e" />
        <SettingsRow icon={FileText} label="Terms of Service" color="#94a3b8" />
        <SettingsRow icon={Shield} label="Privacy Policy" color="#94a3b8" />
        <SettingsRow icon={Info} label="About EcoBin" sub="v1.0.0 · EcoBin Technologies Pvt. Ltd." color="#64748b" />
      </Section>

      {/* Danger zone */}
      <Section title="Danger Zone">
        <SettingsRow icon={Trash2} label="Delete Account" sub="This action is permanent and irreversible" danger onPress={() => {}} />
      </Section>

      <div className="flex justify-center pb-4">
        <p className="text-green-400/20 text-xs">EcoBin v1.0.0 · Made with 💚 for the planet</p>
      </div>
    </motion.div>
  )
}
