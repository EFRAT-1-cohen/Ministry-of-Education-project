import React from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import AvatarDisplay from '../components/AvatarDisplay';
import LogoutIcon from '@mui/icons-material/Logout';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { user, avatar, currentBook, userStats, logout, bonusNotification, preferredCategory } = useAppContext();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const progressPercentage = currentBook
    ? (currentBook.currentPage / currentBook.pages) * 100
    : 0;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF9E6 0%, #FFE0EC 100%)',
        padding: '20px',
      }}
    >
      <Container maxWidth="lg">
        {/* Bonus Notification Alert */}
        {bonusNotification && (
          <Alert
            severity="success"
            sx={{
              mb: 2,
              borderRadius: '16px',
              fontSize: '1.1rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #A8E63D 0%, #8BC924 100%)',
              color: 'white',
              animation: 'slideIn 0.5s ease-out',
            }}
          >
            🎉 {bonusNotification.message} (+{bonusNotification.points} נקודות)
          </Alert>
        )}

        {/* Top Navigation Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                fontWeight: 700,
              }}
            >
              התנתק
            </Button>
          </Box>
        </Box>

        {/* Header with Avatar and Stats */}
        <Paper
          sx={{
            padding: '30px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
            color: 'white',
            mb: 3,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <AvatarDisplay avatar={avatar} size="medium" />
            </Grid>

            <Grid item xs={12} sm={8}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1.5,
                }}
              >
                🎉 שלום {user?.username}!
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  opacity: 0.95,
                  fontWeight: 500,
                }}
              >
                {currentBook
                  ? `אתה באמצע קריאה של "${currentBook.title}"`
                  : 'איזה הרפתקה נתחיל היום?'}
              </Typography>

              {/* Quick Stats */}
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Paper
                    sx={{
                      p: 1.5,
                      textAlign: 'center',
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {userStats.totalPoints}
                    </Typography>
                    <Typography variant="body2">נקודות</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Paper
                    sx={{
                      p: 1.5,
                      textAlign: 'center',
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {userStats.level}
                    </Typography>
                    <Typography variant="body2">רמה</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Paper
                    sx={{
                      p: 1.5,
                      textAlign: 'center',
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {userStats.booksCompleted}
                    </Typography>
                    <Typography variant="body2">ספרים</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Paper
                    sx={{
                      p: 1.5,
                      textAlign: 'center',
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {userStats.badges.length}
                    </Typography>
                    <Typography variant="body2">תגים</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* Main Content */}
        <Grid container spacing={3}>
          {currentBook ? (
            // Active Reading Mode
            <>
              <Grid item xs={12}>
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #FFF9E6 0%, #FFFFFF 100%)',
                    borderRadius: '24px',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box
                          sx={{
                            width: '150px',
                            height: '200px',
                            background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '4rem',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                          }}
                        >
                          {currentBook.image}
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={8}>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            mb: 1,
                            color: '#2C3E50',
                          }}
                        >
                          {currentBook.title}
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{
                            mb: 2.5,
                            color: '#7F8C8D',
                            fontWeight: 500,
                          }}
                        >
                          {currentBook.author}
                        </Typography>

                        {/* Progress Bar */}
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              התקדמות:
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 700,
                                color: '#FF6B9D',
                              }}
                            >
                              {currentBook.currentPage} / {currentBook.pages}
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={progressPercentage}
                            sx={{
                              height: '12px',
                              borderRadius: '10px',
                            }}
                          />
                        </Box>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                          <Button
                            variant="contained"
                            sx={{
                              background: 'linear-gradient(135deg, #4ECDC4 0%, #2EB8AE 100%)',
                            }}
                            onClick={() => navigate('/progress')}
                          >
                            📝 עדכן עמוד
                          </Button>

                          <Button
                            variant="contained"
                            sx={{
                              background: 'linear-gradient(135deg, #A8E63D 0%, #8BC924 100%)',
                            }}
                            onClick={() => navigate('/complete-book')}
                          >
                            ✅ סיימתי את הספר
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </>
          ) : (
            // Idle Mode - Choose Book
            <>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    padding: '40px',
                    textAlign: 'center',
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, #A8E63D 0%, #4ECDC4 100%)',
                    color: 'white',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
                    🎯 בואו נבחר ספר!
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      opacity: 0.95,
                      fontSize: '1.1rem',
                    }}
                  >
                    עם אילו ספרים אתה רוצה להתחיל את ההרפתקה שלך?
                  </Typography>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/catalog', { state: { mode: 'for-you' } })}
                    disabled={!preferredCategory}
                    sx={{
                      background: 'white',
                      color: '#FF6B9D',
                      padding: '18px 40px',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      '&:hover': {
                        background: '#F9F9F9',
                      },
                    }}
                  >
                    ✨ ספרים שמתאימים לי
                  </Button>

                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/catalog')}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        padding: '14px 32px',
                        fontSize: '1.05rem',
                        fontWeight: 700,
                      }}
                    >
                      📚 כל הספרים
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </>
          )}

          {/* Quick Links */}
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #FFE0EC 0%, #FFF9E6 100%)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
              onClick={() => navigate('/profile')}
            >
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  👤 פרופיל שלי
                </Typography>
                <Typography variant="body2" sx={{ color: '#7F8C8D' }}>
                  צפה בסטטיסטיקות ובתגים שלך
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #E0F7F6 0%, #FFF9E6 100%)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
              onClick={() => navigate('/leaderboard')}
            >
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  🏆 טבלת אלופים
                </Typography>
                <Typography variant="body2" sx={{ color: '#7F8C8D' }}>
                  תראה איפה אתה עומד בכיתה
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeScreen;
