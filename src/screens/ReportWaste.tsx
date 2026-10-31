import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Camera, Upload, MapPin, ChevronRight, CheckCircle, Loader, Zap } from 'lucide-react'
import type { NavigateFn } from '../types'

interface Props { navigate: NavigateFn }

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(34,197,94,0.12)',
  backdropFilter: 'blur(12px)',
}

const categories = [
  { id: 'plastic', label: 'Plastic', icon: '🧴', color: '#3b82f6' },
  { id: 'organic', label: 'Organic', icon: '🌿', color: '#22c55e' },
  { id: 'glass', label: 'Glass', icon: '🍶', color: '#06b6d4' },
  { id: 'metal', label: 'Metal', icon: '🔩', color: '#94a3b8' },
  { id: 'electronic', label: 'E-Waste', icon: '💻', color: '#8b5cf6' },
  { id: 'biomedical', label: 'Biomedical', icon: '🩺', color: '#ef4444' },
  { id: 'hazardous', label: 'Hazardous', icon: '☢️', color: '#f97316' },
  { id: 'construction', label: 'Construction', icon: '🧱', color: '#d97706' },
  { id: 'mixed', label: 'Mixed', icon: '🗑️', color: '#6b7280' },
]

const priorities = [
  { id: 'low', label: 'Low', color: '#22c55e', desc: 'Can wait 48-72h' },
  { id: 'medium', label: 'Medium', color: '#f59e0b', desc: 'Within 24h' },
  { id: 'high', label: 'High', color: '#f97316', desc: 'Within 6h' },
  { id: 'emergency', label: 'Emergency', color: '#ef4444', desc: 'Immediate' },
]

const steps = ['Photos', 'Category', 'Details', 'Location']

