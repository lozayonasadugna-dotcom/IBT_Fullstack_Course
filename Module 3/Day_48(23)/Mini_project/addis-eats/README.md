# Addis Eats

Order Ethiopian dishes from your phone. Built for IBT CodeOps Module 3, Day 48 (Harden, Then Ship).

## What it does
- Browse eight dishes and filter by category
- Add dishes to a cart, change amounts, and place an order with a phone number
- Reach every function with Tab, Enter and Escape
- Touch targets are at least 44 pixels and nothing hides behind hover
- A double tap or a repeated request places one order

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
