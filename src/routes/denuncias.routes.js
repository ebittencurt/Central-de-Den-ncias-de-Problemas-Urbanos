const express = require('express');
const router = express.Router();
const controller = require('../controllers/denuncias.controller');
const validate = require('../middlewares/validate');
const upload = require('../middlewares/upload');
const { createSchema, updateSchema, statusSchema } = require('../validators/denuncia.validator');

router.post('/', upload.single('imagem'), controller.create);
router.get('/', controller.list);
router.get('/resolvidos', controller.getResolvidos);
router.put('/:id', upload.single('imagem'), controller.update);
router.patch('/:id/status', validate(statusSchema), controller.patchStatus);
router.delete('/:id', controller.deleteDenuncia);

module.exports = router;
