const { AdminLog } = require('../models');

async function writeAdminLog(adminId, adminName, action, ip) {
  try {
    await AdminLog.create({ admin_id: adminId, admin_name: adminName, action, ip });
  } catch (e) {
    console.error('writeAdminLog error', e);
  }
}

module.exports = { writeAdminLog };
