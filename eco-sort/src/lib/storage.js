const HISTORY_KEY = 'ecosort:history';
const PREFS_KEY = 'ecosort:prefs';
const MAX_HISTORY = 60;

function safeParse(json, fallback) {
  try {
    const value = JSON.parse(json);
    return value;
  } catch {
    return fallback;
  }
}

function sanitizeRecord(r) {
  if (!r || typeof r !== 'object') return null;
  if (typeof r.id !== 'string') return null;
  if (typeof r.category !== 'string') return null;
  if (typeof r.createdAt !== 'string') return null;
  const confidence = Number(r.confidence);
  if (!Number.isFinite(confidence)) return null;
  return {
    id: r.id,
    category: r.category,
    modelLabel: typeof r.modelLabel === 'string' ? r.modelLabel : '',
    confidence,
    createdAt: r.createdAt,
    thumbnail: typeof r.thumbnail === 'string' ? r.thumbnail : null,
  };
}

export function loadHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  const parsed = safeParse(raw, []);
  if (!Array.isArray(parsed)) return [];
  return parsed.map(sanitizeRecord).filter(Boolean);
}

export function saveHistory(records) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(records.slice(0, MAX_HISTORY)));
  } catch {
    // Quota exceeded: trim thumbnails and retry.
    const slim = records.map((r) => ({ ...r, thumbnail: null }));
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(slim.slice(0, MAX_HISTORY)));
    } catch {
      // ignore
    }
  }
}

export function addRecord(record) {
  const records = loadHistory();
  records.unshift(record);
  saveHistory(records);
  return records;
}

export function removeRecord(id) {
  const records = loadHistory().filter((r) => r.id !== id);
  saveHistory(records);
  return records;
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

export function generateId() {
  return 'scan_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
}

export function loadPrefs() {
  return safeParse(localStorage.getItem(PREFS_KEY), {});
}

export function savePrefs(prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs || {}));
  } catch {
    // ignore
  }
}