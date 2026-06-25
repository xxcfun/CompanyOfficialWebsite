const store = new Map();

function setCaptcha(id, text) {
  store.set(id, { text: text.toLowerCase(), expires: Date.now() + 5 * 60 * 1000 });
}

function verifyCaptcha(id, input) {
  const item = store.get(id);
  if (!item) return false;
  store.delete(id);
  if (Date.now() > item.expires) return false;
  return item.text === String(input || '').toLowerCase();
}

module.exports = { setCaptcha, verifyCaptcha };
