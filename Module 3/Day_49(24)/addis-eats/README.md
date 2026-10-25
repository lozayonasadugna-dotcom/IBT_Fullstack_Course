# Addis Eats

Order Ethiopian dishes from your phone. Built for IBT CodeOps Module 3, Day 48 (Harden, Then Ship).

## What it does
- Start on a welcome page with an automatic, manually controlled food-photo slideshow
- Browse fifteen dishes, a daily Doro Wat special, and category filters after selecting View the menu
- Add dishes to a cart, choose pickup or delivery, and submit an order with a phone number
- Select TeleBirr or CBE for delivery and open the entered location in Google Maps
- Switch between dark charcoal-and-gold and light cream themes
- Reach every function with Tab, Enter and Escape
- Touch targets are at least 44 pixels and nothing hides behind hover
- A double tap or a repeated request places one order

## Add your images
The Addis Eats images are in `public/dishes/`. The header and welcome slideshow use `logo.png`, `doro-wat.jpg`, and `asa-tibs.jpg`; dish cards and detail windows use their matching dish photos. Add a new dish photo here and map its filename, display name, category, price, and description in `lib/dishes.js`.

The payment choices are currently order preferences; this app does not process payments or provide user-account sign-in. The "Sign in to order" link takes customers to the menu, and orders are submitted through the existing phone-number checkout.

## Run it
    npm install
    cp .env.example .env.local
    npm run dev

## Check the production build
    npm run build
    npm run start
    npm run check

## Environment variables
| Variable | Development | Preview | Production |
| --- | --- | --- | --- |
| SESSION_SECRET | Any value | A separate value | Strong and unique |
| NEXT_PUBLIC_SITE_URL | http://localhost:3000 | The preview URL | The live domain |
| DATABASE_URL (when added) | Local database | Seeded test data | The real one |
| Payment keys (when added) | Test keys | Test keys | Live keys |

## Pre-flight checklist
- [x] npm run build succeeds
- [x] Every variable is listed in .env.example
- [x] No secret uses the NEXT_PUBLIC prefix
- [x] metadataBase is set in app/layout.js
- [x] No remote images are used
- [x] File names match their imports, letter for letter

## If a deployment goes wrong
Restore service first. Promote the previous deployment, then find the cause.

Repository: https://github.com/lozayonasadugna-dotcom/IBT_Fullstack_Course.git

Repository: https://github.com/lozayonasadugna-dotcom/IBT_Fullstack_Course.git
