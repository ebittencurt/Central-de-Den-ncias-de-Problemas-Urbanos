// ===== MOCK DE PROBLEMAS RESOLVIDOS =====

/**
 * Carregar problemas resolvidos da API
 */
async function carregarResolvidos() {
  try {
    const showcaseList = document.getElementById('showcaseList');
    if (!showcaseList) return;

    showcaseList.innerHTML = '<p class="text-muted text-center">Carregando problemas resolvidos...</p>';

    const response = await apiGet('/denuncias/resolvidos');

    if (response.data && response.data.length > 0) {
      renderizarShowcase(response.data);
    } else {
      showcaseList.innerHTML = '<p class="text-muted text-center">Nenhum problema resolvido ainda.</p>';
    }
  } catch (error) {
    console.error('Erro ao carregar resolvidos:', error);

    const showcaseList = document.getElementById('showcaseList');
    if (showcaseList) {
      showcaseList.innerHTML = '<p class="text-danger text-center">Erro ao carregar problemas resolvidos.</p>';
    }
  }
}

/**
 * Renderizar cards de showcase
 */
function renderizarShowcase(resolvidos) {
  const showcaseList = document.getElementById('showcaseList');
  if (!showcaseList) return;

  showcaseList.innerHTML = '';

  resolvidos.forEach(resolvido => {
    const cardHtml = criarCardShowcase(resolvido);
    const cardElement = document.createElement('div');
    cardElement.innerHTML = cardHtml;
    showcaseList.appendChild(cardElement.firstElementChild);
  });
}

/**
 * Criar HTML de um card de showcase
 */
function criarCardShowcase(resolvido) {
  const imagemHtml = resolvido.imagemUrl
    ? `<img src="http://localhost:3000${resolvido.imagemUrl}" class="card-img-top" alt="${resolvido.titulo}" style="height: 200px; object-fit: cover;">`
    : '';

  const dataResolucao = resolvido.resolvidoEm ? formatarData(resolvido.resolvidoEm) : 'Data não disponível';

  return `
    <div class="card mb-3 shadow-sm border-success">
      ${imagemHtml}
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h5 class="card-title mb-0">${escapeHtml(resolvido.titulo)}</h5>
          <span class="badge bg-success">
            <i class="fas fa-check-circle me-1"></i>Resolvido
          </span>
        </div>
        <p class="card-text text-secondary mt-2">${escapeHtml(resolvido.descricao)}</p>
        <div class="small text-muted mb-3">
          <p class="mb-1">
            <i class="fas fa-map-marker-alt me-2"></i>
            <strong>Local:</strong> ${escapeHtml(resolvido.localizacao)}
          </p>
          <p class="mb-1">
            <i class="fas fa-tag me-2"></i>
            <strong>Categoria:</strong> ${escapeHtml(resolvido.categoria)}
          </p>
          <p class="mb-0">
            <i class="fas fa-check-circle me-2"></i>
            <strong>Resolvido em:</strong> ${dataResolucao}
          </p>
        </div>
      </div>
    </div>
  `;
}
