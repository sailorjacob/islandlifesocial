# Island Life Social - Social Media Content Manager

A simple, streamlined social media content management tool for Island Life Hostel. Perfect for creating and organizing posts for the week.

## Features

- **Weekly Calendar**: Visual calendar showing posts organized by day
- **Image Upload**: Drag & drop image upload with preview
- **Caption Management**: Add and edit captions for each post
- **Moodboard View**: Visual grid for organizing content
- **Simple Workflow**: Just add image + caption for each day
- **Copy/Paste Ready**: Staff can easily copy content for posting
- **Clean Interface**: Minimal, distraction-free design

## Installation

### Quick Setup

```bash
git clone <your-repo-url>
cd island-life-social
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

### Optional: Supabase Setup (for cloud storage)

If you want to enable cloud storage for images:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy your credentials to `.env.local`
3. Run the SQL schema from `supabase-schema.sql`
4. Create a `post-images` storage bucket

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Supabase account
- Vercel account (for deployment)

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd island-life-social
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App Configuration
NEXT_PUBLIC_APP_NAME="Island Life Social"
NEXT_PUBLIC_APP_DESCRIPTION="Social Media Post Management for Island Life Hostel"
```

### 3. Supabase Setup

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Run the database schema**:
   ```sql
   -- Copy and paste the contents of supabase-schema.sql into your Supabase SQL editor
   ```

3. **Create a storage bucket**:
   - Go to Storage → Buckets → Create new bucket
   - Name: `post-images`
   - Public bucket: ✅ Enabled

4. **Enable Authentication**:
   - Go to Authentication → Settings
   - Enable Email authentication

5. **Set up storage policies** (run in SQL Editor):
   ```sql
   CREATE POLICY "Users can upload post images" ON storage.objects
     FOR INSERT WITH CHECK (bucket_id = 'post-images' AND auth.role() = 'authenticated');

   CREATE POLICY "Users can view post images" ON storage.objects
     FOR SELECT USING (bucket_id = 'post-images');
   ```

6. **Get your credentials**:
   - Go to Settings → API
   - Copy your Project URL and anon/public key

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Project Structure

```
island-life-social/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page (Calendar view)
│   │   └── moodboard/      # Moodboard page
│   ├── components/
│   │   ├── calendar/       # Calendar-related components
│   │   ├── layout/         # Layout components (Header, etc.)
│   │   ├── moodboard/      # Moodboard components
│   │   ├── posts/          # Post-related components
│   │   ├── ui/            # Reusable UI components
│   │   └── upload/         # File upload components
│   └── lib/
│       ├── supabase.ts     # Supabase client configuration
│       └── utils.ts        # Utility functions
├── supabase-schema.sql     # Database schema
├── vercel.json            # Vercel deployment config
└── README.md
```

## Design Features

- **Light Theme**: Clean, modern UI with subtle shadows and borders
- **Smooth Animations**: Framer Motion animations throughout
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Interactive Elements**: Hover effects and micro-interactions
- **Typography**: Clean, readable fonts with proper hierarchy
- **Color Scheme**: Professional blue accent color (#2e9bb8)

## Key Components

### Weekly Calendar (`/`)
- Visual weekly calendar with post organization
- Drag & drop functionality for rescheduling
- Color-coded days (today highlighted)
- Quick post creation buttons

### Moodboard Grid (`/moodboard`)
- Grid and list view modes
- Search and filter functionality
- Visual post organization
- Bulk actions and management

### Create Post Modal
- Image upload with preview
- Caption editor with character count
- Platform selection
- Scheduling options

## Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## Authentication

The app uses Supabase Auth for user management:

- Email/password authentication
- Row Level Security (RLS) policies
- Automatic profile creation on signup

## Database Schema

### Posts Table
```sql
- id: UUID (Primary Key)
- caption: TEXT (Required)
- image_url: TEXT (Optional)
- scheduled_date: TIMESTAMP
- status: ENUM (draft, scheduled, published)
- platform: ENUM (instagram, facebook, twitter, all)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
- user_id: UUID (Foreign Key)
```

### Profiles Table
```sql
- id: UUID (Primary Key, references auth.users)
- email: TEXT
- full_name: TEXT
- avatar_url: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (via ESLint)

## Content Ideas

The app comes pre-configured with content ideas for Island Life Hostel:

- Sunset views from the hostel
- Guest testimonials and experiences
- Local beach activities and attractions
- Behind-the-scenes hostel life
- Special events and promotions
- Island cuisine and food highlights

## Mobile Support

The app is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## Future Enhancements

- [ ] Push notifications for scheduled posts
- [ ] Analytics and engagement tracking
- [ ] Team collaboration features
- [ ] AI-powered caption suggestions
- [ ] Hashtag optimization
- [ ] Post performance insights

## License

This project is private and proprietary for Island Life Hostel.

## Support

For support and questions, please contact the development team.

---

Built for Island Life Hostel
