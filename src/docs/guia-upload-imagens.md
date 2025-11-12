# 📸 Guia de Upload de Imagens

## Visão Geral

Este documento descreve como usar o sistema de upload de imagens no backend da Central de Denúncias.

---

## 🎯 Funcionalidade

Os usuários podem **adicionar imagens** às denúncias ao criar (POST) ou atualizar (PUT) uma denúncia.

---

## 🔧 Configuração Técnica

### Middleware Usado: Multer

**Arquivo:** `src/middlewares/upload.js`

```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // pasta de destino
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Apenas imagens são permitidas (jpeg, jpg, png, gif, webp)'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter
});

module.exports = upload;
```

### Restrições de Upload

| Propriedade | Valor |
|------------|-------|
| **Tipos permitidos** | jpeg, jpg, png, gif, webp |
| **Tamanho máximo** | 5 MB |
| **Pasta de destino** | `uploads/` (raiz do projeto) |
| **Nome do arquivo** | `{timestamp}-{random}-{extensao}` |

---

## 📡 Endpoints que Aceitam Imagem

### 1. POST /api/denuncias (Criar com imagem)

**Content-Type:** `multipart/form-data`

**Campos do formulário:**

| Campo | Tipo | Obrigatório | Exemplo |
|-------|------|-------------|---------|
| titulo | text | ✅ Sim | "Buraco na Avenida Brasil" |
| descricao | text | ✅ Sim | "Buraco grande causando acidentes" |
| categoria | text | ✅ Sim | "pavimentacao" |
| localizacao | text | ✅ Sim | "Av. Brasil, 1500 - Centro" |
| telefoneContato | text | ✅ Sim | "11999999999" |
| cidadao | text | ✅ Sim | "João Silva" |
| usuarioEmail | text | ✅ Sim | "joao@email.com" |
| **imagem** | file | ❌ Não | arquivo.jpg |

**Resposta de Sucesso (201):**

```json
{
  "success": true,
  "status": 201,
  "message": "Denúncia criada com sucesso",
  "data": {
    "id": "abc-123",
    "titulo": "Buraco na Avenida Brasil",
    "descricao": "Buraco grande causando acidentes",
    "categoria": "pavimentacao",
    "localizacao": "Av. Brasil, 1500 - Centro",
    "telefoneContato": "11999999999",
    "cidadao": "João Silva",
    "usuarioEmail": "joao@email.com",
    "imagemUrl": "/uploads/1699876543210-123456789.jpg",
    "status": "aberto",
    "criadoEm": "2025-11-13T10:30:00.000Z",
    "atualizadoEm": "2025-11-13T10:30:00.000Z"
  }
}
```

---

### 2. PUT /api/denuncias/:id (Atualizar com imagem)

**Content-Type:** `multipart/form-data`

**Campos do formulário:**

Mesmos campos do POST (todos obrigatórios, exceto `imagem`)

**Resposta de Sucesso (200):**

```json
{
  "success": true,
  "status": 200,
  "message": "Denúncia atualizada com sucesso",
  "data": {
    "id": "abc-123",
    "titulo": "Buraco na Avenida Brasil (ATUALIZADO)",
    "imagemUrl": "/uploads/1699876600000-987654321.jpg",
    // ... outros campos
  }
}
```

---

## 🖼️ Acessando Imagens Enviadas

### Endpoint de Arquivos Estáticos

**GET /uploads/:filename**

Exemplo:
```
http://localhost:3000/uploads/1699876543210-123456789.jpg
```

### No Frontend (HTML)

```html
<img src="http://localhost:3000/uploads/1699876543210-123456789.jpg" alt="Denúncia">
```

### No Frontend (JavaScript)

```javascript
fetch('http://localhost:3000/api/denuncias')
  .then(res => res.json())
  .then(data => {
    data.data.forEach(denuncia => {
      if (denuncia.imagemUrl) {
        const img = document.createElement('img');
        img.src = `http://localhost:3000${denuncia.imagemUrl}`;
        document.body.appendChild(img);
      }
    });
  });
```

---

## 🧪 Testando com Postman

### Passo a Passo:

1. **Abra o Postman**
2. **Configure a requisição:**
   - Method: `POST`
   - URL: `http://localhost:3000/api/denuncias`
3. **Vá para a aba "Body"**
4. **Selecione "form-data"**
5. **Adicione os campos:**
   - titulo: `text` → "Teste com Imagem"
   - descricao: `text` → "Descrição do teste"
   - categoria: `text` → "pavimentacao"
   - localizacao: `text` → "Rua Teste, 123"
   - telefoneContato: `text` → "11999999999"
   - cidadao: `text` → "João Teste"
   - usuarioEmail: `text` → "joao@test.com"
   - **imagem: `File`** → Clique em "Select Files" e escolha uma imagem
6. **Clique em "Send"**
7. **Verifique a resposta:**
   - Status: `201 Created`
   - Campo `imagemUrl` deve estar preenchido

