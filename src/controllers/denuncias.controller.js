const store = require('../models/store');
const { success, error } = require('../utils/response');

exports.create = (req, res, next) => {
  try {
    // Validação é feita pelo middleware validate
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
        titulo: 'Buraco na Avenida Principal ',
        descricao: 'Buraco se abriu na chuva forte que ocorreu no dia 28/10/2025.',
        categoria: 'pavimentacao',
        localizacao: 'Avenida Artemia Pires, 1500 - Santo Antonio',
        imagemUrl: '/imagens-showcase/Buraco_na_rua.jpeg',
        status: 'resolvido',
        resolvidoEm: '2025-11-01T10:30:00.000Z'
      },
      {
        id: 'showcase-2',
        titulo: 'Iluminação precária na Avenida Artemia Pires',
        descricao: 'A avenida precisa de mais postes de iluminação para garantir a segurança dos pedestres durante a noite.',
        categoria: 'iluminacao',
        localizacao: 'Avenida Artemia Pires, 1500 - Santo Antonio',
        imagemUrl: '/imagens-showcase/iluminacao_avenida_artemia_pires.jpg',
        status: 'resolvido',
        resolvidoEm: '2025-10-28T14:20:00.000Z'
      },
      {
        id: 'showcase-3',
        titulo: 'Lixo acumulado ',
        descricao: 'Em nome de todos os moradores venho solicitar a limpeza deste local que está servindo de depósito de lixo e entulho.',
        categoria: 'limpeza',
        localizacao: 'Rua Santos Dumont, esquina com Rua 7 de Setembro',
        imagemUrl: '/imagens-showcase/lixo_na_rua.png',
        status: 'resolvido',
        resolvidoEm: '2025-11-05T09:15:00.000Z'
      },
      {
        id: 'showcase-4',
        titulo: 'Falta de sinalizacao',
        descricao: 'Falta de sinalizacao no cruzamento das principais ruas do Jardim Brasil',
        categoria: 'sinalizacao',
        localizacao: 'Av. Antônio Ribeiro Marques - Jardim Brasil',
        imagemUrl: '/imagens-showcase/sinalizacao_de_transito_2.jpg',
        status: 'resolvido',
        resolvidoEm: '2025-10-20T11:45:00.000Z'
      }
    ];

    return success(res, 200, 'Problemas resolvidos', resolvidos);
  } catch (err) {
    next(err);
  }
};
