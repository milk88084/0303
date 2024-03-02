// Function to fetching api
async function getProductData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const productData = await response.json();
    return productData;
  } catch (error) {
    console.error(`Error message: ${error}`);
    throw error;
  }
}

//Rendering product with DOM
function createProductLayout(data) {
  const productsContainer = document.querySelector(".productWrapper");
  productsContainer.innerHTML = "";
  const dataArray = data.data;
  
  
  for (const product of dataArray) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("productSection");
    const img = document.createElement("img");
    img.classList.add("productImage");
    img.src = product.main_image;
    productDiv.appendChild(img);

    const colorDiv = document.createElement("div");
    colorDiv.classList.add("productColor");
    for (const color of product.colors) {
      const colorBox = document.createElement("div");
      colorBox.classList.add("colorSquare");
      colorBox.style.backgroundColor = `#${color.code}`;
      colorDiv.appendChild(colorBox);
    }
    productDiv.appendChild(colorDiv);

    const name = document.createElement("p");
    name.classList.add("productName");
    name.textContent = product.title;
    productDiv.appendChild(name);

    const price = document.createElement("p");
    price.classList.add("productPrice");
    price.textContent = `TWD.${product.price}`;
    productDiv.appendChild(price);

    productsContainer.appendChild(productDiv);
  }
}

//W1P2 Assigment2:Fetch all products API and retrieve the Parameter from the Page URL
const women = document.querySelector(".women");
const men = document.querySelector(".men");
const accessories = document.querySelector(".accessories");
const logo = document.querySelector(".logo");
const logo2 = document.querySelector(".logo2");
const women2 = document.querySelector(".women2");
const men2 = document.querySelector(".men2");
const ace2 = document.querySelector(".ace2");

// Consolidate repeated operations into a function
function getProductAndLayout(url, value, key) {
  getProductData(url).then((data) => {
    createProductLayout(data);
  });
  const searchUrl = new URL(window.location.href);
  searchUrl.search = "";
  search.value = "";
  search3.value = "";
  searchUrl.searchParams.set(key, value);
  window.history.pushState(value, null, searchUrl.href);
}

function updateCategorySelection(clickedElement, otherElementsToRemove) {
  clickedElement.classList.add("clicked");
  otherElementsToRemove.forEach((element) => {
    element.classList.remove("clicked");
  });
}

//1280 up：Click logo and categories to get product information and change urls;and click the them to keep darker color
logo.addEventListener("click", () => {
  const url = "https://api.appworks-school.tw/api/1.0/products/all";
  getProductAndLayout(url, "all", "category");
  clearNoResult();
});

women.addEventListener("click", () => {
  const url = "https://api.appworks-school.tw/api/1.0/products/women";
  getProductAndLayout(url, "women", "category");
  updateCategorySelection(women, [men, accessories]);
  clearNoResult();
});

men.addEventListener("click", () => {
  const url = "https://api.appworks-school.tw/api/1.0/products/men";
  getProductAndLayout(url, "men", "category");
  updateCategorySelection(men, [women, accessories]);
  clearNoResult();
});

accessories.addEventListener("click", () => {
  const url = "https://api.appworks-school.tw/api/1.0/products/accessories";
  getProductAndLayout(url, "accessories", "category");
  updateCategorySelection(accessories, [women, men]);
  clearNoResult();
});

//1280 below: logo and categories click to get product information and change urls

logo2.addEventListener("click", () => {
  const url = "https://api.appworks-school.tw/api/1.0/products/all";
  getProductAndLayout(url, "all", "category");
  clearNoResult2();
});

women2.addEventListener("click", () => {
  const url = "https://api.appworks-school.tw/api/1.0/products/women";
  getProductAndLayout(url, "women", "category");
  updateCategorySelection(women2, [men2, ace2]);
  clearNoResult2();
});

men2.addEventListener("click", () => {
  const url = "https://api.appworks-school.tw/api/1.0/products/men";
  getProductAndLayout(url, "men", "category");
  updateCategorySelection(men2, [women2, ace2]);
  clearNoResult2();
});

ace2.addEventListener("click", () => {
  const url = "https://api.appworks-school.tw/api/1.0/products/accessories";
  getProductAndLayout(url, "accessories", "category");
  updateCategorySelection(ace2, [women2, men2]);
  clearNoResult2();
});

