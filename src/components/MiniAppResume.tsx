export function MiniAppResume() {
  const results = [
    { name: "Иванов Иван Иванович", city: "Москва", contest: "Олимпиада по математике 2024", place: "1 место" },
    { name: "Петрова Анна Сергеевна", city: "Санкт-Петербург", contest: "Конкурс молодых учёных 2024", place: "2 место" },
    { name: "Сидоров Алексей Петрович", city: "Казань", contest: "Чемпионат по программированию 2023", place: "3 место" },
  ]

  const placeColors: Record<string, string> = {
    "1 место": "bg-yellow-400",
    "2 место": "bg-gray-300",
    "3 место": "bg-orange-300",
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-black pb-2">Результаты конкурсов</h2>

      <div className="space-y-4">
        {results.map((r, i) => (
          <div key={i} className="bg-white p-5 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black">{r.name}</h3>
              <p className="text-gray-600 font-medium">{r.city}</p>
              <p className="text-sm mt-1">{r.contest}</p>
            </div>
            <span className={`${placeColors[r.place] || "bg-gray-100"} px-4 py-2 border-[2px] border-black font-black text-sm whitespace-nowrap`}>
              {r.place}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 border-[2px] border-black text-sm text-gray-500 font-medium">
        Это примерные данные. После подключения базы здесь появятся реальные результаты.
      </div>
    </div>
  )
}
