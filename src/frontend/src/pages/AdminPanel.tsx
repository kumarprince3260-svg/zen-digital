import { useState } from "react";
import { C, PACKAGES } from "../data";

type Tab =
  | "overview"
  | "affiliates"
  | "packages"
  | "payouts"
  | "settings"
  | "security";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "affiliates", label: "Manage Affiliates" },
  { id: "packages", label: "Edit Packages" },
  { id: "payouts", label: "Payouts" },
  { id: "settings", label: "Platform Settings" },
  { id: "security", label: "Security" },
];

const STAT_CARDS = [
  { label: "Total Affiliates", value: "48,291", icon: "👥", color: C.cyan },
  { label: "Pending Approvals", value: "247", icon: "⏳", color: C.gold },
  { label: "Pending Payouts", value: "$892,451", icon: "💰", color: C.green },
  { label: "Support Tickets", value: "18", icon: "🎫", color: C.blue },
  { label: "Suspended Accounts", value: "3", icon: "🚫", color: C.red },
  { label: "VIP Members", value: "1,247", icon: "💎", color: C.purple },
];

const QUICK_ACTIONS = [
  { icon: "✅", label: "Approve All Pending", id: "approve-all" },
  { icon: "💸", label: "Process Payouts", id: "process-payouts" },
  { icon: "📣", label: "Send Platform Update", id: "send-update" },
  { icon: "📤", label: "Export Data", id: "export-data" },
  { icon: "📋", label: "Audit Log", id: "audit-log" },
  { icon: "🔄", label: "Reset Analytics", id: "reset-analytics" },
  { icon: "💾", label: "Backup Database", id: "backup-db" },
  {
    icon: "🔒",
    label: "Emergency Lockdown",
    id: "emergency-lockdown",
    danger: true,
  },
];

const AFFILIATE_ACTIONS = [
  { icon: "👁️", label: "View All Affiliates", id: "view-all" },
  { icon: "➕", label: "Add New Affiliate", id: "add-new" },
  { icon: "📥", label: "Bulk Import", id: "bulk-import" },
  { icon: "📧", label: "Send Mass Email", id: "mass-email" },
  { icon: "🏅", label: "Tier Management", id: "tier-mgmt" },
  { icon: "💹", label: "Commission Rules", id: "commission-rules" },
  { icon: "🔍", label: "Fraud Detection", id: "fraud-detection" },
  { icon: "🚫", label: "Ban/Suspend", id: "ban-suspend", danger: true },
];

const MOCK_PAYOUTS = [
  { name: "James Smith", amount: "$12,450", status: "Pending" },
  { name: "Sophia Garcia", amount: "$8,900", status: "Processing" },
  { name: "Liam Johnson", amount: "$6,200", status: "Pending" },
  { name: "Emma Williams", amount: "$4,750", status: "Approved" },
  { name: "Noah Brown", amount: "$3,100", status: "Pending" },
];

const PLATFORM_SETTINGS = [
  { label: "Platform Name", value: "ZEN Digital" },
  { label: "Commission Rate", value: "18%" },
  { label: "Minimum Payout", value: "$100" },
  { label: "Payment Cycle", value: "Monthly" },
  { label: "Max Affiliates", value: "100,000" },
  { label: "Session Timeout", value: "24 hours" },
  { label: "API Rate Limit", value: "1,000 req/min" },
  { label: "Support Email", value: "support@zendigital.com" },
];

const SECURITY_ITEMS = [
  {
    label: "SSL Certificate",
    value: "Valid until 2026-12-31",
    color: C.green,
    icon: "🔐",
  },
  {
    label: "2FA Status",
    value: "Enabled for all admin accounts",
    color: C.green,
    icon: "🛡️",
  },
  {
    label: "Last Security Audit",
    value: "2025-03-15",
    color: C.gold,
    icon: "🔍",
  },
  {
    label: "Failed Login Attempts",
    value: "0 in last 24h",
    color: C.green,
    icon: "🚫",
  },
  { label: "DDoS Protection", value: "Active", color: C.green, icon: "⚡" },
  { label: "Data Encryption", value: "AES-256", color: C.green, icon: "🔒" },
];

const payoutStatusColor: Record<string, string> = {
  Pending: C.gold,
  Processing: C.cyan,
  Approved: C.green,
};

/* ── SUB-COMPONENTS ──────────────────────────────────────── */

function ActionGrid({
  actions,
  prefix,
}: { actions: typeof QUICK_ACTIONS; prefix: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 12,
      }}
    >
      {actions.map((a, i) => (
        <button
          key={a.id}
          type="button"
          className="btn-gold"
          data-ocid={`${prefix}.${a.id}_button.${i + 1}`}
          style={{
            background: (a as { danger?: boolean }).danger
              ? `${C.red}18`
              : `${C.gold}12`,
            border: `1px solid ${(a as { danger?: boolean }).danger ? `${C.red}44` : `${C.gold}33`}`,
            borderRadius: 12,
            padding: "14px 10px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
            color: (a as { danger?: boolean }).danger ? C.red : C.text,
          }}
        >
          <span style={{ fontSize: 22 }}>{a.icon}</span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              fontFamily: "'Outfit',sans-serif",
              textAlign: "center",
              lineHeight: 1.3,
              color: (a as { danger?: boolean }).danger ? C.red : C.text,
            }}
          >
            {a.label}
          </span>
        </button>
      ))}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: 22,
        fontWeight: 700,
        color: C.gold,
        marginBottom: 16,
        letterSpacing: "0.02em",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {children}
    </div>
  );
}

