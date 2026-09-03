# React Native Language-Learning Platform


This application is a full-featured React Native language-learning platform that leverages a sophisticated AI teacher for real-time voice interaction. Powered by a modern tech stack including Expo, TypeScript, Zustand, and Stream, it combines secure authentication with Clerk, production-ready analytics with PostHog, and automated code review with CodeRabbit. From onboarding to lessons, it guides users through a natural speak-and-respond flow, delivering an immersive conversational experience that feels like having a personal tutor in your pocket.

---

## Tech Stack

| Tool | Purpose |
| :--- | :--- |
| **React Native** | Cross-platform mobile framework |
| **Expo** | Development, build, and deployment tools |
| **TypeScript** | Type-safe JavaScript |
| **NativeWind** | Tailwind CSS for React Native |
| **Zustand** | Global state management |
| **Clerk** | Authentication and user management |
| **Stream** | Real-time AI voice infrastructure |
| **PostHog** | Product analytics and session recording |
| **CodeRabbit** | AI-powered code review |

---

## Features

- **Onboarding Flow** – Language selection and goal setting
- **Auth Pages** – Email and social login with Clerk
- **Real-Time AI Teacher** – Immersive voice interaction with Stream
- **Lesson Interface** – Polished UI with NativeWind
- **State Management** – Clean Zustand logic
- **Analytics and Review** – PostHog and CodeRabbit integration

---

## Run It

```bash
git clone https://github.com/adrianhajdin/react-native-lingua.git
cd react-native-lingua
npm install
npx expo start
```

Scan the QR code with Expo Go on your phone. Press `a` for Android, `i` for iOS, `w` for web, `r` to reload, and `m` for the dev menu.

---

## Project Structure

| File / Directory | Description |
| :--- | :--- |
| `app/` | Main app screens and navigation |
| `components/` | Reusable UI components |
| `hooks/` | Custom React hooks |
| `store/` | Zustand state management |
| `utils/` | Helper functions |
| `.env` | Environment variables |

---

## Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
POSTHOG_PROJECT_TOKEN=
POSTHOG_HOST=
STREAM_API_KEY=
STREAM_API_SECRET=
VISION_AGENT_URL=http://localhost:8000
OPENAI_API_KEY=
```

Replace placeholders with your actual credentials from Clerk, PostHog, Stream, and OpenAI.

---

## Requirements

- Git
- Node.js
- npm
- Expo Go (installed on your mobile device)
