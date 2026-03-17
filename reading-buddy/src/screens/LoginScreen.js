import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const LoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [userType, setUserType] = useState(null); // null, 'student', 'teacher'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // When user returns to type selection, clear everything
  useEffect(() => {
    if (!userType) {
      setUsername('');
      setPassword('');
      setError('');
    }
  }, [userType]);

  const handleLogin = () => {
    if (userType === 'teacher') {
      if (!password) {
        setError('נא הזן את סיסמת המורה');
        return;
      }
      
      if (password !== 'teacher123') {
        setError('סיסמת המורה שגויה');
        return;
      }
      login({
        id: 'teacher',
        username: 'מורה',
        email: `teacher@school.local`,
        createdAt: new Date().toISOString(),
        role: 'teacher',
      });
      navigate('/teacher');
    } else {
      // Student login
      if (!username || !password) {
        setError('נא הזן שם משתמש וסיסמה');
        return;
      }

      if (password.length < 4) {
        setError('סיסמה חייבת להיות לפחות 4 תווים');
        return;
      }

      const normalizedUsername = username.trim();
      const userId = `student:${normalizedUsername}`;

      login({
        id: userId,
        username: normalizedUsername,
        email: `${normalizedUsername}@school.local`,
        createdAt: new Date().toISOString(),
        role: 'student',
      });
      navigate('/age-selection');
    }
  };

  // Type Selection Screen
  if (!userType) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <Container maxWidth="sm">
          <Paper
            sx={{
              padding: '40px 30px',
              borderRadius: '32px',
              boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
              background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFF9E6 100%)',
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: '3rem',
                  mb: 2,
                  background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                }}
              >
                📚 Reading Buddy
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#7F8C8D',
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                בחר את סוגך:
              </Typography>
            </Box>

            {/* Type Selection Cards */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Student Card */}
              <Card
                onClick={() => {
                  setUserType('student');
                  setError('');
                  setUsername('');
                  setPassword('');
                }}
                sx={{
                  cursor: 'pointer',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #A8E63D 0%, #8BC924 100%)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    padding: '40px 20px !important',
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: '3rem',
                      mb: 2,
                    }}
                  >
                    👨‍🎓
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: '#FFFFFF',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    תלמיד
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#FFFFFF',
                      mt: 1,
                      fontWeight: 500,
                    }}
                  >
                    קרא ספרים ואסוף נקודות!
                  </Typography>
                </CardContent>
              </Card>

              {/* Teacher Card */}
              <Card
                onClick={() => {
                  setUserType('teacher');
                  setError('');
                  setUsername('');
                  setPassword('');
                }}
                sx={{
                  cursor: 'pointer',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #FF6B9D 0%, #E84C7A 100%)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    padding: '40px 20px !important',
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: '3rem',
                      mb: 2,
                    }}
                  >
                    👨‍🏫
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: '#FFFFFF',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    מורה
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#FFFFFF',
                      mt: 1,
                      fontWeight: 500,
                    }}
                  >
                    נהל את התלמידים שלך!
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Clear Data Button */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="text"
                size="small"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                sx={{
                  color: '#999',
                  fontSize: '0.8rem',
                  textTransform: 'none',
                }}
              >
                🔄 נקה נתונים
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  // Login Form Screen
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            padding: '40px 30px',
            borderRadius: '32px',
            boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
            background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFF9E6 100%)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Button
              onClick={() => {
                setUserType(null);
                setError('');
                setUsername('');
                setPassword('');
              }}
              sx={{
                mb: 2,
                color: '#7F8C8D',
                fontWeight: 600,
              }}
            >
              ← חזור
            </Button>
            <Typography
              variant="h3"
              sx={{
                fontSize: '2rem',
                mb: 1,
                background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
              }}
            >
              {userType === 'teacher' ? '👨‍🏫 כניסת מורה' : '👨‍🎓 כניסת תלמיד'}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#7F8C8D',
                fontWeight: 500,
              }}
            >
              היכנס לעולם ההרפתקאות של הקריאה!
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: '16px',
                fontSize: '1rem',
              }}
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {userType === 'student' && (
              <TextField
                fullWidth
                label="שם משתמש"
                placeholder="הזן את שם המשתמש שלך"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    fontSize: '1rem',
                  },
                  '& .MuiOutlinedInput-input::placeholder': {
                    opacity: 0.7,
                  },
                }}
                inputProps={{ style: { textAlign: 'right' } }}
              />
            )}

            {userType === 'teacher' && (
              <Typography
                sx={{
                  textAlign: 'center',
                  color: '#7F8C8D',
                  fontSize: '1rem',
                  fontWeight: 500,
                  py: 2,
                }}
              >
                הזן את סיסמת המורה כדי להמשיך
              </Typography>
            )}

            <TextField
              fullWidth
              type="password"
              label={userType === 'teacher' ? 'סיסמת המורה' : 'סיסמה'}
              placeholder={userType === 'teacher' ? 'הזן את סיסמת המורה' : 'הזן את הסיסמה שלך'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  fontSize: '1rem',
                },
                '& .MuiOutlinedInput-input::placeholder': {
                  opacity: 0.7,
                },
              }}
              inputProps={{ style: { textAlign: 'right' } }}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              sx={{
                mt: 2,
                background:
                  userType === 'teacher'
                    ? 'linear-gradient(135deg, #FF6B9D 0%, #E84C7A 100%)'
                    : 'linear-gradient(135deg, #A8E63D 0%, #8BC924 100%)',
                padding: '16px',
                fontSize: '1.2rem',
              }}
            >
              🚀 כנס עכשיו
            </Button>
          </Box>

          {/* Tips */}
          <Box
            sx={{
              mt: 4,
              p: 2.5,
              background: '#FFF9E6',
              borderRadius: '16px',
              border: '2px solid #FFD93D',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#2C3E50',
                fontWeight: 600,
                mb: 1,
              }}
            >
              💡 טיפ:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#7F8C8D',
                fontSize: '0.95rem',
              }}
            >
              {userType === 'teacher'
                ? 'סיסמת המורה היא: teacher123'
                : 'השתמש בשם משתמש שנתנה לך המורה שלך!'}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginScreen;
