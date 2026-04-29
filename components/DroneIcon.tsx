export default function DroneIcon({
  size = 24,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Center body */}
      <rect x="9" y="9.5" width="6" height="5" rx="1.2" fill="currentColor" stroke="none" />

      {/* NW arm */}
      <line x1="9.2" y1="10.2" x2="6" y2="7" strokeWidth="1.6" />
      {/* NE arm */}
      <line x1="14.8" y1="10.2" x2="18" y2="7" strokeWidth="1.6" />
      {/* SW arm */}
      <line x1="9.2" y1="13.8" x2="6" y2="17" strokeWidth="1.6" />
      {/* SE arm */}
      <line x1="14.8" y1="13.8" x2="18" y2="17" strokeWidth="1.6" />

      {/* NW rotor */}
      <circle cx="4.5" cy="5.5" r="2" strokeWidth="1.5" />
      {/* NE rotor */}
      <circle cx="19.5" cy="5.5" r="2" strokeWidth="1.5" />
      {/* SW rotor */}
      <circle cx="4.5" cy="18.5" r="2" strokeWidth="1.5" />
      {/* SE rotor */}
      <circle cx="19.5" cy="18.5" r="2" strokeWidth="1.5" />
    </svg>
  )
}
