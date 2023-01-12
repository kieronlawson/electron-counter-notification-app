import { platform } from 'process';
import { BrowserWindow, Notification as ElectronNotification } from 'electron';

const toastXml = `
<toast scenario="alarm" activationType="protocol">
  <audio silent="true" />
  <visual>
    <binding template="ToastText02">
      <text id="1">Kieron Lawson</text>
      <text id="2">Call to your DDI: +64 9 888 0791</text>
    </binding>
  </visual>
  <actions>
    <action content="Decline" activationType="protocol" arguments="spoke:decline"/>
    <action content="Answer" activationType="protocol" arguments="spoke:answer" />
  </actions>
</toast>
`;

export const createCounterNotification = (mainWindow: BrowserWindow | null) => {
  if (platform === 'win32') {
    const notification = new ElectronNotification({
      toastXml,
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
