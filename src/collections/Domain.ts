import { isAdminOrEditor } from "@/access";
import type { CollectionConfig, Validate } from "payload";

export const Domains: CollectionConfig = {
  slug: "domains",

  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "isActive", "updatedAt"],
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
      name: "name",
      type: "text",
      required: true,
      unique: true,
      validate: ((value) => {
        if (!value?.trim()) {
          return "Domain name is required";
        }

        return true;
      }) satisfies Validate<string>,
    },

    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly identifier, e.g. website-and-magazine",
      },
      validate: ((value) => {
        if (!value?.trim()) {
          return "Slug is required";
        }

        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
          return "Use lowercase letters, numbers, and hyphens only";
        }

        return true;
      }) satisfies Validate<string>,
    },

    {
      name: "description",
      type: "textarea",
      admin: {
        description: "Short description of the domain.",
      },
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