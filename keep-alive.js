/**
 * Keep-Alive para Render (previne dormência)
 * Envia ping a cada 10 minutos para manter o servidor acordado
 */

const https = require('https');
const http = require('http');

function startKeepAlive() {
  // Sua URL será exibida após o deploy
  const APP_URL = process.env.RENDER_EXTERNAL_URL || 
                  process.env.RAILWAY_PUBLIC_DOMAIN || 
                  'http://localhost:3000';

  const protocol = APP_URL.startsWith('https') ? https : http;

  const ping = () => {
    const startTime = Date.now();
    
    protocol.get(`${APP_URL}/status`, (res) => {
      const duration = Date.now() - startTime;
      const timestamp = new Date().toLocaleTimeString('pt-BR');
      console.log(`[KEEP-ALIVE] ✅ ${timestamp} - Status: ${res.statusCode} (${duration}ms)`);
    }).on('error', (err) => {
      const timestamp = new Date().toLocaleTimeString('pt-BR');
      console.error(`[KEEP-ALIVE] ❌ ${timestamp} - Erro:`, err.message);
    });
  };

  // Primeiro ping após 5 minutos
  setTimeout(() => {
    console.log('[KEEP-ALIVE] 🔔 Iniciado - Ping a cada 10 minutos');
    ping();
  }, 5 * 60 * 1000);

  // Ping contínuo a cada 10 minutos
  setInterval(ping, 10 * 60 * 1000);
}

// Inicia se estiver em produção
if (process.env.NODE_ENV === 'production' && 
    (process.env.RENDER_SERVICE_NAME || process.env.RAILWAY_PUBLIC_DOMAIN)) {
  startKeepAlive();
}

module.exports = { startKeepAlive };
