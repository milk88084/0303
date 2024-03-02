const urlParams = new URLSearchParams(window.location.search);
// const catListDivs = document.querySelectorAll(`.header-categories-list`);
// const searchInput = document.getElementById('header-search-input');
// const contentWrapper = document.getElementById('main-middle-content-wrapper');
// const mainMiddleDiv = document.getElementById('main-middle-wrapper');
// const loadingImg = document.getElementById('main-middle-content-loadingImg');
const baseAPI = 'https://api.appworks-school.tw/api/1.0/products';
// let skeletonDivs = document.querySelectorAll('.main-middle-skeleton');
let queryString = window.location.search;
let product = searchInput.value;
let pageNum = 0;
let isLoading = false;
let endOfProducts = false;
let isSearching = false;
let api;
let paramName;
let paramValue;
const categoryTable = {
  女裝: 'women',
  男裝: 'men',
  配件: 'accessories',
};
catListDivs.forEach(function (catListDiv) {
  catListDiv.addEventListener('click', async () => {
    searchInput.value = '';
    pageNum = 0;
    catListDivs.forEach(function (div) {
      div.classList.remove('header-categories-activate');
    });

    catListDiv.classList.add('header-categories-activate');
    updateAPI('category', categoryTable[catListDiv.innerText]);
    searchProduct('category', categoryTable[catListDiv.innerText]);
  });
});
const highlighText = () => {
  // highlight active text
  catListDivs.forEach(function (div) {
    if (categoryTable[div.innerText] === paramValue) {
      div.classList.add('header-categories-activate');
    } else {
      div.classList.remove('header-categories-activate');
    }
  });
};

const getParams = () => {
  window.location.search //get url parameters and value
    .substring(1)
    .split('&')
    .forEach(function (pair) {
      const keyValue = pair.split('=');
      paramName = decodeURIComponent(keyValue[0]);
      paramValue = decodeURIComponent(keyValue[1] || '');
    });
};

const updateAPI = (type, product) => {
  paramName = type;
  paramValue = product;
  console.log(type, product);
  if (!paramName) {
    api = `${baseAPI}/all`;
  } else if (paramName === 'keyword') {
    api = `${baseAPI}/search?${paramName}=${paramValue}&`;
  } else {
    api = `${baseAPI}/${paramValue}?`;
  }
  // if (paramName) {
  //   url += `paging=${pageNum}`;
  // }
};

const setUrl = (type, product) => {
  //change url without refreshing page
  paramName = type;
  paramValue = product;
  if (!paramName) {
    return;
  }

  const currentUrl = new URL(window.location.href);
  currentUrl.search = '';
  currentUrl.searchParams.set(paramName, paramValue);
  history.pushState({}, null, currentUrl.toString());
};

const toggleSkeleton = (isLoading) => {
  skeletonDivs.forEach((div) => {
    div.style.display = isLoading ? 'block' : 'none';
  });
};
const conutSkeleton = (data) => {
  const screenWidth = window.innerWidth;
  const rows =
    screenWidth < 1280
      ? Math.round(data.length / 2)
      : Math.round(data.length / 3);
  contentWrapper.style.minHeight =
    skeletonDivs[0].getBoundingClientRect().height * rows + 'px'; //count wrapper height by images number
};

const getData = async () => {
  if (endOfProducts) {
    return;
  }
  isSearching = true;
  isLoading = true;
  loadingImg.style.opacity = 1;
  toggleSkeleton(true);
  const response = await fetch(api);
  if (!response.ok) {
    isLoading = false;
    throw new Error(`出錯! status code: ${response.status}`);
  }
  isLoading = false;
  isSearching = false;
  loadingImg.style.opacity = 0;
  const { data } = await response.json();
  conutSkeleton(data);
  toggleSkeleton(false);
  pageNum++;
  return data;
};
const createContentBox = (data) => {
  const contentWrapper = document.getElementById('main-middle-content-wrapper');

  data.map((obj) => {
    const contentBox = document.createElement('div');
    contentBox.className = 'main-middle-content-box';

    const img = document.createElement('img');
    img.src = obj.main_image;
    img.alt = obj.title;

    const colorDiv = document.createElement('div');
    colorDiv.className = 'main-middle-content-box-color';
    for (let i = 0; i < obj.colors.length; i++) {
      const colorChildDiv = document.createElement('div');
      colorChildDiv.style.backgroundColor = `#${obj.colors[i].code}`;
      colorDiv.appendChild(colorChildDiv);
    }
    const p1 = document.createElement('p');
    p1.textContent = obj.title;
    const p2 = document.createElement('p');
    p2.textContent = `TWD.${obj.price}`;

    contentBox.appendChild(img);
    contentBox.appendChild(colorDiv);
    contentBox.appendChild(p1);
    contentBox.appendChild(p2);

    contentWrapper.appendChild(contentBox);
  });
};
const createProductList = () => {};

