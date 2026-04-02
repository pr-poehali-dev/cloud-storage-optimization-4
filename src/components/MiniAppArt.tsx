import Icon from "@/components/ui/icon"

export function MiniAppArt() {
  const stats = [
    { label: "Участников в базе", value: "12 480", icon: "Users" },
    { label: "Конкурсов", value: "347", icon: "Trophy" },
    { label: "Городов", value: "89", icon: "MapPin" },
    { label: "Призёров", value: "3 210", icon: "Star" },
  ]

  const topCities = [
    { city: "Москва", count: 3420 },
    { city: "Санкт-Петербург", count: 1870 },
    { city: "Казань", count: 980 },
    { city: "Новосибирск", count: 760 },
    { city: "Екатеринбург", count: 640 },
  ]

  const maxCount = topCities[0].count

  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-black pb-2">Статистика</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
            <Icon name={s.icon} size={28} className="mx-auto mb-2 text-[#FF2E63]" />
            <p className="text-3xl font-black">{s.value}</p>
            <p className="text-xs font-bold text-gray-600 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-2xl font-black mb-4">Топ городов по участникам</h3>
        <div className="space-y-3">
          {topCities.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between font-bold text-sm mb-1">
                <span>{item.city}</span>
                <span>{item.count.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-100 border-[2px] border-black h-5">
                <div
                  className="bg-[#FF2E63] h-full"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
