# Ashford Academy: Student Information Website

A Nuxt 4 + Vue 3 site that demonstrates reusable components and props.

## Run it

1. Install Node.js 20 or newer (https://nodejs.org).
2. Open this folder in VS Code (File > Open Folder).
3. Open the terminal (Ctrl + `) and run:

   npm install
   npm run dev

4. Open http://localhost:3000

## Components (app/components/)

| Component        | Purpose                                            |
| ---------------- | -------------------------------------------------- |
| AppHeader.vue    | Navigation, shown on every page                    |
| AppFooter.vue    | Footer, shown on every page                        |
| StudentCard.vue  | One student; data comes in through props           |
| InfoCard.vue     | A title and a description                          |
| AppButton.vue    | Button with `label`, `color`, `size`, `outline`, `to` props |

Header and footer live in `app/app.vue`, so every page in `app/pages/` uses them.