// Check the url is same as the apiUrl and render the content
document.addEventListener("DOMContentLoaded", () => {
  const searchParams = new URLSearchParams(window.location.search);
  const category = searchParams.get("category");
  let apiUrl = "https://api.appworks-school.tw/api/1.0/products/all";

  if (category && category !== "undefined") {
    apiUrl = `https://api.appworks-school.tw/api/1.0/products/${category}`;
    getProductAndLayout(apiUrl, category, "category");
  } else {
    getProductData(apiUrl)
      .then((data) => {
        createProductLayout(data);
      })
      .catch((error) => {
        console.error("Error message:", error);
      });
  }

  if (searchParams.get("category") === "men") {
    updateCategorySelection(men, [women, accessories]);
    updateCategorySelection(men2, [women2, ace2]);
  } else if (searchParams.get("category") === "women") {
    updateCategorySelection(women, [men, accessories]);
    updateCategorySelection(women2, [men2, ace2]);
  } else if (searchParams.get("category") === "accessories") {
    updateCategorySelection(accessories, [women, men]);
    updateCategorySelection(ace2, [women2, men2]);
  }
});

// w1p3 part
// Product Search API  getProductData(url);
const searchIcon = document.querySelector(".searchIcon");
const search = document.querySelector(".search");
const nullSearch = document.querySelector(".nullSearch");
const productList = document.querySelector(".productList");

// 1280 input search
let inputValue = search.value;
let trimInput = inputValue.trim();

searchIcon.addEventListener("click", function () {
  const inputValue = search.value;
  searchEvent(inputValue);
});
search.addEventListener("keypress", function (event) {
  const inputValue = event.target.value;
  if (event.key === "Enter") {
    searchEvent(inputValue);
  }
});

let noResultDisplayed = false; //true means no search results
let noResultElement = null;

