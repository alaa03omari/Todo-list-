import * as React from 'react';
import Container from '@mui/material/Container';
import { useState, useContext, useEffect, useMemo, useReducer } from 'react';
import { TodosContext, useTodos, useTodosDispatch } from '../Context/TodosContext';
import { useToast } from '../Context/ToastContext';
import todosReducer from '../Reducer/todosReducer';
import Box from '@mui/material/Box';
import '../App.css';
// Components
import Todo from './Todo';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//icons 
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// Dialog components
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

export default function TodoList() {
    const [titleInput, setTitleInput] = useState('');
    const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(true);
    const [displayedTodosType, setDisplayedTodosType] = useState("All");

    const { showHideToast } = useToast()
    const todos = useTodos();
    const dispatch = useTodosDispatch();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [dialogTodo, setDialogTodo] = useState(null);
    const [showEditDialog, setShowEditDialog] = useState(false);



    //Handlers
    function handleCloseDialog() {
        setShowDeleteDialog(false);
        setShowEditDialog(false);
    }

    function openDeleteDialog(todo) {
        setShowDeleteDialog(true);
        setDialogTodo(todo);
    }

    function openEditDialog(todo) {
        setShowEditDialog(true);
        setDialogTodo(todo);
    }

    function handleDeleteConfirm() {
        dispatch({
            type: 'DELETE_TODO',
            payload: dialogTodo
        });
        setShowDeleteDialog(false);
        showHideToast('تم حذف المهمة بنجاح');
    }

    function handleEditConfirm() {
        dispatch({
            type: 'EDIT_TODO',
            payload: dialogTodo
        })
        setShowEditDialog(false);
        showHideToast('تم التعديل بنجاح')
    }

    // filteration arrays
    const completedTodos = useMemo(() => {
        return todos.filter((t) => t.isCompleted);
    }, [todos]);

    const nonCompletedTodos = useMemo(() => {
        return todos.filter((t) => !t.isCompleted);
    }, [todos]);

    let todosToBeRendered = todos; // default array to be rendered

    if (displayedTodosType === "completed") {
        todosToBeRendered = completedTodos;
    } else if (displayedTodosType === "non-completed") {
        todosToBeRendered = nonCompletedTodos;
    }

    const todosJSX = todosToBeRendered.map((todo) => (
        <Todo key={todo.id} todo={todo} showDelete={openDeleteDialog} showEdit={openEditDialog} />
    ));

    function handleAddClick() {
        if (titleInput.trim() !== '') {
            dispatch({
                type: 'ADD_TODO',
                payload: { newTitle: titleInput }
            });
            setTitleInput('');
            showHideToast("تمت الإضافة بنجاح")
        }
    }

    function changeDisplayType(e) {
        const type = e.target.value;
        setDisplayedTodosType(type);
    }

    // retrieve todos from localStorage
    useEffect(() => {
        dispatch({
            type: 'GET_TODOS'
        })
    }, []);

    // check if there are items in local storage
    useEffect(() => {
        setIsLocalStorageEmpty(todos.length === 0);
    }, [todos]);

    return (
        <>
            {/** EDIT DIALOG */}
            <Dialog open={showEditDialog} onClose={handleCloseDialog} sx={{ direction: 'rtl' }}>
                <DialogTitle id="edit-dialog-title">تعديل المهمة</DialogTitle>
                <DialogContent>
                    <form id="editing-form">
                        <TextField
                            margin="dense"
                            id="title"
                            name="title"
                            label='العنوان'
                            type="text"
                            fullWidth
                            variant="standard"
                            value={dialogTodo?.title}
                            onChange={(e) => {
                                setDialogTodo({
                                    ...dialogTodo,
                                    title: e.target.value,
                                });
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="details"
                            name="details"
                            label='التفاصيل'
                            type="text"
                            fullWidth
                            variant="standard"
                            value={dialogTodo?.details}
                            onChange={(e) => {
                                setDialogTodo({
                                    ...dialogTodo,
                                    details: e.target.value,
                                });
                            }}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>إغلاق</Button>
                    <Button type="button" variant='contained' onClick={handleEditConfirm}>
                        تعديل
                    </Button>
                </DialogActions>
            </Dialog>

            {/** DELETE DIALOG */}
            <Dialog
                sx={{ direction: 'rtl' }}
                onClose={handleCloseDialog}
                open={showDeleteDialog}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"هل أنت متأكد من رغبتك في حذف المهمة؟"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        لا يمكنك التراجع عن الحذف في حال اختيار زر: (حذف)
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>إغلاق</Button>
                    <Button sx={{ color: '#c34a4aff' }} onClick={handleDeleteConfirm}>حذف</Button>
                </DialogActions>
            </Dialog>

            <Container maxWidth="sm">
                <Card sx={{ minWidth: 275, maxHeight: "670px", textAlign: 'center' }}>
                    <CardContent>
                        <Typography variant='h4' gutterBottom>
                            مهامي
                        </Typography>
                        <Divider />
                        {/* FILTER BUTTONS */}
                        <ToggleButtonGroup
                            style={{
                                direction: 'ltr',
                                marginBlock: "10px"
                            }}
                            value={displayedTodosType}
                            exclusive
                            onChange={changeDisplayType}
                            color='primary'
                            aria-label="type of filteration"
                        >
                            <ToggleButton value="non-completed" aria-label="non completed">
                                غير منجز
                            </ToggleButton>
                            <ToggleButton value="completed" aria-label="completed">
                                منجز
                            </ToggleButton>
                            <ToggleButton value="All" aria-label="All">
                                الكل
                            </ToggleButton>
                        </ToggleButtonGroup>

                        {/* ALL TODOS */}
                        <Container className='todosContainer' style={{
                            maxHeight: '300px',
                            overflow: 'auto'
                        }}>
                            {isLocalStorageEmpty ? (
                                <Box sx={{ textAlign: 'center', p: 4 }}>
                                    <EmojiEmotionsIcon sx={{ fontSize: 60, color: '#6dbdffff', mb: 2 }} />
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        "مساحة نظيفة لعقل منظم!"
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        هذه فرصتك لبدء يوم منتج، أضف أول مهمة لديك
                                    </Typography>
                                </Box>
                            ) : todosJSX}
                        </Container>

                        {/* INPUT + ADD BUTTON */}
                        <Grid columns={{ xs: 2, sm: 4, md: 12 }} sx={{ marginTop: '15px', alignItems: "center", gap: "30px" }} container>
                            <Grid size={7}>
                                <TextField value={titleInput}
                                    onChange={(e) => {
                                        setTitleInput(e.target.value)
                                    }}
                                    sx={{ width: "100%" }} id="outlined-basic" label="عنوان المهمة" variant="outlined" />
                            </Grid>

                            <Grid size={4} >
                                <Button onClick={handleAddClick} sx={{ width: "100%" }} variant="contained">إضافة</Button >

                            </Grid>

                        </Grid>

                        {/* INPUT + ADD BUTTON */}
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}