
# 📊 Personalized Content Dashboard

An interactive, dynamic, and user-centric dashboard to track **news**, **movies**, and **music recommendations**. Built using **Next.js**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**.

This project is part of the **SDE Intern - Frontend Development Assignment** and demonstrates frontend architecture, state management, API integration, and modern UI/UX practices.

---

## 🌐 Live Demo
👉 [View Deployed App on Vercel](https://your-vercel-link.vercel.app) *(Add after deployment)*

---

## ✨ Features
✅ **Personalized Feed**: Get content tailored to your favorite categories (Technology, Sports, Finance, etc.).  
✅ **Trending Section**: Explore top trending news, movies, and music.  
✅ **Favorites**: Mark content as your favorite for quick access.  
✅ **Search Functionality**: Search across categories with debounced performance.  
✅ **Dark Mode**: Switch between light & dark themes.  
✅ **Responsive Design**: Optimized for mobile, tablet, and desktop.  
✅ **Local Persistence**: Your settings and preferences are saved automatically.  

---

## 🛠 Tech Stack
- **Frontend Framework**: [Next.js](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API Integration**:
  - [NewsAPI](https://newsapi.org/) for latest news
  - Mock APIs for movies/music recommendations
- **Hosting**: [Vercel](https://vercel.com/)

---

## 📂 Folder Structure
```
personalized-dashboard/
├── src/
│   ├── components/      # Reusable UI components (Navbar, Sidebar, ContentCard)
│   ├── pages/           # Next.js pages (Feed, Trending, Settings)
│   ├── store/           # Redux store & slices
│   ├── styles/          # Tailwind and global CSS
│   └── utils/           # Utility functions & helpers
├── public/              # Static assets (images, icons)
├── .env.local           # API Keys (not committed)
├── tailwind.config.js   # Tailwind configuration
├── package.json         # Project metadata and dependencies
└── README.md            # Project overview (this file)
```

---

## 🚀 Getting Started

### 🖇 Clone Repository
```bash
git clone https://github.com/<your-username>/personalized-dashboard.git
cd personalized-dashboard
```

### 📦 Install Dependencies
```bash
npm install
```

### 🗝 Add Environment Variables
Create a `.env.local` file in the project root and add your API key:
```
NEWS_API_KEY=your_newsapi_key_here
```

### ▶️ Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing (Optional)
- Unit Testing: `npm run test`
- End-to-End Testing: Setup Cypress or Playwright *(bonus)*

---

## 📸 Screenshots
| Light Mode                           | Dark Mode                            |
|---------------------------------------|---------------------------------------|
| ![Light Mode](screenshots/light.png) | ![Dark Mode](screenshots/dark.png)   |

---

## 👨‍💻 Author
- ✍️ [Your Name](https://github.com/<your-username>)

---

## 📄 License
This project is licensed under the MIT License.

---

### 🌟 Bonus
If you’d like to contribute:
```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```
