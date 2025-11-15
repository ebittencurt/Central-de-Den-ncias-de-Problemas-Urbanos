# Script de Testes - API Central de Denúncias
# Executar no PowerShell: .\testes-api.ps1

$baseUrl = "http://localhost:3000/api/denuncias"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "API Central de Denúncias - Testes" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Teste 1: GET - Listar denúncias (inicialmente vazio)
Write-Host "[1] GET - Listar todas as denúncias" -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri $baseUrl -Method Get
$response | ConvertTo-Json -Depth 10
Write-Host "`n"

# Teste 2: POST - Criar primeira denúncia
Write-Host "[2] POST - Criar primeira denúncia (João Silva)" -ForegroundColor Yellow
$body1 = @{
    titulo = "Buraco na Rua Principal"
    descricao = "Buraco grande e profundo causando risco de acidentes"
    categoria = "pavimentacao"
    localizacao = "Rua Principal, 500 - Centro"
    telefoneContato = "11999887766"
    cidadao = "João Silva"
    usuarioEmail = "joao@example.com"
} | ConvertTo-Json

$denuncia1 = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body1 -ContentType "application/json"
$denuncia1 | ConvertTo-Json -Depth 10
$id1 = $denuncia1.data.id
Write-Host "`n✅ ID da denúncia 1: $id1" -ForegroundColor Green
Write-Host "`n"

# Teste 3: POST - Criar segunda denúncia (outro usuário)
Write-Host "[3] POST - Criar segunda denúncia (Maria Santos)" -ForegroundColor Yellow
$body2 = @{
    titulo = "Iluminação pública queimada"
    descricao = "Poste de iluminação quebrado há 2 semanas"
    categoria = "iluminacao"
    localizacao = "Avenida Brasil, 1200"
    telefoneContato = "11987654321"S
    cidadao = "Maria Santos"
    usuarioEmail = "maria@example.com"
} | ConvertTo-Json

$denuncia2 = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body2 -ContentType "application/json"
$denuncia2 | ConvertTo-Json -Depth 10
$id2 = $denuncia2.data.id
Write-Host "`n✅ ID da denúncia 2: $id2" -ForegroundColor Green
Write-Host "`n"

# Teste 4: POST - Criar terceira denúncia (mesmo usuário João)
Write-Host "[4] POST - Criar terceira denúncia (João Silva novamente)" -ForegroundColor Yellow
$body3 = @{
    titulo = "Lixo acumulado"
    descricao = "Lixo não coletado há uma semana"
    categoria = "limpeza"
    localizacao = "Rua das Flores, 80"
    cidadao = "João Silva"
    usuarioEmail = "joao@example.com"
} | ConvertTo-Json

$denuncia3 = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body3 -ContentType "application/json"
$denuncia3 | ConvertTo-Json -Depth 10
$id3 = $denuncia3.data.id
Write-Host "`n✅ ID da denúncia 3: $id3" -ForegroundColor Green
Write-Host "`n"

# Teste 5: GET - Listar todas (agora com 3 denúncias)
Write-Host "[5] GET - Listar todas as denúncias (3 itens)" -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri $baseUrl -Method Get
$response | ConvertTo-Json -Depth 10
Write-Host "`n"

# Teste 6: GET - Filtrar por email (João)
Write-Host "[6] GET - Filtrar por usuarioEmail (joao@example.com)" -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$baseUrl?usuarioEmail=joao@example.com" -Method Get
$response | ConvertTo-Json -Depth 10
Write-Host "`n"

# Teste 7: GET - Filtrar por categoria
Write-Host "[7] GET - Filtrar por categoria (pavimentacao)" -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$baseUrl?categoria=pavimentacao" -Method Get
$response | ConvertTo-Json -Depth 10
Write-Host "`n"

# Teste 8: GET - Filtrar por status
Write-Host "[8] GET - Filtrar por status (aberto)" -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$baseUrl?status=aberto" -Method Get
$response | ConvertTo-Json -Depth 10
Write-Host "`n"

# Teste 9: GET - Paginação (2 por página)
Write-Host "[9] GET - Paginação: página 1, limite 2" -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$baseUrl?page=1&limit=2" -Method Get
$response | ConvertTo-Json -Depth 10
Write-Host "`n"

Write-Host "[10] GET - Paginação: página 2, limite 2" -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$baseUrl?page=2&limit=2" -Method Get
$response | ConvertTo-Json -Depth 10
Write-Host "`n"

# Teste 11: PATCH - Atualizar status para "em_analise"
Write-Host "[11] PATCH - Atualizar status da denúncia 1 para 'em_analise'" -ForegroundColor Yellow
$bodyStatus = @{ status = "em_analise" } | ConvertTo-Json
$response = Invoke-RestMethod -Uri "$baseUrl/$id1/status" -Method Patch -Body $bodyStatus -ContentType "application/json"
$response | ConvertTo-Json -Depth 10
Write-Host "`n"