/* ── TABS ────────────────────────────────────────────────── */

function OverviewTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Stat cards */}
      <div>
        <SectionHeading>📊 Platform Overview</SectionHeading>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {STAT_CARDS.map((s, i) => (
            <div
              key={s.label}
              className="stat-card"
              data-ocid={`overview.stat_card.${i + 1}`}
              style={{
                background: C.surf2,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: 20,
                display: "flex",
                alignItems: "center",
                gap: 16,
                transition: "transform 0.2s",
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
                  background: `linear-gradient(90deg,${s.color}88,transparent)`,
                }}
              />
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: `${s.color}18`,
                  border: `1px solid ${s.color}44`,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  flexShrink: 0,
                }}
              >
                {s.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: s.color,
                    fontFamily: "'Outfit',sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <SectionHeading>⚡ Quick Actions</SectionHeading>
        <ActionGrid actions={QUICK_ACTIONS} prefix="overview" />
      </div>
    </div>
  );
}

function AffiliatesTab() {
  return (
    <div>
      <SectionHeading>👥 Affiliate Management</SectionHeading>
      <ActionGrid actions={AFFILIATE_ACTIONS} prefix="affiliates" />
    </div>
  );
}

function PackagesTab() {
  return (
    <div>
      <SectionHeading>📦 Edit Packages</SectionHeading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}
      >
        {PACKAGES.map((pkg, i) => (
          <div
            key={pkg.id}
            data-ocid={`packages.package_card.${i + 1}`}
            style={{
              background: C.surf2,
              border: `1px solid ${pkg.color}33`,
              borderRadius: 16,
              padding: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  background: `${pkg.color}18`,
                  border: `1px solid ${pkg.color}44`,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                {pkg.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: C.text,
                    fontFamily: "'Outfit',sans-serif",
                  }}
                >
                  {pkg.name}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: pkg.color,
                    fontFamily: "'DM Mono'",
                  }}
                >
                  ${pkg.price}/mo
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn-gold"
              data-ocid={`packages.edit_button.${i + 1}`}
              style={{
                background: `${C.gold}18`,
                border: `1px solid ${C.gold}44`,
                borderRadius: 10,
                padding: "9px 18px",
                color: C.gold,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              ✏️ Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PayoutsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <SectionHeading>💸 Payout Management</SectionHeading>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 16,
        }}
      >
        {[
          { label: "Total Pending", value: "$892,451", color: C.gold },
          { label: "Processed Today", value: "$124,500", color: C.green },
          { label: "This Month", value: "$2.1M", color: C.cyan },
        ].map((s, i) => (
          <div
            key={s.label}
            data-ocid={`payouts.stat.${i + 1}`}
            style={{
              background: C.surf2,
              border: `1px solid ${s.color}33`,
              borderRadius: 14,
              padding: "18px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: s.color,
                fontFamily: "'DM Mono'",
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Payout list */}
      <div
        style={{
          background: C.surf2,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 20px",
            borderBottom: `1px solid ${C.border}`,
            fontSize: 13,
            color: C.muted,
            fontFamily: "'DM Mono'",
            letterSpacing: "0.06em",
            display: "grid",
            gridTemplateColumns: "1fr 120px 100px",
            gap: 16,
          }}
        >
          <span>AFFILIATE</span>
          <span>AMOUNT</span>
          <span>STATUS</span>
        </div>
        {MOCK_PAYOUTS.map((p, i) => (
          <div
            key={p.name}
            className="row-hover"
            data-ocid={`payouts.payout_row.${i + 1}`}
            style={{
              padding: "14px 20px",
              borderBottom:
                i < MOCK_PAYOUTS.length - 1 ? `1px solid ${C.border}` : "none",
              display: "grid",
              gridTemplateColumns: "1fr 120px 100px",
              gap: 16,
              alignItems: "center",
              transition: "background 0.15s",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>
              {p.name}
            </span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: C.green,
                fontFamily: "'DM Mono'",
              }}
            >
              {p.amount}
            </span>
            <span
              style={{
                display: "inline-block",
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'DM Mono'",
                background: `${payoutStatusColor[p.status]}22`,
                color: payoutStatusColor[p.status],
                border: `1px solid ${payoutStatusColor[p.status]}44`,
                letterSpacing: "0.04em",
              }}
            >
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div>
      <SectionHeading>⚙️ Platform Settings</SectionHeading>
      <div
        style={{
          background: C.surf2,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {PLATFORM_SETTINGS.map((s, i) => (
          <div
            key={s.label}
            className="row-hover"
            data-ocid={`settings.setting_row.${i + 1}`}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr auto",
              gap: 16,
              alignItems: "center",
              padding: "16px 22px",
              borderBottom:
                i < PLATFORM_SETTINGS.length - 1
                  ? `1px solid ${C.border}`
                  : "none",
              transition: "background 0.15s",
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: C.muted,
                fontFamily: "'DM Mono'",
                letterSpacing: "0.04em",
              }}
            >
              {s.label}
            </span>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>
              {s.value}
            </span>
            <button
              type="button"
              className="btn-gold"
              data-ocid={`settings.edit_button.${i + 1}`}
              style={{
                background: `${C.gold}14`,
                border: `1px solid ${C.gold}33`,
                borderRadius: 8,
                padding: "6px 14px",
                color: C.gold,
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
                transition: "all 0.2s",
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div>
      <SectionHeading>🔐 Security Status</SectionHeading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 14,
        }}
      >
        {SECURITY_ITEMS.map((s, i) => (
          <div
            key={s.label}
            data-ocid={`security.status_card.${i + 1}`}
            style={{
              background: C.surf2,
              border: `1px solid ${s.color}33`,
              borderRadius: 14,
              padding: 18,
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: 3,
                background: s.color,
                borderRadius: "14px 0 0 14px",
              }}
            />
            <div
              style={{
                width: 40,
                height: 40,
                background: `${s.color}18`,
                border: `1px solid ${s.color}44`,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              {s.icon}
            </div>
            <div>
              <div
                style={{
                  color: C.muted,
                  fontFamily: "'DM Mono'",
                  letterSpacing: "0.05em",
                  marginBottom: 4,
                  textTransform: "uppercase",
                  fontSize: 10,
                }}
              >
                {s.label}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: s.color }}>
                {s.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ADMIN PANEL PAGE
══════════════════════════════════════════════════════════ */
export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        animation: "fadeUp 0.45s ease",
        fontFamily: "'Outfit',sans-serif",
      }}
      data-ocid="admin.page"
    >
      {/* ── FOUNDER BANNER ── */}
      <div
        data-ocid="admin.founder_banner"
        style={{
          background: `linear-gradient(135deg,${C.gold}22 0%,${C.goldD}18 50%,${C.gold}14 100%)`,
          border: `1px solid ${C.gold}55`,
          borderRadius: 20,
          padding: "28px 32px",
          position: "relative",
          overflow: "hidden",
          animation: "glow 4s ease-in-out infinite",
        }}
      >
        {/* Decorative shimmer line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg,transparent,${C.gold},${C.goldL},${C.gold},transparent)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-40%",
            right: "-5%",
            width: 280,
            height: 280,
            background: `radial-gradient(circle,${C.gold}0d 0%,transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              fontSize: 48,
              animation: "float 3s ease-in-out infinite",
              lineHeight: 1,
            }}
          >
            👑
          </div>
          <div>
            <div
              style={{
                fontFamily: "'DM Mono'",
                fontSize: 11,
                color: C.goldL,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              FOUNDER & CEO CONTROL PANEL
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 36,
                fontWeight: 700,
                color: C.gold,
                letterSpacing: "0.03em",
                lineHeight: 1.1,
              }}
            >
              DAKESH KASHYAP
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 8,
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Full Platform Authority", color: C.gold },
                { label: "All Systems Operational", color: C.green },
                { label: "ROOT ACCESS ENABLED", color: C.red },
              ].map((b) => (
                <span
                  key={b.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontFamily: "'DM Mono'",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    color: b.color,
                    padding: "3px 10px",
                    background: `${b.color}18`,
                    border: `1px solid ${b.color}44`,
                    borderRadius: 20,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 6,
                      height: 6,
                      background: b.color,
                      borderRadius: "50%",
                    }}
                  />
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TAB NAV ── */}
      <div
        data-ocid="admin.tab_nav"
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            data-ocid={`admin.${t.id}_tab`}
            style={{
              padding: "9px 20px",
              borderRadius: 30,
              border: `1px solid ${activeTab === t.id ? C.gold : C.border}`,
              background:
                activeTab === t.id
                  ? `linear-gradient(135deg,${C.gold},${C.goldD})`
                  : C.surf2,
              color: activeTab === t.id ? "#000" : C.muted,
              fontWeight: activeTab === t.id ? 700 : 400,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'Outfit',sans-serif",
              transition: "all 0.2s",
              letterSpacing: "0.02em",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB CONTENT ── */}
      <div
        style={{
          background: C.surf,
          border: `1px solid ${C.border}`,
          borderRadius: 20,
          padding: 28,
          animation: "fadeUp 0.3s ease",
        }}
        key={activeTab}
        data-ocid={`admin.${activeTab}_panel`}
      >
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "affiliates" && <AffiliatesTab />}
        {activeTab === "packages" && <PackagesTab />}
        {activeTab === "payouts" && <PayoutsTab />}
        {activeTab === "settings" && <SettingsTab />}
        {activeTab === "security" && <SecurityTab />}
      </div>
    </div>
  );
}
