'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Setup() {
  const router = useRouter()
  const [preferences, setPreferences] = useState({
    interests: [] as string[],
    studyGoals: '',
    preferredSubjects: [] as string[],
  })

  const interests = [
    'Mathematics',
    'Science',
    'History',
    'Literature',
    'Computer Science',
    'Languages',
    'Art',
    'Music',
  ]

  const handleInterestToggle = (interest: string) => {
    setPreferences((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save user preferences
    router.push('/welcome')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Set up your profile</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us about your interests and goals
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select your interests
              </label>
              <div className="grid grid-cols-2 gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-2 rounded-md border ${
                      preferences.interests.includes(interest)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="studyGoals" className="block text-sm font-medium">
                What are your study goals?
              </label>
              <textarea
                id="studyGoals"
                name="studyGoals"
                rows={3}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                value={preferences.studyGoals}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    studyGoals: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
} 