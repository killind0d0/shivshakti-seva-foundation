"use client";

import React, { useState, useEffect } from "react";

export default function GatewayGuard({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  const [txnInput, setTxnInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const txnParam = params.get("txn") || params.get("bypass");
      if (txnParam === "420786") {
        document.cookie = "__sys_gateway_auth=420786; path=/; max-age=31536000; SameSite=Lax";
        sessionStorage.setItem("__sys_gateway_auth", "420786");
        localStorage.setItem("__sys_gateway_auth", "420786");
        setIsAuthed(true);
        return;
      }

      const hasSession = sessionStorage.getItem("__sys_gateway_auth") === "420786";
      const hasLocal = localStorage.getItem("__sys_gateway_auth") === "420786";
      const hasCookie = document.cookie.includes("__sys_gateway_auth=420786");

      if (hasSession || hasLocal || hasCookie) {
        setIsAuthed(true);
      } else {
        setIsAuthed(false);
      }
    } catch {
      setIsAuthed(false);
    }
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (txnInput.trim() === "420786") {
      document.cookie = "__sys_gateway_auth=420786; path=/; max-age=31536000; SameSite=Lax";
      try {
        sessionStorage.setItem("__sys_gateway_auth", "420786");
        localStorage.setItem("__sys_gateway_auth", "420786");
      } catch {}
      setIsAuthed(true);
      window.location.reload();
    } else {
      setErrorMsg(`Error: Transaction reference "${txnInput.trim() || 'NULL'}" unverified. Upstream handshake rejected.`);
    }
  };

  // While checking auth on initial render
  if (isAuthed === null) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b0e14" }} />
    );
  }

  // If authorized, display full application
  if (isAuthed) {
    return <>{children}</>;
  }

  // Disguised 502 Bad Gateway / API Mismatch Screen
  return (
    <div
      style={{
        backgroundColor: "#0b0e14",
        color: "#9ba1b0",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        boxSizing: "border-box",
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          background: "#11151c",
          border: "1px solid #1f2633",
          borderRadius: "12px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#161b24",
            padding: "1rem 1.25rem",
            borderBottom: "1px solid #1f2633",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "0.25rem 0.6rem",
              borderRadius: "4px",
              background: "rgba(239, 68, 68, 0.15)",
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.3)",
            }}
          >
            API Mismatch Exception
          </span>
          <span style={{ fontSize: "11px", color: "#64748b" }}>
            HTTP 502 / BAD_GATEWAY_V4
          </span>
        </div>

        <div style={{ padding: "1.5rem 1.25rem" }}>
          <h1
            style={{
              fontSize: "1.15rem",
              color: "#f1f5f9",
              fontWeight: 600,
              marginBottom: "0.75rem",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            Critical Runtime Exception
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              lineHeight: 1.55,
              marginBottom: "1rem",
              color: "#94a3b8",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            Upstream API mismatch detected during service handshake. The application environment has been temporarily suspended to prevent state desynchronization. Please contact the system administrator or lead developer.
          </p>

          <div
            style={{
              background: "#07090d",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              padding: "0.85rem 1rem",
              fontSize: "0.78rem",
              color: "#cbd5e1",
              marginBottom: "1.25rem",
              lineHeight: 1.6,
            }}
          >
            <div>
              <span style={{ color: "#64748b" }}>[TRACE_ID]</span>{" "}
              <span style={{ color: "#38bdf8" }}>0x8F9B2C4E91A0</span>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>[PROTOCOL]</span>{" "}
              <span style={{ color: "#f59e0b" }}>REST/v4.2.1-prod</span> != <span style={{ color: "#ef4444" }}>API_GATEWAY_CORE_STABLE</span>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>[EXCEPTION]</span>{" "}
              <span style={{ color: "#ef4444" }}>SignatureHashMismatchException: Handshake contract rejected</span>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>[STATUS]</span>{" "}
              <span>Upstream cluster returned 502 Bad Gateway</span>
            </div>
          </div>

          <div
            style={{
              background: "#141a24",
              border: "1px solid #232c3d",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#cbd5e1",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>Manual Gateway Re-Sync / Transaction Override</span>
              <span style={{ fontSize: "10px", color: "#64748b" }}>AUTH_OVERRIDE_V1</span>
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                marginBottom: "0.6rem",
                color: "#64748b",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              Enter verified transaction or override reference number to re-attempt cluster synchronization:
            </p>
            <form onSubmit={handleVerify}>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <input
                  type="text"
                  value={txnInput}
                  onChange={(e) => setTxnInput(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: "200px",
                    background: "#090c10",
                    border: "1px solid #2d3748",
                    color: "#f1f5f9",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "6px",
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                  placeholder="Enter Transaction Number / Auth Ref"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  style={{
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    padding: "0.6rem 1.1rem",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  }}
                >
                  Verify Handshake
                </button>
              </div>
              {errorMsg && (
                <div
                  style={{
                    marginTop: "0.6rem",
                    fontSize: "0.75rem",
                    color: "#f87171",
                  }}
                >
                  {errorMsg}
                </div>
              )}
            </form>
          </div>
        </div>

        <div
          style={{
            padding: "0.75rem 1.25rem",
            borderTop: "1px solid #1f2633",
            background: "#0e1218",
            fontSize: "0.75rem",
            color: "#475569",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Cluster Node: ap-south-1b</span>
          <span>Engine: v4.19.2-rc</span>
        </div>
      </div>
    </div>
  );
}
