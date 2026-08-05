import { defineConfig } from "tinacms";
import { TagsAutocomplete } from "@/components/tina/TagsAutocomplete";
import type { Template } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const RESERVED_SLUGS = [
  "api",
  "admin",
  "fonts",
  "images",
  "about",
  "announcements",
  "calendar",
  "events",
  "fasting",
  "ministries",
  "news",
  "photos",
  "worship",
  "youth",
  "glcdeposits"
  // IMPORTANT: add new slugs here as new pages are added to the codebase
];

// shared block templates, reused at top level and inside section groups
function createBlockTemplates(): Template[] {
  return [
    {
      name: "heroBlock",
      label: "Hero (Home)",
      fields: [
        {type: "image", name: "backgroundImage", label: "Background Image"},
        {type: "string", name: "title", label: "Title"},
        {
          type: "string",
          name: "headline",
          label: "Headline",
          description: "Use \"|\" to break into separate lines",
        },
        {type: "string", name: "subtext", label: "Subtext", ui: {component: "textarea"}},
        {
          type: "object",
          name: "ctas",
          label: "Buttons",
          list: true,
          fields: [
            {type: "string", name: "label", label: "Label"},
            {type: "string", name: "href", label: "URL"},
            {
              type: "string",
              name: "style",
              label: "Style",
              options: ["garnetSolid", "brassSolid", "outlineOnDark"],
            },
          ],
        },
      ],
    },
    {
      name: "pageHeroBlock",
      label: "Hero (Page)",
      fields: [
        {type: "image", name: "backgroundImage", label: "Background Image"},
        {type: "string", name: "eyebrow", label: "Eyebrow"},
        {type: "string", name: "headline", label: "Headline"},
        {type: "string", name: "intro", label: "Intro", ui: {component: "textarea"}},
      ],
    },
    {
      name: "textImageBlock",
      label: "Text + Image",
      fields: [
        {type: "string", name: "heading", label: "Heading"},
        {type: "rich-text", name: "body", label: "Body"},
        {type: "image", name: "image", label: "Image"},
        // -------- image rounding field --------
        {
          type: "string",
          name: "imageRounding",
          label: "Image Roundedness",
          options: [
            {value: "none", label: "None"},
            {value: "sm", label: "Slight"},
            {value: "lg", label: "Medium"},
            {value: "2xl", label: "Large"},
            {value: "4xl", label: "Extra Large"},
            {value: "full", label: "Circle Crop"},
          ],
        },
        {
          type: "string",
          name: "layout",
          label: "Layout",
          options: ["imageLeft", "imageRight", "textOnly"],
        },
        {
          type: "string",
          name: "background",
          label: "Background",
          options: ["agedPaper", "paper", "solidStone", "solidWhite", "vestmentDark", "transparent"],
        },
        {
          type: "object",
          name: "cta",
          label: "Button (optional)",
          fields: [
            {type: "string", name: "label", label: "Label"},
            {type: "string", name: "href", label: "URL"},
            {
              type: "string",
              name: "style",
              label: "Style",
              options: ["garnetSolid", "brassSolid", "outlineOnDark"],
            },
          ],
        },
      ],
    },
    {
      name: "quoteBlock",
      label: "Quote",
      fields: [
        {type: "string", name: "quote", label: "Quote", ui: {component: "textarea"}},
        {type: "string", name: "citation", label: "Citation"},
        {
          type: "string",
          name: "background",
          label: "Background",
          options: ["agedPaper", "paper", "solidStone", "solidWhite", "vestmentDark", "transparent"],
        },
      ],
    },
    {
      name: "cardsBlock",
      label: "Card Grid",
      fields: [
        {type: "string", name: "heading", label: "Heading"},
        {
          type: "object",
          name: "cards",
          label: "Cards",
          list: true,
          fields: [
            {type: "string", name: "label", label: "Label"},
            {type: "string", name: "body", label: "Body"},
            {
              type: "string",
              name: "icon",
              label: "Icon",
              required: true,
              options: [
                {value: "book", label: "Book"},
                {value: "bookOpen", label: "Open Book"},
                {value: "calendar", label: "Calendar"},
                {value: "clock", label: "Clock"},
                {value: "coin", label: "Coin"},
                {value: "heart", label: "Heart"},
                {value: "mapPin", label: "Map Pin"},
                {value: "sun", label: "Sun"},
                {value: "users", label: "Users"},
                {value: "world", label: "World"},
              ],
            },
            {type: "image", name: "image", label: "Image"},
          ],
        },
        {
          type: "string",
          name: "background",
          label: "Background",
          options: ["agedPaper", "paper", "solidStone", "solidWhite", "vestmentDark", "transparent"],
        },
      ],
    },
    {
      name: "ctaBlock",
      label: "Call to Action",
      fields: [
        {type: "string", name: "heading", label: "Heading"},
        {type: "string", name: "linkLabel", label: "Button Label"},
        {type: "string", name: "linkHref", label: "Button URL"},
        {
          type: "string",
          name: "style",
          label: "Style",
          options: ["garnetSolid", "brassSolid", "outlineOnDark"],
        },
        {
          type: "string",
          name: "background",
          label: "Background",
          options: ["agedPaper", "paper", "solidStone", "solidWhite", "vestmentDark", "transparent"],
        },
      ],
    },
    {
      name: "imageBlock",
      label: "Image Only",
      fields: [
        {type: "image", name: "image", label: "Image"},
        {type: "string", name: "alt", label: "Alt Text", description: "Describe the image for accessibility."},
        {
          type: "string",
          name: "maxWidth",
          label: "Max Width",
          options: [
            {value: "sm", label: "Small"},
            {value: "md", label: "Medium"},
            {value: "lg", label: "Large"},
            {value: "full", label: "Full Width"},
          ],
        },
        {
          type: "string",
          name: "rounding",
          label: "Image Roundedness",
          options: [
            {value: "none", label: "None"},
            {value: "sm", label: "Slight"},
            {value: "lg", label: "Medium"},
            {value: "2xl", label: "Large"},
            {value: "4xl", label: "Extra Large"},
            {value: "full", label: "Circle Crop"},
          ],
        },
        {
          type: "string",
          name: "background",
          label: "Background",
          options: ["agedPaper", "paper", "solidStone", "solidWhite", "vestmentDark", "transparent"],
        },
      ],
    },
    {
      name: "embedBlock",
      label: "Embedded Form",
      fields: [
        {type: "string", name: "heading", label: "Heading (optional)"},
        {
          type: "rich-text",
          name: "bodyRichText",
          label: "Paragraph (optional)",
          description: "Optional text shown above the embedded form.",
        },
        {
          type: "string",
          name: "embedCode",
          label: "Embed Code",
          description:
            "Paste either an &lt;iframe&gt; embed or a &lt;script&gt; embed (e.g. Cognito Forms' seamless.js snippet). Paste it exactly as given.",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "maxWidth",
          label: "Max Width",
          options: [
            {value: "sm", label: "Small"},
            {value: "md", label: "Medium"},
            {value: "lg", label: "Large"},
            {value: "full", label: "Full Width"},
          ],
        },
        {
          type: "string",
          name: "background",
          label: "Background",
          options: ["agedPaper", "paper", "solidStone", "solidWhite", "vestmentDark", "transparent"],
        },
      ],
    },
  ];
}

