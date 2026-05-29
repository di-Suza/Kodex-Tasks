import multer from "multer";
import { AppError } from "../utils/AppError.js";



const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // accept only image files
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Please attach only image files!", 400), false);
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: fileFilter,
});
