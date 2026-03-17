import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TeacherScreen = () => {
  const navigate = useNavigate();
  const { grantBonus, logout, addBonusHistoryForStudent } = useAppContext();
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [bonusDialog, setBonusDialog] = useState(false);
  const [bonusMessage, setBonusMessage] = useState('');
  const [addStudentDialog, setAddStudentDialog] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');

  // Default demo students shown to the teacher on first use
  const [students, setStudents] = useState([
    { id: 1, name: 'עדי', points: 450, books: 9, level: 5, lastActive: '3 דקות', status: 'פעיל' },
    { id: 2, name: 'רועי', points: 380, books: 7, level: 4, lastActive: '1 שעה', status: 'פעיל' },
    { id: 3, name: 'שלום', points: 320, books: 6, level: 4, lastActive: '3 ימים', status: 'לא פעיל' },
    { id: 4, name: 'דן', points: 150, books: 3, level: 2, lastActive: '1 יום', status: 'פעיל' },
    { id: 5, name: 'שרה', points: 100, books: 2, level: 1, lastActive: '5 ימים', status: 'לא פעיל' },
  ]);

  // Load students from localStorage on component mount, seeding with demo list if empty
  useEffect(() => {
    const teacherStudents = JSON.parse(localStorage.getItem('teacherStudents') || '[]');

    if (teacherStudents.length === 0) {
      // First time: seed localStorage with the default demo students
      localStorage.setItem('teacherStudents', JSON.stringify(students));
      setStudents(students);
      return;
    }

    // Add status field if missing
    const studentsWithStatus = teacherStudents.map((s) => ({
      ...s,
      status: s.status || 'פעיל',
    }));
    setStudents(studentsWithStatus);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBack = () => {
    logout();
    navigate('/');
  };

  const handleAddStudent = () => {
    if (!newStudentName.trim()) {
      setError('נא הזן שם תלמיד');
      return;
    }

    const numericIds = students.map((s) => (typeof s.id === 'number' ? s.id : 0));
    const newStudent = {
      id: Math.max(...numericIds, 0) + 1,
      name: newStudentName,
      points: 0,
      books: 0,
      level: 1,
      lastActive: 'עכשיו',
      status: 'פעיל',
    };

    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    localStorage.setItem('teacherStudents', JSON.stringify(updatedStudents));
    setNewStudentName('');
    setAddStudentDialog(false);
  };

  const handleGrantBonus = (bonusPoints) => {
    if (selectedStudent) {
      // Update local students list
      const updatedStudents = students.map(s =>
        s.id === selectedStudent.id
          ? { ...s, points: s.points + bonusPoints }
          : s
      );
      setStudents(updatedStudents);
      localStorage.setItem('teacherStudents', JSON.stringify(updatedStudents));

      // Save bonus history entry for this specific student so they'll see it בפרופיל
      addBonusHistoryForStudent(selectedStudent.id, bonusPoints, 'המורה הוסיפה לך בונוס');

      // Optionally, if the bonus ניתן לתלמיד שמחובר כרגע, גם לעדכן את הסטטוס החי
      grantBonus(bonusPoints, `קיבלת בונוס מהמורה! 🎉`);

      setBonusDialog(false);
      setSelectedStudent(null);
      setBonusMessage('');
    }
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
            onClick={handleBack}
            sx={{
              color: '#2C3E50',
              fontWeight: 600,
            }}
          >
            חזור
          </Button>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #4ECDC4 0%, #A8E63D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            👨‍🏫 דאשבורד המורה
          </Typography>

          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{
              fontWeight: 700,
            }}
          >
            התנתק
          </Button>
        </Box>

        {/* Summary Stats */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 4 }}>
          <Paper
            sx={{
              p: 2.5,
              background: 'linear-gradient(135deg, #FFE0EC 0%, #FFF9E6 100%)',
              textAlign: 'center',
              borderRadius: '16px',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#FF6B9D' }}>
              {students.length}
            </Typography>
            <Typography variant="body2" sx={{ color: '#7F8C8D', fontWeight: 600 }}>
              תלמידים בכיתה
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 2.5,
              background: 'linear-gradient(135deg, #E0F7F6 0%, #FFF9E6 100%)',
              textAlign: 'center',
              borderRadius: '16px',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#4ECDC4' }}>
              {students.filter(s => s.status === 'פעיל').length}
            </Typography>
            <Typography variant="body2" sx={{ color: '#7F8C8D', fontWeight: 600 }}>
              פעילים היום
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 2.5,
              background: 'linear-gradient(135deg, #FFE0EC 0%, #FFF9E6 100%)',
              textAlign: 'center',
              borderRadius: '16px',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#A8E63D' }}>
              {students.reduce((sum, s) => sum + s.books, 0)}
            </Typography>
            <Typography variant="body2" sx={{ color: '#7F8C8D', fontWeight: 600 }}>
              ספרים שקראו בסך הכל
            </Typography>
          </Paper>
        </Box>

        {/* Add Student Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            onClick={() => setAddStudentDialog(true)}
            sx={{
              background: 'linear-gradient(135deg, #A8E63D 0%, #8BC924 100%)',
              padding: '12px 30px',
              fontSize: '1rem',
              fontWeight: 700,
            }}
          >
            ➕ הוסף תלמיד חדש
          </Button>
        </Box>

        {/* Students Table */}
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
                  background: 'linear-gradient(135deg, #4ECDC4 0%, #A8E63D 100%)',
                }}
              >
                <TableCell
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  👤 שם התלמיד
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  ⭐ נקודות
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  📚 ספרים
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  🎯 רמה
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  🕐 פעיל בעבור
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  📊 סטטוס
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  🎁 פעולות
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {students.map((student, idx) => (
                <TableRow
                  key={student.id}
                  sx={{
                    background: idx % 2 === 0 ? '#F9F9F9' : '#FFFFFF',
                    '&:hover': {
                      background: '#F0F0F0',
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    {student.name}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color: '#A8E63D',
                    }}
                  >
                    {student.points}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      color: '#4ECDC4',
                    }}
                  >
                    {student.books}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color: '#FF6B9D',
                    }}
                  >
                    {student.level}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 500,
                      color: '#7F8C8D',
                    }}
                  >
                    {student.lastActive}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      color: student.status === 'פעיל' ? '#A8E63D' : '#FF6B6B',
                    }}
                  >
                    {student.status === 'פעיל' ? '🟢' : '🔴'} {student.status}
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setSelectedStudent(student);
                        setBonusDialog(true);
                      }}
                      sx={{
                        background: 'linear-gradient(135deg, #FFD93D 0%, #FFC300 100%)',
                        color: 'white',
                        fontWeight: 700,
                      }}
                    >
                      🎁 בונוס
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Bonus Dialog */}
        <Dialog open={bonusDialog} onClose={() => setBonusDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 700, background: 'linear-gradient(135deg, #FFD93D 0%, #FFC300 100%)', color: 'white' }}>
            🎁 הענק בונוס ל-{selectedStudent?.name}
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
              בחר סוג בונוס:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  handleGrantBonus(50);
                }}
                sx={{
                  borderColor: '#A8E63D',
                  color: '#A8E63D',
                  fontWeight: 700,
                  p: 2,
                }}
              >
                ⭐ בונוס 50 נקודות
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  handleGrantBonus(100);
                }}
                sx={{
                  borderColor: '#FFD93D',
                  color: '#FFD93D',
                  fontWeight: 700,
                  p: 2,
                }}
              >
                🌟 בונוס 100 נקודות
              </Button>
            </Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#7F8C8D' }}>
              הערה (אופציונלית):
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="כתוב הערה למה קיבל בונוס..."
              value={bonusMessage}
              onChange={(e) => setBonusMessage(e.target.value)}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => {
              setBonusDialog(false);
              setSelectedStudent(null);
              setBonusMessage('');
            }}>ביטול</Button>
          </DialogActions>
        </Dialog>

        {/* Add Student Dialog */}
        <Dialog open={addStudentDialog} onClose={() => setAddStudentDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 700, background: 'linear-gradient(135deg, #A8E63D 0%, #8BC924 100%)', color: 'white' }}>
            ➕ הוסף תלמיד חדש
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
              הזן את שם התלמיד החדש:
            </Typography>
            <TextField
              fullWidth
              label="שם התלמיד"
              placeholder="לדוגמה: דוד, מרים, אליהו..."
              value={newStudentName}
              onChange={(e) => {
                setNewStudentName(e.target.value);
                setError('');
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
              inputProps={{ style: { textAlign: 'right' } }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => {
              setAddStudentDialog(false);
              setNewStudentName('');
            }}>ביטול</Button>
            <Button
              variant="contained"
              onClick={handleAddStudent}
              sx={{
                background: 'linear-gradient(135deg, #A8E63D 0%, #8BC924 100%)',
              }}
            >
              הוסף
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default TeacherScreen;
