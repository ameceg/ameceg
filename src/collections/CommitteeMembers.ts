import { isAdminOrEditor } from "@/access";
import type { CollectionConfig, Validate } from "payload";

export const CommitteeMembers: CollectionConfig = {
  slug: "committee-members",

  admin: {
    useAsTitle: "member",
    defaultColumns: ["member", "domain", "position", "academicYear", "isActive"],
  },

  access: {
    read: ({ req }) => {
      if (req.user) return true;

      return {
        isActive: {
          equals: true,
        },
      };
    },

    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },

  fields: [
    {
      name: "member",
      type: "relationship",
      relationTo: "members",
      required: true,
    },

    {
      name: "domain",
      type: "relationship",
      relationTo: "domains",
      required: true,
    },

    {
      name: "position",
      type: "select",
      required: true,
      options: [
        {
          label: "Head",
          value: "head",
        },
        {
          label: "Junior Head",
          value: "junior-head",
        },
        {
          label: "Sub-Junior Head",
          value: "sub-junior-head",
        },
      ],
    },

    {
      name: "academicYear",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
        description: "Format: YYYY-YY, e.g. 2026-27",
      },
      validate: ((value) => {
        if (!value) return "Academic year is required";

        if (!/^\d{4}-\d{2}$/.test(value)) {
          return "Use the format YYYY-YY, e.g. 2026-27";
        }

        const [start, end] = value.split("-").map(Number);

        if (end !== (start + 1) % 100) {
          return "Enter a valid academic year";
        }

        return true;
      }) satisfies Validate<string>,
    },

    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};