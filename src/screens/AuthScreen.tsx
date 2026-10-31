import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, CheckCircle } from 'lucide-react'
import type { NavigateFn, AuthMode } from '../types'

interface Props {
  mode: AuthMode
  setMode: (m: AuthMode) => void
  navigate: NavigateFn
}

const GlassInput = ({
  icon: Icon,
  placeholder,
  type = 'text',
  value,
  onChange,
  right,
}: {
  icon: React.ElementType
  placeholder: string
  type?: string
  value: string
  onChange: (v: string) => void
  right?: React.ReactNode
}) => (
  <div
    className="flex items-center gap-3 px-4 py-3.5 rounded-xl mb-3"
    style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(34,197,94,0.15)',
    }}
  >
    <Icon size={16} className="text-green-400/50 flex-shrink-0" />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 bg-transparent text-sm text-green-50 focus:outline-none"
    />
    {right}
  </div>
)

export default function AuthScreen({ mode, setMode, navigate }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [showPass, setShowPass] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const passwordStrength = () => {
    if (password.length === 0) return 0
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  }
  const strength = passwordStrength()
  const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e']
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong']

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (mode === 'forgot') { setMode('otp'); setOtpSent(true) }
      else navigate('home')
    }, 1600)
  }

  const handleOtpChange = (i: number, val: string) => {
    if (val.length > 1) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    if (val && i < 5) {
      document.getElementById(`otp-${i + 1}`)?.focus()
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #020b04 0%, #030f06 60%, #051408 100%)' }}
    >
      {/* Background orb */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #22c55e, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />

      {/* Back button */}
      {mode !== 'login' && (
        <button
          className="absolute top-12 left-5 text-green-400/60 hover:text-green-400 transition-colors z-10"
          onClick={() => setMode('login')}
        >
          <ArrowLeft size={20} />
        </button>
      )}

      <div className="flex-1 flex flex-col justify-center px-6 py-12 pt-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
            style={{ background: 'linear-gradient(135deg, #0d2e14, #1a5c35)', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            <span className="text-2xl">♻️</span>
          </div>
          <h1
            className="text-2xl font-bold text-white"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Join EcoBin'}
            {mode === 'forgot' && 'Reset Password'}
            {mode === 'otp' && 'Enter OTP'}
            {mode === 'reset' && 'New Password'}
          </h1>
          <p className="text-green-400/50 text-sm mt-1">
            {mode === 'login' && 'Sign in to your EcoBin account'}
            {mode === 'signup' && 'Create your eco warrior profile'}
            {mode === 'forgot' && `We'll send a code to ${email || 'your email'}`}
            {mode === 'otp' && 'Check your email for the 6-digit code'}
            {mode === 'reset' && 'Choose a strong new password'}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Glass card */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(34,197,94,0.12)',
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* OTP mode */}
              {mode === 'otp' && (
                <div>
                  {otpSent && (
                    <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg" style={{ background: 'rgba(34,197,94,0.1)' }}>
                      <CheckCircle size={14} className="text-green-400" />
                      <span className="text-green-300 text-xs">OTP sent to your email</span>
                    </div>
                  )}
                  <p className="text-green-400/60 text-sm mb-4 text-center">Enter the 6-digit verification code</p>
                  <div className="flex gap-2 justify-center mb-4">
                    {otp.map((d, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        className="w-11 h-12 text-center text-lg font-bold rounded-xl text-green-100 focus:outline-none"
                        style={{
                          background: d ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)',
                          border: d ? '1px solid rgba(34,197,94,0.5)' : '1px solid rgba(34,197,94,0.12)',
                        }}
                      />
                    ))}
                  </div>
                  <button className="text-green-400/60 text-xs text-center w-full hover:text-green-400">
                    Resend in 54s
                  </button>
                </div>
              )}

              {/* Signup fields */}
              {mode === 'signup' && (
                <GlassInput icon={User} placeholder="Full Name" value={name} onChange={setName} />
              )}
              {mode === 'signup' && (
                <GlassInput icon={Phone} placeholder="Phone Number" value={phone} onChange={setPhone} />
              )}

              {/* Email (login, signup, forgot) */}
              {mode !== 'otp' && mode !== 'reset' && (
                <GlassInput icon={Mail} placeholder="Email address" type="email" value={email} onChange={setEmail} />
              )}

              {/* Password (login, signup, reset) */}
              {(mode === 'login' || mode === 'signup' || mode === 'reset') && (
                <>
                  <GlassInput
                    icon={Lock}
                    placeholder={mode === 'reset' ? 'New password' : 'Password'}
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={setPassword}
                    right={
                      <button onClick={() => setShowPass(!showPass)} className="text-green-400/40 hover:text-green-400">
                        {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    }
                  />
                  {(mode === 'signup' || mode === 'reset') && password.length > 0 && (
                    <div className="mb-3 px-1">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((s) => (
                          <div
                            key={s}
                            className="h-1 flex-1 rounded-full transition-all duration-300"
                            style={{ background: s <= strength ? strengthColors[strength - 1] : 'rgba(255,255,255,0.08)' }}
                          />
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: strength > 0 ? strengthColors[strength - 1] : 'transparent' }}>
                        {strength > 0 ? strengthLabels[strength - 1] : ''}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Remember me + Forgot (login only) */}
              {mode === 'login' && (
                <div className="flex items-center justify-between mb-4 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => setRememberMe(!rememberMe)}
                      className="w-4 h-4 rounded flex items-center justify-center cursor-pointer transition-all"
                      style={{ background: rememberMe ? '#22c55e' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(34,197,94,0.3)' }}
                    >
                      {rememberMe && <span className="text-white text-[8px]">✓</span>}
                    </div>
                    <span className="text-green-400/60 text-xs">Remember me</span>
                  </label>
                  <button onClick={() => setMode('forgot')} className="text-green-400 text-xs hover:text-green-300">
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit button */}
              {mode !== 'otp' && (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 mt-2 transition-all active:scale-[0.98]"
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    background: loading ? 'rgba(34,197,94,0.4)' : 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: '#052e16',
                    boxShadow: loading ? 'none' : '0 6px 24px rgba(34,197,94,0.35)',
                  }}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-green-900/40 border-t-green-900 rounded-full"
                    />
                  ) : (
                    <>
                      {mode === 'login' && 'Sign In'}
                      {mode === 'signup' && 'Create Account'}
                      {mode === 'forgot' && 'Send Reset Code'}
                      {mode === 'reset' && 'Update Password'}
                    </>
                  )}
                </button>
              )}

              {mode === 'otp' && (
                <button
                  onClick={() => { setMode('reset') }}
                  disabled={otp.join('').length < 6}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm mt-4 transition-all active:scale-[0.98]"
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    background: otp.join('').length === 6 ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'rgba(34,197,94,0.2)',
                    color: otp.join('').length === 6 ? '#052e16' : '#4ade80',
                  }}
                >
                  Verify OTP
                </button>
              )}

              {/* Divider (login/signup) */}
              {(mode === 'login' || mode === 'signup') && (
                <>
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px" style={{ background: 'rgba(34,197,94,0.1)' }} />
                    <span className="text-green-400/30 text-xs">or continue with</span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(34,197,94,0.1)' }} />
                  </div>
                  <button
                    onClick={() => navigate('home')}
                    className="w-full py-3 rounded-xl flex items-center justify-center gap-3 text-sm font-medium transition-all hover:bg-white/[0.06]"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#f0fdf4',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>
                </>
              )}
            </div>

            {/* Switch mode */}
            {(mode === 'login' || mode === 'signup') && (
              <p className="text-center text-sm text-green-400/50 mt-5">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-green-400 font-semibold hover:text-green-300"
                >
                  {mode === 'login' ? 'Sign Up' : 'Login'}
                </button>
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
