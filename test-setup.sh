#!/bin/bash

# Gifted Solutions - Installation Test Script
# Validates the setup before running the app

set -e

echo "🧪 Running Installation Tests"
echo "=============================="
echo ""

# Test 1: Node.js version
echo "1️⃣  Testing Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 22 ]; then
    echo "   ✅ Node.js $(node -v) - PASS"
else
    echo "   ❌ Node.js version too old - FAIL"
    exit 1
fi

# Test 2: pnpm available
echo ""
echo "2️⃣  Testing pnpm availability..."
if command -v pnpm &> /dev/null; then
    echo "   ✅ pnpm $(pnpm -v) - PASS"
else
    echo "   ❌ pnpm not installed - FAIL"
    exit 1
fi

# Test 3: Dependencies installed
echo ""
echo "3️⃣  Testing dependencies..."
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules exists - PASS"
else
    echo "   ⚠️  node_modules missing - Running install..."
    pnpm install
    echo "   ✅ Dependencies installed - PASS"
fi

# Test 4: TypeScript compilation
echo ""
echo "4️⃣  Testing TypeScript compilation..."
if pnpm run typecheck > /dev/null 2>&1; then
    echo "   ✅ Type check passed - PASS"
else
    echo "   ❌ Type check failed - FAIL"
    echo "   Run: pnpm run typecheck"
    exit 1
fi

# Test 5: Linter
echo ""
echo "5️⃣  Testing ESLint..."
if pnpm run lint > /dev/null 2>&1; then
    echo "   ✅ Linter passed - PASS"
else
    echo "   ⚠️  Linter warnings detected"
    echo "   Run: pnpm run lint"
fi

# Test 6: Environment configuration
echo ""
echo "6️⃣  Testing environment configuration..."
if [ -f ".env.local" ]; then
    echo "   ✅ .env.local exists - PASS"
    
    # Check for placeholder values
    if grep -q "your-project-url" .env.local 2>/dev/null || grep -q "your-anon-key" .env.local 2>/dev/null; then
        echo "   ⚠️  Warning: Placeholder values detected"
        echo "   Update .env.local with actual Supabase credentials"
    fi
else
    echo "   ⚠️  .env.local missing - SKIP"
    echo "   Create it before running: pnpm run dev"
fi

# Test 7: Build test
echo ""
echo "7️⃣  Testing production build..."
if pnpm run build > /dev/null 2>&1; then
    echo "   ✅ Build successful - PASS"
else
    echo "   ❌ Build failed - FAIL"
    echo "   Run: pnpm run build"
    exit 1
fi

echo ""
echo "================================"
echo "✅ All tests passed!"
echo ""
echo "Next steps:"
echo "  1. Update .env.local (if needed)"
echo "  2. Run: pnpm run dev"
echo "  3. Open: http://localhost:3000"
echo ""

