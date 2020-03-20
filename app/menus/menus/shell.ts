import {BrowserWindow, MenuItemConstructorOptions} from 'electron';

export default (
  commandKeys: Record<string, string>,
  execCommand: (command: string, focusedWindow?: BrowserWindow) => void
): MenuItemConstructorOptions => {
  const isMac = process.platform === 'darwin';

  return {
    label: isMac ? 'Shell' : 'File',
    submenu: [
      {
        label: 'New Tab',
        accelerator: commandKeys['tab:new'],
        click(item, focusedWindow) {
          execCommand('tab:new', focusedWindow);
        }
      },
      {
        label: 'New Tab SSH',
        click(item, focusedWindow) {
          execCommand('tab:newSsh', focusedWindow);
        }
      },
      {
        label: 'New Window',
        accelerator: commandKeys['window:new'],
        click(item, focusedWindow) {
          execCommand('window:new', focusedWindow);
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Split Down',
        accelerator: commandKeys['pane:splitDown'],
        click(item, focusedWindow) {
          execCommand('pane:splitDown', focusedWindow);
        }
      },
      {
        label: 'Split Right',
        accelerator: commandKeys['pane:splitRight'],
        click(item, focusedWindow) {
          execCommand('pane:splitRight', focusedWindow);
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Start Log',
        accelerator: commandKeys['session:startLog'],
        click(item, focusedWindow) {
          execCommand('session:startLog', focusedWindow);
        }
      },
      {
        label: 'Stop Log',
        accelerator: commandKeys['session:stopLog'],
        click(item, focusedWindow) {
          execCommand('session:stopLog', focusedWindow);
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Close',
        accelerator: commandKeys['pane:close'],
        click(item, focusedWindow) {
          execCommand('pane:close', focusedWindow);
        }
      },
      {
        label: isMac ? 'Close Window' : 'Quit',
        role: 'close',
        accelerator: commandKeys['window:close']
      }
    ]
  };
};
