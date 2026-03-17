# החלטות ארכיטקטוניות - Reading Buddy

## תיאור כללי של הפרויקט

**Reading Buddy** הוא אפליקציית קריאה אינטראקטיבית לילדים ונוער, המעודדת קריאת ספרים באמצעות גיימיפיקציה. המערכת כוללת שני תפקידים עיקריים:

- **תלמידים** - קוראים ספרים, צוברים נקודות, ועוברים שלבים
- **מורים** - עוקבים אחר התקדמות התלמידים, מעניקים בונוסים, ומנהלים את הכיתה

---

## החלטות ארכיטקטוניות מרכזיות

### 1. טכנולוגיות ותשתית

#### Frontend Stack

- **React 19.2.4** - ספריית UI עיקרית
- **React Router DOM 7.13.0** - ניווט בין מסכים
- **Material-UI (MUI) 7.3.7** - מערכת עיצוב מותאמת לילדים
- **Emotion** - CSS-in-JS styling
- **Axios 1.13.4** - תקשורת HTTP (לשימוש עתידי עם backend)

#### Build & Development

- **Create React App 5.0.1** - תצורת הפרויקט
- **Netlify** - פלטפורמת deployment (לפי `netlify.toml`)

### 2. ארכיטקטורת State Management

#### Context API + localStorage

**החלטה מרכזית**: שימוש ב-Context API של React עם localStorage כשכבת Persistence.

**סיבות להחלטה**:

- אפליקציה קטנה-בינונית שאינה דורשת Redux
- נתונים מקומיים בלבד (אין backend כרגע)
- צורך בשמירת נתונים בין סשנים
- פשטות וקלות תחזוקה

#### מבנה AppContext

```javascript
const AppContext = {
  // נתוני משתמש
  user: { id, username, role }, // 'student' או 'teacher'
  avatar: { color, style },
  userAge: number,
  preferredCategory: string,

  // נתוני התקדמות
  currentBook: { ...bookData, currentPage, startDate },
  completedBooks: [],
  userStats: {
    totalPoints: number,
    level: number,
    booksCompleted: number,
    badges: [],
    currentProgress: number
  },

  // היסטוריה ותגמולים
  bonusHistory: [],
  newAchievement: {},
  bonusNotification: {},

  // ספרייה כללית
  allBooks: [],

  // פונקציות
  login, logout, createAvatar, selectBook,
  updateProgress, completeBook, grantBonus, etc.
}
```

### 3. Data Scoping - הפרדת נתונים בין תלמידים

**בעיה שנפתרה**: מספר תלמידים עשויים להשתמש באותו מכשיר.

**פתרון**: מפתחות localStorage עם scope למשתמש:

```javascript
const getUserScopedKey = (userId, key) => `rb:${userId}:${key}`;

// דוגמה:
// rb:student1:avatar
// rb:student1:userStats
// rb:student2:avatar
```

**יתרונות**:

- כל תלמיד שומר את הנתונים שלו בנפרד
- אין התנגשויות בין משתמשים
- מורה רואה את כל התלמידים דרך `teacherStudents` array

### 4. Teacher-Student Synchronization

**אתגר**: סנכרון בין נתוני התלמיד לבין תצוגת המורה.

**פתרון**:

1. כל תלמיד שומר את הנתונים שלו ב-localStorage עם scope אישי
2. רשימת `teacherStudents` גלובלית מאחסנת סיכום עבור המורה
3. בעת `login` של תלמיד - merge בין הנתונים האישיים לבין נתוני המורה
4. עדיפות לנתוני המורה (`points`, `books`, `level`) למניעת אי-התאמות בבונוסים

```javascript
// עדכון אוטומטי של teacherStudents בכל פעולה מרכזית
upsertTeacherStudent({
  id: userId,
  name: username,
  points: totalPoints,
  books: booksCompleted,
  level: calculatedLevel,
  lastActive: new Date().toLocaleDateString("he-IL"),
});
```

### 5. מערכת ניווט ואבטחה

#### Protected Routes

- `ProtectedRoute` - מונע גישה למשתמשים לא מחוברים
- `StudentRoute` - מונע גישה של מורים למסכי תלמידים
- הפניות אוטומטיות בהתאם לשלב ההתקדמות

#### Flow Logic

```javascript
user
  ? role === "teacher"
    ? "/teacher"
    : !userAge
      ? "/age-selection"
      : !preferredCategory
        ? "/style-selection"
        : avatar
          ? "/home"
          : "/avatar-setup"
  : "/login";
```

---

## מבנה מסד הנתונים (localStorage Schema)

### 1. Global Keys (לא-scoped)

