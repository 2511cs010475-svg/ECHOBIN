export type Screen =
  | 'splash'
  | 'welcome'
  | 'auth'
  | 'home'
  | 'report'
  | 'complaints'
  | 'rewards'
  | 'profile'
  | 'guide'
  | 'events'
  | 'admin'
  | 'settings'

export type NavigateFn = (screen: Screen) => void
export type AuthMode = 'login' | 'signup' | 'forgot' | 'otp' | 'reset'
