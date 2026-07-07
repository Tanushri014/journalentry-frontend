# 📓 Journal Management Frontend

A modern, responsive React application for managing personal journal entries. The application integrates with the Journal Management REST API and provides a clean, intuitive user experience.

---

## ✨ Features

- 🔐 JWT Authentication
- 📧 OTP Email Verification
- 📝 Create Journal Entries
- 📖 View All Entries
- 😊 Filter by Mood
- 📅 Filter by Date
- 💬 Daily Inspirational Quotes
- 🗑️ Delete Journal Entries
- 📱 Responsive Design

---

## 🛠️ Tech Stack

- React 19
- Vite
- React Router DOM
- Axios
- CSS3

---

## 📂 Project Structure

```
## 📂 Project Structure

```text
src
├── api
│   ├── api.js
│   ├── authApi.js
│   └── journalApi.js
│
├── components
│   ├── auth
│   │   ├── AuthLayout.jsx
│   │   ├── LoginForm.jsx
│   │   ├── OtpForm.jsx
│   │   └── RegisterForm.jsx
│   │
│   ├── dashboard
│   │   ├── DashboardHeader.jsx
│   │   ├── DashboardNavbar.jsx
│   │   ├── JournalCard.jsx
│   │   └── JournalList.jsx
│   │
│   ├── home
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── WhyJournal.jsx
│   │   └── QuoteCTA.jsx
│   │
│   ├── journal
│   │   ├── JournalForm.jsx
│   │   ├── MoodSelector.jsx
│   │   └── QuoteCard.jsx
│   │
│   └── layout
│       ├── Navbar.jsx
│       └── Footer.jsx
│
├── pages
│   ├── LandingPage.jsx
│   ├── DashboardPage.jsx
│   ├── RegisterPage.jsx
│   ├── OtpPage.jsx
│   └── CreateJournalPage.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
VITE_API_BASE_URL=http://localhost:8081
```

---

## ▶️ Installation

Clone the repository

```bash
git clone <frontend-repository-url>
```

Navigate to the project

```bash
cd journal-management-frontend
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Application runs at

```
http://localhost:5173
```

---

## 👨‍💻 Author

Tanushri Matre

GitHub:
https://github.com/Tanushri014

LinkedIn:
https://www.linkedin.com/in/tanushri-matre-9756982a7