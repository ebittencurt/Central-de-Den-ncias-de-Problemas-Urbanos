const { v4: uuidv4 } = require('uuid');

let DB = [];

function now() { return new Date().toISOString(); }

function create(payload) {
  const item = {
    id: uuidv4(),
    titulo: payload.titulo,
    descricao: payload.descricao,
    categoria: payload.categoria,
    localizacao: payload.localizacao,
    telefoneContato: payload.telefoneContato || null,
    cidadao: payload.cidadao,
    usuarioEmail: payload.usuarioEmail,
    imagemUrl: payload.imagemUrl || null,
    status: payload.status || 'aberto',
    criadoEm: now(),
    atualizadoEm: now()
  };
  DB.push(item);
  return item;
}

function findById(id) { return DB.find(d => d.id === id); }

function update(id, payload) {
  const idx = DB.findIndex(d => d.id === id);
  if (idx === -1) return null;
  const existing = DB[idx];
  const updated = {
    ...existing,
    ...payload,
    id: existing.id,
    criadoEm: existing.criadoEm,
    atualizadoEm: now()
  };
  DB[idx] = updated;
  return updated;
}

function patchStatus(id, status) {
  const idx = DB.findIndex(d => d.id === id);
  if (idx === -1) return null;
  DB[idx].status = status;
  DB[idx].atualizadoEm = now();
  return DB[idx];
}

function find(filter = {}, options = {}) {
  let list = DB.slice();
  if (filter.usuarioEmail) list = list.filter(d => d.usuarioEmail === filter.usuarioEmail);
  if (filter.categoria) list = list.filter(d => d.categoria === filter.categoria);
  if (filter.status) list = list.filter(d => d.status === filter.status);
  
  const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
  const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
  const totalItems = list.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const start = (page - 1) * limit;
  const data = list.slice(start, start + limit);
  
  return { data, pagination: { page, limit, totalItems, totalPages } };
}

function deleteDenuncia(id) {
  const idx = DB.findIndex(d => d.id === id);
  if (idx === -1) return null;
  DB.splice(idx, 1);
  return id;
}

module.exports = { create, findById, update, patchStatus, find, deleteDenuncia };

