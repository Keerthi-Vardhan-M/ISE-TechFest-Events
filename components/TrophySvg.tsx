interface TrophySvgProps {
  tier: "gold" | "silver" | "bronze" | "blue";
  className?: string;
  badgeText?: string;
}

export default function TrophySvg({
  tier,
  className = "w-48 h-48 sm:w-56 sm:h-56",
  badgeText,
}: TrophySvgProps) {
  const rankText = badgeText || (tier === "gold" ? "1ST" : tier === "silver" ? "2ND" : "3RD");

  // Palette configurations per tier
  const configs = {
    gold: {
      id: "gold",
      primaryStart: "#FFE27A",
      primaryMid: "#F59E0B",
      primaryDark: "#B45309",
      accentHighlight: "#FFFDF0",
      deepShadow: "#78350F",
      rimInner: "#632705",
      plaqueBg: "#78350F",
      plaqueText: "#FEF3C7",
      plaqueBorder: "#FDE68A",
      glowColor: "rgba(245, 158, 11, 0.28)",
      starFill: "#FFFBEB",
    },
    silver: {
      id: "silver",
      primaryStart: "#FFFFFF",
      primaryMid: "#CBD5E1",
      primaryDark: "#64748B",
      accentHighlight: "#F8FAFC",
      deepShadow: "#334155",
      rimInner: "#1E293B",
      plaqueBg: "#1E293B",
      plaqueText: "#F1F5F9",
      plaqueBorder: "#94A3B8",
      glowColor: "rgba(148, 163, 184, 0.25)",
      starFill: "#FFFFFF",
    },
    bronze: {
      id: "bronze",
      primaryStart: "#FED7AA",
      primaryMid: "#EA580C",
      primaryDark: "#9A3412",
      accentHighlight: "#FFF7ED",
      deepShadow: "#601E06",
      rimInner: "#431407",
      plaqueBg: "#431407",
      plaqueText: "#FFEDD5",
      plaqueBorder: "#FDBA74",
      glowColor: "rgba(234, 88, 12, 0.25)",
      starFill: "#FFF7ED",
    },
    blue: {
      id: "blue",
      primaryStart: "#93C5FD",
      primaryMid: "#2563EB",
      primaryDark: "#1D4ED8",
      accentHighlight: "#EFF6FF",
      deepShadow: "#0F2856",
      rimInner: "#0A1B3D",
      plaqueBg: "#0A1B3D",
      plaqueText: "#DBEAFE",
      plaqueBorder: "#60A5FA",
      glowColor: "rgba(37, 99, 235, 0.28)",
      starFill: "#EFF6FF",
    },
  };

  const cfg = configs[tier];
  const pId = cfg.id;

  return (
    <svg
      viewBox="0 0 220 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`${tier.toUpperCase()} Trophy Cup`}
      role="img"
    >
      <defs>
        {/* Soft ground contact shadow on cream canvas */}
        <radialGradient id={`floorShadow-${pId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0A1B3D" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#0A1B3D" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0A1B3D" stopOpacity="0" />
        </radialGradient>

        {/* Cup body horizontal gradient: highlight on left, rich mid, shadow on right */}
        <linearGradient id={`cupBody-${pId}`} x1="40" y1="90" x2="180" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={cfg.primaryDark} />
          <stop offset="12%" stopColor={cfg.primaryStart} />
          <stop offset="32%" stopColor={cfg.accentHighlight} />
          <stop offset="55%" stopColor={cfg.primaryMid} />
          <stop offset="85%" stopColor={cfg.primaryDark} />
          <stop offset="100%" stopColor={cfg.deepShadow} />
        </linearGradient>

        {/* Rim outer ellipse gradient */}
        <linearGradient id={`rimOuter-${pId}`} x1="42" y1="46" x2="178" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={cfg.primaryDark} />
          <stop offset="20%" stopColor={cfg.accentHighlight} />
          <stop offset="50%" stopColor={cfg.primaryMid} />
          <stop offset="80%" stopColor={cfg.primaryStart} />
          <stop offset="100%" stopColor={cfg.deepShadow} />
        </linearGradient>

        {/* Handle gradients */}
        <linearGradient id={`handleLeft-${pId}`} x1="12" y1="65" x2="52" y2="135" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={cfg.accentHighlight} />
          <stop offset="35%" stopColor={cfg.primaryMid} />
          <stop offset="70%" stopColor={cfg.primaryDark} />
          <stop offset="100%" stopColor={cfg.deepShadow} />
        </linearGradient>

        <linearGradient id={`handleRight-${pId}`} x1="208" y1="65" x2="168" y2="135" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={cfg.primaryMid} />
          <stop offset="40%" stopColor={cfg.primaryStart} />
          <stop offset="80%" stopColor={cfg.primaryDark} />
          <stop offset="100%" stopColor={cfg.deepShadow} />
        </linearGradient>

        {/* Pedestal gradient */}
        <linearGradient id={`pedestal-${pId}`} x1="45" y1="210" x2="175" y2="210" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={cfg.deepShadow} />
          <stop offset="15%" stopColor={cfg.primaryMid} />
          <stop offset="30%" stopColor={cfg.accentHighlight} />
          <stop offset="60%" stopColor={cfg.primaryMid} />
          <stop offset="88%" stopColor={cfg.primaryDark} />
          <stop offset="100%" stopColor={cfg.deepShadow} />
        </linearGradient>

        {/* Stem ring gradient */}
        <linearGradient id={`stemRing-${pId}`} x1="90" y1="168" x2="130" y2="168" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={cfg.primaryDark} />
          <stop offset="28%" stopColor={cfg.accentHighlight} />
          <stop offset="65%" stopColor={cfg.primaryMid} />
          <stop offset="100%" stopColor={cfg.deepShadow} />
        </linearGradient>

        {/* Ambient glow behind trophy */}
        <filter id={`ambientGlow-${pId}`} x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="12" result="blur" />
        </filter>
      </defs>

      {/* Atmospheric Ambient Glow centered behind the bowl */}
      <circle cx="110" cy="100" r="56" fill={cfg.glowColor} filter={`url(#ambientGlow-${pId})`} />

      {/* Floor Contact Shadow (anchors trophy directly to webpage background) */}
      <ellipse cx="110" cy="246" rx="66" ry="9" fill={`url(#floorShadow-${pId})`} />

      {/* ================= PEDESTAL BASE ================= */}
      {/* Tier 1 - Bottom Plate */}
      <rect x="48" y="226" width="124" height="15" rx="3" fill={`url(#pedestal-${pId})`} />
      <rect x="49" y="226" width="122" height="1.5" fill={cfg.accentHighlight} opacity="0.8" />
      <rect x="49" y="239.5" width="122" height="1.5" fill={cfg.deepShadow} opacity="0.6" />

      {/* Tier 2 - Beveled Transition */}
      <polygon points="58,226 162,226 152,210 68,210" fill={`url(#pedestal-${pId})`} />
      <line x1="68" y1="210" x2="152" y2="210" stroke={cfg.accentHighlight} strokeWidth="1.2" opacity="0.75" />

      {/* Tier 3 - Main Column / Plaque Mount */}
      <rect x="70" y="186" width="80" height="24" rx="2" fill={`url(#pedestal-${pId})`} />

      {/* Engraved Plaque */}
      <rect
        x="80"
        y="190.5"
        width="60"
        height="15"
        rx="2"
        fill={cfg.plaqueBg}
        stroke={cfg.plaqueBorder}
        strokeWidth="1.2"
      />
      <text
        x="110"
        y="201.5"
        textAnchor="middle"
        fill={cfg.plaqueText}
        fontSize="9.5"
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing="0.18em"
      >
        {rankText}
      </text>

      {/* ================= STEM & WAIST ================= */}
      {/* Stem lower collar */}
      <polygon points="98,186 122,186 117,175 103,175" fill={`url(#stemRing-${pId})`} />

      {/* Decorative center bead ring */}
      <ellipse cx="110" cy="172" rx="14" ry="4.5" fill={`url(#stemRing-${pId})`} />
      <ellipse cx="110" cy="171" rx="12" ry="2" fill={cfg.accentHighlight} opacity="0.7" />

      {/* Stem upper flare to chalice */}
      <polygon points="104,169 116,169 123,153 97,153" fill={`url(#stemRing-${pId})`} />

      {/* Chalice base mount ring */}
      <ellipse cx="110" cy="153" rx="15" ry="3.5" fill={cfg.deepShadow} />

      {/* ================= HANDLES ================= */}
      {/* Left Handle: sculpted sweep from rim (x=42, y=68) out to x=10 and back in to chalice base (x=50, y=134) */}
      <path
        d="M 44 68 C 10 72 8 116 46 133 C 50 134.5 49 128.5 45 127 C 22 118 20 86 43 78 Z"
        fill={`url(#handleLeft-${pId})`}
      />
      {/* Left Handle highlight bevel */}
      <path
        d="M 44 68 C 12 73 10 114 45 131"
        stroke={cfg.accentHighlight}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Right Handle: sculpted sweep from rim (x=176, y=68) out to x=210 and back to (x=170, y=134) */}
      <path
        d="M 176 68 C 210 72 212 116 174 133 C 170 134.5 171 128.5 175 127 C 198 118 200 86 177 78 Z"
        fill={`url(#handleRight-${pId})`}
      />
      {/* Right Handle shadow edge */}
      <path
        d="M 176 68 C 208 73 210 114 175 131"
        stroke={cfg.deepShadow}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />

      {/* ================= CUP CHALICE (BODY) ================= */}
      {/* Main chalice bowl */}
      <path
        d="M 42 54 C 42 112 80 151 98 153 L 122 153 C 140 151 178 112 178 54 Z"
        fill={`url(#cupBody-${pId})`}
      />

      {/* Specular curved light streak down left side of bowl */}
      <path
        d="M 62 58 C 60 90 78 128 92 144 C 84 134 70 102 70 60 Z"
        fill={cfg.accentHighlight}
        opacity="0.38"
      />

      {/* Deep shadow curved strip on right side of bowl */}
      <path
        d="M 166 58 C 167 92 148 130 128 147 C 138 136 156 102 156 60 Z"
        fill={cfg.deepShadow}
        opacity="0.32"
      />

      {/* ================= CUP OPENING (RIM) ================= */}
      {/* Outer lip */}
      <ellipse cx="110" cy="54" rx="68" ry="12.5" fill={`url(#rimOuter-${pId})`} />

      {/* Inner cup cavity (dark depth) */}
      <ellipse cx="110" cy="54" rx="62" ry="9.5" fill={cfg.rimInner} />

      {/* Rim top light reflection */}
      <path
        d="M 52 54 C 52 48 168 48 168 54"
        stroke={cfg.accentHighlight}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />

      {/* ================= CENTER EMBLEM & STAR ================= */}
      {/* Medallion back ring */}
      <circle cx="110" cy="98" r="23" fill={`url(#stemRing-${pId})`} stroke={cfg.deepShadow} strokeWidth="1" />
      <circle cx="110" cy="98" r="20" fill={cfg.primaryMid} stroke={cfg.accentHighlight} strokeWidth="1" />

      {/* 5-pointed Dimensional Star in center of medallion */}
      <path
        d="M 110 82 L 114 93 L 125 93 L 116 100 L 120 111 L 110 104 L 100 111 L 104 100 L 95 93 L 106 93 Z"
        fill={cfg.starFill}
      />
      {/* Star dimensional facet shading */}
      <path
        d="M 110 82 L 114 93 L 110 104 L 106 93 Z"
        fill={cfg.accentHighlight}
      />
      <path
        d="M 110 104 L 120 111 L 116 100 Z"
        fill={cfg.primaryDark}
      />
      <path
        d="M 110 104 L 100 111 L 104 100 Z"
        fill={cfg.deepShadow}
      />

      {/* Laurel leaves wreath around medallion */}
      <path
        d="M 88 108 C 84 98 87 88 94 82"
        stroke={cfg.accentHighlight}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M 132 108 C 136 98 133 88 126 82"
        stroke={cfg.accentHighlight}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />

      {/* ================= SPARKLE GLINT ================= */}
      {/* 4-point sparkle on top-right rim corner */}
      <g transform="translate(164, 42)">
        <path
          d="M 0 -8 Q 0 0 8 0 Q 0 0 0 8 Q 0 0 -8 0 Q 0 0 0 -8 Z"
          fill={cfg.starFill}
        />
        <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
