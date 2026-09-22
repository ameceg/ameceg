import type {
  CollectionConfig,
  FileData,
  PayloadRequest,
  TypeWithID,
} from "payload";
import cloudinary from "./cloudinary";

type AdapterArgs = {
  collection: CollectionConfig;
  prefix?: string;
};

type UploadFile = {
  buffer: Buffer;
  filename: string;
  filesize: number;
  mimeType: string;
};

type CloudinaryMediaData = FileData &
  TypeWithID & {
    cloudinaryPublicId?: string | null;
    cloudinaryResourceType?: string | null;
  };

type CloudinaryUploadResult = {
  public_id: string;
  resource_type: string;
  secure_url: string;
};

export const cloudinaryAdapter = ({ prefix }: AdapterArgs) => ({
  name: "cloudinary",

  fields: [
    {
      name: "cloudinaryPublicId",
      type: "text" as const,
      admin: {
        hidden: true,
      },
    },
    {
      name: "cloudinaryResourceType",
      type: "text" as const,
      admin: {
        hidden: true,
      },
    },
  ],

  async handleUpload({ file }: { file: UploadFile }) {
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: prefix || "ameceg",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            if (!result) {
              reject(new Error("Cloudinary upload returned no result"));
              return;
            }

            resolve(result);
          },
        );

        uploadStream.end(file.buffer);
      },
    );

    return {
      cloudinaryPublicId: result.public_id,
      cloudinaryResourceType: result.resource_type,
      url: result.secure_url,
    };
  },

  async handleDelete({
    doc,
  }: {
    collection: CollectionConfig;
    doc: CloudinaryMediaData;
    filename: string;
    req: PayloadRequest;
  }) {
    if (!doc.cloudinaryPublicId) return;

    await cloudinary.uploader.destroy(doc.cloudinaryPublicId, {
      resource_type:
        doc.cloudinaryResourceType === "video" ||
        doc.cloudinaryResourceType === "raw"
          ? doc.cloudinaryResourceType
          : "image",
      type: "upload",
      invalidate: true,
    });
  },

  generateURL({
    data,
  }: {
    collection: CollectionConfig;
    data: CloudinaryMediaData;
    filename: string;
    prefix?: string;
  }) {
    if (!data.cloudinaryPublicId) {
      if (!data.url) {
        throw new Error("Media URL is missing");
      }

      return data.url;
    }

    return cloudinary.url(data.cloudinaryPublicId, {
      secure: true,
      resource_type:
        data.cloudinaryResourceType === "video" ||
        data.cloudinaryResourceType === "raw"
          ? data.cloudinaryResourceType
          : "image",
    });
  },

  staticHandler(
    _req: PayloadRequest,
    _args: {
      doc?: TypeWithID;
      headers?: Headers;
      params: {
        clientUploadContext?: unknown;
        collection: string;
        filename: string;
        prefix?: string;
      };
    },
  ) {
    void _req;
    void _args;

    return new Response("Not Found", { status: 404 });
  },
});
