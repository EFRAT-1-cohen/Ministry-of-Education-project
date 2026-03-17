import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Theme
import childTheme from './theme/theme';

// Context
import { AppProvider, AppContext } from './context/AppContext';

// Screens
import LoginScreen from './screens/LoginScreen';
import AgeSelectionScreen from './screens/AgeSelectionScreen';
import StyleSelectionScreen from './screens/StyleSelectionScreen';
import AvatarSetupScreen from './screens/AvatarSetupScreen';
import HomeScreen from './screens/HomeScreen';
import CatalogScreen from './screens/CatalogScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import ProgressScreen from './screens/ProgressScreen';
import CompleteBookScreen from './screens/CompleteBookScreen';
import ProfileScreen from './screens/ProfileScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import TeacherScreen from './screens/TeacherScreen';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AppContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Student Route Component - prevents teachers from accessing student pages
const StudentRoute = ({ children }) => {
  const { user } = React.useContext(AppContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role === 'teacher') {
    return <Navigate to="/teacher" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { user, avatar, userAge, preferredCategory } = React.useContext(AppContext);

  // Redirect based on login/setup status
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          user ? (
            user.role === 'teacher' ? (
              <Navigate to="/teacher" replace />
            ) : (
              <Navigate
                to={
                  !userAge
                    ? '/age-selection'
                    : !preferredCategory
                      ? '/style-selection'
                      : avatar
                        ? '/home'
                        : '/avatar-setup'
                }
                replace
              />
            )
          ) : (
            <LoginScreen />
          )
        } 
      />

      <Route
        path="/age-selection"
        element={
          <StudentRoute>
            <AgeSelectionScreen />
          </StudentRoute>
        }
      />

      <Route
        path="/style-selection"
        element={
          <StudentRoute>
            <StyleSelectionScreen />
          </StudentRoute>
        }
      />

      <Route
        path="/avatar-setup"
        element={
          <ProtectedRoute>
            {user?.role === 'teacher' ? (
              <Navigate to="/teacher" replace />
            ) : (
              !userAge ? (
                <Navigate to="/age-selection" replace />
              ) : !preferredCategory ? (
                <Navigate to="/style-selection" replace />
              ) : avatar ? (
                <Navigate to="/home" replace />
              ) : (
                <AvatarSetupScreen />
              )
            )}
          </ProtectedRoute>
        }
      />

      <Route
        path="/home"
        element={
          <StudentRoute>
            {avatar ? <HomeScreen /> : <Navigate to="/avatar-setup" replace />}
          </StudentRoute>
        }
      />

      <Route
        path="/catalog"
        element={
          <StudentRoute>
            <CatalogScreen />
          </StudentRoute>
        }
      />

      <Route
        path="/book-detail"
        element={
          <StudentRoute>
            <BookDetailScreen />
          </StudentRoute>
        }
      />

      <Route
        path="/progress"
        element={
          <StudentRoute>
            <ProgressScreen />
          </StudentRoute>
        }
      />

      <Route
        path="/complete-book"
        element={
          <StudentRoute>
            <CompleteBookScreen />
          </StudentRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <StudentRoute>
            <ProfileScreen />
          </StudentRoute>
        }
      />

      <Route
        path="/leaderboard"
        element={
          <StudentRoute>
            <LeaderboardScreen />
          </StudentRoute>
        }
      />

      <Route path="/teacher" element={
        user && user.role === 'teacher' ? <TeacherScreen /> : <Navigate to="/" replace />
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider theme={childTheme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          {/* Global RTL wrapper so Hebrew text and punctuation are aligned correctly */}
          <div dir="rtl" style={{ direction: 'rtl' }}>
            <AppRoutes />
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
