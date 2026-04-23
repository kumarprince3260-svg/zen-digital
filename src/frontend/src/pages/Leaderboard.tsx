import { useMemo, useState } from "react";
import {
  AFFILIATES,
  C,
  MY_NETWORK_AFFILIATES,
  MY_NETWORK_RANKS,
  fmt,
} from "../data";
import type { Affiliate } from "../types";

const PAGE_SIZE = 50;

type ViewMode = "all" | "network";

const TIER_COLORS: Record<string, string> = {
  Legendary: C.gold,
  Diamond: C.cyan,
  Platinum: "rgba(200,200,230,0.9)",
  Gold: C.gold,
  Silver: "rgba(180,180,200,0.85)",
  Bronze: "#cd7f32",
};

function TierPill({ tier }: { tier: string }) {
  const color = TIER_COLORS[tier] ?? C.muted;
  return (
    <span
      style={{
        background: `${color}20`,
        border: `1px solid ${color}55`,
        color,
        borderRadius: 6,
        padding: "2px 8px",
        fontSize: 10,
        fontFamily: "'DM Mono'",
        letterSpacing: "0.06em",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {tier}
    </span>
  );
}

function PodiumCard({ aff, pos }: { aff: Affiliate; pos: 1 | 2 | 3 }) {
  const heights = { 1: 148, 2: 110, 3: 90 };
  const glowColors = { 1: C.gold, 2: "rgba(192,192,200,0.8)", 3: "#cd7f32" };
  const glowStyle =
    pos === 1
      ? {
          boxShadow: `0 0 40px ${C.gold}44, 0 0 80px ${C.gold}22`,
          animation: "glow 2.5s ease-in-out infinite",
          border: `1px solid ${C.gold}66`,
        }
      : {
          border: `1px solid ${glowColors[pos]}33`,
          boxShadow: `0 0 20px ${glowColors[pos]}22`,
        };
  const labelColor = glowColors[pos];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        flex: pos === 1 ? "0 0 200px" : "0 0 168px",
      }}
    >
      <div style={{ fontSize: pos === 1 ? 38 : 28 }}>{aff.badge}</div>
      <div
        style={{
          background: C.surf,
          borderRadius: 16,
          padding: "18px 20px",
          textAlign: "center",
          width: "100%",
          ...glowStyle,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {pos === 1 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg,transparent,${C.gold},transparent)`,
            }}
          />
        )}
        <div
          style={{
            fontFamily: "'DM Mono'",
            fontSize: 11,
            color: labelColor,
            letterSpacing: "0.1em",
            marginBottom: 6,
          }}
        >
          #{aff.rank}
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 700,
            fontSize: pos === 1 ? 18 : 15,
            color: C.text,
            marginBottom: 2,
          }}
        >
          {aff.name}
        </div>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>
          {aff.country}
        </div>
        <div
          style={{
            fontFamily: "'DM Mono'",
            fontSize: pos === 1 ? 19 : 15,
            fontWeight: 500,
            color: labelColor,
          }}
        >
          {fmt(aff.earnings)}
        </div>
        <div
          style={{
            background: `linear-gradient(180deg,${labelColor}33,${labelColor}11)`,
            borderRadius: "0 0 10px 10px",
            height: heights[pos],
            marginTop: 14,
            marginLeft: -20,
            marginRight: -20,
            marginBottom: -18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: pos === 1 ? 52 : 40,
              fontWeight: 700,
              color: `${labelColor}66`,
            }}
          >
            {pos}
          </span>
        </div>
      </div>
    </div>
  );
}

function NetworkSummaryCard({ affiliates }: { affiliates: Affiliate[] }) {
  const topAff = affiliates[0];
  const totalEarnings = affiliates.reduce((s, a) => s + a.earnings, 0);
  const avgRank = Math.round(
    affiliates.reduce((s, a) => s + a.rank, 0) / affiliates.length,
  );

  const stats = [
    { label: "Network Size", value: affiliates.length.toString(), icon: "🌐" },
    { label: "Combined Earnings", value: fmt(totalEarnings), icon: "💰" },
    {
      label: "Avg Global Rank",
      value: `#${avgRank.toLocaleString()}`,
      icon: "📈",
    },
  ];

  return (
    <div
      data-ocid="leaderboard.network_summary"
      style={{
        background: C.surf,
        border: `1px solid ${C.borderGold}`,
        borderRadius: 20,
        padding: "24px 28px",
        marginBottom: 28,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold shimmer top line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: 1,
          background: `linear-gradient(90deg,transparent,${C.gold},transparent)`,
        }}
      />
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(circle,${C.gold}08,transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {/* Top affiliate spotlight */}
        <div style={{ flex: "1 1 240px" }}>
          <div
            style={{
              fontFamily: "'DM Mono'",
              fontSize: 9,
              color: C.gold,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            ✦ Your Top Affiliate
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: `linear-gradient(135deg,${C.gold}33,${C.goldD}22)`,
                border: `1px solid ${C.borderGold}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              {topAff.badge}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 700,
                  fontSize: 20,
                  color: C.text,
                  lineHeight: 1.2,
                }}
              >
                {topAff.name}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono'",
                    fontSize: 13,
                    color: C.gold,
                    fontWeight: 600,
                  }}
                >
                  Global Rank #{topAff.rank}
                </span>
                <TierPill tier={topAff.tier} />
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono'",
                  fontSize: 12,
                  color: C.muted,
                  marginTop: 4,
                }}
              >
                {topAff.country} · {fmt(topAff.earnings)}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: C.surf2,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "14px 18px",
                minWidth: 110,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
              <div
                style={{
                  fontFamily: "'DM Mono'",
                  fontSize: 15,
                  fontWeight: 500,
                  color: C.gold,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: C.muted,
                  fontFamily: "'DM Mono'",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginTop: 3,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DAKESH authority note */}
      <div
        style={{
          marginTop: 18,
          paddingTop: 16,
          borderTop: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono'",
            fontSize: 10,
            color: C.muted,
            letterSpacing: "0.08em",
          }}
        >
          👑 Managed by{" "}
          <strong style={{ color: C.gold }}>DAKESH KASHYAP</strong> · Founder &
          CEO · All rankings reflect real-time global positions
        </span>
      </div>
    </div>
  );
}

export default function Leaderboard() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(1);
  const [jumpValue, setJumpValue] = useState<number | "">("");
  const [viewMode, setViewMode] = useState<ViewMode>("all");

  const baseList = viewMode === "network" ? MY_NETWORK_AFFILIATES : AFFILIATES;

  const filtered = useMemo<Affiliate[]>(() => {
    const q = search.trim().toLowerCase();
    if (!q) return baseList;
    return baseList.filter(
      (a) =>
        a.name.toLowerCase().includes(q) || a.country.toLowerCase().includes(q),
    );
  }, [search, baseList]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageData = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const showPodium = viewMode === "all" && page === 1 && search.trim() === "";

  const totalEarnings = useMemo<number>(
    () => AFFILIATES.reduce((s, a) => s + a.earnings, 0),
    [],
  );
  const avgEarnings = Math.floor(totalEarnings / AFFILIATES.length);

  const handleJump = () => {
    if (jumpValue === "") return;
    const rank = Number(jumpValue);
    if (viewMode === "all") {
      if (rank < 1 || rank > filtered.length) return;
      setPage(Math.ceil(rank / PAGE_SIZE));
    } else {
      // In network mode, jump to the row whose global rank matches
      const idx = filtered.findIndex((a) => a.rank === rank);
      if (idx < 0) return;
      setPage(Math.ceil((idx + 1) / PAGE_SIZE));
    }
    setJumpValue("");
  };

  const handleModeSwitch = (mode: ViewMode) => {
    setViewMode(mode);
    setPage(1);
    setSearch("");
    setJumpValue("");
  };

  const tableHeaders =
    viewMode === "network"
      ? [
          "Global Rank #",
          "Badge",
          "Tier",
          "Name",
          "Country",
          "Earnings",
          "Refs",
          "Action",
        ]
      : ["#", "Badge", "Tier", "Name", "Country", "Earnings", "Refs", "Action"];

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "'Outfit',sans-serif",
        animation: "fadeUp 0.4s ease",
      }}
    >
      {/* ── PAGE HEADER ──────────────────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 36,
            fontWeight: 700,
            color: C.text,
            letterSpacing: "0.02em",
            marginBottom: 4,
          }}
        >
          {viewMode === "network"
            ? "My Affiliate Network"
            : "Global Affiliate Leaderboard"}
        </h1>
        <p
          style={{
            fontFamily: "'DM Mono'",
            fontSize: 11,
            color: C.muted,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {viewMode === "network"
            ? `${MY_NETWORK_AFFILIATES.length} Personal Affiliates · Global Ranks Shown`
            : "10,000 Ranked Affiliates · Live Rankings"}
        </p>
      </div>

      {/* ── VIEW MODE TOGGLE ──────────────────────────── */}
      <fieldset
        style={{
          display: "inline-flex",
          background: C.surf2,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: 4,
          marginBottom: 24,
          gap: 4,
        }}
        aria-label="Leaderboard view"
      >
        <legend style={{ display: "none" }}>Leaderboard view</legend>
        {(["all", "network"] as ViewMode[]).map((mode) => {
          const active = viewMode === mode;
          const labels: Record<ViewMode, string> = {
            all: "🌐 All Affiliates",
            network: "👑 My Network",
          };
          return (
            <button
              key={mode}
              type="button"
              data-ocid={`leaderboard.${mode}_tab`}
              onClick={() => handleModeSwitch(mode)}
              style={{
                padding: "9px 22px",
                borderRadius: 9,
                border: active
                  ? `1px solid ${C.borderGold}`
                  : "1px solid transparent",
                background: active
                  ? `linear-gradient(135deg,${C.gold}22,${C.goldD}11)`
                  : "transparent",
                color: active ? C.gold : C.muted,
                fontFamily: "'Outfit'",
                fontWeight: active ? 600 : 400,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                boxShadow: active ? `0 0 12px ${C.gold}18` : "none",
              }}
            >
              {labels[mode]}
            </button>
          );
        })}
      </fieldset>

      {/* ── SEARCH + CONTROLS ────────────────────────── */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 28,
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        <label
          htmlFor="search-input"
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
          }}
        >
          Search affiliates by name or country
        </label>
        <input
          id="search-input"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder={
            viewMode === "network"
              ? "Search your network..."
              : "Search by name or country..."
          }
          data-ocid="leaderboard.search_input"
          style={{
            flex: "1 1 260px",
            background: C.surf,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "11px 16px",
            color: C.text,
            fontSize: 14,
            fontFamily: "'Outfit'",
            minWidth: 200,
          }}
        />
        {/* Jump to rank */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <label
            htmlFor="jump-rank"
            style={{
              fontSize: 11,
              fontFamily: "'DM Mono'",
              color: C.muted,
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
            }}
          >
            {viewMode === "network" ? "Jump to Global Rank:" : "Jump to Rank:"}
          </label>
          <input
            id="jump-rank"
            type="number"
            min={1}
            max={10000}
            value={jumpValue}
            onChange={(e) =>
              setJumpValue(e.target.value === "" ? "" : Number(e.target.value))
            }
            onKeyDown={(e) => e.key === "Enter" && handleJump()}
            data-ocid="leaderboard.jump_input"
            style={{
              width: 90,
              background: C.surf,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: "11px 12px",
              color: C.text,
              fontSize: 14,
              fontFamily: "'DM Mono'",
            }}
          />
          <button
            type="button"
            className="btn-gold"
            onClick={handleJump}
            data-ocid="leaderboard.jump_button"
            style={{
              background: `linear-gradient(135deg,${C.gold},${C.goldD})`,
              border: "none",
              borderRadius: 8,
              padding: "11px 18px",
              color: "#000",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'Outfit'",
              transition: "all 0.2s",
            }}
          >
            Go
          </button>
        </div>
        {/* Results badge */}
        <div
          style={{
            background: `${C.gold}18`,
            border: `1px solid ${C.borderGold}`,
            borderRadius: 8,
            padding: "8px 14px",
            fontFamily: "'DM Mono'",
            fontSize: 11,
            color: C.gold,
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
          }}
        >
          {filtered.length.toLocaleString()} results
        </div>
      </div>

      {/* ── TOP 3 PODIUM (All mode only) ─────────────── */}
      {showPodium && (
        <div
          style={{
            background: C.surf,
            border: `1px solid ${C.border}`,
            borderRadius: 20,
            padding: "32px 24px 0",
            marginBottom: 28,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "60%",
              height: 1,
              background: `linear-gradient(90deg,transparent,${C.gold}66,transparent)`,
            }}
          />
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <span
              style={{
                fontFamily: "'DM Mono'",
                fontSize: 10,
                color: C.gold,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              🏆 Top Performers Podium
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <PodiumCard aff={AFFILIATES[1]} pos={2} />
            <PodiumCard aff={AFFILIATES[0]} pos={1} />
            <PodiumCard aff={AFFILIATES[2]} pos={3} />
          </div>
        </div>
      )}

      {/* ── NETWORK SUMMARY CARD (Network mode only) ── */}
      {viewMode === "network" && search.trim() === "" && page === 1 && (
        <NetworkSummaryCard affiliates={MY_NETWORK_AFFILIATES} />
      )}

      {/* ── TABLE ────────────────────────────────────── */}
      <div
        style={{
          background: C.surf,
          border: `1px solid ${viewMode === "network" ? C.borderGold : C.border}`,
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        {viewMode === "network" && (
          <div
            style={{
              padding: "10px 16px",
              background: `linear-gradient(135deg,${C.gold}12,${C.goldD}08)`,
              borderBottom: `1px solid ${C.borderGold}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono'",
                fontSize: 10,
                color: C.gold,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              👑 My Network · Global rank positions shown for all affiliates
            </span>
          </div>
        )}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
              minWidth: 700,
            }}
          >
            <thead>
              <tr
                style={{
                  background: C.surf2,
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {tableHeaders.map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "13px 14px",
                      textAlign:
                        h === "Earnings" ||
                        h === "Refs" ||
                        h === "#" ||
                        h === "Global Rank #"
                          ? "right"
                          : "left",
                      fontFamily: "'DM Mono'",
                      fontSize: 9,
                      fontWeight: 500,
                      color: h === "Global Rank #" ? C.gold : C.muted,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.map((aff, idx) => {
                const isTop3Global = aff.rank <= 3 && viewMode === "all";
                const isMyNetwork = viewMode === "network";
                const borderColor =
                  aff.rank === 1
                    ? C.gold
                    : aff.rank === 2
                      ? "rgba(192,192,200,0.8)"
                      : "#cd7f32";

                return (
                  <tr
                    key={aff.rank}
                    className={isMyNetwork ? "row-my-network" : "row-hover"}
                    data-ocid={`leaderboard.item.${idx + 1}`}
                    style={{
                      borderBottom: `1px solid ${C.border}`,
                      background: isMyNetwork
                        ? `${C.gold}0a`
                        : isTop3Global
                          ? `${borderColor}08`
                          : "transparent",
                      borderLeft: isMyNetwork
                        ? `3px solid ${C.gold}55`
                        : isTop3Global
                          ? `3px solid ${borderColor}`
                          : "3px solid transparent",
                      transition: "background 0.2s",
                    }}
                  >
                    {/* Rank column */}
                    <td
                      style={{
                        padding: "11px 14px",
                        textAlign: "right",
                        fontFamily: "'DM Mono'",
                        fontSize: isMyNetwork ? 13 : 12,
                        color: isMyNetwork
                          ? C.gold
                          : isTop3Global
                            ? borderColor
                            : C.muted,
                        fontWeight: isMyNetwork
                          ? 600
                          : isTop3Global
                            ? 700
                            : 400,
                      }}
                    >
                      {isMyNetwork ? (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <span style={{ color: C.gold, fontSize: 10 }}>⬡</span>
                          {aff.rank.toLocaleString()}
                        </span>
                      ) : (
                        aff.rank.toLocaleString()
                      )}
                    </td>
                    {/* Badge */}
                    <td style={{ padding: "11px 14px", fontSize: 16 }}>
                      {aff.badge}
                    </td>
                    {/* Tier */}
                    <td style={{ padding: "11px 14px" }}>
                      <TierPill tier={aff.tier} />
                    </td>
                    {/* Name */}
                    <td
                      style={{
                        padding: "11px 14px",
                        color: isMyNetwork ? C.text : C.text,
                        fontWeight: isMyNetwork
                          ? 500
                          : isTop3Global
                            ? 600
                            : 400,
                        maxWidth: 160,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {aff.name}
                    </td>
                    {/* Country */}
                    <td
                      style={{
                        padding: "11px 14px",
                        color: C.muted,
                        fontSize: 12,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {aff.country}
                    </td>
                    {/* Earnings */}
                    <td
                      style={{
                        padding: "11px 14px",
                        textAlign: "right",
                        fontFamily: "'DM Mono'",
                        fontSize: 13,
                        color: C.gold,
                        fontWeight: 500,
                      }}
                    >
                      {fmt(aff.earnings)}
                    </td>
                    {/* Refs */}
                    <td
                      style={{
                        padding: "11px 14px",
                        textAlign: "right",
                        fontFamily: "'DM Mono'",
                        fontSize: 12,
                        color: C.muted,
                      }}
                    >
                      {aff.refs.toLocaleString()}
                    </td>
                    {/* Action */}
                    <td style={{ padding: "11px 14px" }}>
                      <button
                        type="button"
                        data-ocid={`leaderboard.view_button.${idx + 1}`}
                        title={`View ${aff.name}`}
                        aria-label={`View ${aff.name}`}
                        style={{
                          background: "transparent",
                          border: `1px solid ${isMyNetwork ? C.borderGold : C.border}`,
                          borderRadius: 6,
                          padding: "4px 10px",
                          color: isMyNetwork ? `${C.gold}99` : C.muted,
                          fontSize: 13,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          fontFamily: "'Outfit'",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.borderColor = `${C.gold}66`;
                          (e.currentTarget as HTMLButtonElement).style.color =
                            C.gold;
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.borderColor = isMyNetwork
                            ? C.borderGold
                            : C.border;
                          (e.currentTarget as HTMLButtonElement).style.color =
                            isMyNetwork ? `${C.gold}99` : C.muted;
                        }}
                      >
                        👁
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── PAGINATION ───────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 28,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <button
          type="button"
          className="btn-gold"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={safePage <= 1}
          data-ocid="leaderboard.pagination_prev"
          style={{
            background:
              safePage <= 1
                ? C.surf2
                : `linear-gradient(135deg,${C.gold},${C.goldD})`,
            border: `1px solid ${safePage <= 1 ? C.border : "transparent"}`,
            borderRadius: 8,
            padding: "10px 20px",
            color: safePage <= 1 ? C.muted2 : "#000",
            fontWeight: 700,
            fontSize: 13,
            cursor: safePage <= 1 ? "not-allowed" : "pointer",
            fontFamily: "'Outfit'",
            transition: "all 0.2s",
            opacity: safePage <= 1 ? 0.5 : 1,
          }}
        >
          ← Prev
        </button>
        <span
          style={{
            fontFamily: "'DM Mono'",
            fontSize: 12,
            color: C.muted,
            letterSpacing: "0.06em",
          }}
        >
          Page <strong style={{ color: C.gold }}>{safePage}</strong> of{" "}
          <strong style={{ color: C.text }}>{totalPages}</strong>
        </span>
        <button
          type="button"
          className="btn-gold"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={safePage >= totalPages}
          data-ocid="leaderboard.pagination_next"
          style={{
            background:
              safePage >= totalPages
                ? C.surf2
                : `linear-gradient(135deg,${C.gold},${C.goldD})`,
            border: `1px solid ${safePage >= totalPages ? C.border : "transparent"}`,
            borderRadius: 8,
            padding: "10px 20px",
            color: safePage >= totalPages ? C.muted2 : "#000",
            fontWeight: 700,
            fontSize: 13,
            cursor: safePage >= totalPages ? "not-allowed" : "pointer",
            fontFamily: "'Outfit'",
            transition: "all 0.2s",
            opacity: safePage >= totalPages ? 0.5 : 1,
          }}
        >
          Next →
        </button>
      </div>

      {/* ── STATS FOOTER ─────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
          marginBottom: 12,
        }}
      >
        {(viewMode === "all"
          ? [
              {
                label: "Total Affiliates",
                value: AFFILIATES.length.toLocaleString(),
                icon: "👥",
              },
              {
                label: "Combined Earnings",
                value: fmt(totalEarnings),
                icon: "💰",
              },
              {
                label: "Average Earnings",
                value: fmt(avgEarnings),
                icon: "📊",
              },
            ]
          : [
              {
                label: "My Network Size",
                value: MY_NETWORK_AFFILIATES.length.toString(),
                icon: "🌐",
              },
              {
                label: "Network Earnings",
                value: fmt(
                  MY_NETWORK_AFFILIATES.reduce((s, a) => s + a.earnings, 0),
                ),
                icon: "💰",
              },
              {
                label: "Top Rank",
                value: `#${MY_NETWORK_AFFILIATES[0]?.rank ?? "-"}`,
                icon: "🏆",
              },
            ]
        ).map((stat) => (
          <div
            key={stat.label}
            className="stat-card"
            style={{
              background: C.surf,
              border: `1px solid ${viewMode === "network" ? C.borderGold : C.border}`,
              borderRadius: 14,
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              transition: "transform 0.2s",
            }}
          >
            <div style={{ fontSize: 26 }}>{stat.icon}</div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Mono'",
                  fontSize: 18,
                  fontWeight: 500,
                  color: C.gold,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.muted,
                  fontFamily: "'DM Mono'",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Network mode: show note about global rank integrity */}
      {viewMode === "network" && (
        <div
          style={{
            marginTop: 8,
            padding: "10px 16px",
            background: `${C.gold}08`,
            border: `1px solid ${C.borderGold}`,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono'",
              fontSize: 10,
              color: `${C.gold}bb`,
              letterSpacing: "0.08em",
            }}
          >
            ⬡ All <strong style={{ color: C.gold }}>Global Rank #</strong>{" "}
            values reflect actual positions among all 10,000 affiliates — not
            filtered list order.
          </span>
        </div>
      )}
    </div>
  );
}
