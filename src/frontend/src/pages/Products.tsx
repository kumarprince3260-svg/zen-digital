import { useState } from "react";
import { C, PACKAGES } from "../data";
import type { Package } from "../types";

/* ── PACKAGE CONFIG OVERRIDES (matching requirements) ─────── */
const PKG_META: Record<
  number,
  { color: string; icon: string; badge: string | null }
> = {
  1: { color: "#00d4ff", icon: "⚡", badge: null },
  2: { color: "#d4a843", icon: "🚀", badge: "POPULAR" },
  3: { color: "#7c3aed", icon: "💼", badge: "BEST VALUE" },
  4: { color: "#22d67a", icon: "👑", badge: "ELITE" },
};

const PKG_FEATURES: Record<number, string[]> = {
  1: [
    "25 Affiliate Links",
    "Basic Dashboard",
    "Email Support",
    "Weekly Reports",
    "$500 Max Earnings/mo",
  ],
  2: [
    "Unlimited Affiliate Links",
    "Advanced Analytics",
    "Priority Support",
    "Daily Reports",
    "$5,000 Max Earnings/mo",
    "Custom Landing Pages",
    "API Access",
  ],
  3: [
    "Everything in Pro",
    "White-Label Solution",
    "Dedicated Account Manager",
    "Real-time Analytics",
    "$25,000 Max Earnings/mo",
    "Team Management (5 seats)",
    "Advanced API + Webhooks",
    "Custom Integrations",
  ],
  4: [
    "Everything in Business",
    "Unlimited Earnings",
    "VIP Support (24/7)",
    "Custom AI Integration",
    "Unlimited Team Seats",
    "Revenue Share Program",
    "Custom Contract",
    "Direct Founder Access",
  ],
};

const PKG_NAMES: Record<number, string> = {
  1: "ZEN Starter",
  2: "ZEN Pro",
  3: "ZEN Business",
  4: "ZEN Enterprise",
};

const PKG_PRICES: Record<number, number> = {
  1: 29,
  2: 79,
  3: 199,
  4: 499,
};

const PKG_TAGS: Record<number, string> = {
  1: "Entry Level",
  2: "Most Popular",
  3: "Best Value",
  4: "Elite",
};

