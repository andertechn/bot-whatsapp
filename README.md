# 🤖 Bot WhatsApp 24h - Servidor Gratuito

Um bot do WhatsApp que funciona 24 horas por dia em um servidor na nuvem **completamente grátis**!

## ✨ Características

- ✅ Funciona 24h sem deixar seu PC ligado
- ✅ Hospedagem 100% gratuita
- ✅ Reconexão automática
- ✅ Sistema de comandos extensível
- ✅ Suporte a variáveis de ambiente
- ✅ Logs em tempo real

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta GitHub (grátis)
- Conta em uma plataforma de hospedagem (Railway/Render - grátis)
- WhatsApp ativo

## 🚀 Quick Start Local

### 1. Instalação

```bash
# Clone ou download este projeto
cd bot-whatsapp

# Instale as dependências
npm install
```

### 2. Execute localmente

```bash
npm start
```

Você verá um QR Code no terminal. Escaneie com seu WhatsApp.

### 3. Teste os comandos

Envie qualquer mensagem no WhatsApp para a conta conectada:
- `olá` - Saudação
- `ping` - Testa se está online
- `help` - Lista todos os comandos
- `info` - Informações do bot
- `hora` - Mostra a hora atual
- `calc 2+2` - Calcula expressões

## 📱 Como Adicionar Novos Comandos

Edite o arquivo `commands.js`:

```javascript
help: {
  description: "Mostra ajuda",
  execute: async (sock, from, args) => {
    await sock.sendMessage(from, {
      text: "Sua resposta aqui"
    });
  }
}
```

## ☁️ Deploy na Nuvem (GRÁTIS)

### Opção 1: Railway (Recomendado)

1. **Prepare seu código:**
```bash
git init
git add .
git commit -m "Bot inicial"
git remote add origin https://github.com/SEU_USER/bot-whatsapp.git
git push -u origin main
```

2. **Acesse:** https://railway.app
3. **Clique em:** "Start a New Project" → "Deploy from GitHub"
4. **Selecione** seu repositório
5. **Pronto!** Seu bot estará rodando em alguns minutos

**Custo:** $5 crédito gratuito por mês (suficiente para rodar 24h)

### Opção 2: Render

1. **Mesmo processo de Git** (veja acima)
2. **Acesse:** https://render.com
3. **Novo Web Service** → GitHub
4. **Selecione** seu repositório
5. **Plan:** Free
6. **Deploy**

**Custo:** Completamente gratuito (mas dorme após 15 min de inatividade)

⚠️ **Se usar Render:** O arquivo `keep-alive.js` já está configurado para mantê-lo acordado!

## 📊 Estrutura do Projeto

```
bot-whatsapp/
├── index.js              # Arquivo principal
├── commands.js           # Sistema de comandos
├── keep-alive.js         # Mantém bot acordado
├── package.json          # Dependências
├── Procfile             # Config para deploy
├── .env                 # Variáveis de ambiente
├── .gitignore           # Arquivos ignorados no Git
└── DEPLOY_GUIDE.md      # Guia detalhado de deploy
```

## 🔧 Variáveis de Ambiente

No arquivo `.env`:
```
PORT=3000
NODE_ENV=production
```

## 🌐 Endpoints da API

Seu bot funcionará como servidor HTTP:

### GET /
```
Retorna status básico
```

### GET /status
```json
{
  "status": "conectado",
  "numero": "seu_numero_whatsapp",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### GET /qr
```json
{
  "qr": "data:image/png;base64,...",
  "message": "Escaneie este QR com seu WhatsApp"
}
```

## 🐛 Solução de Problemas

### Bot desconecta frequentemente
- Use Railway em vez de Render
- Verifique sua internet
- Confira os logs na plataforma

### "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
git add .
git commit -m "Fix"
git push
```

### QR Code expirado
- Acesse `/qr` novamente
- Se não funcionar, delete a pasta `auth_info_baileys`

### Servidor dorme no Render
- Está normal! `keep-alive.js` vai acordar a cada 10 min

## 📝 Exemplo: Adicionar Comando Personalizado

```javascript
// Em commands.js, adicione:

saudacao: {
  description: "Saudação personalizada",
  execute: async (sock, from, args) => {
    const nome = args.join(" ") || "Visitante";
    
    await sock.sendMessage(from, {
      text: `Bem-vindo, ${nome}! 🎉`
    });
  }
}

// Agora use: "saudacao João Silva"
```

## 🔐 Segurança

- Nunca compartilhe seu `.env`
- Nunca commit `auth_info_baileys` (já está em `.gitignore`)
- Use senhas fortes no GitHub

## 📞 Suporte

Se tiver problemas:

1. Verifique os **logs** na plataforma de deploy
2. Confira se está usando **Node.js 18+**
3. Tente executar localmente antes de fazer deploy

## 📄 Licença

MIT

## 🌟 Dicas

- Customize os comandos conforme precisar
- Adicione mais funcionalidades em `commands.js`
- Teste localmente antes de fazer deploy
- Mantenha o repositório GitHub privado se tiver dados sensíveis

---

**Dúvidas?** Veja `DEPLOY_GUIDE.md` para um guia mais detalhado! 🚀

Feito com ❤️ para rodar 24h grátis
