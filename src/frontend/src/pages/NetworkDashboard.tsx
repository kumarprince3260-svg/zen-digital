import { useMemo, useState } from "react";
import { AFFILIATES, C, fmt } from "../data";
import type { Affiliate } from "../types";

/* ── DAKESH's personal affiliate ranks ─────────────────── */
const MY_RANKS = new Set([
  47, 203, 891, 1204, 2567, 3001, 4455, 5200, 6789, 7123, 8001, 9234,
]);
const MY_AFFILIATES: Affiliate[] = AFFILIATES.filter((a) =>
  MY_RANKS.has(a.rank),
);

type SortKey = "rank" | "name" | "country" | "tier" | "earnings" | "refs";
type SortDir = "asc" | "desc";

const TIER_CONFIG: Record<
  string,
  { color: string; emoji: string; order: number }
> = {
  Legendary: { color: "#ffd700", emoji: "👑", order: 1 },
  Diamond: { color: "#00d4ff", emoji: "💎", order: 2 },
  Platinum: { color: "#e5e4e2", emoji: "🔥", order: 3 },
  Gold: { color: "#d4a843", emoji: "⭐", order: 4 },
  Silver: { color: "#adb5bd", emoji: "🥈", order: 5 },
  Bronze: { color: "#cd7f32", emoji: "🥉", order: 6 },
};

