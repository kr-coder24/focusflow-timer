# FocusFlow - Modern Pomodoro Timer

A beautiful, modern Pomodoro timer built with React and JavaScript to help you stay focused and productive. Features sound effects, auto-session switching, and dark/light theme support.

## ✨ Features

- **Beautiful Modern Design**: Clean, glassmorphism-inspired interface with smooth animations
- **Dark/Light Theme**: Toggle between dark and light modes with persistent settings
- **Sound Effects**: Button clicks, break notifications, and back-to-work alerts
- **Auto Session Management**: Automatically switches between focus and break periods
- **Smart Timer Management**: Preserves timer state when switching between modes
- **Inspirational Quotes**: Fresh motivational quotes powered by API Ninjas
- **Progress Tracking**: Visual progress bars and session counters
- **Desktop Notifications**: Get notified when sessions start and end
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your computer:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A code editor like **VS Code** (recommended)
- **Git** for version control - [Download here](https://git-scm.com/)

### Installation

Follow these steps to get the project running on your local machine:

1. **Clone or download the repository**:
   ```bash
   git clone <your-repo-url>
   cd focusflow-timer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   This will install all the required packages including React, Vite, Tailwind CSS, and other dependencies.

3. **Set up your API key**:
   - Create a `.env` file in the root directory of the project
   - Copy the content from `.env.example` and replace with your actual API key:
   ```env
   VITE_NINJA_API_KEY=your_actual_api_key_here
   ```
   - Get your free API key from [API Ninjas](https://api.api-ninjas.com/)

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   This will start the Vite development server, usually on `http://localhost:5173`

5. **Open your browser**:
   Navigate to the URL shown in your terminal (typically `http://localhost:5173`)

### Building for Production

To create a production build:

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

To preview the production build locally:

```bash
npm run preview
```

## 🎯 How to Use

1. **Choose Your Mode**: Select between Pomodoro (25 min), Short Break (5 min), or Long Break (15 min)
2. **Start Focusing**: Click the Start button to begin your session (with satisfying button sound!)
3. **Auto Sessions**: Sessions automatically switch and start after completion with audio cues
4. **Theme Toggle**: Click the sun/moon icon to switch between light and dark themes
5. **Stay Motivated**: Read the inspirational quote and refresh it anytime by clicking the refresh button
6. **Track Progress**: Watch your progress bar and session counter
7. **Get Notifications**: Allow browser notifications to get alerts when sessions end

## 🔊 Sound Effects

The timer includes three types of sound effects:
- **Button Sound**: Plays when clicking start, pause, reset, or mode switch buttons
- **Break Sound**: Plays when a focus session ends and it's time for a break
- **Back to Work Sound**: Plays when a break ends and it's time to focus again

All sounds are optimized for a pleasant user experience without being disruptive.

## 🌙 Dark/Light Theme

Toggle between beautiful dark and light themes:
- **Light Theme**: Clean, bright interface perfect for daytime use
- **Dark Theme**: Easy on the eyes for evening sessions or low-light environments
- **Persistent Settings**: Your theme preference is saved and restored on next visit

## 🛠️ Built With

- **React 18** - Modern React with hooks
- **JavaScript (ES6+)** - Modern JavaScript features
- **Tailwind CSS** - Utility-first CSS framework with dark mode support
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful, customizable icons
- **API Ninjas** - Inspirational quotes API
- **Web Audio API** - For sound effects

## 📱 Features in Detail

### Smart State Management
- Timer state persists when switching between modes
- No more losing progress when changing tabs
- Automatic session counting and mode switching
- Auto-start next session after 3-second delay

### Beautiful Design
- Glassmorphism effects with backdrop blur
- Smooth color transitions between modes
- Dark/light theme with smooth transitions
- Responsive design for all screen sizes
- Hover animations and micro-interactions

### Productivity Features
- Desktop notifications for session changes
- Progress visualization with animated progress bars
- Session tracking throughout the day
- Fresh inspirational quotes to keep you motivated
- Audio feedback for all interactions

## 🔧 Configuration

The timer uses these default durations:
- **Pomodoro**: 25 minutes (focus time)
- **Short Break**: 5 minutes  
- **Long Break**: 15 minutes

After every 4 Pomodoro sessions, a long break is automatically suggested.

## 📁 Project Structure

```
focusflow-timer/
├── public/
│   └── sounds/              # Audio files
│       ├── button-sound.mp3
│       ├── break.mp3
│       └── backtowork.mp3
├── src/
│   ├── components/          # React components
│   │   ├── ModeSelector.jsx
│   │   ├── TimerDisplay.jsx
│   │   ├── ProgressBar.jsx
│   │   └── QuoteCard.jsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useTimer.js
│   │   ├── useQuotes.js
│   │   └── useTheme.js
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables (create this)
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── README.md              # This file
```

## 🌐 API Integration

This app uses the API Ninjas Quotes API to fetch inspirational quotes. To set this up:

1. Visit [API Ninjas](https://api.api-ninjas.com/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file as `VITE_NINJA_API_KEY`

The app includes fallback quotes in case the API is unavailable.

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard
4. Your app will be live at your custom Netlify URL

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🐛 Troubleshooting

### Common Issues

1. **Quotes not loading**: Check your API key in the `.env` file
2. **Notifications not working**: Allow notifications in your browser settings
3. **Sounds not playing**: Check browser audio permissions and volume settings
4. **Timer not starting**: Check browser console for error messages
5. **Theme not persisting**: Check if localStorage is enabled in your browser

### Getting Help

If you encounter any issues:
1. Check the browser console for error messages
2. Ensure all dependencies are installed: `npm install`
3. Verify your `.env` file is set up correctly
4. Try clearing your browser cache
5. Make sure sound files are properly loaded in the `/public/sounds/` directory

---

**Stay focused, stay productive with FocusFlow! 🚀**

## 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [API Ninjas Documentation](https://api.api-ninjas.com/)