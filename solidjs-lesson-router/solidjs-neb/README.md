# 🚀 NEB Website

<div align="center">

![NEB Logo](src/assets/images/neb.png)

**Get your exam answers quickly and safely**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.9-blue)](https://www.solidjs.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple)](https://vitejs.dev/)

A modern, high-performance website for NEB built with SolidJS, TypeScript, and TailwindCSS.

[Live Demo](https://neb.benjamin4k.web.id) · [Report Bug](https://github.com/Sleepy4k/solidjs-neb/issues) · [Request Feature](https://github.com/Sleepy4k/solidjs-neb/issues)

</div>

---

## ✨ Features

### 🎯 Core Features
- 🚀 **Blazing Fast** - Built with SolidJS for optimal performance (~42KB gzipped bundle)
- ⚡ **Optimized Build** - Code splitting, lazy loading, and tree shaking
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ♿ **Accessible** - WCAG 2.1 compliant with keyboard navigation and ARIA support
- 🎨 **Modern UI** - Clean, MaterialMe-inspired design with smooth animations
- 🔒 **Secure** - Security headers, sanitized inputs, and safe error handling
- 🌐 **SEO Optimized** - Enhanced meta tags, Open Graph, and Twitter Card support

### 🛠️ Technical Features
- **Code Splitting** - Vendor bundle separated for better caching
- **Lazy Loading** - Pages and images loaded on-demand
- **Retry Logic** - Automatic retry with exponential backoff for failed requests
- **Error Handling** - User-friendly error messages with ApiError class
- **Type Safety** - 100% TypeScript with strict mode enabled
- **Performance** - ~40% faster load time with optimized fonts and assets
- **Bundle Size** - 33% reduction with Terser minification


---

## 📖 Pages

### 1. **Home** (`/`)
- Hero section with call-to-action
- Services preview cards
- FAQ accordion with search functionality
- Testimonials section

### 2. **Services** (`/services`)
- Detailed service information
- Pricing cards
- Benefits and features
- Coming soon section for future services

### 3. **Tutorial** (`/tutorial`)
- Tab-based navigation (3 tabs: Safe Exam Browser, Kahoot, Quizizz)
- Step-by-step guides with images
- Code snippets and instructions
- LazyImage component for optimized loading

### 4. **Contact** (`/contact`)
- Contact form with validation
- Form submission to API with retry logic
- Success/error notifications
- Privacy policy link

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sleepy4k/solidjs-neb.git
   cd solidjs-neb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # API Configuration
   VITE_API_URL=http://localhost:3000
   
   # Environment (development | production)
   VITE_ENV=development
   
   # Authentication (optional)
   VITE_AUTH_SALT=your_secret_salt_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npx tsc --noEmit

# Lint code
npm run lint  # (if configured)
```

---

## 📁 Project Structure

```
neb_frontend/
├── public/                      # Static assets
│   └── assets/
│       ├── logo.svg
│       └── tutorial/            # Tutorial images (11 images)
│           ├── install-1.png
│           ├── install-2.png
│           └── ...
│
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Accordion.tsx        # FAQ accordion component
│   │   ├── Badge.tsx            # Status badge component
│   │   ├── Button.tsx           # Reusable button component
│   │   ├── Card.tsx             # Card container component
│   │   ├── Container.tsx        # Page container wrapper
│   │   ├── Footer.tsx           # Site footer
│   │   ├── LazyImage.tsx        # Optimized image loading
│   │   ├── LanguageDropdown.tsx # (Legacy - can be removed)
│   │   ├── Navbar.tsx           # Site navigation
│   │   ├── SectionHeader.tsx    # Section title component
│   │   ├── Tabs.tsx             # Tab navigation component
│   │   └── index.ts             # Component exports
│   │
│   ├── config/                  # Configuration files
│   │   └── api.config.ts        # API endpoints, env detection, logger
│   │
│   ├── constants/               # Application constants
│   │   └── text.ts              # English-only text constants
│   │
│   ├── pages/                   # Page components (lazy loaded)
│   │   ├── Home.tsx            # Homepage with hero + FAQ (API-driven)
│   │   ├── Services.tsx        # Services page (API-driven)
│   │   ├── Tutorial.tsx        # Tutorial page with tabs (static)
│   │   └── Contact.tsx         # Contact form page (API submission)
│   │
│   ├── utils/                   # Utility functions
│   │   └── http.ts             # HTTP client with retry logic
│   │
│   ├── App.tsx                  # Main app with routing
│   ├── index.tsx                # Application entry point
│   └── index.css                # Global styles + Tailwind imports
│
├── OPTIMIZATION_REPORT.md       # Comprehensive optimization audit
├── SECURITY_HEADERS.md          # Security header configurations
├── PRE_DEPLOYMENT_CHECKLIST.md  # Production deployment guide
├── CHANGELOG.md                 # Version history
├── index.html                   # HTML entry point (SEO optimized)
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
├── tailwind.config.js           # TailwindCSS configuration
├── postcss.config.js            # PostCSS configuration
└── .gitignore                   # Git ignore rules
```

---

## 🎨 Tech Stack

### Core
- **[SolidJS](https://www.solidjs.com/)** `^1.9.4` - Reactive UI framework (faster than React)
- **[TypeScript](https://www.typescriptlang.org/)** `^5.7.3` - Type safety and better DX
- **[Vite](https://vitejs.dev/)** `^6.0.7` - Lightning-fast build tool
- **[@solidjs/router](https://github.com/solidjs/solid-router)** `^0.15.3` - Client-side routing

### Styling
- **[TailwindCSS](https://tailwindcss.com/)** `^3.4.17` - Utility-first CSS framework
- **[PostCSS](https://postcss.org/)** `^8.5.1` - CSS transformation
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** `^10.4.20` - Vendor prefixes

### Build & Optimization
- **[Terser](https://terser.org/)** `^5.46.0` - JavaScript minification
- **Code Splitting** - Vendor bundle separated (`solid-vendor`)
- **Lazy Loading** - Pages and images loaded on-demand
- **Tree Shaking** - Unused code eliminated

### Development
- **Hot Module Replacement (HMR)** - Instant updates without page reload
- **TypeScript Strict Mode** - Maximum type safety
- **Centralized Configuration** - API endpoints, environment detection

---

## 🔧 Configuration Files

### Environment Variables (`.env`)
```env
# API Configuration
VITE_API_URL=http://localhost:3000       # Backend API URL

# Environment
VITE_ENV=development                     # development | production

# Authentication (optional)
VITE_AUTH_SALT=your_secret_salt_here    # For token generation
```

### API Configuration (`src/config/api.config.ts`)
```typescript
export const API_ENDPOINTS = {
  BASE_URL: getApiBaseUrl(),
  FAQ: '/faq',
  SERVICES: '/service',
  CONTACT: '/contact',
  UPLOAD: '/seb',
} as const;

export const logger = {
  log: (...args) => ENV.isDevelopment ? console.log('[NEB]', ...args) : null,
  error: (...args) => ENV.isDevelopment ? console.error('[NEB ERROR]', ...args) : null,
};
```

### HTTP Client (`src/utils/http.ts`)
- **Timeout**: 30 seconds with AbortController
- **Retry Logic**: 2 automatic retries with exponential backoff (1s, 2s, 3s)
- **Error Handling**: User-friendly ApiError class
- **Type Safety**: Generic `get<T>()` and `post<T>()` methods

---

## 📝 Editing Content

### FAQ Items
## 📝 Editing Content

### Content Sources

**NEB Frontend uses a hybrid approach:**
- **Dynamic Content** (API-driven): FAQ and Services are fetched from the backend API
- **Static Content** (Frontend): Tutorial steps are defined in the frontend code

### API-Driven Content (FAQ & Services)

FAQ items and Services are managed via the **backend API**. To update them:

1. **Edit Backend API** (express-neb-api):
   - FAQ: Edit `src/app/constants/faq-list.ts`
   - Services: Edit `src/app/constants/service-list.ts`

2. **Restart Backend Server**:
   ```bash
   cd express-neb-api
   npm run dev
   ```

3. **Frontend Auto-Updates**: Changes will appear automatically on the frontend

### Static Content (Tutorial & Text)

#### Tutorial Steps
Edit `src/constants/text.ts` (Tutorial section):
```typescript
export const text = {
  // ... other sections
  
  tutorial: {
    title: 'How to Use NEB',
    subtitle: 'Step-by-step guides',
    tabs: [
      {
        id: 'seb',
        label: 'Safe Exam Browser',
        steps: [
          {
            title: 'Step 1: Download Config File',
            description: 'Download the SEB configuration file...',
            image: '/assets/tutorial/install-1.png',
          },
          // Add more steps
        ],
      },
    ],
  },
};
```

#### Text Constants
Edit `src/constants/text.ts` for all static text:
```typescript
export const text = {
  hero: {
    title: 'Get Your Answers',
    subtitle: 'Quickly and Safely',
    description: 'NEB helps you bypass exam browser restrictions...',
  },
  navbar: { /* ... */ },
  contact: { /* ... */ },
  footer: { /* ... */ },
  // All English-only text
};
```

---

## 🖼️ Adding Images

1. **Place images** in `public/assets/` directory
2. **Reference in code**:
   ```typescript
   // Direct path
   <img src="/assets/logo.svg" alt="Logo" />
   
   // With LazyImage component (optimized)
   <LazyImage 
     src="/assets/tutorial/install-1.png" 
     alt="Installation step 1"
   />
   ```

3. **Image optimization tips**:
   - Use WebP format for photos (~30% smaller than PNG)
   - Compress images with [TinyPNG](https://tinypng.com/)
   - Use SVG for logos and icons
   - Lazy load images with `LazyImage` component

---

## 🚀 Deployment

### Build for Production

```bash
# 1. Build the project
npm run build

# 2. Test production build locally
npm run preview

# 3. Check dist/ folder
ls dist/
```

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure Security Headers**
   
   Create `vercel.json` in root:
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           { "key": "X-Frame-Options", "value": "DENY" },
           { "key": "X-Content-Type-Options", "value": "nosniff" },
           { "key": "X-XSS-Protection", "value": "1; mode=block" },
           { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
         ]
       }
     ]
   }
   ```

4. **Set Environment Variables** in Vercel Dashboard:
   ```
   VITE_API_URL=https://your-api.vercel.app
   VITE_ENV=production
   VITE_AUTH_SALT=your_production_salt
   ```

### Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**
   ```bash
   netlify deploy --prod
   ```

3. **Configure Security Headers**
   
   Create `_headers` file in `public/`:
   ```
   /*
     X-Frame-Options: DENY
     X-Content-Type-Options: nosniff
     X-XSS-Protection: 1; mode=block
     Referrer-Policy: strict-origin-when-cross-origin
   ```

### Other Platforms
- **Apache**: See `SECURITY_HEADERS.md` for `.htaccess` config
- **Nginx**: See `SECURITY_HEADERS.md` for nginx config
- **Custom Server**: See `SECURITY_HEADERS.md` for manual setup

---

## 📊 Performance Metrics

### Build Output
```
dist/index.html                        3.13 kB │ gzip:  1.10 kB
dist/assets/index-*.css               33.35 kB │ gzip:  6.25 kB
dist/assets/solid-vendor-*.js         36.64 kB │ gzip: 13.73 kB
dist/assets/Home-*.js                 12.34 kB │ gzip:  3.31 kB
dist/assets/Services-*.js              9.04 kB │ gzip:  3.11 kB
dist/assets/Tutorial-*.js              8.33 kB │ gzip:  2.96 kB
dist/assets/Contact-*.js              11.86 kB │ gzip:  3.93 kB
```

### Lighthouse Scores (Target)
- **Performance**: 95+ ⚡
- **Accessibility**: 100 ♿
- **Best Practices**: 100 ✅
- **SEO**: 100 🔍

### Bundle Analysis
- **Total Size (Gzipped)**: ~42 KB
- **Initial Load**: ~20 KB (HTML + CSS + vendor)
- **Lazy Loaded**: ~13 KB per page
- **Compression Ratio**: 63% gzip compression

---

## 🔒 Security

### Implemented Security Features
- ✅ **Security Headers** - X-Frame-Options, X-Content-Type-Options, etc.
- ✅ **Request Timeout** - 30 seconds with AbortController
- ✅ **Sanitized Errors** - User-friendly ApiError class
- ✅ **No Console Logs** - All console.* removed in production
- ✅ **HTTPS Only** - Recommended for production
- ✅ **Input Validation** - Form validation on Contact page
- ✅ **Safe Dependencies** - Regular `npm audit` checks

### Security Checklist
- [ ] Configure security headers via server (see `SECURITY_HEADERS.md`)
- [ ] Enable HTTPS on production domain
- [ ] Set strong `VITE_AUTH_SALT` in production
- [ ] Regular dependency updates (`npm update`)
- [ ] Run security audit (`npm audit`)
- [ ] Use environment variables for sensitive data

---

## 🐛 Troubleshooting

### Build Errors

**Error: `terser not found`**
```bash
# Solution: Install terser as dev dependency
npm install -D terser
```

**Error: `Cannot find module '@solidjs/router'`**
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Runtime Errors

**Error: `Failed to fetch FAQ data`**
- Check if backend API is running
- Verify `VITE_API_URL` in `.env`
- Check CORS configuration on backend

**Error: `X-Frame-Options warning in console`**
- These headers must be set via HTTP (server-side)
- See `SECURITY_HEADERS.md` for configuration
- Meta tags cannot set security headers

### Development Issues

**Port already in use**
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

**Hot reload not working**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

---

## 📚 Additional Documentation

- **[OPTIMIZATION_REPORT.md](./OPTIMIZATION_REPORT.md)** - Comprehensive optimization audit (400+ lines)
- **[SECURITY_HEADERS.md](./SECURITY_HEADERS.md)** - Security header configurations for all platforms
- **[PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md)** - Step-by-step production deployment guide
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and release notes

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style
- Use **TypeScript** for type safety
- Follow **SolidJS** best practices
- Use **TailwindCSS** utility classes
- Write **meaningful commit messages**
- Add **comments** for complex logic

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Strioo** - *Initial work* - [GitHub](https://github.com/Strioo)
- **Sleepy4k** - *Contributor* - [GitHub](https://github.com/Sleepy4k)

---

## 🙏 Acknowledgments

- [SolidJS Team](https://www.solidjs.com/) - For the amazing framework
- [Vite Team](https://vitejs.dev/) - For the blazing-fast build tool
- [TailwindCSS Team](https://tailwindcss.com/) - For the utility-first CSS framework
- [GitHub Copilot](https://github.com/features/copilot) - For development assistance

---

## 📞 Support

Need help? Have questions?

- 📧 **Email**: support@neb-website.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/Sleepy4k/solidjs-neb/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Sleepy4k/solidjs-neb/discussions)

---

<div align="center">

**Made with ❤️ by the NEB Team**

⭐ Star this repo if you find it helpful!

</div>
