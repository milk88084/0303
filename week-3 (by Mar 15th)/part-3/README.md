# Week 3 Part 3

## Assignment

### Step 1: Facebook Login

Let's add a member system to our website using Facebook Login.

Follow the steps below to complete Facebook Login:

1. Go to the [Facebook Developer Website](https://developers.facebook.com/) and create a Facebook App.
2. In the basic settings, fill in the `App Domain` and `Website URL`. Obtain the `APP ID` from your Facebook App.
3. Refer to the [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login/web) for the Facebook Login Procedure.
4. When a user clicks on the member icon on the page, direct them to the profile page: initiate the the Facebook Login Procedure if the user is not signed in; or display the user profile if the user is signed in.

Hint: In the Facebook Login procedure, pay special attention to the permissions we request from the user.

### Step 2: Integrate Member System into Website

We have implemented Facebook Login on our pages, but there are more tasks associated with the member system.

Complete the following requests:

1. Log in to Facebook and obtain the `access_token`.
2. Send the `access_token` to the [Sign In API](https://github.com/AppWorks-School-Materials/API-Doc/tree/master/Stylish#user-sign-in-api) to complete the sign-in process.
3. Retrieve the user picture, name, and email from the [Sign In API](https://github.com/AppWorks-School-Materials/API-Doc/tree/master/Stylish#user-sign-in-api) instead of Facebook, and display them on the profile page.
