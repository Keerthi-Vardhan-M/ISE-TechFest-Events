"use client";

interface HeraldicCrestProps {
  className?: string;
}

/**
 * Authentic Victorian / Classical Heraldic Engraving Crest with Ribbon Banners
 * Directly inspired by The Rechabite reference screenshots:
 * - Flanking classical figures holding laurels
 * - Central shield with Eye of Knowledge, Beehive of Builders, Rainbow, and Celestial Stars
 * - Flowing swallowtail ribbon banners on both sides
 */
export default function HeraldicCrest({ className = "" }: HeraldicCrestProps) {
  return (
    <div className={`relative mx-auto select-none ${className}`}>
      <svg
        viewBox="0 0 960 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)]"
        aria-label="Engineering Arena Heraldic Crest"
      >
        <defs>
          <filter id="crest-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.85" />
          </filter>
        </defs>

        <g filter="url(#crest-glow)">
          {/* ================= LEFT FLOWING RIBBON BANNER ================= */}
          {/* Ribbon Back Fold / Shadow */}
          <path
            d="M70 185 C95 195 120 180 145 165 L145 185 C120 200 95 210 70 195 Z"
            fill="#D9D0B8"
            stroke="#0A1B3D"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Far Left Swallowtail Fork */}
          <path
            d="M60 178 L105 160 C90 175 90 190 105 205 L60 188 L80 183 Z"
            fill="#FAF5E8"
            stroke="#0A1B3D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Left Ribbon Main Curve */}
          <path
            d="M95 182 C145 165 210 145 285 152 C325 156 360 168 395 182 L395 212 C360 196 325 184 285 180 C210 173 145 195 95 212 Z"
            fill="#FAF5E8"
            stroke="#0A1B3D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Ribbon Inner Engraved Crease Lines */}
          <path d="M110 184 C150 170 205 156 275 160" stroke="#0A1B3D" strokeWidth="1.5" strokeOpacity="0.7" />
          <path d="M110 208 C150 194 205 180 275 184" stroke="#0A1B3D" strokeWidth="1.5" strokeOpacity="0.7" />

          {/* ================= RIGHT FLOWING RIBBON BANNER ================= */}
          {/* Ribbon Back Fold / Shadow */}
          <path
            d="M890 185 C865 195 840 180 815 165 L815 185 C840 200 865 210 890 195 Z"
            fill="#D9D0B8"
            stroke="#0A1B3D"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Far Right Swallowtail Fork */}
          <path
            d="M900 178 L855 160 C870 175 870 190 855 205 L900 188 L880 183 Z"
            fill="#FAF5E8"
            stroke="#0A1B3D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Right Ribbon Main Curve */}
          <path
            d="M865 182 C815 165 750 145 675 152 C635 156 600 168 565 182 L565 212 C600 196 635 184 675 180 C750 173 815 195 865 212 Z"
            fill="#FAF5E8"
            stroke="#0A1B3D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Ribbon Inner Engraved Crease Lines */}
          <path d="M850 184 C810 170 755 156 685 160" stroke="#0A1B3D" strokeWidth="1.5" strokeOpacity="0.7" />
          <path d="M850 208 C810 194 755 180 685 184" stroke="#0A1B3D" strokeWidth="1.5" strokeOpacity="0.7" />

          {/* ================= CENTER MOTTO BASE BANNER ================= */}
          <path
            d="M360 216 C400 226 440 232 480 232 C520 232 560 226 600 216 L600 240 C560 250 520 255 480 255 C440 255 400 250 360 240 Z"
            fill="#FAF5E8"
            stroke="#0A1B3D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Scrollwork flourishes below base */}
          <path
            d="M340 236 C365 248 395 252 425 250 C445 248 465 244 480 244 C495 244 515 248 535 250 C565 252 595 248 620 236"
            stroke="#0A1B3D"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* ================= LEFT CLASSICAL FIGURE (MUSE OF AUTOMATION) ================= */}
          {/* Robe and Body Silhouette */}
          <path
            d="M375 75 C370 70 365 65 372 52 C378 40 395 40 398 52 C402 65 398 70 395 76 C408 85 418 102 420 120 C422 142 414 175 410 205 L372 205 C370 175 365 140 365 118 C365 98 370 85 375 75 Z"
            fill="#FAF5E8"
            stroke="#0A1B3D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Left Figure Wing / Laurel Arch */}
          <path
            d="M352 110 C340 85 348 45 365 30 C375 22 385 24 380 38 C375 52 368 75 372 100"
            fill="#FAF5E8"
            stroke="#0A1B3D"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Left Laurel Wreath held in right hand */}
          <ellipse cx="422" cy="115" rx="10" ry="14" fill="#FAF5E8" stroke="#0A1B3D" strokeWidth="2.5" />
          <path d="M422 104 C416 112 416 118 422 126 C428 118 428 112 422 104 Z" fill="#0A1B3D" />

          {/* ================= RIGHT CLASSICAL FIGURE (MUSE OF QUANT) ================= */}
          {/* Robe and Body Silhouette */}
          <path
            d="M585 75 C590 70 595 65 588 52 C582 40 565 40 562 52 C558 65 562 70 565 76 C552 85 542 102 540 120 C538 142 546 175 550 205 L588 205 C590 175 595 140 595 118 C595 98 590 85 585 75 Z"
            fill="#FAF5E8"
            stroke="#0A1B3D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Right Figure Horn of Abundance / Flowers */}
          <path
            d="M608 110 C620 85 612 45 595 30 C585 22 575 24 580 38 C585 52 592 75 588 100"
            fill="#FAF5E8"
            stroke="#0A1B3D"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Right Bouquet Cluster */}
          <circle cx="612" cy="52" r="5" fill="#FAF5E8" stroke="#0A1B3D" strokeWidth="2" />
          <circle cx="622" cy="58" r="6" fill="#FAF5E8" stroke="#0A1B3D" strokeWidth="2" />
          <circle cx="616" cy="68" r="5" fill="#FAF5E8" stroke="#0A1B3D" strokeWidth="2" />
          <circle cx="628" cy="68" r="4" fill="#FAF5E8" stroke="#0A1B3D" strokeWidth="2" />

          {/* ================= CENTRAL COAT OF ARMS HERALDIC SHIELD ================= */}
          {/* Top Crest / Beehive */}
          <path
            d="M460 52 C460 38 470 28 480 28 C490 28 500 38 500 52 L508 52 C510 52 510 60 508 60 L452 60 C450 60 450 52 452 52 Z"
            fill="#FAF5E8"
            stroke="#0A1B3D"
            strokeWidth="2.8"
          />
          {/* Beehive Horizontal Ridges */}
          <line x1="462" y1="36" x2="498" y2="36" stroke="#0A1B3D" strokeWidth="2" />
          <line x1="458" y1="44" x2="502" y2="44" stroke="#0A1B3D" strokeWidth="2" />
          <line x1="455" y1="52" x2="505" y2="52" stroke="#0A1B3D" strokeWidth="2" />
          {/* Beehive Door */}
          <ellipse cx="480" cy="55" rx="4" ry="5" fill="#0A1B3D" />

          {/* Flying Bees */}
          <circle cx="442" cy="40" r="2.5" fill="#0A1B3D" />
          <path d="M438 38 L446 42 M438 42 L446 38" stroke="#0A1B3D" strokeWidth="1.2" />
          <circle cx="518" cy="42" r="2.5" fill="#0A1B3D" />
          <path d="M514 40 L522 44 M514 44 L522 40" stroke="#0A1B3D" strokeWidth="1.2" />

          {/* Shield Outer Border */}
          <path
            d="M430 68 L530 68 C535 110 530 152 480 186 C430 152 425 110 430 68 Z"
            fill="#FAF5E8"
            stroke="#0A1B3D"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Shield Inner Inset Border */}
          <path
            d="M438 75 L522 75 C526 108 522 142 480 174 C438 142 434 108 438 75 Z"
            fill="#FAF5E8"
            stroke="#0A1B3D"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Shield Horizontal Partition */}
          <line x1="434" y1="120" x2="526" y2="120" stroke="#0A1B3D" strokeWidth="2.5" />

          {/* Top Panel: The Eye of Knowledge with Radiance */}
          <ellipse cx="480" cy="98" rx="14" ry="8" fill="#FAF5E8" stroke="#0A1B3D" strokeWidth="2.2" />
          <circle cx="480" cy="98" r="4.5" fill="#0A1B3D" />
          <circle cx="482" cy="96" r="1.5" fill="#FAF5E8" />
          {/* Radiating Light Rays from Eye */}
          <line x1="480" y1="84" x2="480" y2="88" stroke="#0A1B3D" strokeWidth="1.8" />
          <line x1="466" y1="88" x2="470" y2="91" stroke="#0A1B3D" strokeWidth="1.8" />
          <line x1="494" y1="88" x2="490" y2="91" stroke="#0A1B3D" strokeWidth="1.8" />

          {/* Bottom Panel: The Rainbow Arc & Technical Diamond */}
          <path d="M455 160 C465 142 495 142 505 160" stroke="#0A1B3D" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M460 162 C468 148 492 148 500 162" stroke="#0A1B3D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Center Rose / Geometrical Gear */}
          <circle cx="480" cy="154" r="5" fill="#0A1B3D" />
          <polygon points="480,138 485,145 480,152 475,145" fill="#FAF5E8" stroke="#0A1B3D" strokeWidth="1.5" />

          {/* Flanking Stars & Moon Symbols on Shield Sides */}
          {/* Left 6-point Star */}
          <path d="M448 94 L454 94 M451 91 L451 97 M449 92 L453 96 M449 96 L453 92" stroke="#0A1B3D" strokeWidth="2" strokeLinecap="round" />
          {/* Right Crescent Moon & Star */}
          <path d="M510 92 C514 94 514 98 510 102 C508 100 508 94 510 92 Z" fill="#0A1B3D" />
          <circle cx="516" cy="94" r="1.5" fill="#0A1B3D" />

          {/* ================= MOTTO TEXT ALONG BANNERS ================= */}
          {/* Left Ribbon Text */}
          <text
            x="240"
            y="172"
            textAnchor="middle"
            fontFamily="var(--font-silkscreen), monospace"
            fontSize="11"
            fontWeight="bold"
            letterSpacing="2.5"
            fill="#0A1B3D"
          >
            AUTO × QUANT
          </text>

          {/* Center Banner Text */}
          <text
            x="480"
            y="238"
            textAnchor="middle"
            fontFamily="var(--font-silkscreen), monospace"
            fontSize="9"
            fontWeight="bold"
            letterSpacing="1.8"
            fill="#0A1B3D"
          >
            PEACE &amp; PLENTY • THE REWARD OF INNOVATION
          </text>

          {/* Right Ribbon Text */}
          <text
            x="720"
            y="172"
            textAnchor="middle"
            fontFamily="var(--font-silkscreen), monospace"
            fontSize="11"
            fontWeight="bold"
            letterSpacing="2.5"
            fill="#0A1B3D"
          >
            DECEMBER 2026
          </text>
        </g>
      </svg>
    </div>
  );
}
