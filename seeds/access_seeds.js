const { Access } = require('../models');

module.exports = () => Access.bulkCreate(['admin', 'manager', 'hr', 'staff'].map(el => ({ role: el, menu: '' })));
