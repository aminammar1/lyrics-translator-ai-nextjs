# 🎵 Sing Lang - AI-Powered Lyrics Translator

<div align="center">
  <img src="public/logo.png" alt="Sing Lang Logo" width="200" height="200" />
  
  **Music Knows No Barriers**
  
  Translate any song lyrics to any language with the power of AI
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-green)](https://supabase.com/)
</div>

## 🌟 Overview

Sing Lang is a modern web application that breaks down language barriers in music. Search for any song, get its lyrics, and translate them into any language using advanced AI translation models. Whether you're learning a new language, exploring international music, or just curious about what your favorite foreign songs mean, Sing Lang has you covered.

## ✨ Features

- 🔍 **Smart Song Search**: Search for songs using the Genius API with comprehensive results
- 🌐 **Multi-Language Translation**: Translate lyrics to any language using Meta's Llama 3.3 70B model
- 👤 **User Accounts**: Save your favorite translations with Supabase authentication
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices
- ⚡ **Fast & Efficient**: Built with Next.js 15 for optimal performance
- 🎨 **Beautiful UI**: Modern design with Tailwind CSS and Lucide icons
- 💾 **Translation History**: Save and manage your translation history

## 🏗️ Project Structure

```
sing-lang/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── genius/               # Genius API integration
│   │   │   └── songs/            # Song search endpoints
│   │   │       ├── [id]/         # Individual song data
│   │   │       └── search/       # Search functionality
│   │   │           ├── full/     # Full search results
│   │   │           └── quick/    # Quick search results
│   │   └── openrouter/           # OpenRouter AI integration
│   │       └── translation/      # Translation endpoint
│   ├── search/                   # Search page
│   ├── song/                     # Individual song pages
│   │   └── [id]/                 # Dynamic song route
│   ├── translation/              # Translation pages
│   │   └── [id]/                 # Dynamic translation route
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── Background.tsx            # Background component
│   ├── DeleteTranslation.tsx     # Translation deletion
│   ├── FastResults.tsx           # Quick search results
│   ├── Header.tsx                # Navigation header
│   ├── Hero.tsx                  # Landing hero section
│   ├── Loader.tsx                # Loading animations
│   ├── LyricsSection.tsx         # Lyrics display
│   ├── SearchBar.tsx             # Search functionality
│   ├── SearchResults.tsx         # Search results display
│   ├── SignupSignIn.tsx          # Authentication forms
│   ├── Song.tsx                  # Song component
│   ├── TranslateBar.tsx          # Translation interface
│   ├── TranslateSection.tsx      # Translation display
│   └── TranslationCardInfo.tsx   # Translation cards
├── context/                      # React Context
│   └── AuthContext.tsx           # Authentication context
├── hooks/                        # Custom React hooks
│   └── useApi.ts                 # API interaction hooks
├── lib/                          # Utility libraries
│   ├── api.ts                    # API utilities
│   ├── constants.ts              # App constants
│   ├── errorHandler.ts           # Error handling
│   ├── toast.tsx                 # Toast notifications
│   └── toastConfig.ts            # Toast configuration
├── public/                       # Static assets
│   └── logo.png                  # Application logo
├── supabase/                     # Supabase integration
│   ├── client.ts                 # Supabase client
│   └── data/                     # Data layer
│       └── translations.ts       # Translation data operations
├── types/                        # TypeScript definitions
│   └── api.ts                    # API type definitions
├── .github/                      # GitHub templates & workflows
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies & scripts
├── postcss.config.mjs            # PostCSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Genius API key ([Get one here](https://genius.com/api-clients))
- An OpenRouter API key ([Get one here](https://openrouter.ai/))
- A Supabase project ([Create one here](https://supabase.com/))

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Genius API
GENIUS_ACCESS_TOKEN=your_genius_api_token

# OpenRouter AI
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/aminammar1/lyrics-translator-ai.git
   cd lyrics-translator-ai
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up your environment variables** (see above)

4. **Set up Supabase Database**

   Create the required tables and indexes in your Supabase project:

   ```sql
   -- Enable Row Level Security
   ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

   -- Create users table (if using custom user profiles)
   CREATE TABLE IF NOT EXISTS public.users (
     id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     full_name TEXT,
     avatar_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create translations table
   CREATE TABLE translations (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     song_id TEXT NOT NULL,
     title TEXT NOT NULL,
     artist TEXT NOT NULL,
     image_url TEXT,
     original_language TEXT NOT NULL,
     translation_language TEXT NOT NULL,
     original_lyrics TEXT NOT NULL,
     translated_lyrics TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create indexes for better performance
   CREATE INDEX idx_translations_user_id ON translations(user_id);
   CREATE INDEX idx_translations_song_id ON translations(song_id);
   CREATE INDEX idx_translations_created_at ON translations(created_at DESC);
   CREATE INDEX idx_translations_user_created ON translations(user_id, created_at DESC);
   CREATE INDEX idx_users_email ON users(email);

   -- Enable Row Level Security
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

   -- Create RLS policies
   -- Users can only see their own profile
   CREATE POLICY "Users can view own profile" ON users
     FOR SELECT USING (auth.uid() = id);

   CREATE POLICY "Users can update own profile" ON users
     FOR UPDATE USING (auth.uid() = id);

   CREATE POLICY "Users can insert own profile" ON users
     FOR INSERT WITH CHECK (auth.uid() = id);

   -- Users can only see their own translations
   CREATE POLICY "Users can view own translations" ON translations
     FOR SELECT USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert own translations" ON translations
     FOR INSERT WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can update own translations" ON translations
     FOR UPDATE USING (auth.uid() = user_id);

   CREATE POLICY "Users can delete own translations" ON translations
     FOR DELETE USING (auth.uid() = user_id);
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. **Search for a Song**: Use the search bar on the homepage to find any song
2. **Select a Song**: Choose from the search results to view lyrics
3. **Translate**: Select your target language and click translate
4. **Save (Optional)**: Sign up/in to save your translations for later
5. **Manage**: View and manage your saved translations in your profile

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Tech Stack

### Frontend

- **Next.js 15.4.1** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling framework
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications

### Backend & APIs

- **Genius API** - Song lyrics and metadata
- **OpenRouter API** - AI translation (Meta Llama 3.3 70B)
- **Supabase** - Authentication and database

### Tools & Libraries

- **Axios** - HTTP client
- **Cheerio** - Web scraping
- **ISO-639-1** - Language code utilities
- **React Spinners** - Loading indicators

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, concise commit messages
- Add tests for new features when applicable
- Update documentation as needed
- Ensure your code passes all linting checks

### Areas for Contribution

- 🌐 Additional language support
- 🎨 UI/UX improvements
- 🔧 Performance optimizations
- 📱 Mobile experience enhancements
- 🧪 Test coverage improvements
- 📚 Documentation updates
- 🐛 Bug fixes

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow project guidelines

## 🐛 Bug Reports & Feature Requests

Please use our GitHub issue templates:

- [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)
- [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)
- [Translation Issue](.github/ISSUE_TEMPLATE/translation_issue.md)
- [API Issue](.github/ISSUE_TEMPLATE/api_issue.md)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Amin Ammar


```

## 🙏 Acknowledgements

- [Genius](https://genius.com/) for providing the lyrics API
- [OpenRouter](https://openrouter.ai/) for AI translation services
- [Supabase](https://supabase.com/) for backend services
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for deployment platform
- All contributors who help make this project better

## 📞 Contact

- **Author**: Mohmed Amine Ammar
- **GitHub**: [@aminammar1](https://github.com/aminammar1)
- **Project Repository**: [lyrics-translator-ai](https://github.com/aminammar1/lyrics-translator-ai)

---

<div align="center">
  Made with ❤️ for music lovers worldwide
  
  **⭐ Star this repo if you like it!**
</div>
