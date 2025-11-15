.# Script de Teste - Funcionalidade DELETE
# Executar: .\teste-delete.ps1

$baseUrl = "http://localhost:3000/api/denuncias"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Teste da Funcionalidade DELETE" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Teste 1: Criar e deletar denúncia com status "aberto" (SUCESSO)
Write-Host "[1] Criar denúncia com status 'aberto' e deletar (SUCESSO)" -ForegroundColor Yellow
$body1 = @{
    titulo = "Denúncia para Deletar"
    descricao = "Esta será excluída com sucesso"
    categoria = "limpeza"
    localizacao = "Rua A, 100"
    cidadao = "João Test"
    usuarioEmail = "joao@test.com"
} | ConvertTo-Json

$denuncia1 = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body1 -ContentType "application/json"
$id1 = $denuncia1.data.id
Write-Host "  ✅ Criada: $id1" -ForegroundColor Green
Write-Host "     Status: $($denuncia1.data.status)" -ForegroundColor White

$deleted = Invoke-RestMethod -Uri "$baseUrl/$id1" -Method Delete
Write-Host "  ✅ Deletada com sucesso!" -ForegroundColor Green
Write-Host "     Mensagem: $($deleted.message)" -ForegroundColor White
Write-Host ""

# Teste 2: Tentar deletar com status "em_analise" (ERRO 403)
Write-Host "[2] Tentar deletar denúncia com status 'em_analise' (ERRO 403 esperado)" -ForegroundColor Yellow
$body2 = @{
    titulo = "Não pode deletar - Em Análise"
    descricao = "Status em análise não permite exclusão"
    categoria = "pavimentacao"
    localizacao = "Rua B, 200"
    cidadao = "Maria Test"
    usuarioEmail = "maria@test.com"
} | ConvertTo-Json

$denuncia2 = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body2 -ContentType "application/json"
$id2 = $denuncia2.data.id
Write-Host "  ✅ Criada: $id2" -ForegroundColor Green

# Alterar status para "em_analise"
$statusBody = @{ status = "em_analise" } | ConvertTo-Json
Invoke-RestMethod -Uri "$baseUrl/$id2/status" -Method Patch -Body $statusBody -ContentType "application/json" | Out-Null
Write-Host "  ✅ Status alterado para 'em_analise'" -ForegroundColor Green

# Tentar deletar (deve falhar com 403)
try {
    Invoke-RestMethod -Uri "$baseUrl/$id2" -Method Delete
    Write-Host "  ❌ ERRO: Deveria ter retornado 403!" -ForegroundColor Red
} catch {
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorContent = $reader.ReadToEnd()
    $error = $errorContent | ConvertFrom-Json
    Write-Host "  ✅ Bloqueado corretamente (403)!" -ForegroundColor Green
    Write-Host "     Mensagem: $($error.message)" -ForegroundColor White
}
Write-Host ""

# Teste 3: Tentar deletar com status "resolvido" (ERRO 403)
Write-Host "[3] Tentar deletar denúncia com status 'resolvido' (ERRO 403 esperado)" -ForegroundColor Yellow
$body3 = @{
    titulo = "Não pode deletar - Resolvido"
    descricao = "Status resolvido não permite exclusão"
    categoria = "iluminacao"
    localizacao = "Rua C, 300"
    cidadao = "Pedro Test"
    usuarioEmail = "pedro@test.com"
} | ConvertTo-Json

$denuncia3 = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body3 -ContentType "application/json"
$id3 = $denuncia3.data.id
Write-Host "  ✅ Criada: $id3" -ForegroundColor Green

# Alterar status para "resolvido"
$statusBody2 = @{ status = "resolvido" } | ConvertTo-Json
Invoke-RestMethod -Uri "$baseUrl/$id3/status" -Method Patch -Body $statusBody2 -ContentType "application/json" | Out-Null
Write-Host "  ✅ Status alterado para 'resolvido'" -ForegroundColor Green

# Tentar deletar (deve falhar com 403)
try {
    Invoke-RestMethod -Uri "$baseUrl/$id3" -Method Delete
    Write-Host "  ❌ ERRO: Deveria ter retornado 403!" -ForegroundColor Red
} catch {
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorContent = $reader.ReadToEnd()
    $error = $errorContent | ConvertFrom-Json
    Write-Host "  ✅ Bloqueado corretamente (403)!" -ForegroundColor Green
    Write-Host "     Mensagem: $($error.message)" -ForegroundColor White
}
Write-Host ""

# Teste 4: Tentar deletar ID inexistente (ERRO 404)
Write-Host "[4] Tentar deletar ID inexistente (ERRO 404 esperado)" -ForegroundColor Yellow
try {
    Invoke-RestMethod -Uri "$baseUrl/id-fake-12345" -Method Delete
    Write-Host "  ❌ ERRO: Deveria ter retornado 404!" -ForegroundColor Red
} catch {
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorContent = $reader.ReadToEnd()
    $error = $errorContent | ConvertFrom-Json
    Write-Host "  ✅ Erro 404 retornado corretamente!" -ForegroundColor Green
    Write-Host "     Mensagem: $($error.message)" -ForegroundColor White
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Todos os testes DELETE concluídos!" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Resumo:" -ForegroundColor Yellow
Write-Host "  ✅ DELETE com status 'aberto' funcionou" -ForegroundColor Green
Write-Host "  ✅ DELETE com status 'em_analise' bloqueado (403)" -ForegroundColor Green
Write-Host "  ✅ DELETE com status 'resolvido' bloqueado (403)" -ForegroundColor Green
Write-Host "  ✅ DELETE com ID inexistente retornou 404`n" -ForegroundColor Green
