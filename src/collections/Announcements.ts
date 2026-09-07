import { isAdminOrEditor } from "@/access";
import type { CollectionConfig } from "payload";

export const Announcements: CollectionConfig = {
  slug: "announcements",

  admin: {
    useAsTitle: "title",
  },

  access: {
    read: ({ req }) => {
      if (req.user) return true;

      return {
        isPublished: {
          equals: true,
        },
      };
    },

    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },

  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === "create" && req.user) {
          data.author = req.user.id;
        }

        return data;
      },
    ],
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },

    {
      name: "slug",
      type: "text",
      unique: true,
      required: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            const slugSource = value || data?.title;

            if (!slugSource) return value;

            return slugSource
              .toString()
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "");
          },
        ],
      },
    },

    {
      name: "content",
      type: "richText",
      required: true,
    },

    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },

    {
      name: "publishedDate",
      type: "date",
      required: true,
    },

    {
      name: "isPublished",
      type: "checkbox",
      defaultValue: false,
    },

    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
  ],
};
