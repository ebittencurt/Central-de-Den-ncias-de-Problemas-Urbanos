# 🎨 PROMPT PARA DESENVOLVIMENTO DO FRONTEND
## Central de Denúncias de Problemas Urbanos

---

## 🚨 RESTRIÇÕES ABSOLUTAS - LEIA PRIMEIRO

### ✅ **VOCÊ DEVE CRIAR APENAS:**
- Arquivos HTML (`index.html`, `login.html`)
- Arquivo CSS (`styles/main.css`)
- Estrutura visual completa e responsiva com Bootstrap 5.3
- Layout, paleta de cores, componentes visuais

### ❌ **VOCÊ NÃO DEVE CRIAR:**
- ❌ Arquivos JavaScript (auth.js, api.js, denuncias.js, showcase.js, app.js)
- ❌ Lógica de integração com API
- ❌ Funções fetch/axios
- ❌ Event listeners
- ❌ Manipulação do DOM via JavaScript
- ❌ Lógica de autenticação

**Os exemplos de JavaScript neste documento são APENAS para referência da etapa posterior de desenvolvimento.**

---

## 📋 TL;DR - RESUMO EXECUTIVO

**Objetivo:** Criar interface HTML/CSS para sistema de denúncias urbanas

**Tecnologias:** Bootstrap 5.3 + Font Awesome 6 + CSS customizado

**Páginas:** `index.html` (principal) + `login.html` (login visual)

**Características:**
- Layout responsivo (mobile-first: col-12 → desktop: col-lg-6)
- Modo claro/escuro (variáveis CSS)
- Formulário de denúncia com validação visual
- Cards de denúncias com badges de status
- Navbar com estados (logado/deslogado)
- Preview de upload de imagem (apenas visual)
- Tema visual moderno e acessível

**Backend:** API REST em `http://localhost:3000/api` (já funcional)

---

## 🎯 CONTEXTO DO PROJETO

Você está criando a **interface visual** de um sistema onde cidadãos reportam problemas urbanos (buracos, iluminação, lixo, sinalização). 

**Escopo do trabalho:**
- **Sua responsabilidade:** HTML + CSS + Bootstrap → Layout e design completo
- **Etapa posterior:** JavaScript → Integração com API e lógica

O backend já existe e está funcionando, mas **você não vai integrá-lo agora**. Apenas prepare a estrutura HTML com IDs corretos para futura integração.

---

## 🔌 INFORMAÇÕES DA API (PARA REFERÊNCIA)

### ⚠️ **ATENÇÃO:** Esta seção é para você entender o contexto. **NÃO implemente JavaScript ou fetch().**

**URL Base:** `http://localhost:3000/api`

**Endpoints principais:**
- `POST /api/denuncias` - Criar denúncia (multipart/form-data com upload)
- `GET /api/denuncias?usuarioEmail=...&categoria=...&status=...` - Listar
- `GET /api/denuncias/resolvidos` - Showcase de resolvidos
- `PATCH /api/denuncias/:id/status` - Atualizar status
- `DELETE /api/denuncias/:id` - Excluir (só se status=aberto)

**Campos do formulário (para você criar os inputs):**
```javascript
{
  titulo: string *obrigatório
  descricao: string *obrigatório
  categoria: string *obrigatório (iluminacao, calcada, lixo, transito, outros)
  localizacao: string *obrigatório
  telefoneContato: string opcional
  cidadao: string *obrigatório
  usuarioEmail: string *obrigatório (email válido)
  imagem: file opcional (jpeg, jpg, png, gif, webp - max 5MB)
}
```

**Status possíveis:**
- `aberto` → Badge vermelho (danger) → Denúncia recém-criada
- `em_analise` → Badge amarelo (warning) → Sendo avaliada
- `resolvido` → Badge verde (success) → Problema solucionado

**Imagens da API:** `http://localhost:3000/uploads/nome-arquivo.jpg`

---

## 🎨 ESPECIFICAÇÕES DE DESIGN

### **1. PALETA DE CORES**

