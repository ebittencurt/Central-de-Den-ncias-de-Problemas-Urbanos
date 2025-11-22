const API_BASE_URL = 'http://localhost:3000/api';

async function apiGet(endpoint, params = {}) {
  try {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    Object.keys(params).forEach(key => {
      if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
        url.searchParams.append(key, params[key]);
      }
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro em apiGet:', error);
    throw error;
  }
}

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

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro em apiPost:', error);
    throw error;
  }
}

async function apiPostFormData(endpoint, formData) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro em apiPostFormData:', error);
    throw error;
  }
}

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

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro em apiPatch:', error);
    throw error;
  }
}

async function apiDelete(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Erro HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro em apiDelete:', error);
    throw error;
  }
}