function StatCard({
  label,
  value,
  sub,
  icon,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: string;
  accent?: string;
}) {
  return (
    <div
      className="stat-card"
      style={{
        background: C.surf,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "20px 24px",
        transition: "all 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${accent ?? C.gold}88, transparent)`,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: C.muted,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "'DM Mono'",
              marginBottom: 6,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: accent ?? C.gold,
              fontFamily: "'Cormorant Garamond',serif",
              letterSpacing: "0.01em",
            }}
          >
            {value}
          </div>
          {sub && (
            <div
              style={{
                fontSize: 12,
                color: C.muted,
                marginTop: 4,
                fontFamily: "'DM Mono'",
              }}
            >
              {sub}
            </div>
          )}
        </div>
        <div
          style={{
            fontSize: 28,
            background: `${accent ?? C.gold}18`,
            borderRadius: 12,
            width: 52,
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function TierBar({ affiliates }: { affiliates: Affiliate[] }) {
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const a of affiliates) map[a.tier] = (map[a.tier] ?? 0) + 1;
    return map;
  }, [affiliates]);

  const tiers = Object.entries(TIER_CONFIG).filter(([t]) => counts[t] > 0);
  const max = Math.max(...tiers.map(([t]) => counts[t] ?? 0));

  return (
    <div
      style={{
        background: C.surf,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${C.gold}88, transparent)`,
        }}
      />
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: C.text,
          marginBottom: 18,
          letterSpacing: "0.04em",
        }}
      >
        Performance Tier Breakdown
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {tiers.map(([tier, cfg]) => {
          const count = counts[tier] ?? 0;
          const pct = max > 0 ? (count / max) * 100 : 0;
          return (
            <div key={tier} data-ocid={`network.tier_${tier.toLowerCase()}`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{cfg.emoji}</span>
                  <span
                    style={{ fontSize: 13, fontWeight: 600, color: cfg.color }}
                  >
                    {tier}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'DM Mono'",
                    fontSize: 12,
                    color: C.muted,
                  }}
                >
                  {count} affiliate{count !== 1 ? "s" : ""}
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  background: C.surf2,
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${cfg.color}cc, ${cfg.color})`,
                    borderRadius: 4,
                    transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
                    boxShadow: `0 0 8px ${cfg.color}66`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function NetworkDashboard() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  /* summary stats */
  const topAffiliate = useMemo(
    () =>
      MY_AFFILIATES.reduce(
        (best, a) => (a.earnings > best.earnings ? a : best),
        MY_AFFILIATES[0],
      ),
    [],
  );
  const combinedEarnings = useMemo(
    () => MY_AFFILIATES.reduce((s, a) => s + a.earnings, 0),
    [],
  );
  const avgRank = useMemo(
    () =>
      Math.round(
        MY_AFFILIATES.reduce((s, a) => s + a.rank, 0) / MY_AFFILIATES.length,
      ),
    [],
  );

  /* filter + sort */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = q
      ? MY_AFFILIATES.filter(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.country.toLowerCase().includes(q) ||
            a.tier.toLowerCase().includes(q),
        )
      : [...MY_AFFILIATES];

    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "rank") cmp = a.rank - b.rank;
      else if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "country") cmp = a.country.localeCompare(b.country);
      else if (sortKey === "tier")
        cmp =
          (TIER_CONFIG[a.tier]?.order ?? 9) - (TIER_CONFIG[b.tier]?.order ?? 9);
      else if (sortKey === "earnings") cmp = a.earnings - b.earnings;
      else if (sortKey === "refs") cmp = a.refs - b.refs;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [search, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const maxEarnings = useMemo(
    () => Math.max(...MY_AFFILIATES.map((a) => a.earnings)),
    [],
  );

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key)
      return <span style={{ opacity: 0.3, marginLeft: 4 }}>↕</span>;
    return (
      <span style={{ color: C.gold, marginLeft: 4 }}>
        {sortDir === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  return (
    <div
      style={{ paddingTop: 28, animation: "fadeUp 0.5s ease" }}
      data-ocid="network.page"
    >
      {/* ── PAGE HEADER ─── */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${C.gold}22, ${C.gold}08)`,
              border: `1px solid ${C.gold}44`,
              borderRadius: 12,
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              animation: "float 3s ease-in-out infinite",
            }}
          >
            🌐
          </div>
          <div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 32,
                fontWeight: 700,
                color: C.text,
                letterSpacing: "0.01em",
                lineHeight: 1.1,
              }}
            >
              My Network Dashboard
            </h1>
            <p
              style={{
                fontSize: 13,
                color: C.muted,
                fontFamily: "'DM Mono'",
                letterSpacing: "0.06em",
              }}
            >
              Your personal affiliate network ·{" "}
              <span style={{ color: C.gold }}>DAKESH KASHYAP</span>
            </p>
          </div>
        </div>
        <div
          style={{
            height: 1,
            background: `linear-gradient(90deg, ${C.gold}44, transparent)`,
            marginTop: 16,
          }}
        />
      </div>

      {/* ── STAT CARDS ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
        data-ocid="network.stats_section"
      >
        <StatCard
          label="My Affiliates"
          value={String(MY_AFFILIATES.length)}
          sub="personally managed"
          icon="🌐"
          accent={C.gold}
        />
        <StatCard
          label="Combined Earnings"
          value={fmt(combinedEarnings)}
          sub="across all tiers"
          icon="💰"
          accent={C.green}
        />
        <StatCard
          label="Top Affiliate"
          value={topAffiliate?.name ?? "—"}
          sub={`Rank #${topAffiliate?.rank} · ${fmt(topAffiliate?.earnings ?? 0)}`}
          icon="🏆"
          accent={C.cyan}
        />
        <StatCard
          label="Average Global Rank"
          value={`#${avgRank.toLocaleString()}`}
          sub="of 10,000 affiliates"
          icon="📈"
          accent={C.purple}
        />
      </div>

      {/* ── TIER BREAKDOWN ─── */}
      <div style={{ marginBottom: 24 }} data-ocid="network.tier_section">
        <TierBar affiliates={MY_AFFILIATES} />
      </div>

      {/* ── TABLE SECTION ─── */}
      <div
        style={{
          background: C.surf,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
        }}
        data-ocid="network.table"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${C.gold}88, transparent)`,
          }}
        />
        {/* Table header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>
              Affiliate Roster
            </span>
            <span
              style={{
                marginLeft: 10,
                background: `${C.gold}22`,
                border: `1px solid ${C.gold}44`,
                borderRadius: 6,
                padding: "2px 9px",
                fontSize: 11,
                color: C.gold,
                fontFamily: "'DM Mono'",
              }}
            >
              {filtered.length} / {MY_AFFILIATES.length}
            </span>
          </div>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 14,
                color: C.muted,
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search name, country, tier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="network.search_input"
              style={{
                background: C.surf2,
                border: `1px solid ${search ? C.borderGold : C.border}`,
                borderRadius: 10,
                padding: "9px 14px 9px 36px",
                color: C.text,
                fontSize: 13,
                width: 260,
                fontFamily: "'Outfit',sans-serif",
                transition: "border-color 0.2s",
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: C.surf2 }}>
                {(
                  [
                    "rank",
                    "name",
                    "country",
                    "tier",
                    "earnings",
                    "refs",
                  ] as SortKey[]
                ).map((col) => (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    onKeyDown={(e) => e.key === "Enter" && handleSort(col)}
                    data-ocid={`network.sort_${col}`}
                    style={{
                      padding: "11px 16px",
                      textAlign:
                        col === "earnings" || col === "refs" ? "right" : "left",
                      fontSize: 10,
                      fontFamily: "'DM Mono'",
                      color: sortKey === col ? C.gold : C.muted,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      userSelect: "none",
                      borderBottom: `1px solid ${C.border}`,
                      transition: "color 0.2s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col === "rank"
                      ? "Global Rank"
                      : col === "refs"
                        ? "Referrals"
                        : col.charAt(0).toUpperCase() + col.slice(1)}
                    {sortIndicator(col)}
                  </th>
                ))}
                <th
                  style={{
                    padding: "11px 16px",
                    textAlign: "right",
                    fontSize: 10,
                    fontFamily: "'DM Mono'",
                    color: C.muted,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    borderBottom: `1px solid ${C.border}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  Performance
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    data-ocid="network.empty_state"
                    style={{
                      padding: "48px 24px",
                      textAlign: "center",
                      color: C.muted,
                      fontFamily: "'DM Mono'",
                      fontSize: 13,
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                    No affiliates match your search
                  </td>
                </tr>
              ) : (
                filtered.map((aff, idx) => {
                  const tierCfg = TIER_CONFIG[aff.tier] ?? {
                    color: C.muted,
                    emoji: "·",
                    order: 9,
                  };
                  const barPct =
                    maxEarnings > 0 ? (aff.earnings / maxEarnings) * 100 : 0;
                  return (
                    <tr
                      key={aff.rank}
                      className="row-hover"
                      data-ocid={`network.item.${idx + 1}`}
                      style={{
                        borderBottom: `1px solid ${C.border}`,
                        transition: "background 0.15s",
                      }}
                    >
                      {/* Rank */}
                      <td
                        style={{
                          padding: "13px 16px",
                          fontFamily: "'DM Mono'",
                          fontSize: 13,
                        }}
                      >
                        <span
                          style={{
                            color: aff.rank <= 100 ? C.gold : C.text,
                            fontWeight: aff.rank <= 100 ? 700 : 400,
                          }}
                        >
                          #{aff.rank.toLocaleString()}
                        </span>
                        <span style={{ marginLeft: 6, fontSize: 14 }}>
                          {aff.badge}
                        </span>
                      </td>
                      {/* Name */}
                      <td
                        style={{
                          padding: "13px 16px",
                          fontSize: 14,
                          fontWeight: 600,
                          color: C.text,
                        }}
                      >
                        {aff.name}
                      </td>
                      {/* Country */}
                      <td
                        style={{
                          padding: "13px 16px",
                          fontSize: 13,
                          color: C.muted,
                        }}
                      >
                        {aff.country}
                      </td>
                      {/* Tier */}
                      <td style={{ padding: "13px 16px" }}>
                        <span
                          style={{
                            background: `${tierCfg.color}18`,
                            border: `1px solid ${tierCfg.color}44`,
                            borderRadius: 6,
                            padding: "3px 10px",
                            fontSize: 11,
                            color: tierCfg.color,
                            fontWeight: 600,
                            fontFamily: "'DM Mono'",
                            letterSpacing: "0.04em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {tierCfg.emoji} {aff.tier}
                        </span>
                      </td>
                      {/* Earnings */}
                      <td
                        style={{
                          padding: "13px 16px",
                          textAlign: "right",
                          fontFamily: "'DM Mono'",
                          fontSize: 13,
                          color: C.green,
                          fontWeight: 600,
                        }}
                      >
                        {fmt(aff.earnings)}
                      </td>
                      {/* Refs */}
                      <td
                        style={{
                          padding: "13px 16px",
                          textAlign: "right",
                          fontFamily: "'DM Mono'",
                          fontSize: 13,
                          color: C.cyan,
                        }}
                      >
                        {aff.refs.toLocaleString()}
                      </td>
                      {/* Performance bar */}
                      <td style={{ padding: "13px 16px", minWidth: 120 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            justifyContent: "flex-end",
                          }}
                        >
                          <div
                            style={{
                              width: 80,
                              height: 5,
                              background: C.surf2,
                              borderRadius: 4,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: `${barPct}%`,
                                background: `linear-gradient(90deg, ${C.gold}aa, ${C.gold})`,
                                borderRadius: 4,
                                transition: "width 0.6s ease",
                                boxShadow: `0 0 6px ${C.gold}55`,
                              }}
                            />
                          </div>
                          <span
                            style={{
                              fontSize: 10,
                              color: C.muted,
                              fontFamily: "'DM Mono'",
                              minWidth: 32,
                              textAlign: "right",
                            }}
                          >
                            {barPct.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 24px",
            borderTop: `1px solid ${C.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span
            style={{ fontSize: 11, color: C.muted, fontFamily: "'DM Mono'" }}
          >
            Showing {filtered.length} of {MY_AFFILIATES.length} personal
            affiliates
          </span>
          <span
            style={{
              fontSize: 11,
              color: C.muted2,
              fontFamily: "'DM Mono'",
              letterSpacing: "0.08em",
            }}
          >
            DAKESH KASHYAP · NETWORK VIEW · ZEN Digital
          </span>
        </div>
      </div>
    </div>
  );
}