/* ── PACKAGE CARD ──────────────────────────────────────────── */
function PackageCard({
  pkg,
  isUpgraded,
  onUpgrade,
}: {
  pkg: Package;
  isUpgraded: boolean;
  onUpgrade: () => void;
}) {
  const meta = PKG_META[pkg.id];
  const features = PKG_FEATURES[pkg.id];
  const name = PKG_NAMES[pkg.id];
  const price = PKG_PRICES[pkg.id];
  const tag = PKG_TAGS[pkg.id];

  return (
    <div
      className="pkg-card"
      data-ocid={`products.package_card.${pkg.id}`}
      style={{
        background: C.surf,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        cursor: "default",
      }}
    >
      {/* Top color bar */}
      <div
        style={{
          height: 4,
          background: `linear-gradient(90deg, ${meta.color}, ${meta.color}88)`,
        }}
      />

      {/* Badge */}
      {meta.badge && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: `linear-gradient(135deg, ${meta.color}33, ${meta.color}18)`,
            border: `1px solid ${meta.color}66`,
            borderRadius: 6,
            padding: "4px 10px",
            fontSize: 9,
            fontFamily: "'DM Mono'",
            fontWeight: 500,
            color: meta.color,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {meta.badge}
        </div>
      )}

      {/* Price badge top-right */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: `linear-gradient(135deg, ${meta.color}22, ${meta.color}0d)`,
          border: `1px solid ${meta.color}55`,
          borderRadius: 10,
          padding: "6px 12px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22,
            fontWeight: 700,
            color: meta.color,
            lineHeight: 1,
          }}
        >
          ${price}
        </div>
        <div
          style={{
            fontFamily: "'DM Mono'",
            fontSize: 9,
            color: C.muted,
            letterSpacing: "0.08em",
            marginTop: 2,
          }}
        >
          /mo
        </div>
      </div>

      {/* Card body */}
      <div
        style={{
          padding: "22px 22px 0 22px",
          paddingTop: meta.badge ? 48 : 28,
          flex: 1,
        }}
      >
        <div
          style={{
            fontSize: 36,
            marginBottom: 8,
            animation: "float 4s ease-in-out infinite",
            display: "inline-block",
          }}
        >
          {meta.icon}
        </div>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 26,
            fontWeight: 700,
            color: C.text,
            marginBottom: 4,
            lineHeight: 1.1,
          }}
        >
          {name}
        </h3>
        <div
          style={{
            fontFamily: "'DM Mono'",
            fontSize: 10,
            color: meta.color,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {tag}
        </div>

        {/* Features list */}
        <ul style={{ listStyle: "none", marginBottom: 22 }}>
          {features.map((f) => (
            <li
              key={f}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                marginBottom: 8,
                fontSize: 13,
                color: C.muted,
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              <span
                style={{
                  color: C.gold,
                  fontWeight: 700,
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Card footer buttons */}
      <div
        style={{
          padding: "0 22px 22px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <button
          type="button"
          className="btn-gold"
          data-ocid={`products.upgrade_button.${pkg.id}`}
          onClick={onUpgrade}
          style={{
            width: "100%",
            background: isUpgraded
              ? "linear-gradient(135deg, #22d67a, #16a05a)"
              : `linear-gradient(135deg, ${C.gold}, ${C.goldD})`,
            border: "none",
            borderRadius: 10,
            padding: "13px",
            color: "#000",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "0.04em",
            transition: "all 0.2s",
          }}
        >
          {isUpgraded
            ? "✓ Active Plan"
            : `Upgrade to ${name.replace("ZEN ", "")}`}
        </button>
        <button
          type="button"
          data-ocid={`products.edit_button.${pkg.id}`}
          style={{
            width: "100%",
            background: "transparent",
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "11px",
            color: C.muted,
            fontWeight: 500,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "'Outfit', sans-serif",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              `${C.gold}55`;
            (e.currentTarget as HTMLButtonElement).style.color = C.gold;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = C.border;
            (e.currentTarget as HTMLButtonElement).style.color = C.muted;
          }}
        >
          Edit Package
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PRODUCTS PAGE
══════════════════════════════════════════════════════════ */
export default function Products() {
  const [upgraded, setUpgraded] = useState<Record<number, boolean>>({});

  const handleUpgrade = (id: number) => {
    setUpgraded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        fontFamily: "'Outfit', sans-serif",
        animation: "fadeUp 0.5s ease",
      }}
    >
      {/* PAGE HEADER */}
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 42,
            fontWeight: 700,
            color: C.text,
            letterSpacing: "0.01em",
            lineHeight: 1.1,
            marginBottom: 6,
          }}
        >
          Platform Packages
        </h1>
        <p
          style={{
            fontFamily: "'DM Mono'",
            fontSize: 11,
            color: C.gold,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          DAKESH KASHYAP · Founder Authority · Modify Anytime
        </p>
      </div>

      {/* FOUNDER AUTHORITY BANNER */}
      <div
        data-ocid="products.founder_authority_banner"
        style={{
          background: `linear-gradient(135deg, ${C.gold}14, ${C.gold}07)`,
          border: `1px solid ${C.gold}44`,
          borderRadius: 14,
          padding: "18px 22px",
          marginBottom: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          boxShadow: `0 0 40px ${C.gold}11`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${C.gold}77, transparent)`,
          }}
        />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <span style={{ fontSize: 28, flexShrink: 0 }}>👑</span>
          <div>
            <div
              style={{
                fontFamily: "'DM Mono'",
                fontSize: 10,
                color: C.gold,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Founder Authority Active
            </div>
            <p
              style={{
                fontSize: 13,
                color: C.muted,
                lineHeight: 1.6,
                maxWidth: 560,
              }}
            >
              As{" "}
              <strong style={{ color: C.text, fontWeight: 700 }}>
                DAKESH KASHYAP
              </strong>
              , Founder &amp; CEO, you have full authority to modify, create, or
              remove any package at any time.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn-gold"
          data-ocid="products.edit_packages_button"
          style={{
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldD})`,
            border: "none",
            borderRadius: 10,
            padding: "11px 20px",
            color: "#000",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "0.04em",
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          ✎ Edit Packages
        </button>
      </div>

      {/* PACKAGE CARDS GRID */}
      <div
        data-ocid="products.packages_list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
          marginBottom: 32,
        }}
      >
        {PACKAGES.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            isUpgraded={!!upgraded[pkg.id]}
            onUpgrade={() => handleUpgrade(pkg.id)}
          />
        ))}
      </div>

      {/* CREATE NEW PACKAGE BUTTON */}
      <button
        type="button"
        data-ocid="products.create_package_button"
        style={{
          width: "100%",
          background: `linear-gradient(135deg, ${C.gold}22, ${C.gold}0d)`,
          border: `1.5px dashed ${C.gold}55`,
          borderRadius: 14,
          padding: "18px",
          color: C.gold,
          fontWeight: 700,
          fontSize: 15,
          cursor: "pointer",
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: "0.04em",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            `linear-gradient(135deg, ${C.gold}33, ${C.gold}18)`;
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            `${C.gold}99`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            `linear-gradient(135deg, ${C.gold}22, ${C.gold}0d)`;
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            `${C.gold}55`;
        }}
      >
        <span style={{ fontSize: 20, lineHeight: 1 }}>+</span>
        Create New Package
      </button>
    </div>
  );
}
