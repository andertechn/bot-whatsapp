# 🚀 Guia Rápido: GitHub → Railway/Render

## ⚡ Resumo (5 passos)

1. Criar conta GitHub
2. Fazer push do código
3. Conectar na plataforma
4. Deploy automático
5. Escanear QR e pronto!

---

## 📝 PASSO 1: Criar Conta GitHub

1. Acesse: https://github.com/signup
2. Escolha um username (exemplo: `seu_nome_123`)
3. Confirme email
4. Pronto!

---

## 💾 PASSO 2: Fazer Push do Código

Abra o terminal na pasta do seu bot:

```bash
# Inicializar Git (se for primeira vez)
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Bot WhatsApp inicial"

# Ir para branch main
git branch -M main
```

Agora crie o repositório no GitHub:
1. Vá em https://github.com/new
2. Nome: `bot-whatsapp`
3. Descrição: `Bot WhatsApp 24h grátis`
4. Selecione **Public** (para deploy funcionar)
5. Clique em **Create repository**

Após criar, copie o comando que aparece:

```bash
# Vai ser algo como:
git remote add origin https://github.com/SEU_USER/bot-whatsapp.git
git push -u origin main
```

Cole no seu terminal e pronto! Seu código está no GitHub!

---

## ☁️ PASSO 3: Deploy no Railway

### 3A. Configurar Railway

1. Acesse: https://railway.app
2. Clique em **GitHub** para logar
3. Autorize o acesso ao GitHub

### 3B. Criar novo projeto

1. Clique em **New Project**
2. Selecione **Deploy from GitHub**
3. Busque `bot-whatsapp`
4. Clique em **Import**

### 3C. Configurar variáveis

1. Vá na aba **Variables**
2. Adicione:
   ```
   NODE_ENV=production
   PORT=3000
   ```
3. Clique em **Deploy**

### 3D. Aguardar deploy

- Você verá os logs em tempo real
- Quando ficar verde "Build & Deploy Successful", está pronto!
- Copie a URL do seu projeto (algo como `https://seu-projeto-xxxxxx.railway.app`)

---

## 🎯 PASSO 4: Escanear QR

1. Acesse: `https://seu-projeto-xxxxxx.railway.app/qr`
2. Você verá um QR Code (ou link dos logs)
3. Abra WhatsApp
4. Configurações → Aparelhos vinculados → Vincular um aparelho
5. Escaneie o QR

Pronto! Seu bot está online 24h! 🎉

---

## 🔄 PASSO 5: Atualizar Código

Se precisar fazer mudanças:

```bash
# Edite os arquivos normalmente
# Depois:

git add .
git commit -m "Descrição da mudança"
git push origin main
```

Railway automaticamente reconstrói e deploya!

---

## 📊 Alternativa: Render

Se quiser usar **Render** em vez de Railway:

1. Acesse: https://render.com
2. Clique em **GitHub** para logar
3. **New +** → **Web Service**
4. Selecione `bot-whatsapp`
5. Configure:
   - Name: `bot-whatsapp`
   - Runtime: `Node`
   - Build: `npm install`
   - Start: `node index.js`
   - Plan: **Free**
6. Deploy

⚠️ Render pode dormir. Use o endpoint `/status` para acordar:
- Acesse a URL do seu projeto
- Render vai acordar automaticamente

---

## 🎮 Testando o Bot

### Terminal (local)
```bash
npm start
# Verá logs e QR no terminal
```

### Web (após deploy)
```
https://seu-projeto-xxxxxx.railway.app/status
```

### WhatsApp
Envie uma mensagem:
- `ping` - Bot responde "Pong!"
- `help` - Lista comandos
- `hora` - Mostra horário

---

## ✅ Checklist Final

- [ ] Conta GitHub criada
- [ ] Repositório criado em GitHub
- [ ] Código no GitHub (git push)
- [ ] Conta Railway/Render criada
- [ ] Projeto importado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy concluído (status verde)
- [ ] QR Code acessível
- [ ] WhatsApp vinculado
- [ ] Testado com comandos

---

## 🔗 Links Importantes

| Serviço | Link |
|---------|------|
| GitHub | https://github.com |
| Railway | https://railway.app |
| Render | https://render.com |
| WhatsApp Web | https://web.whatsapp.com |

---

## 💡 Dicas Extras

1. **Guarde sua URL**: Você vai precisar sempre dela
2. **Teste localmente**: Antes de fazer push
3. **Logs são seus amigos**: Veja os logs quando algo der errado
4. **Backup da auth**: Se sua pasta `auth_info_baileys` some, você desconecta

---

**Pronto! Seu bot está 24h online GRÁTIS! 🚀**
