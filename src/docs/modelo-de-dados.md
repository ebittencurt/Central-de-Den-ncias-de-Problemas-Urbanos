# Modelo de Dados - Denúncia

## Visão Geral
Este documento detalha o schema/estrutura completa de uma **Denúncia** no sistema, incluindo tipos de dados, validações, defaults e exemplos de payloads.

---

## Schema da Denúncia

### Estrutura Completa (TypeScript-like)

```typescript
interface Denuncia {
  id: string;              // UUID v4 (gerado automaticamente)
  titulo: string;          // Título resumido (mín: 3 caracteres)
  descricao: string;       // Descrição detalhada (mín: 10 caracteres)
  categoria: string;       // Tipo do problema (pavimentacao, iluminacao, limpeza, etc.)
  localizacao: string;     // Endereço ou ponto de referência
  telefoneContato: string | null;  // Telefone opcional do cidadão
  cidadao: string;         // Nome do cidadão que fez a denúncia
  usuarioEmail: string;    // E-mail do usuário (formato email válido)
  status: 'aberto' | 'em_analise' | 'resolvido';  // Estado atual (default: 'aberto')
  criadoEm: string;        // ISO 8601 date string (gerado automaticamente)
  atualizadoEm: string;    // ISO 8601 date string (atualizado em cada modificação)
}
```

---

## Campos Detalhados

### `id` (string)
- **Tipo**: UUID v4
- **Gerado**: Automaticamente pelo backend ao criar denúncia
- **Imutável**: Sim (não pode ser alterado)
- **Exemplo**: `"a1b2c3d4-e5f6-7890-abcd-ef1234567890"`
- **Usado em**: Identificação única de cada denúncia, usado em endpoints PUT/PATCH

### `titulo` (string)
- **Obrigatório**: Sim
- **Validação**: 
  - Mínimo 3 caracteres
  - String não vazia
- **Exemplo**: `"Buraco na Rua Principal"`
- **Descrição**: Resumo curto e objetivo do problema

### `descricao` (string)
- **Obrigatório**: Sim
- **Validação**: 
  - Mínimo 10 caracteres
  - String não vazia
- **Exemplo**: `"Buraco grande e profundo causando risco de acidentes para carros e pedestres."`
- **Descrição**: Detalhamento completo do problema reportado

### `categoria` (string)
- **Obrigatório**: Sim
- **Validação**: String não vazia
- **Valores sugeridos** (não há enum rígido, mas recomendados):
  - `"pavimentacao"` - Buracos, asfalto danificado
  - `"iluminacao"` - Postes quebrados, lâmpadas queimadas
  - `"limpeza"` - Lixo acumulado, entulho
  - `"sinalizacao"` - Placas, faixas de pedestres
  - `"arborização"` - Árvores caídas, podas necessárias
  - `"outros"` - Problemas diversos
- **Exemplo**: `"pavimentacao"`
- **Descrição**: Classifica o tipo de problema urbano

### `localizacao` (string)
- **Obrigatório**: Sim
- **Validação**: String não vazia
- **Exemplo**: `"Rua das Flores, 123 - Centro"` ou `"Próximo ao Mercado Municipal"`
- **Descrição**: Endereço completo ou ponto de referência para localizar o problema

### `telefoneContato` (string | null)
- **Obrigatório**: Não
- **Validação**: 
  - Opcional (pode ser `null`, `""` ou omitido)
  - Se fornecido, validação básica de string
- **Exemplo**: `"11999887766"` ou `"(11) 99988-7766"`
- **Descrição**: Telefone de contato do cidadão (útil para atualizações)

### `cidadao` (string)
- **Obrigatório**: Sim
- **Validação**: String não vazia
- **Exemplo**: `"João da Silva"`
- **Descrição**: Nome do cidadão que registrou a denúncia

### `usuarioEmail` (string)
- **Obrigatório**: Sim
- **Validação**: 
  - Formato de e-mail válido (via Joi)
  - Exemplo regex: `/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/`
- **Exemplo**: `"joao.silva@example.com"`
- **Descrição**: E-mail do usuário (usado para filtrar denúncias em GET `/denuncias?usuarioEmail=...`)

### `status` (string enum)
- **Obrigatório**: Não (tem default)
- **Default**: `"aberto"`
- **Valores permitidos**:
  - `"aberto"` - Denúncia recém-criada, aguardando análise
  - `"em_analise"` - Prefeitura está analisando/trabalhando no problema
  - `"resolvido"` - Problema foi solucionado
- **Validação**: Enum estrito (Joi valida apenas os 3 valores acima)
- **Exemplo**: `"aberto"`
- **Descrição**: Estado atual da resolução da denúncia

### `criadoEm` (string - ISO 8601)
- **Gerado**: Automaticamente pelo backend ao criar denúncia
- **Formato**: ISO 8601 (UTC)
- **Imutável**: Sim (não pode ser alterado)
- **Exemplo**: `"2025-11-12T16:45:30.123Z"`
- **Descrição**: Data/hora exata de criação da denúncia

