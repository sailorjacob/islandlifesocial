import { Header } from '@/components/layout/header'
import { MoodboardGrid } from '@/components/moodboard/moodboard-grid'

export default function MoodboardPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Moodboard</h1>
          <p className="text-gray-600 text-lg">
            Visual organization of your social media content
          </p>
        </div>

        <MoodboardGrid />
      </main>
    </div>
  )
}
