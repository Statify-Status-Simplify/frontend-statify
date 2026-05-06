import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { OTPInput } from './ui/OTPInput'
import { Loader, Radio } from 'lucide-react'

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
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 font-sans relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg space-y-10 relative z-10">
        {/* Logo/Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-16 w-16 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20">
            <Radio className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mt-4">Statify</h1>
            <p className="mt-3 text-base text-zinc-400 font-medium">
              Unified Digital Asset Guardian
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-2xl p-10 sm:p-12 shadow-2xl shadow-indigo-500/5">
          {step === 'form' ? (
            <>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                defaultValue="login"
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-1.5 shadow-inner">
                  <TabsTrigger value="login" className="rounded-lg py-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-semibold">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="rounded-lg py-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-semibold">Sign Up</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="mt-8">
                  <form onSubmit={handleSignIn} className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-zinc-300 tracking-wide">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-zinc-300 tracking-wide">
                          Password
                        </label>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors hover:underline underline-offset-4"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-8"
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
                <TabsContent value="signup" className="mt-8">
                  <form onSubmit={handleCreateAccount} className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-zinc-300 tracking-wide">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-zinc-300 tracking-wide">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-zinc-300 tracking-wide">
                        Password
                      </label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-8"
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
              <div className="space-y-8 py-4">
                <div className="text-center space-y-3">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Verify Your Email
                  </h2>
                  <p className="text-base text-zinc-400 font-medium">
                    Enter the 6-digit code sent to <span className="text-zinc-200 font-bold">{signupEmail || loginEmail}</span>
                  </p>
                </div>

                <form onSubmit={handleVerifyOTP} className="space-y-8 mt-8">
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
                        <Loader className="mr-2 h-5 w-5 animate-spin" />
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
                    className="w-full text-sm font-semibold text-zinc-400 hover:text-white transition-colors hover:underline underline-offset-4"
                  >
                    Back to {activeTab === 'login' ? 'Sign In' : 'Sign Up'}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>

        {/* Dev Helper */}
        <div className="text-center pt-2">
          <button
            onClick={onAuthenticated}
            className="text-xs font-medium text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            [Dev: Bypass to Dashboard]
          </button>
        </div>
      </div>
    </div>
  )
}
