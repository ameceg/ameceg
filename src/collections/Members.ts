import { isAdminOrEditor } from "@/access";
import type { CollectionConfig, Validate } from "payload";

export const Members: CollectionConfig = {
  slug: "members",

  admin: {
    useAsTitle: "name",
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
    },

    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
    },

    {
      name: "bio",
      type: "richText",
    },

    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },

    {
      name: "socialLinks",
      type: "array",
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          options: [
            { label: "LinkedIn", value: "linkedin" },
            { label: "Instagram", value: "instagram" },
            { label: "GitHub", value: "github" },
            { label: "X", value: "x" },
            { label: "Facebook", value: "facebook" },
            { label: "YouTube", value: "youtube" },
            { label: "Other", value: "other" },
          ],
        },

        {
          name: "url",
          type: "text",
          required: true,
          validate: ((value) => {
            if (!value) return "URL is required";

            try {
              new URL(value);
              return true;
            } catch {
              return "Please enter a valid URL";
            }
          }) satisfies Validate<string>,
        },
      ],
    },
  ],
};
