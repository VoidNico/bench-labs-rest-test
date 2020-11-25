import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Theme, makeStyles, Snackbar, Slide } from '@material-ui/core';
import Alert, { Color } from '@material-ui/lab/Alert';
import { TableContent } from './Table';

function SlideTransition(props: any) {
  return <Slide {...props} direction="up" />;
}

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    bottom: 0,
    padding: theme.spacing(4),
  },
}));

const get = (page: number) => axios.get(`https://resttest.bench.co/transactions/${page}.json`);

export const Body = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [message, setMessage] = useState(undefined as undefined | { severity: Color, text: string });

  /**
   * Fetch data.
   */
  const fetch = useCallback(async () => {
    // query the first response for the total count
    let response = await get(1);
    const total = response?.data?.totalCount;
    let list = response?.data?.transactions;
    
    if (!total || Number.isNaN(total) || !list) {
      return;
    }

    // query rest of the requests
    for (let i = 2; list.length < total; i ++) {
      response = await get(i);
      list = [...list, ...(response?.data?.transactions || [])];
    }

    setData(list);
    setMessage({ severity: 'success', text: 'Data loaded successfully.' });
  }, []);

  useEffect(() => {
    try {
      fetch();
    } catch (error) {
      console.error(error);
      setMessage({ severity: 'error', text: JSON.stringify(error) });
    }
  }, [fetch]);

  return (
    <>
      <div className={classes.body}>
        <TableContent data={data} />
      </div>

      <Snackbar
        open={!!message}
        autoHideDuration={5000}
        TransitionComponent={SlideTransition}
        onClose={() => setMessage(undefined)}
      >
        <Alert severity={message?.severity}>{message?.text}</Alert>
      </Snackbar>
    </>
  );
};
