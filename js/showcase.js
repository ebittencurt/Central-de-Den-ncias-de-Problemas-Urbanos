async function carregarResolvidos(categoria = '', status = 'resolvido') {
  try {
    const showcaseList = document.getElementById('showcaseList');
    if (!showcaseList) return;

    showcaseList.innerHTML = '<p class="text-muted text-center">Carregando problemas resolvidos...</p>';

    
    const params = {};
    if (categoria) params.categoria = categoria;
    if (status) params.status = status;

    const response = await apiGet('/denuncias/resolvidos', params);

    if (response.data && response.data.length > 0) {
      let dados = response.data;
      
      if (categoria) {
        dados = dados.filter(item => item.categoria === categoria);
      }
      
      if (status) {
        dados = dados.filter(item => item.status === status);
      }

      if (dados.length > 0) {
        renderizarShowcase(dados);
      } else {
        showcaseList.innerHTML = '<p class="text-muted text-center">Nenhum problema encontrado com os filtros selecionados.</p>';
      }
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


function setupFiltrosShowcase() {
  const filterCategoria = document.getElementById('showcaseFilterCategoria');
  const filterStatus = document.getElementById('showcaseFilterStatus');

  if (filterCategoria) {
    filterCategoria.addEventListener('change', () => {
      const categoria = filterCategoria.value || '';
      const status = filterStatus?.value || 'resolvido';
      carregarResolvidos(categoria, status);
    });
  }

  if (filterStatus) {
    filterStatus.addEventListener('change', () => {
      const categoria = filterCategoria?.value || '';
      const status = filterStatus.value || 'resolvido';
      carregarResolvidos(categoria, status);
    });
  }
}


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


function criarCardShowcase(resolvido) {
  const imagemHtml = resolvido.imagemUrl
    ? `<img src="http://localhost:3000${resolvido.imagemUrl}" class="card-img-top" alt="${resolvido.titulo}" style="height: 450px; object-fit: cover;">`
    : '';

  const dataResolucao = resolvido.resolvidoEm ? formatarData(resolvido.resolvidoEm) : 'Data não disponível';
  const previsaoConclusao = resolvido.previsaoConclusao ? formatarData(resolvido.previsaoConclusao) : null;
  
  let badgeHtml = '';
  let dataInfoHtml = '';
  
  if (resolvido.status === 'resolvido') {
    badgeHtml = '<span class="badge bg-success"><i class="fas fa-check-circle me-1"></i>Resolvido</span>';
    dataInfoHtml = `
      <p class="mb-0">
        <i class="fas fa-check-circle me-2"></i>
        <strong>Resolvido em:</strong> ${dataResolucao}
      </p>
    `;
  } else if (resolvido.status === 'em_analise') {
    badgeHtml = '<span class="badge bg-warning text-dark"><i class="fas fa-clock me-1"></i>Em Análise</span>';
    dataInfoHtml = previsaoConclusao ? `
      <p class="mb-0">
        <i class="fas fa-calendar-check me-2"></i>
        <strong>Previsão de Conclusão:</strong> ${previsaoConclusao}
      </p>
    ` : '';
  }

  return `
    <div class="card mb-3 shadow-sm border-success">
      ${imagemHtml}
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h5 class="card-title mb-0">${escapeHtml(resolvido.titulo)}</h5>
          ${badgeHtml}
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
          ${dataInfoHtml}
        </div>
      </div>
    </div>
  `;
}


document.addEventListener('DOMContentLoaded', () => {
  setupFiltrosShowcase();
});
