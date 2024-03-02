//Function to fetching api
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
  
  getProductData(url)
    .then((data) => {
      createProductLayout(data);
    })
    .catch((error) => {
      console.error("Error message:", error);
    });

    
    export { getProductData, createProductLayout };