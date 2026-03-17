# 📚 Reading Buddy

## תיאור הפרויקט

**Reading Buddy** היא אפליקציית ווב אינטראקטיבית המעודדת קריאת ספרים בקרב ילדים ונוער (גילאים 6-14+) באמצעות גיימיפיקציה. המערכת משלבת גיוור וענגיזמנט כדי להפוך את קריאת הספרים לחווית כיפית ומוטיבציה.

### תפקידים בסיסיים

- **👤 תלמידים** - קוראים ספרים, צוברים נקודות, מתקדמים ברמות, וזוכים בתגים
- **👨‍🏫 מורים** - עוקבים אחר התקדמות התלמידים, מעניקים בונוסים, וניהול כיתה

---

## 🚀 איך להתחיל

### דרישות מקדימות

- **Node.js** גרסה 14 ומעלה
- **npm** או **yarn**

### התקנה והפעלה

```bash
# התקנת dependencies
npm install

# הפעלת השרת בפיתוח
npm start

# יפתח באופן אוטומטי ב-http://localhost:3000
```

### בנייה לייצור

```bash
# יצירת build מייצור
npm run build

# הבנייה תופיע בתיקייה `build/`
```

---

## 🎮 איך זה עובד

### זרימת התלמיד

```
1. התחברות (LoginScreen)
   ↓
2. בחירת גיל (AgeSelectionScreen)
   ↓
3. בחירת קטגוריה מועדפת (StyleSelectionScreen)
   ↓
4. יצירת אווטאר (AvatarSetupScreen)
   ↓
5. דף הבית (HomeScreen)
   └─→ עיון בקטלוג ספרים
   └─→ בחירה בספר וקריאה
   └─→ עדכון התקדמות
   └─→ השלמה וקבלת נקודות
   └─→ צפייה בפרופיל ולוח התוצאות
```

### זרימת המורה

```
1. התחברות כמורה (LoginScreen)
   ↓
2. דשבורד המורה (TeacherScreen)
   └─→ רשימה של כל התלמידים
   └─→ סטטיסטיקות ביצוע
   └─→ מתן בונוסים לתלמידים
   └─→ עקבות אחר התקדמות
```

---

## 🎯 מערכת הנקודות והרמות

### חישוב נקודות

- **50 נקודות** - השלמת ספר רגיל
- **+20 נקודות** - בונוס לספר עבה (יותר מ-100 עמודים)
- **+10 נקודות** - בונוס למהירות (סיום תוך 7 ימים)
- **50 נקודות** - בונוס מהמורה

### מערכת רמות

```
רמה = floor(סה"כ נקודות / 100) + 1

דוגמה:
- 0-99 נקודות = רמה 1
- 100-199 נקודות = רמה 2
- 200-299 נקודות = רמה 3
```

### תגים (Badges)

- 🏆 `first-book` - השלמת ספר ראשון
- 📚 `three-books` - השלמת 3 ספרים
- 📖 `thick-book` - ספר עבה (>100 עמודים)
- ⚡ `speed-reader` - סיום תוך 7 ימים
- ⭐ `critic` - דירוג 5 כוכבים
- 📈 `level-X` - התקדמות לרמה חדשה

---

## 📊 מבנה הפרויקט

```
reading-buddy/
├── src/
│   ├── components/          # קומפוננטות בסיס
│   │   └── AvatarDisplay.js
│   ├── screens/             # כל מסכי האפליקציה
│   │   ├── LoginScreen.js
│   │   ├── AgeSelectionScreen.js
│   │   ├── StyleSelectionScreen.js
│   │   ├── AvatarSetupScreen.js
│   │   ├── HomeScreen.js
│   │   ├── CatalogScreen.js
│   │   ├── BookDetailScreen.js
│   │   ├── ProgressScreen.js
│   │   ├── CompleteBookScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── LeaderboardScreen.js
│   │   └── TeacherScreen.js
│   ├── context/             # State management (AppContext)
│   │   └── AppContext.js
│   ├── hooks/               # Custom React hooks
│   │   └── useAppContext.js
│   ├── data/                # נתונים סטטיים
│   │   └── mockData.js
│   ├── theme/               # עיצוב ו-styling
│   │   └── theme.js
│   ├── App.js               # רכיב הראשי
│   └── index.js             # נקודת כניסה
├── public/                  # קבצים סטטיים
├── docs/                    # תיעוד
│   └── agent_decisions.md   # החלטות ארכיטקטוניות
├── package.json
└── netlify.toml             # הגדרות Netlify
```

