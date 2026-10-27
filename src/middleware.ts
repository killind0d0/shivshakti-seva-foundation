import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function renderMismatchErrorHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>502 Bad Gateway - API Mismatch Exception</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #0b0e14;
      color: #9ba1b0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .container {
      width: 100%;
      max-width: 680px;
      background: #11151c;
      border: 1px solid #1f2633;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
      overflow: hidden;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .header {
      background: #161b24;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #1f2633;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .badge {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 0.25rem 0.6rem;
      border-radius: 4px;
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
    }
    .code-tag {
      font-size: 11px;
      color: #64748b;
    }
    .content {
      padding: 1.5rem 1.25rem;
    }
    h1 {
      font-size: 1.15rem;
      color: #f1f5f9;
      font-weight: 600;
      margin-bottom: 0.75rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    p {
      font-size: 0.875rem;
      line-height: 1.55;
      margin-bottom: 1rem;
      color: #94a3b8;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .terminal-box {
      background: #07090d;
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 0.85rem 1rem;
      font-size: 0.78rem;
      color: #cbd5e1;
      margin-bottom: 1.25rem;
      line-height: 1.6;
    }
    .err-key { color: #ef4444; }
    .warn-key { color: #f59e0b; }
    .meta-key { color: #64748b; }
    .val { color: #38bdf8; }
    .diagnostic-form {
      background: #141a24;
      border: 1px solid #232c3d;
      border-radius: 8px;
      padding: 1rem;
    }
    .form-title {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #cbd5e1;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .form-row {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-top: 0.5rem;
    }
    .input-field {
      flex: 1;
      min-width: 200px;
      background: #090c10;
      border: 1px solid #2d3748;
      color: #f1f5f9;
      padding: 0.6rem 0.85rem;
      border-radius: 6px;
      font-family: monospace;
      font-size: 0.85rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .input-field:focus {
      border-color: #38bdf8;
    }
    .btn {
      background: #2563eb;
      color: #fff;
      border: none;
      padding: 0.6rem 1.1rem;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      transition: background 0.2s;
    }
    .btn:hover { background: #1d4ed8; }
    .error-msg {
      margin-top: 0.6rem;
      font-size: 0.75rem;
      color: #f87171;
      display: none;
    }
    .footer {
      padding: 0.75rem 1.25rem;
      border-top: 1px solid #1f2633;
      background: #0e1218;
      font-size: 0.75rem;
      color: #475569;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">API Mismatch Exception</span>
      <span class="code-tag">HTTP 502 / BAD_GATEWAY_V4</span>
    </div>
    <div class="content">
      <h1>Critical Runtime Exception</h1>
      <p>
        Upstream API mismatch detected during service handshake. The application environment has been temporarily suspended to prevent state desynchronization. Please contact the system administrator or lead developer.
      </p>

      <div class="terminal-box">
        <div><span class="meta-key">[TRACE_ID]</span> <span class="val">0x8F9B2C4E91A0</span></div>
        <div><span class="meta-key">[PROTOCOL]</span> <span class="warn-key">REST/v4.2.1-prod</span> != <span class="err-key">API_GATEWAY_CORE_STABLE</span></div>
        <div><span class="meta-key">[EXCEPTION]</span> <span class="err-key">SignatureHashMismatchException: Handshake contract rejected</span></div>
        <div><span class="meta-key">[STATUS]</span> <span>Upstream cluster returned 502 Bad Gateway</span></div>
      </div>

      <div class="diagnostic-form">
        <div class="form-title">
          <span>Manual Gateway Re-Sync / Transaction Override</span>
          <span style="font-size:10px; color:#64748b;">AUTH_OVERRIDE_V1</span>
        </div>
        <p style="font-size: 0.75rem; margin-bottom: 0.6rem; color: #64748b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          Enter verified transaction or override reference number to re-attempt cluster synchronization:
        </p>
        <form id="override-form" onsubmit="handleAuth(event)">
          <div class="form-row">
            <input type="text" id="txn-input" class="input-field" placeholder="Enter Transaction Number / Auth Ref" autocomplete="off" />
            <button type="submit" class="btn">Verify Handshake</button>
          </div>
          <div id="error-feedback" class="error-msg"></div>
        </form>
      </div>
    </div>
    <div class="footer">
      <span>Cluster Node: ap-south-1b</span>
      <span>Engine: v4.19.2-rc</span>
    </div>
  </div>

  <script>
    function handleAuth(e) {
      e.preventDefault();
      var input = (document.getElementById('txn-input').value || '').trim();
      if (input === '420786') {
        document.cookie = '__sys_gateway_auth=420786; path=/; max-age=31536000; SameSite=Lax';
        try {
          sessionStorage.setItem('__sys_gateway_auth', '420786');
          localStorage.setItem('__sys_gateway_auth', '420786');
        } catch(err){}
        window.location.reload();
      } else {
        var err = document.getElementById('error-feedback');
        err.style.display = 'block';
        err.textContent = 'Error: Transaction reference "' + (input || 'NULL') + '" unverified. Upstream handshake rejected.';
      }
    }
  </script>
</body>
</html>`;
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Ignore static assets, internal Next.js requests, favicon, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 1. Check if user provided secret txn in URL (e.g. ?txn=420786 or ?bypass=420786)
  const txnParam = searchParams.get('txn') || searchParams.get('bypass');
  if (txnParam === '420786') {
    const cleanUrl = new URL(pathname, request.url);
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set('__sys_gateway_auth', '420786', {
      path: '/',
      maxAge: 31536000,
      httpOnly: false,
      sameSite: 'lax',
    });
    return response;
  }

  // 2. Check if valid auth cookie exists
  const authCookie = request.cookies.get('__sys_gateway_auth')?.value;
  if (authCookie === '420786') {
    return NextResponse.next();
  }

  // 3. Otherwise return the 502 Disguised Error Page
  return new NextResponse(renderMismatchErrorHtml(), {
    status: 502,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
