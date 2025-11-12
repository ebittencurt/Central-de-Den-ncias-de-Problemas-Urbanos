# Testes - DELETE Denúncia

## Funcionalidade Implementada

✅ **DELETE `/api/denuncias/:id`** - Exclui uma denúncia

### Regras de Negócio
- ✅ Apenas denúncias com status **"aberto"** podem ser excluídas
- ❌ Denúncias com status "em_analise" ou "resolvido" **NÃO podem** ser excluídas
- ❌ Retorna 404 se a denúncia não existir
- ❌ Retorna 403 (Forbidden) se tentar excluir denúncia que não está "aberto"

---

## Comandos de Teste (PowerShell)

### 1️⃣ Criar uma denúncia para testar DELETE

```powershell
$body = @{
    titulo = "Teste de Exclusão"
    descricao = "Esta denúncia será excluída para testar a funcionalidade"
    categoria = "limpeza"
    localizacao = "Rua Teste, 100"
    cidadao = "Teste User"
    usuarioEmail = "teste@example.com"
} | ConvertTo-Json

$result = Invoke-RestMethod -Uri http://localhost:3000/api/denuncias -Method Post -Body $body -ContentType "application/json"
$idParaDeletar = $result.data.id
Write-Host "✅ Denúncia criada com ID: $idParaDeletar" -ForegroundColor Green
Write-Host "   Status: $($result.data.status)" -ForegroundColor Yellow
```

---

### 2️⃣ DELETE - Excluir denúncia com status "aberto" (✅ SUCESSO)

```powershell
# Usar o ID da denúncia criada acima
Invoke-RestMethod -Uri "http://localhost:3000/api/denuncias/$idParaDeletar" -Method Delete
```

**Resposta esperada (200)**:
```json
{
  "success": true,
  "status": 200,
  "message": "Denúncia excluída com sucesso",
  "data": {
    "id": "uuid-da-denuncia"
  }
}
```

---

### 3️⃣ Verificar que a denúncia foi excluída

```powershell
# Tentar buscar a denúncia deletada (deve retornar lista vazia ou sem o ID)
Invoke-RestMethod -Uri "http://localhost:3000/api/denuncias?usuarioEmail=teste@example.com" -Method Get
```

**Resposta esperada**: Lista vazia ou sem a denúncia excluída

---

### 4️⃣ DELETE - Tentar excluir denúncia com status "em_analise" (❌ ERRO 403)

```powershell
# Primeiro criar denúncia
$body = @{
    titulo = "Denúncia em Análise"
    descricao = "Esta denúncia não pode ser excluída"
    categoria = "pavimentacao"
    localizacao = "Rua Teste, 200"
    cidadao = "Teste User"
    usuarioEmail = "teste@example.com"
} | ConvertTo-Json

$result = Invoke-RestMethod -Uri http://localhost:3000/api/denuncias -Method Post -Body $body -ContentType "application/json"
$idEmAnalise = $result.data.id

# Atualizar status para "em_analise"
$bodyStatus = @{ status = "em_analise" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/denuncias/$idEmAnalise/status" -Method Patch -Body $bodyStatus -ContentType "application/json"

# Tentar deletar (deve falhar)
try {
    Invoke-RestMethod -Uri "http://localhost:3000/api/denuncias/$idEmAnalise" -Method Delete
} catch {
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorContent = $reader.ReadToEnd()
    $errorContent | ConvertFrom-Json | ConvertTo-Json -Depth 10
}
```

**Resposta esperada (403)**:
```json
{
  "success": false,
  "status": 403,
  "message": "Apenas denúncias com status \"aberto\" podem ser excluídas"
}
```

---

### 5️⃣ DELETE - Tentar excluir denúncia com status "resolvido" (❌ ERRO 403)

```powershell
# Criar denúncia
$body = @{
    titulo = "Denúncia Resolvida"
    descricao = "Esta denúncia não pode ser excluída"
    categoria = "iluminacao"
    localizacao = "Rua Teste, 300"
    cidadao = "Teste User"
    usuarioEmail = "teste@example.com"
} | ConvertTo-Json

$result = Invoke-RestMethod -Uri http://localhost:3000/api/denuncias -Method Post -Body $body -ContentType "application/json"
$idResolvido = $result.data.id

# Atualizar status para "resolvido"
$bodyStatus = @{ status = "resolvido" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/denuncias/$idResolvido/status" -Method Patch -Body $bodyStatus -ContentType "application/json"

# Tentar deletar (deve falhar)
try {
    Invoke-RestMethod -Uri "http://localhost:3000/api/denuncias/$idResolvido" -Method Delete
} catch {
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorContent = $reader.ReadToEnd()
    $errorContent | ConvertFrom-Json | ConvertTo-Json -Depth 10
}
```

