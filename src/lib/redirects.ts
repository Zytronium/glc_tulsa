// -------- old -> new URL redirects --------
// Old URLs are slugs only (no leading slash), matched against the [slug] dynamic route.
export const redirects: Record<string, string> = {
  "graceworship": "/worship",
  "worshipservices": "/worship",
  "preparing-for-lent": "/worship",
  "holyweek": "/worship",
  "graceevents": "/events",
  "gracenight": "/events/Grace-Night",
  "community-involvement": "/ministries/community-involvement",
  "missions": "/ministries/missions",
  "music": "/ministries/music",
  "standrewsociety": "/ministries/st-andrew-society",
  "contactus": "/contact-us",
  "general-1": "/about",
  "ssattendance": "/ss-attendance",
  "pastorsblog": "/pastors-blog",
  "facilityuseagreement": "/facility-use-agreement",
};

export function getRedirectTarget(slug: string): string | null {
  return redirects[slug] ?? null;
}
