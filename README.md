# Central de Denúncias de Problemas Urbanos

> API REST para gerenciamento de denúncias de problemas urbanos (buracos, iluminação, limpeza, sinalização)

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-blue)](https://expressjs.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Sistema web para registro e acompanhamento de denúncias de problemas urbanos, permitindo que cidadãos reportem problemas como buracos, lixo acumulado, iluminação pública defeituosa, entre outros.

## 📋 Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Categorias Disponíveis](#categorias-disponíveis)
- [Status das Denúncias](#status-das-denúncias)

## ✨ Funcionalidades

### Frontend
- **Home**: Formulário para criar novas denúncias com upload de imagem
- **Minhas Denúncias**: Visualização, edição e exclusão de denúncias do usuário logado
- **Showcase**: Galeria de problemas resolvidos e em análise
- **Suporte**: Página com informações de contato e FAQ
- **Tema Claro/Escuro**: Alternância entre temas com persistência no localStorage
- **Sistema de Login**: Autenticação básica com email/senha
- **Validações em Tempo Real**: Contador de caracteres e feedback visual

### Backend
- **API REST**: Endpoints para gerenciamento completo de denúncias
- **Upload de Imagens**: Suporte a upload de fotos com Multer
- **Validação de Dados**: Validação com Joi
- **Rate Limiting**: Proteção contra abuso de requisições
- **CORS**: Configurado para aceitar requisições do frontend
- **Segurança**: Helmet para headers de segurança

## 🚀 Tecnologias Utilizadas

### Frontend
- HTML5
- CSS3 (variáveis CSS para temas)
- JavaScript (ES6+)
- Bootstrap 5.3.0
- Font Awesome 6.4.0

### Backend
- Node.js
- Express.js 4.18.2
- Multer 1.4.5-lts.1 (upload de arquivos)
- Joi 17.9.2 (validação)
- Helmet 6.0.0 (segurança)
- CORS 2.8.5
- Express Rate Limit 6.7.0
- UUID 9.0.0
- Dotenv 16.0.3

### Desenvolvimento
- Nodemon 2.0.22 (auto-reload)
- Live Server (frontend)

## 📁 Estrutura do Projeto

```
Central-de-Denuncias-de-Problemas-Urbanos/
├── src/                          # Backend
│   ├── app.js                    # Configuração do Express
│   ├── index.js                  # Arquivo principal do servidor
│   ├── config/
│   │   └── index.js              # Configurações gerais
│   ├── controllers/
│   │   └── denuncias.controller.js  # Lógica de negócio
│   ├── middlewares/
│   │   ├── errorHandler.js       # Tratamento de erros
│   │   ├── rateLimiter.js        # Limitação de requisições
│   │   ├── upload.js             # Configuração Multer
│   │   └── validate.js           # Middleware de validação
│   ├── models/
│   │   └── store.js              # Armazenamento em memória
│   ├── routes/
│   │   ├── index.js              # Rotas principais
│   │   └── denuncias.routes.js  # Rotas de denúncias
│   ├── utils/
│   │   └── response.js           # Padronização de respostas
│   └── validators/
│       └── denuncia.validator.js # Schemas de validação
├── js/                           # Frontend JavaScript
│   ├── app.js                    # Inicialização da aplicação
│   ├── auth.js                   # Autenticação
│   ├── api.js                    # Comunicação com API
│   ├── denuncias.js              # Gerenciamento de denúncias
│   ├── showcase.js               # Galeria de resolvidos
│   └── utils.js                  # Funções utilitárias
├── styles/
│   └── main.css                  # Estilos e temas
├── uploads/                      # Imagens enviadas pelos usuários
├── imagens-showcase/             # Imagens mockadas
├── index.html                    # Página principal
├── login.html                    # Página de login
├── package.json                  # Dependências do projeto
├── .env.example                  # Exemplo de variáveis de ambiente
└── README.md                     # Este arquivo

```

## 🔧 Instalação

### Pré-requisitos
- Node.js (versão 14 ou superior)
- NPM ou Yarn
- Navegador web moderno

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/ebittencurt/Central-de-Den-ncias-de-Problemas-Urbanos.git
cd Central-de-Den-ncias-de-Problemas-Urbanos
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` conforme necessário:
```env
PORT=3000
NODE_ENV=development
API_URL=http://localhost:3000/api
```

4. **Inicie o servidor backend**
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

5. **Abra o frontend**

Use o Live Server do VS Code ou abra diretamente o arquivo `index.html` no navegador.

Para usar o Live Server:
- Clique com botão direito em `index.html`
- Selecione "Open with Live Server"

O frontend estará disponível em `http://127.0.0.1:5500` (ou porta similar)

## 💻 Uso

### Login de Teste

Para acessar o sistema, use as credenciais de demonstração:
- **Email**: demo@email.com
- **Senha**: 123456

### Criar Nova Denúncia

1. Faça login no sistema
2. Na aba "Home", preencha o formulário:
   - **Título**: Mínimo 3 caracteres
   - **Descrição**: Mínimo 10 caracteres
   - **Categoria**: Selecione uma das opções
   - **Localização**: Digite o endereço do problema
   - **Imagem**: Opcional (formatos: JPG, PNG, GIF - máximo 5MB)
3. Clique em "Enviar Denúncia"

### Gerenciar Denúncias

1. Acesse a aba "Minhas Denúncias"
2. Visualize todas suas denúncias com status e datas
3. Use os botões de ação:
   - **Editar**: Modificar título, descrição ou localização
   - **Excluir**: Remover a denúncia (com confirmação)

### Visualizar Showcase

1. Acesse a aba "Showcase"
2. Veja problemas já resolvidos ou em análise
3. Cards mostram:
   - Foto do problema
   - Status (Resolvido ou Em Análise)
   - Data de resolução ou previsão de conclusão

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints Disponíveis

#### 1. Listar Denúncias
```http
GET /denuncias
```

**Query Parameters:**
- `demo@email.com`: Filtrar por email do usuário

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "titulo": "Buraco na Avenida Principal",
      "descricao": "Grande buraco causando acidentes",
      "categoria": "vias_publicas",
      "localizacao": "Av. Principal, 123",
      "status": "pendente",
      "usuarioEmail": "usuario@email.com",
      "imagemUrl": "/uploads/imagem.jpg",
      "criadoEm": "2025-11-22T10:00:00.000Z"
    }
  ]
}
```

#### 2. Buscar Denúncia por ID
```http
GET /denuncias/:id
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "titulo": "Buraco na Avenida Principal",
    ...
  }
}
```

#### 3. Criar Denúncia
```http
POST /denuncias
Content-Type: multipart/form-data
```

**Body (FormData):**
- `titulo` (string, obrigatório): Mínimo 3 caracteres
- `descricao` (string, obrigatório): Mínimo 10 caracteres
- `categoria` (string, obrigatório): Uma das categorias válidas
- `localizacao` (string, obrigatório): Endereço do problema
- `usuarioEmail` (string, obrigatório): Email do usuário
- `imagem` (file, opcional): Arquivo de imagem (JPG, PNG, GIF - máximo 5MB)

**Resposta:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "titulo": "Nova denúncia",
    ...
  },
  "message": "Denúncia criada com sucesso"
}
```

