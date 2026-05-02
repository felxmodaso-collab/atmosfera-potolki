// Маска для российских номеров: +7 (XXX) XXX-XX-XX
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  if (digits.length === 0) return "";
  const d = digits.startsWith("7") ? digits.slice(1) : digits;
  let out = "+7";
  if (d.length > 0) out += " (" + d.slice(0, 3);
  if (d.length >= 3) out += ")";
  if (d.length > 3) out += " " + d.slice(3, 6);
  if (d.length > 6) out += "-" + d.slice(6, 8);
  if (d.length > 8) out += "-" + d.slice(8, 10);
  return out;
}

export function isPhoneValid(masked: string): boolean {
  return masked.replace(/\D/g, "").length === 11;
}