#### Modo Claro (padrão)
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
  --shadow: rgba(0, 0, 0, 0.1);
}
```

#### Modo Escuro
```css
[data-theme="dark"] {
  --primary-color: #3b82f6;
  --secondary-color: #94a3b8;
  --success-color: #34d399;
  --warning-color: #fbbf24;
  --danger-color: #f87171;
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --border-color: #334155;
  --shadow: rgba(0, 0, 0, 0.5);
}
```

**Troca de tema:** Adicionar atributo `data-theme="light"` ou `data-theme="dark"` no `<html>`. A lógica JavaScript será implementada posteriormente.

### **2. TIPOGRAFIA**
- Fonte padrão: System fonts do Bootstrap
- Títulos: `fw-bold`, tamanhos variados (h1-h5)
- Ícones: Font Awesome 6.4.0

### **3. ESPAÇAMENTOS PADRÃO**
- Margens: `mb-3`, `mb-4`, `py-4`, `py-5`
- Padding interno de cards: `p-4`, `p-5`
- Gap entre elementos: `gap-2`

### **4. EFEITOS VISUAIS**
```css
/* Transições suaves */
* {
  transition: all 0.3s ease;
}

/* Cards com hover */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px var(--shadow);
}

/* Botões com hover */
.btn-primary:hover {
  transform: scale(1.05);
}
```

---

## 📐 ESTRUTURA DAS PÁGINAS

### **PÁGINA 1: index.html (Principal)**

#### Layout geral:
```
┌─────────────────────────────────────┐
│         NAVBAR (sticky-top)         │
├─────────────────────────────────────┤
│         CONTAINER (py-5)            │
│  ┌──────────────┬──────────────┐   │
│  │  FORMULÁRIO  │    LISTA     │   │
│  │  (col-lg-6)  │  (col-lg-6)  │   │
│  │              │              │   │
│  └──────────────┴──────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   SHOWCASE (Resolvidos)     │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
│           FOOTER                    │
└─────────────────────────────────────┘
```

#### Componentes obrigatórios:

**A) NAVBAR**
- Logo: `<i class="fas fa-city"></i> Central de Denúncias`
- Links: Home, Showcase
- Botão tema: `#btnThemeToggle` com ícone `#iconTheme` (fas fa-moon/fa-sun)
- **Estado deslogado:** Botão "Login" (`#navLogin`) visível
- **Estado logado:** Dropdown de usuário (`#navUser`) com classe `d-none` (será controlado por JavaScript posteriormente)
  - Nome do usuário: `#userName`
  - Botão sair: `#btnLogout`
- Responsiva: `navbar-expand-lg` com botão hamburguer

**B) FORMULÁRIO DE DENÚNCIA** (`#formDenuncia`)

IDs obrigatórios dos campos:
- `#titulo` - Input text
- `#descricao` - Textarea (rows="3")
- `#categoria` - Select (iluminacao, calcada, lixo, transito, outros)
- `#localizacao` - Input text
- `#telefoneContato` - Input tel (opcional)
- `#cidadao` - Input text
- `#usuarioEmail` - Input email
- `#imagem` - Input file (accept="image/*")
- `#imagePreview` - Div para preview da imagem (vazia inicialmente)
- `#btnSubmit` - Botão submit

Validação visual:
- Todos os campos obrigatórios com atributo `required`
- Divs com classe `invalid-feedback` abaixo de cada campo

**C) LISTA DE DENÚNCIAS**

IDs obrigatórios:
- `#filterCategoria` - Select para filtrar por categoria
- `#filterStatus` - Select para filtrar por status
- `#btnRefresh` - Botão atualizar lista
- `#loadingSpinner` - Div com spinner (inicialmente `d-none`)
- `#listaDenuncias` - Div onde serão renderizados os cards
- `#pagination` - Nav com paginação Bootstrap

**Estrutura de um card de denúncia** (exemplo visual, não precisa gerar dados):
```html
<div class="card mb-3">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-start mb-2">
      <h5 class="card-title">Título da denúncia</h5>
      <span class="badge bg-danger">
        <i class="fas fa-exclamation-triangle me-1"></i>Aberto
      </span>
    </div>
    <p class="card-text">Descrição...</p>
    <p class="text-muted small">
      <i class="fas fa-map-marker-alt me-1"></i>Localização<br>
      <i class="fas fa-tag me-1"></i>Categoria<br>
      <i class="fas fa-calendar me-1"></i>Data
    </p>
    <div class="d-flex gap-2">
      <button class="btn btn-sm btn-warning">
        <i class="fas fa-edit"></i> Editar
      </button>
      <button class="btn btn-sm btn-danger">
        <i class="fas fa-trash"></i> Excluir
      </button>
    </div>
  </div>
</div>
```

