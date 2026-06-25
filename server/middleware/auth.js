const jwt = require('jsonwebtoken');
const config = require('../config');
const { fail } = require('../utils/response');

module.exports = async (ctx, next) => {
  const token = ctx.headers.authorization?.replace(/^Bearer\s+/i, '') || ctx.query.token;
  if (!token) {
    fail(ctx, '未登录或登录已过期', 401, 401);
    return;
  }
  try {
    ctx.state.admin = jwt.verify(token, config.jwt.secret);
    await next();
  } catch {
    fail(ctx, '未登录或登录已过期', 401, 401);
  }
};
