const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

function ensureUploadDir() {
  const dir = path.resolve(config.upload.dir);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function getExt(filename) {
  return path.extname(filename || '').toLowerCase();
}

function saveUpload(file, type = 'image') {
  if (!file) throw new Error('未上传文件');
  const ext = getExt(file.originalname || file.name);
  const allowed = type === 'doc'
    ? [...config.upload.allowedImage, ...config.upload.allowedDoc]
    : config.upload.allowedImage;
  if (!allowed.includes(ext)) throw new Error('不允许的文件类型');
  if (file.size > config.upload.maxSize) throw new Error('文件过大');

  const dir = ensureUploadDir();
  const name = `${Date.now()}_${uuidv4().slice(0, 8)}${ext}`;
  const target = path.join(dir, name);
  const buffer = file.buffer || fs.readFileSync(file.path);
  fs.writeFileSync(target, buffer);
  return `/uploads/${name}`;
}

module.exports = { ensureUploadDir, saveUpload, getExt };
