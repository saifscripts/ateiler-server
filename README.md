# Ateiler || Sporting Goods E-commerce Platform

### [Live URL](https://ateiler-alpha.vercel.app) | [Base URL (Server)](https://ateiler-server.vercel.app)

### [Frontend Repository](https://github.com/saifscripts/ateiler-client)

## Introduction

Atelier provides a wide range of sports equipment and accessories. This platform's user-friendly design makes shopping and product management easier for customers and administrators.

## Project Description

This project is a backend system for an e-commerce website that sells sporting goods. Provides APIs for CRUD operations, including product browsing, filtering and pagination, product management, checkout, and more.

## Features

-   CRUD operations for products (add, update, delete, view).
-   Filter, sort, and search products by name, category, price, brand, or rating.
-   Store and retrieve order details, including user info and delivery address.
-   Update product stock upon successful order placement.
-   CRUD operations for category management (add & view).
-   CRUD operations for brand management (add & view).
-   Implement server-side validation for all incoming requests.

## Technology Stack

-   Express.js, TypeScript, Mongoose, Zod

## Installation Guideline

Follow this step-by-step guide to run the server on your local machine.

## Installation Steps

Follow this step-by-step guide to run the server on your local machine.

### 0. Prerequisites

-   Node.js and npm/yarn installed.
-   Any Web browser to view the application.

### 1. Clone the Repository

First, clone the repository to your machine using the following command:

```
git clone https://github.com/saifscripts/ateiler-server
```

### 2. Change Directory

Next, navigate to the project directory with this command:

```
cd ateiler-server
```

### 3. Install Dependencies

Before running the app, you need to install all dependencies. You can do this using either Yarn or npm.

#### Using Yarn

```

yarn install

```

#### Using npm

```

npm install

```

### 4. Add a Configuration File

To run the app, create a `.env` file in the root folder with the following properties (I have included a few demo values here for testing):

```
NODE_ENV=development
PORT=5000
DB_URI=your_db_url
```

### 5. Run the App

Now, you're ready to run the app. Use one of the following commands to start the server.

#### Using Yarn

```
yarn dev
```

#### Using npm

```
npm run dev
```

That's it! The application should now be running locally.
