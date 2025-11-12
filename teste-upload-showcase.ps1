# ============================================
# TESTES: UPLOAD DE IMAGEM E SHOWCASE
# ============================================
# Execute este script no PowerShell para testar:
# .\teste-upload-showcase.ps1

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "TESTES - UPLOAD E SHOWCASE" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:3000/api/denuncias"
$testCounter = 1

# ============================================
# TESTE 1: Criar denúncia COM imagem
# ============================================
Write-Host "TESTE $testCounter - POST /api/denuncias (com imagem simulada)" -ForegroundColor Yellow
$testCounter++

# Nota: PowerShell não suporta multipart/form-data facilmente com Invoke-RestMethod
# Para testar upload real, use uma ferramenta como Postman ou curl
# Este teste mostra como seria a estrutura

Write-Host "Para testar upload de imagem real, use Postman ou curl:" -ForegroundColor Gray
Write-Host "POST http://localhost:3000/api/denuncias" -ForegroundColor Gray
Write-Host "Body: form-data" -ForegroundColor Gray
Write-Host "  - titulo: Buraco na rua com foto" -ForegroundColor Gray
Write-Host "  - descricao: Buraco grande que precisa de reparo" -ForegroundColor Gray
Write-Host "  - categoria: pavimentacao" -ForegroundColor Gray
Write-Host "  - localizacao: Rua Exemplo, 123" -ForegroundColor Gray
Write-Host "  - telefoneContato: 11999999999" -ForegroundColor Gray
Write-Host "  - cidadao: João Silva" -ForegroundColor Gray
Write-Host "  - usuarioEmail: joao@email.com" -ForegroundColor Gray
Write-Host "  - imagem: [arquivo .jpg/.png]`n" -ForegroundColor Gray

# Alternativa: criar denúncia sem imagem via JSON (método tradicional)
Write-Host "Criando denúncia via JSON (sem imagem):" -ForegroundColor Green

$body = @{
  titulo = "Denúncia de teste sem imagem"
  descricao = "Esta denúncia não contém imagem"
  categoria = "iluminacao"
  localizacao = "Rua Teste, 456"
  telefoneContato = "11988888888"
  cidadao = "Maria Santos"
  usuarioEmail = "maria@email.com"
} | ConvertTo-Json

try {
  $response = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body -ContentType "application/json"
  Write-Host "✓ Status: 201 Created" -ForegroundColor Green
  Write-Host "✓ ID criado: $($response.data.id)" -ForegroundColor Green
  Write-Host "✓ imagemUrl: $($response.data.imagemUrl)" -ForegroundColor Green
  $denunciaId = $response.data.id
} catch {
  Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# ============================================
# TESTE 2: Consultar showcase de resolvidos
# ============================================
Write-Host "TESTE $testCounter - GET /api/denuncias/resolvidos (showcase)" -ForegroundColor Yellow
$testCounter++

try {
  $response = Invoke-RestMethod -Uri "$baseUrl/resolvidos" -Method Get
  Write-Host "✓ Status: 200 OK" -ForegroundColor Green
  Write-Host "✓ Total de problemas resolvidos: $($response.data.Count)" -ForegroundColor Green
  
  Write-Host "`nProblemas resolvidos (para showcase/propaganda):" -ForegroundColor Cyan
  foreach ($item in $response.data) {
    Write-Host "  - $($item.titulo)" -ForegroundColor White
    Write-Host "    Categoria: $($item.categoria)" -ForegroundColor Gray
    Write-Host "    Local: $($item.localizacao)" -ForegroundColor Gray
    Write-Host "    Imagem: $($item.imagemUrl)" -ForegroundColor Gray
    Write-Host "    Resolvido em: $($item.resolvidoEm)" -ForegroundColor Gray
    Write-Host ""
  }
} catch {
  Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# ============================================
# TESTE 3: Atualizar denúncia COM imagem
# ============================================
Write-Host "TESTE $testCounter - PUT /api/denuncias/:id (com imagem)" -ForegroundColor Yellow
$testCounter++

Write-Host "Para testar atualização com upload de imagem, use Postman ou curl:" -ForegroundColor Gray
Write-Host "PUT http://localhost:3000/api/denuncias/{id}" -ForegroundColor Gray
Write-Host "Body: form-data" -ForegroundColor Gray
Write-Host "  - titulo: Titulo atualizado" -ForegroundColor Gray
Write-Host "  - descricao: Descricao atualizada" -ForegroundColor Gray
Write-Host "  - categoria: limpeza" -ForegroundColor Gray
Write-Host "  - localizacao: Rua Nova, 789" -ForegroundColor Gray
Write-Host "  - telefoneContato: 11977777777" -ForegroundColor Gray
Write-Host "  - cidadao: José Oliveira" -ForegroundColor Gray
Write-Host "  - usuarioEmail: jose@email.com" -ForegroundColor Gray
Write-Host "  - imagem: [arquivo .jpg/.png]`n" -ForegroundColor Gray

Write-Host ""

# ============================================
# TESTE 4: Verificar se arquivo de imagem está acessível
# ============================================
Write-Host "TESTE $testCounter - GET /uploads/{filename} (arquivo estático)" -ForegroundColor Yellow
$testCounter++

Write-Host "Se você fizer upload de uma imagem chamada 'exemplo.jpg':" -ForegroundColor Gray
Write-Host "Ela estará acessível em: http://localhost:3000/uploads/exemplo.jpg" -ForegroundColor Gray
Write-Host "O frontend pode exibir a imagem usando esta URL`n" -ForegroundColor Gray

Write-Host ""

# ============================================
# RESUMO
# ============================================
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "RESUMO DOS NOVOS RECURSOS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`n1. UPLOAD DE IMAGENS:" -ForegroundColor Green
Write-Host "   - Endpoint: POST/PUT /api/denuncias" -ForegroundColor White
Write-Host "   - Campo: 'imagem' (multipart/form-data)" -ForegroundColor White
Write-Host "   - Tipos aceitos: jpeg, jpg, png, gif, webp" -ForegroundColor White
Write-Host "   - Tamanho máximo: 5MB" -ForegroundColor White
Write-Host "   - Pasta de destino: uploads/" -ForegroundColor White
Write-Host "   - URL gerada: /uploads/{timestamp}-{filename}" -ForegroundColor White

Write-Host "`n2. SHOWCASE DE RESOLVIDOS:" -ForegroundColor Green
Write-Host "   - Endpoint: GET /api/denuncias/resolvidos" -ForegroundColor White
Write-Host "   - Retorna: Array de problemas resolvidos" -ForegroundColor White
Write-Host "   - Uso: Área de propaganda/showcase no site" -ForegroundColor White
Write-Host "   - Dados incluem: título, descrição, imagem, data" -ForegroundColor White

Write-Host "`n3. ARQUIVOS ESTÁTICOS:" -ForegroundColor Green
Write-Host "   - Endpoint: GET /uploads/{filename}" -ForegroundColor White
Write-Host "   - Serve imagens enviadas" -ForegroundColor White
Write-Host "   - Frontend pode usar URLs diretas" -ForegroundColor White

Write-Host "`n========================================`n" -ForegroundColor Cyan

Write-Host "PRÓXIMOS PASSOS:" -ForegroundColor Yellow
Write-Host "1. Use Postman para testar upload real de imagens" -ForegroundColor White
Write-Host "2. Verifique que a pasta 'uploads/' foi criada" -ForegroundColor White
Write-Host "3. Teste acessar /uploads/{arquivo} no navegador" -ForegroundColor White
Write-Host "4. Integre o endpoint /resolvidos no frontend" -ForegroundColor White
Write-Host ""
