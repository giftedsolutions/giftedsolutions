```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                    GIFTED SOLUTIONS - SYSTEM ARCHITECTURE                     ║
╚═══════════════════════════════════════════════════════════════════════════════╝

┌───────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT (Browser)                                 │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐      │
│  │   Header    │  │ ProductGrid │  │  CartModal  │  │    Footer    │      │
│  │  Component  │  │  Component  │  │  Component  │  │  Component   │      │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────────────┘      │
│         │                │                │                                  │
│         └────────────────┴────────────────┘                                  │
│                          │                                                    │
│                   ┌──────▼──────┐                                            │
│                   │  Cart Store │                                            │
│                   │  (Zustand)  │◄─────────────────────────────────┐        │
│                   └──────┬──────┘                                   │        │
│                          │                                          │        │
│                   ┌──────▼──────┐                              ┌───┴────┐   │
│                   │ localStorage│                              │ Memory │   │
│                   │ Persistence │                              │ Cache  │   │
│                   └─────────────┘                              └────────┘   │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTPS
                                    ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                         NEXT.JS SERVER (Vercel)                               │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        App Router (Server)                          │    │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐                    │    │
│  │  │  page.tsx  │  │ layout.tsx │  │ globals.css│                    │    │
│  │  │  (Home)    │  │  (Root)    │  │            │                    │    │
│  │  └─────┬──────┘  └────────────┘  └────────────┘                    │    │
│  │        │                                                             │    │
│  │        │ Fetches Products (ISR - 1 hour cache)                      │    │
│  │        │                                                             │    │
│  └────────┼─────────────────────────────────────────────────────────────┘    │
│           │                                                                   │
│  ┌────────▼─────────────────────────────────────────────────────────────┐   │
│  │                        API Routes                                    │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │   │
│  │  │ GET /products│  │ POST /orders │  │GET /categories│             │   │
│  │  │              │  │              │  │               │             │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬────────┘             │   │
│  │         │                 │                 │                       │   │
│  └─────────┼─────────────────┼─────────────────┼───────────────────────┘   │
│            │                 │                 │                            │
│  ┌─────────▼─────────────────▼─────────────────▼───────────────────────┐   │
│  │                     Service Layer                                    │   │
│  │  ┌─────────────────┐        ┌──────────────────┐                    │   │
│  │  │ productService  │        │  orderService    │                    │   │
│  │  │  - getProducts()│        │  - createOrder() │                    │   │
│  │  │  - searchProducts()│     └──────────────────┘                    │   │
│  │  │  - getCategories()│                                               │   │
│  │  └─────────┬─────────┘                                               │   │
│  └────────────┼───────────────────────────────────────────────────────────┘ │
│               │                                                               │
│  ┌────────────▼───────────────────────────────────────────────────────────┐ │
│  │                    Data Access Layer                                   │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │ │
│  │  │              Supabase Client (Singleton)                         │ │ │
│  │  │  - Connection pooling                                            │ │ │
│  │  │  - Type-safe queries                                             │ │ │
│  │  │  - Error handling                                                │ │ │
│  │  └──────────────────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ PostgreSQL Wire Protocol
                                    ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                            SUPABASE (Backend)                                 │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                      PostgreSQL Database                            │    │
│  │                                                                      │    │
│  │  ┌──────────────────────┐          ┌──────────────────────┐        │    │
│  │  │   Products Table     │          │    Orders Table      │        │    │
│  │  ├──────────────────────┤          ├──────────────────────┤        │    │
│  │  │ id (UUID)            │          │ id (UUID)            │        │    │
│  │  │ name                 │          │ customer_name        │        │    │
│  │  │ category             │          │ customer_phone       │        │    │
│  │  │ price                │          │ order_items (JSONB)  │        │    │
│  │  │ unit                 │          │ total_amount         │        │    │
│  │  │ description          │          │ status               │        │    │
│  │  │ image_url            │          │ notes                │        │    │
│  │  │ stock_quantity       │          │ created_at           │        │    │
│  │  │ is_active            │          │ updated_at           │        │    │
│  │  │ created_at           │          └──────────────────────┘        │    │
│  │  │ updated_at           │                                           │    │
│  │  └──────────────────────┘          107 Products Pre-loaded         │    │
│  │                                                                      │    │
│  │  ┌─────────────────────────────────────────────────────────────┐   │    │
│  │  │              Row Level Security (RLS)                       │   │    │
│  │  │  - Products: Public READ (active only)                      │   │    │
│  │  │  - Orders: Public INSERT, Admin READ                        │   │    │
│  │  └─────────────────────────────────────────────────────────────┘   │    │
│  │                                                                      │    │
│  │  ┌─────────────────────────────────────────────────────────────┐   │    │
│  │  │                     Indexes                                 │   │    │
│  │  │  - idx_products_category                                    │   │    │
│  │  │  - idx_products_active                                      │   │    │
│  │  │  - idx_orders_status                                        │   │    │
│  │  │  - idx_orders_created_at                                    │   │    │
│  │  └─────────────────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                       Storage (Optional)                            │    │
│  │  - Product images                                                   │    │
│  │  - 1 GB free tier                                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Order Notification
                                    ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL SERVICES                                      │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         WhatsApp                                    │    │
│  │  - Order notifications                                              │    │
│  │  - Customer communication                                           │    │
│  │  - Number: +260 779 421717                                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════

                              DATA FLOW EXAMPLE

User Action: Add Arduino Uno to Cart
─────────────────────────────────────

1. User clicks "Add" button on ProductCard
   │
   ├─► ProductCard.addItem(product) → Zustand store
   │
   ├─► Cart state updated (optimistic)
   │
   ├─► localStorage.setItem('cart', ...) → Persisted
   │
   └─► UI re-renders → Badge count updates

User Action: Checkout via WhatsApp
───────────────────────────────────

1. User clicks "Proceed to WhatsApp"
   │
   ├─► CartModal.handleCheckout()
   │
   ├─► whatsappService.openWhatsAppOrder(items, total)
   │
   ├─► Message formatted with order details
   │
   ├─► window.open('https://wa.me/260779421717?text=...')
   │
   ├─► WhatsApp opens in new tab
   │
   ├─► Cart cleared
   │
   └─► Modal closed

Server Action: Fetch Products
──────────────────────────────

1. Browser navigates to homepage
   │
   ├─► Next.js Server Component renders
   │
   ├─► productService.getProducts()
   │
   ├─► Supabase query: SELECT * FROM products WHERE is_active = true
   │
   ├─► Data returned and cached (ISR - 1 hour)
   │
   ├─► HTML generated with products
   │
   └─► Sent to client

═══════════════════════════════════════════════════════════════════════════════

                            DEPLOYMENT ARCHITECTURE

┌─────────────┐
│   GitHub    │ ──push──► ┌─────────────┐
│ Repository  │           │   Vercel    │
└─────────────┘           │   Build     │
                          └──────┬──────┘
                                 │
                          ┌──────▼──────────────────────────┐
                          │    Vercel Edge Network          │
                          │  (Global CDN - 70+ Locations)   │
                          └─────────────────────────────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
           ┌────────▼───┐  ┌────▼────┐  ┌───▼────────┐
           │   Africa   │  │  Europe │  │   Asia     │
           │ (Closest)  │  │         │  │            │
           └────────────┘  └─────────┘  └────────────┘

═══════════════════════════════════════════════════════════════════════════════

                            TECHNOLOGY STACK

┌─────────────────────────────────────────────────────────────────────┐
│ Frontend Framework      │ Next.js 15 (React 19)                    │
│ Language               │ TypeScript 5.5                           │
│ Styling                │ Tailwind CSS 4.0                         │
│ State Management       │ Zustand 5.0                              │
│ Validation             │ Zod 4.0                                  │
│ Icons                  │ Lucide React 0.469                       │
│ Backend                │ Supabase (PostgreSQL 15)                 │
│ Hosting                │ Vercel (Edge Network)                    │
│ Communication          │ WhatsApp Business                        │
│ Version Control        │ Git                                      │
│ Package Manager        │ pnpm 10.13+                              │
│ Node Runtime           │ Node.js 22+                              │
└─────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════

                          SECURITY ARCHITECTURE

┌─────────────────────────────────────────────────────────────────────┐
│ Layer               │ Security Measure                             │
├─────────────────────┼──────────────────────────────────────────────┤
│ Transport           │ HTTPS/TLS 1.3 (Enforced by Vercel)          │
│ Authentication      │ Supabase Anon Key (Public, Limited Access)  │
│ Database            │ Row Level Security (RLS)                     │
│ Input Validation    │ Zod Schemas + TypeScript                     │
│ SQL Injection       │ Parameterized Queries (Supabase SDK)         │
│ XSS Protection      │ React Auto-escaping + CSP Headers            │
│ CSRF Protection     │ SameSite Cookies + Origin Validation         │
│ Environment Vars    │ Vercel Encrypted Secrets                     │
│ API Rate Limiting   │ Vercel Edge Functions (Automatic)            │
│ DDoS Protection     │ Vercel Edge Network                          │
└─────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
```

