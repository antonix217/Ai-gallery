@AGENTS.md
# AI Gallery — Project Instructions for Claude Code

## Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (Postgres + Storage)
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Font**: Geist (already configured)

## Project Description
A gallery website to showcase AI-generated images with their prompts.
Users can browse images, view the full prompt used to generate them, filter by category/model, and submit new ones.

## Folder Structure
```
app/
  page.tsx              # Homepage — grid of all images
  gallery/
    page.tsx            # Full gallery with filters
    [id]/
      page.tsx          # Single image detail page
  submit/
    page.tsx            # Form to submit a new image + prompt
  api/
    images/
      route.ts          # GET all images, POST new image
    images/[id]/
      route.ts          # GET single image

components/
  ImageCard.tsx         # Card with image + prompt preview + model badge
  ImageGrid.tsx         # Responsive grid of ImageCards
  PromptDisplay.tsx     # Styled block to show the full prompt
  FilterBar.tsx         # Filter by model (Midjourney, DALL-E, Flux, etc.)
  SubmitForm.tsx        # Form to upload image + prompt

lib/
  supabase.ts           # Supabase client (browser + server)
  types.ts              # TypeScript types

types/
  index.ts              # Shared types
```

## Database Schema (Supabase)

### Table: `images`
| Column       | Type      | Notes                          |
|--------------|-----------|--------------------------------|
| id           | uuid      | Primary key, auto-generated    |
| title        | text      | Short title for the image      |
| prompt       | text      | Full prompt used to generate   |
| image_url    | text      | URL from Supabase Storage      |
| model        | text      | e.g. "Midjourney", "DALL-E 3"  |
| category     | text      | e.g. "landscape", "portrait"   |
| created_at   | timestamp | Auto                           |

## TypeScript Types

```ts
// lib/types.ts
export type Image = {
  id: string
  title: string
  prompt: string
  image_url: string
  model: string
  category: string
  created_at: string
}
```

## Supabase Setup

```ts
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

## Env Variables (add to .env.local)
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Component Conventions
- All components are in `components/` as `.tsx` files
- Use `'use client'` only when needed (forms, interactivity)
- Server components by default for data fetching
- Fetch data in `page.tsx`, pass as props to components
- Use Tailwind for all styling — no CSS modules

## ImageCard Component (reference)
```tsx
// components/ImageCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Image as ImageType } from '@/lib/types'

export function ImageCard({ image }: { image: ImageType }) {
  return (
    <Link href={`/gallery/${image.id}`}>
      <div className="group rounded-xl overflow-hidden border border-zinc-200 hover:border-zinc-400 transition-all">
        <div className="relative aspect-square">
          <Image src={image.image_url} alt={image.title} fill className="object-cover" />
        </div>
        <div className="p-3">
          <span className="text-xs text-zinc-400 font-mono">{image.model}</span>
          <p className="text-sm text-zinc-700 mt-1 line-clamp-2">{image.prompt}</p>
        </div>
      </div>
    </Link>
  )
}
```

## Step-by-step Build Order
When implementing features, follow this order:
1. `lib/types.ts` — define types first
2. `lib/supabase.ts` — setup client
3. `components/ImageCard.tsx` — base UI component
4. `components/ImageGrid.tsx` — grid layout
5. `app/page.tsx` — homepage with data fetch
6. `app/gallery/[id]/page.tsx` — detail page
7. `components/FilterBar.tsx` — filters
8. `app/submit/page.tsx` + `components/SubmitForm.tsx` — submission flow
9. `app/api/images/route.ts` — API routes

## Rules
- NEVER put everything in one file
- NEVER use inline styles when Tailwind classes exist
- ALWAYS type props with TypeScript interfaces
- ALWAYS handle loading and error states
- Images must use `next/image` with `fill` and a wrapper div with `position: relative`
- Keep components small and single-responsibility