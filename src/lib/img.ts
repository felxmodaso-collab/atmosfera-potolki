export const img = (path: string): string => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) path = "/" + path;
  return `${base}${path}`;
};
