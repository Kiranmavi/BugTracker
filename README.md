# BugTracker

A modern, full-featured bug tracking application built with Next.js, React, Zustand, and Tailwind CSS. BugTracker helps teams efficiently report, track, and manage software bugs with a clean and intuitive interface.

---

## 🚀 Features

- **Authentication**: Simple login flow (demo credentials: any email and password).
- **Dashboard**: Overview of all bug reports, with statistics and filtering by status, priority, and search.
- **Bug Management**:
  - Create, view, edit, and track bugs.
  - Assign bugs to users and set priorities.
  - Add comments to bug reports.
  - Tag bugs for easy categorization.
- **User Profile**: View your profile, role, and bug activity.
- **Responsive UI**: Works seamlessly on desktop and mobile devices.
- **State Management**: Uses Zustand for fast, scalable state management.
- **Mock Data**: Uses mock data for users and bugs (easily replaceable with real APIs).

---

## 🛠 Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/) (App Router)
- **UI Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) components
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charting**: [Recharts](https://recharts.org/) (for future analytics)
- **TypeScript**: Full type safety
- **Other**: PostCSS, Autoprefixer, class-variance-authority, and more

---

## 📦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone git@github.com:Kiranmavi/BugTracker.git
   cd BugTracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 📝 Project Structure

- `/app` - Next.js app directory (routing, pages, layouts)
- `/components` - Reusable UI and feature components
- `/store` - Zustand state management
- `/lib` - Mock data and utility functions
- `/public` - Static assets
- `/styles` - Global styles (Tailwind)

---

## ⚠️ Limitations

- **Demo Only**: This project uses mock data and does not persist changes or connect to a real backend.
- **Authentication**: No real authentication; any credentials will work.
- **API Integration**: Replace mock data with real API calls for production use.

---

## 📄 License

This project is for educational/demo purposes.