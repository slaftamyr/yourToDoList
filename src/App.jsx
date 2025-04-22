 
 
import './App.css';
import ToDoList from './components/ToDoList';
import { useState } from 'react';
 
 
function App() {
  
  const [tasks, setTasks] = useState([]);
  return (
    <>
      <div className="App" style={{display :"flex" , justifyContent: "center" , alignItems : "center" }}>
    <todosContext.Provider value={{tasks, setTasks}}> <ToDoList /></todosContext.Provider>  </div> 
    </>
  )
}

export default App;
