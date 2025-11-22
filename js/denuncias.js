
async function criarDenuncia(formElement) {
  try {
    const user = getUser();
    if (!user) {
      exibirAlerta('danger', 'Você precisa estar logado');
      return false;
    }

    const formData = new FormData(formElement);

    formData.set('usuarioEmail', user.email);

    console.log('FormData enviando:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
      loadingSpinner.classList.remove('d-none');
    }

    const response = await apiPostFormData('/denuncias', formData);

    if (loadingSpinner) {
      loadingSpinner.classList.add('d-none');
    }

    exibirAlerta('success', 'Denúncia criada com sucesso!');

    formElement.reset();

    const imagePreview = document.getElementById('imagePreview');
    if (imagePreview) {
      imagePreview.innerHTML = '';
    }

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

    if (loadingSpinner) {
      loadingSpinner.classList.remove('d-none');
    }

    listaDenuncias.innerHTML = '';

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

    const response = await apiGet('/denuncias', params);

    if (loadingSpinner) {
      loadingSpinner.classList.add('d-none');
    }

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

  document.querySelectorAll('.btn-excluir').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      excluirDenuncia(id);
    });
  });
}

function criarCardDenuncia(denuncia) {
  const badgeClass = getBadgeClass(denuncia.status);
  const icon = getStatusIcon(denuncia.status);
  const statusTexto = getStatusTexto(denuncia.status);

  const imagemHtml = denuncia.imagemUrl
    ? `<img src="http://localhost:3000${denuncia.imagemUrl}" class="card-img-top" alt="${denuncia.titulo}" style="height: 300px; object-fit: cover;">`
    : '';

  const botaoExcluir = denuncia.status === 'aberto'
    ? `<button class="btn btn-sm btn-danger btn-excluir" data-id="${denuncia.id}">
        <i class="fas fa-trash"></i> Excluir
       </button>`
    : `<button class="btn btn-sm btn-danger btn-excluir" data-id="${denuncia.id}" disabled>
        <i class="fas fa-trash"></i> Excluir (bloqueado)
       </button>`;

  let infoAdicional = '';
  if (denuncia.status === 'resolvido' && denuncia.resolvidoEm) {
    infoAdicional = `
      <p class="mb-1">
        <i class="fas fa-check-circle me-2"></i>
        <strong>Resolvido em:</strong> ${formatarData(denuncia.resolvidoEm)}
      </p>
    `;
  } else if (denuncia.status === 'em_analise' && denuncia.previsaoConclusao) {
    infoAdicional = `
      <p class="mb-1">
        <i class="fas fa-calendar-check me-2"></i>
        <strong>Previsão de Conclusão:</strong> ${formatarData(denuncia.previsaoConclusao)}
      </p>
    `;
  }

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
          <p class="mb-1">
            <i class="fas fa-calendar me-2"></i>
            <strong>Data:</strong> ${formatarData(denuncia.criadoEm)}
          </p>
          ${infoAdicional}
        </div>
        <div class="d-flex gap-2">
          ${botaoExcluir}
        </div>
      </div>
    </div>
  `;
}

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

async function excluirDenuncia(id) {
  return new Promise((resolve) => {
    const modal = new bootstrap.Modal(document.getElementById('modalConfirmDelete'));
    const btnConfirm = document.getElementById('btnConfirmDelete');
    
    modal.show();
    
    const handleConfirm = async () => {
      try {
        modal.hide();
        
        const loadingSpinner = document.getElementById('loadingSpinner');
        if (loadingSpinner) {
          loadingSpinner.classList.remove('d-none');
        }

        const response = await apiDelete(`/denuncias/${id}`);

        if (loadingSpinner) {
          loadingSpinner.classList.add('d-none');
        }

        exibirAlerta('success', 'Denúncia excluída com sucesso!');

        await listarDenuncias();
        
        btnConfirm.removeEventListener('click', handleConfirm);
        resolve(true);
      } catch (error) {
        console.error('Erro ao excluir denúncia:', error);

        const loadingSpinner = document.getElementById('loadingSpinner');
        if (loadingSpinner) {
          loadingSpinner.classList.add('d-none');
        }

        exibirAlerta('danger', 'Erro ao excluir denúncia: ' + error.message);
        
        btnConfirm.removeEventListener('click', handleConfirm);
        resolve(false);
      }
    };
    
    const handleCancel = () => {
      btnConfirm.removeEventListener('click', handleConfirm);
      resolve(false);
    };
    
    btnConfirm.addEventListener('click', handleConfirm);
    document.getElementById('modalConfirmDelete').addEventListener('hidden.bs.modal', handleCancel, { once: true });
  });
}


function renderizarPaginacao(pagination, categoria = '', status = '') {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer || !pagination) return;

  paginationContainer.innerHTML = '';

  const { currentPage, totalPages } = pagination;

  if (totalPages <= 1) return;

  const nav = document.createElement('nav');
  const ul = document.createElement('ul');
  ul.className = 'pagination justify-content-center';

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

  document.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const page = parseInt(btn.getAttribute('data-page'));
      listarDenuncias(categoria, status, page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function setupImagePreview() {
  const fileInput = document.getElementById('imagem');
  const preview = document.getElementById('imagePreview');

  if (!fileInput || !preview) return;

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        exibirAlerta('danger', 'Por favor, selecione uma imagem válida');
        fileInput.value = '';
        preview.innerHTML = '';
        return;
      }

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

function setupFormDenuncia() {
  const formDenuncia = document.getElementById('formDenuncia');

  if (formDenuncia) {
    formDenuncia.addEventListener('submit', async (e) => {
      e.preventDefault();
      await criarDenuncia(formDenuncia);
    });
  }
}

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
