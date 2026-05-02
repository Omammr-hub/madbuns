# 🍔 Madbuns - Premium Restaurant Platform

![Madbuns Preview](public/uploads/hero-preview.png) *(Note: Add a screenshot of the project here)*

## 🚀 Overview

Madbuns is a fully responsive, high-performance, and visually stunning restaurant web application built from the ground up. I developed this project to demonstrate my ability to architect and deliver a complete full-stack web solution. 

It features a premium, dark-themed user interface for customers to browse the digital menu seamlessly, alongside a secure, custom-built **Admin Dashboard** that allows restaurant managers to perform full CRUD (Create, Read, Update, Delete) operations on their menu and content in real-time.

## 🏆 Key Achievements

- **Architected a Full-Stack Architecture**: Built the entire platform using **Next.js (App Router)**, leveraging React Server Components (RSC) and Server Actions to ensure lightning-fast edge performance and seamless server-side mutations.
- **Engineered a Secure Admin CMS**: Developed a bespoke content management system (CMS) guarded by custom authentication. It enables real-time menu management, category structuring, and dynamic business settings updates without requiring code changes.
- **Implemented Persistent Image Uploading**: Created a robust file upload system that natively converts images into base64 Data URIs, persisting them directly into the PostgreSQL database. This completely bypasses serverless ephemeral filesystem limitations on Vercel without relying on paid external cloud buckets.
- **Database Modeling & Integration**: Designed a scalable relational database schema using **Prisma ORM** integrated with a **Supabase PostgreSQL** instance.
- **Premium UI/UX Design**: Engineered a dark, high-contrast visual identity utilizing **Tailwind CSS**. Implemented advanced CSS techniques such as glassmorphism, glowing gradients, and dynamic micro-interactions. Integrated **Framer Motion** for smooth, staggered page animations.
- **Optimized for Speed & SEO**: Strategically utilized Next.js edge caching and on-demand revalidation (`revalidatePath`). This guarantees that customers are served ultra-fast static HTML, while the admin dashboard automatically invalidates cache upon any content updates.

## 💻 Tech Stack

- **Framework:** Next.js 15 (App Router, Server Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **Database:** PostgreSQL (hosted on Supabase)
- **ORM:** Prisma
- **Icons:** Lucide React
- **Deployment:** Vercel

## ✨ Core Features

1. **Dynamic Digital Menu**: A categorized, highly visual menu display that pulls live data from the database.
2. **Admin Dashboard**: A secure portal with analytics, allowing total control over menu items and categories.
3. **Optimistic UI Updates**: Utilizing React `useTransition` hooks to provide immediate visual feedback during server-side database mutations.
4. **Business Settings Manager**: Admins can dynamically change contact numbers, addresses, and opening hours, which instantly reflect across the public-facing site.
5. **Responsive Design**: Flawlessly adapts from large desktop monitors down to mobile devices.

## 🛠️ Getting Started

To run this project locally:

```bash
# 1. Clone the repository
git clone https://github.com/Omammr-hub/madbuns.git

# 2. Install dependencies
cd madbuns
npm install

# 3. Set up your environment variables
# Create a .env file and add your Supabase Database URLs:
# DATABASE_URL="postgresql://..."
# DIRECT_URL="postgresql://..."

# 4. Generate Prisma Client and push the schema
npx prisma generate
npx prisma db push

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 👨‍💻 Developer

Developed by **Omar marwan mostafa** (Omammr-hub).
