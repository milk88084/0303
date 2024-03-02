# Week 3 Part 4

## Assignment

### Step 1: Introduction to TapPay

We will use [TapPay](https://www.tappaysdk.com/en/) as the primary payment service for our e-commerce website:

1. Load TapPay SDK.
2. Initialize TapPay SDK.
3. Render card-number, expired, and CCV fields using TapPay SDK.

Refer to the [TapPay Document for Web](https://docs.tappaysdk.com/tutorial/zh/web/front.html#front).

#### Required Fields for TapPay Integration

|  Field  |                              Value                               |
| :-----: | :--------------------------------------------------------------: |
| App ID  |                              12348                               |
| App Key | app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF |

### Step 2: Prepare Order Data

Before the user clicks the check-out button on the cart page, we should handle all the data properly, which includes:

1. Shopping Cart: list items, shipping method, payment method, recipient information, subtotal, freight, and final price.
2. Credit Card: card number, expiration date, and CCV.

If any data is not ready, the user cannot check out.
Take some time to optimize the flow of managing this complicated situation.

#### Test Credit Card for TapPay Testing

|    Field     |        Value        |
| :----------: | :-----------------: |
| Card Number  | 4242 4242 4242 4242 |
| Expired Date |        01/23        |
|     CCV      |         123         |

### Step 3: Check Out

After the user clicks the check-out button, we start the check-out process:

1. Get `prime` from TapPay server.
2. Connect to the Check Out API.
3. Get check-out result from the Check Out API.
4. If everything is OK, direct the user to the thank you page.

Refer to the [Check Out API](https://github.com/AppWorks-School/API-Doc/tree/master/Stylish#order-check-out-api).

### Step 4: Complete Thank You Page

### Step 5: Show Order Number in Thank You Page

Find a way to take the order number from the check-out process to the thank you page, and display it for the user.
