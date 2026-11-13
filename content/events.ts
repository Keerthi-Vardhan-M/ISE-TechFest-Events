export type EventId = "automate" | "quant";

export interface EventRound {
  number: string;
  title: string;
  duration: string;
  summary: string;
}

export interface EventTimelineItem {
  time: string;
  milestone: string;
}

export interface EventPodiumItem {
  rank: "1st" | "2nd" | "3rd";
  title: string;
  reward: string;
}

export interface EventFaqItem {
  question: string;
  answer: string;
}

export interface EventConfig {
  id: EventId;
  theme: EventId;
  categoryLabel: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  dateISO: string;
  dateDisplay: string;
  timeDisplay: string;
  venue: string;
  teamSize: {
    min: number;
    max: number;
    label: string;
  };
  feeInr: number;
  feeDisplay: string;
  seatCap: number;
  prizePool: string;
  podium: EventPodiumItem[];
  rounds: EventRound[];
  timeline: EventTimelineItem[];
  rules: string[];
  faqs: EventFaqItem[];
  contact: {
    name: string;
    role: string;
    phone: string;
    email: string;
  };
}

export const ORGANISER_INFO = {
  clubName: "Quant Club",
  collegeName: "MSRIT",
  city: "Bengaluru",
  logoText: "AUTO×QUANT",
  festName: "AUTOMATE × QUANT '26",
  heroEyebrow: "QUANT CLUB • MSRIT PRESENTS",
  heroHeadline: "AUTOMATE × QUANT",
  heroSubline:
    "Two flagship arenas — Robotics Automation & Quantitative Finance. December 2026 • Main Campus.",
  contactEmail: "events@campusfest.edu",
  contactPhone: "+91 98765 43210",
  upiId: "techfest.club@okaxis",
  upiPayeeName: "Quant Club",
  siteUrl: "https://automate-quant-events.vercel.app",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Email", href: "mailto:events@campusfest.edu" },
  ],
} as const;

export const ABOUT_SECTION = {
  eyebrow: "CAMPUS QUEST",
  titlePrefix: "Engineering Arena",
  titleHighlight: "December 2026.",
  questRole: "EVENT GUIDE",
  questSubtitle: "Your first quest starts here.",
  questDescription:
    "From autonomous robotic pipelines and hardware sprints to live simulated trading floors and alpha backtesting — two high-stakes arenas built for builders and quants.",
  metrics: [
    { label: "DAYS", value: 2, suffix: "" },
    { label: "FLAGSHIP EVENTS", value: 2, suffix: "" },
    { label: "PRIZE POOL", value: 50000, prefix: "₹", suffix: "+" },
    { label: "EXPECTED BUILDERS", value: 400, suffix: "+" },
  ],
} as const;

