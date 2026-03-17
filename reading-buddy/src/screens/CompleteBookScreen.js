import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Rating,
  Alert,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { QUIZ_QUESTIONS, BADGES, BOOKS_DATA } from '../data/mockData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CompleteBookScreen = () => {
  const navigate = useNavigate();
  const { currentBook, completeBook, selectBook, userAge } = useAppContext();
  const [step, setStep] = useState('quiz'); // quiz, feedback, reward, recommendation
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [completedBook, setCompletedBook] = useState(null);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [achievementData, setAchievementData] = useState(null);
  const [recommendedBook, setRecommendedBook] = useState(null);

  // Redirect to recommendation after achievement modal closes
  useEffect(() => {
    if (!showAchievementModal && recommendedBook && step !== 'recommendation') {
      setStep('recommendation');
    }
  }, [showAchievementModal, recommendedBook, step]);

  // Redirect to catalog if no active book
  useEffect(() => {
    if (!currentBook && !completedBook && step !== 'recommendation') {
      navigate('/catalog');
    }
  }, [currentBook, completedBook, navigate, step]);

  const activeBook = currentBook || completedBook;

  if (!activeBook) {
    return null;
  }

  const questions = QUIZ_QUESTIONS[activeBook.id] || [];

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

  const isBookMatchingAge = (book, effectiveUserAge) => {
    const ageRange = getAgeRange(effectiveUserAge);

    let bookMinAge, bookMaxAge;
    if (book.ageGroup.includes('+')) {
      bookMinAge = parseInt(book.ageGroup.replace('+', ''), 10);
      bookMaxAge = 100;
    } else if (book.ageGroup.includes('-')) {
      const parts = book.ageGroup.split('-').map(Number);
      bookMinAge = parts[0];
      bookMaxAge = parts[1];
    } else {
      bookMinAge = parseInt(book.ageGroup, 10);
      bookMaxAge = bookMinAge;
    }

    return !(bookMaxAge < ageRange.min || bookMinAge > ageRange.max);
  };

  const getRecommendedBook = (userRating) => {
    const otherBooks = BOOKS_DATA.filter(b => b.id !== activeBook.id);
    const effectiveUserAge = userAge || 'all';
    const ageMatched = otherBooks.filter((b) => isBookMatchingAge(b, effectiveUserAge));
    const candidateBooks = ageMatched.length > 0 ? ageMatched : otherBooks;
    
    if (userRating <= 3) {
      // Suggest a book from a DIFFERENT category
      const differentCategory = candidateBooks.filter(b => b.category !== activeBook.category);
      if (differentCategory.length > 0) {
        return differentCategory[Math.floor(Math.random() * differentCategory.length)];
      }
    } else {
      // Suggest a book from the SAME category
      const sameCategory = candidateBooks.filter(b => b.category === activeBook.category);
      if (sameCategory.length > 0) {
        return sameCategory[Math.floor(Math.random() * sameCategory.length)];
      }
    }
    return candidateBooks[Math.floor(Math.random() * candidateBooks.length)];
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount += 1;
      }
    });

    const passed = correctCount >= 2; // Need at least 2/3 correct
    setQuizResult({ passed, correctCount, total: questions.length });

    if (passed) {
      setStep('feedback');
    }
  };

  const handleSubmitFeedback = () => {
    setCompletedBook(currentBook);
    const result = completeBook(rating, feedback);
    
    // Prepare recommended book based on rating
    const recommended = getRecommendedBook(rating);
    setRecommendedBook(recommended);

    // Check if there are new badges
    if (result?.newBadges && result.newBadges.length > 0) {
      setAchievementData({
        type: 'achievement',
        newBadges: result.newBadges,
        newLevel: result.newLevel,
        points: result.points,
      });
      setShowAchievementModal(true);
    } else {
      // If no badges, go directly to recommendation
      setStep('recommendation');
    }
  };

  // Achievement Modal
  const AchievementModal = () => {
    const getBadgeInfo = (badgeId) => {
      return BADGES.find(b => b.id === badgeId);
    };

    const newBadgesList = (achievementData?.newBadges || []).map(badgeId => getBadgeInfo(badgeId)).filter(b => b);

    return (
      <Dialog
        open={showAchievementModal}
        onClose={() => setShowAchievementModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #FFD93D 0%, #FF6B9D 100%)',
          },
        }}
      >
        <DialogContent
          sx={{
            padding: '40px 30px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              fontSize: '5rem',
              mb: 2,
              animation: 'bounce 1s infinite',
            }}
          >
            🎊
          </Box>

          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
          `}</style>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2.5,
              background: 'linear-gradient(135deg, #FF6B9D 0%, #A8E63D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            כל הכבוד! הישגים חדשים! 🌟
          </Typography>

          {/* Display all new badges */}
          {newBadgesList.length > 0 && (
            <Box sx={{ mb: 3 }}>
              {newBadgesList.map((badge) => (
                <Box
                  key={badge.id}
                  sx={{
                    mb: 2,
                    p: 2,
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '16px',
                  }}
                >
                  <Box sx={{ fontSize: '3rem', mb: 1 }}>
                    {badge.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#FFFFFF',
                      mb: 0.5,
                    }}
                  >
                    {badge.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#FFFFFF',
                      opacity: 0.9,
                    }}
                  >
                    {badge.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Display level if level-up occurred */}
          {achievementData?.newBadges?.some(b => b.startsWith('level-')) && (
            <Box sx={{ mb: 2, p: 2, background: 'rgba(255,255,255,0.3)', borderRadius: '16px', width: '100%' }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                ⬆️ עלית לרמה {achievementData.newLevel}!
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            padding: '20px 30px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={() => setShowAchievementModal(false)}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #4ECDC4 0%, #45B7AA 100%)',
              color: 'white',
              fontWeight: 700,
              px: 4,
            }}
          >
            הודעה!
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (step === 'quiz') {
    return (
      <>
        <AchievementModal />
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
                mb: 1.5,
                background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              🧠 בחן את עצמך
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
              ענה על השאלות כדי להוכיח שקראת את {currentBook.title}
            </Typography>

            {/* Quiz Alert */}
            {quizResult && !quizResult.passed && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: '16px',
                  fontSize: '1rem',
                }}
              >
                😊 נראה שהתבלבלת קצת. ענית נכון על {quizResult.correctCount} שאלות.
                נסה לקרוא שוב את הפרק האחרון וחזור שוב!
              </Alert>
            )}

            {/* Questions */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
              {questions.map((question, idx) => (
                <Card
                  key={question.id}
                  sx={{
                    background: '#F9F9F9',
                    border: '2px solid #E0E0E0',
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 2.5,
                        color: '#2C3E50',
                      }}
                    >
                      שאלה {idx + 1}: {question.question}
                    </Typography>

                    <RadioGroup
                      value={answers[question.id] !== undefined ? answers[question.id] : ''}
                      onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
                    >
                      {question.options.map((option, optIdx) => (
                        <FormControlLabel
                          key={optIdx}
                          value={optIdx}
                          control={
                            <Radio
                              sx={{
                                color: '#4ECDC4',
                                '&.Mui-checked': {
                                  color: '#FF6B9D',
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 500,
                                color: '#2C3E50',
                              }}
                            >
                              {option}
                            </Typography>
                          }
                          sx={{
                            mb: 1.5,
                            p: 1.5,
                            borderRadius: '12px',
                            background: '#FFFFFF',
                            border: '1px solid #E0E0E0',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: '#FFF9E6',
                            },
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Submit Button */}
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSubmitQuiz}
              sx={{
                background: 'linear-gradient(135deg, #A8E63D 0%, #8BC924 100%)',
                padding: '16px',
                fontSize: '1.1rem',
              }}
            >
              ✅ שלח תשובות
            </Button>
          </Paper>
        </Container>
      </Box>
      </>
    );
  }

  if (step === 'feedback') {
    return (
      <>
        <AchievementModal />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #FFF9E6 0%, #E0F7F6 100%)',
          padding: '20px',
        }}
      >
        <Container maxWidth="sm">
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
                mb: 1.5,
                background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ✨ משוב
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
              איך היה הספר?
            </Typography>

            {/* Rating */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: '#2C3E50',
                  textAlign: 'center',
                }}
              >
                דרג את הספר:
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Rating
                  size="large"
                  value={rating}
                  onChange={(e, newValue) => setRating(newValue)}
                  sx={{
                    fontSize: '3rem',
                  }}
                />
              </Box>

              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  color: '#7F8C8D',
                  fontWeight: 600,
                }}
              >
                {rating === 5 && '😍 מעולה! אתה אוהב את הספר הזה!'}
                {rating === 4 && '😊 ממש טוב!'}
                {rating === 3 && '👍 בסדר, ספר סביר'}
                {rating === 2 && '🤔 לא כל כך אהבת'}
                {rating === 1 && '😞 לא אהבת'}
                {rating === 0 && '⭐ בחר דירוג'}
              </Typography>
            </Box>

            {/* Feedback Text */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  color: '#2C3E50',
                }}
              >
                מה למדת מהספר?
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="כתוב משהו על הספר... מה אהבת? מה למדת?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                  },
                }}
              />
            </Box>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmitFeedback}
                disabled={rating === 0}
                sx={{
                  background: 'linear-gradient(135deg, #FF6B9D 0%, #E84C7A 100%)',
                  padding: '14px',
                  fontSize: '1.1rem',
                }}
              >
                ➡️ הבא
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => setStep('quiz')}
                sx={{
                  borderColor: '#7F8C8D',
                  color: '#2C3E50',
                  padding: '14px',
                }}
              >
                ⬅️ חזור
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
      </>
    );
  }

  if (step === 'recommendation') {
    const isLowRating = rating <= 3;
    const categoryMessage = isLowRating
      ? 'נראה שלא אהבת את הסגנון... אולי ספר מסוג שונה יתאים יותר.'
      : 'נראה שאהבת את הסגנון הזה! הנה ספר מאותו סוג:';

    const handleTakeRecommendedBook = () => {
      if (recommendedBook) {
        selectBook(recommendedBook);
        navigate('/home');
      }
    };

    return (
      <>
        <AchievementModal />
        <Dialog
          open
          onClose={() => navigate('/catalog')}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '24px',
              background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFF9E6 100%)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
              textAlign: 'center',
            },
          }}
        >
          <DialogContent sx={{ padding: '40px 30px' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2.5,
                background: 'linear-gradient(135deg, #FF6B9D 0%, #A8E63D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {isLowRating ? '📚 הצעה חדשה' : '💡 הצעה מיוחדת'}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: '#7F8C8D',
                fontWeight: 600,
                fontSize: '1.1rem',
              }}
            >
              {categoryMessage}
            </Typography>

            {/* Recommended Book Card */}
            {recommendedBook && (
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #FFE0EC 0%, #FFF9E6 100%)',
                  mb: 2,
                  border: '3px solid #FFD93D',
                  p: 3,
                }}
              >
                <Box sx={{ fontSize: '4rem', mb: 2 }}>
                  {recommendedBook.image}
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: '#2C3E50',
                  }}
                >
                  {recommendedBook.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    color: '#7F8C8D',
                    fontStyle: 'italic',
                  }}
                >
                  {recommendedBook.author}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    color: '#FF6B9D',
                    fontWeight: 600,
                  }}
                >
                  קטגוריה: {recommendedBook.category}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#7F8C8D',
                    fontSize: '0.9rem',
                  }}
                >
                  {recommendedBook.description}
                </Typography>
              </Card>
            )}
          </DialogContent>

          <DialogActions
            sx={{
              padding: '20px 30px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {/* Buttons */}
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleTakeRecommendedBook}
              disabled={!recommendedBook}
              sx={{
                background: 'linear-gradient(135deg, #A8E63D 0%, #8BC924 100%)',
                padding: '16px',
                fontSize: '1.1rem',
                fontWeight: 700,
              }}
            >
              {isLowRating ? '✅ אני רוצה את הספר הזה' : '✅ לקחת את הספר הזה'}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => navigate('/catalog')}
              sx={{
                borderColor: '#FF6B9D',
                color: '#FF6B9D',
                padding: '16px',
                fontSize: '1.1rem',
                fontWeight: 700,
              }}
            >
              📚 חזור לעמוד הספרים
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  if (step === 'reward') {
    return (
      <>
        <AchievementModal />
        <Box
          sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #FFD93D 0%, #FF6B9D 100%)',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Paper
            sx={{
              padding: '50px 40px',
              borderRadius: '32px',
              background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFF9E6 100%)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
              textAlign: 'center',
            }}
          >
            {/* Celebration Animation */}
            <Box
              sx={{
                fontSize: '5rem',
                mb: 2,
                animation: 'bounce 1s infinite',
              }}
            >
              🎉
            </Box>

            <style>{`
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
              }
            `}</style>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                background: 'linear-gradient(135deg, #FF6B9D 0%, #A8E63D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              כל הכבוד!
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 3,
                color: '#7F8C8D',
                fontWeight: 600,
              }}
            >
              סיימת את {currentBook.title}!
            </Typography>

            {/* Points Summary */}
            <Card
              sx={{
                background: 'linear-gradient(135deg, #FFE0EC 0%, #FFF9E6 100%)',
                mb: 3,
                border: '3px solid #FFD93D',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  🏆 הנקודות שלך:
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    textAlign: 'right',
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    ✅ ספר בסיסי: 50 נק'
                  </Typography>
                  {currentBook.pages > 100 && (
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#A8E63D' }}>
                      📚 בונוס ספר עבה: +20 נק'
                    </Typography>
                  )}
                  {Math.floor((new Date() - new Date(currentBook.startDate)) / (1000 * 60 * 60 * 24)) <= 7 && (
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#4ECDC4' }}>
                      ⚡ בונוס קצב: +10 נק'
                    </Typography>
                  )}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: '#FF6B9D',
                      borderTop: '2px solid #FFD93D',
                      pt: 1.5,
                    }}
                  >
                    סך הכל: 50+ נק'
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Button */}
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate('/catalog')}
              sx={{
                background: 'linear-gradient(135deg, #FF6B9D 0%, #E84C7A 100%)',
                padding: '16px',
                fontSize: '1.1rem',
              }}
            >
              👤 לאזור האישי שלי
            </Button>
          </Paper>
        </Container>
      </Box>
      </>
    );
  }
};

export default CompleteBookScreen;
