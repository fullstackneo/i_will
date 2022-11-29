const filterEl = document.querySelector('#filter');
const pageEl = document.querySelector('#pagination-page');

document.onclick = (e) => {
  const activeMenu = filterEl.querySelector('.filter-active');
  if (!activeMenu) {
    if (e.target.matches('#desktop-menu input')) return;
    const menuItem = e.target.closest('#desktop-menu');
    if (menuItem) {
      menuItem.children[1].classList.remove('hidden');
      menuItem.classList.add('filter-active');
    }
  } else {
    activeMenu.classList.remove('filter-active');
    activeMenu.children[1].classList.add('hidden');
  }
};

filterEl.onclick = (e) => {
  if (e.target.matches('form>div input')) return;
  if (!e.target.matches('form>div label')) return;

  const inputEl = e.target.closest('form>div').firstElementChild;

  const type = inputEl.closest('form').getAttribute('id');
  const value = inputEl.value.replaceAll(' ', '+').replace(':', '%3A');
  const pageQuery = 'page=1';
  let filterQuery = location.search.replace(/\?*&*page=[0-9]+/, '');

  // change the url string without reloading the page
  if (filterQuery) {
    if (!inputEl.checked) {
      filterQuery += `&${type}=${value}`;
    } else if (filterQuery.includes(`&${type}=${value}`)) {
      filterQuery = filterQuery.replace(`&${type}=${value}`, '');
    } else if (filterQuery.includes(`?${type}=${value}&`)) {
      filterQuery = filterQuery.replace(`${type}=${value}&`, '');
    } else {
      filterQuery = filterQuery.replace(`?${type}=${value}`, '');
    }
  } else {
    filterQuery += `?${type}=${value}`;
  }

  const browserUrl = location.origin + location.pathname + (filterQuery ? `${filterQuery}&${pageQuery}` : `?${pageQuery}`);

  location.href = browserUrl;
};

pageEl.onclick = (e) => {
  if (e.target.matches('span')) {
    let currentPage = +pageEl.querySelector('.current').innerHTML;
    if (!isNaN(e.target.innerHTML)) {
      if (+e.target.innerHTML === currentPage) return;
      currentPage = +e.target.innerHTML;
    } else if (e.target.matches('#prevPage')) {
      if (currentPage === 1) return;
      currentPage -= 1;
    } else {
      currentPage += 1;
    };

    let browserUrl = location.href;
    if (location.search.match(/page=[0-9]+/)) {
      browserUrl = browserUrl.replace(/page=[0-9]+/, `page=${currentPage}`);
    } else {
      browserUrl += `?page=${currentPage}`;
    }

    location.href = browserUrl;
  }
};
