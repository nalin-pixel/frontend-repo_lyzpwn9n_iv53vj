import React from 'react'

function HeroHeader() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-50 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full" />
      </div>
      <div className="text-center py-14">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">Salon Frizer – Spletno naročanje</h1>
        <p className="mt-4 text-lg md:text-xl text-white/80">
          Moderna stran v slovenščini z enostavnim naročanjem na termin za striženje ali barvanje.
        </p>
      </div>
    </header>
  )
}

export default HeroHeader