export const EVENTS: Record<EventId, EventConfig> = {
  automate: {
    id: "automate",
    theme: "automate",
    categoryLabel: "ROBOTICS & AUTOMATION",
    name: "Automate Boring Task",
    shortName: "Automate",
    tagline: "Design, program, and deploy an automated pipeline that eliminates repetitive human effort.",
    description:
      "Teams engineer a robotic, embedded, or hybrid workflow system capable of sorting, picking, or automating a multi-step industrial or campus task under strict cycle-time and accuracy constraints.",
    dateISO: "2026-12-12T09:30:00+05:30",
    dateDisplay: "12 Dec 2026",
    timeDisplay: "09:30 AM – 04:30 PM IST",
    venue: "Robotics Lab, Block A",
    teamSize: {
      min: 3,
      max: 4,
      label: "3–4 Members (Compulsory)",
    },
    feeInr: 0,
    feeDisplay: "FREE",
    seatCap: 60,
    prizePool: "₹18,000",
    podium: [
      { rank: "1st", title: "Grand Automator", reward: "₹10,000 + Trophy" },
      { rank: "2nd", title: "Runner Up", reward: "₹5,000 + Certificate" },
      { rank: "3rd", title: "Precision Award", reward: "₹3,000 + Certificate" },
    ],
    rounds: [
      {
        number: "01",
        title: "Blueprint & Architecture Pitch",
        duration: "45 mins",
        summary:
          "Present system schematic, actuation/logic flow, and failure-handling plan to the technical panel.",
      },
      {
        number: "02",
        title: "Live Automation Sprint",
        duration: "120 mins",
        summary:
          "Execute the assigned repetitive task sequence autonomously. Scored on throughput, repeatability, and zero manual intervention.",
      },
      {
        number: "03",
        title: "Edge-Case Stress Test",
        duration: "60 mins",
        summary:
          "Finalists handle injected fault conditions (misaligned crates, sensor noise, or payload variance).",
      },
    ],
    timeline: [
      { time: "09:00 AM", milestone: "Check-in & Hardware Inspection" },
      { time: "10:00 AM", milestone: "Round 01: Blueprint Review" },
      { time: "11:30 AM", milestone: "Round 02: Live Automation Sprint" },
      { time: "02:30 PM", milestone: "Round 03: Edge-Case Stress Test" },
      { time: "04:15 PM", milestone: "Results & Podium Ceremony" },
    ],
    rules: [
      "Teams must consist of strictly 3 to 4 members with valid college ID cards (compulsory).",
      "Pre-built commercial turnkey robots are not permitted; custom controllers, scripts, and modular kits are allowed.",
      "All autonomous runs must operate without remote manual override once the start signal is given.",
      "Standard 230V AC bench power is provided at Robotics Lab, Block A; bring your own microcontrollers and adapters.",
      "Judges' decisions on cycle-time penalties and safety compliance are final.",
    ],
    faqs: [
      {
        question: "Who can participate?",
        answer:
          "Any undergraduate or postgraduate student with a valid college ID can participate. Cross-department and cross-year teams are welcome.",
      },
      {
        question: "Is this hardware-only or can we use software/RPA?",
        answer:
          "Both physical robotics/embedded prototypes and hybrid hardware-software automation pipelines are welcome and scored on the same autonomous throughput rubric.",
      },
      {
        question: "Do we need to bring our own components?",
        answer:
          "Yes, teams bring their own laptops, microcontrollers, sensors, and actuators. Standard power strips and test crates are provided on-site.",
      },
    ],
    contact: {
      name: "Aarav Sharma",
      role: "Robotics Track Lead",
      phone: "+91 98765 43211",
      email: "automate@campusfest.edu",
    },
  },
  quant: {
    id: "quant",
    theme: "quant",
    categoryLabel: "STOCK MARKET & QUANT",
    name: "QuantFinance",
    shortName: "QuantFinance",
    tagline: "Decode market microstructure, backtest alpha, and out-trade the floor under live volatility.",
    description:
      "A high-intensity quantitative finance and simulated trading competition. Participants build systematic strategies, manage drawdown, and execute under simulated order-book shocks.",
    dateISO: "2026-12-13T09:30:00+05:30",
    dateDisplay: "13 Dec 2026",
    timeDisplay: "09:30 AM – 04:30 PM IST",
    venue: "Trading Lab, Seminar Hall",
    teamSize: {
      min: 3,
      max: 4,
      label: "3–4 Members (Compulsory)",
    },
    feeInr: 0,
    feeDisplay: "FREE",
    seatCap: 60,
    prizePool: "₹18,000",
    podium: [
      { rank: "1st", title: "Alpha Architect", reward: "₹10,000 + Trophy" },
      { rank: "2nd", title: "Quant Strategist", reward: "₹5,000 + Certificate" },
      { rank: "3rd", title: "Risk Master", reward: "₹3,000 + Certificate" },
    ],
    rounds: [
      {
        number: "01",
        title: "Quant Aptitude & Market Microstructure",
        duration: "45 mins",
        summary:
          "Rapid-fire probability, expected value, options intuition, and order-book mechanics.",
      },
      {
        number: "02",
        title: "Strategy Backtest & Signal Lab",
        duration: "90 mins",
        summary:
          "Given historical OHLCV & tick datasets, design a strategy evaluated on Sharpe ratio and max drawdown.",
      },
      {
        number: "03",
        title: "Live Simulated Trading Floor",
        duration: "90 mins",
        summary:
          "Trade across multi-asset simulated regimes with live news catalysts and liquidity squeezes.",
      },
    ],
    timeline: [
      { time: "09:00 AM", milestone: "Desk Allocation & Terminal Setup" },
      { time: "09:45 AM", milestone: "Round 01: Quant Aptitude" },
      { time: "11:00 AM", milestone: "Round 02: Strategy Backtest" },
      { time: "02:00 PM", milestone: "Round 03: Live Simulated Floor" },
      { time: "04:15 PM", milestone: "P&L Audit & Awards" },
    ],
    rules: [
      "Teams must consist of strictly 3 to 4 members with valid college ID cards (compulsory).",
      "All trading is strictly simulated using virtual capital on the provided terminal environment.",
      "Look-ahead bias, data leakage, or external signal scraping during backtest rounds results in disqualification.",
      "Teams must bring at least one laptop per team with Python 3.10+ or spreadsheet tools pre-installed.",
      "Final rankings combine risk-adjusted return (Sharpe/Calmar) and compliance with position limits.",
    ],
    faqs: [
      {
        question: "Do we need prior algorithmic trading experience?",
        answer:
          "Basic probability, Python or Excel familiarity, and market fundamentals are enough to start. Round 02 and 03 reward disciplined risk management.",
      },
      {
        question: "Is real money involved?",
        answer:
          "No. 100% of trading rounds run on virtual simulated capital and historical/synthetic market feeds.",
      },
      {
        question: "Can one person register for both events?",
        answer:
          "Yes! Automate Boring Task is on 12 Dec and QuantFinance is on 13 Dec, so you can register for both individually.",
      },
    ],
    contact: {
      name: "Diya Nair",
      role: "Quant Track Lead",
      phone: "+91 98765 43212",
      email: "quant@campusfest.edu",
    },
  },
};

