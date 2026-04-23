import { r as reactExports, j as jsxRuntimeExports, C } from "./index-CxGHjXju.js";
const SECTIONS = [
  {
    id: 1,
    title: "Introduction",
    body: "ZEN Digital is a premium affiliate marketing platform strictly for users aged 18 and over. This Privacy Policy governs how we collect, use, and protect your personal information. By using ZEN Digital, you agree to these terms. This policy complies with GDPR (EU), CCPA (California), and SOC2 standards."
  },
  {
    id: 2,
    title: "Information We Collect",
    body: "Personal identifiers (name, email, date of birth for age verification), financial information (payment details processed via PCI-compliant processors), device and usage data, IP addresses, cookie data and analytics, affiliate performance metrics and commission records."
  },
  {
    id: 3,
    title: "How We Use Your Information",
    body: "Process affiliate commissions and payouts, verify compliance with our 18+ age requirement, send transactional communications, provide platform analytics, improve platform features, prevent fraud and abuse, comply with legal obligations."
  },
  {
    id: 4,
    title: "Information Sharing",
    body: "We never sell personal data. We may share with: payment processors (PCI DSS compliant), legal authorities when required by law, service providers under strict data processing agreements. International transfers use Standard Contractual Clauses (SCCs)."
  },
  {
    id: 5,
    title: "Age Restriction & Compliance",
    body: "ZEN Digital is strictly for users 18+. We verify age at registration. Accounts found to belong to minors are immediately terminated and data deleted. Parents/guardians: contact legal@zendigital.com for concerns. This policy complies with COPPA, GDPR Article 8, and local age verification laws."
  },
  {
    id: 6,
    title: "Data Security",
    body: "AES-256 encryption at rest and in transit, SOC2 Type II certified infrastructure, regular third-party security audits, multi-factor authentication for all accounts, real-time threat monitoring, 72-hour breach notification per GDPR Article 33."
  },
  {
    id: 7,
    title: "Your Rights",
    body: "GDPR rights: access, rectification, erasure ('right to be forgotten'), portability, objection. CCPA rights: know, delete, opt-out of sale (we don't sell data). Submit requests to: privacy@zendigital.com. Response within 30 days."
  },
  {
    id: 8,
    title: "Cookies & Tracking",
    body: "We use: essential cookies (session management, security), analytics cookies (platform usage, performance), preference cookies (settings, language). You may opt out of non-essential cookies via platform settings. We do not use cross-site advertising trackers."
  },
  {
    id: 9,
    title: "International Data Transfers",
    body: "ZEN Digital operates globally. Data may be processed in: United States (primary servers), European Union (GDPR-compliant nodes), Singapore (APAC operations). All transfers governed by SCCs. Data retained for 7 years per financial regulation compliance."
  },
  {
    id: 10,
    title: "Contact & Legal",
    body: "Privacy Officer: privacy@zendigital.com\nLegal Team: legal@zendigital.com\nSupport: support@zendigital.com\nFounder Direct: founder@zendigital.com (DAKESH KASHYAP)\nZEN Digital LLC · 100 Enterprise Plaza, Suite 2400 · New York, NY 10001"
  }
];
const BADGES = [
  { label: "18+ REQUIRED", color: C.red },
  { label: "GDPR", color: C.blue },
  { label: "CCPA", color: C.blue },
  { label: "SOC2", color: C.green }
];
function SectionCard({
  section,
  expanded,
  onToggle
}) {
  const borderColor = expanded ? C.borderGold : C.border;
  const leftBorder = expanded ? C.gold : C.border;
  const shadowExpanded = "0 0 24px rgba(212,168,67,0.1), 0 4px 24px rgba(0,0,0,0.4)";
  const shadowCollapsed = "0 2px 12px rgba(0,0,0,0.3)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `privacy.section.${section.id}`,
      style: {
        background: C.surf,
        border: `1px solid ${borderColor}`,
        borderLeft: `3px solid ${leftBorder}`,
        borderRadius: 10,
        overflow: "hidden",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        boxShadow: expanded ? shadowExpanded : shadowCollapsed
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `privacy.toggle.${section.id}`,
            onClick: onToggle,
            style: {
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 20px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    fontWeight: 500,
                    color: C.gold,
                    minWidth: 28,
                    letterSpacing: "0.04em"
                  },
                  children: String(section.id).padStart(2, "0")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    flex: 1,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 18,
                    fontWeight: 600,
                    color: expanded ? C.goldL : C.text,
                    letterSpacing: "0.02em",
                    transition: "color 0.2s ease"
                  },
                  children: section.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    color: expanded ? C.gold : C.muted,
                    transition: "transform 0.25s ease, color 0.2s ease",
                    display: "inline-block",
                    transform: expanded ? "rotate(0deg)" : "rotate(-90deg)"
                  },
                  children: "▼"
                }
              )
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              padding: "0 20px 20px 62px",
              animation: "fadeUp 0.3s ease forwards"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: "100%",
                    height: 1,
                    background: `linear-gradient(to right, ${C.borderGold}, transparent)`,
                    marginBottom: 16
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    lineHeight: 1.75,
                    color: C.muted,
                    whiteSpace: "pre-line"
                  },
                  children: section.body
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Privacy() {
  const [expandedSection, setExpandedSection] = reactExports.useState(1);
  const toggle = (id) => setExpandedSection((prev) => prev === id ? null : id);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": "privacy.page",
      style: {
        minHeight: "100%",
        background: C.bg,
        padding: "32px 24px 64px",
        fontFamily: "'Outfit', sans-serif"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: 780, margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "privacy.header",
            style: {
              background: C.surf,
              border: `1px solid ${C.borderGold}`,
              borderRadius: 14,
              padding: "36px 36px 32px",
              marginBottom: 32,
              boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
              animation: "fadeUp 0.4s ease forwards"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    fontWeight: 500,
                    color: C.gold,
                    letterSpacing: "0.18em",
                    marginBottom: 12,
                    textTransform: "uppercase"
                  },
                  children: "PRIVACY POLICY"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h1",
                {
                  style: {
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 32,
                    fontWeight: 700,
                    color: C.text,
                    letterSpacing: "0.02em",
                    marginBottom: 10,
                    lineHeight: 1.2
                  },
                  children: [
                    "ZEN Digital —",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: C.gold }, children: "Premium Affiliate Marketing Platform" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: C.muted,
                    marginBottom: 22,
                    letterSpacing: "0.04em"
                  },
                  children: "Effective: January 1, 2025 · Last Updated: June 15, 2025 · Version 3.2"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": "privacy.badges",
                  style: { display: "flex", flexWrap: "wrap", gap: 8 },
                  children: BADGES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        color: b.color,
                        background: `${b.color}18`,
                        border: `1px solid ${b.color}44`,
                        borderRadius: 20,
                        padding: "4px 12px",
                        whiteSpace: "nowrap"
                      },
                      children: b.label
                    },
                    b.label
                  ))
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "privacy.sections",
            style: { display: "flex", flexDirection: "column", gap: 10 },
            children: SECTIONS.map((section, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  animation: `fadeUp 0.4s ease ${i * 0.04}s both`
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionCard,
                  {
                    section,
                    expanded: expandedSection === section.id,
                    onToggle: () => toggle(section.id)
                  }
                )
              },
              section.id
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              marginTop: 36,
              padding: "20px 24px",
              background: C.surf,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 14
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 20 }, children: "🔒" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  style: {
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 13,
                    color: C.muted,
                    lineHeight: 1.6
                  },
                  children: [
                    "This Privacy Policy is maintained by",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontFamily: "'DM Mono', monospace",
                          color: C.gold,
                          fontSize: 12
                        },
                        children: "DAKESH KASHYAP"
                      }
                    ),
                    ", Founder & CEO of ZEN Digital LLC. For immediate concerns, contact",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: C.text }, children: "founder@zendigital.com" }),
                    "."
                  ]
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
export {
  Privacy as default
};
