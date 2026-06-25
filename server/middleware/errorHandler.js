const { fail } = require('../utils/response');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error('[Error]', err);
    fail(ctx, err.message || '服务器内部错误', err.code || 500, err.status || 500);
  }
};
