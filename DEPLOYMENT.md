# Madbuns Restaurant Website - Deployment Guide

This project is fully ready for deployment. It uses **Next.js 15 (App Router)**, **Tailwind CSS v4**, **Framer Motion**, and **Prisma** with **Supabase PostgreSQL**.

Follow these exact steps to push your project to GitHub and deploy it for free on Vercel.

## 1. Set Up Your Database on Supabase
1. Go to [Supabase](https://supabase.com/) and create a free account/project.
2. Once your project is created, go to **Project Settings** -> **Database**.
3. Scroll down to **Connection Parameters**.
4. Check "Use Connection Pooling". Mode should be "Transaction".
5. Copy the **URI** connection string. This is your `DATABASE_URL`.
6. Also, uncheck "Use Connection Pooling" to get the **Session** connection string. This is your `DIRECT_URL`.

## 2. Prepare the Local Project
Before pushing to GitHub, you need to install dependencies and push the database schema:

1. Open your terminal inside the `madbuns` folder.
2. Run `npm install`
3. Create a `.env` file in the root of `madbuns` and add your database URLs:
   ```env
   DATABASE_URL="postgres://[db-user]:[db-password]...[db-host]:6543/postgres?pgbouncer=true&connection_limit=1"
   DIRECT_URL="postgres://[db-user]:[db-password]...[db-host]:5432/postgres"
   ```
4. Push the schema to your Supabase database:
   ```bash
   npx prisma db push
   ```
5. Seed the database with your menu items and settings:
   ```bash
   node prisma/seed.js
   ```

## 3. Push to GitHub
1. Create a new empty repository on [GitHub](https://github.com/).
2. In your terminal, initialize Git in the `madbuns` folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Madbuns Website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git push -u origin main
   ```

## 4. Deploy to Vercel
1. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
2. Click **Add New...** -> **Project**.
3. Select your `madbuns` repository from the list and click **Import**.
4. Leave the Framework Preset as **Next.js**.
5. Open the **Environment Variables** section and add:
   - `DATABASE_URL`: Your pooled Supabase connection string.
   - `DIRECT_URL`: Your direct Supabase connection string.
6. Click **Deploy**.

## 5. View Your Live Website
Vercel will build and deploy your app. Once finished, click on the **Visit** button to see your live Madbuns website!
- Your Admin Dashboard is at `/admin`
- **Username:** Karim
- **Password:** krim123

Congratulations! 🎉
