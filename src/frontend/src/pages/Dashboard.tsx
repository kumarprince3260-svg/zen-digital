import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { C, PACKAGES, fmt } from "../data";

/* ── MONTHLY CHART DATA ─────────────────────────────────── */
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const RAW_REV = [
  842, 921, 1105, 987, 1243, 1387, 1521, 1432, 1687, 1923, 2156, 2847,
];
const REVENUE_DATA = RAW_REV.map((v, i) => ({ month: MONTHS[i], revenue: v }));

/* ── LIVE TRANSACTIONS ──────────────────────────────────── */
interface Transaction {
  amount: number;
  pkg: string;
  country: string;
  time: string;
}
const TRANSACTIONS: Transaction[] = [
  { amount: 499, pkg: "ZEN Enterprise", country: "🇺🇸 USA", time: "12s ago" },
  { amount: 199, pkg: "ZEN Business", country: "🇬🇧 UK", time: "47s ago" },
  { amount: 79, pkg: "ZEN Pro", country: "🇮🇳 India", time: "1m ago" },
  { amount: 499, pkg: "ZEN Enterprise", country: "🇦🇪 UAE", time: "2m ago" },
  { amount: 29, pkg: "ZEN Starter", country: "🇩🇪 Germany", time: "3m ago" },
  { amount: 199, pkg: "ZEN Business", country: "🇸🇬 Singapore", time: "4m ago" },
  { amount: 79, pkg: "ZEN Pro", country: "🇦🇺 Australia", time: "5m ago" },
  { amount: 499, pkg: "ZEN Enterprise", country: "🇯🇵 Japan", time: "6m ago" },
];

/* ── PACKAGE PERFORMANCE ────────────────────────────────── */
const PKG_PERF = [
  { name: "ZEN Starter", units: 4231, color: "#22d67a" },
  { name: "ZEN Pro", units: 3847, color: "#00d4ff" },
  { name: "ZEN Business", units: 2914, color: "#d4a843" },
  { name: "ZEN Enterprise", units: 1855, color: "#7c3aed" },
];
const maxUnits = Math.max(...PKG_PERF.map((p) => p.units));

/* ── STAT CARDS ─────────────────────────────────────────── */
interface StatCard {
  label: string;
  value: string;
  trend: string;
  trendColor: string;
  icon: string;
}
const STATS: StatCard[] = [
  {
    label: "Total Revenue",
    value: "$2,847,291",
    trend: "+18.3%",
    trendColor: C.green,
    icon: "💰",
  },
  {
    label: "Active Affiliates",
    value: "48,291",
    trend: "+5.2%",
    trendColor: C.blue,
    icon: "👥",
  },
  {
    label: "Products Sold",
    value: "12,847",
    trend: "+23.1%",
    trendColor: C.gold,
    icon: "📦",
  },
  {
    label: "Active Links",
    value: "94,371",
    trend: "+11.7%",
    trendColor: C.purple,
    icon: "🔗",
  },
];

/* ── CUSTOM TOOLTIP ─────────────────────────────────────── */
interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}
function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: C.surf3,
        border: `1px solid ${C.borderGold}`,
        borderRadius: 10,
        padding: "10px 16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          fontFamily: "'DM Mono'",
          fontSize: 11,
          color: C.muted,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'DM Mono'",
          fontSize: 16,
          color: C.gold,
          fontWeight: 500,
        }}
      >
        ${payload[0].value}K
      </div>
    </div>
  );
}

