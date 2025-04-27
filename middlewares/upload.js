import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const tempDir = path.join(process.cwd(), "temp");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, tempDir),
  filename: (_req, file, cb) => cb(null, file.originalname),
});

export default multer({ storage });
