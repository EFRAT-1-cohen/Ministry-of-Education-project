import React from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BookDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectBook } = useAppContext();
  const book = location.state?.book;
  const returnTo = location.state?.returnTo || '/home';

  if (!book) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>ספר לא נמצא</Typography>
      </Box>
    );
  }

  const handleStartReading = () => {
    selectBook(book);
    navigate(returnTo);
  };

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
          onClick={() => navigate(returnTo)}
          sx={{
            mb: 3,
            color: '#2C3E50',
            fontWeight: 600,
          }}
        >
          חזור
        </Button>

        <Paper
          sx={{
            padding: '40px',
            borderRadius: '24px',
            background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFF9E6 100%)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        >
          <Grid container spacing={4}>
            {/* Book Cover */}
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  width: '200px',
                  height: '280px',
                  background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '5rem',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                }}
              >
                {book.image}
              </Box>
            </Grid>

            {/* Book Info */}
            <Grid item xs={12} sm={8}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: '#2C3E50',
                }}
              >
                {book.title}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: '#7F8C8D',
                  mb: 3,
                  fontWeight: 500,
                }}
              >
                מאת: {book.author}
              </Typography>

              {/* Meta Info */}
              <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
                <Chip
                  label={`📄 ${book.pages} עמודים`}
                  sx={{
                    background: '#FFF9E6',
                    color: '#2C3E50',
                    fontWeight: 600,
                    padding: '20px 16px',
                  }}
                />

                <Chip
                  label={`🏷️ ${book.category}`}
                  sx={{
                    background: '#E0F7F6',
                    color: '#2C3E50',
                    fontWeight: 600,
                    padding: '20px 16px',
                  }}
                />

                <Chip
                  label={`🎂 גיל ${book.ageGroup}`}
                  sx={{
                    background: '#FFE0EC',
                    color: '#2C3E50',
                    fontWeight: 600,
                    padding: '20px 16px',
                  }}
                />

                <Chip
                  label={`⭐ ${book.points} נקודות`}
                  sx={{
                    background: 'linear-gradient(135deg, #FFD93D 0%, #FFC300 100%)',
                    color: 'white',
                    fontWeight: 700,
                    padding: '20px 16px',
                  }}
                />
              </Box>

              {/* Description */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: '#2C3E50',
                  }}
                >
                  📖 תיאור:
                </Typography>

                <Paper
                  sx={{
                    p: 2.5,
                    background: '#F9F9F9',
                    borderRadius: '12px',
                    border: '2px solid #E0E0E0',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#2C3E50',
                      lineHeight: 1.8,
                      fontWeight: 500,
                    }}
                  >
                    {book.description}
                  </Typography>
                </Paper>
              </Box>

              {/* Highlights */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: '#2C3E50',
                  }}
                >
                  ✨ למה לקרוא את הספר הזה?
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[
                    '🌟 סיפור מרתק ומעניין',
                    '📚 שפה קלה וגם עשירה',
                    '🎯 ידע חדש וסיפורים מדהימים',
                    '⏱️ אורך מתאים לגיל המומלץ',
                  ].map((highlight, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      sx={{
                        color: '#2C3E50',
                        fontWeight: 600,
                        p: 1.5,
                        background: '#FFF9E6',
                        borderRadius: '12px',
                        borderLeft: '4px solid #FFD93D',
                      }}
                    >
                      {highlight}
                    </Typography>
                  ))}
                </Box>
              </Box>

              {/* Action Button */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleStartReading}
                sx={{
                  background: 'linear-gradient(135deg, #FF6B9D 0%, #E84C7A 100%)',
                  padding: '18px',
                  fontSize: '1.2rem',
                }}
              >
                🚀 התחל לקרוא עכשיו
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default BookDetailScreen;
