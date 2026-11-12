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
  clubName: "[CLUB / BRANCH NAME]",
  collegeName: "[COLLEGE]",
  logoText: "[LOGO]",
  festName: "[SYMPOSIUM / FEST NAME 2026]",
  heroEyebrow: "[CLUB / BRANCH NAME] • [COLLEGE]",
  heroHeadline: "Build the Autonomous. Trade the Algorithmic.",
  heroSubline:
    "Two flagship engineering & quantitative challenges hosted by [CLUB / BRANCH NAME] at [COLLEGE]. Precision robotics meets high-frequency market strategy.",
  contactEmail: "[events@college-placeholder.edu]",
  contactPhone: "[+91 90000 00000]",
  upiId: "[club-upi-placeholder@bank]",
  upiPayeeName: "[CLUB / BRANCH NAME]",
  siteUrl: "https://[events-domain-placeholder.vercel.app]",
  socials: [
    { label: "Instagram", href: "https://instagram.com/[club-handle-placeholder]" },
    { label: "LinkedIn", href: "https://linkedin.com/company/[club-handle-placeholder]" },
    { label: "GitHub", href: "https://github.com/[club-handle-placeholder]" },
    { label: "X / Twitter", href: "https://x.com/[club-handle-placeholder]" },
  ],
} as const;