**D) SEÇÃO SHOWCASE** (`#showcaseSection`)
- Card grande com header verde (bg-success)
- Título: "Problemas Resolvidos" com ícone troféu
- Div `#showcaseList` para renderizar cards de resolvidos

**E) MODAL DE EDIÇÃO** (`#modalEdit`)
- Bootstrap modal com formulário de edição
- IDs: `#editId`, `#editTitulo`, `#editDescricao`, `#editStatus`
- Botão salvar: `#btnSaveEdit`

**F) FOOTER**
- Fundo escuro (bg-dark text-white)
- Texto centralizado com ícone

**G) CONTAINER DE ALERTAS** (`#alertContainer`)
- Div no topo (após navbar) para alertas de sucesso/erro
- Inicialmente vazio

---

### **PÁGINA 2: login.html (Login Visual)**

⚠️ **IMPORTANTE:** O login é **APENAS VISUAL** neste momento.

#### Características:
- Layout centralizado vertical e horizontal (`min-vh-100`)
- Card de login com sombra (`shadow-lg`)
- Formulário (`#formLogin`) com:
  - `#loginEmail` - Input email
  - `#loginSenha` - Input password
  - `#rememberMe` - Checkbox "Lembrar-me"
  - `#btnLogin` - Botão submit
- Ícone de cidade grande no topo
- Card de "Credenciais Demo" (apenas decorativo):
  ```
  Email: demo@email.com
  Senha: 123456
  ```
- Link "Voltar" para index.html

**⚠️ NÃO:**
- ❌ Criar endpoint `/api/login` (não existe)
- ❌ Fazer fetch de autenticação
- ❌ Implementar lógica de localStorage
- ❌ Validação com JavaScript

A autenticação será implementada via localStorage em etapa posterior.

---

## 📱 RESPONSIVIDADE

### Breakpoints Bootstrap:
- **Mobile** (< 768px): 1 coluna (`col-12`)
- **Desktop** (≥ 992px): 2 colunas (`col-lg-6`)

### Comportamentos:
- Navbar: colapsa em mobile com botão hamburguer
- Formulário e lista: empilham verticalmente em mobile
- Cards: largura completa em mobile, 50% em desktop
- Botões: `d-grid` em mobile, inline em desktop

---

## 🎯 REGRAS DE NEGÓCIO (Para contexto visual)

### **Validações do Formulário:**
- Título: mínimo 3 caracteres
- Descrição: mínimo 10 caracteres
- Categoria: obrigatória (select com opções)
- Email: formato válido
- Imagem: jpeg, jpg, png, gif, webp (max 5MB)

### **Badges de Status:**
| Status | Classe Bootstrap | Cor | Ícone |
|--------|------------------|-----|-------|
| `aberto` | `badge bg-danger` | Vermelho | fas fa-exclamation-triangle |
| `em_analise` | `badge bg-warning text-dark` | Amarelo | fas fa-clock |
| `resolvido` | `badge bg-success` | Verde | fas fa-check-circle |

### **Regra de Exclusão:**
Apenas denúncias com status "aberto" podem ser excluídas (botão vermelho). Use tooltip ou texto explicativo.

---

## 📂 ESTRUTURA DE ARQUIVOS A CRIAR

```
frontend/
├── index.html              ← Página principal
├── login.html              ← Página de login visual
└── styles/
    └── main.css           ← CSS customizado
```

**NÃO crie:**
- Pasta `js/` (será criada em etapa posterior)
- Arquivos JavaScript

---

## 🎨 CSS CUSTOMIZADO (styles/main.css)

### Obrigatório incluir:

```css
/* Variáveis de tema */
:root { /* ... */ }
[data-theme="dark"] { /* ... */ }

/* Reset e base */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Transições suaves */
* {
  transition: all 0.3s ease;
}

/* Navbar customizada */
.navbar {
  background: linear-gradient(135deg, var(--primary-color), #1e40af);
  box-shadow: 0 4px 12px var(--shadow);
}

/* Cards */
.card {
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px var(--shadow);
  border-radius: 12px;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px var(--shadow);
}

/* Botões */
.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), #1d4ed8);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}

/* Formulários */
.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(37, 99, 235, 0.25);
}

/* Preview de imagem */
#imagePreview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  margin-top: 10px;
}

/* Badge com pulso (opcional) */
.badge-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Loading spinner centralizado */
#loadingSpinner {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
```

