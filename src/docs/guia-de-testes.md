# Guia de Testes - API Central de Denúncias

## Status Atual
✅ **Servidor rodando em**: `http://localhost:3000`  
✅ **Endpoint base**: `http://localhost:3000/api/denuncias`  
✅ **Primeira requisição testada**: GET retornou lista vazia com sucesso

---

## Comandos de Teste (PowerShell)

### 1️⃣ GET - Listar todas as denúncias (vazio inicialmente)

```powershell
curl http://localhost:3000/api/denuncias
```

**Resposta esperada**:
```json
{
  "success": true,
  "status": 200,
  "message": "Lista de denúncias",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 0,
    "totalPages": 1
  }
}
```

---

### 2️⃣ POST - Criar primeira denúncia

```powershell
curl -X POST http://localhost:3000/api/denuncias `
  -H "Content-Type: application/json" `
  -d '{\"titulo\":\"Buraco na Rua Principal\",\"descricao\":\"Buraco grande e profundo causando risco de acidentes\",\"categoria\":\"pavimentacao\",\"localizacao\":\"Rua Principal, 500 - Centro\",\"telefoneContato\":\"11999887766\",\"cidadao\":\"João Silva\",\"usuarioEmail\":\"joao@example.com\"}'
```

**Resposta esperada (201)**:
```json
{
  "success": true,
  "status": 201,
  "message": "Denúncia criada com sucesso",
  "data": {
    "id": "uuid-aqui",
    "titulo": "Buraco na Rua Principal",
    "descricao": "Buraco grande e profundo causando risco de acidentes",
    "categoria": "pavimentacao",
    "localizacao": "Rua Principal, 500 - Centro",
    "telefoneContato": "11999887766",
    "cidadao": "João Silva",
    "usuarioEmail": "joao@example.com",
    "status": "aberto",
    "criadoEm": "2025-11-12T...",
    "atualizadoEm": "2025-11-12T..."
  }
}
```

**⚠️ IMPORTANTE**: Copie o `id` retornado para usar nos próximos testes!

---

### 3️⃣ POST - Criar segunda denúncia (usuário diferente)

```powershell
curl -X POST http://localhost:3000/api/denuncias `
  -H "Content-Type: application/json" `
  -d '{\"titulo\":\"Iluminação pública queimada\",\"descricao\":\"Poste de iluminação quebrado há 2 semanas\",\"categoria\":\"iluminacao\",\"localizacao\":\"Avenida Brasil, 1200\",\"telefoneContato\":\"11987654321\",\"cidadao\":\"Maria Santos\",\"usuarioEmail\":\"maria@example.com\"}'
```

---

### 4️⃣ POST - Criar terceira denúncia (mesmo usuário do João)

```powershell
curl -X POST http://localhost:3000/api/denuncias `
  -H "Content-Type: application/json" `
  -d '{\"titulo\":\"Lixo acumulado\",\"descricao\":\"Lixo não coletado há uma semana\",\"categoria\":\"limpeza\",\"localizacao\":\"Rua das Flores, 80\",\"cidadao\":\"João Silva\",\"usuarioEmail\":\"joao@example.com\"}'
```

---

### 5️⃣ GET - Listar todas as denúncias (agora com dados)

```powershell
curl http://localhost:3000/api/denuncias
```

**Resposta esperada**: Array com 3 denúncias

---

### 6️⃣ GET - Filtrar por email do usuário (João)

```powershell
curl "http://localhost:3000/api/denuncias?usuarioEmail=joao@example.com"
```

**Resposta esperada**: Array com 2 denúncias do João

---

### 7️⃣ GET - Filtrar por categoria

```powershell
curl "http://localhost:3000/api/denuncias?categoria=pavimentacao"
```

**Resposta esperada**: Apenas a denúncia de buraco

---

### 8️⃣ GET - Filtrar por status

```powershell
curl "http://localhost:3000/api/denuncias?status=aberto"
```

**Resposta esperada**: Todas as 3 denúncias (status default é "aberto")

---

### 9️⃣ GET - Testar paginação (limite de 2 por página)

```powershell
# Página 1
curl "http://localhost:3000/api/denuncias?limit=2&page=1"

# Página 2
curl "http://localhost:3000/api/denuncias?limit=2&page=2"
```

