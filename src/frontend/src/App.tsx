import { Suspense, lazy, useEffect, useState } from "react";
import { C, GS, NAV } from "./data";
import type { NavItem } from "./types";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const ZenAI = lazy(() => import("./pages/ZenAI"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NetworkDashboard = lazy(() => import("./pages/NetworkDashboard"));

/* ── PAGE VIEWS ─────────────────────────────────────────── */
type View = "agegate" | "main";
type PageId =
  | "dashboard"
  | "products"
  | "affiliates"
  | "ai"
  | "admin"
  | "privacy"
  | "network";

/* ══════════════════════════════════════════════════════════
   AGE GATE
══════════════════════════════════════════════════════════ */
function AgeGate({ onPass }: { onPass: () => void }) {
  const [dob, setDob] = useState("");
  const [err, setErr] = useState("");
  const [checking, setChecking] = useState(false);

  const check = () => {
    if (!dob) {
      setErr("Please enter your date of birth.");
      return;
    }
    const age =
      (Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 3600 * 1000);
    if (age < 18) {
      setErr(
        "Access denied. You must be 18 years or older to use ZEN Digital.",
      );
      return;
    }
    setChecking(true);
    setTimeout(() => onPass(), 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Outfit',sans-serif",
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{GS}</style>
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          background: `radial-gradient(circle,${C.gold}11 0%,transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 440,
          width: "100%",
          textAlign: "center",
          animation: "fadeUp 0.6s ease",
        }}
      >
        <div
          style={{
            fontSize: 52,
            marginBottom: 8,
            animation: "float 3s ease-in-out infinite",
          }}
        >
          ⚡
        </div>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 44,
            fontWeight: 700,
            color: C.gold,
            letterSpacing: "0.02em",
            marginBottom: 4,
          }}
        >
          ZEN Digital
        </h1>
        <p
          style={{
            color: C.muted,
            fontSize: 13,
            marginBottom: 32,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "'DM Mono'",
          }}
        >
          Premium Affiliate Marketing Platform
        </p>
        <div
          style={{
            background: C.surf,
            border: `1px solid ${C.borderGold}`,
            borderRadius: 24,
            padding: 36,
            boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 60px ${C.gold}11`,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: `linear-gradient(90deg,transparent,${C.gold}88,transparent)`,
              borderRadius: "24px 24px 0 0",
            }}
          />
          <div style={{ fontSize: 44, marginBottom: 14 }}>🔞</div>
          <h2
            style={{
              fontSize: 21,
              fontWeight: 700,
              color: C.text,
              marginBottom: 10,
            }}
          >
            Age Verification Required
          </h2>
          <p
            style={{
              color: C.muted,
              fontSize: 13,
              marginBottom: 24,
              lineHeight: 1.7,
            }}
          >
            This platform is exclusively for adults aged{" "}
            <strong style={{ color: C.gold }}>18+</strong>. Please verify your
            date of birth to gain access.
          </p>
          <div style={{ textAlign: "left", marginBottom: 16 }}>
            <label
              htmlFor="agegate-dob"
              style={{
                display: "block",
                fontSize: 10,
                color: C.muted,
                marginBottom: 6,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: "'DM Mono'",
              }}
            >
              Date of Birth
            </label>
            <input
              id="agegate-dob"
              type="date"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
                setErr("");
              }}
              data-ocid="agegate.dob_input"
              style={{
                width: "100%",
                background: C.surf2,
                border: `1px solid ${err ? C.red : C.border}`,
                borderRadius: 10,
                padding: "13px 16px",
                color: C.text,
                fontSize: 15,
                transition: "border-color 0.2s",
                fontFamily: "'Outfit'",
              }}
            />
          </div>
          {err && (
            <div
              style={{
                background: `${C.red}18`,
                border: `1px solid ${C.red}55`,
                borderRadius: 8,
                padding: "10px 14px",
                color: C.red,
                fontSize: 13,
                marginBottom: 14,
                textAlign: "left",
              }}
            >
              {err}
            </div>
          )}
          <button
            type="button"
            className="btn-gold"
            onClick={check}
            disabled={checking}
            data-ocid="agegate.submit_button"
            style={{
              width: "100%",
              background: `linear-gradient(135deg,${C.gold},${C.goldD})`,
              border: "none",
              borderRadius: 12,
              padding: "15px",
              color: "#000",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: "'Outfit'",
              letterSpacing: "0.04em",
              transition: "all 0.2s",
              marginTop: 4,
            }}
          >
            {checking ? "Verifying..." : "✔ Confirm Age & Enter Platform"}
          </button>
          <p
            style={{
              color: C.muted2,
              fontSize: 11,
              marginTop: 16,
              lineHeight: 1.6,
            }}
          >
            By entering, you agree to our Terms of Service and Privacy Policy.
            ZEN Digital collects age data solely for verification purposes.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════════ */
function Sidebar({
  page,
  setPage,
}: { page: PageId; setPage: (p: PageId) => void }) {
  return (
    <div
      style={{
        width: 240,
        background: C.surf,
        borderRight: `1px solid ${C.border}`,
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 1,
          background: `linear-gradient(180deg,${C.gold}44,transparent)`,
          height: "100%",
        }}
      />
      {/* Logo */}
      <div
        style={{ padding: "24px 20px", borderBottom: `1px solid ${C.border}` }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              background: `linear-gradient(135deg,${C.gold},${C.goldD})`,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              boxShadow: `0 0 20px ${C.gold}44`,
            }}
          >
            ⚡
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 20,
                fontWeight: 700,
                color: C.gold,
                letterSpacing: "0.02em",
              }}
            >
              ZEN Digital
            </div>
            <div
              style={{
                fontFamily: "'DM Mono'",
                fontSize: 9,
                color: C.muted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              DAKESH KASHYAP | Founder
            </div>
          </div>
        </div>
      </div>
      {/* Founder badge */}
      <div
        style={{
          margin: "14px 16px 0",
          background: `linear-gradient(135deg,${C.gold}22,${C.gold}08)`,
          border: `1px solid ${C.gold}44`,
          borderRadius: 10,
          padding: "10px 14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>👑</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold }}>
              Founder & CEO
            </div>
            <div style={{ fontSize: 10, color: C.text, fontWeight: 600 }}>
              DAKESH KASHYAP
            </div>
            <div
              style={{
                fontSize: 9,
                color: C.muted,
                fontFamily: "'DM Mono'",
                letterSpacing: "0.05em",
              }}
            >
              FULL AUTHORITY
            </div>
          </div>
        </div>
      </div>
      {/* Nav */}
      <nav style={{ flex: 1, padding: "14px 10px", overflow: "auto" }}>
        {NAV.map((n: NavItem) => (
          <button
            key={n.id}
            type="button"
            className="nav-item"
            onClick={() => setPage(n.id as PageId)}
            data-ocid={`nav.${n.id}_link`}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 14px",
              borderRadius: 10,
              cursor: "pointer",
              marginBottom: 2,
              transition: "all 0.2s",
              background: page === n.id ? `${C.gold}18` : "transparent",
              color: page === n.id ? C.gold : C.muted,
              fontWeight: page === n.id ? 600 : 400,
              fontSize: 14,
              position: "relative",
              border: "none",
              textAlign: "left",
              fontFamily: "'Outfit',sans-serif",
            }}
          >
            {page === n.id && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 3,
                  height: 20,
                  background: C.gold,
                  borderRadius: 2,
                }}
              />
            )}
            <span
              className="nav-icon"
              style={{
                fontSize: 16,
                transition: "transform 0.2s",
                display: "inline-block",
              }}
            >
              {n.icon}
            </span>
            {n.label}
          </button>
        ))}
      </nav>
      {/* Status badge */}
      <div style={{ padding: "16px", borderTop: `1px solid ${C.border}` }}>
        <div
          style={{
            background: C.surf2,
            borderRadius: 10,
            padding: "10px 12px",
            fontSize: 11,
            color: C.muted,
          }}
        >
          <div
            style={{
              color: C.green,
              fontFamily: "'DM Mono'",
              fontSize: 9,
              letterSpacing: "0.1em",
              marginBottom: 2,
            }}
          >
            ● PLATFORM LIVE
          </div>
          <div>v2.4.1 · Enterprise Edition</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TOPBAR
