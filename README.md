# Shrigonda News

A modern, full-stack news platform built with Next.js and MongoDB.

## Features

- 📰 **News Management**: Create, edit, and publish news articles
- 🔐 **Authentication**: Secure JWT-based authentication system
- 👥 **User Roles**: Admin and Editor roles with different permissions
- 📱 **Responsive Design**: Mobile-friendly interface
- 🎨 **Modern UI**: Built with Radix UI and Tailwind CSS
- 🔔 **Notifications**: Real-time notification system
- 🏷️ **Categories & Tags**: Organize content with categories and tags
- 📊 **Admin Dashboard**: Comprehensive admin panel for content management

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **UI Components**: Radix UI, Lucide Icons
- **Forms**: React Hook Form with Zod validation

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB database (local or MongoDB Atlas)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd TestingNews
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=YourApp
DB_NAME=shrigonda_news
NEXT_PUBLIC_BASE_URL=http://localhost:3000
CORS_ORIGINS=*
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=3000
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Default Admin Credentials

```
Username: admin
Password: admin123
```

**⚠️ Important**: Change these credentials immediately after first login!

## Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── article/           # Article pages
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # React components
├── lib/                   # Utility functions
│   ├── mongodb.js        # Database connection
│   └── auth.js           # Authentication utilities
├── hooks/                 # Custom React hooks
├── public/               # Static assets
├── scripts/              # Utility scripts
├── docs/                 # Documentation
└── tests/                # Test files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

### Public Endpoints
- `GET /api/news` - Get published news articles
- `GET /api/news/:id` - Get single article
- `GET /api/categories` - Get all categories
- `POST /api/auth/login` - User login

### Protected Endpoints (Require Authentication)
- `POST /api/news` - Create article (Editor/Admin)
- `PUT /api/news/:id` - Update article (Editor/Admin)
- `DELETE /api/news/:id` - Delete article (Admin only)
- `GET /api/admin/articles` - Get all articles (Editor/Admin)
- `POST /api/users` - Create user (Admin only)

## Database Collections

### news
- Articles with title, content, category, tags, author, status, views

### users
- User accounts with username, email, password (hashed), role

### categories
- News categories with id, name, icon, order

### notifications
- System notifications for new articles and updates

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `DB_NAME` | Database name | Yes | - |
| `JWT_SECRET` | Secret key for JWT | Yes | - |
| `NEXT_PUBLIC_BASE_URL` | Application base URL | Yes | - |
| `CORS_ORIGINS` | Allowed CORS origins | No | `*` |
| `PORT` | Server port | No | `3000` |
| `NODE_ENV` | Environment mode | No | `development` |

## Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Security headers (CSP, XSS Protection, etc.)
- Input validation with Zod
- MongoDB injection prevention

## Performance

- Next.js standalone output for optimized builds
- Efficient MongoDB queries with proper indexing
- Image optimization
- Code splitting and lazy loading
- Production-ready caching headers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support and questions, please contact the development team.

## Changelog

### Version 1.0.0
- Initial production release
- Complete news management system
- User authentication and authorization
- Admin dashboard
- Category and tag management
- Notification system