---

## 🧪 Testando com cURL (Windows PowerShell)

```powershell
curl.exe -X POST http://localhost:3000/api/denuncias `
  -F "titulo=Teste Upload" `
  -F "descricao=Testando upload de imagem" `
  -F "categoria=pavimentacao" `
  -F "localizacao=Rua Teste, 456" `
  -F "telefoneContato=11988888888" `
  -F "cidadao=Maria Santos" `
  -F "usuarioEmail=maria@test.com" `
  -F "imagem=@C:\Users\SeuUsuario\Downloads\foto.jpg"
```

**Importante:** Use `curl.exe` (não o alias do PowerShell) e ajuste o caminho da imagem.

---

## ⚠️ Tratamento de Erros

### Erro 1: Tipo de arquivo não permitido

**Causa:** Enviou arquivo que não é jpeg/jpg/png/gif/webp

**Resposta (400):**
```json
{
  "success": false,
  "status": 400,
  "message": "Apenas imagens são permitidas (jpeg, jpg, png, gif, webp)"
}
```

### Erro 2: Arquivo muito grande

**Causa:** Arquivo maior que 5MB

**Resposta (413):**
```json
{
  "success": false,
  "status": 413,
  "message": "File too large"
}
```

### Erro 3: Campos obrigatórios faltando

**Causa:** Não enviou todos os campos obrigatórios

**Resposta (400):**
```json
{
  "success": false,
  "status": 400,
  "message": "\"titulo\" is required"
}
```

---

## 📁 Estrutura de Pastas

```
projetobackend/
├── uploads/                          ← Pasta criada automaticamente
│   ├── 1699876543210-123456789.jpg  ← Imagens enviadas
│   └── 1699876600000-987654321.png
├── src/
│   ├── middlewares/
│   │   └── upload.js                ← Configuração do Multer
│   ├── routes/
│   │   └── denuncias.routes.js      ← Usa upload.single('imagem')
│   ├── controllers/
│   │   └── denuncias.controller.js  ← Processa req.file
│   └── app.js                        ← Serve /uploads como estático
```

---

## 🎨 Integração Frontend

### Exemplo de Formulário HTML

```html
<form id="formDenuncia" enctype="multipart/form-data">
  <input type="text" name="titulo" placeholder="Título" required>
  <textarea name="descricao" placeholder="Descrição" required></textarea>
  
  <select name="categoria" required>
    <option value="pavimentacao">Pavimentação</option>
    <option value="iluminacao">Iluminação</option>
    <option value="limpeza">Limpeza</option>
    <option value="sinalizacao">Sinalização</option>
  </select>
  
  <input type="text" name="localizacao" placeholder="Localização" required>
  <input type="tel" name="telefoneContato" placeholder="Telefone" required>
  <input type="text" name="cidadao" placeholder="Nome" required>
  <input type="email" name="usuarioEmail" placeholder="E-mail" required>
  
  <input type="file" name="imagem" accept="image/jpeg,image/jpg,image/png,image/gif,image/webp">
  
  <button type="submit">Enviar Denúncia</button>
</form>

<script>
  document.getElementById('formDenuncia').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch('http://localhost:3000/api/denuncias', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Denúncia enviada com sucesso!');
        console.log('URL da imagem:', result.data.imagemUrl);
      } else {
        alert('Erro: ' + result.message);
      }
    } catch (error) {
      alert('Erro ao enviar: ' + error.message);
    }
  });
</script>
```

---

## 🔒 Segurança

1. **Validação de Tipo:** Apenas imagens (jpeg, jpg, png, gif, webp)
2. **Limite de Tamanho:** Máximo 5MB por arquivo
3. **Nome Único:** Evita sobrescrever arquivos existentes
4. **Helmet:** Headers de segurança configurados
5. **CORS:** Apenas localhost:5500 permitido (configurável em `.env`)

---

## 📝 Notas Importantes

1. **A pasta `uploads/` NÃO deve ser versionada no Git**
   - Já está no `.gitignore`
   - Em produção, use serviço de armazenamento (AWS S3, Cloudinary, etc.)

2. **O campo `imagemUrl` é OPCIONAL**
   - Se não enviar imagem, será `null`
   - A denúncia será criada normalmente

3. **O frontend deve usar `FormData`**
   - Não pode ser `application/json` quando há arquivo
   - Headers são configurados automaticamente

4. **Múltiplas imagens (futuro):**
   - Atualmente suporta 1 imagem por denúncia
   - Para múltiplas, altere `upload.single('imagem')` para `upload.array('imagens', 5)`

---

## 🚀 Próximos Passos

- [ ] Implementar compressão de imagens (sharp, jimp)
- [ ] Migrar para serviço de armazenamento em nuvem (S3, Cloudinary)
- [ ] Adicionar suporte para múltiplas imagens
- [ ] Implementar cache de imagens
- [ ] Adicionar watermark nas imagens

---

**Última atualização:** 2025-11-13
