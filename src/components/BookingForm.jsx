import React, { useEffect, useMemo, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const daysMap = {
  0: 'nedelja',
  1: 'ponedeljek',
  2: 'torek',
  3: 'sreda',
  4: 'četrtek',
  5: 'petek',
  6: 'sobota',
}

function BookingForm() {
  const [services, setServices] = useState([])
  const [serviceKey, setServiceKey] = useState('striženje')
  const [duration, setDuration] = useState(30)
  const [date, setDate] = useState('')
  const [slots, setSlots] = useState([])
  const [startTime, setStartTime] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' })
  const [status, setStatus] = useState(null)

  useEffect(() => {
    fetch(`${BACKEND}/api/services`).then(r => r.json()).then(data => {
      setServices(data)
      const cut = data.find(s => s.key === 'striženje')
      if (cut) setDuration(Math.min(cut.max_duration, 30))
    })
  }, [])

  useEffect(() => {
    if (!date || !duration) return
    fetch(`${BACKEND}/api/availability`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, service: serviceKey, duration_minutes: Number(duration) })
    }).then(r => r.json()).then(setSlots)
  }, [date, duration, serviceKey])

  const currentService = useMemo(() => services.find(s => s.key === serviceKey), [services, serviceKey])

  const durations = useMemo(() => {
    if (!currentService) return []
    const arr = []
    for (let m = currentService.min_duration; m <= currentService.max_duration; m += currentService.step) arr.push(m)
    return arr
  }, [currentService])

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Pošiljam...')
    try {
      const res = await fetch(`${BACKEND}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: serviceKey,
          duration_minutes: Number(duration),
          date,
          start_time: startTime,
          name: form.name,
          phone: form.phone,
          email: form.email || null,
          notes: form.notes || null
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Napaka pri oddaji')
      setStatus(`Termin potrjen. Zaključek ob ${data.end_time}. Hvala!`)
    } catch (e) {
      setStatus(`Napaka: ${e.message}`)
    }
  }

  return (
    <section className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-6 md:p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-slate-900">Naročanje na termin</h2>
      <p className="text-slate-600 mt-1">Delovni čas: pon & tor dopoldne, ostali dnevi popoldne.</p>

      <form onSubmit={submit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Storitev</label>
          <select value={serviceKey} onChange={e => setServiceKey(e.target.value)} className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500">
            {services.map(s => (
              <option key={s.key} value={s.key}>{s.title}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Trajanje</label>
          <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500">
            {durations.map(m => (
              <option key={m} value={m}>{m} min</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Datum</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Prosti termini</label>
          <select value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500">
            <option value="">Izberi uro</option>
            {slots.map(s => (
              <option key={s.start} value={s.start}>{s.start} – {s.end}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Ime in priimek</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" required />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Telefon</label>
          <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" required />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-slate-700">E-pošta (opcijsko)</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Opombe</label>
          <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" rows={3} />
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
          <button disabled={!date || !startTime} className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Potrdi termin
          </button>
          {status && <span className="text-sm text-slate-700">{status}</span>}
        </div>
      </form>
    </section>
  )
}

export default BookingForm
