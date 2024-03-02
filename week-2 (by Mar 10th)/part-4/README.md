# Week 2 Part 4

## Assignment

### Step 1: Handle Product Variants

Every product has variants, meaning that each product comes in different colors and sizes.

We should build a user interface in the product page that allows users to choose their preferred color and size.

### Step 2: Handle Stock of Product Variants

Every variant has its own stock record, which we have obtained from the Product Details API.

We should carefully manage the stock record:

1. The stock record determines the maximum quantity a user can purchase at one time.
2. If a variant is out of stock, users cannot select the quantity.

### Step 3: Shopping Cart Implementation

In the product page, we should handle the add-to-cart action when a user clicks the button.

Before doing this, let's first implement a universal structure and logic for the shopping cart.

Follow these steps to implement a shopping cart on the front-end:

1. At the start, every page should retrieve the current shopping cart data from `localStorage`.
2. If there is no data in the `localStorage`, initialize it to an empty structure.
3. Display the number of items in the cart icon.

### Step 4: Add-to-Cart Implementation

Now, when a user clicks the add-to-cart button, add an item to our shopping cart structure.

Always remember to save the latest shopping cart data back to localStorage for future use.

#### Special Reminder

Although not applicable now, eventually, we will send our shopping cart data to the [Check Out API](https://github.com/AppWorks-School-Materials/API-Doc/tree/master/Stylish#order-check-out-api) for checking out. Therefore, it's important to review the [Check Out API](https://github.com/AppWorks-School-Materials/API-Doc/tree/master/Stylish#order-check-out-api) beforehand.
