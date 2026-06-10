# Notes: TechCart Premium lab

**Live URL (Vercel):** _Deploy this completed project to Vercel and paste the live URL here._

## 1. Route and storage choice

I created `app/premium/page.js`, because the navbar already links to `/premium` and the App Router maps that folder directly to the route. I stored the premium flag in `localStorage` using the key `techcart:isPremium`. The storage key and helper functions live in `app/lib/premiumStorage.js`.

I chose `localStorage` because the lab requires the ads to stay gone after a refresh, tab close, and fresh visit. `sessionStorage` would survive a refresh but would be cleared when the tab/session ends, and a cookie would be unnecessary here because this mock payment state is only needed in the browser.

## 2. Server vs Client Components

- `app/page.js` is still a Server Component. It only renders product data and does not need state, event handlers, or browser APIs.
- `app/layout.js` is still a Server Component. It wraps the app and imports the navbar and ad component. I also removed the Google font import so the project can build without depending on a network font fetch.
- `app/components/Navbar.js` is still a Server Component. It only renders links.
- `app/components/AdBanner.js` is now a Client Component because it reads the premium status through a browser-backed hook and conditionally hides ads.
- `app/premium/page.js` is a Client Component because it uses controlled inputs, React state, `onSubmit`, and writes to `localStorage`.
- `app/lib/premiumStorage.js` is a Client helper module. It centralizes the storage key, the custom browser event, and the `useSyncExternalStore` hook used by both client components.

Keeping the product page, layout, and navbar on the server keeps them simple and avoids sending unnecessary client-side JavaScript for static UI.

## 3. The first-render problem

I avoided reading `localStorage` during the first render because the server has no `window` or `localStorage`. `AdBanner` and the premium page use `useSyncExternalStore` with a safe server snapshot of `false`. That gives React a consistent first render during hydration, then the client snapshot can update from `localStorage` after hydration.

This prevents the server-rendered HTML and first client render from disagreeing, so there should be no hydration mismatch. I checked this by running lint and building the project successfully.

## 4. How the pieces connect

The user opens `/premium`, fills the controlled form, and submits it. The submit handler validates the mock fields, writes `techcart:isPremium=true` to `localStorage`, dispatches a small browser event, and shows the success message. `AdBanner` hears that event, re-reads the flag, returns `null`, and stays hidden after refresh because the flag remains in `localStorage`.

## 5. If I had another hour

I would improve the card number and expiry date inputs with better formatting/masking, and I would add a small Premium badge in the navbar after purchase.
