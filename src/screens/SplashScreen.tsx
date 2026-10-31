import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function SplashScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(iv); return 100 }
        return p + 1.4
      })
    }, 38)
    return () => clearInterval(iv)
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #020b04 0%, #030f06 60%, #051408 100%)' }}
    >
      {/* Ambient glow blobs */}
      <motion.div
        className="absolute top-[-15%] left-[-15%] w-[70%] h-[70%] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.07), transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Rotating ring */}
      <div className="relative mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full"
          style={{
            width: 136,
            height: 136,
            top: -8, left: -8,
            background: 'conic-gradient(from 0deg, transparent 0%, #22c55e 40%, #4ade80 60%, transparent 100%)',
            borderRadius: '50%',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 130, height: 130, top: -5, left: -5, background: '#020b04', borderRadius: '50%' }}
        />

        {/* Logo container */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative w-[120px] h-[120px] rounded-full flex items-center justify-center z-10"
          style={{ background: 'linear-gradient(135deg, #0d2e14 0%, #1a5c35 100%)' }}
        >
          <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
            <rect x="14" y="18" width="30" height="28" rx="3" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="1.8"/>
            <path d="M10 18h38" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/>
            <path d="M22 14h14l2 4H20l2-4z" fill="rgba(74,222,128,0.25)" stroke="#4ade80" strokeWidth="1.4"/>
            <path d="M29 24v6M26 27l3-3 3 3" stroke="#86efac" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="29" cy="35" r="4" fill="none" stroke="#22c55e" strokeWidth="1.6"/>
            <path d="M27.5 35a1.5 1.5 0 103 0" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </div>

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.65, ease: 'easeOut' }}
        className="text-center"
      >
        <h1
          className="text-5xl font-black tracking-tight"
          style={{
            fontFamily: 'Outfit, sans-serif',
            background: 'linear-gradient(135deg, #86efac 0%, #22c55e 50%, #4ade80 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          EcoBin
        </h1>
        <p className="text-green-400/50 text-xs mt-2 tracking-[0.3em] uppercase font-medium">
          Smart AI Waste Management
        </p>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-green-300/30 text-[11px] mt-4 text-center px-8"
      >
        Report • Track • Recycle • Reward
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-20 w-44"
      >
        <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-75"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #16a34a, #4ade80)' }}
          />
        </div>
        <p className="text-center text-green-500/30 text-[10px] mt-2">Loading...</p>
      </motion.div>

      <div className="absolute bottom-6 text-green-600/25 text-[10px] tracking-wider">
        v1.0.0 · EcoBin Technologies Pvt. Ltd.
      </div>
    </div>
  )
}
