const {app, BrowserWindow, shell} = require("electron");

const path = require("path");
const url = require("url");

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        maximizable: false,
        center: true,        
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
        }    
    });
    
    mainWindow.setMenuBarVisibility(false);

    mainWindow.loadURL("http://localhost:3000");

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function(){
        mainWindow = null;
    });    
    
    mainWindow.webContents.on(
      "new-window",
      (event, url) => {
          event.preventDefault();
        shell.openExternal(url);
      }
    );
}

app.on('ready', createWindow);

app.on('window-all-closed', function(){
    if(process.platform !== "darwin"){
        app.quit();
    }
});

app.on("activate", function(){
    if(mainWindow === null){
        createWindow();
    }
})