# Clerk Authentication Setup Complete ✅

## What's Been Configured

Your portfolio now has a complete Clerk authentication setup with:

1. ✅ **Clerk SDK installed** (`@clerk/nextjs`)
2. ✅ **Middleware configured** (route protection)
3. ✅ **ClerkProvider wrapped** around app layout
4. ✅ **Sign-in page** at `/sign-in`
5. ✅ **Sign-up page** at `/sign-up`
6. ✅ **Environment variables** template created

---

## Next Steps: Get Your Clerk Keys

### Option 1: Use Vercel Marketplace (Recommended - Auto-provisions keys)

```bash
cd C:\Users\indhu\portfolio-next
vercel integration add clerk
vercel env pull .env.local
```

This automatically provisions your Clerk keys and pulls them into `.env.local`.

### Option 2: Manual Setup

1. **Sign up at Clerk**: https://dashboard.clerk.com/
2. **Create a new application**
3. **Copy your keys** from the dashboard:
   - Publishable key (starts with `pk_test_...`)
   - Secret key (starts with `sk_test_...`)
4. **Update `.env.local`** with your real keys (replace the placeholders)

---

## How to Use Authentication

### Access User Data in Server Components

```tsx
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();
  
  if (!user) {
    return <div>Please sign in</div>;
  }
  
  return <p>Hello, {user.firstName}!</p>;
}
```

### Access User Data in Client Components

```tsx
"use client";
import { useUser } from "@clerk/nextjs";

export default function UserProfile() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <div>Not signed in</div>;
  
  return <p>Welcome, {user.firstName}!</p>;
}
```

### Protect API Routes

```ts
// app/api/protected/route.ts
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  return Response.json({ message: "Protected data", userId });
}
```

### Add User Button (Sign Out)

```tsx
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <nav>
      <UserButton afterSignOutUrl="/" />
    </nav>
  );
}
```

---

## Current Route Protection

The middleware is configured to protect:
- `/dashboard/*` - All dashboard routes (if you create them)
- `/api/*` - All API routes

**Public routes** (no auth required):
- `/` - Home page
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page
- All other pages (unless you add them to middleware)

---

## Testing the Setup

1. **Add your Clerk keys** to `.env.local`
2. **Start the dev server**:
   ```bash
   npm run dev
   ```
3. **Visit** http://localhost:3000/sign-in
4. **Create an account** and test the flow

---

## Customization

### Protect Additional Routes

Edit `middleware.ts` and add routes to the matcher:

```ts
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",  // Add this
  "/api(.*)",
]);
```

### Change Sign-in/Sign-up URLs

Update the paths in `.env.local`:

```env
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
```

Then rename the folders accordingly.

---

## Troubleshooting

**Error: "Clerk: Missing publishable key"**
- Make sure `.env.local` has your real Clerk keys
- Restart the dev server after updating `.env.local`

**Infinite redirect loop**
- Check that your sign-in/sign-up routes are NOT in the protected routes list

**Keys not loading**
- Verify the env var names match exactly (including `NEXT_PUBLIC_` prefix)
- Ensure `.env.local` is in the project root

---

## Resources

- [Clerk Dashboard](https://dashboard.clerk.com/)
- [Clerk Next.js Docs](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk + Vercel](https://clerk.com/docs/deployments/vercel)
