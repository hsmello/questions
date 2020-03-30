import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, red, grey, blue } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: grey[600],
    '&:hover': {
      backgroundColor: grey[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: "350px",
    height: "80px",
    display: 'inline',
  },
  isGreen: {
    "&:disabled": {
        backgroundColor: green[300]
    }
  },
  isRed: {
    "&:disabled": {
        backgroundColor: red[300]
    }
  }
}));

export default function CustomizedButtons(props) {
  const classes = useStyles();

  function getButtonClasses() {
      let buttonClasses = [classes.margin];
      if (props.isGreen) {
          buttonClasses.push(classes.isGreen)
      }
      if (props.isRed) {
          buttonClasses.push(classes.isRed)
      }
      return buttonClasses.join(" ")
  }

  return (
    <div>
      <ColorButton 
        variant="contained" 
        color='primary'
        disabled={props.disabled}
        className={getButtonClasses()}
        onClick={()=>{props.handleButtonClick()}}>
            {props.name}
      </ColorButton>
    </div>
  );
}
