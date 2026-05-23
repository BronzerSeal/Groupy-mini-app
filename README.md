# Groupy

Telegram Mini App for peer-to-peer money transfers, contact discovery, card management, and transaction history.

Built with `Next.js 16`, `React 19`, `TypeScript`, `Tailwind CSS v4`, `Prisma`, `PostgreSQL`, `@tanstack/react-query`, and `@tma.js/sdk-react`.

## What The App Does

- Authenticates users through Telegram `initData`
- Creates a local user profile on first sign-in
- Seeds starter payment cards for new users
- Shows wallet balance and user cards
- Lets users search other Telegram users
- Supports sending money between users' cards
- Stores outgoing and incoming transactions
- Tracks recent recipients for quick-send and friends list flows

## Main Screens

- `/`  
  Home dashboard with wallet balance, cards, top-up action, and transactions

- `/friends`  
  Search users, quick-send to recent recipients, and browse the recipients list

- `/transaction/[userId]`  
  Dedicated transfer flow for sending money to a chosen user

## Tech Stack

- `Next.js App Router`
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `Prisma ORM`
- `PostgreSQL`
- `Prisma Accelerate` support in production
- `TanStack Query`
- `Telegram Mini Apps SDK`
- `shadcn/ui` + custom shared UI components
- `Sonner` for toasts
- `Motion` for animations

## Architecture

The project follows a feature-sliced style structure:

- `src/app`  
  Routes, layout, API endpoints

- `src/views`  
  Page-level composition

- `src/widgets`  
  Larger product blocks like wallet, transactions, quick-send, recipients

- `src/features`  
  User actions such as auth, send money, top-up, search, card selection

- `src/entities`  
  Reusable business entities like `user` and `card`

- `src/shared`  
  Shared UI, providers, constants, Telegram bootstrap helpers, HTTP utilities

- `prisma`  
  Schema and database setup

## Data Model

Core Prisma models:

- `User`
- `Card`
- `Transaction`
- `RecentRecipient`

Notable relationship detail:

- `Card.userId`, `Transaction.userId`, `RecentRecipient.senderId`, and `RecentRecipient.recipientId` are linked to `User.tgId`, not to `User.id`

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env` with at least:

```env
DATABASE_URL=
BOT_TOKEN=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
```

Notes:

- `DATABASE_URL` should point to your Postgres database
- `BOT_TOKEN` is used to validate Telegram `initData`
- in local development, the app can run outside Telegram using mocked Telegram environment data

### 3. Apply database schema

```bash
npx prisma generate
npx prisma db push
```

If you prefer migrations:

```bash
npx prisma migrate dev
```

### 4. Start the app

```bash
npm run dev
```

The dev server uses:

```bash
next dev --turbopack
```

## Telegram Development Notes

The app bootstraps Telegram context through `src/shared/providers/telegram-provider.tsx`.

When running locally outside Telegram:

- a mocked Telegram environment is created in development
- auth still goes through `/api/auth/signin`
- if mocked `initData` contains `"mock"`, strict Telegram signature validation is skipped in development

This makes it possible to build UI flows locally without opening the Mini App inside Telegram every time.

## Authentication Flow

1. Client bootstraps Telegram SDK
2. `AuthBootstrap` reads raw Telegram `initData`
3. Client calls `POST /api/auth/signin`
4. Server validates Telegram payload
5. If the user does not exist, a new user and starter cards are created
6. Server sets `ACCESS_TOKEN` and `REFRESH_TOKEN` cookies

There is also:

- `GET /api/auth/refresh` for refreshing auth tokens

## Important Product Flows

### Send money

- Select sender card
- Choose recipient card
- Validate amount and card selection
- Update balances in a transaction
- Create mirrored `Transaction` records for sender and recipient
- Upsert `RecentRecipient` so the recipient appears in recent flows

### Quick send

- Loads recent recipients
- Pulls recipient cards
- Sends money through the shared send-money feature
- Shows success animation after a successful transfer

### Recipients list

- Uses infinite query pagination
- Reads `RecentRecipient` relations and renders recipient profile info

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run format
```

## Project Structure Snapshot

```text
src/
  app/
  views/
  widgets/
  features/
  entities/
  shared/
prisma/
public/
```

## Current State

- The app is already wired for Telegram Mini App usage
- Prisma client generation runs on `postinstall`
- React Query is used heavily for server-state synchronization
- The repository currently does not appear to include automated tests
