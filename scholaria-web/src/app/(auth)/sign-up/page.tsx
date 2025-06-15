'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Dialog } from '@headlessui/react'
import { useSignUp } from '@clerk/clerk-react'
import { FormEvent, useState } from 'react'

// ──────────────────────────────────────────────────────────────────────────
// Helper types
type UserForm = { name: string; email: string; password: string }
type VerifyForm = { code: string; error: string }

// ──────────────────────────────────────────────────────────────────────────
export default function SignUp() {
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()

  // main form data
  const [user, setUser] = useState<UserForm>({
    name: '',
    email: '',
    password: '',
  })

  // verification-code modal state
  const [verify, setVerify] = useState<VerifyForm>({
    code: '',
    error: '',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  // ───────── handle main sign-up submit ─────────
  const handleCreateAccount = async (e: FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress: user.email,
        password: user.password,
      })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setIsModalOpen(true)
    } catch (err: any) {
      alert(err.errors?.[0]?.longMessage ?? 'Something went wrong')
    }
  }

  // ───────── handle OTP verify ─────────
  const handleVerify = async () => {
    if (!isLoaded) return

    try {
      const res = await signUp.attemptEmailAddressVerification({
        code: verify.code,
      })

      if (res.status === 'complete') {
        // add user to backend
        await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({
            clerkId: res.createdUserId,
            name: user.name,
            email: user.email,
          }),
          headers: { 'Content-Type': 'application/json' },
        })

        await setActive({ session: res.createdSessionId })
        router.push('/setup')
      } else {
        setVerify((v) => ({ ...v, error: 'Verification failed' }))
      }
    } catch (err: any) {
      setVerify((v) => ({
        ...v,
        error: err.errors?.[0]?.longMessage ?? 'Verification failed',
      }))
    }
  }

  // ──────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Scholaria</h1>
        </div>
      </header>

      {/* Header image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src="/images/login_bg.jpg"
          alt="Header background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        <h1 className="absolute bottom-6 left-6 text-3xl font-bold text-white">
          Create Your Account
        </h1>
      </div>

      {/* Form */}
      <main className="mx-auto w-full max-w-md space-y-8 px-6 py-10">
        <form onSubmit={handleCreateAccount} className="space-y-6">
          {/* name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter your name"
            />
          </div>

          {/* email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter your email"
            />
          </div>

          {/* password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
          >
            <span className="relative z-10">Create Account</span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 transition-transform duration-1000 group-hover:translate-x-full" />
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-gray-50 px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* OAuth buttons (keep your existing component if desired) */}
        {/* <OAuth /> */}

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/sign-in" className="font-medium text-primary hover:text-primary/80 transition-colors">
            Log In
          </a>
        </p>
      </main>

      {/* ───────── Verification Modal ───────── */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
            <Dialog.Title className="mb-2 text-2xl font-bold text-gray-900">
              Verify your email
            </Dialog.Title>
            <p className="mb-6 text-sm text-gray-600">
              We sent a 6-digit code to{' '}
              <span className="font-medium text-gray-900">{user.email}</span>
            </p>

            <div className="space-y-4">
              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                value={verify.code}
                onChange={(e) =>
                  setVerify({ ...verify, code: e.target.value, error: '' })
                }
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-center text-lg tracking-widest shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />

              {verify.error && (
                <p className="text-sm text-red-600">{verify.error}</p>
              )}

              <button
                onClick={handleVerify}
                className="w-full rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
              >
                Verify Email
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}