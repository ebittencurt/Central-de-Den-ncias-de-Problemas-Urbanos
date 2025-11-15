# 💻 PROMPT PARA DESENVOLVIMENTO DO JAVASCRIPT
## Central de Denúncias de Problemas Urbanos

---

## 🚨 RESTRIÇÕES ABSOLUTAS - LEIA PRIMEIRO

### ✅ **VOCÊ DEVE CRIAR APENAS:**
- Arquivos JavaScript (`js/auth.js`, `js/api.js`, `js/denuncias.js`, `js/showcase.js`, `js/app.js`)
- Lógica de integração com a API REST
- Manipulação do DOM via JavaScript
- Autenticação simples com localStorage
- Tratamento de erros e feedbacks visuais

### ❌ **VOCÊ NÃO DEVE ALTERAR:**
- ❌ Arquivos HTML (index.html, login.html)
- ❌ Arquivo CSS (styles/main.css)
- ❌ Estrutura visual ou layout
- ❌ Classes Bootstrap ou estilos

**Os arquivos HTML/CSS já estão prontos. Você vai APENAS adicionar a lógica JavaScript.**

---

## 📋 TL;DR - RESUMO EXECUTIVO

**Objetivo:** Implementar lógica JavaScript para integração com API e autenticação

**Arquivos a criar:**
1. `js/auth.js` → Login fake com localStorage
2. `js/api.js` → Funções fetch para comunicação com API
3. `js/denuncias.js` → CRUD de denúncias e renderização
4. `js/showcase.js` → Mock de problemas resolvidos
5. `js/app.js` → Inicialização e orquestração

**Funcionalidades:**
- Login simples (localStorage)
- Criar denúncia (POST multipart/form-data)
- Listar denúncias do usuário (GET com filtros)
- Renderizar cards dinamicamente
- Mock de showcase (array fixo)
- Tratamento de erros (alertas)
- Sincronização da interface

---

## 🎯 CONTEXTO DO PROJETO

Você está implementando a **lógica JavaScript** de um sistema de denúncias urbanas. O HTML/CSS já está pronto com todos os IDs necessários.

**Sua responsabilidade:**
- ✅ Integrar formulários com a API
- ✅ Autenticação fake via localStorage
- ✅ Renderização dinâmica de dados
- ✅ Tratamento de erros
- ✅ Sincronização da interface

**Backend API:** `http://localhost:3000/api` (já funcional)

---

## 🔌 DOCUMENTAÇÃO DA API

### **URL Base:** `http://localhost:3000/api`

### **1. POST /api/denuncias** - Criar Denúncia

**Tipo:** `multipart/form-data`

**Body (FormData):**
```javascript
{
  titulo: string *obrigatório
  descricao: string *obrigatório
  categoria: string *obrigatório
  localizacao: string *obrigatório
  telefoneContato: string (opcional)
  cidadao: string *obrigatório
  usuarioEmail: string *obrigatório
  imagem: file (opcional)
}
```

**Resposta Sucesso (201):**
```json
{
  "success": true,
  "status": 201,
  "message": "Denúncia criada com sucesso",
  "data": {
    "id": "uuid",
    "titulo": "...",
    "descricao": "...",
    "categoria": "iluminacao",
    "localizacao": "...",
    "telefoneContato": "...",
    "cidadao": "...",
    "usuarioEmail": "usuario@email.com",
    "imagemUrl": "/uploads/arquivo.jpg",
    "status": "aberto",
    "criadoEm": "2025-11-14T15:30:00.000Z",
    "atualizadoEm": "2025-11-14T15:30:00.000Z"
  }
}
```

**Resposta Erro (400):**
```json
{
  "success": false,
  "status": 400,
  "message": "Erro de validação",
  "errors": ["\"titulo\" is required", "..."]
}
```

---

### **2. GET /api/denuncias** - Listar Denúncias

**Query Parameters:**
```
?usuarioEmail=usuario@email.com  (obrigatório para filtrar por usuário)
&categoria=iluminacao            (opcional)
&status=aberto                   (opcional)
&page=1                          (opcional, padrão: 1)
&limit=10                        (opcional, padrão: 10)
```