══════════════════════════════════════════════════════════ */
function Topbar({ page }: { page: PageId }) {
  const labels: Record<PageId, string> = {
    dashboard: "Dashboard Overview",
    products: "Digital Products",
    affiliates: "Affiliate Leaderboard",
    network: "My Network Dashboard",
    ai: "ZEN AI Assistant",
    admin: "Founder Control Panel",
    privacy: "Privacy Policy",
  };
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        height: 62,
        background: C.surf,
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: C.text,
            fontFamily: "'Outfit'",
          }}
        >
          {labels[page]}
        </h2>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: "'DM Mono'" }}>
          ZEN Digital Platform · DAKESH KASHYAP | Founder Access
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 13,
              color: C.gold,
              fontFamily: "'DM Mono'",
              fontWeight: 500,
            }}
          >
            {time.toLocaleTimeString()}
          </div>
          <div
            style={{ fontSize: 10, color: C.muted, fontFamily: "'DM Mono'" }}
          >
            {time.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
        <div
          style={{
            width: 38,
            height: 38,
            background: `linear-gradient(135deg,${C.gold},${C.goldD})`,
            borderRadius: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 700,
            color: "#000",
            boxShadow: `0 0 16px ${C.gold}44`,
            cursor: "pointer",
          }}
        >
          D
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE PLACEHOLDER (replaced by page agents)
══════════════════════════════════════════════════════════ */
function PagePlaceholder({ id }: { id: PageId }) {
  const labels: Record<PageId, string> = {
    dashboard: "Dashboard",
    products: "Products",
    affiliates: "Leaderboard",
    network: "My Network",
    ai: "ZEN AI",
    admin: "Founder Panel",
    privacy: "Privacy Policy",
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 300,
        color: C.muted,
        fontFamily: "'DM Mono'",
        fontSize: 13,
        letterSpacing: "0.1em",
      }}
    >
      Loading {labels[id]}...
    </div>
  );
}