export default function ReportWaste({ navigate }: Props) {
  const [step, setStep] = useState(0)
  const [images, setImages] = useState<string[]>([])
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('medium')
  const [description, setDescription] = useState('')
  const [weight, setWeight] = useState(5)
  const [analyzing, setAnalyzing] = useState(false)
  const [aiResult, setAiResult] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [complaintId] = useState('ECB-2024-0097')

  const addImage = () => {
    const placeholders = ['📸', '🗑️', '♻️']
    setImages((prev) => [...prev, placeholders[prev.length % 3]])
    if (!analyzing && images.length === 0) {
      setAnalyzing(true)
      setTimeout(() => {
        setAnalyzing(false)
        setAiResult('AI detected: Plastic Waste (87% confidence) · Suggested category: Plastic')
        if (!category) setCategory('plastic')
      }, 2200)
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex flex-col items-center justify-center px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: 'rgba(34,197,94,0.15)', border: '2px solid #22c55e' }}
        >
          <CheckCircle size={36} className="text-green-400" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-white mb-2 text-center"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Complaint Submitted!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-green-400/60 text-sm text-center mb-6"
        >
          Your waste report has been received and is being processed.
        </motion.p>
        <div className="p-4 rounded-2xl w-full mb-6" style={glass}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-green-400/60 text-xs">Complaint ID</span>
            <span className="text-green-400 text-sm font-bold">{complaintId}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-green-400/60 text-xs">Category</span>
            <span className="text-white text-sm capitalize">{category || 'Mixed'}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-green-400/60 text-xs">Priority</span>
            <span className="text-sm capitalize" style={{ color: priorities.find(p => p.id === priority)?.color }}>
              {priority}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-400/60 text-xs">Coins Earned</span>
            <span className="text-green-400 text-sm font-bold">+50 🪙</span>
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={() => navigate('complaints')}
            className="flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}
          >
            Track Complaint
          </button>
          <button
            onClick={() => navigate('home')}
            className="flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#052e16' }}
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen overflow-y-auto pb-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <button onClick={() => step > 0 ? setStep(step - 1) : navigate('home')} className="text-green-400/60 hover:text-green-400">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-white flex-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Report Waste
        </h1>
        <span className="text-green-400/50 text-sm">{step + 1}/{steps.length}</span>
      </div>

      {/* Step bar */}
      <div className="px-4 mb-5">
        <div className="flex gap-1.5">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(34,197,94,0.1)' }}>
              <motion.div
                animate={{ width: i <= step ? '100%' : '0%' }}
                transition={{ duration: 0.4 }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #22c55e, #4ade80)' }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          {steps.map((s, i) => (
            <span key={s} className="text-[10px]" style={{ color: i <= step ? '#4ade80' : 'rgba(74,222,128,0.3)' }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="px-4"
        >
          {/* Step 0: Photos */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Upload Photos</h2>
              <p className="text-green-400/50 text-sm mb-4">AI will auto-detect waste type from your photos</p>

              {/* Upload area */}
              <button
                onClick={addImage}
                className="w-full h-44 rounded-2xl flex flex-col items-center justify-center gap-3 mb-4 transition-all"
                style={{ background: 'rgba(34,197,94,0.05)', border: '2px dashed rgba(34,197,94,0.25)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.12)' }}>
                  <Upload size={22} className="text-green-400" />
                </div>
                <div>
                  <p className="text-green-300/70 text-sm font-medium">Tap to upload</p>
                  <p className="text-green-400/40 text-xs text-center">or use camera</p>
                </div>
              </button>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={addImage}
                  className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}
                >
                  <Camera size={16} /> Camera
                </button>
                <button
                  onClick={addImage}
                  className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}
                >
                  <Upload size={16} /> Gallery
                </button>
              </div>

              {/* Uploaded previews */}
              {images.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-4">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}
                    >
                      {img}
                    </div>
                  ))}
                </div>
              )}

              {/* AI analysis indicator */}
              {analyzing && (
                <div className="flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <Loader size={16} className="text-green-400" />
                  </motion.div>
                  <div>
                    <p className="text-green-300/80 text-xs font-medium">AI Analyzing Image...</p>
                    <p className="text-green-400/50 text-[10px]">Detecting waste type with Gemini Vision</p>
                  </div>
                </div>
              )}
              {aiResult && (
                <div className="flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
                  <Zap size={16} className="text-green-400" />
                  <p className="text-green-300/80 text-xs">{aiResult}</p>
                </div>
              )}
            </div>
          )}

          {/* Step 1: Category */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Waste Category</h2>
              <p className="text-green-400/50 text-sm mb-4">Select the type of waste you are reporting</p>
              <div className="grid grid-cols-3 gap-2.5">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.id}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setCategory(cat.id)}
                    className="flex flex-col items-center gap-2 py-4 rounded-2xl transition-all"
                    style={{
                      background: category === cat.id ? `${cat.color}20` : 'rgba(255,255,255,0.03)',
                      border: category === cat.id ? `2px solid ${cat.color}60` : '1px solid rgba(34,197,94,0.1)',
                    }}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-[11px] font-medium" style={{ color: category === cat.id ? cat.color : 'rgba(240,253,244,0.6)' }}>
                      {cat.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Complaint Details</h2>
              <p className="text-green-400/50 text-sm mb-4">Provide more information about the waste</p>

              <div className="mb-4">
                <label className="text-green-400/60 text-xs mb-2 block">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the waste, location details, any hazards..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl text-sm text-green-50 resize-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(34,197,94,0.15)' }}
                />
              </div>

              <div className="mb-4">
                <label className="text-green-400/60 text-xs mb-3 block">Priority Level</label>
                <div className="grid grid-cols-2 gap-2">
                  {priorities.map((p) => (
                    <motion.button
                      key={p.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setPriority(p.id)}
                      className="py-3 px-3 rounded-xl text-left transition-all"
                      style={{
                        background: priority === p.id ? `${p.color}18` : 'rgba(255,255,255,0.03)',
                        border: priority === p.id ? `2px solid ${p.color}50` : '1px solid rgba(34,197,94,0.1)',
                      }}
                    >
                      <p className="text-sm font-semibold" style={{ color: p.color }}>{p.label}</p>
                      <p className="text-[10px] text-green-400/40">{p.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-green-400/60 text-xs">Estimated Weight</label>
                  <span className="text-green-400 text-sm font-semibold">{weight} kg</span>
                </div>
                <input
                  type="range"
                  min={1} max={100} value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #22c55e ${weight}%, rgba(34,197,94,0.15) ${weight}%)` }}
                />
                <div className="flex justify-between text-[10px] text-green-400/30 mt-1">
                  <span>1 kg</span><span>50 kg</span><span>100 kg</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Location</h2>
              <p className="text-green-400/50 text-sm mb-4">Confirm the waste location</p>

              <div className="h-40 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <div className="grid grid-cols-8 gap-1 absolute inset-0 opacity-20 p-2">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="h-2 rounded-full" style={{ background: `rgba(34,197,94,${0.1 + Math.random() * 0.3})` }} />
                  ))}
                </div>
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#22c55e' }}>
                    <MapPin size={16} className="text-white" />
                  </div>
                  <p className="text-green-300/70 text-xs">Sector 12, Pune - 411001</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl mb-4" style={glass}>
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={16} className="text-green-400" />
                  <div>
                    <p className="text-white text-sm font-medium">Sector 12, Pune</p>
                    <p className="text-green-400/50 text-xs">Maharashtra, India - 411001</p>
                  </div>
                  <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80' }}>
                    GPS Auto
                  </span>
                </div>
                <p className="text-green-400/40 text-xs">18.5204° N, 73.8567° E</p>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <h3 className="text-sm font-semibold text-green-300/80 mb-3">Complaint Summary</h3>
                {[
                  ['Category', categories.find(c => c.id === category)?.label || 'Not selected', categories.find(c => c.id === category)?.icon],
                  ['Priority', priority, '🚨'],
                  ['Est. Weight', `${weight} kg`, '⚖️'],
                  ['Images', `${images.length} photo(s)`, '📸'],
                ].map(([k, v, ic]) => (
                  <div key={k as string} className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: 'rgba(34,197,94,0.08)' }}>
                    <span className="text-green-400/50 text-xs">{k}</span>
                    <span className="text-white text-xs font-medium">{ic} {v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Next / Submit */}
      <div className="px-4 mt-6">
        <button
          onClick={() => step < steps.length - 1 ? setStep(step + 1) : handleSubmit()}
          className="w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{
            fontFamily: 'Outfit, sans-serif',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: '#052e16',
            boxShadow: '0 8px 24px rgba(34,197,94,0.3)',
          }}
        >
          {step < steps.length - 1 ? (
            <>Continue <ChevronRight size={18} /></>
          ) : (
            <>Submit Complaint ✓</>
          )}
        </button>
      </div>
    </motion.div>
  )
}