### `atualizadoEm` (string - ISO 8601)
- **Gerado**: Automaticamente pelo backend
- **Atualizado**: Em toda modificação (PUT, PATCH)
- **Formato**: ISO 8601 (UTC)
- **Exemplo**: `"2025-11-12T18:20:15.456Z"`
- **Descrição**: Data/hora da última modificação

---

## Validação (Joi Schemas)

### POST `/denuncias` - Schema de Criação

```javascript
{
  titulo: Joi.string().min(3).required(),
  descricao: Joi.string().min(10).required(),
  categoria: Joi.string().required(),
  localizacao: Joi.string().required(),
  telefoneContato: Joi.string().optional().allow('', null),
  cidadao: Joi.string().required(),
  usuarioEmail: Joi.string().email().required(),
  status: Joi.string().valid('aberto', 'em_analise', 'resolvido').optional()
}
```

**Regras**:
- Campos obrigatórios: `titulo`, `descricao`, `categoria`, `localizacao`, `cidadao`, `usuarioEmail`
- Campos opcionais: `telefoneContato`, `status`
- Se `status` não for fornecido, backend usa default `"aberto"`

### PUT `/denuncias/:id` - Schema de Atualização Completa

```javascript
// Mesmos campos do POST (permite substituir todos os valores)
{
  titulo: Joi.string().min(3).required(),
  descricao: Joi.string().min(10).required(),
  categoria: Joi.string().required(),
  localizacao: Joi.string().required(),
  telefoneContato: Joi.string().optional().allow('', null),
  cidadao: Joi.string().required(),
  usuarioEmail: Joi.string().email().required(),
  status: Joi.string().valid('aberto', 'em_analise', 'resolvido').optional()
}
```

**Regras**:
- Atualiza todos os campos fornecidos
- Campos não enviados mantêm valor anterior
- `id`, `criadoEm` nunca são alterados
- `atualizadoEm` é recalculado automaticamente

### PATCH `/denuncias/:id/status` - Schema de Atualização de Status

```javascript
{
  status: Joi.string().valid('aberto', 'em_analise', 'resolvido').required()
}
```

**Regras**:
- Apenas `status` pode ser atualizado
- Valor deve ser um dos 3 estados permitidos
- `atualizadoEm` é recalculado automaticamente

---

## Exemplos de Payloads

### POST - Criar Denúncia (Payload Mínimo)

```json
{
  "titulo": "Buraco na Rua Principal",
  "descricao": "Buraco grande causando risco de acidentes",
  "categoria": "pavimentacao",
  "localizacao": "Rua Principal, 500 - Centro",
  "cidadao": "João Silva",
  "usuarioEmail": "joao@example.com"
}
```

**Resposta de sucesso (201)**:
```json
{
  "success": true,
  "status": 201,
  "message": "Denúncia criada com sucesso",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "titulo": "Buraco na Rua Principal",
    "descricao": "Buraco grande causando risco de acidentes",
    "categoria": "pavimentacao",
    "localizacao": "Rua Principal, 500 - Centro",
    "telefoneContato": null,
    "cidadao": "João Silva",
    "usuarioEmail": "joao@example.com",
    "status": "aberto",
    "criadoEm": "2025-11-12T16:45:30.123Z",
    "atualizadoEm": "2025-11-12T16:45:30.123Z"
  }
}
```

### POST - Criar Denúncia (Payload Completo)

```json
{
  "titulo": "Iluminação pública queimada",
  "descricao": "Poste de iluminação quebrado há 2 semanas, causando insegurança no período noturno",
  "categoria": "iluminacao",
  "localizacao": "Avenida Brasil, 1200 - próximo ao banco",
  "telefoneContato": "11987654321",
  "cidadao": "Maria Santos",
  "usuarioEmail": "maria.santos@email.com",
  "status": "aberto"
}
```

### PUT - Atualizar Denúncia Completa

**Request**: `PUT /api/denuncias/a1b2c3d4-e5f6-7890-abcd-ef1234567890`

```json
{
  "titulo": "Buraco na Rua Principal (URGENTE)",
  "descricao": "Buraco muito grande, piorou após chuva",
  "categoria": "pavimentacao",
  "localizacao": "Rua Principal, 500 - Centro (em frente à padaria)",
  "telefoneContato": "11999887766",
  "cidadao": "João Silva",
  "usuarioEmail": "joao@example.com",
  "status": "em_analise"
}
```

