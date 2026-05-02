import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { OTPInput } from './ui/OTPInput'
import { Loader } from 'lucide-react'

interface AuthFlowProps {
  onAuthenticated: () => void
}

export function AuthFlow({ onAuthenticated }: AuthFlowProps) {
  const [activeTab, setActiveTab] = useState('login')
  const [step, setStep] = useState<'form' | 'otp'>('form')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Sign up form state
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    setStep('otp')
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP')
      return
    }
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    onAuthenticated()
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    onAuthenticated()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo/Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Statify</h1>
          <p className="text-zinc-400 font-medium">
            Unified Digital Asset Guardian
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-xl">
          {step === 'form' ? (
            <>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                defaultValue="login"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleSignIn} className="space-y-6 pt-6">
                    <div className="space-y-2.5">
                      <label className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="h-11 text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">
                          Password
                        </label>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="h-11 text-base"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 text-base font-semibold shadow-lg shadow-indigo-500/20 mt-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader className="mr-2 h-5 w-5 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Sign Up Tab */}
                <TabsContent value="signup">
                  <form onSubmit={handleCreateAccount} className="space-y-6 pt-6">
                    <div className="space-y-2.5">
                      <label className="text-sm font-medium text-foreground">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="h-11 text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2.5">
                      <label className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="h-11 text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2.5">
                      <label className="text-sm font-medium text-foreground">
                        Password
                      </label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="h-11 text-base"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 text-base font-semibold shadow-lg shadow-indigo-500/20 mt-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader className="mr-2 h-5 w-5 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <>
              {/* OTP Verification Step */}
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-foreground">
                    Verify Your Email
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    Enter the 6-digit code sent to {signupEmail || loginEmail}
                  </p>
                </div>

                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div className="flex justify-center">
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      length={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify & Continue'
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep('form')
                      setOtp('')
                    }}
                    className="w-full text-sm text-primary hover:underline"
                  >
                    Back to {activeTab === 'login' ? 'Sign In' : 'Sign Up'}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>

        {/* Dev Helper */}
        <div className="text-center pt-8">
          <button
            onClick={onAuthenticated}
            className="text-xs font-bold text-zinc-500 hover:text-indigo-400 transition-colors py-2 px-4 rounded-lg border border-transparent hover:border-zinc-800 hover:bg-zinc-900/50"
          >
            [Dev: Bypass to Dashboard]
          </button>
        </div>
      </div>
    </div>
  )
}
