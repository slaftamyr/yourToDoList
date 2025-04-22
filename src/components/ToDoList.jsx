import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ToDo from "./ToDo";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Avatar from "@mui/material/Avatar";
import { purple } from "@mui/material/colors";
 
import { useState } from "react";
 import { todosContext } from "../contexts/todosContext";
 
import{v4 as uid } from "uuid";

export default function ToDoList() {
   const {tasks, setTasks} = React.useContext(todosContext);
  const [inputTitle, setInputTitle] = useState("");
  const [state, setState] = useState("all");
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  
  function all(){
    setState("all");
  }

  function completed(){
    setState("comp");
  }
  function notcompleted(){
    setState("notcomp");
  }
  const fillTasks = tasks.map((task) => {
    if (state == "all"){ return(<ToDo
      key={task.id}
      id={task.id}
      title={task.title}
      details={task.details}
      
      isCompleted={task.isCompleted}
    />)}else if(state =="comp"){
      if(task.isCompleted) return(<ToDo
        key={task.id}
        id={task.id}
        title={task.title}
        details={task.details}
        
        isCompleted={task.isCompleted}
      />) }else{
        if(!task.isCompleted ) return(<ToDo
          key={task.id}
          id={task.id}
          title={task.title}
          details={task.details}
          
          isCompleted={task.isCompleted}
        />)
      }
    
     
  });
  function handleAddClick() {
    const newTask = {
      id: uid(),
      title: inputTitle,
      details: formattedDate,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
    setInputTitle("");

  }
  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "rgba(173, 216, 230, 0.4)",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <h1>To-Do List</h1>
        <hr />
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Grid size={9}>
            <TextField
              id="outlined-basic"
              label="Add Task"
              variant="outlined"
              style={{ width: "100%" }}
              value={inputTitle}
              onChange={(e) => {
                setInputTitle(e.target.value);
              }}
            />
          </Grid>
          <Grid size={3}>
            <Avatar
              sx={{
                bgcolor: purple[900],
                transition: "transform 0.3s ease, box-shadow 0.5s ease",
                "&:hover": {
                  transform: "scale(0.9)",
                  boxShadow: "0 4px 5px black",
                },
              }}
            >
              <Button
                style={{ color: "white" }}
                onClick={() => {
                  handleAddClick();
                }}
              >
                <PlaylistAddIcon />
              </Button>
            </Avatar>
          </Grid>
        </Grid>
        <ButtonGroup
          variant="contained"
          aria-label="Basic button group"
          style={{ margin: "4px"  }}
        >
          <Button style={{  backgroundColor:state=="all"?"rgb(39, 37, 192)":"rgb(80, 19, 161)"}} onClick={all}>ALL</Button>
          <Button style={{  backgroundColor:state=="comp"?"rgb(39, 37, 192)":"rgb(80, 19, 161)"}} onClick={completed}>Completed</Button>
          <Button style={{  backgroundColor:state=="notcomp"?"rgb(39, 37, 192)":"rgb(80, 19, 161)"}} onClick={notcompleted}>NOT Completed</Button>
        </ButtonGroup>
        {fillTasks}
      </Container>
    </>
  );
}
