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
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/layout-preview",
        },
        fields: [
          // -------- navbar --------
          {
            type: "object",
            name: "navbar",
            label: "Navbar",
            fields: [
              {
                type: "string",
                name: "donationUrl",
                label: "Donation Button URL",
              },
              {
                type: "string",
                name: "facebookUrl",
                label: "Facebook URL",
              },
            ],
          },
          // -------- footer --------
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "addressLine1", label: "Address Line 1" },
              { type: "string", name: "addressLine2", label: "Address Line 2" },
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
              { type: "string", name: "email", label: "Email", description: "Email address shown" },
              { type: "string", name: "emailBcc", label: "Email BCC", description: "Email BCC" },
              { type: "string", name: "emailSubject", label: "Email Subject Autofill", description: "Default email subject to autofill" },
              { type: "string", name: "phone", label: "Phone" },
              { type: "string", name: "facebookUrl", label: "Facebook URL" },
              { type: "string", name: "donationUrl", label: "Donation URL" },
            ],
          },
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
                name: "address",
                label: "Address",
                description: 'e.g. "2331 E 5th Pl, Tulsa"',
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
      // -------- events --------
      {
        name: "event",
        label: "Events",
        path: "content/events",
        format: "json",
        defaultItem: () => ({ featured: false }),
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
            required: true,
          },
          {
            type: "string",
            name: "detail",
            label: "Detail",
            description: 'e.g. "Divine Service with Holy Communion · 8:00 AM & 10:30 AM"',
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
            description: "Shows a highlighted date badge on this event",
          },
        ],
      },
    ],
  },
});