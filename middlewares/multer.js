const multer = require('multer');
const path = require('path');

const tempPath = path.join(process.cwd(), 'temp');
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