**Resposta esperada**: 
- Página 1: 2 denúncias, `totalPages: 2`
- Página 2: 1 denúncia, `totalPages: 2`

---

### 🔟 PATCH - Atualizar status de uma denúncia

**⚠️ Substitua `ID_DA_DENUNCIA` pelo id real retornado no teste 2**

```powershell
curl -X PATCH http://localhost:3000/api/denuncias/ID_DA_DENUNCIA/status `
  -H "Content-Type: application/json" `
  -d '{\"status\":\"em_analise\"}'
```

**Exemplo com ID real**:
```powershell
curl -X PATCH http://localhost:3000/api/denuncias/a1b2c3d4-e5f6-7890-abcd-ef1234567890/status `
  -H "Content-Type: application/json" `
  -d '{\"status\":\"em_analise\"}'
```

**Resposta esperada (200)**:
```json
{
  "success": true,
  "status": 200,
  "message": "Status atualizado com sucesso",
  "data": {
    ...campos da denúncia,
    "status": "em_analise",
    "atualizadoEm": "2025-11-12T..." (timestamp novo)
  }
}
```

---

### 1️⃣1️⃣ PATCH - Marcar como resolvido

```powershell
curl -X PATCH http://localhost:3000/api/denuncias/ID_DA_DENUNCIA/status `
  -H "Content-Type: application/json" `
  -d '{\"status\":\"resolvido\"}'
```

---

### 1️⃣2️⃣ PUT - Atualizar denúncia completa

```powershell
curl -X PUT http://localhost:3000/api/denuncias/ID_DA_DENUNCIA `
  -H "Content-Type: application/json" `
  -d '{\"titulo\":\"Buraco na Rua Principal (URGENTE)\",\"descricao\":\"Buraco muito grande, piorou após chuva\",\"categoria\":\"pavimentacao\",\"localizacao\":\"Rua Principal, 500 - Centro (em frente padaria)\",\"telefoneContato\":\"11999887766\",\"cidadao\":\"João Silva\",\"usuarioEmail\":\"joao@example.com\",\"status\":\"em_analise\"}'
```

---

## Testes de Validação (Erros Esperados)

### ❌ Teste 1: POST sem campos obrigatórios

```powershell
curl -X POST http://localhost:3000/api/denuncias `
  -H "Content-Type: application/json" `
  -d '{\"titulo\":\"Bu\"}'
```

**Resposta esperada (400)**:
```json
{
  "success": false,
  "status": 400,
  "message": "Erro de validação",
  "errors": [
    "\"titulo\" length must be at least 3 characters long",
    "\"descricao\" is required",
    "\"categoria\" is required",
    ...
  ]
}
```

---

### ❌ Teste 2: POST com email inválido

```powershell
curl -X POST http://localhost:3000/api/denuncias `
  -H "Content-Type: application/json" `
  -d '{\"titulo\":\"Buraco na rua\",\"descricao\":\"Buraco grande e perigoso\",\"categoria\":\"pavimentacao\",\"localizacao\":\"Rua A\",\"cidadao\":\"João\",\"usuarioEmail\":\"email-invalido\"}'
```

**Resposta esperada (400)**:
```json
{
  "success": false,
  "status": 400,
  "message": "Erro de validação",
  "errors": [
    "\"usuarioEmail\" must be a valid email"
  ]
}
```

---

### ❌ Teste 3: PATCH com status inválido

```powershell
curl -X PATCH http://localhost:3000/api/denuncias/ID_DA_DENUNCIA/status `
  -H "Content-Type: application/json" `
  -d '{\"status\":\"finalizado\"}'
```

**Resposta esperada (400)**:
```json
{
  "success": false,
  "status": 400,
  "message": "Erro de validação",
  "errors": [
    "\"status\" must be one of [aberto, em_analise, resolvido]"
  ]
}
```

---

### ❌ Teste 4: GET/PUT/PATCH com ID inexistente

```powershell
curl -X PATCH http://localhost:3000/api/denuncias/id-inexistente/status `
  -H "Content-Type: application/json" `
  -d '{\"status\":\"resolvido\"}'
```

