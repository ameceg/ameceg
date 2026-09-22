import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Announcements } from "./collections/Announcements";
import { Events } from "./collections/Events";
import { OfficeBearers } from "./collections/OfficeBearers";
import { Members } from "./collections/Members";
import { Contact } from "./collections/Contact";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import { cloudinaryAdapter } from "./lib/cloudinaryAdapter";
import { Domains } from "./collections/Domain";
import { CommitteeMembers } from "./collections/CommitteeMembers";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Announcements,
    Events,
    OfficeBearers,
    Members,
    Contact,
    Domains,
    CommitteeMembers
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter,
          disableLocalStorage: true,
        },
      },
    }),
  ],
});
