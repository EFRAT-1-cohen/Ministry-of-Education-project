import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const AgeSelectionScreen = () => {
  const navigate = useNavigate();
  const { setUserAge } = useAppContext();
  const [selectedAge, setSelectedAge] = useState(null);

  const ageGroups = [
    { id: '6-8', label: '6-8 שנים', emoji: '🧒', color: '#FFE0EC' },
    { id: '8-10', label: '8-10 שנים', emoji: '👦', color: '#E0F7F6' },
    { id: '10-12', label: '10-12 שנים', emoji: '🧑', color: '#FFF9E6' },
    { id: '12-14', label: '12-14 שנים', emoji: '👨‍🦱', color: '#FFE0EC' },
    { id: '14+', label: '14+ שנים', emoji: '🧑‍🎓', color: '#E0F7F6' },
  ];

  const handleConfirm = () => {
    if (!selectedAge) {
      alert('בחר בעדיפותך הגילאית תחילה!');
      return;
    }

    setUserAge(selectedAge);
    navigate('/style-selection');
  };

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
            padding: '40px',
            borderRadius: '32px',
            boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
            background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFF9E6 100%)',
          }}
        >
          {/* Header */}
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 2,
              background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}
          >
            🎂 בחר את הגיל שלך
          </Typography>

          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: '#7F8C8D',
              fontWeight: 500,
            }}
          >
            כדי שנוכל להתאים לך ספרים מפתיחים בגילך!
          </Typography>

          {/* Age Selection Grid */}
          <Grid container spacing={2.5} sx={{ mb: 4 }}>
            {ageGroups.map((group) => (
              <Grid item xs={12} sm={6} key={group.id}>
                <Box
                  onClick={() => setSelectedAge(group.id)}
                  sx={{
                    p: 3,
                    backgroundColor: group.color,
                    borderRadius: '20px',
                    cursor: 'pointer',
                    border: selectedAge === group.id ? '4px solid #FF6B9D' : '2px solid transparent',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <Box sx={{ fontSize: '3rem' }}>{group.emoji}</Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#2C3E50',
                    }}
                  >
                    {group.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Confirmation Button */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleConfirm}
            sx={{
              background: 'linear-gradient(135deg, #FF6B9D 0%, #E84C7A 100%)',
              padding: '16px',
              fontSize: '1.2rem',
            }}
          >
            ✅ אנחנו מוכנים!
          </Button>

          {/* Info Box */}
          <Box
            sx={{
              mt: 3,
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
                textAlign: 'center',
              }}
            >
              💡 יוכלו לשנות את הגיל בהגדרות מאוחר יותר
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AgeSelectionScreen;
