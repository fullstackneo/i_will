
function getPages (curPage, totalPages) {
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

export { getPages };
