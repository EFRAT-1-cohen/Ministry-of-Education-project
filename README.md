# 📚 Ministry of Education - Reading Buddy Project

## 🎯 הפרויקט

**Reading Buddy** - אפליקציית ווב לעידוד קריאה בקרב ילדים ונוער בעזרת גיימיפיקציה ומנגנוני עידוד.

פרויקט משותף של המשרד להנדסה ופיתוח מערכות לימודיות מודרניות.

---

## 📁 מבנה המילוח

```
Ministry-of-Education-project/
│
├── 📂 reading-buddy/              ⭐ MAIN PROJECT - אפליקציית קריאה
│   ├── src/                       קוד המקור
│   │   ├── screens/              מסכי האפליקציה (קומפוננטות עיקריות)
│   │   ├── components/           קומפוננטות משנה
│   │   ├── context/              ניהול state (AppContext)
│   │   ├── data/                 נתונים סטטיים (mockData)
│   │   ├── hooks/                custom hooks
│   │   ├── theme/                עיצוב וצבעים
│   │   └── App.js                קומפוננט הראשי
│   ├── public/                   קבצים סטטיים (images, manifest)
│   ├── docs/                     תיעוד מפורט
│   │   └── agent_decisions.md    החלטות ארכיטקטוניות מלאות
│   ├── build/                    בנייה מייצור (אחרי npm run build)
│   ├── package.json              dependencies
│   ├── netlify.toml              הגדרות deployment
│   └── README.md                 📖 הסבר מפורט על הפרויקט
│
├── 📂 public/                     (קבצים סטטיים לשורש)
│
├── 📂 src/                        (TypeScript/Vite setup - לשימוש עתידי)
│
├── eslint.config.js              ESLint configuration
├── vite.config.ts                Vite build configuration
├── tsconfig.json                 TypeScript configuration
├── package.json                  Root dependencies
└── README.md                      📖 הקובץ הזה
```

---

## 🚀 תחילת עבודה מהירה

### 1. התקנה

```bash
cd reading-buddy
npm install
```

### 2. הפעלה בפיתוח

```bash
npm start
# יפתח אוטומטית ב-http://localhost:3000
```

### 3. בנייה לייצור

```bash
npm run build
```

---

## 📖 מה יש בכל תקייה?

### 📂 `reading-buddy/`

**הפרויקט הראשי** - אפליקציית React עם Create React App

- 🎮 מסכי משתמש מלאים
- 👥 ניהול תלמידים ומורים
- 📚 קטלוג ספרים עם גיימיפיקציה
- 💾 שמירת נתונים ב-localStorage

**לחץ כאן לקריאת הסבר מלא:** [`reading-buddy/README.md`](./reading-buddy/README.md)

---

### 📂 `reading-buddy/src/screens/`

כל מסכי האפליקציה:

- `LoginScreen.js` - התחברות
- `AgeSelectionScreen.js` - בחירת גיל
- `StyleSelectionScreen.js` - בחירת קטגוריה
- `AvatarSetupScreen.js` - יצירת אווטאר
- `HomeScreen.js` - דף הבית
- `CatalogScreen.js` - רשימת ספרים
- `BookDetailScreen.js` - פרטי ספר
- `ProgressScreen.js` - עדכון התקדמות קריאה
- `CompleteBookScreen.js` - סיום ספר
- `ProfileScreen.js` - פרופיל תלמיד
- `LeaderboardScreen.js` - לוח תוצאות
- `TeacherScreen.js` - דשבורד מורה

---

### 📂 `reading-buddy/src/context/`

ניהול state משותף:

- `AppContext.js` - Context מרכזי עם כל נתוני האפליקציה

**תכנים:**

- משתמש וחיבור
- סטטיסטיקות תלמיד
- ספרים במהלך קריאה
- בונוסים והישגים
- פונקציות עדכון הנתונים

---

### 📂 `reading-buddy/src/data/`

נתונים סטטיים:

- `mockData.js` - 987 שורות כוללות:
  - ✅ 100+ ספרים עם מטא-דטה
  - 📊 דירוגים והערות
  - 🏆 תגים ותגמולים
  - 👥 רשימות תלמידים לדוגמה

---

### 📂 `reading-buddy/docs/`

תיעוד וארכיטקטורה:

- **`agent_decisions.md`** (716 שורות!) - תיעוד מפורט מאוד:
  - 🏗️ החלטות ארכיטקטוניות
  - 🗄️ מבנה מסד נתונים (localStorage schema)
  - 📋 חוקי ביזנס וכללים
  - 🎮 זרימות משתמשים
  - 🔒 שיקולי אבטחה
  - 🚀 תכנון עתידי (Backend integration)

---

### 📂 `reading-buddy/public/`

קבצים סטטיים:

- `index.html` - עמוד הבסיס
- `manifest.json` - PWA manifest
- `robots.txt` - SEO
- תמונות ו-favicon

---

### 📂 `reading-buddy/build/`

תוצאת `npm run build` (production)

