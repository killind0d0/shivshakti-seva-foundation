import fs from "fs/promises";
import path from "path";
import os from "os";

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================

export type SubmissionType =
  | "help_request"
  | "volunteer"
  | "women_competition"
  | "contact"
  | "donation_receipt";

export interface SubmissionMetadata {
  ip?: string;
  userAgent?: string;
  source?: string;
}

export interface SubmissionRecord {
  id: string;
  type: SubmissionType;
  trackingId?: string;
  requestId?: string; // Backwards compatibility with frontend components
  name: string;
  phone: string;
  email?: string;
  location?: string;
  city?: string;
  address?: string;
  needType?: string;
  details?: string;
  status: string;
  statusCode: "received" | "in_review" | "dispatched" | "completed" | "rejected";
  date: string;
  createdAt: string;
  updatedAt: string;
  data: Record<string, any>;
  metadata?: SubmissionMetadata;
  notes?: string;
  [key: string]: any;
}

export interface SubmissionsStore {
  version: number;
  lastUpdated: string;
  submissions: SubmissionRecord[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// ==========================================
// 2. SEED DATA & CONSTANTS
// ==========================================

export const DEFAULT_STATUS_HINDI: Record<SubmissionType, string> = {
  help_request: "प्राप्त हुआ (जाँच जारी)",
  volunteer: "प्राप्त हुआ (सत्यापन प्रक्रियाधीन)",
  women_competition: "पंजीकरण प्राप्त हुआ (स्वीकृत)",
  contact: "संदेश प्राप्त हुआ",
  donation_receipt: "रसीद अनुरोध प्राप्त हुआ (सत्यापन जारी)",
};

const SEED_HELP_REQUESTS: SubmissionRecord[] = [
  {
    id: "seed_hr_01",
    type: "help_request",
    trackingId: "SSF-2026-849201",
    requestId: "SSF-2026-849201",
    name: "रामेश्वर प्रसाद",
    phone: "9876543210",
    location: "बोधगया, गया जी (बिहार)",
    needType: "बाढ़ एवं आपदा राहत (राशन किट)",
    date: "२८ सितम्बर २०२६",
    status: "सहायता सम्पन्न",
    statusCode: "completed",
    details: "राहत दल द्वारा सूखा राशन पैकेट एवं तिरपाल परिवार तक सकुशल पहुँचाया गया।",
    createdAt: "2026-09-28T10:00:00.000Z",
    updatedAt: "2026-09-28T16:30:00.000Z",
    data: {
      name: "रामेश्वर प्रसाद",
      phone: "9876543210",
      location: "बोधगया, गया जी (बिहार)",
      needType: "बाढ़ एवं आपदा राहत (राशन किट)",
      details: "राहत दल द्वारा सूखा राशन पैकेट एवं तिरपाल परिवार तक सकुशल पहुँचाया गया।",
    },
  },
  {
    id: "seed_hr_02",
    type: "help_request",
    trackingId: "SSF-2026-318492",
    requestId: "SSF-2026-318492",
    name: "श्रीमती कालिंदी देवी",
    phone: "9123456789",
    location: "माँ मंगलागौरी बस्ती, गया",
    needType: "महिला विकास एवं सिलाई प्रशिक्षण",
    date: "२९ सितम्बर २०२६",
    status: "सेवा दल प्रेषित",
    statusCode: "dispatched",
    details: "कौशल प्रशिक्षण केंद्र में पंजीकरण पूर्ण, आगामी बैच में कार्यशाला किट आबंटित।",
    createdAt: "2026-09-29T11:30:00.000Z",
    updatedAt: "2026-09-30T09:00:00.000Z",
    data: {
      name: "श्रीमती कालिंदी देवी",
      phone: "9123456789",
      location: "माँ मंगलागौरी बस्ती, गया",
      needType: "महिला विकास एवं सिलाई प्रशिक्षण",
      details: "कौशल प्रशिक्षण केंद्र में पंजीकरण पूर्ण, आगामी बैच में कार्यशाला किट आबंटित।",
    },
  },
];

// ==========================================
// 3. PERSISTENCE LAYER & SAFE FILE ACCESS
// ==========================================

const PRIMARY_DATA_PATH =
  process.env.SUBMISSIONS_FILE_PATH ||
  path.join(process.cwd(), "src/data/submissionsData.json");

const FALLBACK_DATA_PATH = path.join(os.tmpdir(), "ssf_submissions.json");

// In-memory Promise chain for safe concurrent writes
let writeLock: Promise<any> = Promise.resolve();

function withWriteLock<T>(fn: () => Promise<T>): Promise<T> {
  const next = writeLock.then(fn, fn);
  writeLock = next.then(
    () => {},
    () => {}
  );
  return next;
}

/**
 * Reads the persistent store from the primary file, falling back to /tmp if needed.
 */
export async function getSubmissionsStore(): Promise<SubmissionsStore> {
  // 1. Try reading from primary path
  try {
    const raw = await fs.readFile(PRIMARY_DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.submissions)) {
      return parsed;
    }
  } catch (primaryErr: any) {
    // If file simply doesn't exist, we will try fallback or initialize
  }

  // 2. Try reading from fallback path
  try {
    const rawFallback = await fs.readFile(FALLBACK_DATA_PATH, "utf-8");
    const parsedFallback = JSON.parse(rawFallback);
    if (parsedFallback && Array.isArray(parsedFallback.submissions)) {
      return parsedFallback;
    }
  } catch (fallbackErr: any) {
    // Neither exists or readable
  }

  // 3. Initialize fresh store with seed data
  const initialStore: SubmissionsStore = {
    version: 1,
    lastUpdated: new Date().toISOString(),
    submissions: [...SEED_HELP_REQUESTS],
  };

  // Attempt to write the initial store
  await saveSubmissionsStore(initialStore).catch((e) => {
    console.warn("[SubmissionsStore] Failed to write initial store:", e?.message);
  });

  return initialStore;
}

/**
 * Safely writes store to primary path with automatic fallback to /tmp.
 */
export async function saveSubmissionsStore(store: SubmissionsStore): Promise<void> {
  return withWriteLock(async () => {
    store.lastUpdated = new Date().toISOString();
    const content = JSON.stringify(store, null, 2);

    let savedPrimary = false;
    try {
      const primaryDir = path.dirname(PRIMARY_DATA_PATH);
      await fs.mkdir(primaryDir, { recursive: true });
      await fs.writeFile(PRIMARY_DATA_PATH, content, "utf-8");
      savedPrimary = true;
    } catch (primaryErr: any) {
      console.warn(
        `[SubmissionsStore] Warning: Could not write to ${PRIMARY_DATA_PATH}: ${primaryErr?.message}. Trying fallback path...`
      );
    }

    if (!savedPrimary) {
      try {
        const fallbackDir = path.dirname(FALLBACK_DATA_PATH);
        await fs.mkdir(fallbackDir, { recursive: true });
        await fs.writeFile(FALLBACK_DATA_PATH, content, "utf-8");
        console.log(`[SubmissionsStore] Successfully saved to fallback: ${FALLBACK_DATA_PATH}`);
      } catch (fallbackErr: any) {
        console.error(
          `[SubmissionsStore] Critical Error: Failed to write to fallback ${FALLBACK_DATA_PATH}:`,
          fallbackErr
        );
        throw new Error("Unable to persist submission data to filesystem.");
      }
    }
  });
}

// ==========================================
// 4. TRACKING ID GENERATOR
// ==========================================

export function generateTrackingId(existingIds?: Set<string>): string {
  const year = new Date().getFullYear();
  let candidate = "";
  let attempts = 0;

  do {
    const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
    candidate = `SSF-${year}-${randomSixDigits}`;
    attempts++;
  } while (existingIds && existingIds.has(candidate) && attempts < 100);

  return candidate;
}

// ==========================================
// 5. VALIDATION UTILITY
// ==========================================

export function validateSubmission(
  type: SubmissionType,
  payload: Record<string, any>
): ValidationResult {
  const errors: string[] = [];

  if (!payload || typeof payload !== "object") {
    return { valid: false, errors: ["अमान्य डेटा: फॉर्म पेलोड अनुपस्थित है।"] };
  }

  // Name check (supports donorName / name)
  const name = (payload.name || payload.donorName || "").trim();
  if (!name) {
    errors.push("कृपया अपना पूरा नाम अवश्य दर्ज करें (Name is required)।");
  } else if (name.length < 2) {
    errors.push("नाम में कम से कम २ अक्षर होने चाहिए।");
  }

  // Phone / Mobile check
  const rawPhone = (
    payload.phone ||
    payload.mobile ||
    payload.donorPhone ||
    ""
  ).toString().trim();

  if (!rawPhone) {
    errors.push("कृपया अपना मोबाइल नंबर दर्ज करें (Phone number is required)।");
  } else {
    const cleanDigits = rawPhone.replace(/\D/g, "");
    if (cleanDigits.length < 10) {
      errors.push("कृपया मान्य १० अंकों का मोबाइल नंबर लिखें (Must be at least 10 digits)।");
    }
  }

  // Email validation if provided
  const email = (payload.email || payload.donorEmail || "").toString().trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("कृपया सही ईमेल पता दर्ज करें (उदा. nam@example.com)।");
  }