---

## 📸 UPLOAD DE IMAGEM (Apenas Preview Visual)

### **SEU ESCOPO:**
- ✅ Campo `<input type="file" id="imagem" name="imagem" accept="image/*">`
- ✅ Div `#imagePreview` para mostrar preview (CSS)
- ✅ Estilização do campo de upload

### **NÃO É SEU ESCOPO:**
- ❌ Código JavaScript para preview (FileReader)
- ❌ Enviar arquivo via FormData
- ❌ Fazer fetch multipart
- ❌ Validação de tamanho/tipo

**Dica:** Deixe o `#imagePreview` vazio. Será preenchido dinamicamente com `<img>` via JavaScript na etapa posterior.

---

## 🔐 ESTADOS DA NAVBAR (Login/Logout)

### **Estado Inicial (Padrão no HTML):**
```html
<!-- Botão Login: VISÍVEL -->
<li class="nav-item" id="navLogin">
  <a class="btn btn-light ms-2" href="login.html">
    <i class="fas fa-sign-in-alt me-1"></i>Login
  </a>
</li>

<!-- Dropdown Usuário: ESCONDIDO -->
<li class="nav-item dropdown d-none" id="navUser">
  <!-- ... -->
</li>
```

### **Controle de Visibilidade:**
- Use classes Bootstrap: `d-none` (esconder), `d-block` (mostrar)
- **NÃO escreva JavaScript** para alternar
- A alternância entre estados será implementada via JavaScript posteriormente

---

## ✅ CHECKLIST DE ENTREGA (Priorizado)

### 🔴 **CRÍTICO (Obrigatório)**
- [ ] `index.html` com estrutura completa
- [ ] `login.html` com formulário de login visual
- [ ] `styles/main.css` com variáveis de tema e estilos customizados
- [ ] Navbar responsiva com logo, links e botão de tema
- [ ] Formulário de denúncia com todos os campos e IDs corretos
- [ ] Cards de denúncia (exemplo visual) com badges de status
- [ ] Layout responsivo (col-lg-6 col-12)
- [ ] Paleta de cores (modo claro) implementada
- [ ] Bootstrap 5.3 e Font Awesome 6 linkados

### 🟡 **IMPORTANTE (Desejável)**
- [ ] Modo escuro (variáveis CSS dark theme)
- [ ] Filtros de categoria e status
- [ ] Paginação Bootstrap estilizada
- [ ] Modal de edição funcional
- [ ] Seção showcase de resolvidos
- [ ] Footer estilizado
- [ ] Container de alertas (`#alertContainer`)
- [ ] Loading spinner (`#loadingSpinner`)

### 🟢 **OPCIONAL (Refinamento)**
- [ ] Hover effects nos cards
- [ ] Transições suaves (CSS)
- [ ] Badge com animação de pulso
- [ ] Tooltips em botões
- [ ] Gradientes nos botões
- [ ] Sombras customizadas

---

## 📁 ESTRUTURA DE CAMINHOS

### **Durante Desenvolvimento:**
- Frontend servido por Live Server: `http://localhost:5500`
- Backend rodando em: `http://localhost:3000`
- Imagens da API: `http://localhost:3000/uploads/arquivo.jpg`

### **Referências no HTML:**
```html
<!-- CSS (caminho relativo) -->
<link href="styles/main.css" rel="stylesheet">

<!-- Bootstrap (CDN) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Font Awesome (CDN) -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

<!-- Imagens da API (URL completa) -->
<img src="http://localhost:3000/uploads/exemplo.jpg" class="card-img-top">

<!-- Scripts (comentados, pois não criará agora) -->
<!-- <script src="js/auth.js"></script> -->
<!-- <script src="js/api.js"></script> -->
<!-- <script src="js/denuncias.js"></script> -->
```

---

## 🎬 EXEMPLOS DE COMPONENTES

### **Alerta de Sucesso** (HTML de referência)
```html
<div class="alert alert-success alert-dismissible fade show" role="alert">
  <i class="fas fa-check-circle me-2"></i>
  <strong>Sucesso!</strong> Denúncia criada com sucesso.
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

### **Alerta de Erro**
```html
<div class="alert alert-danger alert-dismissible fade show" role="alert">
  <i class="fas fa-exclamation-circle me-2"></i>
  <strong>Erro!</strong> Falha ao criar denúncia. Tente novamente.
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

