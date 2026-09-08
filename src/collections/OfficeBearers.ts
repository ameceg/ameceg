
import { isAdminOrEditor } from "@/access";
import type { CollectionConfig, Validate } from "payload";

export const OfficeBearers: CollectionConfig = {
  slug: "office-bearers",

  admin: {
    useAsTitle: "academicYear",
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
      name: "position",
      type: "select",
      required: true,
      options: [
        { label: "President", value: "president" },
        { label: "Treasurer", value: "treasurer" },

        {
          label: "General Secretary - Male",
          value: "general-secretary-male",
        },
        {
          label: "General Secretary - Female",
          value: "general-secretary-female",
        },

        {
          label: "Joint Secretary - Male",
          value: "joint-secretary-male",
        },
        {
          label: "Joint Secretary - Female",
          value: "joint-secretary-female",
        },
        {
          label: "Joint Secretary - PG",
          value: "joint-secretary-pg",
        },

        {
          label: "Assistant Secretary - Male",
          value: "assistant-secretary-male",
        },
        {
          label: "Assistant Secretary - Female",
          value: "assistant-secretary-female",
        },

        { label: "Domain Head", value: "domain-head" },
        { label: "Junior Head", value: "junior-head" },
        { label: "Sub-Junior Head", value: "sub-junior-head" },
      ],
    },

    {
      name: "domain",
      type: "text",
      admin: {
        description:
          "Required for Domain Head, Junior Head, and Sub-Junior Head positions.",
      },
      validate: ((value, { siblingData }) => {
        const domainPositions = [
          "domain-head",
          "junior-head",
          "sub-junior-head",
        ];

        if (domainPositions.includes(siblingData?.position)) {
          if (!value?.trim()) {
            return "Domain is required for domain leadership positions";
          }
        }

        return true;
      }) satisfies Validate<string>,
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
      name: "displayOrder",
      type: "number",
      required: true,
      min: 1,
    },

    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
