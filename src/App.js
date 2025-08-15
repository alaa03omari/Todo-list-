import './index.css';
import TodoList from "./Components/TodoList";
import { useState } from 'react';
import { TodosContext } from './Context/TodosContext.jsx';
function App() {

  const [todos, setTodos] = useState([]);


  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "100vh",
    gap: "20px",
    background: 'linear-gradient(135deg, #011e3fff 0%, #6dbdffff 100%)',
    direction: "rtl",

  }

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <div style={style}>
        <TodoList />
      </div >
    </TodosContext.Provider>
  );
}

export default App;

