import { isAdminOrEditor } from "@/access";
import type { CollectionConfig, Validate } from "payload";

const validateName: Validate<string> = (value) => {
  if (!value?.trim()) {
    return "Name is required";
  }

  if (value.trim().length < 2) {
    return "Name must be at least 2 characters";
  }

  if (value.trim().length > 100) {
    return "Name must be 100 characters or less";
  }

  return true;
};

const validatePhone: Validate<string> = (value) => {
  if (!value) return true;

  const phone = value.trim();

  if (!/^[+0-9()\-\s]{7,20}$/.test(phone)) {
    return "Please enter a valid phone number";
  }

  return true;
};

const validateSubject: Validate<string> = (value) => {
  if (!value?.trim()) {
    return "Subject is required";
  }

  if (value.trim().length < 3) {
    return "Subject must be at least 3 characters";
  }

  if (value.trim().length > 150) {
    return "Subject must be 150 characters or less";
  }

  return true;
};

const validateMessage: Validate<string> = (value) => {
  if (!value?.trim()) {
    return "Message is required";
  }

  if (value.trim().length < 10) {
    return "Message must be at least 10 characters";
  }

  if (value.trim().length > 5000) {
    return "Message must be 5000 characters or less";
  }

  return true;
};

export const Contact: CollectionConfig = {
  slug: "contact",

  admin: {
    useAsTitle: "subject",
    defaultColumns: ["name", "email", "subject", "status", "createdAt"],
  },

  access: {
    create: () => true,

    read: ({ req }) => {
      if (!req.user) return false;

      return isAdminOrEditor({ req });
    },

    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      validate: validateName,
    },

    {
      name: "email",
      type: "email",
      required: true,
    },

    {
      name: "phone",
      type: "text",
      validate: validatePhone,
    },

    {
      name: "subject",
      type: "text",
      required: true,
      validate: validateSubject,
    },

    {
      name: "message",
      type: "textarea",
      required: true,
      validate: validateMessage,
    },

    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        {
          label: "New",
          value: "new",
        },
        {
          label: "Read",
          value: "read",
        },
        {
          label: "Resolved",
          value: "resolved",
        },
      ],
    },
  ],
};