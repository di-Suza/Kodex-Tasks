import imagekit from "../configs/storage.js";

export const uploadImageToImageKit = async (file, folder) => {
  // Upload single image buffer to ImageKit
  const uploadedImage = await imagekit.upload({
    file: file.buffer.toString("base64"),
    fileName: `${Date.now()}-${file.originalname}`,
    folder,
  });

  return {
    url: uploadedImage.url,
    fileId: uploadedImage.fileId,
  };
};
