const PARTICLES = [
  { left: '10%', duration: '12s', delay: '0s', size: 3 },
  { left: '25%', duration: '16s', delay: '3s', size: 2 },
  { left: '60%', duration: '14s', delay: '6s', size: 3 },
  { left: '80%', duration: '18s', delay: '2s', size: 2 },
  { left: '45%', duration: '11s', delay: '8s', size: 3 },
  { left: '90%', duration: '15s', delay: '1s', size: 4 },
]

export function Particles() {
  return (
    <>
      {PARTICLES.map((p) => (
        <div
          key={p.left}
          aria-hidden="true"
          className="fixed pointer-events-none z-[1] rounded-full bg-gold animate-float-up"
          style={{
            left: p.left,
            bottom: 0,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </>
  )
}
