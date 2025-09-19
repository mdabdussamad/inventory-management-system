import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 1,
      fileTypes: ["image/png", "image/jpeg"],
    },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.fileUrl, metadata);
    return { imageUrl: file.fileUrl };
  }),
};
