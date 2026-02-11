# 🚀 NexusAI - AI-Powered Interview Preparation Platform

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)

**NexusAI** is a comprehensive, AI-powered interview preparation platform that helps candidates excel in technical interviews, behavioral assessments, group discussions, and aptitude tests. With real-time voice interaction, sentiment analysis, and personalized feedback, NexusAI transforms your interview preparation experience.

---

## ✨ Features

### 🎯 Core Modules

1. **Smart Resume Analyzer**
   - AI-powered resume parsing and analysis
   - Skills matching and gap identification
   - ATS optimization suggestions
   - Keyword density analysis

2. **Technical Assessment**
   - Real-time coding challenges
   - System design discussions
   - Data structures & algorithms practice
   - Multiple difficulty levels

3. **HR Interview Module**
   - STAR method-based behavioral questions
   - Real-time sentiment analysis
   - Voice-based interaction
   - Confidence & stress level tracking
   - Interactive timer with pause/resume
   - Difficulty selection (Easy/Medium/Hard)

4. **Group Discussion Arena**
   - Multi-participant simulation
   - Real-time collaboration
   - Performance metrics
   - Topic diversity

5. **Aptitude Test Lab**
   - Quantitative reasoning
   - Logical reasoning
   - Verbal ability
   - Data interpretation

6. **Analytics & Reports**
   - Comprehensive performance dashboard
   - Detailed progress tracking
   - Score visualization
   - Historical performance data

### 🎨 New Features (v2.0)

7. **User Profile**
   - Editable personal information
   - Professional details management
   - Achievement showcase
   - Recent activity tracking
   - Performance statistics

8. **Settings & Customization**
   - Theme customization (Light/Dark/System)
   - Accent color selection
   - Notification preferences
   - Audio & voice settings
   - Video recording options
   - Language & region settings
   - Privacy controls
   - Data management

9. **Achievement System**
   - Gamified learning experience
   - Progressive badges
   - Milestone tracking
   - Motivational rewards

10. **Session Management**
    - Session history tracking
    - Auto-save functionality
    - Resume interrupted sessions
    - Export session data

---

## 🛠️ Technology Stack

### Frontend
- **React 19.2** - Modern UI library
- **Vite 7.2** - Lightning-fast build tool
- **React Router 7.13** - Client-side routing
- **Framer Motion 12.33** - Smooth animations
- **TailwindCSS 4.1** - Utility-first CSS framework

### UI Components
- **Lucide React** - Beautiful icon library
- **Chart.js** - Interactive charts
- **clsx/tailwind-merge** - Conditional styling

### APIs & Features
- Web Speech API - Voice recognition
- Speech Synthesis API - Text-to-speech
- PDF.js - Resume parsing
- LocalStorage - Persistent data

---

## 📦 Installation

### Prerequisites
- Node.js >= 16.x
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd project

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📂 Project Structure

```
project/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Sidebar.jsx
│   │   ├── VoiceInterface.jsx
│   │   ├── ScoreChart.jsx
│   │   ├── Toast.jsx
│   │   ├── Skeleton.jsx
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── Dashboard.jsx
│   │   ├── HRModule.jsx
│   │   ├── TechnicalAssessment.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   └── ...
│   ├── context/          # Global state management
│   │   └── GlobalContext.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useTimer.js
│   │   ├── useToast.js
│   │   └── useLocalStorage.js
│   ├── utils/            # Utility functions
│   │   ├── helpers.js
│   │   └── validation.js
│   ├── constants/        # App configuration
│   │   └── index.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎮 Usage

### 1. Getting Started
1. Visit the landing page
2. Click "Get Started" or "Login"
3. Use demo credentials (or sign up)
4. Access the dashboard

### 2. HR Interview Practice
1. Navigate to "HR Interaction" from sidebar
2. Select difficulty level (Easy/Medium/Hard)
3. Click **Play** to start the session
4. Answer questions using voice or text
5. Monitor real-time analytics:
   - Confidence meter
   - Stress level tracking
   - Quick tips
6. Use timer controls:
   - Pause/Resume session
   - Reset if needed

### 3. Profile Management
1. Click "Profile" in the sidebar
2. View your stats and achievements
3. Click "Edit Profile" to update information
4. Save changes

### 4. Customize Settings
1. Navigate to "Settings"
2. Adjust:
   - Appearance (theme, colors, font size)
   - Notifications preferences
   - Audio & voice settings
   - Language & region
   - Privacy controls
3. Export or import your data
4. Click "Save All Settings"

---

## 🧩 Custom Hooks

### `useTimer(initialTime, onComplete)`
Manages countdown timers with pause/resume functionality.

```javascript
const { 
  formattedTime, 
  isRunning, 
  start, 
  pause, 
  resume, 
  reset 
} = useTimer(1800);
```

### `useToast()`
Display toast notifications throughout the app.

```javascript
const { success, error, warning, info } = useToast();
success('Profile updated!');
```

### `useLocalStorage(key, initialValue)`
Persist state to localStorage with React state sync.

```javascript
const [settings, setSettings] = useLocalStorage('settings', {});
```

---

## 🎨 Design Philosophy

NexusAI follows modern design principles:

- **Glassmorphism** - Translucent UI elements with backdrop blur
- **Gradient Accents** - Vibrant color gradients for visual appeal
- **Micro-animations** - Smooth transitions and hover effects
- **Dark Mode First** - Optimized for reduced eye strain
- **Responsive Design** - Mobile, tablet, and desktop support
- **Accessible** - WCAG 2.1 compliant color contrasts

---

## 🔧 Configuration

### Constants (`src/constants/index.js`)
- Application configuration
- Route paths
- Achievement definitions
- Assessment categories
- Performance metrics
- Error/success messages

### Environment Variables
Create a `.env` file:

```env
VITE_APP_NAME=NexusAI
VITE_API_URL=<your-api-url>
VITE_ENABLE_ANALYTICS=true
```

---

## 📊 Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| Resume Analyzer | ✅ | AI-powered resume analysis |
| Technical Assessment | ✅ | Coding & system design practice |
| HR Module | ✅ | Behavioral interview simulation |
| GD Arena | ✅ | Group discussion practice |
| Aptitude Tests | ✅ | Logic & reasoning exercises |
| Analytics | ✅ | Performance tracking |
| Profile | ✅ NEW | User profile management |
| Settings | ✅ NEW | Comprehensive customization |
| Achievements | ✅ NEW | Gamification system |
| Session History | ✅ NEW | Track all practice sessions |
| Toast Notifications | ✅ NEW | User feedback system |
| Timer Controls | ✅ NEW | Pause/resume functionality |

---

## 🚀 Upcoming Features (Roadmap)

- [ ] Backend API integration
- [ ] User authentication (OAuth)
- [ ] Video recording & playback
- [ ] Live mock interviews with mentors
- [ ] AI-generated personalized study plans
- [ ] Mobile app (React Native)
- [ ] Collaborative group discussions
- [ ] Interview scheduling & calendar
- [ ] Resource library
- [ ] Leaderboards & competition

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Design inspiration from modern SaaS platforms
- Icons by [Lucide Icons](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Built with ❤️ using React & Vite

---

## 📧 Contact & Support

For support, email: support@nexusai.com

For bugs and feature requests, please use the [GitHub Issues](https://github.com/your-repo/issues) page.

---

## 🌟 Star History

If you find this project helpful, please consider giving it a ⭐!

---

**Happy Interview Prep! 🎯**

Built with 💙 by the NexusAI Team
