function success(ctx, data = null, message = 'success') {
  ctx.body = { code: 0, message, data };
}

function fail(ctx, message = 'error', code = 1, status = 200) {
  ctx.status = status;
  ctx.body = { code, message, data: null };
}

module.exports = { success, fail };
