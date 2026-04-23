import type { Affiliate, NavItem, Package } from "./types";

/* ── COLORS ─────────────────────────────────────────────── */
export const C = {
  bg: "#05050f",
  surf: "#0c0c1e",
  surf2: "#111128",
  surf3: "#18183a",
  border: "rgba(255,255,255,0.07)",
  borderGold: "rgba(212,168,67,0.3)",
  gold: "#d4a843",
  goldL: "#f0c857",
  goldD: "#b8860b",
  cyan: "#00d4ff",
  purple: "#7c3aed",
  green: "#22d67a",
  red: "#ff4d6d",
  blue: "#3b82f6",
  text: "#f0f0ff",
  muted: "rgba(240,240,255,0.42)",
  muted2: "rgba(240,240,255,0.22)",
} as const;

/* ── GLOBAL STYLES STRING ───────────────────────────────── */
export const GS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{width:4px;height:4px;}
  ::-webkit-scrollbar-track{background:#0a0a16;}
  ::-webkit-scrollbar-thumb{background:#d4a84355;border-radius:4px;}
  ::-webkit-scrollbar-thumb:hover{background:#d4a843aa;}
  input[type=date]::-webkit-calendar-picker-indicator{filter:invert(1) sepia(1) saturate(2) hue-rotate(10deg);opacity:0.5;cursor:pointer;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px #d4a84322}50%{box-shadow:0 0 40px #d4a84355}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(0.92)}}
  @keyframes slideIn{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  .fade-up{animation:fadeUp 0.5s ease forwards;}
  .nav-item:hover{background:rgba(212,168,67,0.08)!important;color:#d4a843!important;}
  .nav-item:hover .nav-icon{transform:scale(1.15);}
  .pkg-card:hover{transform:translateY(-4px);box-shadow:0 24px 60px rgba(0,0,0,0.5)!important;}
  .stat-card:hover{transform:translateY(-2px);}
  .btn-gold:hover{filter:brightness(1.1);transform:translateY(-1px);}
  .btn-gold:active{transform:translateY(0);}
  .row-hover:hover{background:rgba(212,168,67,0.05)!important;}
  .row-my-network:hover{background:rgba(212,168,67,0.12)!important;}
  textarea,input{outline:none;}
  select{outline:none;}
`;

/* ── SEEDED RANDOM ──────────────────────────────────────── */
const sr = (s: number): number => {
  const x = Math.sin(s + 1) * 10000;
  return x - Math.floor(x);
};

/* ── NAME / COUNTRY DATA ────────────────────────────────── */
const FN = [
  "James",
  "Sophia",
  "Liam",
  "Emma",
  "Noah",
  "Olivia",
  "Ethan",
  "Ava",
  "Mason",
  "Isabella",
  "Lucas",
  "Mia",
  "Logan",
  "Charlotte",
  "Jackson",
  "Amelia",
  "Aiden",
  "Harper",
  "Elijah",
  "Evelyn",
  "Oliver",
  "Abigail",
  "Sebastian",
  "Emily",
  "Mateo",
  "Elizabeth",
  "Jack",
  "Sofia",
  "Owen",
  "Avery",
  "Daniel",
  "Ella",
  "Henry",
  "Scarlett",
  "William",
  "Victoria",
  "Alexander",
  "Madison",
  "Michael",
  "Luna",
  "Benjamin",
  "Grace",
  "Jayden",
  "Chloe",
  "Carter",
  "Penelope",
  "Wyatt",
  "Riley",
  "Ryan",
  "Zoey",
  "Raj",
  "Priya",
  "Arjun",
  "Deepa",
  "Vikram",
  "Rohan",
  "Kavya",
  "Siddharth",
  "Wei",
  "Mei",
  "Jun",
  "Yuki",
  "Mohammed",
  "Fatima",
  "Ahmed",
  "Aisha",
  "Omar",
  "Zainab",
  "Hassan",
  "Layla",
  "Andre",
  "Camille",
  "Diego",
  "Sofia",
  "Kwame",
  "Amara",
  "Tariq",
  "Yasmin",
];
const LN = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Kumar",
  "Patel",
  "Shah",
  "Sharma",
  "Singh",
  "Gupta",
  "Mehta",
  "Rao",
  "Chen",
  "Wang",
  "Liu",
  "Zhang",
  "Huang",
  "Zhao",
  "Yang",
  "Li",
  "Santos",
  "Ferreira",
  "Costa",
  "Silva",
  "Oliveira",
  "Okafor",
  "Mensah",
  "Adeyemi",
  "Hassan",
  "Ali",
  "Ahmed",
  "Rahman",
  "Nakamura",
  "Tanaka",
  "Suzuki",
  "Park",
  "Kim",
  "Choi",
  "Jung",
  "Kang",
];
const CTR = [
  "🇺🇸 USA",
  "🇬🇧 UK",
  "🇨🇦 Canada",
  "🇦🇺 Australia",
  "🇩🇪 Germany",
  "🇫🇷 France",
  "🇮🇳 India",
  "🇧🇷 Brazil",
  "🇲🇽 Mexico",
  "🇸🇬 Singapore",
  "🇯🇵 Japan",
  "🇳🇬 Nigeria",
  "🇿🇦 S.Africa",
  "🇦🇪 UAE",
  "🇵🇰 Pakistan",
  "🇮🇩 Indonesia",
  "🇵🇭 Philippines",
  "🇰🇷 S.Korea",
  "🇮🇹 Italy",
  "🇪🇸 Spain",
  "🇳🇱 Netherlands",
  "🇸🇪 Sweden",
  "🇨🇭 Switzerland",
  "🇹🇷 Turkey",
  "🇲🇾 Malaysia",
  "🇹🇭 Thailand",
];

/* ── 10,000 AFFILIATES ──────────────────────────────────── */
export const AFFILIATES: Affiliate[] = Array.from({ length: 10000 }, (_, i) => {
  const rank = i + 1;
  const name = `${FN[Math.floor(sr(i * 7) * FN.length)]} ${LN[Math.floor(sr(i * 7 + 1) * LN.length)]}`;
  const country = CTR[Math.floor(sr(i * 7 + 2) * CTR.length)];
  const earnings = Math.floor(
    Math.max(120, 285000 * ((10000 - i) / 10000) ** 1.6 + sr(i * 7 + 3) * 1500),
  );
  const refs = Math.floor(Math.max(1, (10001 - rank) / 9 + sr(i * 7 + 4) * 30));
  const badge =
    rank <= 3
      ? ["🥇", "🥈", "🥉"][rank - 1]
      : rank <= 10
        ? "👑"
        : rank <= 100
          ? "💎"
          : rank <= 500
            ? "🔥"
            : rank <= 1000
              ? "⭐"
              : "·";
  const tier =
    rank <= 10
      ? "Legendary"
      : rank <= 100
        ? "Diamond"
        : rank <= 500
          ? "Platinum"
          : rank <= 2000
            ? "Gold"
            : rank <= 5000
              ? "Silver"
              : "Bronze";
  return { rank, name, country, earnings, refs, badge, tier };
});

/* ── MY NETWORK: DAKESH KASHYAP's personal affiliates ───── */
// Deterministic selection: pick ~75 affiliates across all tiers
// using a seeded pattern — spread across rank ranges for realistic distribution
const MY_NETWORK_INDICES: number[] = (() => {
  const picks = new Set<number>();
  // A few top performers (rank 4-25)
  for (const r of [4, 7, 11, 16, 22]) picks.add(r - 1);
  // Diamond tier picks (rank 26–100)
  for (let r = 26; r <= 100; r += 14) picks.add(r - 1);
  // Platinum tier picks (rank 101–500) — every ~33rd
  for (let r = 103; r <= 500; r += 33) picks.add(r - 1);
  // Gold tier picks (rank 501–2000) — every ~100th offset by 17
  for (let r = 517; r <= 2000; r += 97) picks.add(r - 1);
  // Silver tier picks (rank 2001–5000) — every ~250th
  for (let r = 2043; r <= 5000; r += 247) picks.add(r - 1);
  // Bronze tier picks (rank 5001–10000) — every ~500th
  for (let r = 5081; r <= 10000; r += 503) picks.add(r - 1);
  return Array.from(picks).sort((a, b) => a - b);
})();

export const MY_NETWORK_RANKS: Set<number> = new Set(
  MY_NETWORK_INDICES.map((i) => i + 1),
);

export const MY_NETWORK_AFFILIATES: Affiliate[] = MY_NETWORK_INDICES.map(
  (i) => AFFILIATES[i],
);

/* ── PACKAGES ───────────────────────────────────────────── */
export const PACKAGES: Package[] = [
  {
    id: 1,
    name: "ZEN Starter",
    price: 29,
    tag: "BEGINNER",
    color: "#22d67a",
    icon: "🌱",
    desc: "Launch your affiliate journey with essential tools and community support.",
    features: [
      "5 Affiliate Links",
      "Basic Analytics Dashboard",
      "Email Support (48h)",
      "1 Digital Product Access",
      "Community Forum Access",
      "Monthly Performance Report",
      "ZEN Certificate of Entry",
    ],
  },
  {
    id: 2,
    name: "ZEN Pro",
    price: 79,
    tag: "POPULAR",
    color: "#00d4ff",
    icon: "⚡",
    desc: "Scale faster with advanced tools, AI access, and priority support.",
    features: [
      "25 Affiliate Links",
      "Advanced Analytics + Charts",
      "Priority Support (12h)",
      "3 Digital Products",
      "ZEN AI Assistant",
      "Custom Dashboard Themes",
      "Weekly Webinar Access",
      "Revenue Share 25%",
    ],
  },
  {
    id: 3,
    name: "ZEN Business",
    price: 199,
    tag: "BEST VALUE",
    color: "#d4a843",
    icon: "🏢",
    desc: "Complete professional suite for serious businesses and teams.",
    features: [
      "Unlimited Affiliate Links",
      "Real-Time Analytics + API",
      "24/7 Live Chat Support",
      "All 4 Digital Products",
      "ZEN AI Pro Mode",
      "White-Label Option",
      "Team Management (5 seats)",
      "Revenue Share 35%",
      "Priority Payouts (48h)",
    ],
  },
  {
    id: 4,
    name: "ZEN Enterprise",
    price: 499,
    tag: "ELITE",
    color: "#7c3aed",
    icon: "💎",
    desc: "Exclusive enterprise-grade power for the top performers globally.",
    features: [
      "Everything in Business",
      "Dedicated Account Manager",
      "Custom API Integration",
      "Full Platform API Access",
      "Priority Payouts (24h)",
      "Revenue Share 50%",
      "DAKESH KASHYAP Direct Line",
      "Custom Branding Kit",
      "White-Glove Onboarding",
      "Unlimited Team Seats",
    ],
  },
];

/* ── NAV ITEMS ──────────────────────────────────────────── */
export const NAV: NavItem[] = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "products", icon: "📦", label: "Products" },
  { id: "affiliates", icon: "🏆", label: "Leaderboard" },
  { id: "network", icon: "🌐", label: "My Network" },
  { id: "ai", icon: "🤖", label: "ZEN AI" },
  { id: "admin", icon: "👑", label: "Founder Panel" },
  { id: "privacy", icon: "🔒", label: "Privacy Policy" },
];

/* ── FORMAT CURRENCY ────────────────────────────────────── */
export const fmt = (n: number): string =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(2)}M`
    : n >= 1_000
      ? `$${(n / 1_000).toFixed(1)}K`
      : `$${n}`;