/* ------detect scroll------ */
const showNextPage = () => {
  return (
    window.innerHeight + window.scrollY >=
    mainMiddleDiv.offsetTop + mainMiddleDiv.offsetHeight
  );
};
const checkScrollPosition = () => {
  if (showNextPage() && !endOfProducts) {
    createProductList();
  }
};
window.addEventListener('scroll', checkScrollPosition);

/* ------handle search------ */
const stylishIcon = document.getElementById('header-left-wrapper');
const searchContainer = document.getElementById('header-search');
const searchImg = document.getElementById('header-search-img');
const remainSkeleton = () => {
  skeletonDivs.forEach(function (skeletonDiv) {
    const skeletonClone = skeletonDiv.cloneNode(true);
    contentWrapper.appendChild(skeletonClone);
    skeletonDivs = document.querySelectorAll('.main-middle-skeleton');
  });
};
const searchProduct = async (type, product, pass) => {
  if (!pass) {
    setUrl(type, product);
  }

  if (pageNum === 0) {
    contentWrapper.innerHTML = '';
    remainSkeleton();
  }
  endOfProducts = false;
  highlighText();
  if (!isLoading) {
    getData()
      .then((data) => {
        if (data.length === 0) {
          contentWrapper.textContent = '查無此商品';
        }
        if (!endOfProducts) {
          createContentBox(data);
        }
        isSearching = false;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
const runSearch = async () => {
  pageNum = 0;
  updateAPI('keyword', searchInput.value.trim());
  await searchProduct('keyword', searchInput.value.trim());
};
let isTyping = false;
searchInput.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter' && searchInput.value) {
    if (isTyping) return;
    runSearch();
  }
});
searchInput.addEventListener('compositionstart', function (event) {
  isTyping = true;
  console.log(isTyping)
});

searchInput.addEventListener('compositionend', function (event) {
  isTyping = false;
  console.log(isTyping)
});
/* ------ search input resize ------ */
let isSearchVisible = false;
let changeScreenSize = true;
const searchResize = () => {
  // if searchIcon is clicked on mobile, show or hide the searchInput.
  changeScreenSize = false;
  if (!isSearchVisible) {
    searchContainer.style.display = 'block';
  } else {
    searchContainer.style.display = 'none';
  }
  isSearchVisible = !isSearchVisible;
};
function handleResize() {
  if (window.innerWidth < 1280) {
    // if searchIcon is clicked on mobile, toggle the visibility instead of triggering search functionality.
    if (changeScreenSize) {
      searchContainer.style.display = 'none';
    }
    searchImg.addEventListener('click', searchResize);
    searchImg.removeEventListener('click', searchProduct);
  } else {
    changeScreenSize = true;
    isSearchVisible = false;
    searchContainer.style.display = 'block';
    searchImg.removeEventListener('click', searchResize);
    searchImg.addEventListener('click', () => {
      runSearch();
    });
  }
}
getParams();
updateAPI(paramName, paramValue);
searchProduct(paramName, paramValue);
handleResize();

window.addEventListener('resize', handleResize);

window.addEventListener('popstate', () => {
  pageNum = 0;
  getParams();
  searchInput.value = paramName === 'keyword' ? paramValue : '';
  contentWrapper.innerHTML = '';
  remainSkeleton();
  updateAPI(paramName, paramValue);
  searchProduct(paramName, paramValue, true);
});

window.addEventListener('resize', () => {
  contentWrapper.style.minHeight = 'auto';
});