---

## 🗄️ אחסון נתונים

המערכת משתמשת ב-**localStorage** לשמירת כל הנתונים:

### Scoped Keys (לכל משתמש)

```javascript
rb:{userId}:avatar           // נתוני אווטאר
rb:{userId}:userAge          // גיל המשתמש
rb:{userId}:preferredCategory // קטגוריה מועדפת
rb:{userId}:userStats        // נקודות, רמה, תגים
rb:{userId}:currentBook      // הספר שקורא כרגע
rb:{userId}:completedBooks   // ספרים שהושלמו
rb:{userId}:bonusHistory     // היסטוריית בונוסים
```

### Global Keys

```javascript
token; // אסימון התחברות
user; // הנתונים של המשתמש המחובר
activeUserId; // ID של התלמיד הפעיל
teacherStudents; // רשימת כל התלמידים (למורה)
```

---

## 📚 קטגוריות הספרים

1. **דמיון** - פנטזיה, קסם, עולמות דמיוניים
2. **מסתורין** - חקירות, תעלומות, פשעים
3. **הרפתקה** - מסעות, אקשן, נסיעות
4. **היסטוריה** - סיפורים היסטוריים, עבר
5. **מדע** - מדע בדיוני, טכנולוגיה

---

## 🛠️ טכנולוגיות

- **React 19.2.4** - ספריית ה-UI
- **React Router 7.13.0** - ניווט בין מסכים
- **Material-UI 7.3.7** - קומפוננטות עיצוב
- **Emotion** - CSS-in-JS
- **Axios 1.13.4** - בקשות HTTP (עתידי)
- **Create React App** - סביבת פיתוח

---

## 🔐 אבטחה וחיזויים

### המצב כרגע

- ✅ אימות מקומי (Demo)
- ✅ localStorage בלבד
- ⚠️ ללא הצפנה (Demo purposes)

### מומלץ לייצור

- JWT authentication
- Backend API עם validation
- HTTPS / SSL
- הצפנת localStorage
- Role-based access control (RBAC)

---

## 📱 תכונות עיקריות

✅ **מערכת גיימיפיקציה**

- נקודות, רמות, תגים
- הישגים ודירוגים
- הודעות בונוס מיידיות

✅ **ניהול תלמידים**

- כל תלמיד שומר את הנתונים שלו בנפרד
- מורה עוקב אחרי כל התלמידים

✅ **קטלוג ספרים**

- מסננים לפי גיל וקטגוריה
- הערות על כל ספר
- מעקב התקדמות (עמודים)

✅ **דוח מורה**

- סטטיסטיקות כיתה
- מתן בונוסים בודדים
- רשימת תלמידים עם ביצועים

✅ **חוויה חברתית**

- לוח תוצאות (leaderboard)
- הוקרה לביצועים
- השוואה בין תלמידים

---

## 📖 דוגמה שימוש

### כתלמיד

1. התחברות עם שם משתמש
2. בחירת גיל וקטגוריה מועדפת
3. יצירת אווטאר אישי
4. בחירה בספר מהקטלוג
5. קריאה ועדכון התקדמות
6. השלמה וקבלת נקודות
7. צפייה בתגים החדשים ובלוח התוצאות

### כמורה

1. התחברות עם credentials מורה
2. צפייה בדשבורד עם כל התלמידים
3. בחירת תלמיד ומתן בונוס
4. עקבות אחר ההתקדמות הכוללת

---

## 🚀 Deployment

### Netlify

```bash
npm run build
# Upload the 'build' folder to Netlify
```

### סביבת ייצור מומלצת

```
Node.js Backend API
↓
React SPA Frontend
↓
Database (PostgreSQL/MongoDB)
↓
Netlify / Vercel / AWS
```

---

## 📝 Scripts זמינים

```bash
npm start       # הפעלה בפיתוח
npm run build   # בנייה לייצור
npm test        # הרצת בדיקות
npm run eject   # eject מ-Create React App (חד-כיווני!)
```

---

## 📖 תיעוד נוסף

לתיעוד מפורט יותר על ההחלטות הארכיטקטוניות, מבנה מסד הנתונים וחוקי העסק, ראה: [`docs/agent_decisions.md`](./docs/agent_decisions.md)

---

## 👥 Team

**Project**: Reading Buddy  
**Version**: 0.1.0  
**Last Updated**: March 17, 2026  
**Organization**: Ministry of Education

---

## 📄 License

This project is part of the Ministry of Education initiative to promote reading among children and youth.

---

**Happy Reading! 📚✨**
