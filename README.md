# ER_Labrador(ER-Group 3)

## COMP90082 Software Project - Eratos (Admin front-end)

Teammates:

-   Ning Han
-   Jiaxuan Feng
-   Shijia Li
-   Yongjie Liu
-   Zheng Shi

**About the Client**

Eratos is a platform that functions as the digital infrastructure for data-driven operations and decision-making for the natural and built worlds. Eratos has worked with CSIRO to develop a technology "stack" from streaming data from IoT sensors and edge computing to federating all of Australia's climate data, models, and frameworks from many disparate sources.

**Project Goal**

The project is to develop a standalone web application which enables users to perform data-related operation and management that supported by the Eratos core functions. The application is designed to separate in to the front-end and the back-end. The front-end development will include building both user-front and admin-front where the application collects the user input and requests and send them through to the back-end for further processing, whereas the back-end development will focus on building the gateway nodes to connect the Eratos API for forwarding the user requests and back forwarding the returning data.

**System Implementation**
The admin system is implemented with the React UI framework Ant-design.

The library package includes but not limited to the following:

-   @ant-design/icons
-   @ant-design/pro-form
-   @auth0/auth0-react
-   antd
-   axios
-   bootstrap
-   redux

**System functions achieved:**

-   Modules space control

    -   View all modules
    -   Search a module
    -   Check a module information
    -   Add a new module
    -   Edit a module details

-   Users system

    -   View all users
    -   Search a user
    -   Check the user information

-   Orders

    -   View all orders
    -   Search an order
    -   Check the order information

-   Administrator Profile

    -   Check the admin profile
    -   Update the admin profile

**Scope**

In scope

-   The Module control space page
-   The Users page
-   The Orders page

Out of scope

-   The Dashboard page (to be finished)

Detailed description and demonstration can be found at:
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1ER/Home

---

### How to run the app:

Before running the app, save the following content in your Hosts file:

127.0.0.1 uom.eratos

Then type following command in the terminal to start:

cd er-labrador\
npm install &rarr; This will automatically install packages needed in dependencies\
yarn start

Runs the app in the development mode.\
Open [http://uom.eratos:3000](http://uom.eratos:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

---

### Steps to use the app:

1. Click the Login button to log into the Geo+ Admin app

2. The page will redirect you to the Auth0 Login page, register using the provided account from our client below would redirect you back to the home page.

    Email: [uom-clgrp@eratos.com](mailto:uom-clgrp@eratos.com)
    Password: A9z6yOdQc8zoDyE741Xi

3. Click any item at the side bar or navigation bar to go to relative page and check information and even edit it.

---

### Changelog:

-   Inception phase: created and initialized the project with webpack and babel enabled.
-   Sprint 1: Add functionalities as Sprint 1 backlog described, create styles for related pages, and add mocking data to the project for testing and validating.
-   Sprint 2: Add functionalities as Sprint 2 backlog described, revised styles as client indicated, and integrated functionalities with given data from back end API.