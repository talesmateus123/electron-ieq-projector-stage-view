const { BrowserWindow, globalShortcut } = require('electron')

function closeWindow() {
	const focusedWindow = BrowserWindow.getFocusedWindow()
	if (focusedWindow)
		focusedWindow.close()
}
function register() {
    globalShortcut.register('f5', function() {
		const focusedWindow = BrowserWindow.getFocusedWindow()
		if (focusedWindow)
			BrowserWindow.getFocusedWindow().reload()
	})
	globalShortcut.register('CommandOrControl+R', function() {
		const focusedWindow = BrowserWindow.getFocusedWindow()
		if (focusedWindow)
			BrowserWindow.getFocusedWindow().reload()
	})
	globalShortcut.register('CommandOrControl+=', function() {
		const focusedWindow = BrowserWindow.getFocusedWindow()
		if(focusedWindow) {
			const webFrame = focusedWindow.webContents
			webFrame.getZoomFactor() < 2.0 && webFrame.setZoomFactor(webFrame.getZoomFactor() + 0.1)
		}
	})
	globalShortcut.register('CommandOrControl+-', function() {
		const focusedWindow = BrowserWindow.getFocusedWindow()
		if(focusedWindow) {
			const webFrame = focusedWindow.webContents
			webFrame.getZoomFactor() > 0.2 && webFrame.setZoomFactor(webFrame.getZoomFactor() - 0.1)
		}
	})
	globalShortcut.register('CommandOrControl+W', function() {
		closeWindow()
	})
	globalShortcut.register('Esc', function() {
		closeWindow()
	})
}

module.exports = register