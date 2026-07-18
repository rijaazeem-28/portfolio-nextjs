import { NextRequest, NextResponse } from "next/server";

type Attempt = { count: number; firstAt: number };

// In-memory IP attempt store. For production use Redis or your DB.
const ATTEMPTS = new Map<string, Attempt>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_ATTEMPTS = 5;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = body?.token;
    if (!token) return NextResponse.json({ success: false, message: "Missing reCAPTCHA token." }, { status: 400 });

    const xfwd = req.headers.get("x-forwarded-for");
    const ip = Array.isArray(xfwd) ? xfwd[0] : xfwd || req.headers.get("x-real-ip") || "unknown";

    // Clean up old windows
    const now = Date.now();
    const entry = ATTEMPTS.get(ip);
    if (entry && now - entry.firstAt > WINDOW_MS) {
      ATTEMPTS.delete(ip);
    }

    const current = ATTEMPTS.get(ip) ?? { count: 0, firstAt: now };
    if (current.count >= MAX_ATTEMPTS) {
      return NextResponse.json({ success: false, message: "Too many login attempts from this IP. Please try again later." }, { status: 429 });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ success: false, message: "reCAPTCHA not configured on server." }, { status: 500 });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}${ip && ip !== 'unknown' ? `&remoteip=${encodeURIComponent(ip)}` : ""}`;

    const resp = await fetch(verifyUrl, { method: "POST" });
    const data = await resp.json();
    // Log Google's response in development to help debug
    if (process.env.NODE_ENV !== "production") {
      // Avoid printing secrets; this is just the verification response
      // eslint-disable-next-line no-console
      console.debug("reCAPTCHA verify response:", data);
    }

    // Google returns { success, score, action, ... }
    if (!data.success) {
      // increment attempts
      current.count += 1;
      if (!current.firstAt) current.firstAt = now;
      ATTEMPTS.set(ip, current);
      // Provide helpful detail in development
      if (process.env.NODE_ENV !== "production") {
        return NextResponse.json({ success: false, message: "reCAPTCHA verification failed.", detail: data }, { status: 400 });
      }
      return NextResponse.json({ success: false, message: "reCAPTCHA verification failed." }, { status: 400 });
    }

    // If Google returns a score (reCAPTCHA v3), validate it. If no score provided
    // (test keys or other valid responses), accept the verification.
    if (Object.prototype.hasOwnProperty.call(data, "score")) {
      const score = typeof data.score === "number" ? data.score : 0;
      if (score < 0.5) {
        current.count += 1;
        if (!current.firstAt) current.firstAt = now;
        ATTEMPTS.set(ip, current);
        if (process.env.NODE_ENV !== "production") {
          return NextResponse.json({ success: false, message: "reCAPTCHA score too low. Are you a robot?", score, detail: data }, { status: 400 });
        }
        return NextResponse.json({ success: false, message: "reCAPTCHA score too low. Are you a robot?" }, { status: 400 });
      }
    }

    // Passed verification — reset attempts for this IP
    ATTEMPTS.delete(ip);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error verifying reCAPTCHA." }, { status: 500 });
  }
}
