const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 4173);
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }

  let requestPath;
  try {
    requestPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  if (requestPath === '/') requestPath = '/index.html';

  const filePath = path.resolve(root, `.${requestPath}`);
  const relativePath = path.relative(root, filePath);
  const restrictedPath = relativePath.split(path.sep).some((part) =>
    ['.git', '.vscode', 'node_modules'].includes(part.toLowerCase())
  );

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath) || restrictedPath) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(error.code === 'ENOENT' ? 404 : 500);
      response.end(error.code === 'ENOENT' ? 'Not found' : 'Unable to read requested file');
      return;
    }

    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  });
});

console.log('Portfolio server starting...');
server.listen(port, '127.0.0.1', () => {
  console.log(`Portfolio server listening at http://127.0.0.1:${port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    const probe = http.get(`http://127.0.0.1:${port}`, (response) => {
      let html = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        html += chunk;
      });
      response.on('end', () => {
        if (response.statusCode === 200 && html.includes('<title>Kent Jorsh Turno | Developer Portfolio</title>')) {
          console.log(`Portfolio server already running at http://127.0.0.1:${port}`);
          return;
        }

        console.error(`Portfolio server failed to start: port ${port} is already in use by another service`);
        process.exitCode = 1;
      });
    });
    probe.on('error', () => {
      console.error(`Portfolio server failed to start: ${error.message}`);
      process.exitCode = 1;
    });
    return;
  }

  console.error(`Portfolio server failed to start: ${error.message}`);
  process.exitCode = 1;
});
