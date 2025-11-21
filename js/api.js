// ===== COMUNICAÇÃO COM API REST =====

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * GET genérico com suporte a query parameters
 */
async function apiGet(endpoint, params = {}) {
  try {
    // Construir URL com query parameters
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    Object.keys(params).forEach(key => {
      if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
        url.searchParams.append(key, params[key]);
      }
    });

    // Fazer requisição GET
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    // Tratar erros HTTP
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro HTTP ${response.status}`);
    }

    // Retornar JSON
    return await response.json();
  } catch (error) {
    console.error('Erro em apiGet:', error);
    throw error;
  }
}

/**
 * POST com JSON
 */
async function apiPost(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Tratar erros HTTP
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro HTTP ${response.status}`);
    }

    // Retornar JSON
    return await response.json();
  } catch (error) {
    console.error('Erro em apiPost:', error);
    throw error;
  }
}

/**
 * POST com FormData (para upload de arquivos)
 * NÃO definir Content-Type pois o navegador irá definir com multipart/form-data
 */
async function apiPostFormData(endpoint, formData) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
      // NÃO definir Content-Type aqui
    });

    // Tratar erros HTTP
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro HTTP ${response.status}`);
    }

    // Retornar JSON
    return await response.json();
  } catch (error) {
    console.error('Erro em apiPostFormData:', error);
    throw error;
  }
}

/**
 * PATCH para atualizar parcialmente
 */
async function apiPatch(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Tratar erros HTTP
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro HTTP ${response.status}`);
    }

    // Retornar JSON
    return await response.json();
  } catch (error) {
    console.error('Erro em apiPatch:', error);
    throw error;
  }
}

/**
 * DELETE para excluir recursos
 */
async function apiDelete(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    });

    // Tratar erros HTTP
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro HTTP ${response.status}`);
    }

    // Retornar JSON
    return await response.json();
  } catch (error) {
    console.error('Erro em apiDelete:', error);
    throw error;
  }
}
