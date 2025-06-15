'use client'

import { useState } from 'react'

interface ReadingMaterial {
  id: string
  title: string
  progress: number
  lastRead: string
  type: 'book' | 'article' | 'paper'
}

export default function ResumeReading() {
  const [materials] = useState<ReadingMaterial[]>([
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      progress: 65,
      lastRead: '2 hours ago',
      type: 'book',
    },
    {
      id: '2',
      title: 'The Future of AI in Education',
      progress: 30,
      lastRead: '1 day ago',
      type: 'article',
    },
    {
      id: '3',
      title: 'Quantum Computing Basics',
      progress: 45,
      lastRead: '3 days ago',
      type: 'paper',
    },
  ])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Resume Reading</h1>
      <div className="grid gap-4">
        {materials.map((material) => (
          <div
            key={material.id}
            className="rounded-lg border p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">{material.title}</h2>
              <span className="text-sm text-muted-foreground">
                {material.lastRead}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">
                {material.type.charAt(0).toUpperCase() + material.type.slice(1)}
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {material.progress}% complete
              </span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${material.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 