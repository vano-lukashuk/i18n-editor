"use strict";
import updateElectronApp from 'update-electron-app'
import {app, BrowserWindow, protocol, ipcMain} from 'electron'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'

const isDevelopment = process.env.NODE_ENV !== 'production';

updateElectronApp()
protocol.registerSchemesAsPrivileged([
  {scheme: "app", privileges: {secure: true, standard: true}}
]);

function createWindow() {
  let window = new BrowserWindow({
    width: 1800,
    height: 1100,
    center: true,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  // console.log(process.env);
  window.loadURL(`http://${process.env.Host || 'localhost'}:${process.env.PORT  || '8080'}/`);
  // window.loadURL('https://github.com/');
  window.webContents.openDevTools()

}

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  createWindow();
})

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  }
  else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
