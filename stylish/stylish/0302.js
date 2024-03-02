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
    const searchUrl = new URL(window.location.href);
    searchUrl.search = "";
    search.value = "";
    search3.value = "";
    searchUrl.searchParams.set(key, value);
    window.history.pushState(value, null, searchUrl.href);
  
    getProductData(url)
      .then((data) => {
        createProductLayout(data);
      })
      .catch((error) => {
        console.error("Error occurred while fetching data:", error);
      });
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
  
  
  
  // w1p4 Infinite Scroll
  
  const scrollBar = (endpoint) => {
    let page = 1;
  
    // setApiUrl 函式負責組合 API URL
    const setApiUrl = () => {
        const searchParams = new URLSearchParams(location.search);
        let apiURL;
        if (searchParams.has("category")) {
          apiURL = `https://api.appworks-school.tw/api/1.0/products/${endpoint}?paging=${page}`;
        } else if (searchParams.has("search")) {
          apiURL = `https://api.appworks-school.tw/api/1.0/products/search?keyword=${endpoint}&paging=${page}`;
        } else {
          apiURL = `https://api.appworks-school.tw/api/1.0/products/all?paging=${page}`;
        }
        return apiURL;
      }
  
    let isFetchingData = false;
    let hasMoreData = true; // 標記是否還有更多資料可加載
  
    window.addEventListener("scroll", async () => {
      const productsContainer = document.querySelector(".productWrapper");
  
      // 檢查是否應該觸發新請求
      const shouldFetchData = (
        window.scrollY + window.innerHeight >= document.body.offsetHeight - 50 &&
        !isFetchingData &&
        hasMoreData
      );
  
      if (shouldFetchData) {
        isFetchingData = true;
  
        const apiURL = setApiUrl(); // 獲取 API URL
        try {
          const data = await getProductData(apiURL);
          page++;
          
          if (data.length > 0) {
            // 將資料傳遞給 createProductLayout 函式處理
            createProductLayout(data);
          } else {
            hasMoreData = false; // 沒有更多資料可加載
          }
        } catch (error) {
          console.error("Error occurred while fetching data:", error);
        } finally {
          isFetchingData = false;
        }
      }
    });
  };