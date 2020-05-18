const { app, BrowserWindow, shell, session, ipcMain } = require("electron");

const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 650,
    maximizable: false,
    center: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  mainWindow.webContents.on(
    "new-window",
    (event, url, type, disposition, options) => {
      event.preventDefault();
      if (type === "pdf") {
        shell.openExternal(url);
      }
      if (type === "cookie") {
        Object.assign(options, {
          modal: true,
          parent: mainWindow,
          width: 600,
          height: 800,
        });
        let win = new BrowserWindow(options);
        win.loadURL(url);
      }
    }
  );
}
async function getCookie() {
  let result = await session.defaultSession.cookies
    .get({ url: "https://www.ludopedia.com.br" })
    .then((cookies) => cookies)
    .catch((error) => error);
  return result;
}
ipcMain.on("set-cookie", async (event, arg) => {
  let result = await getCookie();
  event.returnValue = result;
});

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
