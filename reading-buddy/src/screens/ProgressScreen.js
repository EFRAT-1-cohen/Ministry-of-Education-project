import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  LinearProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProgressScreen = () => {
  const navigate = useNavigate();
  const { currentBook, updateProgress } = useAppContext();
  const [page, setPage] = useState(currentBook?.currentPage || 0);
  const [message, setMessage] = useState('');

  if (!currentBook) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>אין ספר פעיל</Typography>
      </Box>
    );
  }

  const progressPercentage = (page / currentBook.pages) * 100;
  const isValidPage = page >= 0 && page <= currentBook.pages;

  const handleUpdate = () => {
    if (!isValidPage) {
      setMessage('❌ מספר העמוד חייב להיות בין 0 ל-' + currentBook.pages);
      return;
    }

    updateProgress(page);

    // Motivational messages
    const messages = [
      '🎉 מעולה! אתה קורא סוף סוף!',
      '⚡ וואו! התקדמת הרבה!',
      '🚀 יוצא לך מעולה!',
      '💪 תמשיך ככה!',
      '🌟 אתה גיבור!',
    ];

    if (progressPercentage >= 50) {
      setMessage('🔥 אתה באמצע הספר! עוד קצת!');
    } else if (progressPercentage >= 75) {
      setMessage('🏁 כמעט סיימת! עוד קצת ותגמור!');
    } else {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }

    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF9E6 0%, #E0F7F6 100%)',
        padding: '20px',
      }}
    >
      <Container maxWidth="sm">
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
          {/* Header */}
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              mb: 1,
              background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            📝 עדכן התקדמות
          </Typography>

          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: '#7F8C8D',
              mb: 4,
              fontWeight: 500,
            }}
          >
            {currentBook.title}
          </Typography>

          {/* Book Info */}
          <Box
            sx={{
              p: 2.5,
              background: '#FFF9E6',
              borderRadius: '16px',
              mb: 3.5,
              border: '2px solid #FFD93D',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#2C3E50',
                textAlign: 'center',
              }}
            >
              {currentBook?.author}
            </Typography>
          </Box>

          {/* Progress Bar */}
          <Box sx={{ mb: 3.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                התקדמות נוכחית:
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
              value={(currentBook.currentPage / currentBook.pages) * 100}
              sx={{
                height: '14px',
                borderRadius: '10px',
              }}
            />
          </Box>

          {/* Input Section */}
          <Box sx={{ mb: 3.5 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                color: '#2C3E50',
              }}
            >
              איפה אתה עכשיו?
            </Typography>

            <TextField
              fullWidth
              type="number"
              label="מספר עמוד"
              value={page}
              onChange={(e) => setPage(Math.max(0, parseInt(e.target.value) || 0))}
              inputProps={{
                min: 0,
                max: currentBook.pages,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  fontSize: '1.2rem',
                },
              }}
            />

            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 1.5,
                color: '#7F8C8D',
                fontWeight: 500,
              }}
            >
              כמה עמודים עדיין נותרו:
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#4ECDC4',
                mt: 0.5,
              }}
            >
              {Math.max(0, currentBook.pages - page)} עמודים
            </Typography>
          </Box>

          {/* Preview Progress */}
          <Box sx={{ mb: 3.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                התקדמות חדשה:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: '#A8E63D',
                }}
              >
                {page} / {currentBook.pages}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progressPercentage}
              sx={{
                height: '14px',
                borderRadius: '10px',
              }}
            />
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 1,
                color: '#7F8C8D',
                fontWeight: 600,
              }}
            >
              {progressPercentage.toFixed(1)}% מההספר
            </Typography>
          </Box>

          {/* Message */}
          {message && (
            <Alert
              severity="success"
              sx={{
                mb: 3,
                borderRadius: '16px',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              {message}
            </Alert>
          )}

          {/* Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleUpdate}
              sx={{
                background: 'linear-gradient(135deg, #A8E63D 0%, #8BC924 100%)',
                padding: '14px',
                fontSize: '1.1rem',
              }}
            >
              ✅ שמור
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/home')}
              sx={{
                borderColor: '#7F8C8D',
                color: '#2C3E50',
                padding: '14px',
                fontSize: '1.1rem',
              }}
            >
              ❌ בטל
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProgressScreen;