**Resposta (200)**:
```json
{
  "success": true,
  "status": 200,
  "message": "Denúncia atualizada com sucesso",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "titulo": "Buraco na Rua Principal (URGENTE)",
    "descricao": "Buraco muito grande, piorou após chuva",
    "categoria": "pavimentacao",
    "localizacao": "Rua Principal, 500 - Centro (em frente à padaria)",
    "telefoneContato": "11999887766",
    "cidadao": "João Silva",
    "usuarioEmail": "joao@example.com",
    "status": "em_analise",
    "criadoEm": "2025-11-12T16:45:30.123Z",
    "atualizadoEm": "2025-11-12T18:20:15.456Z"
  }
}
```

### PATCH - Atualizar Apenas Status

**Request**: `PATCH /api/denuncias/a1b2c3d4-e5f6-7890-abcd-ef1234567890/status`

```json
{
  "status": "resolvido"
}
```

**Resposta (200)**:
```json
{
  "success": true,
  "status": 200,
  "message": "Status atualizado com sucesso",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "titulo": "Buraco na Rua Principal (URGENTE)",
    "descricao": "Buraco muito grande, piorou após chuva",
    "categoria": "pavimentacao",
    "localizacao": "Rua Principal, 500 - Centro (em frente à padaria)",
    "telefoneContato": "11999887766",
    "cidadao": "João Silva",
    "usuarioEmail": "joao@example.com",
    "status": "resolvido",
    "criadoEm": "2025-11-12T16:45:30.123Z",
    "atualizadoEm": "2025-11-12T19:10:00.789Z"
  }
}
```

---

## Exemplos de Erros de Validação

### Erro 400 - Validação Joi (campo obrigatório faltando)

**Request**: `POST /api/denuncias`
```json
{
  "titulo": "Bu",
  "descricao": "Curta"
}
```

**Resposta (400)**:
```json
{
  "success": false,
  "status": 400,
  "message": "Erro de validação",
  "errors": [
    "\"titulo\" length must be at least 3 characters long",
    "\"descricao\" length must be at least 10 characters long",
    "\"categoria\" is required",
    "\"localizacao\" is required",
    "\"cidadao\" is required",
    "\"usuarioEmail\" is required"
  ]
}
```

### Erro 400 - Email inválido

**Request**: `POST /api/denuncias`
```json
{
  "titulo": "Buraco na rua",
  "descricao": "Buraco grande e perigoso",
  "categoria": "pavimentacao",
  "localizacao": "Rua A, 100",
  "cidadao": "João",
  "usuarioEmail": "email-invalido"
}
```

**Resposta (400)**:
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

### Erro 400 - Status inválido

**Request**: `PATCH /api/denuncias/abc123/status`
```json
{
  "status": "finalizado"
}
```

**Resposta (400)**:
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

### Erro 404 - Denúncia não encontrada

**Request**: `PUT /api/denuncias/id-inexistente`

**Resposta (404)**:
```json
{
  "success": false,
  "status": 404,
  "message": "Denúncia não encontrada"
}
```

---

## Regras de Negócio

### Criação (POST)
1. Backend gera automaticamente: `id` (UUID), `criadoEm`, `atualizadoEm`
2. Se `status` não for fornecido, default é `"aberto"`
3. Se `telefoneContato` não for fornecido, armazenado como `null`
4. Todos os campos obrigatórios devem ser fornecidos

### Atualização Completa (PUT)
1. `id` e `criadoEm` **nunca** são alterados
2. `atualizadoEm` é recalculado automaticamente
3. Todos os outros campos podem ser substituídos
4. Se denúncia não existir, retorna 404

### Atualização de Status (PATCH)
1. Apenas `status` é modificado
2. `atualizadoEm` é recalculado automaticamente
3. Status deve ser um dos 3 valores permitidos
4. Se denúncia não existir, retorna 404

### Listagem (GET)
1. Retorna array de denúncias (vazio se nenhuma existir)
2. Suporta filtros: `usuarioEmail`, `categoria`, `status`
3. Suporta paginação: `page`, `limit`
4. Ordenação: por padrão, ordem de inserção (in-memory array)

---

## Persistência Atual (In-Memory)

- **Armazenamento**: Array JavaScript em memória (`models/store.js`)
- **Limitações**:
  - Dados são perdidos ao reiniciar servidor
  - Não é concorrente-safe (não usar em cluster/múltiplos processos)
  - Sem limite de tamanho (pode crescer indefinidamente)
- **Adequado para**:
  - Desenvolvimento local
  - Testes
  - Protótipos/MVP
- **Migração futura**: Trocar por MongoDB/PostgreSQL mantendo mesma interface do `store.js`

---

## Próximos Passos (Melhorias Futuras)

1. **Geolocalização**: Adicionar campos `latitude`/`longitude` opcionais
2. **Imagens**: Permitir upload de fotos do problema
3. **Histórico**: Registrar log de mudanças de status
4. **Notificações**: Enviar email ao cidadão quando status mudar
5. **Timestamps adicionais**: `resolvidoEm`, `analisadoEm`

---

**Documentação completa e atualizada em**: `src/docs/modelo-de-dados.md`
