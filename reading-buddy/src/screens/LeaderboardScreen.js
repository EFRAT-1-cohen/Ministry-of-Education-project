import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LeaderboardScreen = () => {
  const navigate = useNavigate();
  const { user, userStats } = useAppContext();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const teacherStudents = JSON.parse(localStorage.getItem('teacherStudents') || '[]');
    // Sort by points descending, then by name
    const sorted = [...teacherStudents].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return (a.name || '').localeCompare(b.name || '');
    });
    // Assign rank (1-based)
    const withRank = sorted.map((s, idx) => ({ ...s, rank: idx + 1 }));
    // If current student is missing from teacherStudents, inject their current stats
    if (user?.role === 'student' && !withRank.some(s => s.id === user.id)) {
      withRank.push({
        id: user.id,
        name: user.username,
        points: userStats.totalPoints,
        books: userStats.booksCompleted,
        level: userStats.level,
        rank: withRank.length + 1,
        status: 'פעיל',
        lastActive: 'עכשיו',
      });
    }
    setLeaderboard(withRank);
  }, [user, userStats]);

  const userRank = leaderboard.find((item) => item.name === user?.username);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF9E6 0%, #E0F7F6 100%)',
        padding: '20px',
      }}
    >
      <Container maxWidth="md">
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

        {/* Header */}
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            mb: 4,
            background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          🏆 טבלת אלופים
        </Typography>

        {/* Your Rank Card */}
        {userRank && (
          <Paper
            sx={{
              padding: '30px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #FFD93D 0%, #FFC300 100%)',
              color: 'white',
              mb: 4,
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              🎯 המיקום שלך:
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {userRank.rank}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  מקום
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
                {userRank.name} • {userRank.points} נק'
              </Typography>
            </Box>
          </Paper>
        )}

        {/* Leaderboard Table */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
                }}
              >
                <TableCell
                  align="center"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                  }}
                >
                  🥇 מקום
                </TableCell>

                <TableCell
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                  }}
                >
                  👤 שם
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                  }}
                >
                  ⭐ נקודות
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                  }}
                >
                  📚 ספרים
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                  }}
                >
                  🎯 רמה
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {leaderboard.map((item, idx) => {
                const isUserRow = item.name === user?.username;
                const medalEmoji = item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : '◆';

                return (
                  <TableRow
                    key={item.rank}
                    sx={{
                      background: isUserRow
                        ? 'linear-gradient(135deg, #FFF9E6 0%, #FFE0EC 100%)'
                        : idx % 2 === 0
                          ? '#F9F9F9'
                          : '#FFFFFF',
                      border: isUserRow ? '3px solid #FF6B9D' : 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: isUserRow
                          ? 'linear-gradient(135deg, #FFF9E6 0%, #FFE0EC 100%)'
                          : '#F0F0F0',
                      },
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 700,
                        fontSize: '1.3rem',
                        color: '#FF6B9D',
                      }}
                    >
                      {medalEmoji}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: isUserRow ? 700 : 600,
                        fontSize: isUserRow ? '1.1rem' : '1rem',
                        color: isUserRow ? '#FF6B9D' : '#2C3E50',
                      }}
                    >
                      {item.name}
                      {isUserRow && <Typography variant="caption"> (אתה)</Typography>}
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        color: '#A8E63D',
                      }}
                    >
                      {item.points}
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 600,
                        color: '#4ECDC4',
                      }}
                    >
                      {item.books}
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 700,
                        color: '#FF6B9D',
                      }}
                    >
                      {item.level}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Info Box */}
        <Paper
          sx={{
            mt: 4,
            p: 3,
            background: 'linear-gradient(135deg, #E0F7F6 0%, #FFF9E6 100%)',
            borderRadius: '16px',
            border: '2px solid #4ECDC4',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
            💡 איך להגדיל את ניקוד?
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {[
              '📖 קרא ספרים - 50 נקודות לכל ספר',
              '📚 ספרים עבים - בונוס +20 נקודות',
              '⚡ קצב קריאה - בונוס +10 נקודות',
              '⭐ דירוגים - נקודות נוספות לדירוגים גבוהים',
            ].map((tip, idx) => (
              <Typography
                key={idx}
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: '#2C3E50',
                }}
              >
                {tip}
              </Typography>
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LeaderboardScreen;
