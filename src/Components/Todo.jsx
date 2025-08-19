import React from 'react'
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

import { useTodosDispatch } from '../Context/TodosContext';
import { useToast } from '../Context/ToastContext';

const Todo = ({ todo, showDelete, showEdit }) => {
    const dispatch = useTodosDispatch();

    const { showHideToast } = useToast()

    // EVENT HANDELERS
    function handleCompletedClick() {
        dispatch({ type: "TOGGLE_BUTTON", payload: todo });
        showHideToast("تم التعديل بنجاح");
    }


    function handleDeleteClick() {
        showDelete(todo);

    }

    function handleEditClick() {
        showEdit(todo);
    }

    return (
        <>
            {/* CARD  */}
            <Card key={todo.id} className='todoCard' sx={{ minWidth: 275, background: '#283593', marginBlock: '10px' }} style={{ textDecoration: todo.isCompleted ? "line-through 5px #565656ff" : "none" }}>
                <CardContent>
                    <Grid container spacing={2} alignItems={"center"}>
                        <Grid size={7}>
                            <Typography variant='h6' sx={{ overflow: 'hidden', color:"#fff"}} >
                                {todo.title}
                            </Typography>
                            <Typography sx={{ overflow: 'hidden', color:'#bababa' }} >
                                {todo.details}
                            </Typography>
                        </Grid>
                        <Grid display={'flex'} justifyContent={'center'} gap={2} size={5}  >
                            {/* CHECK BUTTON */}
                            <IconButton className="iconButton " onClick={handleCompletedClick} style={{ color: !todo.isCompleted ? '#8bc34a' : '#fff', background: todo.isCompleted ? '#8bc34a' : '#fff', border: 'solid #8bc34a 3px' }}
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
