export function formatDate(dateString?: string): string {
  if (!dateString) {
    return "N/A";
  }
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
