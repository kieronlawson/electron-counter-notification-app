import { platform } from 'process';
import { BrowserWindow, Notification as ElectronNotification } from 'electron';

export const createCounterNotification = (mainWindow: BrowserWindow | null) => {
  if (platform === 'win32') {
    const notification = new ElectronNotification({
      toastXml: `<toast>
      <visual>
      <binding template="ToastText02">
      <text id="1">The counter needs to be updated</text>
      <text id="2">You can count down or up.</text>
      </binding>
      </visual>
      <actions>
      <action content="Count up" activationType="protocol" arguments="myapp://countup" />
      <action content="Count down" activationType="protocol" arguments="myapp://countdown" />
      </actions>
      </toast>`,
    });

    notification.show();

    return notification;
  }

  const notification = new ElectronNotification({
    title: 'The counter needs to be updated',
    body: 'You can count down or up. Your decision.',
    actions: [
      {
        type: 'button',
        text: 'Count down',
      },
      {
        type: 'button',
        text: 'Count up',
      },
    ],
  });

  notification.on('action', (_, index) => {
    if (index === 0) {
      // count down button is first element in actions array
      if (mainWindow) {
        mainWindow.webContents.send('count-down');
      }
    }
    if (index === 1) {
      // count up button is second element in actions array
      if (mainWindow) {
        mainWindow.webContents.send('count-up');
      }
    }
  });

  notification.show();

  return notification;
};
