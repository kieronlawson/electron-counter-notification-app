import { useState } from 'react';
import classes from './Counter.module.css';

export const Counter = () => {
  const [lastMessage, setLastMessage] = useState('none');

  /* Retrieves the called uri from Electron, parses and looks for the command to execute (Windows Implementation) */
  window.electron.ipcRenderer.on('handle-uri', (uri) => {
    const [protocol, path] = uri.split(':');
    const command = path.replace(/\//gi, '');
    setLastMessage(command);
  });

  const createNotification = () => {
    window.electron.ipcRenderer.sendMessage('create-notification', []);
  };

  return (
    <div className={classes.container}>
      <div className={classes.counter}>{lastMessage}</div>
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
