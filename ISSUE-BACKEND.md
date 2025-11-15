## 🎯 Objetivo

Implementar a API REST completa para gerenciar denúncias de problemas urbanos usando Node.js + Express.

---

## ✅ Tarefas

### **Estrutura Base**
- [ ] Criar estrutura de pastas (`src/config`, `src/controllers`, `src/middlewares`, `src/models`, `src/routes`, `src/utils`, `src/validators`)
- [ ] Configurar `package.json` com dependências (Express, Joi, Multer, UUID, Helmet, CORS, express-rate-limit, dotenv)
- [ ] Implementar `src/index.js` e `src/app.js`
- [ ] Configurar `.env` (PORT, CORS_ORIGIN)

### **Middlewares**
- [ ] `errorHandler.js` - Tratamento global de erros
- [ ] `rateLimiter.js` - Limitação de 100 req/15min
- [ ] `upload.js` - Upload de imagens com Multer (jpeg/jpg/png/gif/webp, max 5MB)
- [ ] `validate.js` - Validação com Joi

### **Model + Validators**
- [ ] `store.js` - Armazenamento in-memory com métodos: `create()`, `find()`, `findById()`, `update()`, `patchStatus()`, `deleteDenuncia()`
- [ ] `denuncia.validator.js` - Schemas Joi para validação

### **Controllers**
- [ ] `denuncias.controller.js` com:
  - [ ] `create()` - POST com multipart/form-data
  - [ ] `list()` - GET com filtros (usuarioEmail, categoria, status) e paginação
  - [ ] `update()` - PUT completo
  - [ ] `patchStatus()` - PATCH apenas status
  - [ ] `deleteDenuncia()` - DELETE (apenas status=aberto)
  - [ ] `getResolvidos()` - GET mock de 4 problemas resolvidos

### **Routes**
- [ ] `POST /api/denuncias` - Criar denúncia (com upload opcional)
- [ ] `GET /api/denuncias` - Listar (query: usuarioEmail, categoria, status, page, limit)
- [ ] `GET /api/denuncias/resolvidos` - Showcase de resolvidos
- [ ] `PUT /api/denuncias/:id` - Atualizar completo
- [ ] `PATCH /api/denuncias/:id/status` - Atualizar status
- [ ] `DELETE /api/denuncias/:id` - Excluir

### **Config + Utils**
- [ ] Servir arquivos estáticos da pasta `uploads/`
- [ ] Configurar CORS para `http://localhost:5500`
- [ ] Configurar Helmet para segurança
- [ ] `response.js` - Funções `success()` e `error()`

### **Testes**
- [ ] Scripts PowerShell: `testes-api.ps1`, `teste-delete.ps1`, `teste-upload-showcase.ps1`
- [ ] Testar todos os endpoints
- [ ] Validar respostas padronizadas (success/error)

### **Documentação**
- [ ] `README.md` com instruções completas
- [ ] Documentação dos endpoints na pasta `docs/`

---

## 📝 Especificações

**Stack:** Node.js 18+ | Express 4.18.2 | Joi | Multer | UUID | Helmet | CORS | express-rate-limit

**Estrutura de Denúncia:**
```javascript
{
  id: string (UUID),
  titulo: string (min 3),
  descricao: string (min 10),
  categoria: string (iluminacao, calcada, lixo, transito, outros),
  localizacao: string,
  telefoneContato: string (opcional),
  cidadao: string,
  usuarioEmail: string (email válido),
  imagemUrl: string (opcional),
  status: string (aberto, em_analise, resolvido),
  criadoEm: Date,
  atualizadoEm: Date
}
```

**Validações:**
- Título: min 3 chars
- Descrição: min 10 chars
- Categoria: `iluminacao`, `calcada`, `lixo`, `transito`, `outros`
- Email: formato válido
- Status: `aberto`, `em_analise`, `resolvido`
- Upload: jpeg/jpg/png/gif/webp, max 5MB

**Regras de Negócio:**
- Denúncias criadas iniciam com status `aberto`
- Apenas denúncias `aberto` podem ser excluídas
- Upload de imagem é opcional
- Filtros podem ser combinados

---

## 📌 Notas

- ⚠️ Armazenamento in-memory (dados perdidos ao reiniciar)
- ⚠️ Sem autenticação real (confia no `usuarioEmail` do frontend)
- ⚠️ CORS configurado para `http://localhost:5500`
