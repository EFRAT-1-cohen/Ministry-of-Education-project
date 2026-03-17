import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { BOOKS_DATA, CATEGORIES } from '../data/mockData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CatalogScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { completedBooks, userAge, preferredCategory } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showForYou, setShowForYou] = useState(location.state?.mode === 'for-you');

  // If no userAge, show all books without age filtering
  const effectiveUserAge = userAge || 'all';

  // Filter books by age and category
  const getAgeRange = (ageGroup) => {
    const ranges = {
      '6-8': { min: 6, max: 8 },
      '8-10': { min: 8, max: 10 },
      '10-12': { min: 10, max: 12 },
      '12-14': { min: 12, max: 14 },
      '14+': { min: 14, max: 100 },
      'all': { min: 0, max: 100 },
    };
    return ranges[ageGroup] || { min: 0, max: 100 };
  };

  const categoryFilter = showForYou && preferredCategory ? preferredCategory : selectedCategory;

  const filteredBooks = BOOKS_DATA.filter((book) => {
    // Age filter
    const ageRange = getAgeRange(effectiveUserAge);
    
    // Parse book age group - handle formats like "8-12" and "12+"
    let bookMinAge, bookMaxAge;
    if (book.ageGroup.includes('+')) {
      // Format: "12+"
      bookMinAge = parseInt(book.ageGroup.replace('+', ''), 10);
      bookMaxAge = 100;
    } else if (book.ageGroup.includes('-')) {
      // Format: "8-12"
      const parts = book.ageGroup.split('-').map(Number);
      bookMinAge = parts[0];
      bookMaxAge = parts[1];
    } else {
      // Single number, shouldn't happen but handle it
      bookMinAge = parseInt(book.ageGroup, 10);
      bookMaxAge = bookMinAge;
    }
    
    const ageMatch = !(bookMaxAge < ageRange.min || bookMinAge > ageRange.max);

    // Category filter
    const categoryMatch = categoryFilter === 'all' || book.category === categoryFilter;

    return ageMatch && categoryMatch;
  });

  const completedIds = completedBooks.map((b) => b.id);

  const handleSelectBook = (book) => {
    navigate('/book-detail', { state: { book, returnTo: '/home' } });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF9E6 0%, #E0F7F6 100%)',
        padding: '20px',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/home')}
            sx={{
              color: '#2C3E50',
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            חזור
          </Button>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              flex: 1,
              textAlign: 'center',
            }}
          >
            📚 קטלוג הספרים
          </Typography>

          <Box sx={{ width: '56px' }} />
        </Box>

        <Box
          sx={{
            mb: 3,
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant={showForYou ? 'contained' : 'outlined'}
            onClick={() => {
              setShowForYou(true);
              setSelectedCategory('all');
            }}
            disabled={!preferredCategory}
            sx={{
              fontWeight: 700,
            }}
          >
            ✨ ספרים שמתאימים לי
          </Button>

          <Button
            variant={!showForYou ? 'contained' : 'outlined'}
            onClick={() => setShowForYou(false)}
            sx={{
              fontWeight: 700,
            }}
          >
            📚 כל הספרים
          </Button>

          {showForYou && preferredCategory && (
            <Chip
              label={`הסגנון שלי: ${preferredCategory}`}
              sx={{
                background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
                color: 'white',
                fontWeight: 700,
              }}
            />
          )}
        </Box>

        {/* Category Filters */}
        {!showForYou && (
          <Box
            sx={{
              mb: 4,
              display: 'flex',
              gap: 1.5,
              overflowX: 'auto',
              pb: 2,
              px: 1,
            }}
          >
            {CATEGORIES.map((category) => (
              <Box
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                sx={{
                  padding: '12px 16px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  border: selectedCategory === category.id ? '3px solid #FF6B9D' : '2px solid #E0E0E0',
                  background:
                    selectedCategory === category.id
                      ? 'linear-gradient(135deg, #FFE0EC 0%, #FFF9E6 100%)'
                      : '#F9F9F9',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderRadius: '20px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  '&:hover': {
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                {`${category.icon} ${category.label}`}
              </Box>
            ))}
          </Box>
        )}

        {/* Books Grid */}
        <Grid container spacing={2.5}>
          {filteredBooks.map((book) => {
            const isCompleted = completedIds.includes(book.id);

            return (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card
                  onClick={() => handleSelectBook(book)}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: isCompleted ? 0.7 : 1,
                    border: isCompleted ? '2px solid #BDBDBD' : 'none',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                    },
                    position: 'relative',
                  }}
                >
                  {isCompleted && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        background: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        zIndex: 10,
                      }}
                    >
                      ✓ סיימת
                    </Box>
                  )}

                  <CardContent sx={{ p: 3 }}>
                    {/* Book Cover */}
                    <Box
                      sx={{
                        width: '100%',
                        height: '180px',
                        background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '4rem',
                        mb: 2,
                      }}
                    >
                      {book.image}
                    </Box>

                    {/* Book Info */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        color: '#2C3E50',
                      }}
                    >
                      {book.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: '#7F8C8D',
                        mb: 2,
                        fontWeight: 500,
                      }}
                    >
                      {book.author}
                    </Typography>

                    {/* Meta Info */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Chip
                        label={`📄 ${book.pages} עמ'`}
                        size="small"
                        sx={{
                          background: '#FFF9E6',
                          color: '#2C3E50',
                          fontWeight: 600,
                        }}
                      />

                      <Chip
                        label={`🏷️ ${book.category}`}
                        size="small"
                        sx={{
                          background: '#E0F7F6',
                          color: '#2C3E50',
                          fontWeight: 600,
                        }}
                      />

                      <Chip
                        label={`⭐ ${book.points} נק'`}
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #FFD93D 0%, #FFC300 100%)',
                          color: 'white',
                          fontWeight: 700,
                        }}
                      />
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#7F8C8D',
                        mb: 2.5,
                        lineHeight: 1.6,
                      }}
                    >
                      {book.description}
                    </Typography>

                    {/* Age Group */}
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#A0A0A0',
                        fontStyle: 'italic',
                      }}
                    >
                      גיל מומלץ: {book.ageGroup}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {filteredBooks.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography variant="h5" sx={{ color: '#7F8C8D', fontWeight: 600 }}>
              📭 אין ספרים בקטגוריה זו
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CatalogScreen;
