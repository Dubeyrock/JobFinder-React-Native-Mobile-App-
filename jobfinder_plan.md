# 🚀 JobFinder App — Complete Build Plan

## Tech Stack
| Cheez | Kya use karein |
|-------|----------------|
| Framework | React Native + Expo (v57) |
| Language | JavaScript |
| Navigation | React Navigation (Stack + Bottom Tabs) |
| Jobs Data | Remotive API (free, no API key) |
| Saved Jobs | AsyncStorage |
| State | useState, useEffect, Context API |
| Icons | @expo/vector-icons (Ionicons) |

## App Structure
```
JobFinder/
├── App.js                  # Navigation setup
├── src/
│   ├── context/
│   │   ├── BookmarkContext.js    # Saved jobs context
│   │   └── ThemeContext.js       # Dark mode context
│   ├── screens/
│   │   ├── HomeScreen.js         # Job listing + search + filter
│   │   ├── JobDetailScreen.js    # Job details + apply button
│   │   ├── SavedJobsScreen.js    # Bookmarked jobs
│   │   └── SettingsScreen.js     # Dark mode toggle
│   ├── components/
│   │   ├── JobCard.js            # Individual job card
│   │   ├── SearchBar.js          # Search input
│   │   ├── CategoryFilter.js    # Horizontal category chips
│   │   └── LoadingSpinner.js    # Loading indicator
│   ├── services/
│   │   └── api.js               # Remotive API calls
│   └── theme/
│       └── colors.js            # Color palette (light + dark)
```

## Features by Level

### ✅ Level 1 — MVP (Must Have)
- [x] Job list from Remotive API
- [x] Job detail screen with full info
- [x] Apply button (opens job URL in browser)
- [x] Stack navigation (Home → Detail)

### ✅ Level 2 — Enhanced
- [x] Search bar (filter by title/company)
- [x] Category filter chips (Software Dev, Marketing, Design, etc.)
- [x] Save/Bookmark jobs (AsyncStorage)
- [x] Saved Jobs screen (Bottom Tab)
- [x] Loading spinner + Error states with retry
- [x] Pull-to-refresh

### ✅ Level 3 — Bonus (Resume-Strong)
- [x] Dark mode with toggle
- [x] Settings screen
- [x] Smooth animations on job cards
- [x] Premium UI with gradients and modern design

## API Reference
- **Endpoint**: `https://remotive.com/api/remote-jobs`
- **Params**: `?category=software-dev&search=react&limit=20`
- **Categories**: software-dev, design, marketing, customer-support, sales, product, data, writing, hr, finance, all-others

## Implementation Order
1. Install dependencies (navigation, asyncstorage, icons, webview)
2. Create theme/colors + context providers
3. Build API service
4. Build reusable components (JobCard, SearchBar, CategoryFilter, LoadingSpinner)
5. Build screens (Home → Detail → SavedJobs → Settings)
6. Wire up navigation (Stack + Bottom Tabs)
7. Test and polish
