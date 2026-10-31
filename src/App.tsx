import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { Screen, AuthMode } from './types'
import SplashScreen from './screens/SplashScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import AuthScreen from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen'
import ReportWaste from './screens/ReportWaste'
import ComplaintTracking from './screens/ComplaintTracking'
import RewardsScreen from './screens/RewardsScreen'
import RecyclingGuide from './screens/RecyclingGuide'
import EventsScreen from './screens/EventsScreen'
import AdminDashboard from './screens/AdminDashboard'
import ProfileScreen from './screens/ProfileScreen'
import SettingsScreen from './screens/SettingsScreen'
import BottomNav from './components/BottomNav'

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [authMode, setAuthMode] = useState<AuthMode>('login')

  useEffect(() => {
    if (screen === 'splash') {
      const t = setTimeout(() => setScreen('welcome'), 3200)
      return () => clearTimeout(t)
    }
  }, [screen])

  const navigate = (s: Screen) => setScreen(s)
  const showNav = !['splash', 'welcome', 'auth'].includes(screen)

  const renderScreen = () => {
    switch (screen) {
      case 'splash': return <SplashScreen key="splash" />
      case 'welcome': return <WelcomeScreen key="welcome" navigate={navigate} />
      case 'auth': return <AuthScreen key="auth" mode={authMode} setMode={setAuthMode} navigate={navigate} />
      case 'home': return <HomeScreen key="home" navigate={navigate} />
      case 'report': return <ReportWaste key="report" navigate={navigate} />
      case 'complaints': return <ComplaintTracking key="complaints" navigate={navigate} />
      case 'rewards': return <RewardsScreen key="rewards" navigate={navigate} />
      case 'guide': return <RecyclingGuide key="guide" navigate={navigate} />
      case 'events': return <EventsScreen key="events" navigate={navigate} />
      case 'admin': return <AdminDashboard key="admin" navigate={navigate} />
      case 'profile': return <ProfileScreen key="profile" navigate={navigate} />
      case 'settings': return <SettingsScreen key="settings" navigate={navigate} />
      default: return <HomeScreen key="home" navigate={navigate} />
    }
  }

  return (
    <div
      className="min-h-screen w-full flex justify-center"
      style={{ background: 'linear-gradient(160deg, #020b04 0%, #030f06 50%, #051408 100%)' }}
    >
      {/* Ambient background orbs — fixed, behind everything */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-20%] left-[-15%] w-[70%] h-[70%] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.09), transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-15%] right-[-15%] w-[55%] h-[55%] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.06), transparent 70%)' }}
        />
        <div
          className="absolute top-[35%] left-[25%] w-[40%] h-[40%] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.04), transparent 70%)' }}
        />
      </div>

      {/* Phone-width container */}
      <div className="relative w-full max-w-[430px] min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          <div key={screen} className="flex-1">
            {renderScreen()}
          </div>
        </AnimatePresence>
        {showNav && <BottomNav current={screen} navigate={navigate} />}
      </div>
    </div>
  )
}
