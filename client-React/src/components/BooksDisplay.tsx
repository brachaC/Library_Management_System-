import { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../models/Book';
import type { Comment } from '../models/Comment';
import { getBooks, deleteBook, getCommentsByBookId, addComment, deleteComment } from '../server/api';
import { addLend } from '../server/api';
import { UserContext } from '../contexts/userContext';
import {
  Box, Container, Typography, Grid, Card, CardMedia, CardContent, CardActions,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Chip, Stack, Snackbar, Alert, List, ListItem, ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import BookIcon from '@mui/icons-material/Book';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const BooksDisplay = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [openBook, setOpenBook] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' as 'success' | 'error' });

  const loadBooks = useCallback(async () => {
    try {
      const res = await getBooks();
      setBooks(res.data || []);
    } catch { setSnack({ open: true, msg: 'שגיאה בטעינת ספרים', severity: 'error' }); }
  }, []);

  useEffect(() => { loadBooks(); }, [loadBooks]);

  const handleDeleteBook = async (id: number) => {
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
      setSnack({ open: true, msg: 'הספר נמחק בהצלחה', severity: 'success' });
    } catch { setSnack({ open: true, msg: 'שגיאה במחיקת הספר', severity: 'error' }); }
  };

  const handleLend = async (book: Book) => {
    try {
      await addLend({ lendingDate: new Date().toISOString().split('T')[0], book: { id: book.id }, user: { id: user?.id } });
      setSnack({ open: true, msg: `השאלת את "${book.title}" בהצלחה!`, severity: 'success' });
    } catch { setSnack({ open: true, msg: 'שגיאה בהשאלה', severity: 'error' }); }
  };

  const loadComments = async (bookId: number) => {
    try {
      const res = await getCommentsByBookId(bookId);
      setComments(res.data || []);
      setOpenComments(true);
    } catch { setSnack({ open: true, msg: 'שגיאה בטעינת תגובות', severity: 'error' }); }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedBook) return;
    try {
      await addComment({ content: newComment, date: new Date().toISOString().split('T')[0], book: { id: selectedBook.id }, user: { id: user?.id } });
      setNewComment('');
      await loadComments(selectedBook.id);
    } catch { setSnack({ open: true, msg: 'שגיאה בהוספת תגובה', severity: 'error' }); }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
      setSnack({ open: true, msg: 'תגובה נמחקה', severity: 'success' });
    } catch { setSnack({ open: true, msg: 'שגיאה במחיקת תגובה', severity: 'error' }); }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>
          📚 הספרים שלנו
        </Typography>
        {user?.status && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/Admin/AddNewBook')}>
            הוסף ספר חדש
          </Button>
        )}
      </Stack>

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
              <CardMedia
                component="img"
                height="200"
                image={book.image || '/placeholder.jpg'}
                alt={book.title as string}
                sx={{ objectFit: 'cover', bgcolor: '#e0e0e0' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap>{book.title}</Typography>
                <Typography variant="body2" color="text.secondary">מחבר: {book.author || 'לא ידוע'}</Typography>
                <Chip label={book.categoryName || 'כללי'} size="small" sx={{ mt: 1 }} />
                {book.pageCount > 0 && (
                  <Typography variant="caption" display="block" mt={0.5}>{book.pageCount} עמודים</Typography>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Box>
                  <IconButton size="small" color="primary" onClick={() => { setSelectedBook(book); setOpenBook(true); }}>
                    <BookIcon />
                  </IconButton>
                  <IconButton size="small" color="info" onClick={() => { setSelectedBook(book); loadComments(book.id); }}>
                    <ChatBubbleIcon />
                  </IconButton>
                </Box>
                <Box>
                  {user?.status && (
                    <>
                      <IconButton size="small" color="warning" onClick={() => navigate('/Admin/AddNewBook', { state: book })}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDeleteBook(book.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                  <Button size="small" variant="contained" onClick={() => handleLend(book)}>השאל</Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Book detail dialog */}
      <Dialog open={openBook} onClose={() => setOpenBook(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedBook?.title}</DialogTitle>
        <DialogContent>
          <Typography><strong>מחבר:</strong> {selectedBook?.author}</Typography>
          <Typography><strong>עמודים:</strong> {selectedBook?.pageCount}</Typography>
          <Typography><strong>קטגוריה:</strong> {selectedBook?.categoryName}</Typography>
          <Typography sx={{ mt: 2 }}>{selectedBook?.summary}</Typography>
        </DialogContent>
        <DialogActions><Button onClick={() => setOpenBook(false)}>סגור</Button></DialogActions>
      </Dialog>

      {/* Comments dialog */}
      <Dialog open={openComments} onClose={() => setOpenComments(false)} maxWidth="sm" fullWidth>
        <DialogTitle>תגובות על "{selectedBook?.title}"</DialogTitle>
        <DialogContent>
          <List>
            {comments.map((c) => (
              <ListItem key={c.id} secondaryAction={user?.status && (
                <IconButton edge="end" size="small" onClick={() => handleDeleteComment(c.id)}><DeleteIcon fontSize="small" /></IconButton>
              )}>
                <ListItemText primary={c.content} secondary={c.date?.toString()} />
              </ListItem>
            ))}
            {comments.length === 0 && <Typography color="text.secondary">אין תגובות עדיין</Typography>}
          </List>
          <Stack direction="row" spacing={1} mt={2}>
            <TextField fullWidth size="small" placeholder="הוסף תגובה..." value={newComment}
              onChange={(e) => setNewComment(e.target.value)} />
            <Button variant="contained" onClick={handleAddComment}>שלח</Button>
          </Stack>
        </DialogContent>
        <DialogActions><Button onClick={() => setOpenComments(false)}>סגור</Button></DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </Container>
  );
};

export default BooksDisplay;
