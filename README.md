# SubGuard Pro 🛡️

### Secure Subscription Intelligence Dashboard

> **SubGuard Pro** is a modern, feature-rich subscription and recurring expense intelligence dashboard built with React, Vite, Tailwind CSS, and Redux Toolkit. It helps users take full control of their digital footprint by tracking active subscriptions, managing free trials, projecting long-term financial commitments, and synchronizing data seamlessly with local storage.

---

## ✨ Key Features

* 🔐 **Secure Authentication Simulation:** Simple login and user registration flow powered by Redux.
* 📊 **Smart Dashboard Metrics:** Real-time calculation of total yearly spend, active plans, active free trials, and highest expense services.
* ➕ **Advanced Subscription Management:** Add, track, categorize, and delete services (e.g., Netflix, ChatGPT Plus, Spotify) with custom tags, password hints, and notes.
* ⚡ **Free Trial Radar:** Dedicated alerts and banners to track trials before billing begins.
* 💱 **Dynamic Currency Support:** Switch display currencies instantly (USD, EUR, GBP, INR, etc.).
* 📈 **Analytics & Projections:** Category breakdowns, payment method analysis, and 1-year / 3-year financial commitment forecasting.
* 💾 **State Persistence:** Automatic synchronization with browser `localStorage` so your data never disappears on refresh.
* 🎨 **Glassmorphism UI:** Built with Tailwind CSS, dark mode aesthetics, and smooth toast notifications via `react-toastify`.

---

## ⚙️ Tech Stack & Architecture

* **Frontend Framework:** React 19 + Vite
* **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
* **Styling & UI:** Tailwind CSS, Lucide React Icons
* **Notifications:** React Toastify
* **Storage:** Browser `localStorage` sync via Redux store subscriptions

---

## 📂 Project Folder Structure

```text
src/
├── app/
│   └── store.js             # Central Redux store setup with localStorage persistence
├── features/
│   ├── auth/                # Authentication slice & login screens
│   ├── subscriptions/       # subscriptionSlice.js & list components
│   └── ui/                  # uiSlice.js (filters, currency, view toggles)
├── components/              # Dashboard metrics, charts, widgets & modals
├── App.jsx                  # Main application layout container
└── main.jsx                 # React DOM root wrapped with Redux Provider

```

---

## 🚀 Getting Started Locally

### Prerequisites

Make sure you have [Node.js](https://www.google.com/search?q=https://nodejs.org/) installed on your machine.

### Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/subguard-pro.git
cd subguard-pro

```


2. **Install dependencies:**
```bash
npm install

```


3. **Run the development server:**
```bash
npm run dev

```


4. Open your browser and navigate to `http://localhost:5173`.

---

## 🧠 Redux Toolkit Implementation Highlights

SubGuard Pro leverages modern Redux Toolkit patterns to maintain clean, scalable, and predictable state management:

* **`configureStore()`:** Combines feature slices (`auth`, `subscriptions`, `ui`), enables Redux DevTools, and handles preloaded state from `localStorage`.
* **`createSlice()` & Immer:** Automatically generates action creators and action types while allowing safe, direct state mutations (e.g., `state.items.push()`) that Immer translates into immutable updates behind the scenes.
* **`useDispatch` & `useSelector`:** Bridges components cleanly with the global state store without prop drilling.

---

## 📄 Documentation

For a comprehensive, step-by-step educational breakdown of how this project was engineered from scratch, check out the [Project Documentation](https://amitashokswain7.substack.com/p/the-ultimate-redux-toolkit-guide?r=70u05e&utm_campaign=post&utm_medium=web&triedRedirect=true).

---

## 💡 Acknowledgements

Developed as part of an independent learning challenge to master Redux Toolkit architecture, documentation reading, and modern React state management.

---

## 📝 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).