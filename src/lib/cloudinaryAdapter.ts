import cloudinary from "./cloudinary";

type AdapterArgs = {
  collection: any;
  prefix?: string;
};

export const cloudinaryAdapter = ({ prefix }: AdapterArgs) => ({
  name: "cloudinary",

  fields: [
    {
      name: "cloudinaryPublicId",
      type: "text" as const,
      admin :{
        hidden : true,
      },
    },
    {
      name: "cloudinaryResourceType",
      type: "text" as const,
      admin :{
        hidden :true, 
      },
    },
  ],

  async handleUpload({
    file,
  }: {
    file: {
      buffer: Buffer;
      filename: string;
      filesize: number;
      mimeType: string;
    };
  }) {
    const result = await new Promise<any>((resolve, reject) => {
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

          resolve(result);
        },
      );

      uploadStream.end(file.buffer);
    });

    return {
      cloudinaryPublicId: result.public_id,
      cloudinaryResourceType: result.resource_type,
      url: result.secure_url,
    };
  },

  async handleDelete({ doc }: { doc: any }) {
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

  generateURL({ data }: { data: any; filename: string; prefix?: string }) {
    if (!data.cloudinaryPublicId) {
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

  staticHandler() {
    return new Response("Not Found", { status: 404 });
  },
});
