import React from 'react';
import { useStyles } from './RegisterNew.styles';

const RegisterNew = link => {
  const classes = useStyles();
  return (
    <div className={classes.description}>
      Don`t have an account?{' '}
      <a className={classes.link} href={link}>
        Sign up
      </a>
    </div>
  );
};

export default RegisterNew;