| Key               | Type       | Description                 |
| ----------------- | ---------- | --------------------------- |
| `token`           | string     | אסימון התחברות (dummy כרגע) |
| `user`            | JSON       | אובייקט המשתמש המחובר       |
| `activeUserId`    | string     | ID של התלמיד הפעיל          |
| `teacherStudents` | JSON Array | רשימת כל התלמידים (למורה)   |

### 2. User-Scoped Keys (per student)

Pattern: `rb:{userId}:{dataType}`

| Key Pattern                     | Type       | Description       | Example                             |
| ------------------------------- | ---------- | ----------------- | ----------------------------------- |
| `rb:{userId}:avatar`            | JSON       | נתוני אווטאר      | `{color: 'blue', style: 'happy'}`   |
| `rb:{userId}:userAge`           | JSON       | גיל המשתמש        | `10`                                |
| `rb:{userId}:preferredCategory` | JSON       | קטגוריה מועדפת    | `"דמיון"`                           |
| `rb:{userId}:userStats`         | JSON       | סטטיסטיקות        | `{totalPoints, level, badges...}`   |
| `rb:{userId}:currentBook`       | JSON       | ספר נוכחי         | `{...book, currentPage, startDate}` |
| `rb:{userId}:completedBooks`    | JSON Array | ספרים שהושלמו     | `[{book, rating, feedback...}]`     |
| `rb:{userId}:bonusHistory`      | JSON Array | היסטוריית בונוסים | `[{points, message, date}]`         |

### 3. teacherStudents Structure

```javascript
[
  {
    id: string, // student ID
    name: string, // שם התלמיד
    points: number, // סה"כ נקודות
    books: number, // מספר ספרים שהושלמו
    level: number, // רמה נוכחית
    lastActive: string, // תאריך לועזי בפורמט עברי
    status: string, // 'פעיל' / 'לא פעיל'
    avatarColor: string, // צבע אווטאר
    avatarStyle: string, // סגנון אווטאר
  },
];
```

### 4. Books Data Structure

```javascript
{
  id: number,
  title: string,
  author: string,
  category: string,         // 'דמיון', 'מסתורין', 'הרפתקה', 'היסטוריה', 'מדע'
  pages: number,
  ageGroup: string,         // '6-10', '8-12', '10-14', '12+', '14+'
  image: string,            // emoji
  description: string,
  points: number            // נקודות בסיס
}
```

---

## חוקים וכללים מרכזיים

### 1. מערכת נקודות (Points System)

#### נקודות בסיס

- **50 נקודות** - השלמת ספר רגיל
- **+20 נקודות** - בונוס לספר עבה (מעל 100 עמודים)
- **+10 נקודות** - בונוס למהירות (סיום תוך 7 יום)

#### בונוסים ממורה

- **50 נקודות** - ברירת מחדל לבונוס מורה
- ניתן לשינוי ע"י המורה
- מתועד ב-`bonusHistory` של התלמיד

### 2. מערכת שלבים (Leveling)

**נוסחה**: `level = floor(totalPoints / 100) + 1`

- **שלב 1**: 0-99 נקודות
- **שלב 2**: 100-199 נקודות
- **שלב 3**: 200-299 נקודות
- וכן הלאה...

**Level Up**: כאשר תלמיד מגיע לשלב חדש, מופיע מודל הישג מיוחד.

### 3. מערכת תגים (Badges)

#### תגי השלמה

- `first-book` - השלמת ספר ראשון
- `three-books` - השלמת 3 ספרים
- `thick-book` - השלמת ספר עבה (>100 עמודים)

#### תגי ביצועים

- `speed-reader` - סיום ספר תוך 7 ימים
- `critic` - מתן דירוג 5 כוכבים

#### תגי רמות

- `level-2`, `level-3`, `level-4`, etc. - התקדמות לשלב חדש

**אחסון**:

- תגים נשמרים כ-array ייחודי (no duplicates)
- `badges: ['first-book', 'speed-reader', 'level-2']`

### 4. מערכת קטגוריות

#### קטגוריות זמינות

1. **דמיון** - ספרי פנטזיה, קסם, עולמות דמיוניים
2. **מסתורין** - חקירות, תעלומות, פשעים
3. **הרפתקה** - מסעות, אקשן, נסיעות
4. **היסטוריה** - סיפורים היסטוריים, עבר
5. **מדע** - מדע בדיוני, טכנולוגיה

#### Migration Rule

קטגוריות ישנות שהוחלפו:

- `מדע בדיוני` → `מדע`
- `דיסטופיה` → `היסטוריה`

```javascript
const migratedCategory =
  oldCategory === "מדע בדיוני"
    ? "מדע"
    : oldCategory === "דיסטופיה"
      ? "היסטוריה"
      : oldCategory;
```

### 5. קבוצות גיל (Age Groups)

