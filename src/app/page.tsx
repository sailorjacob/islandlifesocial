import { Header } from '@/components/layout/header'
import { WeeklyCalendar } from '@/components/calendar/weekly-calendar'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Island Life Hostel</h1>
          <p className="text-gray-600 text-lg">Weekly Content Calendar</p>
        </div>

        <WeeklyCalendar />
      </main>
    </div>
  )
}
