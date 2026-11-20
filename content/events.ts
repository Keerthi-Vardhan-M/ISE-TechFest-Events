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

export interface EventThemeDomain {
  name: string;
  description: string;
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
  eligibility: string;
  competitionIntro: string;
  registrationUrl: string;
  themeDomains?: EventThemeDomain[];
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
  coordinators: {
    name: string;
    phone: string;
  }[];
}

export const ORGANISER_INFO = {
  clubName: "Vo'ISE",
  collegeName: "MSRIT ISE",
  city: "Bengaluru",
  logoText: "SYNCHRO'N'SE 2026",
  festName: "SYNCHRO'N'SE 2026",
  heroEyebrow: "Vo'ISE • MSRIT ISE PRESENTS",
  heroHeadline: "SYNCHRO'N'SE 2026",
  heroSubline:
    "Two flagship arenas — Robotics Automation & Quantitative Finance. 26 November 2026 • Main Campus.",
  contactEmail: "events@campusfest.edu",
  contactPhone: "+91 98765 43210",
  upiId: "techfest.club@okaxis",
  upiPayeeName: "Vo'ISE",
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
  titlePrefix: "TechFest back in",
  titleHighlight: "November 2026.",
  questRole: "EVENT GUIDE",
  questSubtitle: "Your first quest starts here.",
  questDescription:
    "From autonomous robotic pipelines and hardware sprints to live simulated trading floors and alpha backtesting — two high-stakes arenas built for builders and quants.",
  metrics: [
    { label: "DAYS", value: 1, suffix: "" },
    { label: "FLAGSHIP EVENTS", value: 2, suffix: "" },
    { label: "PRIZE POOL", value: 20000, prefix: "₹", suffix: "+" },
    { label: "EXPECTED BUILDERS", value: 200, suffix: "+" },
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
    dateISO: "2026-11-26T09:00:00+05:30",
    dateDisplay: "26 Nov 2026",
    timeDisplay: "9:00 AM–1:00 PM IST",
    venue: "ISE Lab 1 & ISE Lab 2",
    eligibility: "1st, 2nd & 3rd Year Students",
    competitionIntro:
      "A 20-hour online build phase leads to a four-hour, shortlisted on-campus evaluation with two Donut Challenges.",
    registrationUrl: "https://forms.gle/PveeszfrP2VCDEfEA",
    teamSize: {
      min: 3,
      max: 4,
      label: "3–4 Members (Compulsory)",
    },
    feeInr: 0,
    feeDisplay: "FREE",
    seatCap: 60,
    prizePool: "₹10,000",
    podium: [
      { rank: "1st", title: "Automation Champion", reward: "₹5,000" },
      { rank: "2nd", title: "Automation Runner-Up", reward: "₹3,000 + Certificate" },
      { rank: "3rd", title: "Automation Finalist", reward: "₹2,000 + Certificate" },
    ],
    rounds: [
      {
        number: "01",
        title: "Online Build Round",
        duration: "20 hours",
        summary:
          "Teams develop and refine an automation solution during the online build phase.",
      },
      {
        number: "02",
        title: "Shortlisted Offline Evaluation",
        duration: "4 hours",
        summary:
          "The top 20 teams are split between two labs for two timed Donut Challenges, followed by evaluation and finalist presentations.",
      },
    ],
    timeline: [
      { time: "20 hours", milestone: "Online build round" },
      { time: "09:00 AM", milestone: "Offline check-in and team allocation across ISE Lab 1 and ISE Lab 2" },
      { time: "09:30–10:30 AM", milestone: "Donut Challenge 1" },
      { time: "10:30–11:30 AM", milestone: "Donut Challenge 2" },
      { time: "11:30 AM–12:10 PM", milestone: "Initial evaluation and shortlisting" },
      { time: "12:15–01:00 PM", milestone: "Top five finalist presentations and winner announcements" },
    ],
    rules: [
      "Teams must consist of strictly 3 to 4 members with valid college ID cards (compulsory).",
      "Pre-built commercial turnkey robots are not permitted; custom controllers, scripts, and modular kits are allowed.",
      "All autonomous runs must operate without remote manual override once the start signal is given.",
      "The offline evaluation is hosted across ISE Lab 1 and ISE Lab 2; bring your own microcontrollers and adapters.",
      "Judges' decisions on cycle-time penalties and safety compliance are final.",
    ],
    faqs: [
      {
        question: "Who can participate?",
        answer:
          "Students in 1st, 2nd, or 3rd year are eligible. Teams may include members from different branches and year groups.",
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
    coordinators: [
      { name: "Rohan C M", phone: "9900781694" },
      { name: "Shivam", phone: "93391 33887" },
      { name: "Pranav", phone: "81053 31414" },
    ],
  },
  quant: {
    id: "quant",
    theme: "quant",
    categoryLabel: "GO TO MARKET ARENA",
    name: "GTM ARENA",
    shortName: "GTM ARENA",
    tagline: "Build a go-to-market strategy, validate your audience, and pitch a winning launch plan.",
    description:
      "Go To Market Arena challenges teams to identify customers, shape a compelling value proposition, choose effective channels, and present a practical launch strategy backed by market insight.",
    dateISO: "2026-11-26T13:30:00+05:30",
    dateDisplay: "26 Nov 2026",
    timeDisplay: "01:30 PM–05:00 PM IST",
    venue: "ISE Lab 1 & ISE Lab 2",
    eligibility: "1st, 2nd & 3rd Year Students",
    competitionIntro:
      "A 3.5-hour ideathon moves from team ideation to constraint adaptation, parallel lab evaluation, and a joint finalist pitch.",
    registrationUrl: "https://forms.gle/krtSLrZ83qauYCbW7",
    themeDomains: [
      {
        name: "FinTech",
        description: "Financial inclusion, digital payments, DeFi, risk analytics, and next-generation banking.",
      },
      {
        name: "Blue Economy",
        description: "Sustainable ocean resources, marine logistics, coastal monitoring, and maritime supply chains.",
      },
      {
        name: "EV & Semiconductors",
        description: "EV powertrains, battery management, charging infrastructure, and indigenous chip design.",
      },
      {
        name: "Avionics & Flight Systems",
        description: "UAVs, flight telemetry, navigation safety, aerospace diagnostics, and airspace management.",
      },
    ],
    teamSize: {
      min: 3,
      max: 4,
      label: "3–4 Members (Compulsory)",
    },
    feeInr: 0,
    feeDisplay: "FREE",
    seatCap: 60,
    prizePool: "₹10,000",
    podium: [
      { rank: "1st", title: "Go-To-Market Champion", reward: "₹5,000" },
      { rank: "2nd", title: "Market Strategy Runner-Up", reward: "₹3,000 + Certificate" },
      { rank: "3rd", title: "Launch Strategy Finalist", reward: "₹2,000 + Certificate" },
    ],
    rounds: [
      {
        number: "01",
        title: "Problem Statement & Core Ideation",
        duration: "45 mins",
        summary:
          "After kickoff, teams receive their domain problem and develop a technical concept and go-to-market strategy.",
      },
      {
        number: "02",
        title: "Constraint Injection & Adaptation",
        duration: "45 mins",
        summary:
          "Teams adapt their initial solution and finalize their pitch when new real-world constraints are introduced.",
      },
      {
        number: "03",
        title: "Parallel Lab Evaluation & Grand Finale",
        duration: "1 hr 40 mins",
        summary:
          "Teams present in parallel labs; the top three advance to a joint final pitch before results are announced.",
      },
    ],
    timeline: [
      { time: "01:30–01:45 PM", milestone: "Check-in, briefing, and lab seating" },
      { time: "01:45–02:30 PM", milestone: "Problem statement disclosure and core ideation" },
      { time: "02:30–03:15 PM", milestone: "Constraint release and solution adaptation" },
      { time: "03:15–03:20 PM", milestone: "Transition and presentation setup" },
      { time: "03:20–04:25 PM", milestone: "Parallel evaluations in ISE Lab 1 and ISE Lab 2" },
      { time: "04:25–04:45 PM", milestone: "Top three teams' joint finalist pitches" },
      { time: "04:45–05:00 PM", milestone: "Results announcement and awards" },
    ],
    rules: [
      "Teams must consist of 3 to 4 members with valid college ID cards.",
      "Students in 1st, 2nd, or 3rd year are eligible.",
      "Teams receive their domain-specific problem statement at the event kickoff.",
      "Teams must adapt their solution when new constraints are introduced during the ideation phase.",
      "Final evaluation takes place in parallel across ISE Lab 1 and ISE Lab 2, followed by a joint pitch from the top three teams.",
    ],
    faqs: [
      {
        question: "Who can participate?",
        answer:
          "Students in 1st, 2nd, or 3rd year can participate in a team of 3 to 4 members.",
      },
      {
        question: "What is the event schedule?",
        answer:
          "GTM Arena runs from 1:30 PM to 5:00 PM, moving through ideation, constraint adaptation, lab evaluations, finalist pitches, and results.",
      },
      {
        question: "Can one person register for both events?",
        answer:
          "Yes! Both events take place on 26 November 2026 with staggered stages, so your team can register for both tracks individually.",
      },
    ],
    coordinators: [
      { name: "Venkatesh Reddy K", phone: "7411582857" },
      { name: "Akash Konchigeri", phone: "8050346842" },
      { name: "Rizwan Pasha", phone: "8618281144" },
    ],
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

export const MEMORIES_GALLERY: MemoryPhoto[] = [
  { id: "mem-01", src: "/images/memories/event-memory-01.webp", alt: "Students attending a presentation in an auditorium", caption: "Ideas in the Auditorium", aspect: "wide" },
  { id: "mem-02", src: "/images/memories/event-memory-02.webp", alt: "Students presenting during a Gemini workshop", caption: "Gemini Workshop", aspect: "wide" },
  { id: "mem-03", src: "/images/memories/event-memory-03.webp", alt: "Guest speaker addressing the audience", caption: "Guest Talk", aspect: "wide" },
  { id: "mem-04", src: "/images/memories/event-memory-04.webp", alt: "Organizers and participants on stage at HackDays", caption: "HackDays at MSRIT", aspect: "wide" },
  { id: "mem-05", src: "/images/memories/event-memory-05.webp", alt: "Participants and organizers gathered for a group photo", caption: "Community Group Photo", aspect: "wide" },
  { id: "mem-06", src: "/images/memories/event-memory-06.webp", alt: "Hackathon participants gathered in the auditorium", caption: "Hackathon Participants", aspect: "wide" },
  { id: "mem-07", src: "/images/memories/event-memory-07.webp", alt: "Award recipients and organizers on stage", caption: "Awards on Stage", aspect: "wide" },
  { id: "mem-08", src: "/images/memories/event-memory-08.webp", alt: "Student sharing a project presentation", caption: "Project Presentation", aspect: "wide" },
  { id: "mem-09", src: "/images/memories/event-memory-09.webp", alt: "Audience watching a program in the auditorium", caption: "Audience Session", aspect: "wide" },
  { id: "mem-10", src: "/images/memories/event-memory-10.webp", alt: "Students listening to a speaker during a session", caption: "Learning Together", aspect: "wide" },
  { id: "mem-11", src: "/images/memories/event-memory-11.webp", alt: "Ceremonial lamp lighting at the event", caption: "Opening Ceremony", aspect: "wide" },
  { id: "mem-12", src: "/images/memories/event-memory-12.webp", alt: "Participants meeting and collaborating during the event", caption: "Meet the Community", aspect: "wide" },
  { id: "mem-13", src: "/images/memories/event-memory-13.webp", alt: "Two students presenting an idea on stage", caption: "Ideas on Stage", aspect: "wide" },
  { id: "mem-14", src: "/images/memories/event-memory-14.webp", alt: "Students presenting a project to the audience", caption: "Student Showcase", aspect: "wide" },
  { id: "mem-15", src: "/images/memories/event-memory-15.webp", alt: "Attendees watching a presentation", caption: "Event Highlights", aspect: "wide" },
  { id: "mem-16", src: "/images/memories/event-memory-16.webp", alt: "Students presenting a compliance review concept on stage", caption: "Compliance Review Pitch", aspect: "wide" },
  { id: "mem-17", src: "/images/memories/event-memory-17.webp", alt: "Speaker presenting a Gemini workshop at Ramaiah Institute of Technology", caption: "Build with Gemini", aspect: "wide" },
  { id: "mem-18", src: "/images/memories/event-memory-18.webp", alt: "Attendees discussing a presentation during the session", caption: "Workshop Discussion", aspect: "wide" },
  { id: "mem-19", src: "/images/memories/event-memory-19.webp", alt: "Participants and organizers celebrating with award boards", caption: "Winners and Organizers", aspect: "wide" },
  { id: "mem-20", src: "/images/memories/event-memory-20.webp", alt: "Student presenting an idea to the audience", caption: "Audience Presentation", aspect: "wide" },
];

export const GENERAL_FAQS: EventFaqItem[] = [
  {
    question: "Who can participate?",
    answer:
      "Students in 1st, 2nd, or 3rd year with a valid institution ID card are eligible. Cross-branch and cross-year teams are welcome.",
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
      "Both events are on 26 November 2026 at MSRIT, Bengaluru. Automate has a 20-hour online phase followed by a 9:00 AM–1:00 PM offline evaluation in ISE Lab 1 and ISE Lab 2. GTM Arena runs 1:30 PM–5:00 PM in the same labs.",
  },
  {
    question: "Can our team participate in both events?",
    answer:
      "Yes! Automate Boring Task and QuantFinance are scheduled on 26 November 2026, and teams can register for both tracks individually.",
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
      "₹20,000+ total cash prize pool split across podium finishers in both tracks (1st: ₹5,000, 2nd: ₹3,000, 3rd: ₹2,000 for each event), plus verified participation certificates for all registered teams. No trophies will be provided.",
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
  eyebrow: "BACKED BY INDUSTRY LEADERS & INSTITUTIONS",
  title: "SPONSORS",
  subtitle: "POWERING THE NEXT GENERATION OF BUILDERS & QUANTS",
  tiers: [
    {
      name: "OFFICIAL SPONSORS",
      accent: "#22E5FF",
      sponsors: [
        {
          name: "Gemini",
          tier: "Sponsor",
          logo: "gemini",
          url: "https://gemini.google.com/",
          desc: "Google's AI assistant for learning, research, and creative problem-solving",
        },
        {
          name: "Vo'ISE",
          tier: "Sponsor",
          logo: "voice",
          url: "#",
          desc: "Premier tech & public speaking community at MSRIT",
        },
        {
          name: "MSRIT",
          tier: "Sponsor",
          logo: "msrit",
          url: "https://msrit.edu",
          desc: "Ramaiah Institute of Technology, Bengaluru",
        },
      ],
    },
    {
      name: "COMMUNITY PARTNER",
      accent: "#A3F06D",
      sponsors: [
        {
          name: "Heapify",
          tier: "Community Partner",
          logo: "heapify",
          url: "https://heapify.org",
          desc: "Heapify Global Community • Empowering Builders & Innovators",
        },
      ],
    },
  ] as SponsorTier[],
};
