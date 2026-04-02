export function MiniAppWritings() {
  const contests = [
    {
      title: "Олимпиада по математике",
      date: "Март 2025",
      excerpt: "Всероссийская олимпиада для школьников и студентов. Участники со всех регионов страны.",
    },
    {
      title: "Конкурс молодых учёных",
      date: "Янв 2025",
      excerpt: "Ежегодный конкурс научных работ среди молодёжи до 35 лет. Номинации в 12 областях науки.",
    },
    {
      title: "Чемпионат по программированию",
      date: "Ноя 2024",
      excerpt: "Командный чемпионат по спортивному программированию. Более 500 участников из 40 городов.",
    },
  ]

  return (
    <div className="max-w-2xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-black pb-2">Конкурсы</h2>

      <div className="space-y-4">
        {contests.map((c, i) => (
          <article
            key={i}
            className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-black">{c.title}</h3>
              <span className="text-sm font-bold bg-[#FF2E63] text-white px-2 py-1 border-[2px] border-black">
                {c.date}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">{c.excerpt}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="bg-[#FF2E63] text-white px-6 py-3 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black text-lg">
          Все конкурсы
        </button>
      </div>
    </div>
  )
}