**Resposta esperada (403)**:
```json
{
  "success": false,
  "status": 403,
  "message": "Apenas denúncias com status \"aberto\" podem ser excluídas"
}
```

---

### 6️⃣ DELETE - Tentar excluir denúncia inexistente (❌ ERRO 404)

```powershell
try {
    Invoke-RestMethod -Uri "http://localhost:3000/api/denuncias/id-inexistente" -Method Delete
} catch {
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorContent = $reader.ReadToEnd()
    $errorContent | ConvertFrom-Json | ConvertTo-Json -Depth 10
}
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

## Script Completo de Teste DELETE

```powershell
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Teste da Funcionalidade DELETE" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:3000/api/denuncias"

# Teste 1: Criar e deletar denúncia com status "aberto"
Write-Host "[1] Criar denúncia com status 'aberto' e deletar (SUCESSO)" -ForegroundColor Yellow
$body1 = @{
    titulo = "Denúncia para Deletar"
    descricao = "Esta será excluída"
    categoria = "limpeza"
    localizacao = "Rua A, 100"
    cidadao = "João"
    usuarioEmail = "joao@test.com"
} | ConvertTo-Json

$denuncia1 = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body1 -ContentType "application/json"
$id1 = $denuncia1.data.id
Write-Host "  ✅ Criada: $id1 (status: $($denuncia1.data.status))" -ForegroundColor Green

$deleted = Invoke-RestMethod -Uri "$baseUrl/$id1" -Method Delete
Write-Host "  ✅ Deletada: $($deleted.message)" -ForegroundColor Green
Write-Host ""

# Teste 2: Tentar deletar com status "em_analise"
Write-Host "[2] Tentar deletar denúncia com status 'em_analise' (ERRO 403)" -ForegroundColor Yellow
$body2 = @{
    titulo = "Não pode deletar"
    descricao = "Em análise"
    categoria = "pavimentacao"
    localizacao = "Rua B, 200"
    cidadao = "Maria"
    usuarioEmail = "maria@test.com"
} | ConvertTo-Json

$denuncia2 = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body2 -ContentType "application/json"
$id2 = $denuncia2.data.id

$statusBody = @{ status = "em_analise" } | ConvertTo-Json
Invoke-RestMethod -Uri "$baseUrl/$id2/status" -Method Patch -Body $statusBody -ContentType "application/json" | Out-Null
Write-Host "  ✅ Status alterado para 'em_analise'" -ForegroundColor Green

try {
    Invoke-RestMethod -Uri "$baseUrl/$id2" -Method Delete
    Write-Host "  ❌ ERRO: Deveria ter falhado!" -ForegroundColor Red
} catch {
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorContent = $reader.ReadToEnd()
    $error = $errorContent | ConvertFrom-Json
    Write-Host "  ✅ Bloqueado: $($error.message)" -ForegroundColor Green
}
Write-Host ""

# Teste 3: Tentar deletar ID inexistente
Write-Host "[3] Tentar deletar ID inexistente (ERRO 404)" -ForegroundColor Yellow
try {
    Invoke-RestMethod -Uri "$baseUrl/id-fake-12345" -Method Delete
    Write-Host "  ❌ ERRO: Deveria ter falhado!" -ForegroundColor Red
} catch {
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorContent = $reader.ReadToEnd()
    $error = $errorContent | ConvertFrom-Json
    Write-Host "  ✅ Erro esperado: $($error.message)" -ForegroundColor Green
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Testes DELETE concluídos!" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
```

---

## Resumo dos Status HTTP

| Cenário | Status | Mensagem |
|---------|--------|----------|
| Deletar denúncia "aberto" | **200** | "Denúncia excluída com sucesso" |
| Deletar "em_analise" | **403** | "Apenas denúncias com status \"aberto\" podem ser excluídas" |
| Deletar "resolvido" | **403** | "Apenas denúncias com status \"aberto\" podem ser excluídas" |
| Deletar ID inexistente | **404** | "Denúncia não encontrada" |

---

## Endpoints Atualizados

| Método | Endpoint | Descrição | Regra Especial |
|--------|----------|-----------|----------------|
| GET | `/api/denuncias` | Listar todas | - |
| GET | `/api/denuncias?usuarioEmail=...` | Filtrar por email | - |
| POST | `/api/denuncias` | Criar denúncia | - |
| PUT | `/api/denuncias/:id` | Atualizar completo | - |
| PATCH | `/api/denuncias/:id/status` | Atualizar status | - |
| **DELETE** | `/api/denuncias/:id` | **Excluir denúncia** | **Apenas status "aberto"** |

---

**Salvo em**: `src/docs/teste-delete.md`
