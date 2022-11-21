const moment = require('moment');

module.exports = {
  format_firstUpperCase: (string) => {
    return string[0].toUpperCase() + string.slice(1);
  },

  limit_array: (arr, number) => {
    return arr.slice(0, number + 1);
  },

  isGt: (a, b) => {
    return a > b;
  },

  format_date: (time) => {
    return moment(time).format('YYYY-MM-DD');
  },

  math: (lvalue, operator, rvalue) => {
    let result;
    switch (operator) {
      case '+':
        result = lvalue + rvalue;
        break;
      case '-':
        result = lvalue + rvalue;
        break;
    }
    return result;
  }
};
