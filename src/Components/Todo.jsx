import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import '../App.css'

// *** icons *** // 
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// *** icons *** //

import { useContext } from 'react';
import { TodosContext } from '../Context/TodosContext';

//IMPORT DIALOG 
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
//IMPORT DIALOG 


const Todo = ({ todo, handleCompleted }) => {
    const { todos, setTodos } = useContext(TodosContext);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState({
        title: todo.title,
        details: todo.details
    });

    // EVENT HANDELERS
    function handleCompletedClick() {
        const updatedTodos = todos.map(t => {
            if (t.id === todo.id) {
                return { ...t, isCompleted: !t.isCompleted }
            }
            return t
        })
        setTodos(updatedTodos)
        localStorage.setItem('todos', JSON.stringify(updatedTodos))

    }

    function handleDeleteClick() {
        setShowDeleteDialog(true)
    }

    function handleEditClick() {
        setShowEditDialog(true)
    }

    function handleDeleteConfirm() {
        const updatedTodos = todos.filter(t => {
            return t.id !== todo.id
        })
        setTodos(updatedTodos)
        localStorage.setItem('todos', JSON.stringify(updatedTodos))
    }
    function handleEditConfirm(e) {
        e.preventDefault()
        const updatedTodos = todos.map(t => {
            if (t.id === todo.id) {
                return { ...t, title: updatedTodo.title, details: updatedTodo.details }
            }
            return t
        })
        setTodos(updatedTodos)
        localStorage.setItem('todos', JSON.stringify(updatedTodos))
        setShowEditDialog(false)
    }

    function handleCloseDialog() {
        setShowDeleteDialog(false)
        setShowEditDialog(false)
    }
    return (
        <>
            { /**  DELETE DIALOG */}
            <Dialog sx={{ direction: 'rtl' }}
                onClose={handleCloseDialog}
                open={showDeleteDialog}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"هل أنت متأكد من رغبتك في حذف المهمة؟"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        لا يمكنك التراجع عن الحذف في حال اختيار زر: (حذف) </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} >إغلاق</Button>
                    <Button sx={{ color: '#c34a4aff' }} onClick={handleDeleteConfirm} >حذف</Button>
                </DialogActions>
            </Dialog>
            { /**  DELETE DIALOG */}

            { /**  EDIT DIALOG */}
            <Dialog open={showEditDialog} onClose={handleCloseDialog} sx={{ direction: 'rtl' }} >
                <DialogTitle id="edit-dialog-title">تعديل المهمة</DialogTitle>
                <DialogContent>

                    <form id="editing-form" >
                        <TextField
                            margin="dense"
                            id="title"
                            name="title"
                            label='العنوان'
                            type="text"
                            fullWidth
                            variant="standard"
                            value={updatedTodo.title}
                            onChange={(e) => {
                                setUpdatedTodo({ ...updatedTodo, title: e.target.value })
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
                            value={updatedTodo.details}
                            onChange={(e) => {
                                setUpdatedTodo({ ...updatedTodo, details: e.target.value })
                            }} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} >إغلاق</Button>
                    <Button type="submit" variant='contained' form="editing-form" onClick={handleEditConfirm} >
                        تعديل
                    </Button>
                </DialogActions>
            </Dialog>
            { /**  EDIT DIALOG */}

            {/* CARD  */}
            <Card key={todo.id} className={todo.isCompleted ? 'todoCard active' : 'todoCard '} sx={{ minWidth: 275, background: '#283593', marginBlock: '10px' }}>
                <CardContent >
                    <Grid container spacing={2} alignItems={"center"}>
                        <Grid size={7}>
                            <Typography variant='h6' sx={{ overflow: 'hidden' }} >
                                {todo.title}
                            </Typography>
                            <Typography sx={{ overflow: 'hidden' }} >
                                {todo.details}
                            </Typography>
                        </Grid>
                        <Grid display={'flex'} justifyContent={'center'} gap={2} size={5}  >
                            {/* CHECK BUTTON */}
                            <IconButton className={todo.isCompleted ? "iconButton activeButton " : "iconButton"} onClick={handleCompletedClick} style={{ color: '#8bc34a', background: 'white', border: 'solid #8bc34a 3px' }}
                                sx={{
                                    width: { xs: '26px', sm: '48px' },
                                    height: { xs: '26px', sm: '48px' },
                                    
                                }}>
                                <CheckIcon sx={{
                                    fontSize: { xs: '16px', sm: '28px' },
                                }} />
                            </IconButton>
                            {/* EDIT BUTTON */}
                            <IconButton className="iconButton" style={{ color: '#4a68c3ff', background: 'white', border: 'solid #8aa4f5ff 3px' }} onClick={handleEditClick}
                                sx={{
                                    width: { xs: '26px', sm: '48px' },
                                    height: { xs: '26px', sm: '48px' },
                                }}>
                                <EditIcon sx={{
                                    fontSize: { xs: '16px', sm: '28px' },
                                }} />
                            </IconButton>
                            {/* DELETE BUTTON */}
                            <IconButton onClick={handleDeleteClick} className="iconButton" style={{ color: '#c34a4aff', background: 'white', border: 'solid #c34a4aff  3px' }}
                                sx={{
                                    width: { xs: '26px', sm: '48px' },
                                    height: { xs: '26px', sm: '48px' },
                                }}>
                                <DeleteIcon sx={{
                                    fontSize: { xs: '16px', sm: '28px' },
                                }} />
                            </IconButton>

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {/* CARD  */}
        </ >
    )
}

export default Todo; 
