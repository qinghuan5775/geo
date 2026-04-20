export function humanizeSlug(slug) {
  if (!slug) return "";
  return slug
    .split("-")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");
}

export function titleFromLocation(context, suffix) {
  const parts = [
    context?.province?.name,
    context?.city?.name,
    context?.district?.name,
    suffix
  ].filter(Boolean);
  return parts.join(" - ");
}
