exports.success = (res, status = 200, message = 'OK', data = null, pagination = null) => {
  const payload = { success: true, status, message };
  if (data !== null) payload.data = data;
  if (pagination) payload.pagination = pagination;
  return res.status(status).json(payload);
};

exports.error = (res, status = 400, message = 'Error', details = null) => {
  const payload = { success: false, status, message };
  if (details) payload.details = details;
  return res.status(status).json(payload);
};