export const EVENT_LIST: EventConfig[] = [EVENTS.automate, EVENTS.quant];

export interface MemoryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  aspect: "tall" | "wide" | "square";
}

// Replace `src` with your real photos placed in `public/images/memories/...`
export const MEMORIES_GALLERY: MemoryPhoto[] = [
  {
    id: "m1",
    src: "/images/campus-arena.jpg",
    alt: "MSRIT engineering campus arena",
    caption: "Campus Arena & Labs",
    aspect: "wide",
  },
  {
    id: "m2",
    src: "/images/event-automate.jpg",
    alt: "Robotics and automation sprint",
    caption: "Robotics Build Sprint",
    aspect: "tall",
  },
  {
    id: "m3",
    src: "/images/event-quant.jpg",
    alt: "Quantitative finance trading floor",
    caption: "Quant Trading Floor",
    aspect: "square",
  },
  {
    id: "m4",
    src: "/images/hero-sky-bg.jpg",
    alt: "Symposium opening keynote",
    caption: "Opening Ceremony",
    aspect: "wide",
  },
  {
    id: "m5",
    src: "/images/event-automate.jpg",
    alt: "Hardware debugging session",
    caption: "Hardware Debugging",
    aspect: "square",
  },
  {
    id: "m6",
    src: "/images/campus-arena.jpg",
    alt: "Teams collaborating in seminar hall",
    caption: "Team Collaboration",
    aspect: "tall",
  },
  {
    id: "m7",
    src: "/images/hero-emblem.jpg",
    alt: "Jury evaluation and mentoring",
    caption: "Jury & Mentors",
    aspect: "square",
  },
  {
    id: "m8",
    src: "/images/event-quant.jpg",
    alt: "Podium winners celebration",
    caption: "Podium Winners",
    aspect: "wide",
  },
  {
    id: "m9",
    src: "/images/campus-arena.jpg",
    alt: "Midnight coding sprint",
    caption: "Midnight Coding Grind",
    aspect: "tall",
  },
  {
    id: "m10",
    src: "/images/event-quant.jpg",
    alt: "Alpha backtest terminal session",
    caption: "Alpha Backtest Lab",
    aspect: "square",
  },
  {
    id: "m11",
    src: "/images/event-automate.jpg",
    alt: "Autonomous prototype demonstration",
    caption: "Prototype Demo",
    aspect: "wide",
  },
  {
    id: "m12",
    src: "/images/hero-sky-bg.jpg",
    alt: "Trophy and awards presentation",
    caption: "Trophy Unveiling",
    aspect: "tall",
  },
  {
    id: "m13",
    src: "/images/event-quant.jpg",
    alt: "Live order book simulated trading",
    caption: "Live Trading Session",
    aspect: "square",
  },
  {
    id: "m14",
    src: "/images/event-automate.jpg",
    alt: "Robotic arm cycle testing",
    caption: "Robotic Arm Testing",
    aspect: "tall",
  },
  {
    id: "m15",
    src: "/images/campus-arena.jpg",
    alt: "Final project pitch to industry judges",
    caption: "Final Pitch Presentation",
    aspect: "wide",
  },
  {
    id: "m16",
    src: "/images/hero-emblem.jpg",
    alt: "Grand champions celebration ceremony",
    caption: "Grand Champions Stage",
    aspect: "square",
  },
];