function searchEvent(inputValue) {
  const url = `https://api.appworks-school.tw/api/1.0/products/search?keyword=${inputValue}`;
  getProductData(url)
    .then((data) => {
      if (data.data.length < 1 && !noResultDisplayed) {
        noResultElement = document.createElement("p");
        noResultElement.classList.add("noResult");
        noResultElement.textContent =
          "Humm, we're not getting any results. Please try another search.";
        nullSearch.appendChild(noResultElement);
        noResultDisplayed = true;
      } else {
        clearNoResult();
      }
      if (data.data.length >= 1 || noResultDisplayed) {
        getProductAndLayout(url, inputValue, "search");
        women.style.color = "black";
        men.style.color = "black";
        accessories.style.color = "black";
      }
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
}

// Add function to remove noResult.textContent
function clearNoResult() {
  if (noResultElement) {
    noResultElement.remove();
    noResultDisplayed = false;
  }
}

// Create mobile search input bar
const mobile = document.querySelector(".mobile");
const clickSearchbar = document.querySelector(".clickSearchbar");
const search2 = document.querySelector(".search2");
const search3 = document.querySelector(".search3");
const searchIcon3 = document.querySelector(".searchIcon3");
const nullSearch2 = document.querySelector(".nullSearch2");

search2.addEventListener("click", () => {
  clickSearchbar.style.display = "none";
  mobile.style.display = "none";
  clickSearchbar.style.display = "flex";
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1280) {
    clickSearchbar.style.display = "none";
  }
});

// below 1280 input search
let inputValue2 = search3.value;
let trimInput2 = inputValue2.trim();

searchIcon3.addEventListener("click", function () {
  const inputValue2 = search3.value;
  searchEvent2(inputValue2);
  clickSearchbar.style.display = "none";
  mobile.style.display = "flex";
});
search3.addEventListener("keypress", function (event) {
  const inputValue2 = event.target.value;
  if (event.key === "Enter") {
    searchEvent2(inputValue2);
    clickSearchbar.style.display = "none";
    mobile.style.display = "flex";
  }
});

let noResultDisplayed2 = false;
let noResultElement2 = null;

function searchEvent2(inputValue2) {
  const url = `https://api.appworks-school.tw/api/1.0/products/search?keyword=${inputValue2}`;
  getProductData(url)
    .then((data) => {
      if (data.data.length < 1 && !noResultDisplayed2) {
        noResultElement2 = document.createElement("p");
        noResultElement2.classList.add("noResult");
        noResultElement2.textContent =
          "Humm, we're not getting any results. Please try another search.";
        nullSearch.appendChild(noResultElement2);
        noResultDisplayed2 = true;
      } else {
        clearNoResult2();
      }
      if (data.data.length >= 1 || noResultDisplayed2) {
        getProductAndLayout(url, inputValue2, "search");
        women2.style.color = "#828282";
        men2.style.color = "#828282";
        ace2.style.color = "#828282";
      }
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
}

// Add function to remove noResult.textContent
function clearNoResult2() {
  if (noResultElement2) {
    noResultElement2.remove();
    noResultDisplayed2 = false;
  }
}

// popstate the history page
window.addEventListener("popstate", (event) => {
  console.log(event);
  console.log("popstate 是 " + event.state);
  const searchParams = new URLSearchParams(window.location.search);
  const category = searchParams.get("category");
  const inputValue = searchParams.get("keyword");

  if (category) {
    const apiUrl = `https://api.appworks-school.tw/api/1.0/products/${category}`;
    getProductAndLayout(apiUrl, category, "category");
  } else if (inputValue) {
    // const apiUrl = `https://api.appworks-school.tw/api/1.0/products/search?keyword=${inputValue}`;
    searchEvent(inputValue);
  } else {
    const apiUrl = "https://api.appworks-school.tw/api/1.0/products/all";
    getProductAndLayout(apiUrl, "all", "category");
  }
});











const getApiUrl = (endpoint, page) => {
  return `https://api.appworks-school.tw/api/1.0/products/${endpoint}?paging=${page}`;
};


const scrollBar = (endpoint) => {
  let page = 1;
  let isFetchingData = false;
  let hasMoreData = true;

  window.addEventListener("scroll", async () => {

    const shouldFetchData = (
      window.scrollY + window.innerHeight >= document.body.offsetHeight - 50 &&
      !isFetchingData &&
      hasMoreData
    );

    if (shouldFetchData) {
      isFetchingData = true;

      const apiUrl = getApiUrl(endpoint, page);
      try {
        const data = await getProductData(apiUrl);
        page++;
        
        if (data.length > 0) {
          createProductLayout(data);
        } else {
          hasMoreData = false;
        }
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      } finally {
        isFetchingData = false;
      }
    }
  });
};









// w1p4 Infinite Scroll




// const scrollBar = (endpoint) => {
//   let page = 1;

//   // setApiUrl 函式負責組合 API URL
//   const setApiUrl = () => {
//     const searchParams = new URLSearchParams(location.search);
//     let apiURL;
//     if (searchParams.has("category")) {
//       apiURL = `https://api.appworks-school.tw/api/1.0/products/${endpoint}?paging=${page}`;
//     } else if (searchParams.has("search")) {
//       apiURL = `https://api.appworks-school.tw/api/1.0/products/search?keyword=${endpoint}&paging=${page}`;
//     } else {
//       apiURL = `https://api.appworks-school.tw/api/1.0/products/all?paging=${page}`;
//     }
//     return apiURL;
//   };

//   let isFetchingData = false;
//   let hasMoreData = true; // 標記是否還有更多資料可加載

//   window.addEventListener("scroll", async () => {
//     const productsContainer = document.querySelector(".productWrapper");

//     // 檢查是否應該觸發新請求
//     const shouldFetchData = (
//       window.scrollY + window.innerHeight >= document.body.offsetHeight - 50 &&
//       !isFetchingData &&
//       hasMoreData
//     );

//     if (shouldFetchData) {
//       isFetchingData = true;

//       const apiURL = setApiUrl(); // 獲取 API URL
//       try {
//         const data = await getProductData(apiURL);
//         page++;
        
//         if (data.length > 0) {
//           // 將資料傳遞給 createProductLayout 函式處理
//           createProductLayout(data);
//         } else {
//           hasMoreData = false; // 沒有更多資料可加載
//         }
//       } catch (error) {
//         console.error("Error occurred while fetching data:", error);
//       } finally {
//         isFetchingData = false;
//       }
//     }
//   });
// };











// let category = "all"; // 初始設定為顯示所有產品
// let page = 1; // 初始設定為第1頁


// // 函式: 取得下一頁產品資料
// async function fetchNextPage() {
//   try {
//     const nextPageUrl = `https://api.appworks-school.tw/api/1.0/products/${category}?paging=${page + 1}`;
//     const nextPageData = await getProductData(nextPageUrl);
    
//     // 確保 nextPageData 存在且包含 data 屬性
//     if (nextPageData && nextPageData.data) {
//       page++;
//       console.log(nextPageData);
//       return nextPageData.data; // 從 nextPageData.data 中讀取產品資料
//     } else {
//       throw new Error("Next page data is invalid or missing.");
//     }
//   } catch (error) {
//     console.error(`Error fetching next page: ${error}`);
//     throw error;
//   }
// }


// // 監聽使用者滾動事件，當滾動到接近底部時加載下一頁產品資料
// window.addEventListener("scroll", async () => {
//   // 計算使用者滾動位置與文件高度
//   const scrollPosition = window.scrollY + window.innerHeight;
//   const documentHeight = document.documentElement.scrollHeight;
  
//   // 如果使用者滾動到文件底部的90%以上，加載下一頁產品資料
//   if (scrollPosition >= documentHeight * 0.9) {
//     try {
//       const nextPageData = await fetchNextPage();
      
//       // 將新的產品資料插入到 DOM 中
//       if (nextPageData.length > 0) {
//         const content = createProductLayout(nextPageData);
//         productsContainer.insertAdjacentHTML("beforeend", content);
//       }
//     } catch (error) {
//       console.error(`Error fetching and displaying next page: ${error}`);
//     }
//   }
// });













































// let apiURL = "https://api.appworks-school/api/1.0/products/${gfhfg}?paging=1; // 设置初始值
// let page = 1;

// async function fetchNextPage() {
//   try {
//     const nextPageUrl = `${apiURL}?page=${page + 1}`;
//     console.log("Fetching next page from URL:", nextPageUrl);
//     const nextPageData = await getProductData(nextPageUrl);
//     console.log("Next page data:", nextPageData);

//     // 确保 nextPageData 存在且包含 data 属性
//     if (nextPageData && nextPageData.data) {
//       page++;
//       return nextPageData.data; // 从 nextPageData.data 中读取产品数据
//     } else {
//       throw new Error("Next page data is invalid or missing.");
//     }
//   } catch (error) {
//     console.error(`Error fetching next page: ${error}`);
//     throw error;
//   }
// }



// // Event listener for infinite scrolling
// window.addEventListener("scroll", async () => {
//   // Calculate how far the user has scrolled down
//   const scrollPosition = window.scrollY + window.innerHeight;
//   const documentHeight = document.documentElement.scrollHeight;
  
//   // Check if the user has scrolled to 90% of the document height
//   if (scrollPosition >= documentHeight * 0.9) {
//     try {
//       // Fetch the next page of data
//       const nextPageData = await fetchNextPage();
      
//       // Check if nextPageData is valid and contains products
//       if (nextPageData && nextPageData.length > 0) {
//         // Append the new products to the DOM
//         const content = createProductLayout(nextPageData);
//         productsContainer.insertAdjacentHTML("beforeend", content);
//       } else {
//         console.error("Error fetching and displaying next page: Next page data is invalid or empty.");
//       }
//     } catch (error) {
//       console.error(`Error fetching and displaying next page: ${error}`);
//     }
//   }
// });



// -------------------

// let apiURL = "https://api.appworks-school.tw/api/1.0/products/all"; // 设置初始值
// let page = 1;

// // Function to fetch next page of data
// async function fetchNextPage() {
//   try {
//     const nextPageUrl = `${apiURL}?page=${page + 1}`;
    
//     console.log("從哪一個url Fetching下一個頁面 next page from URL:", nextPageUrl);
    
//     const nextPageData = await getProductData(nextPageUrl);
    
    
//     console.log("下一個data的內容:", nextPageData);

//     // 确保 nextPageData 存在且包含 data 属性
//     if (nextPageData && nextPageData.data) {
//       page++;
//       return nextPageData.data; // 从 nextPageData.data 中读取产品数据
//     } else {
//       throw new Error("Next page data is invalid or missing.");
//     }
//   } catch (error) {
//     console.error(`Error fetching next page: ${error}`);
//     throw error;
//   }
// }

// // Event listener for infinite scrolling
// window.addEventListener("scroll", () => {
//   // Calculate how far the user has scrolled down
//   const scrollPosition = window.scrollY + window.innerHeight;
//   const content = createProductLayout(data)
  
//   // Check if the user has scrolled to 90% of the document height
//   if (scrollPosition >= document.body.offsetHeight * 0.9 ) {
//     try {
//       // Fetch the next page of data
//       const nextPageData =  fetchNextPage();
      
//       // Append the new products to the DOM
//       if (nextPageData.products.length > 0) {
//         const content = createProductLayout(nextPageData.products);
//         productsContainer.insertAdjacentHTML("beforeend", content);
//       }
//     } 
//   }
// });