**Resposta Sucesso (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Lista de denúncias",
  "data": [
    {
      "id": "uuid",
      "titulo": "...",
      "descricao": "...",
      "categoria": "iluminacao",
      "localizacao": "...",
      "telefoneContato": "...",
      "cidadao": "...",
      "usuarioEmail": "usuario@email.com",
      "imagemUrl": "/uploads/arquivo.jpg",
      "status": "aberto",
      "criadoEm": "2025-11-14T15:30:00.000Z",
      "atualizadoEm": "2025-11-14T15:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 25,
    "itemsPerPage": 10
  }
}
```

---

### **3. GET /api/denuncias/resolvidos** - Showcase de Resolvidos

**Resposta Sucesso (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Problemas resolvidos",
  "data": [
    {
      "id": "showcase-1",
      "titulo": "Buraco corrigido",
      "descricao": "...",
      "categoria": "pavimentacao",
      "localizacao": "...",
      "imagemUrl": "/uploads/exemplo.jpg",
      "status": "resolvido",
      "resolvidoEm": "2025-11-01T10:30:00.000Z"
    }
  ]
}
```

---

### **4. PATCH /api/denuncias/:id/status** - Atualizar Status

**Tipo:** `application/json`

**Body:**
```json
{
  "status": "em_analise"
}
```

**Status válidos:** `aberto`, `em_analise`, `resolvido`

---

### **5. DELETE /api/denuncias/:id** - Excluir Denúncia

**Regra:** Apenas denúncias com status `aberto` podem ser excluídas.

**Resposta Sucesso (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Denúncia excluída com sucesso",
  "data": { "id": "uuid" }
}
```

**Resposta Erro (403):**
```json
{
  "success": false,
  "status": 403,
  "message": "Apenas denúncias com status \"aberto\" podem ser excluídas"
}
```

---

## 📁 ESTRUTURA DE ARQUIVOS A CRIAR

```
frontend/
└── js/
    ├── auth.js          ← Autenticação com localStorage
    ├── api.js           ← Funções genéricas de fetch
    ├── denuncias.js     ← Lógica de CRUD e renderização
    ├── showcase.js      ← Mock de resolvidos
    └── app.js           ← Inicialização e orquestração
```

---

## 📝 ESPECIFICAÇÕES POR ARQUIVO

### **1. js/auth.js** - Autenticação com localStorage

**Responsabilidades:**
- Login fake (simular autenticação)
- Logout
- Verificar se usuário está logado
- Atualizar navbar (mostrar/esconder elementos)

**Funções obrigatórias:**

```javascript
// Fazer login (salvar no localStorage)
function login(email, senha) {
  // Validação básica (qualquer email/senha serve)
  // Salvar no localStorage: { email, nome, loggedIn: true }
  // Atualizar navbar
  // Redirecionar para index.html
}

// Fazer logout
function logout() {
  // Limpar localStorage
  // Atualizar navbar
  // Redirecionar para login.html
}

// Verificar se está logado
function isLoggedIn() {
  // Retornar true/false baseado no localStorage
}

// Obter usuário logado
function getUser() {
  // Retornar objeto do usuário do localStorage
}

// Atualizar interface da navbar
function updateNavbar() {
  // Se logado: esconder #navLogin, mostrar #navUser, preencher #userName
  // Se deslogado: mostrar #navLogin, esconder #navUser
}
```

**IDs do HTML a manipular:**
- `#navLogin` - Botão de login (esconder quando logado)
- `#navUser` - Dropdown de usuário (mostrar quando logado)
- `#userName` - Nome do usuário
- `#btnLogout` - Botão de logout
- `#formLogin` - Formulário de login (login.html)
- `#loginEmail` - Input de email
- `#loginSenha` - Input de senha
- `#btnLogin` - Botão submit

**Comportamento:**
- Login aceita **qualquer email/senha** (fake)
- Salvar no localStorage: `{ email: "...", nome: "...", loggedIn: true }`
- Após login: redirecionar para `index.html`
- Após logout: redirecionar para `login.html`

---

### **2. js/api.js** - Funções de Comunicação com API

**Responsabilidades:**
- Funções genéricas para fetch (GET, POST, PATCH, DELETE)
- Tratamento de erros HTTP
- URL base configurável

**Funções obrigatórias:**

```javascript
const API_BASE_URL = 'http://localhost:3000/api';

// GET genérico
async function apiGet(endpoint, params = {}) {
  // Construir URL com query params
  // Fazer fetch GET
  // Tratar erros
  // Retornar response.json()
}

// POST com JSON
async function apiPost(endpoint, data) {
  // Fazer fetch POST com Content-Type: application/json
  // Tratar erros
  // Retornar response.json()
}

// POST com FormData (para upload)
async function apiPostFormData(endpoint, formData) {
  // Fazer fetch POST com FormData (não definir Content-Type)
  // Tratar erros
  // Retornar response.json()
}

// PATCH genérico
async function apiPatch(endpoint, data) {
  // Fazer fetch PATCH
  // Tratar erros
  // Retornar response.json()
}

// DELETE genérico
async function apiDelete(endpoint) {
  // Fazer fetch DELETE
  // Tratar erros
  // Retornar response.json()
}
```

**Tratamento de erros:**
```javascript
// Se response.ok === false, lançar erro com mensagem
if (!response.ok) {
  const error = await response.json();
  throw new Error(error.message || 'Erro na requisição');
}
```

---

### **3. js/denuncias.js** - CRUD e Renderização

**Responsabilidades:**
- Criar denúncia (enviar FormData)
- Listar denúncias do usuário
- Renderizar cards dinamicamente
- Filtros (categoria, status)
- Paginação
- Editar status
- Excluir denúncia
- Preview de imagem

**Funções obrigatórias:**

```javascript
// Criar nova denúncia
async function criarDenuncia(formData) {
  // Pegar email do usuário logado (auth.js)
  // Adicionar usuarioEmail ao FormData
  // Chamar apiPostFormData('/denuncias', formData)
  // Exibir alerta de sucesso
  // Limpar formulário
  // Recarregar lista
}

// Listar denúncias do usuário
async function listarDenuncias(categoria = '', status = '', page = 1) {
  // Pegar email do usuário logado
  // Montar query params
  // Chamar apiGet('/denuncias', params)
  // Renderizar cards
  // Atualizar paginação
}

// Renderizar cards na #listaDenuncias
function renderizarDenuncias(denuncias) {
  // Limpar #listaDenuncias
  // Para cada denúncia, criar card HTML
  // Adicionar event listeners nos botões (editar, excluir)
  // Inserir no DOM
}

// Criar HTML de um card
function criarCardDenuncia(denuncia) {
  // Retornar string HTML com:
  // - Imagem (se existir)
  // - Título
  // - Badge de status colorido
  // - Descrição
  // - Localização, categoria, data
  // - Botões editar/excluir
}

// Obter classe do badge por status
function getBadgeClass(status) {
  // 'aberto' → 'badge bg-danger'
  // 'em_analise' → 'badge bg-warning text-dark'
  // 'resolvido' → 'badge bg-success'
}

// Obter ícone por status
function getStatusIcon(status) {
  // 'aberto' → 'fas fa-exclamation-triangle'
  // 'em_analise' → 'fas fa-clock'
  // 'resolvido' → 'fas fa-check-circle'
}

// Formatar data (ISO para legível)
function formatarData(isoString) {
  // '2025-11-14T15:30:00.000Z' → '14/11/2025 15:30'
}

// Excluir denúncia
async function excluirDenuncia(id) {
  // Confirmar com confirm()
  // Chamar apiDelete(`/denuncias/${id}`)
  // Exibir alerta de sucesso
  // Recarregar lista
}

// Preview de imagem
function setupImagePreview() {
  // Event listener no #imagem
  // Quando selecionar arquivo, exibir preview no #imagePreview
  // Usar FileReader
}

// Exibir alerta de sucesso/erro
function exibirAlerta(tipo, mensagem) {
  // tipo: 'success' ou 'danger'
  // Criar HTML do alerta no #alertContainer
  // Auto-remover após 5 segundos
}

// Configurar filtros
function setupFiltros() {
  // Event listeners em #filterCategoria e #filterStatus
  // Ao mudar, chamar listarDenuncias() com novos filtros
}

// Configurar paginação
function renderizarPaginacao(pagination) {
  // Criar botões de paginação no #pagination
  // Página atual, anterior, próxima, última
}
```

**IDs do HTML a manipular:**
- `#formDenuncia` - Formulário de criação
- `#titulo`, `#descricao`, `#categoria`, `#localizacao`, `#telefoneContato`, `#cidadao`, `#usuarioEmail` - Campos do formulário
- `#imagem` - Input file
- `#imagePreview` - Preview da imagem
- `#btnSubmit` - Botão de envio
- `#listaDenuncias` - Container dos cards
- `#loadingSpinner` - Spinner de loading
- `#filterCategoria` - Filtro de categoria
- `#filterStatus` - Filtro de status
- `#btnRefresh` - Botão atualizar
- `#pagination` - Paginação
- `#alertContainer` - Alertas

**Comportamento:**
- Ao enviar formulário: criar denúncia, limpar form, recarregar lista
- Ao filtrar: recarregar lista com filtros
- Ao paginar: recarregar lista na página específica
- Ao excluir: confirmar, excluir, recarregar lista
- Preview de imagem: exibir thumb ao selecionar arquivo

---

### **4. js/showcase.js** - Mock de Problemas Resolvidos

**Responsabilidades:**
- Carregar dados da API de resolvidos
- Renderizar cards de showcase

**Funções obrigatórias:**

```javascript
// Carregar problemas resolvidos
async function carregarResolvidos() {
  // Chamar apiGet('/denuncias/resolvidos')
  // Renderizar cards no #showcaseList
}

// Renderizar cards de showcase
function renderizarShowcase(resolvidos) {
  // Limpar #showcaseList
  // Para cada resolvido, criar card HTML
  // Inserir no DOM
}

// Criar card de showcase
function criarCardShowcase(resolvido) {
  // Retornar HTML com:
  // - Imagem
  // - Título
  // - Badge verde "Resolvido"
  // - Descrição
  // - Localização
  // - Data de resolução
}
```

**IDs do HTML a manipular:**
- `#showcaseList` - Container dos cards de resolvidos
- `#showcaseSection` - Seção inteira (pode esconder se vazio)

**Comportamento:**
- Carregar automaticamente ao iniciar página
- Exibir apenas cards de showcase (sem botões de ação)

---

### **5. js/app.js** - Inicialização e Orquestração

**Responsabilidades:**
- Inicializar aplicação
- Configurar event listeners globais
- Orquestrar chamadas de outros módulos
- Tema claro/escuro

**Funções obrigatórias:**

```javascript
// Inicializar aplicação
function init() {
  // Verificar se está logado (auth.js)
  // Atualizar navbar
  // Se estiver em index.html:
  //   - Configurar formulário
  //   - Configurar filtros
  //   - Carregar denúncias
  //   - Carregar showcase
  //   - Setup preview de imagem
  // Se estiver em login.html:
  //   - Configurar formulário de login
  // Configurar tema
}

// Configurar tema claro/escuro
function setupTheme() {
  // Event listener no #btnThemeToggle
  // Alternar atributo data-theme no <html>
  // Trocar ícone (#iconTheme): fa-moon ↔ fa-sun
  // Salvar preferência no localStorage
  // Carregar tema salvo ao iniciar
}

// Event listener do formulário de denúncia
function setupFormDenuncia() {
  // #formDenuncia.addEventListener('submit', ...)
  // Prevenir default
  // Criar FormData
  // Chamar criarDenuncia()
}

// Event listener do botão refresh
function setupRefresh() {
  // #btnRefresh.addEventListener('click', ...)
  // Recarregar lista de denúncias
}
```

**IDs do HTML a manipular:**
- `#btnThemeToggle` - Botão de tema
- `#iconTheme` - Ícone do tema
- `#formDenuncia` - Formulário (event listener)
- `#btnRefresh` - Botão refresh

**Comportamento:**
- Ao carregar página: inicializar tudo
- Botão de tema: alternar e salvar preferência
- Formulário: enviar e sincronizar

---

## 🎯 REGRAS DE NEGÓCIO

### **1. Autenticação Fake**
- Login aceita **qualquer email/senha**
- Salvar no localStorage: `{ email, nome, loggedIn: true }`
- Nome pode ser extraído do email (antes do @) ou usar "Usuário"
- Verificar login em toda página (redirecionar se não logado)

### **2. Validação de Formulário**
- Validação HTML nativa (required, type="email", etc.)
- Não precisa validação JS adicional (backend valida)
- Exibir erros retornados pela API nos alertas

### **3. Status e Badges**
| Status | Classe | Cor | Ícone |
|--------|--------|-----|-------|
| `aberto` | `bg-danger` | Vermelho | `fas fa-exclamation-triangle` |
| `em_analise` | `bg-warning text-dark` | Amarelo | `fas fa-clock` |
| `resolvido` | `bg-success` | Verde | `fas fa-check-circle` |

### **4. Exclusão de Denúncias**
- Apenas status `aberto` pode ser excluído
- Mostrar confirmação antes de excluir
- Se erro 403, exibir mensagem da API

### **5. Preview de Imagem**
```javascript
// Exemplo de preview
const fileInput = document.getElementById('imagem');
const preview = document.getElementById('imagePreview');

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.innerHTML = `<img src="${e.target.result}" class="img-fluid rounded" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = '';
  }
});
```

### **6. Sincronização da Interface**
Após criar/editar/excluir denúncia:
1. Exibir alerta de sucesso/erro
2. Recarregar lista de denúncias
3. Limpar formulário (se criação)

### **7. Tratamento de Erros**
```javascript
try {
  const result = await criarDenuncia(formData);
  exibirAlerta('success', 'Denúncia criada com sucesso!');
} catch (error) {
  exibirAlerta('danger', error.message);
}
```

---

## 🎨 EXEMPLOS DE CÓDIGO

### **Exemplo: Criar Card de Denúncia**
```javascript
function criarCardDenuncia(denuncia) {
  const badgeClass = getBadgeClass(denuncia.status);
  const icon = getStatusIcon(denuncia.status);
  const statusTexto = denuncia.status === 'aberto' ? 'Aberto' : 
                      denuncia.status === 'em_analise' ? 'Em Análise' : 'Resolvido';
  
  const imagemHtml = denuncia.imagemUrl 
    ? `<img src="http://localhost:3000${denuncia.imagemUrl}" class="card-img-top" alt="${denuncia.titulo}">`
    : '';
  
  return `
    <div class="card mb-3 shadow-sm">
      ${imagemHtml}
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h5 class="card-title">${denuncia.titulo}</h5>
          <span class="badge ${badgeClass}">
            <i class="${icon} me-1"></i>${statusTexto}
          </span>
        </div>
        <p class="card-text">${denuncia.descricao}</p>
        <p class="text-muted small mb-3">
          <i class="fas fa-map-marker-alt me-1"></i>${denuncia.localizacao}<br>
          <i class="fas fa-tag me-1"></i>${denuncia.categoria}<br>
          <i class="fas fa-calendar me-1"></i>${formatarData(denuncia.criadoEm)}
        </p>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-danger btn-excluir" data-id="${denuncia.id}" 
                  ${denuncia.status !== 'aberto' ? 'disabled' : ''}>
            <i class="fas fa-trash"></i> Excluir
          </button>
        </div>
      </div>
    </div>
  `;
}
```

### **Exemplo: Exibir Alerta**
```javascript
function exibirAlerta(tipo, mensagem) {
  const alertContainer = document.getElementById('alertContainer');
  const alertHtml = `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
      <strong>${tipo === 'success' ? 'Sucesso!' : 'Erro!'}</strong> ${mensagem}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
  
  alertContainer.innerHTML = alertHtml;
  
  // Auto-remover após 5 segundos
  setTimeout(() => {
    alertContainer.innerHTML = '';
  }, 5000);
}
```

### **Exemplo: Listar Denúncias**
```javascript
async function listarDenuncias(categoria = '', status = '', page = 1) {
  const loadingSpinner = document.getElementById('loadingSpinner');
  const listaDenuncias = document.getElementById('listaDenuncias');
  
  try {
    // Mostrar loading
    loadingSpinner.classList.remove('d-none');
    listaDenuncias.innerHTML = '';
    
    // Pegar usuário logado
    const user = getUser();
    
    // Montar params
    const params = {
      usuarioEmail: user.email,
      page,
      limit: 10
    };
    
    if (categoria) params.categoria = categoria;
    if (status) params.status = status;
    
    // Fazer requisição
    const response = await apiGet('/denuncias', params);
    
    // Esconder loading
    loadingSpinner.classList.add('d-none');
    
    // Renderizar
    if (response.data.length === 0) {
      listaDenuncias.innerHTML = '<p class="text-muted text-center">Nenhuma denúncia encontrada.</p>';
    } else {
      renderizarDenuncias(response.data);
      renderizarPaginacao(response.pagination);
    }
    
  } catch (error) {
    loadingSpinner.classList.add('d-none');
    exibirAlerta('danger', 'Erro ao carregar denúncias: ' + error.message);
  }
}
```

---

## ✅ CHECKLIST DE ENTREGA

### 🔴 **CRÍTICO (Obrigatório)**
- [ ] `js/auth.js` com login/logout via localStorage
- [ ] `js/api.js` com funções genéricas de fetch
- [ ] `js/denuncias.js` com criação e listagem de denúncias
- [ ] `js/app.js` com inicialização
- [ ] Formulário de denúncia funcionando (POST)
- [ ] Listagem de denúncias do usuário (GET)
- [ ] Renderização dinâmica de cards
- [ ] Alertas de sucesso/erro
- [ ] Sincronização após criar denúncia

### 🟡 **IMPORTANTE (Desejável)**
- [ ] `js/showcase.js` com mock de resolvidos
- [ ] Filtros de categoria e status funcionando
- [ ] Exclusão de denúncias (DELETE)
- [ ] Preview de imagem ao selecionar arquivo
- [ ] Paginação funcional
- [ ] Botão refresh
- [ ] Tema claro/escuro com localStorage
- [ ] Navbar atualizada (login/logout)

### 🟢 **OPCIONAL (Refinamento)**
- [ ] Modal de edição de denúncia
- [ ] Atualização de status (PATCH)
- [ ] Validação JS adicional
- [ ] Loading states em botões
- [ ] Debounce nos filtros
- [ ] Animações de transição

---

## 📌 OBSERVAÇÕES FINAIS

### ✅ **FAÇA:**
- Use `async/await` para requisições
- Trate erros com `try/catch`
- Valide se usuário está logado antes de operações
- Exiba loading states durante requisições
- Limpe formulários após sucesso
- Use `console.log()` para debug
- Comente código complexo

### ❌ **NÃO FAÇA:**
- Alterar HTML/CSS existente
- Criar novas páginas
- Modificar estrutura de pastas
- Implementar autenticação real (apenas fake)
- Complicar desnecessariamente

---

## 🚀 ORDEM DE IMPLEMENTAÇÃO SUGERIDA

1. **auth.js** → Base para tudo
2. **api.js** → Comunicação com backend
3. **app.js** → Inicialização básica
4. **denuncias.js** → CRUD completo
5. **showcase.js** → Mock de resolvidos

---

## 💡 DICAS

### **localStorage API:**
```javascript
// Salvar
localStorage.setItem('user', JSON.stringify({ email, nome, loggedIn: true }));

// Ler
const user = JSON.parse(localStorage.getItem('user'));

// Remover
localStorage.removeItem('user');
```

### **FormData API:**
```javascript
const form = document.getElementById('formDenuncia');
const formData = new FormData(form);

// Adicionar campo extra
formData.append('usuarioEmail', user.email);

// Enviar
await apiPostFormData('/denuncias', formData);
```

### **URLSearchParams:**
```javascript
const params = new URLSearchParams({
  usuarioEmail: 'user@email.com',
  categoria: 'iluminacao',
  page: 1
});

const url = `${API_BASE_URL}/denuncias?${params}`;
```
