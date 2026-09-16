import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const publicDir = path.join(here, 'public');
const courseDir = path.join(root, 'french', 'current_course');
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 4174);

const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8' };

async function courseFiles() {
  const entries = await fs.readdir(courseDir, { withFileTypes: true });
  return entries.filter(e => e.isFile() && e.name.endsWith('.md')).map(e => ({
    id: e.name,
    name: e.name === 'README.md' ? 'Visão geral' : e.name.replace(/\.md$/, '').replaceAll('_', ' '),
  }));
}

function safeCoursePath(name) {
  const clean = path.basename(name);
  if (!clean.endsWith('.md')) throw new Error('invalid file');
  return path.join(courseDir, clean);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (url.pathname === '/api/course') {
      const files = await courseFiles();
      res.writeHead(200, { 'content-type': types['.json'] });
      return res.end(JSON.stringify({ language: 'Français', path: 'french/current_course', files }));
    }
    if (url.pathname === '/api/file') {
      const name = url.searchParams.get('name') || '';
      const content = await fs.readFile(safeCoursePath(name), 'utf8');
      res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
      return res.end(content);
    }
    if (url.pathname === '/api/search') {
      const q = (url.searchParams.get('q') || '').trim().toLowerCase();
      const results = [];
      if (q) for (const f of await courseFiles()) {
        const text = await fs.readFile(safeCoursePath(f.id), 'utf8');
        if (text.toLowerCase().includes(q)) results.push(f);
      }
      res.writeHead(200, { 'content-type': types['.json'] });
      return res.end(JSON.stringify(results));
    }

    let target = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
    target = path.basename(target);
    const file = path.join(publicDir, target);
    const data = await fs.readFile(file);
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Não encontrado');
  }
});

server.listen(port, host, () => console.log(`Mult Lang: http://${host}:${port}`));
