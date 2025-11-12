const store = require('../models/store');
const { success, error } = require('../utils/response');
const Joi = require('joi');

// Schema de validação manual para campos obrigatórios
const createSchema = Joi.object({
  titulo: Joi.string().min(3).required(),
  descricao: Joi.string().min(10).required(),
  categoria: Joi.string().required(),
  localizacao: Joi.string().required(),
  telefoneContato: Joi.string().optional().allow('', null),
  cidadao: Joi.string().required(),
  usuarioEmail: Joi.string().email().required(),
  status: Joi.string().valid('aberto', 'em_analise', 'resolvido').optional()
});

exports.create = (req, res, next) => {
  try {
    // Validar campos obrigatórios
    const { error: validationError } = createSchema.validate(req.body, { abortEarly: false });
    if (validationError) {
      const details = validationError.details.map(d => d.message);
      return res.status(400).json({ success: false, status: 400, message: 'Erro de validação', errors: details });
    }

    // Adicionar URL da imagem se foi feito upload
    const payload = { ...req.body };
    if (req.file) {
      payload.imagemUrl = `/uploads/${req.file.filename}`;
    }

    const denuncia = store.create(payload);
    return success(res, 201, 'Denúncia criada com sucesso', denuncia);
  } catch (err) {
    next(err);
  }
};

exports.list = (req, res, next) => {
  try {
    const { page, limit, usuarioEmail, categoria, status } = req.query;
    const { data, pagination } = store.find({ usuarioEmail, categoria, status }, { page, limit });
    return success(res, 200, 'Lista de denúncias', data, pagination);
  } catch (err) {
    next(err);
  }
};

exports.update = (req, res, next) => {
  try {
    const id = req.params.id;
    
    // Validação manual (quando usa upload, o validate middleware não processa req.body)
    const { titulo, descricao, categoria, localizacao, telefoneContato, cidadao, usuarioEmail } = req.body;
    
    const payload = { 
      titulo, 
      descricao, 
      categoria, 
      localizacao, 
      telefoneContato, 
      cidadao, 
      usuarioEmail 
    };
    
    // Adiciona imagem se foi enviada
    if (req.file) {
      payload.imagemUrl = `/uploads/${req.file.filename}`;
    }
    
    const updated = store.update(id, payload);
    if (!updated) return error(res, 404, 'Denúncia não encontrada');
    return success(res, 200, 'Denúncia atualizada com sucesso', updated);
  } catch (err) {
    next(err);
  }
};

exports.patchStatus = (req, res, next) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const updated = store.patchStatus(id, status);
    if (!updated) return error(res, 404, 'Denúncia não encontrada');
    return success(res, 200, 'Status atualizado com sucesso', updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteDenuncia = (req, res, next) => {
  try {
    const id = req.params.id;
    const denuncia = store.findById(id);
    
    if (!denuncia) {
      return error(res, 404, 'Denúncia não encontrada');
    }
    
    if (denuncia.status !== 'aberto') {
      return error(res, 403, 'Apenas denúncias com status "aberto" podem ser excluídas');
    }
    
    const deleted = store.deleteDenuncia(id);
    return success(res, 200, 'Denúncia excluída com sucesso', { id: deleted });
  } catch (err) {
    next(err);
  }
};

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
      {
        id: 'showcase-2',
        titulo: 'Iluminação pública restaurada',
        descricao: 'Substituição de 15 postes com lâmpadas LED de alta eficiência',
        categoria: 'iluminacao',
        localizacao: 'Rua das Flores - Bairro Jardim',
        imagemUrl: '/uploads/exemplo-iluminacao-resolvida.jpg',
        status: 'resolvido',
        resolvidoEm: '2025-10-28T14:20:00.000Z'
      },
      {
        id: 'showcase-3',
        titulo: 'Limpeza de terreno baldio concluída',
        descricao: 'Remoção de entulho e lixo acumulado, área cercada para evitar novos descartes',
        categoria: 'limpeza',
        localizacao: 'Rua Santos Dumont, esquina com Rua 7 de Setembro',
        imagemUrl: '/uploads/exemplo-limpeza-resolvida.jpg',
        status: 'resolvido',
        resolvidoEm: '2025-11-05T09:15:00.000Z'
      },
      {
        id: 'showcase-4',
        titulo: 'Sinalização de trânsito instalada',
        descricao: 'Novas placas de pare e faixas de pedestres pintadas para maior segurança',
        categoria: 'sinalizacao',
        localizacao: 'Cruzamento Av. Brasil com Rua Central',
        imagemUrl: '/uploads/exemplo-sinalizacao-resolvida.jpg',
        status: 'resolvido',
        resolvidoEm: '2025-10-20T11:45:00.000Z'
      }
    ];

    return success(res, 200, 'Problemas resolvidos', resolvidos);
  } catch (err) {
    next(err);
  }
};
