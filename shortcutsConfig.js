const { BrowserWindow, globalShortcut } = require('electron')

function register() {
    globalShortcut.register('f5', function() {
		BrowserWindow.getFocusedWindow().reload()
	})
	globalShortcut.register('CommandOrControl+R', function() {
		BrowserWindow.getFocusedWindow().reload()
	})
}

module.exports = register