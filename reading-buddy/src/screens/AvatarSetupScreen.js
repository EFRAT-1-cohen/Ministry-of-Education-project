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
import { AVATARS } from '../data/mockData';
import AvatarDisplay from '../components/AvatarDisplay';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AvatarSetupScreen = () => {
  const navigate = useNavigate();
  const { createAvatar } = useAppContext();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedBgColor, setSelectedBgColor] = useState('primary');

  const bgColors = [
    { id: 'primary', name: 'ורוד', hex: '#FFE0EC' },
    { id: 'secondary', name: 'טורקיז', hex: '#E0F7F6' },
    { id: 'success', name: 'ירוק', hex: '#E8F5E9' },
    { id: 'warning', name: 'צהוב', hex: '#FFF9C4' },
  ];

  const handleConfirm = () => {
    if (!selectedAvatar) {
      alert('בחר דמות תחילה!');
      return;
    }

    const avatar = {
      ...selectedAvatar,
      bgColor: selectedBgColor,
    };

    createAvatar(avatar);
    navigate('/home');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #A8E63D 0%, #4ECDC4 100%)',
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
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/style-selection')}
              sx={{
                color: '#2C3E50',
                fontWeight: 600,
              }}
            >
              חזור
            </Button>
            <Box sx={{ flex: 1 }} />
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
            ✨ בנה את הדמות שלך!
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
            בחר דמות שתליווה אותך בהרפתקת הקריאה שלך
          </Typography>

          {/* Avatar Selection */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 2.5,
                color: '#2C3E50',
                fontWeight: 600,
              }}
            >
              🦉 בחר דמות:
            </Typography>

            <Grid container spacing={2.5}>
              {AVATARS.map((avatar) => (
                <Grid item xs={12} sm={6} md={3} key={avatar.id}>
                  <Card
                    onClick={() => setSelectedAvatar(avatar)}
                    sx={{
                      cursor: 'pointer',
                      transform: selectedAvatar?.id === avatar.id ? 'scale(1.05)' : 'scale(1)',
                      border: selectedAvatar?.id === avatar.id ? '4px solid #FF6B9D' : '2px solid transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                      background: selectedAvatar?.id === avatar.id
                        ? 'linear-gradient(135deg, #FFE0EC 0%, #E0F7F6 100%)'
                        : '#F9F9F9',
                    }}
                  >
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      <Box sx={{ fontSize: '3rem' }}>{avatar.emoji}</Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {avatar.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: 'center',
                          color: '#7F8C8D',
                          fontSize: '0.85rem',
                        }}
                      >
                        {avatar.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Color Selection */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 2.5,
                color: '#2C3E50',
                fontWeight: 600,
              }}
            >
              🎨 בחר צבע רקע אהוב:
            </Typography>

            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
              {bgColors.map((color) => (
                <Grid item xs={6} sm={3} key={color.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box
                    onClick={() => setSelectedBgColor(color.id)}
                    sx={{
                      width: '80px',
                      height: '80px',
                      minWidth: '80px',
                      minHeight: '80px',
                      backgroundColor: color.hex,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      border: selectedBgColor === color.id ? '4px solid #FF6B9D' : '2px solid #E0E0E0',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        color: '#2C3E50',
                        textAlign: 'center',
                        fontSize: '0.7rem',
                      }}
                    >
                      {color.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Preview */}
          {selectedAvatar && (
            <Box
              sx={{
                mb: 4,
                p: 3,
                background: bgColors.find((c) => c.id === selectedBgColor)?.hex,
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2C3E50' }}>
                👀 תצוגה מקדימה:
              </Typography>
              <AvatarDisplay avatar={selectedAvatar} size="large" />
            </Box>
          )}

          {/* Confirmation Button */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleConfirm}
            sx={{
              background: 'linear-gradient(135deg, #FF6B9D 0%, #E84C7A 100%)',
              padding: '18px',
              fontSize: '1.2rem',
            }}
          >
            ✅ זה אני! בואו נתחיל!
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default AvatarSetupScreen;
