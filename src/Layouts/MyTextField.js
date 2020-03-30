import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function MyTextField(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} noValidate autoComplete="off">
      <TextField 
        id="outlined-basic" 
        label="Outlined" 
        variant="outlined"
        onChange={(event)=>{props.onChange(event)}}
        />
    </div>
  );
}