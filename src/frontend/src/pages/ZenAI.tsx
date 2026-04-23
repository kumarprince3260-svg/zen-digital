import { useActor } from "@caffeineai/core-infrastructure";
import { useRef, useState } from "react";
import { createActor } from "../backend";
import { C } from "../data";
import type { Message } from "../types";

/* ── TYPING INDICATOR ──────────────────────────────────── */
const typingStyle = `
  @keyframes dotPulse1{0%,80%,100%{opacity:0.2;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}
  @keyframes dotPulse2{0%,80%,100%{opacity:0.2;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}
  @keyframes dotPulse3{0%,80%,100%{opacity:0.2;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}
`;

function TypingIndicator() {
  const dots = [
    { id: "dot1", delay: "0s", anim: "dotPulse1" },
    { id: "dot2", delay: "0.16s", anim: "dotPulse2" },
    { id: "dot3", delay: "0.32s", anim: "dotPulse3" },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "14px 18px",
        background: C.surf2,
        borderRadius: "18px 18px 18px 4px",
        border: `1px solid ${C.border}`,
        width: "fit-content",
      }}
    >
      {dots.map((d) => (
        <div
          key={d.id}
          style={{
            width: 7,
            height: 7,
            background: C.gold,
            borderRadius: "50%",
            animation: `${d.anim} 1.2s ease-in-out ${d.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── SUGGESTION CHIPS ──────────────────────────────────── */
const SUGGESTIONS = [
  { id: "sug1", label: "📊 Analyze our current revenue performance" },
  { id: "sug2", label: "🏆 Who are our top performing affiliates this month?" },
  { id: "sug3", label: "💡 What strategies can boost affiliate recruitment?" },
  { id: "sug4", label: "🔒 What are our current security posture highlights?" },
  { id: "sug5", label: "📦 Which package has the best conversion rate?" },
];

/* ── INITIAL GREETING ──────────────────────────────────── */
const GREETING: Message = {
  role: "assistant",
  content:
    "Hello DAKESH KASHYAP 👑 I'm ZEN AI, your strategic platform intelligence. I have full visibility into your affiliate platform operations. How can I assist you today?",
};

/* ── STAMPED MESSAGE (Message + stable timestamp) ──────── */
interface StampedMessage extends Message {
  id: string;
  ts: string;
}

const stamp = (m: Message, idx: number): StampedMessage => ({
  ...m,
  id: `msg-${idx}-${m.role}`,
  ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
});

/* ══════════════════════════════════════════════════════════
   ZEN AI PAGE
══════════════════════════════════════════════════════════ */
export default function ZenAI() {
  const { actor } = useActor(createActor);
  const [messages, setMessages] = useState<StampedMessage[]>([
    stamp(GREETING, 0),
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () =>
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg = stamp({ role: "user", content: text }, messages.length);
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsLoading(true);
    scrollToBottom();

    try {
      const ctx = updated.slice(-10).map((m) => ({
        role: m.role as string,
        content: m.content,
      }));
      const reply = actor
        ? await actor.sendAIMessage(ctx)
        : "AI service is not connected yet. Please try again in a moment.";
      setMessages((prev) => [
        ...prev,
        stamp({ role: "assistant", content: reply }, prev.length),
      ]);
    } catch (err) {
      const errMsg =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setMessages((prev) => [
        ...prev,
        stamp(
          {
            role: "assistant",
            content: `⚠️ Error: ${errMsg}. Please try again.`,
          },
          prev.length,
        ),
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(scrollToBottom, 80);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };

  const handleSuggestion = (label: string) => {
    setInput(label);
    textareaRef.current?.focus();
  };

  const showSuggestions =
    messages.length === 1 && messages[0].role === "assistant";

  return (
    <div
      data-ocid="zenai.page"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 90px)",
        fontFamily: "'Outfit',sans-serif",
      }}
    >
      <style>{typingStyle}</style>

      {/* ── PAGE HEADER ── */}
      <div
        style={{
          background: C.surf,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 20,
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
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
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-40%",
            right: "-5%",
            width: 240,
            height: 240,
            background: `radial-gradient(circle,${C.gold}0d 0%,transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: `linear-gradient(135deg,${C.gold},${C.goldD})`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              flexShrink: 0,
              boxShadow: `0 0 24px ${C.gold}44`,
              animation: "glow 3s ease-in-out infinite",
            }}
          >
            ⚡
          </div>
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 30,
                fontWeight: 700,
                color: C.gold,
                letterSpacing: "0.02em",
                lineHeight: 1.1,
                marginBottom: 3,
              }}
            >
              ZEN AI Assistant
            </h1>
            <p
              style={{
                color: C.muted,
                fontSize: 13,
                fontFamily: "'Outfit'",
                letterSpacing: "0.02em",
                margin: 0,
              }}
            >
              Powered by Anthropic Claude · Your Strategic Advisor
            </p>
          </div>
          <div
            style={{
              background: `linear-gradient(135deg,${C.gold}22,${C.gold}0d)`,
              border: `1px solid ${C.gold}44`,
              borderRadius: 8,
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ fontSize: 14 }}>👑</span>
            <span
              style={{
                fontFamily: "'DM Mono'",
                fontSize: 10,
                color: C.gold,
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
              }}
            >
              DAKESH KASHYAP | Exclusive Access
            </span>
          </div>
        </div>
      </div>

      {/* ── CHAT AREA ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: C.surf,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* Messages */}
        <div
          data-ocid="zenai.messages_list"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 20px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {messages.map((msg, idx) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                data-ocid={`zenai.message.${idx + 1}`}
                style={{
                  display: "flex",
                  flexDirection: isUser ? "row-reverse" : "row",
                  alignItems: "flex-end",
                  gap: 10,
                  animation: "fadeUp 0.3s ease",
                }}
              >
                {!isUser && (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      background: `linear-gradient(135deg,${C.gold},${C.goldD})`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      flexShrink: 0,
                      boxShadow: `0 0 12px ${C.gold}33`,
                    }}
                  >
                    ⚡
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "72%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isUser ? "flex-end" : "flex-start",
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      background: isUser ? C.surf3 : C.surf2,
                      border: isUser
                        ? `1px solid ${C.borderGold}`
                        : `1px solid ${C.border}`,
                      borderRadius: isUser
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                      padding: "13px 17px",
                      color: C.text,
                      fontSize: 14,
                      lineHeight: 1.65,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.content}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono'",
                      fontSize: 10,
                      color: C.muted2,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {isUser ? "You" : "ZEN AI"} · {msg.ts}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isLoading && (
            <div
              data-ocid="zenai.loading_state"
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 10,
                animation: "fadeUp 0.3s ease",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: `linear-gradient(135deg,${C.gold},${C.goldD})`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  flexShrink: 0,
                  boxShadow: `0 0 12px ${C.gold}33`,
                }}
              >
                ⚡
              </div>
              <TypingIndicator />
            </div>
          )}

          {/* Suggestion chips */}
          {showSuggestions && (
            <div
              data-ocid="zenai.suggestions_section"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 8,
              }}
            >
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  data-ocid={`zenai.suggestion.${i + 1}`}
                  onClick={() => handleSuggestion(s.label)}
                  style={{
                    background: `${C.gold}0d`,
                    border: `1px solid ${C.gold}33`,
                    borderRadius: 20,
                    padding: "8px 14px",
                    color: C.muted,
                    fontSize: 12,
                    cursor: "pointer",
                    fontFamily: "'Outfit'",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      `${C.gold}1a`;
                    (e.currentTarget as HTMLButtonElement).style.color = C.gold;
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      `${C.gold}66`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      `${C.gold}0d`;
                    (e.currentTarget as HTMLButtonElement).style.color =
                      C.muted;
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      `${C.gold}33`;
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── INPUT AREA ── */}
        <div
          style={{
            borderTop: `1px solid ${C.border}`,
            padding: "14px 20px",
            background: C.surf,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
            <textarea
              ref={textareaRef}
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your ZEN AI assistant anything..."
              disabled={isLoading}
              data-ocid="zenai.input"
              style={{
                flex: 1,
                background: C.surf2,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "12px 16px",
                color: C.text,
                fontSize: 14,
                fontFamily: "'Outfit'",
                lineHeight: 1.6,
                resize: "none",
                transition: "border-color 0.2s",
                opacity: isLoading ? 0.6 : 1,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = `${C.gold}66`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = C.border;
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <button
                type="button"
                className="btn-gold"
                onClick={send}
                disabled={isLoading || !input.trim()}
                data-ocid="zenai.submit_button"
                style={{
                  background:
                    isLoading || !input.trim()
                      ? `${C.gold}44`
                      : `linear-gradient(135deg,${C.gold},${C.goldD})`,
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 22px",
                  color: isLoading || !input.trim() ? C.muted : "#000",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor:
                    isLoading || !input.trim() ? "not-allowed" : "pointer",
                  fontFamily: "'Outfit'",
                  letterSpacing: "0.04em",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  minWidth: 88,
                  justifyContent: "center",
                }}
              >
                {isLoading ? (
                  <>
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        border: `2px solid ${C.muted2}`,
                        borderTopColor: C.gold,
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                    Thinking
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: 15 }}>⚡</span>
                    Send
                  </>
                )}
              </button>
              <div
                style={{
                  fontFamily: "'DM Mono'",
                  fontSize: 9,
                  color: C.muted2,
                  textAlign: "center",
                  letterSpacing: "0.04em",
                }}
              >
                ⌘+Enter
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
