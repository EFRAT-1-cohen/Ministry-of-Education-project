import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { CATEGORIES } from '../data/mockData';

const StyleSelectionScreen = () => {
  const navigate = useNavigate();
  const { setPreferredCategory } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = CATEGORIES.filter((c) => c.id !== 'all');

  const handleConfirm = () => {
    if (!selectedCategory) {
      alert('בחר סגנון אהוב תחילה!');
      return;
    }

    setPreferredCategory(selectedCategory);
    navigate('/avatar-setup');
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
      <Container maxWidth="md">
        <Paper
          sx={{
            padding: '40px',
            borderRadius: '32px',
            boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
            background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFF9E6 100%)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <Button
              onClick={() => navigate('/age-selection')}
              sx={{
                color: '#2C3E50',
                fontWeight: 600,
              }}
            >
              ← חזור
            </Button>
          </Box>

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
            🎭 בחר סגנון אהוב
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
            כדי שנוכל להציג לך קודם ספרים שמתאימים לך
          </Typography>

          <Grid container spacing={2.5} sx={{ mb: 4 }}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category.id}>
                <Card
                  onClick={() => setSelectedCategory(category.id)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '24px',
                    transition: 'all 0.3s ease',
                    border: selectedCategory === category.id ? '4px solid #FF6B9D' : '2px solid #E0E0E0',
                    background:
                      selectedCategory === category.id
                        ? 'linear-gradient(135deg, #FFE0EC 0%, #E0F7F6 100%)'
                        : '#FFFFFF',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h2" sx={{ fontSize: '3rem', mb: 1 }}>
                      {category.icon}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C3E50' }}>
                      {category.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

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
            ✅ ממשיכים
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default StyleSelectionScreen;
