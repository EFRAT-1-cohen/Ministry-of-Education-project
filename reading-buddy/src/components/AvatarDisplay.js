import React from 'react';
import { Box, Paper } from '@mui/material';

const AvatarDisplay = ({ avatar, size = 'large' }) => {
  const sizes = {
    small: { emoji: '3rem', box: '4.5rem' },
    medium: { emoji: '4rem', box: '6rem' },
    large: { emoji: '6rem', box: '8rem' },
  };

  const currentSize = sizes[size];

  if (!avatar) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        sx={{
          width: currentSize.box,
          height: currentSize.box,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${avatar.baseColor} 0%, ${avatar.baseColor}dd 100%)`,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          position: 'relative',
          overflow: 'hidden',
          border: '4px solid white',
          fontSize: currentSize.emoji,
        }}
      >
        <Box sx={{ animation: 'bounce 2s infinite' }}>
          {avatar.emoji}
        </Box>
      </Paper>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </Box>
  );
};

export default AvatarDisplay;
