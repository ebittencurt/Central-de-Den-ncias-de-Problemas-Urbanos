const Joi = require('joi');

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

const updateSchema = createSchema;

const statusSchema = Joi.object({
  status: Joi.string().valid('aberto', 'em_analise', 'resolvido').required()
});

module.exports = { createSchema, updateSchema, statusSchema };
