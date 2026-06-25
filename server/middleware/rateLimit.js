const buckets = new Map();

module.exports = (options = {}) => {
  const windowMs = options.windowMs || 60000;
  const max = options.max || 120;
  return async (ctx, next) => {
    const key = `${ctx.ip}:${ctx.path}`;
    const now = Date.now();
    let bucket = buckets.get(key);
    if (!bucket || now > bucket.reset) {
      bucket = { count: 0, reset: now + windowMs };
      buckets.set(key, bucket);
    }
    bucket.count += 1;
    if (bucket.count > max) {
      ctx.status = 429;
      ctx.body = { code: 429, message: '请求过于频繁，请稍后再试', data: null };
      return;
    }
    await next();
  };
};