| קבוצת גיל | תיאור           | ספרים מתאימים       |
| --------- | --------------- | ------------------- |
| `6-10`    | ילדים צעירים    | ספרים קצרים ופשוטים |
| `8-12`    | ילדים           | מרבית הספרים        |
| `10-14`   | בני נוער צעירים | ספרים מורכבים יותר  |
| `12+`     | נוער            | תוכן מבוגר יותר     |
| `14+`     | נוער בוגר       | ספרים מאתגרים       |

### 6. מערכת דירוגים

- **1-5 כוכבים** - דירוג איכות הספר
- **משוב טקסטואלי** - אופציונלי
- דירוג 5 כוכבים מעניק תג `critic`
- דירוגים נשמרים עם הספרים המושלמים

### 7. התקדמות בקריאה

```javascript
currentBook: {
  ...bookMetadata,
  startDate: ISO timestamp,
  currentPage: number,      // 0 עד book.pages
  endDate: ISO timestamp    // מוסף בסיום
}
```

**חישוב אחוז**: `(currentPage / totalPages) * 100`

---

## Screens Flow

### Student Journey

```
1. LoginScreen
   ↓
2. AgeSelectionScreen (first time)
   ↓
3. StyleSelectionScreen (first time)
   ↓
4. AvatarSetupScreen (first time)
   ↓
5. HomeScreen (main hub)
   ├→ CatalogScreen → BookDetailScreen → ProgressScreen → CompleteBookScreen
   ├→ ProfileScreen
   └→ LeaderboardScreen
```

### Teacher Journey

```
1. LoginScreen (with teacher credentials)
   ↓
2. TeacherScreen (dashboard)
   - רשימת תלמידים
   - סטטיסטיקות
   - מתן בונוסים
```

---

## Business Rules

### 1. Auto-Registration with Teacher

כאשר תלמיד יוצר אווטאר בפעם הראשונה, הוא נרשם אוטומטית ברשימת התלמידים של המורה:

```javascript
upsertTeacherStudent({
  id: user.id,
  name: user.username,
  points: 0,
  books: 0,
  level: 1,
  lastActive: "עכשיו",
  status: "פעיל",
  avatarColor: avatarData.color,
  avatarStyle: avatarData.style,
});
```

### 2. Bonus Persistence

בונוסים שהמורה נותן לתלמיד נשמרים גם כשהתלמיד לא מחובר:

```javascript
addBonusHistoryForStudent(studentId, points, message);
```

כאשר התלמיד מתחבר, הוא רואה הודעה: "קיבלת בונוס מהמורה!"

### 3. Book Selection Rules

- תלמיד יכול לקרוא **רק ספר אחד בו-זמנית**
- בחירת ספר חדש מחליפה את `currentBook`
- ספר מושלם עובר ל-`completedBooks` ו-`currentBook` מתרוקן

### 4. Progress Validation

- עמוד נוכחי לא יכול להיות שלילי
- עמוד נוכחי לא יכול לעבור את סך העמודים
- תאריך סיום תמיד אחרי תאריך התחלה

### 5. Data Priority Rules

בעת merge של נתונים:

1. **נקודות, ספרים, רמה**: מנתוני `teacherStudents` (אמת מקור)
2. **אווטאר, גיל, קטגוריה**: מנתוני התלמיד האישיים
3. **ספרים מושלמים**: מנתוני התלמיד בלבד

---

## Notifications & Achievements

### 1. Achievement Modal

מוצג לאחר השלמת ספר עם:

- נקודות שהתקבלו
- תגים חדשים
- עליית רמה (אם רלוונטי)

```javascript
return {
  points: 50,
  newBadges: ["first-book", "speed-reader"],
  newLevel: 2,
};
```

### 2. Bonus Notification

מוצג כ-toast למשך 5 שניות כאשר המורה נותן בונוס:

```javascript
setBonusNotification({
  message: "קיבלת בונוס מהמורה!",
  points: 50,
  timestamp: new Date(),
});

setTimeout(() => setBonusNotification(null), 5000);
```

### 3. Level Up Notification

מוצג מודל מיוחד בעת מעבר רמה:

```javascript
setNewAchievement({
  type: "level-up",
  oldLevel: 1,
  newLevel: 2,
});
```

---

## Theme & Design System

### Material-UI Customization

```javascript
const childTheme = createTheme({
  palette: {
    primary: { main: "#6C63FF" },
    secondary: { main: "#FF6584" },
    // ... עוד צבעים
  },
  typography: {
    fontFamily: '"Rubik", "Arial", sans-serif',
    // ... הגדרות טיפוגרפיה
  },
  // ... components overrides
});
```

### Visual Language

- **אימוג'י** כתמונות ספרים (👑, 🔍, ⏰)
- **צבעים עליזים** לגילאי 6-14
- **אנימציות פשוטות** להעשרת החוויה
- **RTL support** - עברית מימין לשמאל

---

## Error Handling & Edge Cases

### 1. Missing User Data

