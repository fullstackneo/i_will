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

  loop: (from, to, block) => {
    let res = '';
    for (let i = from; i <= to; i++) {
      block.data.index = i;
      res += block.fn(i);
    }
    return res;
  },

  math: (lvalue, operator, rvalue) => {
    let result;

    if (!isNaN(lvalue)) {
      lvalue = +lvalue;
    }

    if (!isNaN(rvalue)) {
      rvalue = +rvalue;
    }
    switch (operator) {
      case '+':
        result = lvalue + rvalue;
        break;
      case '-':
        result = lvalue - rvalue;
        break;
      case '>=':
        result = lvalue >= rvalue;
        break;
      case '>':
        result = lvalue > rvalue;
        break;
      case '<=':
        result = lvalue <= rvalue;
        break;
      case '<':
        result = lvalue < rvalue;
        break;
      case '===':
        result = (lvalue === rvalue);
        break;
      case '!==':
        result = lvalue !== rvalue;
        break;
      case '/':
        result = parseInt(lvalue / rvalue);
        break;
      case '*':
        result = lvalue * rvalue;
        break;
      case '%':
        result = lvalue % rvalue;
        break;
    }
    return result;
  },

  getResultNumber: (currentPage, totalResults, index) => {
    const startNumber = (currentPage - 1) * 10 + 1;
    const endNumber = currentPage === totalResults ? totalResults : (startNumber + 10 - 1);
    return index ? endNumber : startNumber;
  },

  getPages: (curPage, totalPages) => {
    const arr = [];
    if (curPage >= 8) {
      arr.push(1, 2, '...', curPage - 3, curPage - 2, curPage - 1, curPage);
    } else {
      for (let i = 1; i <= curPage; i++) {
        arr.push(i);
      }
    }

    if ((totalPages - curPage) >= 7) {
      arr.push(curPage + 1, curPage + 2, curPage + 3, '...', totalPages);
    } else {
      curPage++;
      while (curPage <= totalPages) {
        arr.push(curPage);
        curPage++;
      }
    }
    return arr;
  }
};
