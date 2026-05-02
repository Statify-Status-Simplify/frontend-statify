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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Statify</h1>
          <p className="mt-2 text-sm text-muted">
            Unified Digital Asset Guardian
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-lg border border-gray-700 bg-secondary p-8 shadow-lg">
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
                  <form onSubmit={handleSignIn} className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">
                          Password
                        </label>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="text-xs text-primary hover:underline"
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
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
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
                  <form onSubmit={handleCreateAccount} className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
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

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
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
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
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
        <div className="text-center pt-4">
          <button
            onClick={onAuthenticated}
            className="text-xs text-muted hover:text-primary"
          >
            [Dev: Bypass to Dashboard]
          </button>
        </div>
      </div>
    </div>
  )
}
