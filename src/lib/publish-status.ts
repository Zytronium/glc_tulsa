export function isPageVisible(page: {
  isPublished?: boolean | null;
}): boolean {
  // undefined/null (field not yet set on older content) defaults to visible
  return page.isPublished !== false;
}

export function isSitePageVisible(doc: {
  status?: string | null;
  schedule?: { publishAt?: string | null; unpublishAt?: string | null } | null;
}): boolean {
  if (doc.status !== "published") return false;

  const now = new Date();
  const publishAt = doc.schedule?.publishAt ? new Date(doc.schedule.publishAt) : null;
  const unpublishAt = doc.schedule?.unpublishAt ? new Date(doc.schedule.unpublishAt) : null;

  const afterStart = !publishAt || publishAt <= now;
  const beforeEnd = !unpublishAt || unpublishAt >= now;

  return afterStart && beforeEnd;
}
