import { r as reactExports, j as jsxRuntimeExports, C, f as fmt, A as AFFILIATES } from "./index-CxGHjXju.js";
const MY_RANKS = /* @__PURE__ */ new Set([
  47,
  203,
  891,
  1204,
  2567,
  3001,
  4455,
  5200,
  6789,
  7123,
  8001,
  9234
]);
const MY_AFFILIATES = AFFILIATES.filter(
  (a) => MY_RANKS.has(a.rank)
);
const TIER_CONFIG = {
  Legendary: { color: "#ffd700", emoji: "👑", order: 1 },
  Diamond: { color: "#00d4ff", emoji: "💎", order: 2 },
  Platinum: { color: "#e5e4e2", emoji: "🔥", order: 3 },
  Gold: { color: "#d4a843", emoji: "⭐", order: 4 },
  Silver: { color: "#adb5bd", emoji: "🥈", order: 5 },
  Bronze: { color: "#cd7f32", emoji: "🥉", order: 6 }
};
function StatCard({
  label,
  value,
  sub,
  icon,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "stat-card",
      style: {
        background: C.surf,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "20px 24px",
        transition: "all 0.2s",
        position: "relative",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${accent ?? C.gold}88, transparent)`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 11,
                      color: C.muted,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily: "'DM Mono'",
                      marginBottom: 6
                    },
                    children: label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 26,
                      fontWeight: 700,
                      color: accent ?? C.gold,
                      fontFamily: "'Cormorant Garamond',serif",
                      letterSpacing: "0.01em"
                    },
                    children: value
                  }
                ),
                sub && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 12,
                      color: C.muted,
                      marginTop: 4,
                      fontFamily: "'DM Mono'"
                    },
                    children: sub
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: 28,
                    background: `${accent ?? C.gold}18`,
                    borderRadius: 12,
                    width: 52,
                    height: 52,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  },
                  children: icon
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function TierBar({ affiliates }) {
  const counts = reactExports.useMemo(() => {
    const map = {};
    for (const a of affiliates) map[a.tier] = (map[a.tier] ?? 0) + 1;
    return map;
  }, [affiliates]);
  const tiers = Object.entries(TIER_CONFIG).filter(([t]) => counts[t] > 0);
  const max = Math.max(...tiers.map(([t]) => counts[t] ?? 0));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: C.surf,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "24px",
        position: "relative",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${C.gold}88, transparent)`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontSize: 13,
              fontWeight: 600,
              color: C.text,
              marginBottom: 18,
              letterSpacing: "0.04em"
            },
            children: "Performance Tier Breakdown"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: tiers.map(([tier, cfg]) => {
          const count = counts[tier] ?? 0;
          const pct = max > 0 ? count / max * 100 : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": `network.tier_${tier.toLowerCase()}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 16 }, children: cfg.emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: { fontSize: 13, fontWeight: 600, color: cfg.color },
                        children: tier
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      style: {
                        fontFamily: "'DM Mono'",
                        fontSize: 12,
                        color: C.muted
                      },
                      children: [
                        count,
                        " affiliate",
                        count !== 1 ? "s" : ""
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  height: 6,
                  background: C.surf2,
                  borderRadius: 4,
                  overflow: "hidden"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      height: "100%",
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${cfg.color}cc, ${cfg.color})`,
                      borderRadius: 4,
                      transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
                      boxShadow: `0 0 8px ${cfg.color}66`
                    }
                  }
                )
              }
            )
          ] }, tier);
        }) })
      ]
    }
  );
}
function NetworkDashboard() {
  const [search, setSearch] = reactExports.useState("");
  const [sortKey, setSortKey] = reactExports.useState("rank");
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const topAffiliate = reactExports.useMemo(
    () => MY_AFFILIATES.reduce(
      (best, a) => a.earnings > best.earnings ? a : best,
      MY_AFFILIATES[0]
    ),
    []
  );
  const combinedEarnings = reactExports.useMemo(
    () => MY_AFFILIATES.reduce((s, a) => s + a.earnings, 0),
    []
  );
  const avgRank = reactExports.useMemo(
    () => Math.round(
      MY_AFFILIATES.reduce((s, a) => s + a.rank, 0) / MY_AFFILIATES.length
    ),
    []
  );
  const filtered = reactExports.useMemo(() => {
    const q = search.toLowerCase();
    let list = q ? MY_AFFILIATES.filter(
      (a) => a.name.toLowerCase().includes(q) || a.country.toLowerCase().includes(q) || a.tier.toLowerCase().includes(q)
    ) : [...MY_AFFILIATES];
    list.sort((a, b) => {
      var _a, _b;
      let cmp = 0;
      if (sortKey === "rank") cmp = a.rank - b.rank;
      else if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "country") cmp = a.country.localeCompare(b.country);
      else if (sortKey === "tier")
        cmp = (((_a = TIER_CONFIG[a.tier]) == null ? void 0 : _a.order) ?? 9) - (((_b = TIER_CONFIG[b.tier]) == null ? void 0 : _b.order) ?? 9);
      else if (sortKey === "earnings") cmp = a.earnings - b.earnings;
      else if (sortKey === "refs") cmp = a.refs - b.refs;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [search, sortKey, sortDir]);
  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };
  const maxEarnings = reactExports.useMemo(
    () => Math.max(...MY_AFFILIATES.map((a) => a.earnings)),
    []
  );
  const sortIndicator = (key) => {
    if (sortKey !== key)
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { opacity: 0.3, marginLeft: 4 }, children: "↕" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: C.gold, marginLeft: 4 }, children: sortDir === "asc" ? "↑" : "↓" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { paddingTop: 28, animation: "fadeUp 0.5s ease" },
      "data-ocid": "network.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 28 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 8
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      background: `linear-gradient(135deg, ${C.gold}22, ${C.gold}08)`,
                      border: `1px solid ${C.gold}44`,
                      borderRadius: 12,
                      width: 44,
                      height: 44,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      animation: "float 3s ease-in-out infinite"
                    },
                    children: "🌐"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      style: {
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 32,
                        fontWeight: 700,
                        color: C.text,
                        letterSpacing: "0.01em",
                        lineHeight: 1.1
                      },
                      children: "My Network Dashboard"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      style: {
                        fontSize: 13,
                        color: C.muted,
                        fontFamily: "'DM Mono'",
                        letterSpacing: "0.06em"
                      },
                      children: [
                        "Your personal affiliate network ·",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: C.gold }, children: "DAKESH KASHYAP" })
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                height: 1,
                background: `linear-gradient(90deg, ${C.gold}44, transparent)`,
                marginTop: 16
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 24
            },
            "data-ocid": "network.stats_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  label: "My Affiliates",
                  value: String(MY_AFFILIATES.length),
                  sub: "personally managed",
                  icon: "🌐",
                  accent: C.gold
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  label: "Combined Earnings",
                  value: fmt(combinedEarnings),
                  sub: "across all tiers",
                  icon: "💰",
                  accent: C.green
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  label: "Top Affiliate",
                  value: (topAffiliate == null ? void 0 : topAffiliate.name) ?? "—",
                  sub: `Rank #${topAffiliate == null ? void 0 : topAffiliate.rank} · ${fmt((topAffiliate == null ? void 0 : topAffiliate.earnings) ?? 0)}`,
                  icon: "🏆",
                  accent: C.cyan
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  label: "Average Global Rank",
                  value: `#${avgRank.toLocaleString()}`,
                  sub: "of 10,000 affiliates",
                  icon: "📈",
                  accent: C.purple
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: 24 }, "data-ocid": "network.tier_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TierBar, { affiliates: MY_AFFILIATES }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: C.surf,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              overflow: "hidden",
              position: "relative"
            },
            "data-ocid": "network.table",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${C.gold}88, transparent)`
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    padding: "18px 24px",
                    borderBottom: `1px solid ${C.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    flexWrap: "wrap"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 14, fontWeight: 600, color: C.text }, children: "Affiliate Roster" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          style: {
                            marginLeft: 10,
                            background: `${C.gold}22`,
                            border: `1px solid ${C.gold}44`,
                            borderRadius: 6,
                            padding: "2px 9px",
                            fontSize: 11,
                            color: C.gold,
                            fontFamily: "'DM Mono'"
                          },
                          children: [
                            filtered.length,
                            " / ",
                            MY_AFFILIATES.length
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            position: "absolute",
                            left: 12,
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: 14,
                            color: C.muted,
                            pointerEvents: "none"
                          },
                          children: "🔍"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          placeholder: "Search name, country, tier...",
                          value: search,
                          onChange: (e) => setSearch(e.target.value),
                          "data-ocid": "network.search_input",
                          style: {
                            background: C.surf2,
                            border: `1px solid ${search ? C.borderGold : C.border}`,
                            borderRadius: 10,
                            padding: "9px 14px 9px 36px",
                            color: C.text,
                            fontSize: 13,
                            width: 260,
                            fontFamily: "'Outfit',sans-serif",
                            transition: "border-color 0.2s"
                          }
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { background: C.surf2 }, children: [
                  [
                    "rank",
                    "name",
                    "country",
                    "tier",
                    "earnings",
                    "refs"
                  ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "th",
                    {
                      onClick: () => handleSort(col),
                      onKeyDown: (e) => e.key === "Enter" && handleSort(col),
                      "data-ocid": `network.sort_${col}`,
                      style: {
                        padding: "11px 16px",
                        textAlign: col === "earnings" || col === "refs" ? "right" : "left",
                        fontSize: 10,
                        fontFamily: "'DM Mono'",
                        color: sortKey === col ? C.gold : C.muted,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        userSelect: "none",
                        borderBottom: `1px solid ${C.border}`,
                        transition: "color 0.2s",
                        whiteSpace: "nowrap"
                      },
                      children: [
                        col === "rank" ? "Global Rank" : col === "refs" ? "Referrals" : col.charAt(0).toUpperCase() + col.slice(1),
                        sortIndicator(col)
                      ]
                    },
                    col
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        padding: "11px 16px",
                        textAlign: "right",
                        fontSize: 10,
                        fontFamily: "'DM Mono'",
                        color: C.muted,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        borderBottom: `1px solid ${C.border}`,
                        whiteSpace: "nowrap"
                      },
                      children: "Performance"
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "td",
                  {
                    colSpan: 7,
                    "data-ocid": "network.empty_state",
                    style: {
                      padding: "48px 24px",
                      textAlign: "center",
                      color: C.muted,
                      fontFamily: "'DM Mono'",
                      fontSize: 13
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 32, marginBottom: 12 }, children: "🔍" }),
                      "No affiliates match your search"
                    ]
                  }
                ) }) : filtered.map((aff, idx) => {
                  const tierCfg = TIER_CONFIG[aff.tier] ?? {
                    color: C.muted,
                    emoji: "·"
                  };
                  const barPct = maxEarnings > 0 ? aff.earnings / maxEarnings * 100 : 0;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "row-hover",
                      "data-ocid": `network.item.${idx + 1}`,
                      style: {
                        borderBottom: `1px solid ${C.border}`,
                        transition: "background 0.15s"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "td",
                          {
                            style: {
                              padding: "13px 16px",
                              fontFamily: "'DM Mono'",
                              fontSize: 13
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "span",
                                {
                                  style: {
                                    color: aff.rank <= 100 ? C.gold : C.text,
                                    fontWeight: aff.rank <= 100 ? 700 : 400
                                  },
                                  children: [
                                    "#",
                                    aff.rank.toLocaleString()
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: 6, fontSize: 14 }, children: aff.badge })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            style: {
                              padding: "13px 16px",
                              fontSize: 14,
                              fontWeight: 600,
                              color: C.text
                            },
                            children: aff.name
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            style: {
                              padding: "13px 16px",
                              fontSize: 13,
                              color: C.muted
                            },
                            children: aff.country
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "13px 16px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            style: {
                              background: `${tierCfg.color}18`,
                              border: `1px solid ${tierCfg.color}44`,
                              borderRadius: 6,
                              padding: "3px 10px",
                              fontSize: 11,
                              color: tierCfg.color,
                              fontWeight: 600,
                              fontFamily: "'DM Mono'",
                              letterSpacing: "0.04em",
                              whiteSpace: "nowrap"
                            },
                            children: [
                              tierCfg.emoji,
                              " ",
                              aff.tier
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            style: {
                              padding: "13px 16px",
                              textAlign: "right",
                              fontFamily: "'DM Mono'",
                              fontSize: 13,
                              color: C.green,
                              fontWeight: 600
                            },
                            children: fmt(aff.earnings)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            style: {
                              padding: "13px 16px",
                              textAlign: "right",
                              fontFamily: "'DM Mono'",
                              fontSize: 13,
                              color: C.cyan
                            },
                            children: aff.refs.toLocaleString()
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "13px 16px", minWidth: 120 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              justifyContent: "flex-end"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  style: {
                                    width: 80,
                                    height: 5,
                                    background: C.surf2,
                                    borderRadius: 4,
                                    overflow: "hidden"
                                  },
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "div",
                                    {
                                      style: {
                                        height: "100%",
                                        width: `${barPct}%`,
                                        background: `linear-gradient(90deg, ${C.gold}aa, ${C.gold})`,
                                        borderRadius: 4,
                                        transition: "width 0.6s ease",
                                        boxShadow: `0 0 6px ${C.gold}55`
                                      }
                                    }
                                  )
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "span",
                                {
                                  style: {
                                    fontSize: 10,
                                    color: C.muted,
                                    fontFamily: "'DM Mono'",
                                    minWidth: 32,
                                    textAlign: "right"
                                  },
                                  children: [
                                    barPct.toFixed(0),
                                    "%"
                                  ]
                                }
                              )
                            ]
                          }
                        ) })
                      ]
                    },
                    aff.rank
                  );
                }) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    padding: "12px 24px",
                    borderTop: `1px solid ${C.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 8
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: { fontSize: 11, color: C.muted, fontFamily: "'DM Mono'" },
                        children: [
                          "Showing ",
                          filtered.length,
                          " of ",
                          MY_AFFILIATES.length,
                          " personal affiliates"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: 11,
                          color: C.muted2,
                          fontFamily: "'DM Mono'",
                          letterSpacing: "0.08em"
                        },
                        children: "DAKESH KASHYAP · NETWORK VIEW · ZEN Digital"
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  NetworkDashboard as default
};
