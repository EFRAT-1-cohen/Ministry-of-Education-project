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
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import AvatarDisplay from '../components/AvatarDisplay';
import { BADGES } from '../data/mockData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user, avatar, userStats, completedBooks, logout, bonusHistory } = useAppContext();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const earnedBadges = BADGES.filter((badge) => userStats.badges.includes(badge.id));
  const unlockedPercentage = (earnedBadges.length / BADGES.length) * 100;

  return (
    
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF9E6 0%, #E0F7F6 100%)',
        padding: '20px',
      }}
    >
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/home')}
          sx={{
            mb: 3,
            color: '#2C3E50',
            fontWeight: 600,
          }}
        >
          חזור לבית
        </Button>

        {/* Profile Header */}
        <Paper
          sx={{
            padding: '40px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
            color: 'white',
            mb: 4,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <AvatarDisplay avatar={avatar} size="large" />
            </Grid>

            <Grid item xs={12} sm={9}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {user?.username}
              </Typography>

              <Typography variant="h5" sx={{ mb: 3, opacity: 0.95 }}>
                📖 קורא דרגה {userStats.level}
              </Typography>

              {/* Stats Grid */}
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ background: 'rgba(255,255,255,0.2)', p: 1.5, borderRadius: '12px' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {userStats.totalPoints}
                    </Typography>
                    <Typography variant="body2">נקודות</Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Box sx={{ background: 'rgba(255,255,255,0.2)', p: 1.5, borderRadius: '12px' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {userStats.booksCompleted}
                    </Typography>
                    <Typography variant="body2">ספרים</Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Box sx={{ background: 'rgba(255,255,255,0.2)', p: 1.5, borderRadius: '12px' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {userStats.badges.length}
                    </Typography>
                    <Typography variant="body2">תגים</Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Box sx={{ background: 'rgba(255,255,255,0.2)', p: 1.5, borderRadius: '12px' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {userStats.level}
                    </Typography>
                    <Typography variant="body2">רמה</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* Level Progress */}
        <Paper
          sx={{
            padding: '30px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #FFF9E6 0%, #FFFFFF 100%)',
            mb: 4,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            🎯 התקדמות לרמה הבאה:
          </Typography>

          <Box sx={{ mb: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                נקודות:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#FF6B9D' }}>
                {userStats.totalPoints} / {userStats.level * 100}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(userStats.totalPoints / (userStats.level * 100)) * 100}
              sx={{
                height: '14px',
                borderRadius: '10px',
              }}
            />
          </Box>
        </Paper>

        {/* Badges Section */}
        <Paper
          sx={{
            padding: '30px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #FFE0EC 0%, #FFFFFF 100%)',
            mb: 4,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            🏆 תגים שהשגת: ({earnedBadges.length}/{BADGES.length})
          </Typography>

          <LinearProgress
            variant="determinate"
            value={unlockedPercentage}
            sx={{
              height: '12px',
              borderRadius: '10px',
              mb: 3,
            }}
          />

          {earnedBadges.length === 0 ? (
            <Typography variant="body2" sx={{ color: '#7F8C8D' }}>
              תחיל לקרוא כדי להשיג תגים!
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {earnedBadges.map((badge) => (
                <Grid item xs={6} sm={4} md={3} key={badge.id}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #FFD93D 0%, #FFC300 100%)',
                      color: 'white',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: '200px',
                      borderRadius: '20px',
                    }}
                  >
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        padding: '24px 16px',
                      }}
                    >
                      <Box sx={{ fontSize: '3rem', mb: 1 }}>
                        {badge.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          minHeight: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {badge.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          opacity: 0.9,
                          fontSize: '0.75rem',
                          lineHeight: 1.3,
                          minHeight: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {badge.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Locked Badges */}
          {earnedBadges.length < BADGES.length && (
            <>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
                🔒 תגים לא נפתוחים:
              </Typography>

              <Grid container spacing={2}>
                {BADGES.filter((badge) => !userStats.badges.includes(badge.id)).map((badge) => (
                  <Grid item xs={6} sm={4} md={3} key={badge.id}>
                    <Card
                      sx={{
                        textAlign: 'center',
                        background: '#D0D0D0',
                        color: '#808080',
                        opacity: 0.6,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '200px',
                        borderRadius: '20px',
                      }}
                    >
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          padding: '24px 16px',
                        }}
                      >
                        <Box sx={{ fontSize: '3rem', mb: 1 }}>
                          {badge.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            minHeight: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {badge.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '0.75rem',
                            lineHeight: 1.3,
                            minHeight: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {badge.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Paper>

        {/* Completed Books */}
        <Paper
          sx={{
            padding: '30px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #E0F7F6 0%, #FFFFFF 100%)',
            mb: 4,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            📚 ספרים שקראת:
          </Typography>

          {completedBooks.length === 0 ? (
            <Typography variant="body2" sx={{ color: '#7F8C8D' }}>
              עדיין לא קראת ספרים. התחל עכשיו!
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {completedBooks.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                  <Card sx={{ background: '#FFFFFF', border: '2px solid #4ECDC4' }}>
                    <CardContent>
                      <Box sx={{ fontSize: '2rem', mb: 1 }}>
                        {book.image}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {book.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#7F8C8D', mb: 1 }}>
                        {book.author}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        {'⭐'.repeat(book.rating)}
                      </Box>
                      {book.feedback && (
                        <Typography variant="caption" sx={{ display: 'block', fontStyle: 'italic' }}>
                          "{book.feedback}"
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>

        {/* Bonus History Section */}
        <Paper
          sx={{
            padding: '30px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #A8E63D 0%, #8BC924 100%)',
            mb: 4,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'white' }}>
            🎁 בונוסים שקיבלת מהמורה:
          </Typography>

          {bonusHistory && bonusHistory.length > 0 ? (
            <Grid container spacing={2}>
              {bonusHistory.map((bonus) => (
                <Grid item xs={12} sm={6} md={4} key={bonus.id}>
                  <Card
                    sx={{
                      background: 'rgba(255,255,255,0.95)',
                      border: '2px solid #FFD93D',
                      textAlign: 'center',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#A8E63D', mb: 1 }}>
                        +{bonus.points}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#2C3E50', fontWeight: 600, mb: 1 }}>
                        {bonus.message}
                      </Typography>
                      <Chip
                        label={bonus.date}
                        size="small"
                        sx={{ background: '#FFD93D', color: 'white', fontWeight: 600 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info" sx={{ background: 'rgba(255,255,255,0.3)', color: 'white' }}>
              עדיין לא קיבלת בונוסים. המשך לקרוא ולהשיג הישגים!
            </Alert>
          )}
        </Paper>

        {/* Logout Button */}
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleLogout}
          sx={{
            padding: '14px',
            fontSize: '1.1rem',
          }}
        >
          🚪 התנתקות
        </Button>
      </Container>
    </Box>
  );
};

export default ProfileScreen;
