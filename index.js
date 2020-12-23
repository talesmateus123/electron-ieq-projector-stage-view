const { app, BrowserWindow, Menu } = require('electron')
const currentPlatform = require('os').platform()

Menu.setApplicationMenu(null)
const shortcutsConfig = require('./shortcutsConfig')
const Store = require('./store')

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 900, height: 300 },
    location: { x: 0, y: 0 }
  }
})

function createWindow () {
  let { width, height } = store.get('windowBounds')
  let { x, y } = store.get('location')
  console.log(x, y)
  const win = new BrowserWindow({
    width: width,
    height: height,
    x: x,
    y: y,
    frame: false,
    icon: currentPlatform === 'win32' ? 'assets/win/ieq-icon.ico' : currentPlatform === 'linux' ? 'assets/linux/ieq-icon.png' : 'assets/osx/ieq-icon.png',
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.on('resize', () => {
    let { width, height } = win.getBounds();
    // Now that we have them, save them using the `set` method.
    store.set('windowBounds', { width, height });
  })

  win.on('move', function() {
    let [ x, y ] = win.getPosition()
    store.set('location', { x, y });
  })

  win.loadFile('stage-view/index.html')
}

app.whenReady().then(() => {
  shortcutsConfig()
}).then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
