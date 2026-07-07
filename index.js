const makeWASocket = require("@whiskeysockets/baileys").default;
const { useMultiFileAuthState, Browsers } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode");
const fs = require("fs");
const path = require("path");
const express = require("express");
require("dotenv").config();

// Keep-alive para servidores gratuitos (Render, etc)
if (process.env.NODE_ENV === 'production') {
  require('./keep-alive.js');
}

const app = express();
const PORT = process.env.PORT || 8080;

let sock = null;
let qrCodeUrl = null;

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const log = (msg) => {
  const timestamp = new Date().toLocaleTimeString("pt-BR");
  console.log(`[${timestamp}] ${msg}`);
};

// ============================================
// INICIA O BOT
// ============================================

async function startBot() {
  try {
    log("🤖 Iniciando bot...");

    const authDir = path.join(__dirname, "auth_info_baileys");
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState(authDir);

    sock = makeWASocket({
      auth: state,
      printQRInTerminal: true, // Mostra QR no terminal também
      browser: ["BotZap", "Chrome", "1.0.0"], // 👈 TROQUE AQUI: Identidade customizada
      markOnlineOnConnect: true,
      syncFullHistory: false,
      generateHighQualityLinkPreview: true,
      shouldSyncHistoryMessage: () => false,
      maxMsgsInMemory: 10,
    });

    // ============================================
    // EVENTOS DE CONEXÃO
    // ============================================

    sock.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        log("📱 Novo QR Code gerado!");
        qrCodeUrl = qr;

        // Salva como imagem também
        try {
          await qrcode.toFile(path.join(__dirname, "qr.png"), qr);
          log("✅ QR Code salvo em qr.png");
        } catch (err) {
          log(`⚠️ Erro ao salvar QR: ${err.message}`);
        }
      }

      if (connection === "open") {
        log("✅ Bot CONECTADO com sucesso!");
        qrCodeUrl = null; // Limpa o QR após conectar
      } else if (connection === "close") {
        const reason = lastDisconnect?.error?.output?.statusCode;
        log(`❌ Desconectado! Código: ${reason}`);

        // Reconecta automaticamente (exceto se for logout)
        if (reason !== 401) {
          log("🔄 Tentando reconectar em 5 segundos...");
          await delay(5000);
          startBot();
        } else {
          log("❌ Sessão expirada. Delete a pasta 'auth_info_baileys' e escaneie o QR novamente.");
        }
      }
    });

    // ============================================
    // RECEBE MENSAGENS
    // ============================================

    sock.ev.on("messages.upsert", async (m) => {
      const message = m.messages[0];

      // Ignora mensagens do próprio bot
      if (message.key.fromMe) return;
      if (!message.message) return;

      // Extrai texto da mensagem
      const text = message.message.conversation || message.message.extendedTextMessage?.text || "";
      const from = message.key.remoteJid;
      const sender = message.key.participant || from;

      log(`📨 Mensagem de ${sender}: ${text}`);

      // ============================================
      // PROCESSAMENTO DE COMANDOS
      // ============================================

      try {
        // Se começar com /comando, processa como comando
        if (text.startsWith("/")) {
          const { processCommand } = require("./commands");
          await processCommand(sock, from, text.substring(1));
        }
        // Se for só o nome do comando sem barra, também processa
        else if (text && text.trim()) {
          const { processCommand } = require("./commands");
          await processCommand(sock, from, text.trim());
        }
      } catch (error) {
        log(`❌ Erro ao processar comando: ${error.message}`);
      }
    });

    // ============================================
    // SALVA CREDENCIAIS
    // ============================================

    sock.ev.on("creds.update", saveCreds);

    // ============================================
    // TRATA DESCONEXÕES
    // ============================================

    sock.ev.on("connection.update", ({ connection }) => {
      if (connection === "open") {
        log("✨ Bot pronto para receber mensagens!");
      }
    });
  } catch (error) {
    log(`❌ Erro ao iniciar bot: ${error.message}`);
    setTimeout(() => startBot(), 10000);
  }
}

// ============================================
// ROTAS EXPRESS (PARA MONITORAMENTO)
// ============================================

app.get("/", (req, res) => {
  res.json({
    status: sock ? "online" : "offline",
    message: "Bot WhatsApp rodando 24h",
  });
});

app.get("/status", (req, res) => {
  res.json({
    status: sock?.user ? "conectado" : "desconectado",
    numero: sock?.user?.id || "não informado",
    timestamp: new Date().toISOString(),
  });
});

app.get("/qr", (req, res) => {
  if (!qrCodeUrl) {
    return res.json({
      qr: null,
      message: "Bot já está conectado ou QR expirado",
    });
  }

  res.json({
    qr: qrCodeUrl,
    message: "Escaneie este QR com seu WhatsApp",
  });
});

app.listen(PORT, '0.0.0.0', () => {
  log(`🌐 Servidor rodando na porta ${PORT} (0.0.0.0)`);
  startBot();
});

// ============================================
// TRATA ERROS NÃO CAPTURADOS
// ============================================

process.on("uncaughtException", (error) => {
  log(`💥 Erro não tratado: ${error.message}`);
});

process.on("unhandledRejection", (reason) => {
  log(`⚠️ Promise rejeitada: ${reason}`);
});
