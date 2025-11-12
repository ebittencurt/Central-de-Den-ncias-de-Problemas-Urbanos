# 🏆 Showcase de Problemas Resolvidos

## Visão Geral

Este documento descreve o endpoint de **showcase/propaganda** que exibe problemas urbanos que foram resolvidos pela prefeitura. Este recurso serve para mostrar aos cidadãos que as denúncias são tratadas e resolvidas.

---

## 🎯 Objetivo

Criar uma **área de destaque** no site que mostre:

1. ✅ Problemas que foram resolvidos
2. 📸 Fotos dos locais após correção
3. 📅 Data de resolução
4. 📍 Local onde foi resolvido

**Uso no Frontend:**
- Página inicial com "Problemas Resolvidos"
- Carrossel de sucessos
- Galeria de antes/depois
- Propaganda institucional

---

## 📡 Endpoint

### GET /api/denuncias/resolvidos

**Descrição:** Retorna uma lista de problemas urbanos que foram resolvidos (para showcase/propaganda)

**Método:** `GET`

**URL:** `http://localhost:3000/api/denuncias/resolvidos`

**Headers:** Nenhum header especial necessário

**Query Parameters:** Nenhum

---

## 📥 Resposta

### Status 200 OK

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
    {
      "id": "showcase-2",
      "titulo": "Iluminação pública restaurada",
      "descricao": "Substituição de 15 postes com lâmpadas LED de alta eficiência",
      "categoria": "iluminacao",
      "localizacao": "Rua das Flores - Bairro Jardim",
      "imagemUrl": "/uploads/exemplo-iluminacao-resolvida.jpg",
      "status": "resolvido",
      "resolvidoEm": "2025-10-28T14:20:00.000Z"
    },
    {
      "id": "showcase-3",
      "titulo": "Limpeza de terreno baldio concluída",
      "descricao": "Remoção de entulho e lixo acumulado, área cercada para evitar novos descartes",
      "categoria": "limpeza",
      "localizacao": "Rua Santos Dumont, esquina com Rua 7 de Setembro",
      "imagemUrl": "/uploads/exemplo-limpeza-resolvida.jpg",
      "status": "resolvido",
      "resolvidoEm": "2025-11-05T09:15:00.000Z"
    },
    {
      "id": "showcase-4",
      "titulo": "Sinalização de trânsito instalada",
      "descricao": "Novas placas de pare e faixas de pedestres pintadas para maior segurança",
      "categoria": "sinalizacao",
      "localizacao": "Cruzamento Av. Brasil com Rua Central",
      "imagemUrl": "/uploads/exemplo-sinalizacao-resolvida.jpg",
      "status": "resolvido",
      "resolvidoEm": "2025-10-20T11:45:00.000Z"
    }
  ]
}
```

---

## 🧪 Testando

### Com PowerShell

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/denuncias/resolvidos" -Method Get
```

### Com cURL

```bash
curl http://localhost:3000/api/denuncias/resolvidos
```

### Com Fetch API (JavaScript)

```javascript
fetch('http://localhost:3000/api/denuncias/resolvidos')
  .then(response => response.json())
  .then(data => {
    console.log('Problemas resolvidos:', data.data);
  });
```

---

## 🎨 Integração Frontend

### Exemplo 1: Lista Simples

```html
<div id="showcase-resolvidos">
  <h2>Problemas Resolvidos 🎉</h2>
  <div id="lista"></div>
</div>

<script>
  async function carregarResolvidos() {
    const response = await fetch('http://localhost:3000/api/denuncias/resolvidos');
    const result = await response.json();
    
    const lista = document.getElementById('lista');
    
    result.data.forEach(item => {
      const card = `
        <div class="card-resolvido">
          <img src="http://localhost:3000${item.imagemUrl}" alt="${item.titulo}">
          <h3>${item.titulo}</h3>
          <p>${item.descricao}</p>
          <span class="categoria">${item.categoria}</span>
          <span class="local">📍 ${item.localizacao}</span>
          <span class="data">✅ Resolvido em ${new Date(item.resolvidoEm).toLocaleDateString()}</span>
        </div>
      `;
      lista.innerHTML += card;
    });
  }
  
  carregarResolvidos();
</script>
```

---

### Exemplo 2: Carrossel de Sucessos

```html
<div class="carrossel-showcase">
  <h2>Veja o que já resolvemos! 🏆</h2>
  <div id="carrossel"></div>
  <button id="prev">←</button>
  <button id="next">→</button>
</div>

<style>
  .carrossel-showcase {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .slide {
    display: none;
    text-align: center;
  }
  
  .slide.active {
    display: block;
  }
  
  .slide img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 10px;
  }
</style>

<script>
  let slides = [];
  let currentSlide = 0;
  
  async function iniciarCarrossel() {
    const response = await fetch('http://localhost:3000/api/denuncias/resolvidos');
    const result = await response.json();
    slides = result.data;
    
    const carrossel = document.getElementById('carrossel');
    
    slides.forEach((item, index) => {
      const slide = `
        <div class="slide ${index === 0 ? 'active' : ''}">
          <img src="http://localhost:3000${item.imagemUrl}" alt="${item.titulo}">
          <h3>${item.titulo}</h3>
          <p>${item.descricao}</p>
          <p><strong>${item.localizacao}</strong></p>
        </div>
      `;
      carrossel.innerHTML += slide;
    });
  }
  
  document.getElementById('next').addEventListener('click', () => {
    document.querySelectorAll('.slide')[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    document.querySelectorAll('.slide')[currentSlide].classList.add('active');
  });
  
  document.getElementById('prev').addEventListener('click', () => {
    document.querySelectorAll('.slide')[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    document.querySelectorAll('.slide')[currentSlide].classList.add('active');
  });
  
  iniciarCarrossel();
</script>
```

