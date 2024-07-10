import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete ");
 
      console.log("file url", file.url);
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return;
    }),
    mediaPost: f({
        image: { maxFileSize: "2MB", maxFileCount: 4 },
        video: { maxFileSize: "256MB", maxFileCount: 1 },
      })
        .onUploadComplete((data) => console.log("file", data)),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;