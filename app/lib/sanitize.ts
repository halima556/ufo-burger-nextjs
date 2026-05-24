/**
 * Sanitizes user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove HTML tags
    .replace(/javascript:/gi, "") // Remove JS protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .slice(0, 1000); // Hard limit length
}

export function sanitizeFormData<T extends Record<string, string>>(
  data: T
): T {
  const sanitized = {} as T;
  for (const key in data) {
    if (typeof data[key] === "string") {
      sanitized[key] = sanitizeInput(data[key]) as T[typeof key];
    } else {
      sanitized[key] = data[key];
    }
  }
  return sanitized;
}

/**
 * Validates that a string doesn't contain suspicious patterns
 */
export function isSuspiciousInput(input: string): boolean {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /vbscript:/i,
    /expression\(/i,
  ];
  return suspiciousPatterns.some((pattern) => pattern.test(input));
}