---

### Exemplo 3: Grid de Galeria

```html
<section class="galeria-resolvidos">
  <h2>Problemas Resolvidos pela Nossa Cidade 🌟</h2>
  <div class="grid" id="grid"></div>
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  
  .card-galeria {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: transform 0.3s;
  }
  
  .card-galeria:hover {
    transform: translateY(-5px);
  }
  
  .card-galeria img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .card-content {
    padding: 15px;
  }
  
  .badge {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .badge.pavimentacao { background: #3b82f6; color: white; }
  .badge.iluminacao { background: #fbbf24; color: black; }
  .badge.limpeza { background: #10b981; color: white; }
  .badge.sinalizacao { background: #ef4444; color: white; }
</style>

<script>
  async function carregarGaleria() {
    const response = await fetch('http://localhost:3000/api/denuncias/resolvidos');
    const result = await response.json();
    
    const grid = document.getElementById('grid');
    
    result.data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card-galeria';
      card.innerHTML = `
        <img src="http://localhost:3000${item.imagemUrl}" alt="${item.titulo}">
        <div class="card-content">
          <span class="badge ${item.categoria}">${item.categoria}</span>
          <h3>${item.titulo}</h3>
          <p>${item.descricao}</p>
          <p><small>📍 ${item.localizacao}</small></p>
          <p><small>✅ ${new Date(item.resolvidoEm).toLocaleDateString('pt-BR')}</small></p>
        </div>
      `;
      grid.appendChild(card);
    });
  }
  
  carregarGaleria();
</script>
```

---

## 🛠️ Implementação Técnica

### Controller (src/controllers/denuncias.controller.js)

```javascript
exports.getResolvidos = (req, res, next) => {
  try {
    // Mock de problemas resolvidos para showcase/propaganda
    const resolvidos = [
      {
        id: 'showcase-1',
        titulo: 'Buraco na Avenida Principal corrigido',
        descricao: 'Após denúncia dos moradores, a prefeitura realizou o recapeamento completo da via',
        categoria: 'pavimentacao',
        localizacao: 'Avenida Principal, 1500 - Centro',
        imagemUrl: '/uploads/exemplo-buraco-resolvido.jpg',
        status: 'resolvido',
        resolvidoEm: '2025-11-01T10:30:00.000Z'
      },
      // ... outros itens
    ];

    return success(res, 200, 'Problemas resolvidos', resolvidos);
  } catch (err) {
    next(err);
  }
};
```

### Rota (src/routes/denuncias.routes.js)

```javascript
router.get('/resolvidos', controller.getResolvidos);
```

---

## 📝 Observações Importantes

### 1. **Dados Mockados (Atualmente)**

Por enquanto, os dados são **estáticos** (mock) para demonstração. Em produção, você deve:

```javascript
// Substituir por consulta real ao banco de dados
exports.getResolvidos = async (req, res, next) => {
  try {
    const resolvidos = await store.find({ status: 'resolvido' }, { limit: 10 });
    return success(res, 200, 'Problemas resolvidos', resolvidos.data);
  } catch (err) {
    next(err);
  }
};
```

### 2. **Imagens de Exemplo**

As URLs de imagem no mock (`/uploads/exemplo-*.jpg`) são **fictícias**. Para testar:

1. Adicione imagens reais na pasta `uploads/`
2. Renomeie para os nomes usados no mock
3. Ou altere os nomes no controller

### 3. **Ordenação por Data**

Em produção, ordene por data de resolução (mais recentes primeiro):

```javascript
const resolvidos = await store.find({ status: 'resolvido' })
  .sort((a, b) => new Date(b.resolvidoEm) - new Date(a.resolvidoEm))
  .slice(0, 10); // Limitar a 10 itens
```

### 4. **Cache**

Para melhor performance, considere cachear esta resposta:

```javascript
const cache = require('node-cache');
const showcaseCache = new cache({ stdTTL: 3600 }); // 1 hora

exports.getResolvidos = (req, res, next) => {
  try {
    let resolvidos = showcaseCache.get('showcase');
    
    if (!resolvidos) {
      // Buscar dados do banco
      resolvidos = [...]; // seus dados
      showcaseCache.set('showcase', resolvidos);
    }
    
    return success(res, 200, 'Problemas resolvidos', resolvidos);
  } catch (err) {
    next(err);
  }
};
```

---

## 🚀 Melhorias Futuras

- [ ] Substituir mock por dados reais do banco
- [ ] Adicionar paginação (`?page=1&limit=10`)
- [ ] Filtrar por categoria (`?categoria=pavimentacao`)
- [ ] Adicionar campo "antes/depois" (2 imagens)
- [ ] Implementar cache com Redis
- [ ] Adicionar contador de visualizações
- [ ] Permitir "curtir" problemas resolvidos

---

## 🎯 Casos de Uso

### 1. **Página Inicial**

Mostrar os 4 problemas mais recentes resolvidos como destaque.

### 2. **Seção "Nossa Atuação"**

Galeria completa de todos os problemas resolvidos.

### 3. **Relatório Mensal**

Contar quantos problemas foram resolvidos no mês.

### 4. **Redes Sociais**

Compartilhar cards com "antes/depois" automaticamente.

---

**Última atualização:** 2025-11-13