### **Spinner de Loading**
```html
<div id="loadingSpinner" class="text-center py-5 d-none">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <p class="mt-2 text-muted">Carregando denúncias...</p>
</div>
```

---

## 📌 OBSERVAÇÕES FINAIS

### ✅ **FAÇA:**
- Use **variáveis CSS** para cores (`:root` e `[data-theme="dark"]`)
- Adicione `data-theme="light"` no `<html>` por padrão
- Use classes utilitárias do Bootstrap sempre que possível
- Mantenha consistência nos espaçamentos (mb-3, mb-4, py-4)
- Adicione comentários HTML nas seções principais
- Use ícones Font Awesome em botões e títulos

### ❌ **NÃO FAÇA:**
- Criar arquivos JavaScript
- Implementar lógica de negócio
- Fazer requisições HTTP
- Adicionar event listeners
- Implementar autenticação real
- Inventar endpoints que não existem

---

## 🚀 PRÓXIMOS PASSOS (Após sua conclusão)

Na etapa posterior de desenvolvimento, serão criados:
1. `js/auth.js` - Autenticação via localStorage
2. `js/api.js` - Funções de comunicação com a API
3. `js/denuncias.js` - Lógica de CRUD de denúncias
4. `js/showcase.js` - Carregamento de problemas resolvidos
5. `js/app.js` - Inicialização e gerenciamento de eventos
6. Integração de todos os IDs com a lógica JavaScript

---

## 💡 INSPIRAÇÃO VISUAL

Seu design deve transmitir:
- 🏛️ **Confiança:** Cores sólidas, layout limpo, hierarquia clara
- ⚡ **Modernidade:** Gradientes sutis, sombras suaves, transições
- 📱 **Acessibilidade:** Responsivo, contrastes adequados, mobile-first
- 🎯 **Clareza:** Informações bem organizadas, CTAs destacados

**Referências de estilo:**
- Tailwind UI (componentes limpos)
- Material Design (elevação e sombras)
- Bootstrap 5 (utilities e spacing)

---

## ✨ EXEMPLO MÍNIMO DE index.html

```html
<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Central de Denúncias</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  <link href="styles/main.css" rel="stylesheet">
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top" id="mainNavbar">
    <!-- Implemente aqui conforme especificações -->
  </nav>

  <div class="container py-5">
    
    <!-- ALERTAS -->
    <div id="alertContainer"></div>

    <div class="row">
      
      <!-- FORMULÁRIO -->
      <div class="col-lg-6 col-12 mb-4">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0"><i class="fas fa-bullhorn me-2"></i>Nova Denúncia</h5>
          </div>
          <div class="card-body">
            <form id="formDenuncia" enctype="multipart/form-data">
              <!-- Implemente campos conforme especificações -->
            </form>
          </div>
        </div>
      </div>

      <!-- LISTA -->
      <div class="col-lg-6 col-12 mb-4">
        <div class="card shadow-sm">
          <div class="card-header bg-secondary text-white">
            <h5 class="mb-0"><i class="fas fa-list me-2"></i>Minhas Denúncias</h5>
          </div>
          <div class="card-body">
            <!-- Filtros, loading, lista, paginação -->
          </div>
        </div>
      </div>

    </div>

    <!-- SHOWCASE -->
    <div class="row mt-5" id="showcaseSection">
      <!-- Implemente conforme especificações -->
    </div>

  </div>

  <!-- MODAL EDIÇÃO -->
  <!-- Implemente conforme especificações -->

  <!-- FOOTER -->
  <footer class="bg-dark text-white text-center py-4 mt-5">
    <p class="mb-0"><i class="fas fa-city me-2"></i>Central de Denúncias © 2025</p>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  
  <!-- Scripts da aplicação serão adicionados na etapa posterior -->
  <!-- <script src="js/auth.js"></script> -->
  <!-- <script src="js/api.js"></script> -->
  <!-- <script src="js/denuncias.js"></script> -->
  <!-- <script src="js/showcase.js"></script> -->
  <!-- <script src="js/app.js"></script> -->

</body>
</html>
```

---

**BOA SORTE! 🚀**

Se tiver dúvidas sobre IDs, classes ou estrutura, consulte este documento. Foque em criar um layout **bonito, responsivo e bem estruturado**. A lógica JavaScript será implementada em etapa posterior.