**Resposta esperada (404)**:
```json
{
  "success": false,
  "status": 404,
  "message": "Denúncia não encontrada"
}
```

---

### ❌ Teste 5: Rota inexistente (404)

```powershell
curl http://localhost:3000/api/rota-inexistente
```

**Resposta esperada (404)**:
```json
{
  "success": false,
  "status": 404,
  "message": "Not Found"
}
```

---

## Teste de Rate Limiting

Execute o mesmo comando mais de 100 vezes em 15 minutos:

```powershell
# Loop de 105 requisições
1..105 | ForEach-Object { curl http://localhost:3000/api/denuncias; Start-Sleep -Milliseconds 100 }
```

**Após 100 requisições, resposta esperada (429)**:
```json
{
  "success": false,
  "status": 429,
  "message": "Muitas requisições. Tente novamente mais tarde."
}
```

---

## Combinando Filtros e Paginação

### Filtro múltiplo: usuário + categoria + página

```powershell
curl "http://localhost:3000/api/denuncias?usuarioEmail=joao@example.com&categoria=pavimentacao&page=1&limit=5"
```

### Filtro: status + paginação

```powershell
curl "http://localhost:3000/api/denuncias?status=resolvido&page=1&limit=10"
```

---

## Resumo de Endpoints Testados

| Método | Endpoint | Descrição | Status Esperado |
|--------|----------|-----------|-----------------|
| GET | `/api/denuncias` | Listar todas | 200 |
| GET | `/api/denuncias?usuarioEmail=...` | Filtrar por email | 200 |
| GET | `/api/denuncias?categoria=...` | Filtrar por categoria | 200 |
| GET | `/api/denuncias?status=...` | Filtrar por status | 200 |
| GET | `/api/denuncias?page=1&limit=10` | Paginação | 200 |
| POST | `/api/denuncias` | Criar denúncia | 201 |
| PUT | `/api/denuncias/:id` | Atualizar completo | 200 |
| PATCH | `/api/denuncias/:id/status` | Atualizar status | 200 |
| GET | `/api/rota-invalida` | Rota não existe | 404 |

---

## Testando com Outras Ferramentas

### Postman / Insomnia

Importe esta collection ou crie manualmente:

**Base URL**: `http://localhost:3000/api`

**Headers globais**:
```
Content-Type: application/json
```

### Thunder Client (VS Code Extension)

1. Instale a extensão Thunder Client
2. Crie um novo request
3. Configure:
   - Method: POST/GET/PUT/PATCH
   - URL: `http://localhost:3000/api/denuncias`
   - Body (JSON): Cole os exemplos acima

### Navegador (apenas GET)

Abra no navegador:
```
http://localhost:3000/api/denuncias
http://localhost:3000/api/denuncias?usuarioEmail=joao@example.com
http://localhost:3000/api/denuncias?page=1&limit=5
```

---

## Checklist de Testes ✅

- [x] GET lista vazia retorna 200
- [ ] POST cria denúncia e retorna 201
- [ ] GET lista denúncias criadas
- [ ] GET filtra por usuarioEmail
- [ ] GET filtra por categoria
- [ ] GET filtra por status
- [ ] GET paginação funciona (page, limit)
- [ ] PATCH atualiza status para "em_analise"
- [ ] PATCH atualiza status para "resolvido"
- [ ] PUT atualiza denúncia completa
- [ ] POST com campos inválidos retorna 400
- [ ] POST com email inválido retorna 400
- [ ] PATCH com status inválido retorna 400
- [ ] PUT/PATCH com ID inexistente retorna 404
- [ ] GET em rota inexistente retorna 404
- [ ] Rate limit funciona (429 após 100 reqs)

---

## Próximos Passos

1. ✅ Executar todos os testes acima
2. ✅ Verificar que responses estão no formato correto
3. ✅ Confirmar validações funcionando
4. ⏭️ Documentar middlewares (item 4 do todo)
5. ⏭️ Documentar paginação detalhada (item 5)
6. ⏭️ Criar documentação de migração MongoDB (item 6)
7. ⏭️ Gerar diagramas Mermaid e doc final (item 7)

---

**Salvo em**: `src/docs/guia-de-testes.md`
