import React from 'react';
import { Theme, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: theme.palette.primary.main,
    '& p': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      color: 'white',
      transform: 'translate(-50%, -50%)',
    },
  },
}));

export const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <Typography variant="body1">Bench Test</Typography>
    </div>
  );
};
