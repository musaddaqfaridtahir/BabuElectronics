/**
 * Converts any text string into a clean, URL-safe slug.
 * e.g., "Honda CG 125 Self Start 2025" -> "honda-cg-125-self-start-2025"
 */
export function createSlug(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')     // Remove all non-word chars (except spaces and hyphens)
    .replace(/[\s_-]+/g, '-')      // Replace spaces, underscores, and hyphens with a single hyphen
    .replace(/^-+|-+$/g, '');      // Trim hyphens from beginning and end
}
