import multer from "multer";
import { AppError } from "../utils/appError.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // accept only image files
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "Please attach only image files!"), false);
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: fileFilter,
});
