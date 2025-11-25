# blog-vue-vite-frontend

> **Modern, modular, and accessible.**
>
> This project demonstrates a full-stack blog platform built from scratch—combining robust RESTful API design (Express & Prisma) with a clean, reusable component-based SPA frontend (Vue 3 & Vite).
>
> All UI logic, architecture, and accessibility patterns are thoughtfully crafted for maintainability, scalability, and developer experience.
>
> _Check out both repositories for the complete picture._ 🚀

[![Frontend – Vue3/Vite/Tailwind](https://img.shields.io/badge/frontend-vue3%2Fvite-blue?style=flat-square)]()
[![Backend – Express/Prisma/MySQL](https://img.shields.io/badge/backend-express%2Fprisma%2Fmysql-green?style=flat-square)](https://github.com/StefaniaSgreva/blog-express-prisma-backend)

...

## Getting Started

1.  **Clone the repository**

    ```
     git clone https://github.com/StefaniaSgreva/blog-vue-vite-frontend.git
     cd blog-vue-vite-frontend
    ```

2.  **Install dependencies**

    ```
    npm install
    ```

3.  **Configure API endpoint**
    Edit `/src/config.js` or use `.env` (if present):

    ```
    VITE_API_URL=http://localhost:3000
    ```

4.  **Run the development server**

    ```
     npm run dev
    ```

    The app will be available at `http://localhost:5173`

    ## Architecture & Features

    - Vue 3 + Vite: Lightning-fast Single Page Application
    - Tailwind CSS: Utility-first design, fully responsive, accessible
    - Router: Client-side navigation, detail pages via dynamic routing
    - Component-Driven:
      - Atomic UI blocks (ArticleCard, ArticleList, AuthorBadge, TagList, etc.)
      - Layout split: Home, Article details, Not found page
    - API Integration: Talks directly to the connected Express/Prisma backend
    - SEO & Social: Meta tags, OpenGraph, and social preview images
    - Accessible UI: ARIA roles, focus styles, skip links

    ## Project Structure Preview

    ```text
    src/
      components/
        ArticleCard.vue
        ArticleList.vue
        AuthorBadge.vue
        CategoryBadge.vue
        TagList.vue
        LoaderSpinner.vue
        Pagination.vue
        ArticleNotFound.vue
        Footer.vue
      views/
        Home.vue
        ArticleShow.vue
      router/
        index.js
      App.vue
    ```

    ## Main Components:

    | Component       | Description                  |
    | --------------- | ---------------------------- |
    | ArticleCard     | Blog post preview card       |
    | ArticleList     | Grid/list view for posts     |
    | AuthorBadge     | Author display with initials |
    | CategoryBadge   | Category label               |
    | TagList         | Badge set for article tags   |
    | LoaderSpinner   | Accessible loading indicator |
    | Pagination      | Page navigation and controls |
    | ArticleNotFound | Not found / error state      |
    | Footer          | Site-wide footer             |

    Each component is documented and designed for reuse.

    ## Example .env

    ```
    VITE_API_URL=http://localhost:3000
    ```

    ## Usage Modes

    - Development
      - Open CORS policy on backend for testing
      - Demo/test users can access all features
    - Production

      - Intended to work with the secure version of [blog-express-prisma-backend]
      - Backend enforces authentication, authorization, and security

      <!-- ## Screenshots -->

    ## License

    This repository is provided exclusively for portfolio and learning purposes.
    Please do not use, copy, or redistribute this code or any part of it without explicit permission.

    ## Looking for the backend?

    See: [blog-express-prisma-backend](https://github.com/StefaniaSgreva/blog-express-prisma-backend)

    Thank you for checking out my work!
