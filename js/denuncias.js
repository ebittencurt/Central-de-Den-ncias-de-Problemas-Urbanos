// ===== CRUD E RENDERIZAÇÃO DE DENÚNCIAS =====

/**
 * Criar nova denúncia
 */
async function criarDenuncia(formElement) {
  try {
    const user = getUser();
    if (!user) {
      exibirAlerta('danger', 'Você precisa estar logado');
      return false;
    }

    // Criar FormData a partir do formulário
    const formData = new FormData(formElement);

    // Adicionar email do usuário
    formData.set('usuarioEmail', user.email);

    // Debug: ver o que está sendo enviado
    console.log('FormData enviando:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // Mostrar loading
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
      loadingSpinner.classList.remove('d-none');
    }

    // Fazer requisição
    const response = await apiPostFormData('/denuncias', formData);

    // Esconder loading
    if (loadingSpinner) {
      loadingSpinner.classList.add('d-none');
    }

    // Exibir sucesso
    exibirAlerta('success', 'Denúncia criada com sucesso!');

    // Limpar formulário
    formElement.reset();

    // Limpar preview de imagem
    const imagePreview = document.getElementById('imagePreview');
    if (imagePreview) {
      imagePreview.innerHTML = '';
    }

    // Recarregar lista de denúncias
    await listarDenuncias();

    return true;
  } catch (error) {
    console.error('Erro ao criar denúncia:', error);

    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
      loadingSpinner.classList.add('d-none');
    }

    exibirAlerta('danger', error.message);
    return false;
  }
}

/**
 * Listar denúncias do usuário logado
 */
async function listarDenuncias(categoria = '', status = '', page = 1) {
  try {
    const user = getUser();
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    const loadingSpinner = document.getElementById('loadingSpinner');
    const listaDenuncias = document.getElementById('listaDenuncias');

    if (!listaDenuncias) return;

    // Mostrar loading
    if (loadingSpinner) {
      loadingSpinner.classList.remove('d-none');
    }

    listaDenuncias.innerHTML = '';

    // Montar query parameters
    const params = {
      usuarioEmail: user.email,
      page,
      limit: 10
    };

    if (categoria && categoria !== '') {
      params.categoria = categoria;
    }

    if (status && status !== '') {
      params.status = status;
    }

    // Fazer requisição
    const response = await apiGet('/denuncias', params);

    // Esconder loading
    if (loadingSpinner) {
      loadingSpinner.classList.add('d-none');
    }

    // Renderizar resultados
    if (response.data && response.data.length > 0) {
      renderizarDenuncias(response.data);
      renderizarPaginacao(response.pagination, categoria, status);
    } else {
      listaDenuncias.innerHTML = '<p class="text-muted text-center mt-4">Nenhuma denúncia encontrada.</p>';
    }
  } catch (error) {
    console.error('Erro ao listar denúncias:', error);

    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
      loadingSpinner.classList.add('d-none');
    }

    exibirAlerta('danger', 'Erro ao carregar denúncias: ' + error.message);
  }
}

/**
 * Renderizar cards de denúncias no DOM
 */
function renderizarDenuncias(denuncias) {
  const listaDenuncias = document.getElementById('listaDenuncias');
  if (!listaDenuncias) return;

  listaDenuncias.innerHTML = '';

  denuncias.forEach(denuncia => {
    const cardHtml = criarCardDenuncia(denuncia);
    const cardElement = document.createElement('div');
    cardElement.innerHTML = cardHtml;
    listaDenuncias.appendChild(cardElement.firstElementChild);
  });

  // Adicionar event listeners nos botões de excluir
  document.querySelectorAll('.btn-excluir').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      excluirDenuncia(id);
    });
  });
}

/**
 * Criar HTML de um card de denúncia
 */
