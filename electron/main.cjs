const { app, BrowserWindow, session } = require('electron');
const fs = require('fs');
const http = require('http');
const path = require('path');
const { URL } = require('url');

const DESKTOP_PORT = Number(process.env.BEACON_DESKTOP_PORT || 5180);
const MAX_PORT_ATTEMPTS = 20;
let server;
let browserWindow;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function portIsAvailable(port) {
  return new Promise((resolve) => {
    const probe = http.createServer();
    probe.once('error', () => resolve(false));
    probe.once('listening', () => probe.close(() => resolve(true)));
    probe.listen(port, '127.0.0.1');
  });
}

async function findPort() {
  for (let offset = 0; offset < MAX_PORT_ATTEMPTS; offset += 1) {
    const candidate = DESKTOP_PORT + offset;
    if (await portIsAvailable(candidate)) return candidate;
  }
  throw new Error(`No available desktop port found between ${DESKTOP_PORT} and ${DESKTOP_PORT + MAX_PORT_ATTEMPTS - 1}`);
}

function startStaticServer(port) {
  const webRoot = path.join(app.getAppPath(), 'dist');
  server = http.createServer((request, response) => {
    try {
      const requestUrl = new URL(request.url, `http://127.0.0.1:${port}`);
      let requestPath = decodeURIComponent(requestUrl.pathname);
      if (requestPath === '/') requestPath = '/index.html';

      // Keep the packaged app local-only. Requests from a browser on another machine are not accepted.
      if (request.headers.host !== `127.0.0.1:${port}` && request.headers.host !== `localhost:${port}`) {
        response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Local desktop app only');
        return;
      }

      let filePath = path.normalize(path.join(webRoot, requestPath));
      if (!filePath.startsWith(webRoot)) {
        response.writeHead(400);
        response.end('Bad request');
        return;
      }

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) filePath = path.join(webRoot, 'index.html');
      const extension = path.extname(filePath).toLowerCase();
      response.setHeader('Content-Type', mimeTypes[extension] || 'application/octet-stream');
      response.setHeader('Cache-Control', extension === '.html' ? 'no-store' : 'public, max-age=31536000, immutable');
      fs.createReadStream(filePath).on('error', () => {
        response.writeHead(500);
        response.end('Unable to load application');
      }).pipe(response);
    } catch (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Unable to load application');
    }
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => resolve(port));
  });
}

async function createWindow() {
  const startUrl = process.env.ELECTRON_START_URL;
  let urlToLoad = startUrl;
  if (!urlToLoad) {
    const port = await findPort();
    await startStaticServer(port);
    urlToLoad = `http://127.0.0.1:${port}/`;
    console.log(`Beacon Boys desktop server listening on ${urlToLoad}`);
  }

  browserWindow = new BrowserWindow({
    width: 1440,
    height: 940,
    minWidth: 960,
    minHeight: 720,
    backgroundColor: '#f7f8f4',
    show: false,
    autoHideMenuBar: true,
    title: 'Beacon Boys · Event Check-in',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  browserWindow.once('ready-to-show', () => browserWindow.show());
  await browserWindow.loadURL(urlToLoad);
  browserWindow.on('closed', () => { browserWindow = null; });
}

app.whenReady().then(async () => {
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(permission === 'media' && webContents.getURL().startsWith('http://127.0.0.1'));
  });
  await createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
}).catch((error) => {
  console.error('Unable to start Beacon Boys desktop app:', error);
  app.quit();
});

app.on('window-all-closed', () => {
  if (server) server.close();
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (server) server.close();
});
