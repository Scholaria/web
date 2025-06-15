'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

// ⬇️  Update the image paths to match your project structure
const onboarding = [
  {
    id: 1,
    title: 'Discover research like never before',
    description:
      "Scholaria brings you bite-sized summaries of the world's newest papers—all in one place.",
    image: '/images/onboarding_image1.png',
  },
  {
    id: 2,
    title: 'Your feed, your field',
    description:
      'Personalized recommendations and trending topics tailored to your interests in science, tech, and beyond.',
    image: '/images/onboarding_image2.png',
  },
  {
    id: 3,
    title: 'Swipe, save, and spark ideas',
    description:
      'Explore, react, and connect with the global research community in a whole new way.',
    image: '/images/onboarding_image3.png',
  },
]

export default function Welcome() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Scholaria</h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl space-y-32 px-4 pt-24 pb-16">
        {onboarding.map(({ id, title, description, image }) => (
          <section
            key={id}
            className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl">
              <Image
                src={image}
                alt={title}
                width={700}
                height={350}
                className="h-auto w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
                priority={id === 1}
              />
            </div>

            <div className="mt-8 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </h2>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600">
                {description}
              </p>
            </div>
          </section>
        ))}

        {/* Call-to-action */}
        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={() => router.push('/sign-up')}
            className="group relative w-full max-w-sm overflow-hidden rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 transition-transform duration-1000 group-hover:translate-x-full" />
          </button>
          
          <button
            onClick={() => router.push('/sign-in')}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            Already have an account? Sign in
          </button>
        </div>
      </main>
    </div>
  )
}