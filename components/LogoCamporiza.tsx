export default function LogoCamporiza({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Camporiza Logo"
    >
      {/* Outer ring */}
      <circle cx="100" cy="100" r="99" fill="#163816" />
      {/* Main circle */}
      <circle cx="100" cy="100" r="94" fill="#1A4A1A" />
      {/* Inner ring accent */}
      <circle cx="100" cy="100" r="91" fill="none" stroke="#2D7A2D" strokeWidth="1.5" />

      {/* ── Drone (top-down quadcopter view) ── */}
      {/* Central body */}
      <rect x="85" y="33" width="30" height="20" rx="4" fill="white" opacity="0.95" />
      {/* Body detail line */}
      <line x1="100" y1="33" x2="100" y2="53" stroke="#1A4A1A" strokeWidth="1.5" />

      {/* NW arm */}
      <line x1="87" y1="36" x2="65" y2="22" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      {/* NE arm */}
      <line x1="113" y1="36" x2="135" y2="22" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      {/* SW arm */}
      <line x1="87" y1="50" x2="65" y2="64" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      {/* SE arm */}
      <line x1="113" y1="50" x2="135" y2="64" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />

      {/* NW rotor */}
      <circle cx="62" cy="19" r="11" fill="none" stroke="white" strokeWidth="2.5" opacity="0.85" />
      <circle cx="62" cy="19" r="2.5" fill="white" opacity="0.7" />
      {/* NE rotor */}
      <circle cx="138" cy="19" r="11" fill="none" stroke="white" strokeWidth="2.5" opacity="0.85" />
      <circle cx="138" cy="19" r="2.5" fill="white" opacity="0.7" />
      {/* SW rotor */}
      <circle cx="62" cy="67" r="11" fill="none" stroke="white" strokeWidth="2.5" opacity="0.85" />
      <circle cx="62" cy="67" r="2.5" fill="white" opacity="0.7" />
      {/* SE rotor */}
      <circle cx="138" cy="67" r="11" fill="none" stroke="white" strokeWidth="2.5" opacity="0.85" />
      <circle cx="138" cy="67" r="2.5" fill="white" opacity="0.7" />

      {/* ── CAMPORIZA text ── */}
      <text
        x="100"
        y="101"
        textAnchor="middle"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="28"
        letterSpacing="1"
        fill="white"
      >
        CAMPO
        <tspan fill="#6FCF7C">RIZA</tspan>
      </text>

      {/* ── PULVERIZAÇÃO AGRÍCOLA ── */}
      <text
        x="100"
        y="118"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="500"
        fontSize="10"
        letterSpacing="1.5"
        fill="white"
        opacity="0.75"
      >
        PULVERIZAÇÃO AGRÍCOLA
      </text>

      {/* ── Agricultural field waves (bottom) ── */}
      <clipPath id="circle-clip">
        <circle cx="100" cy="100" r="91" />
      </clipPath>
      <g clipPath="url(#circle-clip)">
        {/* Wave layers bottom-up */}
        <path
          d="M0 158 Q50 148 100 158 Q150 168 200 158 L200 200 L0 200 Z"
          fill="#2D7A2D"
          opacity="0.6"
        />
        <path
          d="M0 168 Q50 158 100 168 Q150 178 200 168 L200 200 L0 200 Z"
          fill="#2D7A2D"
          opacity="0.5"
        />
        <path
          d="M0 178 Q50 170 100 178 Q150 186 200 178 L200 200 L0 200 Z"
          fill="#235923"
          opacity="0.7"
        />
      </g>

      {/* "™" superscript */}
      <text
        x="169"
        y="94"
        fontFamily="Arial, sans-serif"
        fontSize="9"
        fill="white"
        opacity="0.5"
      >
        ™
      </text>
    </svg>
  )
}
