/**
 * Sistema de Comandos para o Bot WhatsApp
 * Adicione novos comandos aqui e eles serão automaticamente carregados
 */

const commands = {
  // ============================================
  // COMANDOS BÁSICOS
  // ============================================

  olá: {
    description: "Saudação do bot",
    execute: async (sock, from, args) => {
      await sock.sendMessage(from, {
        text: "Olá! 👋 Como posso te ajudar?",
      });
    },
  },

  oi: {
    description: "Alias para 'olá'",
    execute: async (sock, from, args) => {
      await sock.sendMessage(from, {
        text: "E aí! 😊 Tudo bem?",
      });
    },
  },

  ping: {
    description: "Testa se o bot está online",
    execute: async (sock, from, args) => {
      const uptime = process.uptime();
      const uptimeText = formatUptime(uptime);
      
      await sock.sendMessage(from, {
        text: `🏓 Pong!\n⏱️ Uptime: ${uptimeText}`,
      });
    },
  },

  help: {
    description: "Mostra todos os comandos disponíveis",
    execute: async (sock, from, args) => {
      let helpText = "📋 *Comandos Disponíveis:*\n\n";
      
      for (const [cmd, data] of Object.entries(commands)) {
        helpText += `*/${cmd}* - ${data.description}\n`;
      }

      helpText += "\n💡 Digite o comando sem a barra para usar";
      
      await sock.sendMessage(from, {
        text: helpText,
      });
    },
  },

  // ============================================
  // COMANDOS COM PARÂMETROS
  // ============================================

  echo: {
    description: "Repete o que você digita",
    execute: async (sock, from, args) => {
      const texto = args.join(" ");
      
      if (!texto) {
        await sock.sendMessage(from, {
          text: "⚠️ Você precisa digitar algo!\nExemplo: echo olá mundo",
        });
        return;
      }

      await sock.sendMessage(from, {
        text: `🔊 ${texto}`,
      });
    },
  },

  calc: {
    description: "Calcula uma expressão (ex: calc 2+2*5)",
    execute: async (sock, from, args) => {
      const expressao = args.join("");
      
      try {
        // Validação básica de segurança
        if (!/^[\d+\-*/().]+$/.test(expressao)) {
          throw new Error("Expressão inválida");
        }

        const resultado = eval(expressao);
        await sock.sendMessage(from, {
          text: `🧮 ${expressao} = ${resultado}`,
        });
      } catch (error) {
        await sock.sendMessage(from, {
          text: `❌ Erro: ${error.message}\nExemplo: calc 10*5+2`,
        });
      }
    },
  },

  hora: {
    description: "Mostra a hora atual",
    execute: async (sock, from, args) => {
      const agora = new Date();
      const hora = agora.toLocaleTimeString("pt-BR");
      const data = agora.toLocaleDateString("pt-BR");
      
      await sock.sendMessage(from, {
        text: `🕐 ${hora}\n📅 ${data}`,
      });
    },
  },

  // ============================================
  // COMANDOS DE INFO
  // ============================================

  info: {
    description: "Informações sobre o bot",
    execute: async (sock, from, args) => {
      const uptime = process.uptime();
      const uptimeText = formatUptime(uptime);
      const user = sock?.user?.name || "Bot WhatsApp";
      
      await sock.sendMessage(from, {
        text: `ℹ️ *Informações do Bot*\n\n` +
              `👤 Nome: ${user}\n` +
              `⏱️ Uptime: ${uptimeText}\n` +
              `📍 Versão: 1.0.0\n` +
              `🚀 Status: Online`,
      });
    },
  },

  // ============================================
  // COMANDOS DE TESTE
  // ============================================

  sticker: {
    description: "Teste para enviar figurinha",
    execute: async (sock, from, args) => {
      await sock.sendMessage(from, {
        text: "🎨 Comando de figurinha (implemente conforme necessário)",
      });
    },
  },

  menu: {
    description: "Mostra menu interativo",
    execute: async (sock, from, args) => {
      const menu = `
╔════════════════════════════╗
║  *🤖 MENU DO BOT* ║
╚════════════════════════════╝

📍 *Categoria 1*
• Comando 1
• Comando 2

📍 *Categoria 2*
• Comando 3
• Comando 4

👉 Digite *help* para ver todos os comandos
      `;
      
      await sock.sendMessage(from, {
        text: menu,
      });
    },
  },
};

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

function formatUptime(seconds) {
  const dias = Math.floor(seconds / 86400);
  const horas = Math.floor((seconds % 86400) / 3600);
  const minutos = Math.floor((seconds % 3600) / 60);

  let resultado = "";
  if (dias > 0) resultado += `${dias}d `;
  if (horas > 0) resultado += `${horas}h `;
  if (minutos > 0) resultado += `${minutos}m`;

  return resultado || "menos de 1 minuto";
}

// ============================================
// PROCESSADOR DE COMANDOS
// ============================================

async function processCommand(sock, from, text) {
  // Remove espaços extras e converte para lowercase
  const parts = text.trim().toLowerCase().split(/\s+/);
  const comando = parts[0];
  const args = parts.slice(1);

  // Verifica se o comando existe
  if (commands[comando]) {
    try {
      await commands[comando].execute(sock, from, args);
    } catch (error) {
      console.error(`Erro ao executar comando '${comando}':`, error);
      await sock.sendMessage(from, {
        text: `❌ Erro ao executar comando: ${error.message}`,
      });
    }
  } else if (comando && comando !== "") {
    // Comando não encontrado
    await sock.sendMessage(from, {
      text: `❓ Comando não encontrado: *${comando}*\nDigite *help* para ver os comandos disponíveis`,
    });
  }
}

module.exports = { commands, processCommand, formatUptime };
