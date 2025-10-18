# Project Structure

```
giftedsolutions/
│
├── .gitignore                          # Git ignore rules
├── .vercelignore                       # Vercel ignore rules
├── .eslintrc.json                      # ESLint configuration
├── .prettierrc                         # Prettier configuration
├── package.json                        # Dependencies and scripts
├── pnpm-lock.yaml                      # Locked dependencies (auto-generated)
├── tsconfig.json                       # TypeScript configuration
├── next.config.ts                      # Next.js configuration
├── tailwind.config.ts                  # Tailwind CSS configuration
├── postcss.config.mjs                  # PostCSS configuration
├── vercel.json                         # Vercel deployment config
│
├── README.md                           # Main documentation
├── QUICKSTART.md                       # Quick setup guide
├── DEPLOYMENT.md                       # Deployment instructions
├── SUPABASE_SETUP.md                   # Supabase setup guide
├── CONTRIBUTING.md                     # Contribution guidelines
├── LICENSE                             # MIT License
│
├── public/                             # Static assets
│   └── (images, fonts, etc.)
│
├── supabase/                           # Database migrations
│   └── migrations/
│       └── 001_initial_schema.sql      # Initial database schema
│
└── src/                                # Source code
    │
    ├── app/                            # Next.js App Router
    │   ├── layout.tsx                  # Root layout (metadata, fonts)
    │   ├── page.tsx                    # Home page (server component)
    │   ├── globals.css                 # Global styles (Tailwind imports)
    │   │
    │   └── api/                        # API routes
    │       ├── products/
    │       │   └── route.ts            # GET /api/products
    │       ├── orders/
    │       │   └── route.ts            # POST /api/orders
    │       └── categories/
    │           └── route.ts            # GET /api/categories
    │
    ├── components/                     # React components (client)
    │   ├── Header.tsx                  # Sticky header with cart
    │   ├── Footer.tsx                  # Business info footer
    │   ├── ProductGrid.tsx             # Product listing with filters
    │   ├── ProductCard.tsx             # Individual product card
    │   ├── CartModal.tsx               # Slide-in cart sidebar
    │   ├── CartItem.tsx                # Cart item with quantity
    │   └── icons.ts                    # Icon exports
    │
    ├── store/                          # State management (Zustand)
    │   └── cart.ts                     # Cart store with localStorage
    │
    ├── services/                       # Business logic layer
    │   └── database.ts                 # Supabase queries (products, orders)
    │
    ├── lib/                            # Utilities and helpers
    │   ├── supabase.ts                 # Supabase client configuration
    │   └── utils.ts                    # Helper functions (formatting, WhatsApp)
    │
    ├── config/                         # Configuration modules
    │   └── env.ts                      # Environment variable management
    │
    └── types/                          # TypeScript type definitions
        ├── index.ts                    # Domain types (Product, Order, Cart)
        └── supabase.ts                 # Generated database types
```

## Key Design Decisions

### Architecture Patterns

1. **Layered Architecture**
   - Presentation Layer: React components
   - Business Logic Layer: Services
   - Data Access Layer: Supabase client
   - Clear separation of concerns

2. **Repository Pattern**
   - `productService` and `orderService` encapsulate database operations
   - Easy to mock for testing
   - Single source of truth for data access

3. **State Management**
   - Zustand for global cart state
   - localStorage for persistence
   - React Server Components for product data

4. **Type Safety**
   - Full TypeScript coverage
   - Zod schemas for runtime validation
   - Generated types from Supabase

### Component Structure

```
Header (Client)
├── Logo
├── Cart Button
└── Cart Modal (Portal)

ProductGrid (Client)
├── Search & Filters
└── Product Cards
    ├── Image
    ├── Category Badge
    ├── Name
    ├── Price
    └── Add to Cart Button

Footer (Server)
└── Business Info
```

### Data Flow

```
User Action → Component → Store/Service → Supabase → Response
              ↓
           UI Update
```

Example: Add to Cart
1. User clicks "Add" button
2. `ProductCard` calls `addItem(product)`
3. `useCartStore` updates state
4. localStorage synced automatically
5. Cart badge updates reactively

Example: Checkout
1. User clicks "Proceed to WhatsApp"
2. `CartModal` calls `whatsappService.openWhatsAppOrder()`
3. Message formatted with order details
4. WhatsApp opens in new tab
5. Cart cleared after successful open

### API Routes

All API routes follow REST conventions:

- `GET /api/products` - List products
- `GET /api/products?category=X` - Filter by category
- `GET /api/products?search=Y` - Search products
- `GET /api/categories` - List categories
- `POST /api/orders` - Create order

### Performance Optimizations

1. **ISR (Incremental Static Regeneration)**
   - Products cached for 1 hour
   - Background revalidation
   - Fast page loads

2. **Image Optimization**
   - Next.js Image component
   - Automatic lazy loading
   - Responsive images

3. **Code Splitting**
   - Automatic via Next.js
   - Client components loaded on demand
   - Tree shaking for unused code

4. **Caching Strategy**
   - API routes: 1 hour cache
   - Static assets: CDN cached
   - Database queries: Connection pooling

### Security Measures

1. **Row Level Security (RLS)**
   - Enforced at database level
   - Public read, restricted write
   - Data isolation

2. **Input Validation**
   - Zod schemas on API routes
   - Client-side validation
   - SQL injection prevention

3. **Environment Variables**
   - Sensitive data in .env
   - Validated on startup
   - Type-safe access

### Scalability Considerations

1. **Stateless Design**
   - No server-side sessions
   - Cart in client storage
   - Horizontally scalable

2. **Database Indexing**
   - Category index
   - Active products index
   - Created_at index

3. **Connection Pooling**
   - Supabase manages connections
   - Automatic scaling
   - Free tier: 60 connections

## File Responsibilities

| File | Purpose | Type |
|------|---------|------|
| `src/app/page.tsx` | Home page, fetches products | Server Component |
| `src/app/layout.tsx` | Root layout, metadata | Server Component |
| `src/components/Header.tsx` | Navigation, cart button | Client Component |
| `src/components/ProductGrid.tsx` | Product listing, filters | Client Component |
| `src/components/ProductCard.tsx` | Individual product | Client Component |
| `src/components/CartModal.tsx` | Shopping cart sidebar | Client Component |
| `src/store/cart.ts` | Cart state management | Zustand Store |
| `src/services/database.ts` | Database operations | Service Layer |
| `src/lib/supabase.ts` | Supabase client | Singleton |
| `src/config/env.ts` | Environment config | Singleton |

## Tech Stack Rationale

- **Next.js 15**: Best-in-class React framework, Vercel-optimized
- **React 19**: Latest features, improved performance
- **TypeScript**: Type safety, better DX
- **Tailwind CSS**: Utility-first, fast styling
- **Supabase**: PostgreSQL, real-time, free tier
- **Zustand**: Lightweight state management
- **Zod**: Runtime type validation
- **Vercel**: Zero-config deployment, edge network

## Best Practices Implemented

✅ Clean Code principles
✅ SOLID principles
✅ DRY (Don't Repeat Yourself)
✅ Separation of concerns
✅ Type safety
✅ Error handling
✅ Input validation
✅ Security best practices
✅ Performance optimization
✅ Accessibility (ARIA labels)
✅ SEO optimization
✅ Responsive design
✅ Progressive enhancement
✅ 12-Factor App methodology

---

This structure provides a solid foundation for a production-ready e-commerce platform.