export const ABOUT_SECTION = {
  eyebrow: "WHY PARTICIPATE",
  title: "Engineered for builders and quants.",
  subtitle:
    "A single-day arena designed to test real-world automation, systems thinking, and quantitative edge under live constraints.",
  metrics: [
    { label: "Team Slots", value: 120, suffix: "+", note: "[PLACEHOLDER_METRIC]" },
    { label: "Competitive Rounds", value: 6, suffix: "", note: "Across both tracks" },
    { label: "Prize Pool", value: 50000, prefix: "₹", suffix: "+", note: "[PLACEHOLDER_PRIZE_TOTAL]" },
    { label: "Expected Builders", value: 400, suffix: "+", note: "[PLACEHOLDER_PARTICIPANTS]" },
  ],
  highlights: [
    {
      title: "Production-Grade Challenges",
      description:
        "No toy trivia. Automate Boring Task tests physical/software pipeline reliability; QuantFinance tests risk-adjusted alpha.",
    },
    {
      title: "Live Telemetry & Leaderboards",
      description:
        "Real-time round scoring, strict rule enforcement, and transparent evaluation rubrics published before kickoff.",
    },
    {
      title: "Industry & Faculty Jury",
      description:
        "Direct feedback from [MENTOR / JURY PLACEHOLDER] across robotics, embedded systems, and algorithmic trading.",
    },
    {
      title: "Certificates & Fast Payouts",
      description:
        "Verified participation credentials for all finalists and same-week prize disbursement for podium finishers.",
    },
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
      "Teams engineer a robotic, embedded, or hybrid workflow system capable of sorting, picking, or automating a multi-step industrial/campus task under strict cycle-time and accuracy constraints.",
    dateISO: "2026-12-12T09:30:00+05:30",
    dateDisplay: "[12 DEC 2026]",
    timeDisplay: "[09:30 AM – 04:30 PM IST]",
    venue: "[ROBOTICS LAB / AUDITORIUM BLOCK A, COLLEGE]",
    teamSize: {
      min: 1,
      max: 4,
      label: "1–4 Members",
    },
    feeInr: 299,
    feeDisplay: "₹[299] / team",
    seatCap: 60,
    prizePool: "₹[25,000]",
    podium: [
      { rank: "1st", title: "Grand Automator", reward: "₹[12,500] + Trophy" },
      { rank: "2nd", title: "Runner Up", reward: "₹[7,500] + Certificate" },
      { rank: "3rd", title: "Precision Award", reward: "₹[5,000] + Certificate" },
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
      { time: "[09:00 AM]", milestone: "Check-in & Hardware Inspection" },
      { time: "[10:00 AM]", milestone: "Round 01: Blueprint Review" },
      { time: "[11:30 AM]", milestone: "Round 02: Live Automation Sprint" },
      { time: "[02:30 PM]", milestone: "Round 03: Edge-Case Stress Test" },
      { time: "[04:15 PM]", milestone: "Results & Podium Ceremony" },
    ],
    rules: [
      "Teams must consist of 1 to 4 members from a recognised college/university.",
      "Pre-built commercial turnkey robots are not permitted; custom controllers, scripts, and modular kits are allowed.",
      "All autonomous runs must operate without remote manual override once the start signal is given.",
      "Power supply (230V AC / standard bench) will be provided at [VENUE PLACEHOLDER]; teams must bring their own adapters and microcontrollers.",
      "Judges' decisions on cycle-time penalties and safety compliance are final.",
    ],
    faqs: [
      {
        question: "Is this hardware-only or can we use software/RPA?",
        answer:
          "[PLACEHOLDER ANSWER: Both physical robotics/embedded prototypes and hybrid hardware-software automation pipelines are welcome; check the Round 02 rubric for exact track scoring.]",
      },
      {
        question: "Do we need to bring our own components?",
        answer:
          "[PLACEHOLDER ANSWER: Yes, teams bring their own laptops, microcontrollers, sensors, and actuators. Standard power strips and test crates are provided on-site.]",
      },
      {
        question: "Can a team have members from different departments or years?",
        answer:
          "Yes, cross-department and cross-year teams within [COLLEGE] or visiting colleges are allowed.",
      },
    ],
    contact: {
      name: "[COORDINATOR NAME 1]",
      role: "Robotics Track Lead",
      phone: "[+91 90000 00001]",
      email: "[automate-lead@college-placeholder.edu]",
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
    dateDisplay: "[13 DEC 2026]",
    timeDisplay: "[09:30 AM – 04:30 PM IST]",
    venue: "[SEMINAR HALL / TRADING LAB, COLLEGE]",
    teamSize: {
      min: 1,
      max: 3,
      label: "1–3 Members",
    },
    feeInr: 249,
    feeDisplay: "₹[249] / team",
    seatCap: 60,
    prizePool: "₹[25,000]",
    podium: [
      { rank: "1st", title: "Alpha Architect", reward: "₹[12,500] + Trophy" },
      { rank: "2nd", title: "Quant Strategist", reward: "₹[7,500] + Certificate" },
      { rank: "3rd", title: "Risk Master", reward: "₹[5,000] + Certificate" },
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
      { time: "[09:00 AM]", milestone: "Desk Allocation & Terminal Setup" },
      { time: "[09:45 AM]", milestone: "Round 01: Quant Aptitude" },
      { time: "[11:00 AM]", milestone: "Round 02: Strategy Backtest" },
      { time: "[02:00 PM]", milestone: "Round 03: Live Simulated Floor" },
      { time: "[04:15 PM]", milestone: "P&L Audit & Awards" },
    ],
    rules: [
      "Teams must consist of 1 to 3 members with valid college ID cards.",
      "All trading is strictly simulated using virtual capital on the provided terminal/environment.",
      "Look-ahead bias, data leakage, or external signal scraping during backtest rounds results in immediate disqualification.",
      "Teams must bring at least one laptop per team with Python 3.10+ (or spreadsheet tools) pre-installed.",
      "Final rankings combine risk-adjusted return (Sharpe/Calmar) and compliance with position limits.",
    ],
    faqs: [
      {
        question: "Do we need prior algorithmic trading experience?",
        answer:
          "[PLACEHOLDER ANSWER: Basic probability, Python/Excel familiarity, and market fundamentals are enough to start; Round 02 & 03 reward disciplined risk management.]",
      },
      {
        question: "Is real money involved?",
        answer:
          "No. 100% of trading rounds run on virtual simulated capital and historical/synthetic market feeds.",
      },
      {
        question: "Can one person register for both Automate Boring Task and QuantFinance?",
        answer:
          "Yes! The events are scheduled on separate days ([12 DEC] and [13 DEC]), so you can register for both individually.",
      },
    ],
    contact: {
      name: "[COORDINATOR NAME 2]",
      role: "Quant Track Lead",
      phone: "[+91 90000 00002]",
      email: "[quant-lead@college-placeholder.edu]",
    },
  },
};

export const EVENT_LIST: EventConfig[] = [EVENTS.automate, EVENTS.quant];

export function getEarliestEventDateISO(): string {
  return EVENT_LIST.reduce((earliest, current) =>
    new Date(current.dateISO).getTime() < new Date(earliest).getTime()
      ? current.dateISO
      : earliest
  , EVENT_LIST[0].dateISO);
}
