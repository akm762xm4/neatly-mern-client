# 🗂️ Neatly — MERN Notes App (Frontend)

A modern, responsive **Notes & Tasks Manager** built with React, TypeScript, and Tailwind CSS. This is the **frontend** part of a full-stack MERN (MongoDB, Express.js, React, Node.js) application, with recent enhancements for a smoother, cleaner, and fully themed user experience.

## ✨ Features

- 📝 **Create, read, update, and delete notes**
- ✅ **Task management system** with priorities, due dates, and status
- 🌗 **Light / Dark Mode** toggle (saved to localStorage, syncs on reload)
- 🎨 **Fully polished UI/UX** inspired by minimal modern design
- 🔒 **User authentication** with JWT tokens and protected routes
- ⚡ **Vite-powered fast development and builds**
- 🧠 **Redux Toolkit + Zustand** state management
- 📱 **Mobile-friendly and responsive** layouts
- 📦 **Reusable UI components** with custom Tailwind classes
- 🔔 **Theme-aware toast notifications** (via `sonner`)
- 💬 **Skeleton loaders** and `No Data` components
- ❌ **404 Page with custom illustration**
- 🧾 **Form validation** using `react-hook-form`

## 🛠️ Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS** (custom themed)
- **Redux Toolkit**
- **Zustand**
- **React Router DOM**
- **React Hook Form**
- **Lucide-react Icons**
- **Sonner Toasts**
- **Headless UI**

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd notes-mern-client
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_API_URL=https://your-backend-api-url.com/api
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Open the app at `http://localhost:5173`

## 🔄 Available Scripts

| Script            | Description                 |
| ----------------- | --------------------------- |
| `npm run dev`     | Start development server    |
| `npm run build`   | Build production bundle     |
| `npm run preview` | Preview production build    |
| `npm run lint`    | Run ESLint for code quality |

## 🧱 Project Structure

```
src/
├── assets/              # Logos, illustrations, icons
├── components/          # Reusable UI components
│   └── ui/              # Inputs, Buttons, Modals, etc.
├── features/            # Notes, Tasks, Users (Redux logic)
├── layouts/             # Main layout wrappers
├── pages/               # Page-level components (Auth, 404, Dashboard)
├── hooks/               # Custom React hooks
├── store/               # Zustand stores and Redux setup
├── types/               # TypeScript interfaces & types
├── utils/               # Utility functions (toast, formatting)
├── App.tsx              # Root component
└── main.tsx             # App entry point
```

## 🎨 UI Design & Customization

- Uses **custom Tailwind color palette** (light/dark modes)
- Reusable `card`, `btn-primary`, and `text-subtitle` classes
- **Accent color**: `#1d4ed8` (light) and `#38bdf8` (dark)
- Uses **Lucide icons**, custom SVG logos, and vector illustrations

### 🧁 Theming

- Theme persisted via `localStorage`
- Automatically applied via `useEffect` on app load
- `ThemeToggle.tsx` manages toggle and stores state

## 🔔 Toast Notifications

- Uses [`sonner`](https://sonner.emilkowal.ski/)
- All toasts themed with the app (dark/light)
- Centralized `showToast()` utility to keep usage consistent

## 🧩 Components You’ll Love

- `NoteForm.tsx` and `TaskForm.tsx` (combined Add/Edit forms)
- `DashboardPage.tsx` — visually rich dashboard with analytics
- `NoData.tsx` — elegant fallback UI with matching illustration
- `NotFound.tsx` — 404 page with centered message and vector art
- `Modal.tsx` — accessible and animated overlay modal
- `Navbar`, `Sidebar`, `ThemeToggle` — clean and responsive

## 🧪 Improvements & Polish Highlights

- ✅ Combined note and task editing into unified components
- 🧠 Improved theme handling and first-load detection
- 🌈 Logo redesigned with AI-powered gradient and creativity
- 📭 Loading skeletons for smoother page transitions
- 🎯 Added `No Note / No Task` page states with illustrations
- 🖼️ Styled toast notifications to match current app mode
- 🧾 Rewritten form validations with clearer errors
- 🔁 TaskForm dropdowns, checkbox states, and prefilled data

## 🤝 Contributing

1. Fork this repository
2. Create a new feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to your branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Sonner](https://sonner.emilkowal.ski/)
- [Lucide Icons](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Uizard](https://uizard.io/) for logo/illustration generation

---

> Built with ❤️ and attention to detail by Farhan.
