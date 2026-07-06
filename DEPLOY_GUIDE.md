# 🚀 Guia: Hospedar Bot WhatsApp 24h GRÁTIS

## 📊 Comparação de Servidores Gratuitos

| Plataforma | Preço | Limite | Reconexão | Melhor Para |
|-----------|-------|--------|-----------|------------|
| **Railway** | $5/mês grátis | 5$ crédito | ✅ Automática | Iniciantes |
| **Render** | Genuinamente FREE | Dorme se inativo | ⚠️ Manual | Bots com ping |
| **Replit** | Gratuito | Dorme após 1h | ⚠️ Manual | Testes |
| **Fly.io** | $5/mês crédito | Limitado | ✅ Boa | Produção |

---

## ✅ OPÇÃO 1: RAILWAY (RECOMENDADO - MELHOR SUPORTE)

### ⚠️ Importante: Crédito Gratuito
- Railway oferece **$5 de crédito por mês** automaticamente
- Suficiente para rodar 1-2 bots 24h/mês
- Após acabar, você escolhe continuar pagando ou não

### Passo 1️⃣: Preparar seu código

```bash
# 1. Crie um repositório Git
git init
git add .
git commit -m "Bot inicial"

# 2. Crie conta no GitHub
# https://github.com/signup

# 3. Faça push para GitHub
git remote add origin https://github.com/SEU_USUARIO/bot-whatsapp.git
git branch -M main
git push -u origin main
```

### Passo 2️⃣: Deploy no Railway

1. Acesse: https://railway.app
2. Clique em **"Start a New Project"**
3. Selecione **"Deploy from GitHub"**
4. Conecte sua conta GitHub
5. Selecione o repositório `bot-whatsapp`
6. Railway detecta automaticamente que é Node.js
7. Aguarde o deploy (2-3 minutos)

### Passo 3️⃣: Configurar Variáveis de Ambiente

No painel do Railway:
1. Vá para **Variables**
2. Adicione:
   ```
   NODE_ENV=production
   ```

### Passo 4️⃣: Verificar se está rodando

```bash
# Seu bot estará em:
https://seu-projeto-railway.up.railway.app

# Teste com:
curl https://seu-projeto-railway.up.railway.app/status
```

**Logs:**
- Vá em **Deployments** → veja os logs em tempo real
- Se der erro, aparece aqui

---

## ✅ OPÇÃO 2: RENDER (GENUINAMENTE GRATUITO)

### ⚠️ Limitação Importante
- Servidores gratuitos **dormem após 15 min de inatividade**
- Solução: Configure um **ping automático** (vejo abaixo)

### Passo 1️⃣: Deploy no Render

1. Acesse: https://render.com
2. Clique em **"New +"** → **"Web Service"**
3. Conecte GitHub (mesma forma que Railway)
4. Configure:
   - **Name:** `bot-whatsapp`
   - **Runtime:** `Node`
   - **Build:** `npm install`
   - **Start:** `node index.js`
   - **Plan:** Selecione **"Free"**
5. Clique em **"Deploy"**

### Passo 2️⃣: Manter o bot acordado

Como o Render dorme, use um **ping automático**:

**Crie `keep-alive.js`:**

```javascript
const https = require('https');

function ping() {
  const url = process.env.RENDER_EXTERNAL_URL || 'https://seu-dominio.onrender.com';
  
  https.get(url, (res) => {
    console.log(`[PING] Status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`[PING ERROR]`, err.message);
  });
}

// Faz ping a cada 10 minutos
setInterval(ping, 10 * 60 * 1000);
console.log('🔔 Keep-alive ativado');
```

**Adicione ao `index.js`:**

```javascript
// Adicione no topo, após os requires
if (process.env.NODE_ENV === 'production') {
  require('./keep-alive.js');
}
```

---

## ✅ OPÇÃO 3: FLY.IO (BOA ALTERNATIVA)

### Crédito Gratuito
- $5/mês automaticamente
- Melhor performance que Railway

### Deploy rápido:

```bash
# 1. Instale flyctl
# https://fly.io/docs/getting-started/installing-flyctl/

# 2. Login
flyctl auth login

# 3. Crie aplicação
flyctl launch

# 4. Deploy
flyctl deploy
```

---

## 🔧 CHECKLIST FINAL

- [ ] `package.json` atualizado
- [ ] `index.js` funcionando localmente (`npm start`)
- [ ] `.env` com variáveis necessárias
- [ ] `Procfile` criado
- [ ] `.gitignore` criado
- [ ] Código no GitHub
- [ ] Deploy no servidor escolhido
- [ ] Testado com `/status` endpoint

---

## 🚨 PROBLEMAS COMUNS

### ❌ "Bot desconecta após 1 hora"
**Solução:** Use Railway (reconexão automática) ou Render com keep-alive

### ❌ "Auth_info_baileys perdido a cada restart"
**Solução:** Use Render/Railway que mantêm arquivos persistentes, OU configure GitHub Actions para backup

### ❌ "Erro 'Cannot find module'"
**Solução:**
```bash
rm -rf node_modules package-lock.json
npm install
git add .
git commit -m "Fix dependencies"
git push
```

### ❌ "Servidor dorme no Render"
**Solução:** Configure o `keep-alive.js` (veja acima)

---

## 📱 TESTANDO O BOT

1. Acesse o `/qr` endpoint:
   ```
   https://seu-dominio.railway.app/qr
   ```

2. Escaneie o QR com WhatsApp

3. Envie mensagens de teste

4. Monitore logs em tempo real na plataforma

---

## 💡 DICA IMPORTANTE

Para máxima confiabilidade com plano gratuito:
1. Use **Railway** (crédito automático)
2. Configure **alertas** nos logs
3. Teste reconexão automática
4. Mantenha backup da `auth_info_baileys` no GitHub

---

## 🔗 Links Rápidos

- Railway: https://railway.app
- Render: https://render.com
- Fly.io: https://fly.io
- GitHub: https://github.com

Qualquer dúvida, me avisa! 🚀
