import { useState } from 'react';
import classes from './Counter.module.css';

export const Counter = () => {
  const [counter, setCounter] = useState(10);

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);

  /* Retrieves the called uri from Electron, parses and looks for the command to execute (Windows Implementation) */
  window.electron.ipcRenderer.on('handle-uri', (uri) => {
    const [protocol, path] = uri.split(':');
    const command = path.replace(/\//gi, '');
    if (command === 'countdown') {
      decrement();
    }

    if (command === 'countup') {
      increment();
    }
  });

  /* Receives message from Main Process when notification action button is clicked (macOS Implementation) */
  window.electron.ipcRenderer.on('count-down', () => {
    decrement();
  });

  window.electron.ipcRenderer.on('count-up', () => {
    increment();
  });

  const createNotification = () => {
    window.electron.ipcRenderer.sendMessage('create-notification', []);
  };

  return (
    <div className={classes.container}>
      <div className={classes.counter}>{counter}</div>
      <button
        type="button"
        className={classes.button}
        onClick={() => createNotification()}
      >
        Create notification
      </button>
    </div>
  );
};
