import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function aiProxyPlugin() {
  return {
    name: 'ai-proxy',
    configureServer(server) {
      const env = loadEnv('development', process.cwd(), '');

      // ── /api/chat — proxy Groq (ChatWidget) ───────────────────────────────
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
        let body = '';
        req.on('data', c => { body += c; });
        req.on('end', async () => {
          try {
            const payload = JSON.parse(body);
            const apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
            if (!apiKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'GROQ_API_KEY não encontrada no arquivo .env' }));
              return;
            }
            const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
              body: JSON.stringify(payload),
            });
            const data = await upstream.json();
            res.statusCode = upstream.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), aiProxyPlugin()],
  esbuild: { target: 'es2020' },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/__tests__/', '*.config.*'],
    },
  },
});
