import { AnimatedRobot } from "@/components/AnimatedRobot"
import { Dock } from "@/components/Dock"
import { OSOverlay } from "@/components/OSOverlay"
import { MiniAppAbout } from "@/components/MiniAppAbout"

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center p-8 relative overflow-hidden">
        {/* Neo-brutal grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: "8px 8px",
          }}
        />

        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center w-full max-w-2xl flex-1 py-8">
          {/* Header */}
          <div className="flex flex-col items-center space-y-4 mb-10">
            <AnimatedRobot />
            <h1 className="text-4xl font-black text-center">Школа №18 — г. Ковров</h1>
            <p className="text-gray-500 font-medium text-center">Поиск участников конкурсов и олимпиад. Введите фамилию ученика — и система покажет все конкурсы, в которых он участвовал.</p>
          </div>

          {/* Search Form - directly on main page */}
          <div className="w-full">
            <MiniAppAbout />
          </div>
        </div>

        <div className="relative z-10 pb-4">
          <Dock />
        </div>
      </div>

      {/* OS Overlay */}
      <OSOverlay />
    </>
  )
}