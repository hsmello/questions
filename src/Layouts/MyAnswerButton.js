import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function MyAnswerButton({name, handleButtonClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Button 
            variant="contained"
            onClick={()=>{handleButtonClick()}}    
            
        >
        
            {name}            
        </Button>
      {/* <Button variant="contained">Answer 2</Button>
      <Button variant="contained">Answer 3</Button>
      <Button variant="contained">Answer 4</Button> */}
    </div>
  );
}

export default MyAnswerButton