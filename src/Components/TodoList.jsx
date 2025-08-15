import * as React from 'react';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useContext } from 'react';
import { TodosContext } from '../Context/TodosContext';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import '../App.css'
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


export default function TodoList() {

    const [titleInput, setTitleInput] = useState('');
    const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(true);
    const [displayedTodosType, setDisplayedTodosType] = useState("All");
    const { todos, setTodos } = useContext(TodosContext);

    // filteration arrays 
    const completedTodos = todos.filter((t) => t.isCompleted);
    const nonCompletedTodos = todos.filter((t) => !t.isCompleted);
    let todosToBeRendered = todos;       // default array to be rendered

    if (displayedTodosType === "completed") {
        todosToBeRendered = completedTodos;
    } else if (displayedTodosType === "non-completed") {
        todosToBeRendered = nonCompletedTodos;
    }

    const todosJSX = todosToBeRendered.map(todo => (
        <Todo key={todo.id} todo={todo} />
    ));

    function handleAddClick() {
        if (titleInput.trim() !== '') {
            const newTodo = {
                id: Date.now(),
                title: titleInput,
                details: '',
                isCompleted: false
            };
            const updatedTodos = [...todos, newTodo]
            setTodos(updatedTodos);
            // store todos in local storage
            localStorage.setItem('todos', JSON.stringify(updatedTodos))
            setTitleInput('');
        }
        return
    }

    function changeDisplayType(e) {
        const type = e.target.value;
        setDisplayedTodosType(type);
    }

    // retrive todos from localStorage

    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
        if (storageTodos) {
            setTodos(storageTodos);
        }
    }, []);

    // check if there are items in local storage
    useEffect(() => {
        setIsLocalStorageEmpty(todos.length === 0);
    }, [todos]);

    return (
        <Container maxWidth="sm"  >
            <Card sx={{ minWidth: 275, maxHeight: "670px", textAlign: 'center' }}  >
                <CardContent >
                    <Typography variant='h4' gutterBottom >
                        مهامي
                    </Typography>
                    <Divider />
                    {/* FILTER BUTTONS  */}
                    <ToggleButtonGroup style={{
                        direction: 'ltr',
                        marginBlock: "10px"
                    }}
                        value={displayedTodosType}
                        exclusive
                        onChange={changeDisplayType}
                        color='primary'
                        aria-label="type of filteration">
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
                    {/* ---- FILTER BUTTONS ---- */}
                    {/* ALL TODOS */}
                    <Container className='todosContainer' style={{
                        maxHeight: '300px',
                        overflow: 'auto'
                    }}>
                        {isLocalStorageEmpty ? (<>

                            <Box sx={{ textAlign: 'center', p: 4 }}>
                                <EmojiEmotionsIcon sx={{ fontSize: 60, color: '#6dbdffff', mb: 2 }} />
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    "مساحة نظيفة لعقل منظم!"
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    هذه فرصتك لبدء يوم منتج، أضف أول مهمة لديك
                                </Typography>
                            </Box>
                        </>) : todosJSX}
                    </Container>
                    {/* ALL TODOS */}

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
        </Container >
    );

}