// section group block, wraps a layout preset around N nested slots
const sectionGroupBlock: Template = {
  name: "sectionGroupBlock",
  label: "Section Group",
  fields: [
    {
      type: "string",
      name: "groupLayout",
      label: "Layout",
      required: true,
      options: [
        { value: "sidebarLeft", label: "Sidebar Left (narrow left, wide right)" },
        { value: "sidebarRight", label: "Sidebar Right (wide left, narrow right)" },
        { value: "twoColEven", label: "Two Columns (even)" },
        { value: "threeTopBottomSplit", label: "Three: One on Top, Two Below" },
        { value: "threeLeftRightSplit", label: "Three: One on Left, Two Stacked Right" },
      ],
    },
    {
      type: "string",
      name: "background",
      label: "Background",
      options: ["agedPaper", "paper", "solidStone", "solidWhite", "vestmentDark", "transparent"],
    },
    {
      type: "object",
      name: "slots",
      label: "Slots",
      list: true,
      description:
        "Add one slot per area in the chosen layout (e.g. 2 slots for Sidebar Left, 3 for the three-part layouts). Order matters, top-left slot first.",
      fields: [
        {
          type: "object",
          name: "sections",
          label: "Sections in this Slot",
          list: true,
          templates: createBlockTemplates(),
        },
      ],
    },
  ],
};

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
            type: "image",
            name: "favicon",
            label: "Favicon",
            description: "The icon that appears next to tab title and in bookmarks in the browser. Prefer square aspect ratio.",
            required: true,
          },
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
          {
            type: "string",
            name: "googleCalendarId",
            label: "Google Calendar ID",
            description:
              "Paste the Google Calendar ID for the master calendar. This will appear on the Calendar page.",
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
              {
                type: "string",
                name: "icon",
                label: "Icon",
                required: true,
                options: [
                  { value: "book", label: "Book" },
                  { value: "bookOpen", label: "Open Book" },
                  { value: "calendar", label: "Calendar" },
                  { value: "clock", label: "Clock" },
                  { value: "coin", label: "Coin" },
                  { value: "heart", label: "Heart" },
                  { value: "mail", label: "Mail" },
                  { value: "mapPin", label: "Map Pin" },
                  { value: "sun", label: "Sun" },
                  { value: "users", label: "Users" },
                  { value: "world", label: "World" },
                ],
              },
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
      // -------- history page --------
      {
        name: "historyPage",
        label: "History Page",
        path: "content",
        format: "json",
        match: {
          include: "history",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/history",
        },
        fields: [
          { type: "string", name: "eyebrow", label: "Eyebrow", description: 'e.g. "History"' },
          { type: "string", name: "headline", label: "Headline", required: true },
          { type: "image", name: "headerBackgroundImage", label: "Header Background Image" },
          {
            type: "object",
            name: "sections",
            label: "Sections",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.heading || item?.layout }),
            },
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
                description: "Leave blank to continue the previous section visually with no new heading.",
              },
              {
                type: "string",
                name: "headingSize",
                label: "Heading Size",
                options: ["large", "medium", "small"],
              },
              {
                type: "string",
                name: "body",
                label: "Body",
                description: "Use a blank line between paragraphs.",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "layout",
                label: "Layout",
                options: [
                  "textOnly",
                  "textWithSidebarImages",
                  "textWithSideImage",
                  "imageRow",
                  "timeline",
                ],
                required: true,
              },
              {
                type: "object",
                name: "sideImages",
                label: "Images",
                description: "Used by \"Text with Sidebar Images\", \"Text with Side Image\" (first image only), and \"Image Row\".",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.caption }),
                },
                fields: [
                  { type: "image", name: "image", label: "Image" },
                  { type: "string", name: "caption", label: "Caption" },
                  {
                    type: "string",
                    name: "width",
                    label: "Width (Image Row only)",
                    options: ["half", "full"],
                    description: "How wide this image is within its row.",
                  },
                ],
              },
              {
                type: "object",
                name: "timelineItems",
                label: "Timeline Items",
                description: "Only used by the \"Timeline\" layout.",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.year }),
                },
                fields: [
                  { type: "string", name: "year", label: "Year", description: 'e.g. "1906" or "1968 - January 18"' },
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
              { type: "string", name: "eyebrow", label: "Eyebrow", description: 'e.g. "Worship"' },
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
          // -------- sunday worship times --------
          {
            type: "object",
            name: "worshipTimes",
            label: "Worship Times",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "times",
                label: "Times",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label || "Time" }),
                },
                fields: [
                  { type: "string", name: "label", label: "Label", description: 'e.g. "Worship" or "Sunday School & Bible Study"' },
                  { type: "string", name: "value", label: "Value", description: 'e.g. "8:00 & 10:30 AM"' },
                ],
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
          // -------- wednesdays / grace night --------
          {
            type: "object",
            name: "graceNight",
            label: "Wednesday / Grace Night",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "times",
                label: "Times",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label || "Time" }),
                },
                fields: [
                  { type: "string", name: "label", label: "Label", description: 'e.g. "Service Time" or "When"' },
                  { type: "string", name: "value", label: "Value", description: 'e.g. "6:15 PM" or "September through May"' },
                ],
              },
              {
                type: "string",
                name: "body",
                label: "Body",
                description: "Use a blank line between paragraphs.",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "linkLabel",
                label: "Grace Night Link Label",
              },
              {
                type: "string",
                name: "linkHref",
                label: "Grace Night Link URL",
              },
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
              { type: "string", name: "link2Label", label: "Link 2 Label", description: 'e.g. "View Church Calendar"' },
              { type: "string", name: "link2Href", label: "Link 2 URL" },
              { type: "image", name: "image", label: "Image" },
            ],
          },
          // -------- directions --------
          {
            type: "object",
            name: "directions",
            label: "Directions",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow", description: 'e.g. "Directions"' },
              { type: "string", name: "serviceNote", label: "Service Note", description: 'e.g. "Check calendar for schedule in case a service has been canceled or rescheduled."' },
              { type: "string", name: "linkLabel", label: "Link Label" },
              { type: "string", name: "linkHref", label: "Link URL" },
            ],
          },
          // -------- preparing for lent --------
          {
            type: "object",
            name: "lent",
            label: "Preparing for Lent",
            fields: [
              { type: "boolean", name: "visible", label: "Visible" },
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
              { type: "boolean", name: "visible", label: "Visible" },
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
          featured: true,
          recurring: false,
          seasonal: false,
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
            type: "string",
            name: "eventType",
            label: "Event Type",
            ui: {
              component: "select",
            },
            options: ["Service", "Event"],
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: TagsAutocomplete,
            },
          },
          {
            type: "image",
            name: "image",
            label: "Image",
          },
          {
            type: "string",
            name: "liveStreamLink",
            label: "Live Stream Link",
            description: 'Optional link to service or event live stream',
          },
          {
            type: "rich-text",
            name: "content",
            label: "Page Content",
            description: 'Formatted text to describe the event.',
          },
          {
            type: "boolean",
            name: "recurring",
            label: "Recurring Weekly",
            description:
              "Turn on for events that repeat every week (e.g. Grace Night). The Date field becomes an anchor used only to determine the day of week; the site always shows just the next upcoming occurrence.",
          },
          {
            type: "boolean",
            name: "seasonal",
            label: "Seasonal",
            description:
              "Turn on if this recurring event only happens part of the year (e.g. Sept-May). The Season Start/End dates repeat every year based on month and day only.",
          },
          {
            type: "datetime",
            name: "seasonStart",
            label: "Season Start",
            description: "Month and day only matter, e.g. September 1. The year is ignored and repeats annually.",
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: false,
            },
          },
          {
            type: "datetime",
            name: "seasonEnd",
            label: "Season End",
            description: "Month and day only matter, e.g. May 31. The year is ignored and repeats annually.",
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: false,
            },
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
            description: "Displays on home page (limited to 6 events) (recommended for services and major events)",
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
              { type: "string", name: "facebookLabel", label: "Link Label", description: 'e.g. "Visit website: tulsamessiah.org"' },
              { type: "string", name: "facebookHref", label: "Link URL" },
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
      // -------- fasting page --------
      {
        name: "fastingPage",
        label: "Fasting Page",
        path: "content",
        format: "json",
        match: {
          include: "fasting",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/fasting",
        },
        fields: [
          {
            type: "string",
            name: "pageTitle",
            label: "Page Title",
            description: 'e.g. "Fasting Guidelines"',
            required: true,
          },
          { type: "image", name: "headerBackgroundImage", label: "Header Background Image" },
          {
            type: "string",
            name: "intro",
            label: "Intro",
            description: "Use a blank line between paragraphs.",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "guideDownload",
            label: "Full Guide Download",
            fields: [
              { type: "string", name: "label", label: "Label", description: 'e.g. "Download the Full Fasting Guide"' },
              { type: "image", name: "file", label: "Guide PDF" },
            ],
          },
          {
            type: "object",
            name: "definitions",
            label: "Definitions",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "terms",
                label: "Terms",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.term }),
                },
                fields: [
                  { type: "string", name: "term", label: "Term", description: 'e.g. "Fast" or "Abstain"' },
                  { type: "string", name: "definition", label: "Definition", list: true, description: "One item per line/sub-point." },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "rules",
            label: "Lenten Fasting Rules",
            fields: [
              { type: "string", name: "heading", label: "Heading", description: 'e.g. "Lent"' },
              {
                type: "object",
                name: "rows",
                label: "Rows",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label }),
                },
                fields: [
                  { type: "string", name: "label", label: "Label", description: 'e.g. "Abstinence", "Fasting", "Special", "Exceptions"' },
                  { type: "string", name: "detail", label: "Detail" },
                ],
              },
            ],
          },
        ],
      },
      // -------- youth life page --------
      {
        name: "youthPage",
        label: "Youth Page",
        path: "content",
        format: "json",
        match: { include: "youth" },
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/youth",
        },
        fields: [
          {
            type: "string",
            name: "heading",
            label: "Heading",
            description: 'e.g. "Youth"',
          },
          {
            type: "image",
            name: "headerBackgroundImage",
            label: "Header Background Image",
          },
          {
            type: "rich-text",
            name: "intro",
            label: "Intro",
            description: "Short intro paragraph, e.g. contact info for the Youth Director.",
          },
          {
            type: "string",
            name: "eventsTag",
            label: "Events Tag",
            description: 'The tag used to filter events shown in the upcoming events section, e.g. "youth"',
          },

          // -------- summer gathering --------
          {
            type: "object",
            name: "summerGathering",
            label: "Summer Gathering",
            description: "Editable section for the current year's big summer trip (Higher Things, National Youth Gathering, etc).",
            fields: [
              { type: "boolean", name: "show", label: "Show this section" },
              { type: "string", name: "heading", label: "Heading", description: 'e.g. "2027 Higher Things Conference"' },
              { type: "string", name: "subheading", label: "Subheading", description: "Location/date line" },
              {
                type: "rich-text",
                name: "body",
                label: "Body",
              },
              { type: "image", name: "image", label: "Image" },
            ],
          },

          // -------- photo gallery --------
          {
            type: "object",
            name: "gallery",
            label: "Photo Gallery",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.caption || "Photo" }),
            },
            fields: [
              { type: "image", name: "image", label: "Image", required: true },
              { type: "string", name: "caption", label: "Caption (optional)" },
            ],
          },

          // -------- program sections --------
          {
            type: "object",
            name: "programs",
            label: "Youth Program Sections",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Section" }),
            },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "rich-text", name: "body", label: "Body" },
            ],
          },
        ],
      },
      // -------- sign-up page --------
      {
        name: "signUpPage",
        label: "Sign-Up Page",
        path: "content",
        format: "json",
        match: {
          include: "sign-up",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/sign-up",
        },
        fields: [
          {
            type: "string",
            name: "pageTitle",
            label: "Page Title",
            description: 'e.g. "Sign Up"',
            required: true,
          },
          {
            type: "string",
            name: "intro",
            label: "Intro",
            description: "Optional short intro shown above the list of sign-ups.",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "emptyMessage",
            label: "Empty State Message",
            description: "Shown when there are no sign-up links.",
          },
          {
            type: "object",
            name: "signUps",
            label: "Sign-Ups",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label }),
            },
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              {
                type: "string",
                name: "summary",
                label: "Summary",
                ui: { component: "textarea" },
              },
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "linkLabel", label: "Link Label", description: 'e.g. "Sign Up"' },
              { type: "string", name: "linkHref", label: "Link URL" },
              {
                type: "boolean",
                name: "isExternal",
                label: "External Link",
                description: "Turn on if this opens an outside site (e.g. SignUpGenius) rather than a page on our own site.",
              },
            ],
          },
        ],
      },
      // -------- Custom Page Builder --------
      {
        name: "sitePage",
        label: "Pages",
        path: "content/pages",
        format: "json",
        ui: {
          beforeSubmit: async ({ form, values }) => {
            console.log("SLUG_CHECK_V3_MARKER");
            const slug = (values.slug ?? "").toString().trim().toLowerCase();
            if (!slug) return values;

            const { default: client } = await import("./__generated__/client");

            let result;
            try {
              result = await client.queries.sitePageConnection({
                filter: { slug: { eq: slug } },
              });
            } catch (err) {
              const message = err instanceof Error ? err.message : String(err);
              console.error("[slug-check] query threw:", message, err);
              throw new Error(`Slug check failed: ${message}`);
            }

            if (!result?.data?.sitePageConnection) {
              console.error("[slug-check] no data returned:", result);
              throw new Error("Slug check returned no data - please try again.");
            }

            const currentId = form.id;
            const conflict = result.data.sitePageConnection.edges?.find(
              (edge) => edge?.node?._sys.path !== currentId
            );

            if (conflict) {
              throw new Error(`The slug "${slug}" is already used by another page.`);
            }

            return values;
          },
        },
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            description: "e.g. \"higher-things-2026\" becomes /higher-things-2026",
            required: true,
            ui: {
              validate: (value) => {
                if (!value) return;

                const slug = value.trim().toLowerCase();
                const firstSegment = slug.split("/")[0];

                if (RESERVED_SLUGS.includes(firstSegment)) {
                  return `"${firstSegment}" is a reserved route and can't be used as a slug.`;
                }

                return undefined;
              },
            },
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["draft", "published"],
            required: true,
          },
          {
            type: "boolean",
            name: "passwordProtected",
            label: "Password Protected",
            description:
              "⚠️ Do NOT include sensitive information (including sensitive form embed code) anywhere on this page even while this is enabled. This page's content is stored in a public GitHub repository and is visible to anyone on the internet, password protection only hides it from site visitors, not from the CMS/GitHub itself. For content that must stay fully private, contact the developer, Daniel Stelljes, instead.",
          },
          {
            type: "object",
            name: "schedule",
            label: "Scheduling (optional)",
            fields: [
              { type: "datetime", name: "publishAt", label: "Publish Starting" },
              { type: "datetime", name: "unpublishAt", label: "Unpublish After" },
            ],
          },
          {
            type: "object",
            name: "sections",
            label: "Page Sections",
            list: true,
            templates: [...createBlockTemplates(), sectionGroupBlock],
          },
        ],
      }

    ],
  },
});
