import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const defaultUserStats = {
    totalPoints: 0,
    level: 1,
    booksCompleted: 0,
    badges: [],
    currentProgress: 0,
  };

  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [userAge, setUserAge] = useState(null);
  const [preferredCategory, setPreferredCategory] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [userStats, setUserStats] = useState(defaultUserStats);
  const [allBooks, setAllBooks] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);
  const [newAchievement, setNewAchievement] = useState(null);
  const [bonusNotification, setBonusNotification] = useState(null);
  const [bonusHistory, setBonusHistory] = useState([]);

  const getUserScopedKey = (userId, key) => `rb:${userId}:${key}`;

  const upsertTeacherStudent = (partialStudent) => {
    const teacherStudents = JSON.parse(localStorage.getItem('teacherStudents') || '[]');
    const existingIndex = teacherStudents.findIndex((s) => s.id === partialStudent.id);

    if (existingIndex >= 0) {
      teacherStudents[existingIndex] = {
        ...teacherStudents[existingIndex],
        ...partialStudent,
      };
    } else {
      teacherStudents.push(partialStudent);
    }

    localStorage.setItem('teacherStudents', JSON.stringify(teacherStudents));
    return teacherStudents;
  };

  const loadStudentProfile = (userId) => {
    const savedAvatar = localStorage.getItem(getUserScopedKey(userId, 'avatar'));
    const savedAge = localStorage.getItem(getUserScopedKey(userId, 'userAge'));
    const savedPreferredCategory = localStorage.getItem(getUserScopedKey(userId, 'preferredCategory'));
    const savedStats = localStorage.getItem(getUserScopedKey(userId, 'userStats'));
    const savedCurrentBook = localStorage.getItem(getUserScopedKey(userId, 'currentBook'));
    const savedCompletedBooks = localStorage.getItem(getUserScopedKey(userId, 'completedBooks'));
    const savedBonusHistory = localStorage.getItem(getUserScopedKey(userId, 'bonusHistory'));

    setAvatar(savedAvatar ? JSON.parse(savedAvatar) : null);
    setUserAge(savedAge ? JSON.parse(savedAge) : null);

    if (savedPreferredCategory) {
      const parsedPreferredCategory = JSON.parse(savedPreferredCategory);
      const migratedPreferredCategory =
        parsedPreferredCategory === 'מדע בדיוני'
          ? 'מדע'
          : parsedPreferredCategory === 'דיסטופיה'
            ? 'היסטוריה'
            : parsedPreferredCategory;
      setPreferredCategory(migratedPreferredCategory);
    } else {
      setPreferredCategory(null);
    }

    // Start from per-student stored stats
    let mergedStats = savedStats ? JSON.parse(savedStats) : defaultUserStats;

    // If this student exists in teacherStudents, prefer the teacher's
    // view of points/books/level so bonuses יהיו מסונכרנים.
    const teacherStudents = JSON.parse(localStorage.getItem('teacherStudents') || '[]');
    const teacherEntry = teacherStudents.find((s) => s.id === userId);
    if (teacherEntry) {
      mergedStats = {
        ...mergedStats,
        totalPoints: typeof teacherEntry.points === 'number' ? teacherEntry.points : mergedStats.totalPoints,
        booksCompleted: typeof teacherEntry.books === 'number' ? teacherEntry.books : mergedStats.booksCompleted,
        level: typeof teacherEntry.level === 'number' ? teacherEntry.level : mergedStats.level,
      };
    }

    setUserStats(mergedStats);
    setCurrentBook(savedCurrentBook ? JSON.parse(savedCurrentBook) : null);
    setCompletedBooks(savedCompletedBooks ? JSON.parse(savedCompletedBooks) : []);
    setBonusHistory(savedBonusHistory ? JSON.parse(savedBonusHistory) : []);
  };

  // Allow teacher actions to append a bonus-history entry for any student,
  // so that when the student יתחבר, הוא יראה "קיבלת בונוס מהמורה" בפרופיל.
  const addBonusHistoryForStudent = (studentId, bonusPoints, message) => {
    const key = getUserScopedKey(studentId, 'bonusHistory');
    const existing = JSON.parse(localStorage.getItem(key) || '[]');

    const newBonus = {
      id: Date.now(),
      points: bonusPoints,
      message,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('he-IL'),
    };

    const updated = [newBonus, ...existing];
    localStorage.setItem(key, JSON.stringify(updated));
  };

  // On mount, do NOT auto-login any user.
  // We keep per-student data in localStorage, but login will load it explicitly.
  useEffect(() => {
    // Intentionally left blank to start at LoginScreen each time.
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (!user || user.role !== 'student') return;
    localStorage.setItem(getUserScopedKey(user.id, 'avatar'), JSON.stringify(avatar));
  }, [user, avatar]);

  useEffect(() => {
    if (!user || user.role !== 'student') return;
    if (userAge) {
      localStorage.setItem(getUserScopedKey(user.id, 'userAge'), JSON.stringify(userAge));
    } else {
      localStorage.removeItem(getUserScopedKey(user.id, 'userAge'));
    }
  }, [user, userAge]);

  useEffect(() => {
    if (!user || user.role !== 'student') return;
    if (preferredCategory) {
      localStorage.setItem(getUserScopedKey(user.id, 'preferredCategory'), JSON.stringify(preferredCategory));
    } else {
      localStorage.removeItem(getUserScopedKey(user.id, 'preferredCategory'));
    }
  }, [user, preferredCategory]);

  useEffect(() => {
    if (!user || user.role !== 'student') return;
    localStorage.setItem(getUserScopedKey(user.id, 'userStats'), JSON.stringify(userStats));
  }, [user, userStats]);

  useEffect(() => {
    if (!user || user.role !== 'student') return;
    if (currentBook) {
      localStorage.setItem(getUserScopedKey(user.id, 'currentBook'), JSON.stringify(currentBook));
    } else {
      localStorage.removeItem(getUserScopedKey(user.id, 'currentBook'));
    }
  }, [user, currentBook]);

  useEffect(() => {
    if (!user || user.role !== 'student') return;
    localStorage.setItem(getUserScopedKey(user.id, 'completedBooks'), JSON.stringify(completedBooks));
  }, [user, completedBooks]);

  useEffect(() => {
    if (!user || user.role !== 'student') return;
    localStorage.setItem(getUserScopedKey(user.id, 'bonusHistory'), JSON.stringify(bonusHistory));
  }, [user, bonusHistory]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', 'dummy-token'); // Simulated token

    if (userData && userData.role === 'student') {
      localStorage.setItem('activeUserId', userData.id);
      loadStudentProfile(userData.id);
    } else {
      localStorage.removeItem('activeUserId');
    }
  };

  const logout = () => {
    setUser(null);
    setAvatar(null);
    setUserAge(null);
    setPreferredCategory(null);
    setCurrentBook(null);
    setUserStats(defaultUserStats);
    setCompletedBooks([]);
    setBonusHistory([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('activeUserId');
  };

  const createAvatar = (avatarData) => {
    setAvatar(avatarData);

    // Auto-register student with teacher
    if (user && user.role === 'student') {
      upsertTeacherStudent({
        id: user.id,
        name: user.username,
        points: 0,
        books: 0,
        level: 1,
        lastActive: 'עכשיו',
        status: 'פעיל',
        avatarColor: avatarData.color,
        avatarStyle: avatarData.style,
      });
    }
  };

  const selectBook = (book) => {
    const newBook = {
      ...book,
      startDate: new Date().toISOString(),
      currentPage: 0,
    };
    setCurrentBook(newBook);
  };

  const updateProgress = (page) => {
    if (currentBook) {
      setCurrentBook({
        ...currentBook,
        currentPage: page,
      });
    }
  };

  const completeBook = (rating, feedback) => {
    if (currentBook) {
      const completedBook = {
        ...currentBook,
        endDate: new Date().toISOString(),
        rating,
        feedback,
        completed: true,
      };
      setCompletedBooks([...completedBooks, completedBook]);

      // Calculate points
      let points = 50; // Base points
      const newBadges = [];
      
      // Check for first book badge
      if (completedBooks.length === 0) {
        newBadges.push('first-book');
      }

      // Check for three books badge
      if (completedBooks.length === 2) { // Will be 3 after this book
        newBadges.push('three-books');
      }

      // Bonus for thick books (> 100 pages)
      if (currentBook.pages > 100) {
        points += 20;
        newBadges.push('thick-book');
      }
      
      // Bonus for speed (completed within 7 days)
      const startDate = new Date(currentBook.startDate);
      const endDate = new Date();
      const daysDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
      if (daysDiff <= 7) {
        points += 10;
        newBadges.push('speed-reader');
      }

      // Check for 5-star critic badge
      if (rating === 5) {
        newBadges.push('critic');
      }

      // Update stats
      const newStats = {
        ...userStats,
        totalPoints: userStats.totalPoints + points,
        booksCompleted: userStats.booksCompleted + 1,
      };

      // Check for level up and add level badges
      const newLevel = Math.floor(newStats.totalPoints / 100) + 1;
      if (newLevel > userStats.level) {
        newStats.level = newLevel;
        newBadges.push(`level-${newLevel}`);
      }

      // Add all new badges (without duplicates)
      const uniqueBadges = [...new Set([...userStats.badges, ...newBadges])];
      newStats.badges = uniqueBadges;

      setUserStats(newStats);

      // Update student in teacher's list
      if (user && user.role === 'student') {
        const teacherStudents = JSON.parse(localStorage.getItem('teacherStudents') || '[]');
        const existing = teacherStudents.find((s) => s.id === user.id);
        const currentPoints = existing?.points ?? 0;
        const currentBooks = existing?.books ?? 0;
        const nextPoints = currentPoints + points;
        const nextBooks = currentBooks + 1;

        upsertTeacherStudent({
          id: user.id,
          name: user.username,
          points: nextPoints,
          books: nextBooks,
          level: Math.floor(nextPoints / 100) + 1,
          lastActive: new Date().toLocaleDateString('he-IL'),
        });
      }

      setCurrentBook(null);

      // Return new badges for achievement modal
      return { points, newBadges, newLevel: newStats.level };
    }
  };

  const grantBonus = (bonusPoints = 50, message = 'קיבלת בונוס מהמורה!') => {
    const newStats = {
      ...userStats,
      totalPoints: userStats.totalPoints + bonusPoints,
    };

    // Check for level up
    const oldLevel = userStats.level;
    const newLevel = Math.floor(newStats.totalPoints / 100) + 1;
    if (newLevel > oldLevel) {
      newStats.level = newLevel;
      newStats.badges = [...newStats.badges, `level-${newLevel}`];
      setNewAchievement({
        type: 'level-up',
        oldLevel,
        newLevel,
      });
    }

    setUserStats(newStats);

    // Update student in teacher's list
    if (user && user.role === 'student') {
      const teacherStudents = JSON.parse(localStorage.getItem('teacherStudents') || '[]');
      const existing = teacherStudents.find((s) => s.id === user.id);
      const currentPoints = existing?.points ?? 0;
      const nextPoints = currentPoints + bonusPoints;

      upsertTeacherStudent({
        id: user.id,
        name: user.username,
        points: nextPoints,
        books: existing?.books ?? 0,
        level: Math.floor(nextPoints / 100) + 1,
        lastActive: new Date().toLocaleDateString('he-IL'),
      });
    }
    
    // Add to bonus history
    const newBonus = {
      id: Date.now(),
      points: bonusPoints,
      message: 'המורה הוסיפה לך בונוס',
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('he-IL'),
    };
    setBonusHistory([newBonus, ...bonusHistory]);
    
    setBonusNotification({
      message,
      points: bonusPoints,
      timestamp: new Date(),
    });

    // Clear notification after 5 seconds
    setTimeout(() => setBonusNotification(null), 5000);
  };

  const value = {
    user,
    avatar,
    userAge,
    preferredCategory,
    currentBook,
    userStats,
    allBooks,
    completedBooks,
    bonusHistory,
    newAchievement,
    bonusNotification,
    login,
    logout,
    createAvatar,
    selectBook,
    updateProgress,
    completeBook,
    grantBonus,
    addBonusHistoryForStudent,
    setAllBooks,
    setUserAge,
    setPreferredCategory,
    setNewAchievement,
    setBonusNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
