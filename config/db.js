const db = require('../models');

async function connectDatabase() {
    await db.sequelize.authenticate();
    console.log('Database connected successfully');
    // sync() dihapus — skema database dikelola lewat migration, bukan auto-sync di runtime
}

module.exports = connectDatabase;