export const GENERAL_FAQS: EventFaqItem[] = [
  {
    question: "Who can participate?",
    answer:
      "All undergraduate and postgraduate college students with a valid institution ID card are eligible. Cross-college, cross-branch, and cross-year teams are welcome.",
  },
  {
    question: "How do I register?",
    answer:
      "Scroll to the Registration section below, pick your event, enter your team details (leader + 2–3 members), and submit to receive your instant Reference ID.",
  },
  {
    question: "What is the team size requirement?",
    answer:
      "Team size must be strictly 3 to 4 members (1 Leader + 2 or 3 additional members). Solo or 2-member participation is not permitted.",
  },
  {
    question: "Is there any registration fee?",
    answer:
      "No! Registration is 100% FREE for both Automate Boring Task and QuantFinance.",
  },
  {
    question: "When and where are the competitions hosted?",
    answer:
      "12–13 December 2026 at MSRIT, Bengaluru (Robotics Lab Block A for Automate Boring Task and Seminar Hall for QuantFinance).",
  },
  {
    question: "Can our team participate in both events?",
    answer:
      "Yes! Automate Boring Task takes place on 12 December and QuantFinance on 13 December, so your team can register for both tracks individually.",
  },
  {
    question: "What hardware or software do we need to bring?",
    answer:
      "Bring laptops with chargers. For Automate Boring Task, bring your microcontrollers, sensors, and cables (bench AC power and test crates provided). For QuantFinance, laptops with Python 3.10+ or spreadsheet tools pre-installed.",
  },
  {
    question: "Is real money involved in QuantFinance?",
    answer:
      "No. All trading rounds run on simulated virtual capital with historical, simulated, and synthetic market feeds.",
  },
  {
    question: "Are pre-built commercial robots allowed in Automate Boring Task?",
    answer:
      "No. Turnkey commercial off-the-shelf robots are strictly disallowed. Custom prototypes, modular kits, and scripted hybrid pipelines built by the team are required.",
  },
  {
    question: "What prizes and certificates will participants receive?",
    answer:
      "₹36,000+ total cash prize pool split across podium finishers in both tracks (1st: ₹10,000, 2nd: ₹5,000, 3rd: ₹3,000), plus championship trophies and verified participation certificates for all registered teams.",
  },
  {
    question: "Will food, Wi-Fi, and accommodation be provided?",
    answer:
      "High-speed campus Wi-Fi, power strips, lunch, and refreshments are provided on event days. Outstation teams should contact the track leads for nearby accommodation guidance.",
  },
  {
    question: "Who do I contact if I have further queries?",
    answer:
      "Reach out to Aarav Sharma (Robotics Lead: +91 98765 43211) or Diya Nair (Quant Lead: +91 98765 43212), or email events@campusfest.edu.",
  },
];

export function getEarliestEventDateISO(): string {
  return EVENT_LIST.reduce((earliest, current) =>
    new Date(current.dateISO).getTime() < new Date(earliest).getTime()
      ? current.dateISO
      : earliest
  , EVENT_LIST[0].dateISO);
}

export interface SponsorItem {
  name: string;
  tier: string;
  logo: string;
  url: string;
  desc?: string;
}

export interface SponsorTier {
  name: string;
  accent: string;
  sponsors: SponsorItem[];
}

export const SPONSORS_DATA = {
  eyebrow: "BACKED BY INDUSTRY LEADERS",
  title: "SPONSORS",
  subtitle: "POWERING THE NEXT GENERATION OF BUILDERS & QUANTS",
  tiers: [
    {
      name: "TITLE SPONSOR",
      accent: "#FF6B35",
      sponsors: [
        {
          name: "GitHub",
          tier: "Title Sponsor",
          logo: "github",
          url: "https://github.com",
          desc: "The world's leading developer and innovation platform",
        },
      ],
    },
  ] as SponsorTier[],
};