כאשר user לא קיים - הפניה אוטומטית ל-LoginScreen:

```javascript
if (!user) return <Navigate to="/" replace />;
```

### 2. Incomplete Setup

תלמיד שלא השלים את ההרשמה מופנה למסך המתאים:

```javascript
!userAge
  ? "/age-selection"
  : !preferredCategory
    ? "/style-selection"
    : !avatar
      ? "/avatar-setup"
      : "/home";
```

### 3. localStorage Corruption

במקרה של נתונים שגויים ב-localStorage:

- שימוש ב-`JSON.parse()` עם fallback ל-default values
- `|| '[]'` או `|| '{}'` כברירת מחדל

### 4. Teacher Accessing Student Routes

מורה מופנה אוטומטית ל-`/teacher`:

```javascript
if (user.role === "teacher") {
  return <Navigate to="/teacher" replace />;
}
```

---

## Future Considerations

### Backend Integration

המערכת מוכנה למעבר ל-backend:

- Axios כבר מותקן
- Structure תומך בקריאות API
- localStorage ישמש כ-cache/offline mode

### API Structure (מומלץ)

```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/students/:id
PUT    /api/students/:id
POST   /api/books/complete
GET    /api/books
GET    /api/leaderboard
POST   /api/teacher/bonus
```

### Database Schema (מומלץ)

```sql
Users: id, username, password_hash, role, created_at
Students: id, user_id, age, preferred_category, avatar_data
UserStats: id, user_id, points, level, books_completed
Books: id, title, author, category, pages, age_group
CompletedBooks: id, user_id, book_id, start_date, end_date, rating
Badges: id, user_id, badge_type, earned_at
BonusHistory: id, user_id, points, message, created_at
```

---

## Testing Strategy

### Unit Tests (setupTests.js)

- Testing Library מוכן
- Jest configuration

### Recommended Test Coverage

1. **Context Tests**: login, logout, points calculation
2. **Component Tests**: rendering, user interactions
3. **Flow Tests**: complete user journeys
4. **Edge Cases**: missing data, corrupted localStorage

---

## Deployment

### Netlify Configuration

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables (future)

```
REACT_APP_API_URL=https://api.reading-buddy.com
REACT_APP_ENV=production
```

---

## Security Considerations

### Current State (Mock)

- אין אימות אמיתי
- Token dummy
- נתונים local בלבד

### Production Recommendations

1. **Authentication**: JWT tokens, secure sessions
2. **Authorization**: Role-based access control (RBAC)
3. **Data Encryption**: localStorage encryption
4. **Input Validation**: sanitize user inputs
5. **XSS Protection**: escape user-generated content
6. **HTTPS**: enforce SSL/TLS

---

## Performance Optimization

### Current Optimizations

- React.memo for expensive components
- useCallback for event handlers
- Lazy loading (future)

### Recommendations

- Code splitting per route
- Image optimization
- Bundle size monitoring
- Service Workers for offline support

---

## Accessibility (A11y)

### Current Support

- Material-UI built-in accessibility
- Semantic HTML
- Keyboard navigation

### Improvements Needed

- ARIA labels for RTL
- Screen reader testing
- Color contrast validation
- Focus management

---

## Version History & Migrations

### Data Migrations Implemented

#### v1.1 - Category Migration

```javascript
'מדע בדיוני' → 'מדע'
'דיסטופיה' → 'היסטוריה'
```

### Breaking Changes Log

- None yet (v0.1.0)

---

## Contributing Guidelines

### Code Style

- ESLint configuration (react-app)
- Prettier (recommended)
- RTL CSS conventions

### Commit Messages

```
feat: add bonus history to profile screen
fix: resolve level calculation bug
docs: update architecture decisions
refactor: simplify book completion logic
```

### Branch Strategy (recommended)

```
main - production
develop - integration
feature/* - new features
bugfix/* - bug fixes
```

---

## Summary of Key Decisions

| Decision                 | Rationale                         | Trade-offs                       |
| ------------------------ | --------------------------------- | -------------------------------- |
| **Context API**          | Simple state management           | Not suitable for very large apps |
| **localStorage**         | Offline-first, no backend yet     | Limited to 5-10MB, not secure    |
| **User-scoped keys**     | Multi-user support on same device | Slightly complex key management  |
| **Material-UI**          | Rich component library            | Bundle size                      |
| **RTL Hebrew**           | Native language support           | Some layout challenges           |
| **No Backend**           | Faster MVP development            | Need migration later             |
| **Dummy Auth**           | Focus on features first           | Security concerns                |
| **Teacher-Student Sync** | Unified data view for teachers    | Complex merge logic              |

---

## Contact & Maintenance

**Project**: Reading Buddy  
**Version**: 0.1.0  
**Last Updated**: February 19, 2026  
**Maintainer**: Development Team

---

_סוף המסמך_
