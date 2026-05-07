interface OrnamentDividerProps {
  text?: string
}

export function OrnamentDivider({ text = '✦ ⬡ ✦' }: OrnamentDividerProps) {
  return (
    <div className="flex items-center gap-3 text-gold/60 my-5">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <span className="font-cinzel text-sm tracking-[0.3em] whitespace-nowrap">{text}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  )
}
