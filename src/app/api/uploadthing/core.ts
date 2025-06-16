import { getUserData } from '@/server/get-user-data';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const currUser = async () => {
  const user = await getUserData();
  return {
    userId: user?.id,
  };
};

export const ourFileRouter = {
  workspaceImage: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(() => currUser())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Uploaded file:', file);
      console.log('Upload complete for userId:', metadata.userId);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