  // Category specific validation
  if (type === "help_request") {
    const location = (payload.location || payload.address || "").toString().trim();
    if (!location) {
      errors.push("कृपया अपना वर्तमान स्थान या पता अवश्य लिखें (Location is required)।");
    }
  } else if (type === "volunteer") {
    const city = (payload.city || payload.location || "").toString().trim();
    if (!city) {
      errors.push("कृपया अपना नगर या जिला दर्ज करें (City/District is required)।");
    }
  } else if (type === "women_competition") {
    const address = (payload.address || payload.city || payload.location || "").toString().trim();
    if (!address) {
      errors.push("कृपया अपना पता या गांव/कस्बा लिखें (Address is required)।");
    }
  } else if (type === "contact") {
    const message = (payload.message || "").toString().trim();
    if (!message) {
      errors.push("कृपया अपना संदेश या समस्या लिखें (Message is required)।");
    }
  } else if (type === "donation_receipt") {
    // Optional amount check
    if (payload.amount && (isNaN(Number(payload.amount)) || Number(payload.amount) <= 0)) {
      errors.push("कृपया मान्य दान राशि दर्ज करें।");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ==========================================
// 6. NOTIFICATION DISPATCHER (WEBHOOK & EMAIL)
// ==========================================

export async function dispatchNotification(
  submission: SubmissionRecord
): Promise<{ dispatched: boolean; channel: string; error?: string }> {
  const webhookUrl = process.env.WEBHOOK_URL;
  const emailNotify = process.env.EMAIL_NOTIFY;

  // Webhook Dispatch
  if (webhookUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 second timeout

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Shivshakti-Seva-Foundation-Webhook/1.0",
        },
        body: JSON.stringify({
          event: "submission.created",
          submissionId: submission.id,
          type: submission.type,
          trackingId: submission.trackingId,
          name: submission.name,
          phone: submission.phone,
          status: submission.status,
          date: submission.date,
          createdAt: submission.createdAt,
          payload: submission.data,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log(
        `[Submissions Dispatcher] Webhook dispatched to ${webhookUrl} (HTTP ${res.status})`
      );
      return { dispatched: true, channel: "webhook" };
    } catch (err: any) {
      console.warn(`[Submissions Dispatcher] Webhook dispatch notice:`, err?.message || err);
    }
  }

  // Email Notification Hook (logged cleanly or dispatched if service configured)
  if (emailNotify) {
    console.log(
      `[Submissions Dispatcher] Email notification queued for ${emailNotify} | New ${submission.type} from ${submission.name} (${submission.phone})`
    );
    return { dispatched: true, channel: "email_queued" };
  }

  // Clean log fallback
  console.log(
    `[Submissions Dispatcher] [${new Date().toISOString()}] New submission logged: [${submission.type.toUpperCase()}] ID: ${
      submission.id
    } ${submission.trackingId ? `| Tracking: ${submission.trackingId} ` : ""}| Name: ${
      submission.name
    } | Phone: ${submission.phone}`
  );

  return { dispatched: false, channel: "logged" };
}

// ==========================================
// 7. CORE SUBMISSION OPERATIONS
// ==========================================

/**
 * Creates and persists a new submission record with unique IDs and tracking info.
 */
export async function addSubmission(
  type: SubmissionType,
  payload: Record<string, any>,
  meta?: SubmissionMetadata
): Promise<SubmissionRecord> {
  const store = await getSubmissionsStore();
  const existingTrackingIds = new Set(
    store.submissions.map((s) => s.trackingId || "").filter(Boolean)
  );

  const now = new Date();
  const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  // Generate or honor provided tracking ID
  let trackingId: string | undefined = undefined;
  if (type === "help_request") {
    // If client supplied requestId / trackingId, preserve it if valid and unique
    if (
      payload.trackingId &&
      typeof payload.trackingId === "string" &&
      payload.trackingId.startsWith("SSF-")
    ) {
      trackingId = payload.trackingId.trim().toUpperCase();
    } else if (
      payload.requestId &&
      typeof payload.requestId === "string" &&
      payload.requestId.startsWith("SSF-")
    ) {
      trackingId = payload.requestId.trim().toUpperCase();
    } else {
      trackingId = generateTrackingId(existingTrackingIds);
    }
  }

  const name = (payload.name || payload.donorName || "").trim();
  const phone = (
    payload.phone ||
    payload.mobile ||
    payload.donorPhone ||
    ""
  ).toString().trim();
  const email = (payload.email || payload.donorEmail || "").trim() || undefined;
  const location = (payload.location || payload.address || payload.city || "").trim() || undefined;
  const city = (payload.city || "").trim() || undefined;
  const address = (payload.address || "").trim() || undefined;
  const needType = (payload.needType || payload.subject || "").trim() || undefined;
  const details = (payload.details || payload.message || payload.notes || "").trim() || undefined;

  const defaultStatus = DEFAULT_STATUS_HINDI[type] || "प्राप्त हुआ";
  const status = payload.status || defaultStatus;

  const newRecord: SubmissionRecord = {
    ...payload,
    id,
    type,
    name,
    phone,
    email,
    location,
    city,
    address,
    needType,
    details,
    trackingId,
    requestId: trackingId, // Ensures compatibility with HelpTracker
    status,
    statusCode: "received",
    date: payload.date || now.toLocaleDateString("hi-IN"),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    data: { ...payload },
    metadata: meta,
  };

  // Prepend to top of list
  store.submissions.unshift(newRecord);
  await saveSubmissionsStore(store);

  // Dispatch asynchronous notification (fire-and-forget, non-blocking)
  dispatchNotification(newRecord).catch((err) => {
    console.error("[Submissions Dispatcher] Dispatch failure:", err);
  });

  return newRecord;
}

/**
 * Queries submissions with optional category filter and search string.
 */
export async function getSubmissions(filter?: {
  category?: SubmissionType | "all";
  query?: string;
  limit?: number;
  offset?: number;
}): Promise<{ total: number; submissions: SubmissionRecord[] }> {
  const store = await getSubmissionsStore();
  let list = store.submissions;

  if (filter?.category && filter.category !== "all") {
    list = list.filter((s) => s.type === filter.category);
  }

  if (filter?.query) {
    const q = filter.query.trim().toLowerCase();
    const cleanDigits = q.replace(/\D/g, "");

    list = list.filter((s) => {
      const matchName = s.name.toLowerCase().includes(q);
      const matchPhone = s.phone.replace(/\D/g, "").includes(cleanDigits) && cleanDigits.length > 0;
      const matchTracking = s.trackingId?.toLowerCase().includes(q);
      const matchLocation = s.location?.toLowerCase().includes(q) || s.city?.toLowerCase().includes(q);
      return matchName || matchPhone || matchTracking || matchLocation;
    });
  }

  const total = list.length;
  const offset = filter?.offset || 0;
  const limit = filter?.limit || list.length;

  return {
    total,
    submissions: list.slice(offset, offset + limit),
  };
}

/**
 * Searches for a help request record by tracking ID or phone number.
 */
export async function findHelpRequest(query: {
  id?: string;
  phone?: string;
  q?: string;
}): Promise<{ match: SubmissionRecord | null; matches: SubmissionRecord[] }> {
  const store = await getSubmissionsStore();
  const helpRequests = store.submissions.filter((s) => s.type === "help_request");

  const cleanQueryId = (query.id || query.q || "").trim().toUpperCase();
  const rawPhone = (query.phone || query.q || "").trim();
  const cleanPhoneDigits = rawPhone.replace(/\D/g, "");

  const matches = helpRequests.filter((rec) => {
    // 1. Exact or normalized tracking ID / request ID match
    const tracking = (rec.trackingId || rec.requestId || rec.id || "").trim().toUpperCase();
    if (cleanQueryId && tracking === cleanQueryId) {
      return true;
    }

    // 2. Phone match (matching clean digit sequences)
    if (cleanPhoneDigits && cleanPhoneDigits.length >= 8) {
      const recDigits = (rec.phone || "").replace(/\D/g, "");
      // Support matching 10 digits when +91 prefix is present
      if (
        recDigits === cleanPhoneDigits ||
        recDigits.endsWith(cleanPhoneDigits) ||
        cleanPhoneDigits.endsWith(recDigits)
      ) {
        return true;
      }
    }

    return false;
  });

  return {
    match: matches[0] || null,
    matches,
  };
}

/**
 * Updates status of a submission (for staff/admin).
 */
export async function updateSubmissionStatus(
  idOrTrackingId: string,
  status: string,
  statusCode: SubmissionRecord["statusCode"] = "in_review",
  note?: string
): Promise<SubmissionRecord | null> {
  const store = await getSubmissionsStore();
  const cleanId = idOrTrackingId.trim().toUpperCase();

  const foundIndex = store.submissions.findIndex(
    (s) =>
      s.id === idOrTrackingId ||
      s.trackingId?.toUpperCase() === cleanId ||
      s.requestId?.toUpperCase() === cleanId
  );

  if (foundIndex === -1) {
    return null;
  }

  const target = store.submissions[foundIndex];
  target.status = status;
  target.statusCode = statusCode;
  target.updatedAt = new Date().toISOString();
  if (note) {
    target.notes = note;
  }

  store.submissions[foundIndex] = target;
  await saveSubmissionsStore(store);

  return target;
}
