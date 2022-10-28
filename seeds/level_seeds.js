const { Level } = require('../models');
const arr = [{ name: 'junior' }, { name: 'mid-L' }, { name: 'senior' }];

module.exports = () => arr.forEach(el => Level.create(el));
