const recent = new Map();

module.exports = async (ctx, next) => {
  if (ctx.method === 'GET') {
    await next();
    return;
  }
  const key = `${ctx.state.admin?.id || ctx.ip}:${ctx.method}:${ctx.path}:${JSON.stringify(ctx.request.body || {})}`;
  const now = Date.now();
  const last = recent.get(key);
  if (last && now - last < 1000) {
    ctx.status = 400;
    ctx.body = { code: 400, message: '请勿重复提交', data: null };
    return;
  }
  recent.set(key, now);
  await next();
};
