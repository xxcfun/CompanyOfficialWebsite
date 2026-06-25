require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  env: process.env.NODE_ENV || "development",
  db: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    database: process.env.DB_NAME || "kongchuang_website",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "xxcfun159357",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "kongchuang_jwt_secret",
    expiresIn: process.env.JWT_EXPIRES || "7d",
  },
  upload: {
    dir: process.env.UPLOAD_DIR || "./uploads",
    maxSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 10 * 1024 * 1024,
    allowedImage: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    allowedDoc: [".pdf", ".doc", ".docx", ".zip"],
  },
  admin: {
    defaultUser: process.env.ADMIN_DEFAULT_USER || "admin",
    defaultPass: process.env.ADMIN_DEFAULT_PASS || "Admin@123456",
    maxLoginFail: 5,
    lockMinutes: 30,
  },
};
