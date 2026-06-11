# DevFlow

A modern Q&A platform for developers, inspired by Stack Overflow. Built with Next.js 14, Prisma, PostgreSQL, and TypeScript.

## 🌟 Features

- **Authentication & Authorization**
  - Google OAuth and Email/Password authentication
  - Secure password reset functionality
  - Protected routes and API endpoints

- **Questions & Answers**
  - Ask and answer questions
  - Rich text editor for content creation
  - Code syntax highlighting
  - Tag-based organization
  - Voting system (upvote/downvote)
  - View count tracking

- **User Features**
  - Custom user profiles
  - Reputation system
  - Bookmark favorite questions
  - Track user contributions
  - Portfolio and location sharing

- **Advanced Features**
  - Global search functionality
  - AI-powered tag suggestions
  - Real-time content preview
  - Responsive design
  - Dark/Light mode
  - Pagination and infinite scroll
  - Sort and filter capabilities

## 🛠️ Tech Stack

- **Frontend**
  - Next.js 15
  - TypeScript
  - Tailwind CSS
  - Shadcn-Ui
  - React Hook Form

- **Backend**
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL
  - Google Gen AI

- **Authentication**
  - NextAuth.js
  - JWT

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/devflow.git
   cd devflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with:
   ```env
   DATABASE_URL="your_postgresql_url"
   NEXTAUTH_SECRET="your_nextauth_secret"
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   NEXT_PUBLIC_API_BASE_URL="your_api_base_url"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/            # Next.js 14 app directory
├── components/     # Reusable UI components
├── lib/           # Utility functions and configurations
├── types/         # TypeScript type definitions
└── providers/     # Context providers
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

