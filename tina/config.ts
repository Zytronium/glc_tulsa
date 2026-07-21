import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // -------- global variables --------
      {
        name: "global_variables",
        label: "Global Variables",
        path: "content",
        format: "json",
        match: {
          include: "global_variables",
        },
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "donationUrl",
            label: "Donation URL",
          },
          {
            type: "string",
            name: "facebookUrl",
            label: "Facebook URL",
          },
          {
            type: "string",
            name: "mapsUrl",
            label: "Google Maps URL",
            description: 'e.g. "https://maps.google.com/?q=2331+E+5th+Pl+Tulsa+OK"',
          },
          { type: "string", name: "addressLine1", label: "Address Line 1", description: "Also affects embedded map on about page" },
          { type: "string", name: "addressLine2", label: "Address Line 2", description: "Also affects embedded map on about page" },
          {
            type: "string",
            name: "officeHoursDays",
            label: "Office Hours Days",
            description: 'e.g. "Monday - Thursday"',
          },
          {
            type: "string",
            name: "officeHoursTimes",
            label: "Office Hours Times",
            description: 'e.g. "8:00 AM - 2:00 PM"',
          },
        ]
      },
      // -------- layout (navbar + footer) --------
      {
        name: "layout",
        label: "Layout",
        path: "content",
        format: "json",
        match: {
          include: "layout",
        },
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/layout-preview",
        },
        fields: [
          { type: "string", name: "email", label: "Email" },
          { type: "string", name: "emailCc", label: "Email CC" },
          { type: "string", name: "emailSubject", label: "Email Subject Autofill" },
          { type: "string", name: "phone", label: "Phone" },
          { type: "string", name: "churchName", label: "Church Name" },
          { type: "string", name: "copyright", label: "Copyright", description: "Note: copyright symbol and year automatically prefix this text. The year updates automatically." },
        ],
      },
      // -------- home page --------
      {
        name: "homePage",
        label: "Home Page",
        path: "content",
        format: "json",
        match: {
          include: "home",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/",
        },
        fields: [
          // -------- hero --------
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                description: "Use \"|\" to create a line break."
              },
              {
                type: "string",
                name: "subtext",
                label: "Subtext",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
              {
                type: "object",
                name: "ctaPrimary",
                label: "Primary Button",
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href", label: "Link" },
                ],
              },
              {
                type: "object",
                name: "ctaSecondary",
                label: "Secondary Button",
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href", label: "Link" },
                ],
              },
            ],
          },
          // -------- service bar --------
          {
            type: "object",
            name: "serviceBar",
            label: "Service Times",
            fields: [
              {
                type: "string",
                name: "sundayTimes",
                label: "Sunday Times",
                description: 'e.g. "8:00 & 10:30 AM"',
              },
              {
                type: "string",
                name: "wednesdayTimes",
                label: "Wednesday Times",
                description: 'e.g. "6:15 PM (Sept-May)"',
              },
              {
                type: "string",
                name: "addressUrl",
                label: "Google Maps URL",
              },
            ],
          },
          // -------- mission --------
          {
            type: "object",
            name: "mission",
            label: "Mission Section",
            fields: [
              {
                type: "object",
                name: "items",
                label: "Items",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label }),
                },
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "description", label: "Description" },
                ],
              },
            ],
          },
          // -------- who we are --------
          {
            type: "object",
            name: "whoWeAre",
            label: "Who We Are",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "imageAlt", label: "Image Alt Text" },
              { type: "string", name: "linkLabel", label: "Link Label" },
              { type: "string", name: "linkHref", label: "Link URL" },
              {
                type: "object",
                name: "marks",
                label: "Marks",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label }),
                },
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  {
                    type: "string",
                    name: "text",
                    label: "Text",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          // -------- quick links --------
          {
            type: "object",
            name: "quickLinks",
            label: "Quick Links",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label }),
            },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "description", label: "Description" },
              { type: "string", name: "href", label: "Link URL" },
            ],
          },
        ],
      },
      // -------- about page --------
      {
        name: "aboutPage",
        label: "About Page",
        path: "content",
        format: "json",
        match: {
          include: "about",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/about",
        },
        fields: [
          // -------- hero --------
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "headline", label: "Headline" },
              {
                type: "string",
                name: "subtext",
                label: "Subtext",
                ui: { component: "textarea" },
              },
              { type: "image", name: "backgroundImage", label: "Background Image" },
            ],
          },
          // -------- intro --------
          {
            type: "object",
            name: "intro",
            label: "Introduction",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "body",
                label: "Body",
                ui: { component: "textarea" },
              },
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "imageAlt", label: "Image Alt Text" },
            ],
          },
          // -------- mission --------
          {
            type: "object",
            name: "mission",
            label: "Mission",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "body",
                label: "Body",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "pillars",
                label: "Pillars",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label }),
                },
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "summary", label: "Summary" },
                  { type: "string", name: "details", label: "Details", list: true },
                ],
              },
              { type: "string", name: "videoURL", label: "YouTube Video Embed", description: "e.g. \"https://www.youtube.com/embed/nhtL8KEsdg8\"" },
            ],
          },
          // -------- doctrine --------
          {
            type: "object",
            name: "doctrine",
            label: "Doctrine",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "body",
                label: "Body",
                description: "Use a blank line between paragraphs.",
                ui: { component: "textarea" },
              },
              { type: "string", name: "link1Label", label: "Link 1 Label" },
              { type: "string", name: "link1Href", label: "Link 1 URL" },
              { type: "string", name: "link2Label", label: "Link 2 Label" },
              { type: "string", name: "link2Href", label: "Link 2 URL" },
            ],
          },
          // -------- marks --------
          {
            type: "object",
            name: "marks",
            label: "Four Marks",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label }),
            },
            fields: [
              { type: "string", name: "label", label: "Label" },
              {
                type: "string",
                name: "body",
                label: "Body",
                ui: { component: "textarea" },
              },
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "imageAlt", label: "Image Alt Text" },
            ],
          },
          // -------- photo gallery preview --------
          {
            type: "object",
            name: "photoGalleryPreview",
            label: "Photo Gallery Preview",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "body",
                label: "Body",
                ui: { component: "textarea" },
              },
              { type: "string", name: "linkLabel", label: "Link Label", description: 'e.g. "Explore the Full Gallery"' },
              {
                type: "image",
                name: "images",
                label: "Preview Images",
                list: true,
                description: "Pick 6 photos to preview here. The full gallery lives at /photos.",
              },
            ],
          },
        ],
      },
      // -------- photos page --------
      {
        name: "photosPage",
        label: "Photos Page",
        path: "content",
        format: "json",
        match: {
          include: "photos",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/photos",
        },
        fields: [
          // hero
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              {
                type: "string",
                name: "quote",
                label: "Quote",
                ui: { component: "textarea" },
              },
              { type: "string", name: "quoteCitation", label: "Quote Citation", description: 'e.g. "Proverbs 25:2, ESV"' },
              {
                type: "string",
                name: "body",
                label: "Body",
                description: "Use a blank line between paragraphs.",
                ui: { component: "textarea" },
              },
              { type: "image", name: "backgroundImage", label: "Background Image" },
            ],
          },
          // categories
          {
            type: "object",
            name: "categories",
            label: "Photo Categories",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.displayName }),
            },
            fields: [
              {
                type: "string",
                name: "folder",
                label: "Folder Name",
                description: 'Must exactly match a folder name under /images/photos, e.g. "at_the_altar"',
                required: true,
              },
              {
                type: "string",
                name: "displayName",
                label: "Display Name",
                description: 'How this category appears on the website, e.g. "At the Altar"',
                required: true,
              },
              {
                type: "rich-text",
                name: "note",
                label: "Note",
                description: 'Optional text to display above photo grid for this category (e.g. photographer credit)',
              },
              {
                type: "image",
                name: "coverImage",
                label: "Cover Image",
                description: "Falls back to the first photo in the folder if left blank.",
              },
            ],
          },
        ],
      },
      // -------- worship page --------
      {
        name: "worshipPage",
        label: "Worship Page",
        path: "content",
        format: "json",
        match: {
          include: "worship",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/worship",
        },
        fields: [
          // -------- hero --------
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow", description: 'e.g. "Worship at Grace"' },
              { type: "string", name: "headline", label: "Headline" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              {
                type: "string",
                name: "intro",
                label: "Intro",
                description: "Use a blank line between paragraphs.",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "quote",
                label: "Scripture Quote",
                description: "Scripture quote to appear between 1st and 2nd intro paragraphs",
                ui: { component: "textarea" },
              },
              { type: "string", name: "quoteCitation", label: "Quote Citation", description: 'e.g. "Hebrews 12:28-29 (ESV)"' },
              { type: "image", name: "backgroundImage", label: "Background Image" },
            ],
          },
          // -------- worship times --------
          {
            type: "object",
            name: "worshipTimes",
            label: "Worship Times",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "sundayTimes", label: "Sunday Service Times", description: 'e.g. "8:00 & 10:30 AM"' },
              { type: "string", name: "sundaySchoolTime", label: "Sunday School & Bible Study Time", description: 'e.g. "9:15 AM"' },
              {
                type: "string",
                name: "wednesdayNote",
                label: "Wednesday Note",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "livestreamNote",
                label: "Livestream Note",
                ui: { component: "textarea" },
              },
              { type: "string", name: "facebookUrl", label: "Facebook Livestream URL" },
              { type: "image", name: "image", label: "Image" },
            ],
          },
          // -------- special services --------
          {
            type: "object",
            name: "specialServices",
            label: "Special Services",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "body",
                label: "Body",
                ui: { component: "textarea" },
              },
              { type: "string", name: "linkLabel", label: "Link Label", description: 'e.g. "View Upcoming Services"' },
              { type: "string", name: "linkHref", label: "Link URL" },
              { type: "image", name: "image", label: "Image" },
            ],
          },
          // -------- preparing for lent --------
          {
            type: "object",
            name: "lent",
            label: "Preparing for Lent",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "intro",
                label: "Intro",
                ui: { component: "textarea" },
              },
              { type: "string", name: "fastingLinkLabel", label: "Fasting Guidelines Link Label" },
              { type: "string", name: "fastingLinkHref", label: "Fasting Guidelines Link URL" },
              {
                type: "object",
                name: "disciplines",
                label: "Disciplines",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label }),
                },
                fields: [
                  { type: "string", name: "label", label: "Label", description: 'e.g. "Prayer"' },
                  { type: "image", name: "image", label: "Image" },
                  { type: "string", name: "questions", label: "Questions", list: true, ui: { component: "textarea" } },
                  { type: "string", name: "actionItems", label: "Action Items", list: true, ui: { component: "textarea" } },
                  {
                    type: "string",
                    name: "closingNote",
                    label: "Closing Note",
                    description: "Optional note shown below the discipline (e.g. alternatives to fasting).",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          // -------- holy week --------
          {
            type: "object",
            name: "holyWeek",
            label: "Holy Week",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "marqueeText",
                label: "Scrolling Banner Text",
                description: 'Short phrase that repeats infinitely across the banner, e.g. "HOLY WEEK AT GRACE"',
              },
              { type: "image", name: "image", label: "Image" },
              {
                type: "object",
                name: "services",
                label: "Services",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title }),
                },
                fields: [
                  { type: "string", name: "date", label: "Date", description: 'e.g. "March 27"' },
                  { type: "string", name: "title", label: "Title", description: 'e.g. "Maundy Thursday"' },
                  { type: "string", name: "time", label: "Time", description: 'e.g. "7:00 PM"' },
                  {
                    type: "string",
                    name: "body",
                    label: "Body",
                    description: "Use a blank line between paragraphs.",
                    ui: { component: "textarea" },
                  },
                  { type: "string", name: "bulletinLabel", label: "Bulletin Link Label" },
                  {
                    type: "image",
                    name: "bulletinFile",
                    label: "Bulletin (PDF)",
                    description: "Upload the bulletin PDF for this service.",
                  },
                ],
              },
            ],
          },
        ],
      },
      // -------- events --------
      {
        name: "event",
        label: "Events",
        path: "content/events",
        format: "json",
        defaultItem: () => ({
          featured: false,
          date: new Date().toISOString(),
        }),
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: false, // just use a string instead in case it's all day or multiple occurrences in one day
              parse: ((value: string) => {
                if (!value) return value;
                const d = new Date(value);
                if (isNaN(d.getTime())) return value;
                const utcMidnight = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
                return utcMidnight.toISOString();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              }) as any,
              format: ((value: string) => {
                if (!value) return value;
                const d = new Date(value);
                if (isNaN(d.getTime())) return value;
                return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              }) as any,
            },
            required: true,
          },
          {
            type: "string",
            name: "time",
            label: "Time",
            description: 'e.g. "8:00 AM & 10:30 AM" or "10:30 AM - 11:45 AM"',
          },
          {
            type: "string",
            name: "locationLabel",
            label: "Location Label",
            description: "e.g. Grace Evangelical Lutheran Church",
          },
          {
            type: "string",
            name: "location",
            label: "Location Address",
            description: "e.g. 2331 East 5th Place, Tulsa, OK",
          },
          {
            type: "string",
            name: "detail",
            label: "Detail",
            description: 'e.g. "Divine Service with Holy Communion"',
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Image",
          },
          {
            type: "rich-text",
            name: "content",
            label: "Page Content",
            description: 'Formatted text to describe the event.',
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
            description: "Displays on home page (limited to 6 events)",
          },
        ],
      },
      // -------- news & announcements --------
      {
        name: "newsItem",
        label: "News & Announcements",
        path: "content/news",
        format: "json",
        defaultItem: () => ({
          type: "news",
          date: new Date().toISOString(),
        }),
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "type",
            label: "Type",
            options: [
              { value: "news", label: "News" },
              { value: "announcement", label: "Announcement" },
            ],
            required: true,
            description: "Is this a news article or an announcement? (Determines where this goes)",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: false,
              parse: ((value: string) => {
                if (!value) return value;
                const d = new Date(value);
                if (isNaN(d.getTime())) return value;
                const utcMidnight = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
                return utcMidnight.toISOString();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              }) as any,
              format: ((value: string) => {
                if (!value) return value;
                const d = new Date(value);
                if (isNaN(d.getTime())) return value;
                return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              }) as any,
            },
            required: true,
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            description: "Short teaser shown in grids and cards.",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            description: "Optional thumbnail.",
          },
          {
            type: "rich-text",
            name: "content",
            label: "Content",
            description: "Full body of the news item or announcement.",
            required: true,
          },
        ],
      },
      // -------- ministries page --------
      {
        name: "ministriesPage",
        label: "Ministries Page",
        path: "content",
        format: "json",
        match: {
          include: "ministries",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/ministries",
        },
        fields: [
          // -------- hero --------
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow", description: 'e.g. "Get Involved"' },
              { type: "string", name: "headline", label: "Headline" },
              {
                type: "string",
                name: "intro",
                label: "Intro",
                ui: { component: "textarea" },
              },
              { type: "image", name: "backgroundImage", label: "Background Image" },
            ],
          },
          // -------- ministry cards --------
          {
            type: "object",
            name: "ministries",
            label: "Ministries",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label }),
            },
            fields: [
              { type: "string", name: "label", label: "Label", description: 'e.g. "Missions"', required: true },
              {
                type: "string",
                name: "summary",
                label: "Summary",
                description: "1-3 sentences shown on the card.",
                ui: { component: "textarea" },
                required: true,
              },
              { type: "image", name: "image", label: "Image" },
              {
                type: "string",
                name: "linkLabel",
                label: "Link Label",
                description: 'e.g. "Learn More" or "Sign Up"',
              },
              {
                type: "string",
                name: "linkHref",
                label: "Link URL",
                description: "Internal path (e.g. /ministries/missions) or external URL (e.g. a SignUpGenius link).",
              },
              {
                type: "boolean",
                name: "isExternal",
                label: "External Link",
                description: "Turn on if this opens an outside site (e.g. a signup form) rather than a page on our own site.",
              },
            ],
          },
        ],
      },
      // -------- ministries: community involvement --------
      {
        name: "communityInvolvementPage",
        label: "Community Involvement Page",
        path: "content",
        format: "json",
        match: {
          include: "community-involvement",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/ministries/community-involvement",
        },
        fields: [
          {
            type: "string",
            name: "pageTitle",
            label: "Page Title",
            description: 'e.g. "Community Involvement"',
            required: true,
          },
          {
            type: "image",
            name: "titleBackground",
            label: "Title Background",
          },
          {
            type: "object",
            name: "sections",
            label: "Sections",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.heading }),
            },
            fields: [
              { type: "string", name: "heading", label: "Heading", required: true },
              {
                type: "string",
                name: "body",
                label: "Body",
                description: "Use a blank line between paragraphs.",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "items",
                label: "Bullet Points",
                list: true,
                description: "Optional. Leave empty for a plain text section.",
              },
              { type: "image", name: "image", label: "Image" },
            ],
          },
        ],
      },
      // -------- ministries: missions --------
      {
        name: "missionsPage",
        label: "Missions Page",
        path: "content",
        format: "json",
        match: {
          include: "missions",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/ministries/missions",
        },
        fields: [
          {
            type: "string",
            name: "pageTitle",
            label: "Page Title",
            description: 'e.g. "Missions and Ministries"',
            required: true,
          },
          {
            type: "image",
            name: "headerBackgroundImage",
            label: "Header Background Image",
          },
          {
            type: "object",
            name: "lwml",
            label: "Lutheran Women in Mission",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "image", name: "logo", label: "Logo" },
              {
                type: "string",
                name: "body",
                label: "Body",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "supports",
                label: "What LWML Supports",
                list: true,
              },
              { type: "image", name: "image", label: "Image" },
            ],
          },
          {
            type: "string",
            name: "missionariesHeading",
            label: "Missionaries Section Heading",
            required: true,
          },
          {
            type: "object",
            name: "missionaries",
            label: "Missionaries We Help Support",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name }),
            },
            fields: [
              { type: "string", name: "name", label: "Name(s)", description: 'e.g. "Rev. James and Angela Sharp"', required: true },
              { type: "image", name: "photo", label: "Photo" },
              {
                type: "string",
                name: "bio",
                label: "Bio",
                description: "Use a blank line between paragraphs.",
                ui: { component: "textarea" },
              },
              { type: "string", name: "linkLabel", label: "Link Label", description: 'Optional, e.g. "See their webpage"' },
              { type: "string", name: "linkHref", label: "Link URL", description: "Optional external link for more info." },
            ],
          },
        ],
      },
      // -------- ministries: music --------
      {
        name: "musicPage",
        label: "Music Page",
        path: "content",
        format: "json",
        match: {
          include: "music",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/ministries/music",
        },
        fields: [
          {
            type: "string",
            name: "pageTitle",
            label: "Page Title",
            description: 'e.g. "Music"',
            required: true,
          },
          {
            type: "image",
            name: "headerBackgroundImage",
            label: "Header Background Image",
          },
          {
            type: "object",
            name: "musicMinistry",
            label: "Music Ministry",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "body",
                label: "Body",
                description: "Use a blank line between paragraphs.",
                ui: { component: "textarea" },
              },
              { type: "string", name: "contactName", label: "Contact Name", description: 'e.g. "Marjorie Hall, Parish Musician"' },
              { type: "string", name: "contactEmail", label: "Contact Email" },
              { type: "image", name: "image", label: "Image" },
            ],
          },
          {
            type: "object",
            name: "messiah",
            label: "Tulsa Area Lutheran Messiah",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "body",
                label: "Body",
                ui: { component: "textarea" },
              },
              { type: "string", name: "facebookLabel", label: "Facebook Link Label", description: 'e.g. "Find us on Facebook: @TulsaHandelsMessiah"' },
              { type: "string", name: "facebookHref", label: "Facebook Link URL" },
              { type: "image", name: "image", label: "Image" },
            ],
          },
        ],
      },
      // -------- ministries: st. andrew society --------
      {
        name: "stAndrewSocietyPage",
        label: "St. Andrew Society Page",
        path: "content",
        format: "json",
        match: {
          include: "st-andrew-society",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/ministries/st-andrew-society",
        },
        fields: [
          {
            type: "string",
            name: "pageTitle",
            label: "Page Title",
            description: 'e.g. "St. Andrew Society of Grace Lutheran Church"',
            required: true,
          },
          { type: "string", name: "established", label: "Established", description: 'e.g. "Est. 2019"' },
          { type: "image", name: "headerBackgroundImage", label: "Header Background Image" },
          {
            type: "object",
            name: "intro",
            label: "Intro",
            fields: [
              {
                type: "string",
                name: "body",
                label: "Body",
                description: "Use a blank line between paragraphs.",
                ui: { component: "textarea" },
              },
              { type: "image", name: "image", label: "Image" },
            ],
          },
          {
            type: "object",
            name: "responsibilities",
            label: "Responsibilities",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "items", label: "Items", list: true },
            ],
          },
          {
            type: "object",
            name: "benefits",
            label: "Benefits",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "items", label: "Items", list: true },
            ],
          },
          {
            type: "object",
            name: "expectations",
            label: "Behavioral Expectations While Serving",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "items", label: "Items", list: true },
            ],
          },
          {
            type: "object",
            name: "application",
            label: "Application",
            fields: [
              { type: "string", name: "linkLabel", label: "Link Label", description: 'e.g. "Application to Join"' },
              { type: "image", name: "file", label: "Application PDF" },
            ],
          },
        ],
      },

    ],
  },
});