/* ── ANIMATED DOT ───────────────────────────────────────── */
function LiveDot() {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: C.green,
          display: "inline-block",
          animation: "pulse 1.6s ease-in-out infinite",
        }}
      />
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 8000);
    return () => clearInterval(id);
  }, []);
  // tick used to keep component reactive (live feel)
  void tick;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 28,
        animation: "fadeUp 0.5s ease",
      }}
    >
      {/* ── HERO ──────────────────────────────────────────── */}
      <div
        style={{
          background: `linear-gradient(135deg,${C.surf2} 0%,${C.surf3} 100%)`,
          border: `1px solid ${C.borderGold}`,
          borderRadius: 20,
          padding: "36px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            top: "-40%",
            right: "-5%",
            width: 320,
            height: 320,
            background: `radial-gradient(circle,${C.gold}14 0%,transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: `linear-gradient(90deg,transparent,${C.gold}44,transparent)`,
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 32,
                animation: "float 3s ease-in-out infinite",
              }}
            >
              👑
            </span>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 36,
                fontWeight: 700,
                color: C.gold,
                letterSpacing: "0.02em",
                lineHeight: 1.1,
              }}
            >
              Welcome back, DAKESH KASHYAP
            </h1>
          </div>
          <p
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: 14,
              color: C.muted,
              marginBottom: 20,
              letterSpacing: "0.04em",
            }}
          >
            Founder &amp; CEO · Full Platform Authority
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "PLATFORM STATUS",
                value: "OPERATIONAL",
                color: C.green,
              },
              { label: "UPTIME", value: "99.98%", color: C.cyan },
              { label: "EDITION", value: "ENTERPRISE", color: C.gold },
              { label: "ACCESS LEVEL", value: "ROOT", color: C.purple },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: `${s.color}12`,
                  border: `1px solid ${s.color}44`,
                  borderRadius: 8,
                  padding: "5px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: s.color,
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Mono'",
                    fontSize: 9,
                    color: C.muted,
                    letterSpacing: "0.1em",
                  }}
                >
                  {s.label}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono'",
                    fontSize: 9,
                    color: s.color,
                    fontWeight: 500,
                  }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 16,
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="stat-card"
            data-ocid={`dashboard.stat_card.${i + 1}`}
            style={{
              background: C.surf,
              borderRadius: 16,
              padding: "22px 24px",
              border: `1px solid ${C.border}`,
              borderTop: `2px solid ${C.gold}`,
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 80,
                height: 80,
                background: `radial-gradient(circle,${s.trendColor}08 0%,transparent 70%)`,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <span
                style={{
                  fontFamily: "'DM Mono'",
                  fontSize: 11,
                  color: s.trendColor,
                  background: `${s.trendColor}18`,
                  border: `1px solid ${s.trendColor}44`,
                  borderRadius: 20,
                  padding: "2px 9px",
                }}
              >
                {s.trend}
              </span>
            </div>
            <div
              style={{
                fontFamily: "'DM Mono'",
                fontSize: 26,
                fontWeight: 500,
                color: C.text,
                letterSpacing: "-0.02em",
                marginBottom: 4,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "'Outfit'",
                fontSize: 12,
                color: C.muted,
                letterSpacing: "0.04em",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── CHART + TRANSACTIONS ──────────────────────────── */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}
      >
        {/* Monthly Revenue Chart */}
        <div
          style={{
            background: C.surf,
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: "24px 24px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Outfit'",
                  fontSize: 16,
                  fontWeight: 700,
                  color: C.text,
                }}
              >
                Monthly Revenue
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono'",
                  fontSize: 10,
                  color: C.muted,
                  letterSpacing: "0.08em",
                }}
              >
                Jan – Dec 2025 · USD Thousands
              </div>
            </div>
            <span
              style={{
                fontFamily: "'DM Mono'",
                fontSize: 10,
                color: C.gold,
                background: `${C.gold}18`,
                border: `1px solid ${C.borderGold}`,
                borderRadius: 20,
                padding: "3px 10px",
              }}
            >
              YTD +34.2%
            </span>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA} barCategoryGap="30%">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={`${C.borderGold}`}
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{
                    fill: C.muted,
                    fontSize: 10,
                    fontFamily: "'DM Mono'",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{
                    fill: C.muted,
                    fontSize: 10,
                    fontFamily: "'DM Mono'",
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `$${v}K`}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: `${C.gold}08` }}
                />
                <Bar dataKey="revenue" fill={C.gold} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Transactions */}
        <div
          style={{
            background: C.surf,
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 18,
            }}
          >
            <LiveDot />
            <span
              style={{
                fontFamily: "'Outfit'",
                fontSize: 16,
                fontWeight: 700,
                color: C.text,
              }}
            >
              Live Transactions
            </span>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {TRANSACTIONS.map((tx, i) => (
              <div
                key={`${tx.pkg}-${tx.time}`}
                className="row-hover"
                data-ocid={`dashboard.transaction.item.${i + 1}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr auto",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 10px",
                  borderRadius: 10,
                  transition: "background 0.2s",
                  animation: `slideIn 0.4s ease ${i * 0.06}s backwards`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono'",
                    fontSize: 14,
                    color: C.gold,
                    fontWeight: 500,
                  }}
                >
                  ${tx.amount}
                </span>
                <div>
                  <div style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>
                    {tx.pkg}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted }}>
                    {tx.country}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "'DM Mono'",
                    fontSize: 10,
                    color: C.muted2,
                    whiteSpace: "nowrap",
                  }}
                >
                  {tx.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PACKAGE PERFORMANCE ───────────────────────────── */}
      <div
        style={{
          background: C.surf,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          padding: "24px 28px",
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontFamily: "'Outfit'",
              fontSize: 16,
              fontWeight: 700,
              color: C.text,
            }}
          >
            Package Performance
          </div>
          <div
            style={{
              fontFamily: "'DM Mono'",
              fontSize: 10,
              color: C.muted,
              letterSpacing: "0.08em",
            }}
          >
            Units sold · Revenue contribution
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 16,
          }}
        >
          {PKG_PERF.map((p, i) => {
            const pkg = PACKAGES[i];
            const pct = Math.round((p.units / maxUnits) * 100);
            const rev = p.units * (pkg?.price ?? 0);
            return (
              <div
                key={p.name}
                data-ocid={`dashboard.package_perf.item.${i + 1}`}
                style={{
                  background: C.surf2,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: "18px 20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: p.color,
                      display: "inline-block",
                      boxShadow: `0 0 10px ${p.color}66`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Outfit'",
                      fontSize: 13,
                      fontWeight: 600,
                      color: C.text,
                    }}
                  >
                    {p.name}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono'",
                    fontSize: 22,
                    fontWeight: 500,
                    color: C.text,
                    marginBottom: 4,
                  }}
                >
                  {p.units.toLocaleString()}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono'",
                    fontSize: 10,
                    color: C.muted,
                    marginBottom: 12,
                  }}
                >
                  units sold · {fmt(rev)}
                </div>
                {/* Progress bar */}
                <div
                  style={{
                    height: 4,
                    borderRadius: 4,
                    background: `${p.color}22`,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: p.color,
                      borderRadius: 4,
                      transition: "width 1s ease",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono'",
                    fontSize: 10,
                    color: p.color,
                    marginTop: 6,
                  }}
                >
                  {pct}% of top
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