function criarCardDenuncia(denuncia) {
  const badgeClass = getBadgeClass(denuncia.status);
  const icon = getStatusIcon(denuncia.status);
  const statusTexto = getStatusTexto(denuncia.status);

  const imagemHtml = denuncia.imagemUrl
    ? `<img src="http://localhost:3000${denuncia.imagemUrl}" class="card-img-top" alt="${denuncia.titulo}" style="height: 200px; object-fit: cover;">`
    : '';

  const botaoExcluir = denuncia.status === 'aberto'
    ? `<button class="btn btn-sm btn-danger btn-excluir" data-id="${denuncia.id}">
        <i class="fas fa-trash"></i> Excluir
       </button>`
    : `<button class="btn btn-sm btn-danger btn-excluir" data-id="${denuncia.id}" disabled>
        <i class="fas fa-trash"></i> Excluir (bloqueado)
       </button>`;

  return `
    <div class="card mb-3 shadow-sm">
      ${imagemHtml}
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h5 class="card-title mb-0">${escapeHtml(denuncia.titulo)}</h5>
          <span class="badge ${badgeClass}">
            <i class="${icon} me-1"></i>${statusTexto}
          </span>
        </div>
        <p class="card-text text-secondary mt-2">${escapeHtml(denuncia.descricao)}</p>
        <div class="small text-muted mb-3">
          <p class="mb-1">
            <i class="fas fa-map-marker-alt me-2"></i>
            <strong>Local:</strong> ${escapeHtml(denuncia.localizacao)}
          </p>
          <p class="mb-1">
            <i class="fas fa-tag me-2"></i>
            <strong>Categoria:</strong> ${escapeHtml(denuncia.categoria)}
          </p>
          <p class="mb-1">
            <i class="fas fa-user me-2"></i>
            <strong>Cidadão:</strong> ${escapeHtml(denuncia.cidadao)}
          </p>
          <p class="mb-0">
            <i class="fas fa-calendar me-2"></i>
            <strong>Data:</strong> ${formatarData(denuncia.criadoEm)}
          </p>
        </div>
        <div class="d-flex gap-2">
          ${botaoExcluir}
        </div>
      </div>
    </div>
  `;
}

/**
 * Obter classe de badge por status
 */
function getBadgeClass(status) {
  switch (status) {
    case 'aberto':
      return 'bg-danger';
    case 'em_analise':
      return 'bg-warning text-dark';
    case 'resolvido':
      return 'bg-success';
    default:
      return 'bg-secondary';
  }
}

/**
 * Obter ícone por status
 */
function getStatusIcon(status) {
  switch (status) {
    case 'aberto':
      return 'fas fa-exclamation-triangle';
    case 'em_analise':
      return 'fas fa-clock';
    case 'resolvido':
      return 'fas fa-check-circle';
    default:
      return 'fas fa-circle';
  }
}

/**
 * Obter texto legível do status
 */
function getStatusTexto(status) {
  switch (status) {
    case 'aberto':
      return 'Aberto';
    case 'em_analise':
      return 'Em Análise';
    case 'resolvido':
      return 'Resolvido';
    default:
      return status;
  }
}

/**
 * Formatar data ISO para legível
 */
function formatarData(isoString) {
  try {
    const date = new Date(isoString);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  } catch (error) {
    return isoString;
  }
}

/**
 * Excluir denúncia
 */
async function excluirDenuncia(id) {
  try {
    if (!confirm('Tem certeza que deseja excluir esta denúncia?')) {
      return false;
    }

    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
      loadingSpinner.classList.remove('d-none');
    }

    const response = await apiDelete(`/denuncias/${id}`);

    if (loadingSpinner) {
      loadingSpinner.classList.add('d-none');
    }

    exibirAlerta('success', 'Denúncia excluída com sucesso!');

    // Recarregar lista
    await listarDenuncias();

    return true;
  } catch (error) {
    console.error('Erro ao excluir denúncia:', error);

    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
      loadingSpinner.classList.add('d-none');
    }

    exibirAlerta('danger', error.message);
    return false;
  }
}

/**
 * Renderizar paginação
 */
