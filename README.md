## Propwise Assessment

A real estate CRM dashboard built with Next.js 16, React 19, and Tailwind CSS v4. The app provides agents with an at-a-glance view of leads, active deals, revenue, pipeline stages, tasks, and a live activity feed — all filterable by time period.

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **UI** — Tailwind CSS v4, shadcn/ui, Base UI
- **Charts** — Recharts
- **State** — Jotai
- **Animations** — Framer Motion
- **Theming** — next-themes (light / dark)
- **Notifications** — Sonner

## Features

- KPI cards (Total Leads, Revenue YTD, Active Deals, Completed Tasks) with sparkline charts
- Revenue forecast bar chart comparing this year vs last year
- Sales pipeline funnel summary across 6 stages
- Live activity feed with grouped entries (calls, emails, notes, commissions, tasks)
- Tasks panel with priority, type, and overdue indicators
- Period filter tabs (Today, This Week, This Month, This Quarter, This Year, Custom)
- Light / dark mode toggle
- Collapsible sidebar navigation

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The dashboard is at [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

## Project Structure

```
src/
├── app/
│   ├── dashboard/        # Dashboard page
│   └── layout.tsx        # Root layout
├── components/
│   ├── layout/           # Sidebar
│   ├── pages/dashboard/  # Dashboard widgets & shell
│   └── ui/               # Shared UI primitives
├── hooks/                # use-dashboard hook
├── lib/                  # Mock data, mock API, period utils
├── store/                # Jotai atoms
└── types/                # TypeScript types
```
