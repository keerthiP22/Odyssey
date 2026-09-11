export default function SkylineScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Moon Glow */}
      <div className="absolute right-16 top-10 h-44 w-44 rounded-full bg-yellow-200/10 blur-3xl" />

      {/* Moon */}
      <div className="absolute right-20 top-16 h-24 w-24 rounded-full bg-yellow-200 shadow-[0_0_80px_rgba(255,230,120,.45)]" />

      {/* Stars */}
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white animate-pulse"
          style={{
            left: `${8 + (i * 5) % 90}%`,
            top: `${10 + (i * 9) % 45}%`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* Skyline */}

      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1600 320"
        preserveAspectRatio="none"
      >
        <g fill="#202942">
          <rect x="0" y="170" width="90" height="150" rx="4" />
          <rect x="110" y="120" width="120" height="200" rx="4" />
          <rect x="250" y="150" width="140" height="170" rx="4" />
          <rect x="420" y="90" width="130" height="230" rx="4" />
          <rect x="590" y="140" width="110" height="180" rx="4" />
          <rect x="730" y="80" width="140" height="240" rx="4" />
          <rect x="900" y="120" width="130" height="200" rx="4" />
          <rect x="1060" y="160" width="110" height="160" rx="4" />
          <rect x="1210" y="110" width="140" height="210" rx="4" />
          <rect x="1380" y="140" width="160" height="180" rx="4" />
        </g>

        {/* Windows */}

        <g fill="#F7D34A">
          {[
            [135,145],[135,175],[135,205],[135,235],
            [175,145],[175,175],[175,205],[175,235],

            [455,120],[455,150],[455,180],[455,210],
            [500,120],[500,150],[500,180],[500,210],

            [770,110],[770,145],[770,180],[770,215],
            [820,110],[820,145],[820,180],[820,215],

            [1245,135],[1245,165],[1245,195],[1245,225],
            [1290,135],[1290,165],[1290,195],[1290,225]
          ].map(([x,y],i)=>(
            <rect
              key={i}
              x={x}
              y={y}
              width="18"
              height="10"
              rx="2"
            />
          ))}
        </g>
      </svg>

      {/* Ground Fog */}

      <div className="absolute bottom-0 h-24 w-full bg-gradient-to-t from-[#0B1020] via-[#0B1020]/80 to-transparent" />
    </div>
  );
}