function renderizarPaginacao(pagination, categoria = '', status = '') {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer || !pagination) return;

  paginationContainer.innerHTML = '';

  const { currentPage, totalPages } = pagination;

  if (totalPages <= 1) return;

  const nav = document.createElement('nav');
  const ul = document.createElement('ul');
  ul.className = 'pagination justify-content-center';

  // Botão anterior
  if (currentPage > 1) {
    const liPrev = document.createElement('li');
    liPrev.className = 'page-item';
    liPrev.innerHTML = `
      <a class="page-link" href="#" data-page="${currentPage - 1}">
        <i class="fas fa-chevron-left"></i> Anterior
      </a>
    `;
    ul.appendChild(liPrev);
  }

  // Páginas
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      const li = document.createElement('li');
      li.className = `page-item ${i === currentPage ? 'active' : ''}`;
      li.innerHTML = `
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      `;
      ul.appendChild(li);
    } else if (
      (i === currentPage - 2 || i === currentPage + 2) &&
      document.querySelector(`[data-page="${i + 1}"]`) === null
    ) {
      const li = document.createElement('li');
      li.className = 'page-item disabled';
      li.innerHTML = '<span class="page-link">...</span>';
      ul.appendChild(li);
    }
  }

  // Botão próximo
  if (currentPage < totalPages) {
    const liNext = document.createElement('li');
    liNext.className = 'page-item';
    liNext.innerHTML = `
      <a class="page-link" href="#" data-page="${currentPage + 1}">
        Próxima <i class="fas fa-chevron-right"></i>
      </a>
    `;
    ul.appendChild(liNext);
  }

  nav.appendChild(ul);
  paginationContainer.appendChild(nav);

  // Event listeners para paginação
  document.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const page = parseInt(btn.getAttribute('data-page'));
      listarDenuncias(categoria, status, page);
      // Scroll para topo
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/**
 * Setup preview de imagem
 */
function setupImagePreview() {
  const fileInput = document.getElementById('imagem');
  const preview = document.getElementById('imagePreview');

  if (!fileInput || !preview) return;

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        exibirAlerta('danger', 'Por favor, selecione uma imagem válida');
        fileInput.value = '';
        preview.innerHTML = '';
        return;
      }

      // Validar tamanho (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        exibirAlerta('danger', 'A imagem não pode exceder 5MB');
        fileInput.value = '';
        preview.innerHTML = '';
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        preview.innerHTML = `
          <div class="mt-3">
            <img src="${event.target.result}" class="img-fluid rounded" alt="Preview" style="max-height: 200px;">
          </div>
        `;
      };

      reader.readAsDataURL(file);
    } else {
      preview.innerHTML = '';
    }
  });
}

/**
 * Setup filtros de categoria e status
 */
function setupFiltros() {
  const filterCategoria = document.getElementById('filterCategoria');
  const filterStatus = document.getElementById('filterStatus');

  if (filterCategoria) {
    filterCategoria.addEventListener('change', () => {
      const categoria = filterCategoria.value;
      const status = filterStatus ? filterStatus.value : '';
      listarDenuncias(categoria, status, 1);
    });
  }

  if (filterStatus) {
    filterStatus.addEventListener('change', () => {
      const categoria = filterCategoria ? filterCategoria.value : '';
      const status = filterStatus.value;
      listarDenuncias(categoria, status, 1);
    });
  }
}

/**
 * Setup do formulário de denúncia
 */
function setupFormDenuncia() {
  const formDenuncia = document.getElementById('formDenuncia');

  if (formDenuncia) {
    formDenuncia.addEventListener('submit', async (e) => {
      e.preventDefault();
      await criarDenuncia(formDenuncia);
    });
  }
}

/**
 * Setup do botão refresh
 */
function setupRefresh() {
  const btnRefresh = document.getElementById('btnRefresh');

  if (btnRefresh) {
    btnRefresh.addEventListener('click', async () => {
      const categoria = document.getElementById('filterCategoria')?.value || '';
      const status = document.getElementById('filterStatus')?.value || '';
      await listarDenuncias(categoria, status, 1);
      exibirAlerta('success', 'Lista atualizada!');
    });
  }
}

/**
 * Escapar HTML para evitar XSS
 */
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