- `index.html` - minified
- `static/js/` - JavaScript bundles
- `static/css/` - CSS minified
- `asset-manifest.json` - מפת assets

---

## 🎯 התחלה מהקראת הקוד

### 1️⃣ תחילה - קרא את התיעוד

```
📖 קרא: reading-buddy/README.md
📖 קרא: docs/agent_decisions.md
```

### 2️⃣ הבנה - בדוק את הקומפוננטות

```
🔍 בדוק: src/context/AppContext.js
🔍 בדוק: src/screens/LoginScreen.js
🔍 בדוק: src/screens/HomeScreen.js
```

### 3️⃣ הפעלה - תריץ locally

```
🚀 הרץ: npm install && npm start
🌐 פתח: http://localhost:3000
```

### 4️⃣ בדיקה - נסה את התכנונות

```
✅ התחבר כתלמיד
✅ בחר ספר וסיים אותו
✅ בדוק נקודות ותגים
✅ התחבר כמורה וראה את הדשבורד
```

---

## 🛠️ Stack טכנולוגי

| שכבה             | טכנולוגיה              | סיבה                           |
| ---------------- | ---------------------- | ------------------------------ |
| **UI Framework** | React 19               | מודרני, components-based       |
| **Routing**      | React Router 7         | ניווט seamless                 |
| **Components**   | Material-UI 7          | עיצוב יפה וגישות               |
| **Styling**      | Emotion                | CSS-in-JS, RTL support         |
| **Build**        | Create React App       | Setup מוכן, development smooth |
| **HTTP**         | Axios                  | עתידי backend integration      |
| **Testing**      | Jest + Testing Library | בדיקות יחידה                   |
| **Deployment**   | Netlify                | CI/CD אוטומטי                  |

---

## 💾 אחסון נתונים

כל הנתונים נשמרים ב-**localStorage**:

```javascript
// Global keys
token                 // aסימון התחברות
user                  // הנתונים של המשתמש המחובר
teacherStudents       // רשימת כל התלמידים

// Per-student keys (scoped)
rb:{userId}:avatar
rb:{userId}:userStats
rb:{userId}:currentBook
rb:{userId}:completedBooks
rb:{userId}:bonusHistory
```

---

## 📊 ארכיטקטורה

```
┌─────────────────────────────────┐
│     Screens / Components        │  ← UI Layer
├─────────────────────────────────┤
│      AppContext (State)         │  ← Logic Layer
├─────────────────────────────────┤
│      localStorage               │  ← Data Layer
└─────────────────────────────────┘

(Future: Add Backend API)
```

---

## 🎮 תכונות עיקריות

| תכונה            | מצב   | הערות                |
| ---------------- | ----- | -------------------- |
| ✅ התחברות       | מוגמר | Mock, demo purposes  |
| ✅ גיימיפיקציה   | מוגמר | נקודות, רמות, תגים   |
| ✅ קטלוג ספרים   | מוגמר | 100+ ספרים, מסננים   |
| ✅ ניהול תלמידים | מוגמר | מורים יכולים לעקוב   |
| ✅ דשבורד מורה   | מוגמר | סטטיסטיקות, בונוסים  |
| ✅ לוח תוצאות    | מוגמר | דירוג תלמידים        |
| ⏳ Backend API   | תכנון | ready to integrate   |
| ⏳ Database      | תכנון | PostgreSQL / MongoDB |
| ⏳ Auth אמיתי    | תכנון | JWT tokens           |

---

## 🚀 הצעדים הבאים

### שלב 1: Backend (2-3 שבועות)

- [ ] Node.js + Express / FastAPI
- [ ] Database (PostgreSQL / MongoDB)
- [ ] JWT Authentication
- [ ] API endpoints

### שלב 2: Enhancements (3-4 שבועות)

- [ ] More books library
- [ ] Advanced filtering
- [ ] Social features
- [ ] Notifications

### שלב 3: Deployment (1 שבוע)

- [ ] Server setup
- [ ] CI/CD pipeline
- [ ] Monitoring
- [ ] Analytics

---

## 📚 קישורים שימושיים

- 🔗 [GitHub Repository](https://github.com/EFRAT-1-cohen/Ministry-of-Education-project)
- 📖 [Project README](./reading-buddy/README.md)
- 📋 [Architecture Decisions](./reading-buddy/docs/agent_decisions.md)
- 🌐 [Live Demo](https://reading-buddy.netlify.app) (כשיהיה deployed)

---

## 👥 How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

לשאלות, הערות או בדוחות באגים:

1. פתח [GitHub Issue](https://github.com/EFRAT-1-cohen/Ministry-of-Education-project/issues)
2. או כתוב דוא"ל למנהל הפרויקט

---

## 📄 License

This project is part of the Ministry of Education initiative.

---

**Last Updated:** March 17, 2026  
**Version:** 0.1.0  
**Status:** 🟢 Active Development

---

## 🎉 Get Started Now!

```bash
cd reading-buddy
npm install
npm start
```

**Enjoy! 📚✨**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
