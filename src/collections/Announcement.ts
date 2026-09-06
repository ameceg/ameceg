import type { CollectionConfig } from 'payload'

export const Announcements: CollectionConfig = {
  slug: 'announcements',

  admin: {
    useAsTitle: 'title',
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'content',
      type: 'richText',
      required: true,
    },

    {
      name: 'publishedDate',
      type: 'date',
      required: true,
    },

    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}