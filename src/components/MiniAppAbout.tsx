import { useState } from "react"
import Icon from "@/components/ui/icon"

const SEARCH_URL = "https://functions.poehali.dev/50f59de4-8b44-4d48-9a56-b35038e7a76c"

interface Contest {
  title: string
  city: string
  held_date: string | null
  place: string | null
  score: number | null
}

interface Participant {
  id: number
  surname: string
  name: string
  patronymic: string
  city: string
  contests: Contest[]
}

const placeColor = (place: string | null) => {
  if (!place) return "bg-gray-100 text-black"
  if (place.startsWith("1")) return "bg-yellow-400 text-black"
  if (place.startsWith("2")) return "bg-gray-300 text-black"
  if (place.startsWith("3")) return "bg-orange-300 text-black"
  return "bg-white text-black"
}

export function MiniAppAbout() {
  const [form, setForm] = useState({ surname: "", name: "", patronymic: "", city: "" })
  const [results, setResults] = useState<Participant[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    setSearched(false)

    const params = new URLSearchParams()
    if (form.surname) params.append("surname", form.surname)
    if (form.name) params.append("name", form.name)
    if (form.patronymic) params.append("patronymic", form.patronymic)
    if (form.city) params.append("city", form.city)

    if (!params.toString()) {
      setError("Заполните хотя бы одно поле")
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`${SEARCH_URL}?${params.toString()}`)
      const text = await res.text()
      const data = JSON.parse(text)
      const parsed = typeof data === "string" ? JSON.parse(data) : data

      if (!res.ok) {
        setError(parsed.error || "Ошибка поиска")
      } else {
        setResults(parsed.participants || [])
        setSearched(true)
      }
    } catch (err) {
      setError("Не удалось получить данные. Попробуйте ещё раз.")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-black pb-2">Поиск участника</h2>

      <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
        <h3 className="text-xl font-black mb-4">Введите данные для поиска</h3>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-sm mb-1">Фамилия</label>
              <input
                type="text"
                placeholder="Иванов"
                value={form.surname}
                onChange={(e) => setForm({ ...form, surname: e.target.value })}
                className="w-full p-3 border-[3px] border-black font-medium text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
            <div>
              <label className="block font-bold text-sm mb-1">Имя</label>
              <input
                type="text"
                placeholder="Иван"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 border-[3px] border-black font-medium text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
            <div>
              <label className="block font-bold text-sm mb-1">Отчество</label>
              <input
                type="text"
                placeholder="Иванович"
                value={form.patronymic}
                onChange={(e) => setForm({ ...form, patronymic: e.target.value })}
                className="w-full p-3 border-[3px] border-black font-medium text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
            <div>
              <label className="block font-bold text-sm mb-1">Город</label>
              <input
                type="text"
                placeholder="Москва"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full p-3 border-[3px] border-black font-medium text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
          </div>

          {error && (
            <p className="text-[#FF2E63] font-bold text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF2E63] text-white py-3 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Icon name={loading ? "Loader2" : "Search"} size={20} className={loading ? "animate-spin" : ""} />
            {loading ? "Ищем..." : "Найти участника"}
          </button>
        </form>
      </div>

      {searched && results.length === 0 && (
        <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 text-gray-500">
            <Icon name="SearchX" size={20} />
            <p className="font-medium">Участников по вашему запросу не найдено.</p>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-6">
          <p className="font-bold text-sm text-gray-600">Найдено участников: {results.length}</p>
          {results.map((p) => (
            <div key={p.id} className="bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="p-4 border-b-[3px] border-black bg-[#FF2E63] text-white">
                <h3 className="text-xl font-black">{p.surname} {p.name} {p.patronymic}</h3>
                <p className="text-sm font-medium opacity-90 flex items-center gap-1 mt-1">
                  <Icon name="MapPin" size={14} /> {p.city}
                </p>
              </div>
              <div className="divide-y-[2px] divide-black">
                {p.contests.map((c, i) => (
                  <div key={i} className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold">{c.title}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <Icon name="MapPin" size={12} /> {c.city}
                        {c.held_date && <span className="ml-2">· {c.held_date}</span>}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      {c.place && (
                        <span className={`${placeColor(c.place)} px-3 py-1 border-[2px] border-black font-black text-sm block`}>
                          {c.place}
                        </span>
                      )}
                      {c.score != null && (
                        <p className="text-xs font-bold text-gray-500 mt-1">{c.score} баллов</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}