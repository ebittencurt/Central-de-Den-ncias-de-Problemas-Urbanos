module.exports = (schema, property = 'body', allowUnknown = false) => {
  return (req, res, next) => {
    const toValidate = req[property];
    const { error, value } = schema.validate(toValidate, { abortEarly: false, allowUnknown });
    if (error) {
      const details = error.details.map(d => d.message);
      return res.status(400).json({ success: false, status: 400, message: 'Erro de validação', errors: details });
    }
    req[property] = value;
    next();
  };
};
