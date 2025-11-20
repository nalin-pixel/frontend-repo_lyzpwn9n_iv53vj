import React from 'react'
import HeroHeader from './components/HeroHeader'
import BookingForm from './components/BookingForm'
import InfoSection from './components/InfoSection'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.15),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(99,102,241,0.15),transparent_40%)]" />
      <div className="relative container mx-auto px-4 md:px-8 py-10 md:py-14">
        <HeroHeader />
        <div className="grid md:grid-cols-2 gap-8 mt-4">
          <BookingForm />
          <InfoSection />
        </div>
        <footer className="mt-12 text-center text-white/70 text-sm">
          © {new Date().getFullYear()} Salon Frizer. Vsi pravice pridržane.
        </footer>
      </div>
    </div>
  )
}

export default App
