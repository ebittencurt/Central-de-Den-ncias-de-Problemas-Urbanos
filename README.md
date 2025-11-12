# 🏙️ Central de Denúncias de Problemas Urbanos - Backend

> API REST para gerenciamento de denúncias de problemas urbanos (buracos, iluminação, limpeza, sinalização)

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-blue)](https://expressjs.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [Endpoints da API](#-endpoints-da-api)
- [Upload de Imagens](#-upload-de-imagens)
- [Showcase de Resolvidos](#-showcase-de-resolvidos)
- [Segurança](#-segurança)
- [Testes](#-testes)
- [Documentação Completa](#-documentação-completa)
- [Equipe](#-equipe)
- [Próximos Passos](#-próximos-passos)

---

## 🎯 Sobre o Projeto

A **Central de Denúncias de Problemas Urbanos** é uma plataforma web que permite aos cidadãos reportar problemas urbanos como:

- 🛣️ **Pavimentação** (buracos, asfalto danificado)
- 💡 **Iluminação** (postes apagados, fiação exposta)
- 🗑️ **Limpeza** (lixo acumulado, entulho)
- 🚦 **Sinalização** (placas danificadas, falta de faixas)

Este repositório contém o **backend** da aplicação, desenvolvido em Node.js com Express.

---

## ✨ Funcionalidades

### CRUD Completo de Denúncias
- ✅ Criar denúncia (com ou sem imagem)
- ✅ Listar denúncias (com paginação e filtros)
- ✅ Buscar denúncia por ID
- ✅ Atualizar denúncia completa (com ou sem imagem)
- ✅ Atualizar apenas status da denúncia
- ✅ Deletar denúncia (apenas se status for "aberto")

### Upload de Imagens
- 📸 Suporte a upload de imagens (jpeg, jpg, png, gif, webp)
- 🔒 Limite de 5MB por arquivo
- 📁 Arquivos servidos estaticamente via `/uploads`

### Showcase de Problemas Resolvidos
- 🏆 Endpoint dedicado para exibir problemas já resolvidos
- 🎨 Ideal para área de propaganda/destaque no site

### Segurança e Validação
- 🛡️ Helmet para headers de segurança
- 🔐 CORS configurável
- ⏱️ Rate limiting (100 requisições/15 min)
- ✔️ Validação com Joi em todos os endpoints

### Recursos Adicionais
- 📄 Paginação automática (padrão: 10 itens/página)
- 🔍 Filtros por categoria, status, email do usuário
- 📊 Respostas padronizadas JSON
- ⚠️ Tratamento global de erros

---

## 🛠️ Tecnologias

| Dependência | Versão | Descrição |
|------------|--------|-----------|
| **Node.js** | 18.x+ | Runtime JavaScript |
| **Express** | 4.18.2 | Framework web |
| **Joi** | 17.9.2 | Validação de dados |
| **Multer** | latest | Upload de arquivos |
| **UUID** | 9.0.0 | Geração de IDs únicos |
| **Helmet** | 6.0.0 | Segurança HTTP |
| **CORS** | 2.8.5 | Controle de origem |
| **express-rate-limit** | 6.7.0 | Limitação de requisições |
| **dotenv** | 16.0.3 | Variáveis de ambiente |
| **nodemon** | 2.0.22 | Auto-reload (dev) |

---

## 📁 Estrutura do Projeto

```
Central-de-Denuncias-de-Problemas-Urbanos/
├── src/
│   ├── config/
│   │   └── index.js                 # Configurações (PORT, CORS)
│   ├── controllers/
│   │   └── denuncias.controller.js  # Lógica de negócio
│   ├── middlewares/
│   │   ├── errorHandler.js          # Tratamento de erros
│   │   ├── rateLimiter.js           # Limitação de requisições
│   │   ├── upload.js                # Upload de imagens (Multer)
│   │   └── validate.js              # Validação Joi
│   ├── models/
│   │   └── store.js                 # Armazenamento in-memory
│   ├── routes/
│   │   ├── index.js                 # Agregador de rotas
│   │   └── denuncias.routes.js      # Rotas de denúncias
│   ├── utils/
│   │   └── response.js              # Respostas padronizadas
│   ├── validators/
│   │   └── denuncia.validator.js    # Schemas Joi
│   ├── docs/                        # Documentação técnica
│   │   ├── modelo-de-dados.md
│   │   ├── guia-de-testes.md
│   │   ├── teste-delete.md
│   │   ├── guia-upload-imagens.md
│   │   └── showcase-resolvidos.md
│   ├── app.js                       # Configuração Express
│   └── index.js                     # Entrypoint
├── uploads/                         # Arquivos enviados (não versionado)
├── testes-api.ps1                   # Script de testes PowerShell
├── teste-delete.ps1                 # Testes DELETE
├── teste-upload-showcase.ps1        # Testes Upload + Showcase
├── .env.example                     # Exemplo de variáveis
├── .gitignore
├── package.json
└── README.md                        # Este arquivo
```

---

## 🚀 Instalação

### Pré-requisitos

- **Node.js** 18.x ou superior
- **npm** 9.x ou superior

### Passo a Passo

1. **Clone o repositório:**

```bash
git clone https://github.com/ebittencurt/Central-de-Den-ncias-de-Problemas-Urbanos.git
cd Central-de-Den-ncias-de-Problemas-Urbanos
```

2. **Instale as dependências:**

```powershell
npm install
```

3. **Configure as variáveis de ambiente:**

```powershell
cp .env.example .env
```

Edite o arquivo `.env` conforme necessário:

```env
PORT=3000
CORS_ORIGIN=http://localhost:5500
```

4. **Inicie o servidor:**

```powershell
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

5. **Verifique se está rodando:**

Abra o navegador em: `http://localhost:3000`

---

## ⚙️ Configuração

### Variáveis de Ambiente (.env)

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `PORT` | 3000 | Porta do servidor |
| `CORS_ORIGIN` | http://localhost:5500 | Origem permitida (frontend) |

### Configuração do CORS

Por padrão, apenas `http://localhost:5500` pode acessar a API. Para permitir múltiplas origens:

```javascript
// src/config/index.js
corsOrigin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5500']
```

### Rate Limiting

- **Limite:** 100 requisições
- **Janela:** 15 minutos
- **Mensagem:** "Muitas requisições, tente novamente mais tarde"

Configurado em: `src/middlewares/rateLimiter.js`

---

## 🎮 Uso

### Iniciar Servidor

```powershell
# Desenvolvimento
npm run dev

# Produção
npm start
```

Servidor estará disponível em: `http://localhost:3000`

---

## 📡 Endpoints da API

### Base URL: `http://localhost:3000/api/denuncias`

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/` | Criar denúncia | ❌ |
| GET | `/` | Listar denúncias | ❌ |
| GET | `/:id` | Buscar por ID | ❌ |
| PUT | `/:id` | Atualizar denúncia | ❌ |
| PATCH | `/:id/status` | Atualizar status | ❌ |
| DELETE | `/:id` | Deletar denúncia | ❌ |
| GET | `/resolvidos` | Showcase resolvidos | ❌ |

---

### 1. Criar Denúncia

**POST** `/api/denuncias`

**Content-Type:** `application/json` (sem imagem) ou `multipart/form-data` (com imagem)

**Body (JSON):**

```json
{
  "titulo": "Buraco na Avenida Brasil",
  "descricao": "Buraco grande causando acidentes",
  "categoria": "pavimentacao",
  "localizacao": "Av. Brasil, 1500 - Centro",
  "telefoneContato": "11999999999",
  "cidadao": "João Silva",
  "usuarioEmail": "joao@email.com"
}
```

**Body (FormData - com imagem):**

```
titulo: "Buraco na Avenida Brasil"
descricao: "Buraco grande causando acidentes"
categoria: "pavimentacao"
localizacao: "Av. Brasil, 1500 - Centro"
telefoneContato: "11999999999"
cidadao: "João Silva"
usuarioEmail: "joao@email.com"
imagem: [arquivo.jpg]
```

**Resposta (201):**

```json
{
  "success": true,
  "status": 201,
  "message": "Denúncia criada com sucesso",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "titulo": "Buraco na Avenida Brasil",
    "descricao": "Buraco grande causando acidentes",
    "categoria": "pavimentacao",
    "localizacao": "Av. Brasil, 1500 - Centro",
    "telefoneContato": "11999999999",
    "cidadao": "João Silva",
    "usuarioEmail": "joao@email.com",
    "imagemUrl": "/uploads/1699876543210-123456789.jpg",
    "status": "aberto",
    "criadoEm": "2025-11-12T10:30:00.000Z",
    "atualizadoEm": "2025-11-12T10:30:00.000Z"
  }
}
```

---

### 2. Listar Denúncias

**GET** `/api/denuncias?page=1&limit=10&categoria=pavimentacao&status=aberto`

**Query Parameters:**

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `page` | number | 1 | Número da página |
| `limit` | number | 10 | Itens por página |
| `categoria` | string | - | Filtrar por categoria |
| `status` | string | - | Filtrar por status |
| `usuarioEmail` | string | - | Filtrar por email |

**Resposta (200):**

```json
{
  "success": true,
  "status": 200,
  "message": "Lista de denúncias",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "titulo": "Buraco na Avenida Brasil",
      "status": "aberto",
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

---

### 3. Buscar por ID

**GET** `/api/denuncias/:id`

**Resposta (200):**

```json
{
  "success": true,
  "status": 200,
  "message": "Denúncia encontrada",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "titulo": "Buraco na Avenida Brasil",
    ...
  }
}
```

---

### 4. Atualizar Denúncia

**PUT** `/api/denuncias/:id`

**Content-Type:** `application/json` ou `multipart/form-data`

**Body:** Mesmos campos do POST

**Resposta (200):**

```json
{
  "success": true,
  "status": 200,
  "message": "Denúncia atualizada com sucesso",
  "data": { ... }
}
```

---

### 5. Atualizar Status

**PATCH** `/api/denuncias/:id/status`

**Body:**

```json
{
  "status": "em_analise"
}
```

**Valores válidos:** `aberto`, `em_analise`, `resolvido`, `rejeitado`

**Resposta (200):**

```json
{
  "success": true,
  "status": 200,
  "message": "Status atualizado com sucesso",
  "data": { ... }
}
```

---

### 6. Deletar Denúncia

**DELETE** `/api/denuncias/:id`

**Regra de Negócio:** ⚠️ **Apenas denúncias com status "aberto" podem ser deletadas**

**Resposta (200):**

```json
{
  "success": true,
  "status": 200,
  "message": "Denúncia excluída com sucesso",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**Erro (403) - Status diferente de "aberto":**

```json
{
  "success": false,
  "status": 403,
  "message": "Apenas denúncias com status \"aberto\" podem ser excluídas"
}
```

---

### 7. Showcase de Resolvidos

**GET** `/api/denuncias/resolvidos`

**Descrição:** Retorna problemas resolvidos para área de destaque/propaganda

**Resposta (200):**

```json
{
  "success": true,
  "status": 200,
  "message": "Problemas resolvidos",
  "data": [
    {
      "id": "showcase-1",
      "titulo": "Buraco na Avenida Principal corrigido",
      "descricao": "Após denúncia dos moradores, a prefeitura realizou o recapeamento completo da via",
      "categoria": "pavimentacao",
      "localizacao": "Avenida Principal, 1500 - Centro",
      "imagemUrl": "/uploads/exemplo-buraco-resolvido.jpg",
      "status": "resolvido",
      "resolvidoEm": "2025-11-01T10:30:00.000Z"
    },
    ...
  ]
}
```

---

## 📸 Upload de Imagens

### Configuração

- **Tipos aceitos:** jpeg, jpg, png, gif, webp
- **Tamanho máximo:** 5 MB
- **Pasta de destino:** `uploads/`
- **URL gerada:** `/uploads/{timestamp}-{random}.{ext}`

### Como Usar

#### Com Postman:

1. Method: `POST`
2. URL: `http://localhost:3000/api/denuncias`
3. Body → `form-data`
4. Adicione todos os campos de texto
5. Adicione campo `imagem` do tipo `File`

#### Com JavaScript (Fetch):

```javascript
const formData = new FormData();
formData.append('titulo', 'Buraco na rua');
formData.append('descricao', 'Descrição...');
formData.append('categoria', 'pavimentacao');
formData.append('localizacao', 'Rua A, 100');
formData.append('telefoneContato', '11999999999');
formData.append('cidadao', 'Maria Silva');
formData.append('usuarioEmail', 'maria@email.com');
formData.append('imagem', fileInput.files[0]);

const response = await fetch('http://localhost:3000/api/denuncias', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('URL da imagem:', result.data.imagemUrl);
```

#### Acessar Imagem:

```html
<img src="http://localhost:3000/uploads/1699876543210-123456789.jpg" alt="Denúncia">
```

### Tratamento de Erros

| Erro | Status | Mensagem |
|------|--------|----------|
| Tipo inválido | 400 | "Apenas imagens são permitidas (jpeg, jpg, png, gif, webp)" |
| Arquivo grande | 413 | "File too large" |

**Documentação completa:** `src/docs/guia-upload-imagens.md`

---

## 🏆 Showcase de Resolvidos

### Objetivo

Exibir problemas urbanos que foram resolvidos pela prefeitura, servindo como:
- 🎯 Área de destaque no site
- 📱 Propaganda institucional
- 📊 Demonstração de eficiência

### Endpoint

**GET** `/api/denuncias/resolvidos`

### Integração Frontend

#### Exemplo 1: Lista Simples

```javascript
const response = await fetch('http://localhost:3000/api/denuncias/resolvidos');
const result = await response.json();

result.data.forEach(problema => {
  console.log(problema.titulo);
  console.log(problema.imagemUrl);
  console.log(problema.resolvidoEm);
});
```

#### Exemplo 2: Galeria HTML

```html
<div class="galeria-resolvidos">
  <h2>Problemas Resolvidos 🏆</h2>
  <div id="grid"></div>
</div>

<script>
  async function carregarGaleria() {
    const res = await fetch('http://localhost:3000/api/denuncias/resolvidos');
    const data = await res.json();
    
    const grid = document.getElementById('grid');
    data.data.forEach(item => {
      const card = `
        <div class="card">
          <img src="http://localhost:3000${item.imagemUrl}" alt="${item.titulo}">
          <h3>${item.titulo}</h3>
          <p>${item.descricao}</p>
          <span>${item.categoria}</span>
        </div>
      `;
      grid.innerHTML += card;
    });
  }
  
  carregarGaleria();
</script>
```

**Documentação completa:** `src/docs/showcase-resolvidos.md`

---

## 🔒 Segurança

### Helmet

Headers HTTP de segurança configurados automaticamente:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

### CORS

Configurado para aceitar apenas o frontend:
- Origem padrão: `http://localhost:5500`
- Configurável via `.env`

### Rate Limiting

- **Limite:** 100 requisições por IP
- **Janela:** 15 minutos
- **Headers retornados:**
  - `X-RateLimit-Limit`: Limite total
  - `X-RateLimit-Remaining`: Requisições restantes
  - `X-RateLimit-Reset`: Timestamp de reset

### Validação de Dados

Todos os inputs são validados com **Joi**:
- Campos obrigatórios
- Tipos de dados corretos
- Formatos válidos (email, telefone, categoria, status)

### Upload de Arquivos

- Validação de tipo MIME
- Limite de tamanho (5MB)
- Nomes únicos com timestamp
- Pasta isolada (`uploads/`)

---

## 🧪 Testes

### Scripts de Teste Disponíveis

1. **testes-api.ps1** - 18 testes completos
2. **teste-delete.ps1** - Testes específicos do DELETE
3. **teste-upload-showcase.ps1** - Testes de upload e showcase

### Executar Testes

```powershell
# Testes completos
.\testes-api.ps1

# Apenas DELETE
.\teste-delete.ps1

# Upload e Showcase
.\teste-upload-showcase.ps1
```

### Exemplo de Teste Manual (PowerShell)

```powershell
# Criar denúncia
$body = @{
  titulo = "Buraco na Rua X"
  descricao = "Buraco grande"
  categoria = "pavimentacao"
  localizacao = "Rua X, 123"
  telefoneContato = "11999999999"
  cidadao = "João Silva"
  usuarioEmail = "joao@email.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/denuncias" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"

# Listar denúncias
Invoke-RestMethod -Uri "http://localhost:3000/api/denuncias" -Method Get

# Buscar showcase
Invoke-RestMethod -Uri "http://localhost:3000/api/denuncias/resolvidos" -Method Get
```

---

## 📚 Documentação Completa

### Documentos Disponíveis (src/docs/)

| Arquivo | Descrição |
|---------|-----------|
| `modelo-de-dados.md` | Estrutura completa dos dados |
| `guia-de-testes.md` | Guia completo de testes da API |
| `teste-delete.md` | Documentação do endpoint DELETE |
| `guia-upload-imagens.md` | Guia completo de upload de imagens |
| `showcase-resolvidos.md` | Documentação do showcase |

### Modelo de Dados

```javascript
{
  id: string (UUID),
  titulo: string (3-200 chars),
  descricao: string (10-2000 chars),
  categoria: enum ['pavimentacao', 'iluminacao', 'limpeza', 'sinalizacao'],
  localizacao: string (5-500 chars),
  telefoneContato: string (10-11 digits),
  cidadao: string (3-200 chars),
  usuarioEmail: string (email válido),
  imagemUrl: string | null,
  status: enum ['aberto', 'em_analise', 'resolvido', 'rejeitado'],
  criadoEm: ISO 8601 datetime,
  atualizadoEm: ISO 8601 datetime
}
```

---

## 👥 Equipe

Este projeto foi desenvolvido por uma equipe de 3 pessoas:

| Membro | Responsabilidade |
|--------|------------------|
| **junior Bittencurt** | Backend + Documentação |
| **Pessoa 1** | UI/UX Design |
| **Pessoa 2** | Frontend (JavaScript + Integração API) |

---

## 🚀 Próximos Passos

### Backend

- [ ] Migrar de armazenamento in-memory para MongoDB
- [ ] Adicionar endpoints de usuário (login, registro)
- [ ] Deploy em produção (Heroku, Railway, Render)

### Documentação

- [ ] Gerar especificação OpenAPI/Swagger
- [ ] Criar diagramas de arquitetura (Mermaid)
- [ ] Documentar fluxo de autenticação
- [ ] Adicionar exemplos em múltiplas linguagens

### Integração

- [ ] Conectar com frontend desenvolvido pela Pessoa 2
- [ ] Implementar design da Pessoa 1
- [ ] Configurar CORS para domínio de produção

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 📞 Contato

Para dúvidas ou sugestões sobre o backend:
- GitHub: [@ebittencurt](https://github.com/ebittencurt)
- Repository: [Central-de-Denúncias](https://github.com/ebittencurt/Central-de-Den-ncias-de-Problemas-Urbanos)

---

## 🎓 Notas de Desenvolvimento

### Armazenamento Atual

⚠️ **Importante:** Este projeto usa armazenamento **in-memory** (array JavaScript). Os dados são **perdidos ao reiniciar o servidor**.

Para produção, migre para banco de dados real:
- MongoDB (recomendado para este projeto)
- PostgreSQL
- MySQL

### Upload de Imagens

⚠️ **Importante:** A pasta `uploads/` não é versionada no Git. Em produção, use serviço de armazenamento em nuvem.

### CORS

⚠️ **Importante:** Configure `CORS_ORIGIN` no `.env` para o domínio do frontend em produção.

---

**Última atualização:** 12 de Novembro de 2025  
**Versão:** 1.0.0  
**Status:** ✅ Produção-ready (com ressalvas acima)