import React from 'react'

function InfoSection() {
  return (
    <section className="grid md:grid-cols-3 gap-6">
      <div className="bg-white/80 border border-white/40 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-900">Storitve</h3>
        <p className="mt-2 text-slate-700">• Striženje (do 30 min)<br/>• Barvanje (1,5 do 4 ure)</p>
      </div>
      <div className="bg-white/80 border border-white/40 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-900">Delovni čas</h3>
        <p className="mt-2 text-slate-700">Pon & Tor: 08:00–12:00<br/>Sre–Pet: 14:00–19:00<br/>Sob: 14:00–18:00</p>
      </div>
      <div className="bg-white/80 border border-white/40 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-900">Lokacija in kontakt</h3>
        <p className="mt-2 text-slate-700">Vaš naslov, mesto<br/>Telefon: 040 000 000<br/>Email: salon@example.si</p>
      </div>
    </section>
  )
}

export default InfoSection