#### 4. Atualizar Denúncia
```http
PUT /denuncias/:id
Content-Type: application/json
```

**Body:**
```json
{
  "titulo": "Título atualizado",
  "descricao": "Descrição atualizada",
  "localizacao": "Nova localização"
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    ...
  },
  "message": "Denúncia atualizada com sucesso"
}
```

#### 5. Deletar Denúncia
```http
DELETE /denuncias/:id
```

**Resposta:**
```json
{
  "success": true,
  "message": "Denúncia excluída com sucesso"
}
```

#### 6. Upload de Imagem
```http
POST /denuncias/upload
Content-Type: multipart/form-data
```

**Body (FormData):**
- `imagem` (file, obrigatório): Arquivo de imagem

**Resposta:**
```json
{
  "success": true,
  "data": {
    "imagemUrl": "/uploads/1234567890-imagem.jpg"
  }
}
```

## 📂 Categorias Disponíveis

O sistema suporta as seguintes categorias de denúncias:

- `vias_publicas`: Vias Públicas (buracos, pavimentação)
- `iluminacao`: Iluminação Pública
- `limpeza`: Lixo e Saneamento
- `sinalizacao`: placas, tinta no asfalto
- `transito`: semaforos, placas, quebra-molas
- `outros`: Outros

## 📊 Status das Denúncias

- **Aberto**: Denúncia recebida, aguardando análise
- **em_analise**: Em processo de avaliação pela equipe responsável
- **resolvido**: Problema foi solucionado

## 🎨 Personalização

### Temas

O sistema possui dois temas (claro e escuro) que podem ser alternados pelo botão no navbar. As cores são definidas via CSS variables em `styles/main.css`:

```css
:root, [data-bs-theme="light"] {
    --bg-body: #f8f9fa;
    --bg-navbar: #0d6efd;
    --primary: #0d6efd;
    ...
}

[data-bs-theme="dark"] {
    --bg-body: #1a1a1a;
    --bg-navbar: #1c4d8f;
    --primary: #4a9eff;
    ...
}
```

### Validações

As validações são configuradas em `src/validators/denuncia.validator.js` usando Joi:

```javascript
titulo: Joi.string().min(3).max(100).required()
descricao: Joi.string().min(10).max(1000).required()
categoria: Joi.string().valid('vias_publicas', 'iluminacao', ...).required()
```

## 📝 Dados Mockados

O sistema inclui 3 denúncias de exemplo no banco de dados em memória (usuário: demo@email.com):

1. **Buraco na Avenida Principal** - Resolvido
2. **Lixo acumulado na Rua das Flores** - Resolvido  
3. **Buraco na Rua Camélia** - Em Análise

## 🔒 Segurança

- **Helmet**: Headers de segurança HTTP
- **CORS**: Configurado para aceitar apenas origens permitidas
- **Rate Limiting**: Limite de 100 requisições por 15 minutos por IP
- **Validação de Entrada**: Todos os dados são validados com Joi
- **Sanitização de Arquivos**: Apenas imagens JPG, PNG e GIF são permitidas

## 🐛 Troubleshooting

### Porta em uso (EADDRINUSE)
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Linux/Mac
lsof -i :3000
kill -9 [PID]
```

### Nodemon crashed
Verifique a saída do terminal para ver o erro específico. Geralmente é causado por:
- Erro de sintaxe no código
- Porta já em uso
- Dependências faltando

Digite `rs` no terminal para reiniciar manualmente.

### Imagens não carregam
Verifique se:
- A pasta `/uploads` existe e tem permissões de escrita
- O caminho da imagem no banco está correto
- O servidor está rodando na porta correta

## 📞 Suporte

Para dúvidas ou problemas:
- **Email**: suporte@centraldenuncias.com.br
- **Telefone**: 4002-8922
- **Horário**: Segunda a Sexta, 8h às 18h

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Autores

Alef Santos, Edvaldo Junior, Ronald Jesus

---

**Versão**: 1.0.0  
**Última atualização**: Novembro 2025