# Teste 12: PATCH - Atualizar status para "resolvido"
Write-Host "[12] PATCH - Atualizar status da denúncia 1 para 'resolvido'" -ForegroundColor Yellow
$bodyStatus = @{ status = "resolvido" } | ConvertTo-Json
$response = Invoke-RestMethod -Uri "$baseUrl/$id1/status" -Method Patch -Body $bodyStatus -ContentType "application/json"
$response | ConvertTo-Json -Depth 10
Write-Host "`n"

# Teste 13: PUT - Atualizar denúncia completa
Write-Host "[13] PUT - Atualizar denúncia 2 completamente" -ForegroundColor Yellow
$bodyUpdate = @{
    titulo = "Iluminação pública queimada (URGENTE)"
    descricao = "Poste quebrado há 3 semanas, situação piorou"
    categoria = "iluminacao"
    localizacao = "Avenida Brasil, 1200 - próximo ao banco"
    telefoneContato = "11987654321"
    cidadao = "Maria Santos"
    usuarioEmail = "maria@example.com"
    status = "em_analise"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "$baseUrl/$id2" -Method Put -Body $bodyUpdate -ContentType "application/json"
$response | ConvertTo-Json -Depth 10
Write-Host "`n"

# Testes de Validação (Erros)
Write-Host "`n========================================" -ForegroundColor Red
Write-Host "Testes de Validação (Erros Esperados)" -ForegroundColor Red
Write-Host "========================================`n" -ForegroundColor Red

# Teste 14: POST sem campos obrigatórios
Write-Host "[14] POST - Sem campos obrigatórios (deve retornar 400)" -ForegroundColor Yellow
try {
    $bodyInvalido = @{ titulo = "Bu" } | ConvertTo-Json
    Invoke-RestMethod -Uri $baseUrl -Method Post -Body $bodyInvalido -ContentType "application/json"
} catch {
    $_.Exception.Response.StatusCode
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorContent = $reader.ReadToEnd()
    $errorContent | ConvertFrom-Json | ConvertTo-Json -Depth 10
}
Write-Host "`n"

# Teste 15: POST com email inválido
Write-Host "[15] POST - Email inválido (deve retornar 400)" -ForegroundColor Yellow
try {
    $bodyEmailInvalido = @{
        titulo = "Buraco na rua"
        descricao = "Buraco grande e perigoso"
        categoria = "pavimentacao"
        localizacao = "Rua A"
        cidadao = "João"
        usuarioEmail = "email-invalido"
    } | ConvertTo-Json
    Invoke-RestMethod -Uri $baseUrl -Method Post -Body $bodyEmailInvalido -ContentType "application/json"
} catch {
    $_.Exception.Response.StatusCode
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorContent = $reader.ReadToEnd()
    $errorContent | ConvertFrom-Json | ConvertTo-Json -Depth 10
}
Write-Host "`n"

# Teste 16: PATCH com status inválido
Write-Host "[16] PATCH - Status inválido (deve retornar 400)" -ForegroundColor Yellow
try {
    $bodyStatusInvalido = @{ status = "finalizado" } | ConvertTo-Json
    Invoke-RestMethod -Uri "$baseUrl/$id1/status" -Method Patch -Body $bodyStatusInvalido -ContentType "application/json"
} catch {
    $_.Exception.Response.StatusCode
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorContent = $reader.ReadToEnd()
    $errorContent | ConvertFrom-Json | ConvertTo-Json -Depth 10
}
Write-Host "`n"

# Teste 17: PATCH com ID inexistente
Write-Host "[17] PATCH - ID inexistente (deve retornar 404)" -ForegroundColor Yellow
try {
    $bodyStatus = @{ status = "resolvido" } | ConvertTo-Json
    Invoke-RestMethod -Uri "$baseUrl/id-inexistente/status" -Method Patch -Body $bodyStatus -ContentType "application/json"
} catch {
    $_.Exception.Response.StatusCode
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorContent = $reader.ReadToEnd()
    $errorContent | ConvertFrom-Json | ConvertTo-Json -Depth 10
}
Write-Host "`n"

# Teste 18: GET rota inexistente
Write-Host "[18] GET - Rota inexistente (deve retornar 404)" -ForegroundColor Yellow
try {
    Invoke-RestMethod -Uri "http://localhost:3000/api/rota-inexistente" -Method Get
} catch {
    $_.Exception.Response.StatusCode
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorContent = $reader.ReadToEnd()
    $errorContent | ConvertFrom-Json | ConvertTo-Json -Depth 10
}
Write-Host "`n"

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "✅ Todos os testes concluídos!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "IDs criados nesta execução:" -ForegroundColor Cyan
Write-Host "  Denúncia 1 (João - Buraco): $id1" -ForegroundColor White
Write-Host "  Denúncia 2 (Maria - Iluminação): $id2" -ForegroundColor White
Write-Host "  Denúncia 3 (João - Lixo): $id3`n" -ForegroundColor White
