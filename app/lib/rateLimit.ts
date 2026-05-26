const attempts = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  maxAttempts = 5,
  windowMs = 60_000
): { allowed: boolean; remainingMs: number } {
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || now > record.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remainingMs: 0 };
  }

  if (record.count >= maxAttempts) {
    return { allowed: false, remainingMs: record.resetAt - now };
  }

  record.count++;
  return { allowed: true, remainingMs: 0 };
}

export function getRateLimitKey(formId: string): string {
  try {
    const stored = sessionStorage.getItem(`rl_${formId}`);
    if (stored) return stored;
    const key = `${formId}_${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(`rl_${formId}`, key);
    return key;
  } catch {
    return formId;
  }
}
