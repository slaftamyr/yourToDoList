import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
 
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { green, pink } from '@mui/material/colors';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Avatar from '@mui/material/Avatar';
import { todosContext } from "../contexts/todosContext";
import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 



export default function ToDoList({id ,title,details,isCompleted }) {
       const {tasks, setTasks} = React.useContext(todosContext)
 function  completed(){
  const updated = tasks.map((t) => {
    if(t.id ==  id) { t.isCompleted = !t.isCompleted}
    return t ;
  });
  setTasks(updated);
 }
  
 const [openDele, setOpenDele] = React.useState(false);

 const handleClickOpenDele = () => {
   setOpenDele(true);
 };

 const handleClose = () => {
   setOpenDele(false);
 };
  const handleCloseAndDele = () => {
     const updatedbyDele = tasks.filter((t) => {
    if(t.id ==  id) {return false ;}
     return true;
  });
  setTasks(updatedbyDele);
    setOpenDele(false);
  };

  const [editedTitle, setEditedTitle] =  React.useState(title);

  const [openEdit, setOpenEdit] = React.useState(false);

 const handleClickOpenEdit = () => {
   setOpenEdit(true);
 };

 const handleCloseEdit = () => {
   setOpenEdit(false);
 };
 const today = new Date();
 const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
 
  const handleCloseAndEdit = () => {
    const updatedbyEdit = tasks.map((t) => {
      if(t.id ==  id) { 
        if(t.title != editedTitle)t.details= formattedDate+"(Edited)";
        t.title = editedTitle;
        
      } 
    return t;});
    setTasks(updatedbyEdit);
    setOpenEdit(false);
  };



  return (
    <>
     <Dialog
        open={openDele}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Do you want to delete ({title}) task?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
      Be careful!.. if you click YES you can't undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose }>NO</Button>
          <Button onClick={handleCloseAndDele}>YES</Button>
        </DialogActions>
      </Dialog>
      

      <Dialog
        open={openEdit}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle> Editing ({title}) task</DialogTitle>
        <DialogContent>
            <TextField
                         id="outlined-basic"
                         label="Edit"
                         variant="outlined"
                         style={{ width: "100%" }}
                         value={editedTitle}
                         onChange={(e) => {
                           setEditedTitle(e.target.value);
                         }}
                       />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit }>NO</Button>
          <Button onClick={handleCloseAndEdit}>YES</Button>
        </DialogActions>
      </Dialog>
      


        <Card variant="outlined" style={{ marginTop: "10px", backgroundColor: "rgb(100, 100, 143)" ,width:"100%"}}>
            <CardContent>
            <Grid container spacing={2}>
            <Grid size={6}>
        <Typography variant="h5" component="div">
          { title}
        </Typography>
        <Typography variant="h7" component="div">
          {details}
        </Typography>
        </Grid>
        <Grid size={6} style={{  display:"flex" ,justifyContent: "space-between" , padding:"3px" }}>
          
        <Avatar sx={{  bgcolor:isCompleted? green[700]: green[200], transition: 'transform 0.3s ease, box-shadow 0.5s ease',
           '&:hover': {
             transform: 'scale(0.9)',
             boxShadow: '0 4px 5px black'} }}>
   <Button style={{color:"white"}} onClick={()=>{
    completed();
   }}><TaskAltIcon /></Button>
</Avatar>
        <Avatar sx={{   transition: 'transform 0.3s ease, box-shadow 0.5s ease',
           '&:hover': {
             transform: 'scale(0.9)',
             boxShadow: '0 4px 5px black'} }}>
  <Button onClick={ ()=>{handleClickOpenEdit()}}><EditIcon /></Button> 
</Avatar>
 
<Avatar sx={{ bgcolor: pink[500] , transition: 'transform 0.3s ease, box-shadow 0.5s ease',
           '&:hover': {
             transform: 'scale(0.9)',
             boxShadow: '0 4px 5px black'} }}>
<Button  style={{color:"white"}}  onClick={()=>{
  handleClickOpenDele();
}}><DeleteForeverIcon /> </Button> 
</Avatar>
        </Grid>
        
      </Grid>

        
         
      </CardContent>
     </Card>
    </>
  );
}