# Full Stack Airbnb Clone with Next.js 14 App Router: React, Tailwind, Prisma, MongoDB, NextAuth


![Image](<Screenshot 2024-10-20 203334-1.png>)


This is a repository for a Full Stack Airbnb Clone with Next.js 14 App Router: React, Tailwind, Prisma, MongoDB, NextAuth.

Features:

- Tailwind CSS for sleek and modern design
- Framer Motion animations and effects for dynamic user experience
- Fully responsive layout across devices
- Authentication using credentials, Google, and GitHub
- Multiple image uploads via Cloudinary CDN
- Form validation and handling with react-hook-form on the client side
- Server-side error handling using react-toast for better UX
- Integrated calendars with react-date-range for easy date selection
- Page loading and empty states for smoother navigation
- Comprehensive booking/reservation system
- Guest and owner reservation cancellation functionality
- Property creation and deletion features
- Dynamic pricing calculation for properties
- Stripe payment integration for secure transactions
- Multilingual support with a language switcher using i18n
- Advanced search algorithm filtering by category, date range, map location, number of guests, rooms, and bathrooms
    - For example, filtering out properties that are unavailable during the selected date range
- Favorites system for easy access to liked properties
- Shareable URL filters, allowing results to be shared across browsers, even for logged-out users
- Pagination for efficient content browsing across multiple pages
- Comment system to enable user interactions and feedback
- Implementation of POST and DELETE routes in Next.js route handlers (app/api)
- Handling of Next.js 14 templating files (error.tsx and loading.tsx) for error and loading state management
- Efficient relations handling between server-side and child components.


### Prerequisites

**Node version 20.x**

### Cloning the repository

```shell
git clone https://github.com/Sweety-0406/airbnb_again.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

STRIPE_API_KEY = 
FRONTEND_URL =
STRIPE_WEBHOOK_SECRET=
```

### Setup Prisma

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Deployed Link

```shell
https://airbnb-again-rose.vercel.app/en
```
