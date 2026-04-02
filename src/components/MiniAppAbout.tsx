import { useState } from "react"
import Icon from "@/components/ui/icon"

export function MiniAppAbout() {
  const [form, setForm] = useState({ surname: "", name: "", patronymic: "", city: "" })
  const [searched, setSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
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
          <button
            type="submit"
            className="w-full bg-[#FF2E63] text-white py-3 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black text-lg flex items-center justify-center gap-2"
          >
            <Icon name="Search" size={20} />
            Найти участника
          </button>
        </form>
      </div>

      {searched && (
        <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 text-gray-500">
            <Icon name="Info" size={20} />
            <p className="font-medium">Результаты появятся после подключения базы данных участников.</p>
          </div>
        </div>
      )}
    </div>
  )
}