function PageRouter({ page }: { page: PageId }) {
  if (page === "dashboard") {
    return (
      <Suspense fallback={<PagePlaceholder id="dashboard" />}>
        <Dashboard />
      </Suspense>
    );
  }
  if (page === "products") {
    return (
      <Suspense fallback={<PagePlaceholder id="products" />}>
        <Products />
      </Suspense>
    );
  }
  if (page === "affiliates") {
    return (
      <Suspense fallback={<PagePlaceholder id="affiliates" />}>
        <Leaderboard />
      </Suspense>
    );
  }
  if (page === "network") {
    return (
      <Suspense fallback={<PagePlaceholder id="network" />}>
        <NetworkDashboard />
      </Suspense>
    );
  }
  if (page === "ai") {
    return (
      <Suspense fallback={<PagePlaceholder id="ai" />}>
        <ZenAI />
      </Suspense>
    );
  }
  if (page === "admin") {
    return (
      <Suspense fallback={<PagePlaceholder id="admin" />}>
        <AdminPanel />
      </Suspense>
    );
  }
  if (page === "privacy") {
    return (
      <Suspense fallback={<PagePlaceholder id="privacy" />}>
        <Privacy />
      </Suspense>
    );
  }
  return <PagePlaceholder id={page} />;
}

/* ══════════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════════ */
export default function App() {
  const [view, setView] = useState<View>("agegate");
  const [page, setPage] = useState<PageId>("dashboard");

  if (view === "agegate") {
    return <AgeGate onPass={() => setView("main")} />;
  }

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        fontFamily: "'Outfit',sans-serif",
        color: C.text,
        display: "flex",
      }}
    >
      <style>{GS}</style>
      <Sidebar page={page} setPage={setPage} />
      <div
        style={{
          flex: 1,
          marginLeft: 240,
          minHeight: "100vh",
          background: C.bg,
          display: "flex",
          flexDirection: "column",
          paddingBottom: 40,
        }}
      >
        <Topbar page={page} />
        <div style={{ flex: 1, padding: "0 32px 40px", overflowY: "auto" }}>
          <PageRouter page={page} />
        </div>
      </div>
    </div>
  );
}
